import { v } from "convex/values";
import { mutation, query, internalAction, internalQuery, internalMutation } from "./_generated/server";
import { api, internal } from "./_generated/api";

// 1. Generate a URL to upload images (Front, Back, Sides)
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// 2. Create Car (Admin Only)
export const createCar = mutation({
  args: {
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    price_per_day: v.number(),
    price_sale: v.union(v.number(), v.null()),
    condition: v.union(v.literal("new"), v.literal("used")),
    transmission: v.union(v.literal("manual"), v.literal("automatic")),
    fuel_type: v.union(v.literal("petrol"), v.literal("diesel"), v.literal("electric"), v.literal("hybrid")),
    seats: v.number(),
   image_storage_id: v.id("_storage"),
    images: v.array(v.id("_storage")), 
    description: v.string(),
    location: v.string(),
    features: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    // TODO: Add Admin Authorization check here
    // const identity = await ctx.auth.getUserIdentity();
    // if (!identity || identity.role !== 'admin') throw new Error("Unauthorized");

    const carId = await ctx.db.insert("cars", {
      ...args,
      mileage: 0,
      is_available: true,
      rating: 0,
      created_at: new Date().toISOString(),
    });

    // Trigger the internal action to send notifications
    await ctx.scheduler.runAfter(0, internal.cars.notifyNewCar, {
        carId: carId, 
        carName: `${args.brand} ${args.model}`
    });
    return carId;
  },
});

// 3. Get Cars (with filters)
// export const getCars = query({
//   args: {
//     condition: v.optional(v.string()), // "new" or "used"
//     brand: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     let carsQuery = ctx.db.query("cars");

//     if (args.condition) {
//       // @ts-ignore
//       carsQuery = carsQuery.withIndex("by_condition", (q) => q.eq("condition", args.condition));
//     } else if (args.brand) {
//       carsQuery = carsQuery.withIndex("by_brand", (q) => q.eq("brand", args.brand));
//     }

//     const cars = await carsQuery.collect();

//     // Map storage IDs to viewable URLs
//     return await Promise.all(cars.map(async (car) => ({
//       ...car,
//       // Use ctx.storage.getUrl for the main image
//       image_url: await ctx.storage.getUrl(car.image_storage_id),
//       // Use ctx.storage.getUrl for the 360 images array
//       images: await Promise.all(car.images.map((id) => ctx.storage.getUrl(id))),
//     })));
//   },
// });

export const getFilteredCars = query({
  args: {
    // Basic Filters
    is_available: v.optional(v.boolean()),
    brand: v.optional(v.string()),
    fuel_type: v.optional(v.string()),
    transmission: v.optional(v.string()),
    
    // Range Filters
    min_price: v.optional(v.number()),
    max_price: v.optional(v.number()),
    min_mileage: v.optional(v.number()),
    max_mileage: v.optional(v.number()),
    min_year: v.optional(v.number()),
    
    // Sorting (Client will handle sorting to avoid index complexities)
    // sort_by: v.optional(v.union(v.literal("price"), v.literal("mileage"), v.literal("year"))),
    // sort_order: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
  },
  handler: async (ctx, args) => {
    let carsQuery = ctx.db.query("cars");

    // 1. Index-based filtering (Must use only ONE index)
    // Prioritize filtering by availability, as this is likely the fastest way to reduce the set.
    if (args.is_available !== undefined) {
      carsQuery = carsQuery.withIndex("by_is_available", (q) =>
        q.eq("is_available", args.is_available!)
      );
    }
    
    // NOTE: We cannot use the index for price range because we might need to filter by other fields.
    // If the data set grows very large, we would need to redesign the schema for better indexing.

    // Get all results matching the index/initial filter
    const allCars = await carsQuery.collect();

    // 2. In-memory filtering (Apply remaining filters using JavaScript)
    const filteredCars = allCars.filter(car => {
      // Basic Filters
      if (args.brand && car.brand !== args.brand) return false;
      if (args.fuel_type && car.fuel_type !== args.fuel_type) return false;
      if (args.transmission && car.transmission !== args.transmission) return false;

      // Price Range Filter
      if (args.min_price !== undefined && car.price < args.min_price) return false;
      if (args.max_price !== undefined && car.price > args.max_price) return false;
      
      // Mileage Range Filter
      if (args.min_mileage !== undefined && car.mileage < args.min_mileage) return false;
      if (args.max_mileage !== undefined && car.mileage > args.max_mileage) return false;
      
      // Year Filter
      if (args.min_year !== undefined && car.year < args.min_year) return false;

      return true; // The car passed all filter checks
    });

    // 3. Resolve Image URLs
    const carsWithUrls = await Promise.all(filteredCars.map(async (car) => ({
      ...car,
      image_url: await ctx.storage.getUrl(car.image_storage_id),
      // Resolve 360 images
      images: await Promise.all(car.images.map((id) => ctx.storage.getUrl(id))),
    })));

    return carsWithUrls;
  },
});

// 4. Update Car
export const updateCar = mutation({
  args: { id: v.id("cars"), is_available: v.optional(v.boolean()), price_sale: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  }
});

// 5. Delete Car
export const deleteCar = mutation({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  }
});


export const notifyNewCar = internalAction({
  args: { carId: v.id("cars"), carName: v.string() },
  handler: async (ctx, args) => {
    const today = new Date().toISOString().substring(0, 10);

    // 1. Find ALL users to notify
    const allUsers = await ctx.runQuery(api.users.getAllUserClerkIds);

    const notificationPromises = allUsers.map(async (userId) => {
      // 2. Check the daily limit
      const dailyLimitEntry = await ctx.runQuery(internal.cars.getNotificationCount, { userId, date: today });
      const currentCount = dailyLimitEntry?.count || 0;

      const MAX_NOTIFICATIONS = 3; 

      if (currentCount < MAX_NOTIFICATIONS) {
        // 3. Send the notification
        await pushNotifications.sendPushNotification(ctx, {
          userId: userId,
          notification: {
            title: "🚗 New Arrival! Check it out!",
            body: `${args.carName} is now available for sale or rent.`,
            data: { carId: args.carId, type: "new_car_alert" },
          },
        });

        // 4. Update the daily count (using a mutation)
        await ctx.runMutation(internal.cars.incrementNotificationCount, { 
            userId, 
            date: today, 
            currentEntryId: dailyLimitEntry?._id
        });
      }
    });

    await Promise.all(notificationPromises);
  },
});

// Helper query for the action to fetch all user IDs
export const getAllUserClerkIds = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map(u => u.clerkId);
  }
});


// Internal Query to check the current count
export const getNotificationCount = internalQuery({
  args: { userId: v.string(), date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("daily_notifications")
      .withIndex("by_user_date", (q) =>
        q.eq("user_id", args.userId).eq("date", args.date)
      )
      .first();
  },
});

// Internal Mutation to increment or create the count
export const incrementNotificationCount = internalMutation({
  args: { userId: v.string(), date: v.string(), currentEntryId: v.optional(v.id("daily_notifications")) },
  handler: async (ctx, args) => {
    if (args.currentEntryId) {
      await ctx.db.patch(args.currentEntryId, { count: (await ctx.db.get(args.currentEntryId))!.count + 1 });
    } else {
      await ctx.db.insert("daily_notifications", {
        user_id: args.userId,
        date: args.date,
        count: 1,
      });
    }
  },
});