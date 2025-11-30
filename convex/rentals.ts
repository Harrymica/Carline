import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

// 1. Book a Car (Logic to prevent double booking)
export const bookCar = mutation({
  args: {
    car_id: v.id("cars"),
    start_date: v.string(),
    end_date: v.string(),
    pickup_location: v.string(),
    dropoff_location: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Please log in");

    const car = await ctx.db.get(args.car_id);
    if (!car) throw new Error("Car not found");

    // Check for overlap
    const existingRentals = await ctx.db
      .query("rentals")
      .withIndex("by_car", (q) => q.eq("car_id", args.car_id))
      .filter((q) => q.or(q.eq(q.field("status"), "confirmed"), q.eq(q.field("status"), "active")))
      .collect();

    const isBooked = existingRentals.some((rental) => {
      return (
        (args.start_date >= rental.start_date && args.start_date <= rental.end_date) ||
        (args.end_date >= rental.start_date && args.end_date <= rental.end_date)
      );
    });

    if (isBooked) throw new Error("Car is not available for these dates");

    // Calculate Total Price (Days * Price Per Day)
    const start = new Date(args.start_date);
    const end = new Date(args.end_date);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    const total_price = days * car.price_per_day;

    // Create "Pending" Rental
    const rentalId = await ctx.db.insert("rentals", {
      user_id: identity.subject,
      car_id: args.car_id,
      start_date: args.start_date,
      end_date: args.end_date,
      total_price: total_price,
      status: "pending",
      payment_status: "pending",
      pickup_location: args.pickup_location,
      dropoff_location: args.dropoff_location,
      created_at: new Date().toISOString(),
    });

    return { rentalId, total_price, email: identity.email };
  },
});

// 2. Paystack Action (Server-side HTTP call)
// This initializes the transaction with Paystack
export const initializePaystack = action({
  args: { rentalId: v.id("rentals"), amount: v.number(), email: v.string() },
  handler: async (ctx, args) => {
    // Note: Store PAYSTACK_SECRET_KEY in your Convex Environment Variables
    const paystackUrl = "https://api.paystack.co/transaction/initialize";
    
    const response = await fetch(paystackUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: args.email,
        amount: args.amount * 100, // Paystack uses kobo
        metadata: { rental_id: args.rentalId, type: "rental" },
      }),
    });

    const data = await response.json();
    if (!data.status) throw new Error("Paystack initialization failed");

    return data.data.authorization_url; // Return this to frontend to redirect user
  },
});

// 3. Mark as Paid (Called after Paystack success webhook or verification)
export const confirmPayment = mutation({
  args: { rentalId: v.id("rentals"), paystack_ref: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.rentalId, {
      status: "confirmed",
      payment_status: "paid",
      paystack_ref: args.paystack_ref,
    });
  }
});