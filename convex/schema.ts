import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({


   user_roles: defineTable({
    clerkId: v.string(), // The Clerk ID of the user
    role: v.union(v.literal("admin"), v.literal("user"), v.literal("guest")),
  }).index("by_clerkId", ["clerkId"]),


    // 1. UPDATED USERS TABLE (For Clerk Sync)
  users: defineTable({
    // This is the Clerk User ID (e.g., "user_2XYZ...")
    clerkId: v.string(), 
    email: v.string(),
    full_name: v.optional(v.string()),
    phone: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
    // 'admin' sees dashboard, 'user' sees app
    role: v.union(v.literal("user"), v.literal("admin")), 
    created_at: v.string(),
  })
  .index("by_clerkId", ["clerkId"])
  .index("by_email", ["email"]),

  // 2. CHAT CONVERSATIONS
  conversations: defineTable({
    // The two people chatting (e.g., [Buyer_Clerk_ID, Admin_ID])
    participantIds: v.array(v.string()), 
    // Optional: context if they are chatting about a specific car
    related_car_id: v.optional(v.id("cars")), 
    last_message: v.optional(v.string()),
    last_message_time: v.number(),
    // To show "New" badge
    has_unread: v.boolean(), 
  }).index("by_participant", ["participantIds"]), // Not perfect for array, but works for MVP filtering

  // 3. CHAT MESSAGES
  messages: defineTable({
    conversation_id: v.id("conversations"),
    sender_id: v.string(), // Clerk ID
    content: v.string(),
    type: v.union(v.literal("text"), v.literal("image")), 
    is_read: v.boolean(),
    created_at: v.number(), // Unix timestamp for sorting
  }).index("by_conversation", ["conversation_id"]),


  // 1. CARS: Sales & Rentals
  cars: defineTable({
    brand: v.string(),
    model: v.string(),
    year: v.number(),
    price_per_day: v.number(), // For Rent
    price_sale: v.union(v.number(), v.null()), // For Sale
    condition: v.union(v.literal("new"), v.literal("used")),
    transmission: v.union(v.literal("manual"), v.literal("automatic")),
    fuel_type: v.union(v.literal("petrol"), v.literal("diesel"), v.literal("electric"), v.literal("hybrid")),
    seats: v.number(),
    aircondition: v.boolean(),
    mileage: v.union(v.number(), v.null()),
    description: v.string(),
    is_available: v.boolean(),
    location: v.string(), // Could be "Lat,Long" or "City, State"
    rating: v.number(),
    features: v.array(v.string()), // e.g. ["GPS", "Bluetooth"]
    
            // IMAGE HANDLING:
        // Store the storage ID (Id<"_storage">) for the main image
        image_storage_id: v.id("_storage"), 
        // Array of storage IDs for the 360 view
        images: v.array(v.id("_storage")),
            
    created_at: v.string(),
  })
   .index("by_is_available", ["is_available"])
//    .index("by_status_price", ["is_available", "price"])
  .index("by_brand", ["brand"])
  .index("by_condition", ["condition"])
  .index("by_price_rent", ["price_per_day"])
  .searchIndex("search_cars", {
    searchField: "brand",
    filterFields: ["model", "year", "condition"]
  }),

  // 2. RENTALS
  rentals: defineTable({
    user_id: v.string(), // Typically the User Identity Token subject
    car_id: v.id("cars"),
    start_date: v.string(), // ISO String
    end_date: v.string(),   // ISO String
    total_price: v.number(),
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("active"), v.literal("completed"), v.literal("cancelled")),
    pickup_location: v.string(),
    dropoff_location: v.string(),
    payment_status: v.union(v.literal("pending"), v.literal("paid"), v.literal("refunded")),
    paystack_ref: v.optional(v.string()), // To track Paystack transaction
    created_at: v.string(),
  })
  .index("by_user", ["user_id"])
  .index("by_car", ["car_id"])
  .index("by_status", ["status"]),



  // 4. DOCUMENT RENEWAL SERVICES
  document_renewals: defineTable({
    user_id: v.string(),
    document_type: v.union(v.literal("registration"), v.literal("insurance"), v.literal("license"), v.literal("inspection")),
    vehicle_registration: v.string(),
    status: v.union(v.literal("pending"), v.literal("in_progress"), v.literal("completed"), v.literal("rejected")),
    expiry_date: v.optional(v.string()),
    renewal_date: v.optional(v.string()),
    document_storage_ids: v.array(v.string()), // Files stored in Convex
    notes: v.optional(v.string()),
    created_at: v.string(),
  }).index("by_user", ["user_id"]),

  // 5. TEST DRIVES (For Car Sales)
  test_drives: defineTable({
    user_id: v.string(),
    car_id: v.id("cars"),
    scheduled_date: v.string(),
    status: v.union(v.literal("requested"), v.literal("approved"), v.literal("completed"), v.literal("cancelled")),
    notes: v.optional(v.string()),
  }).index("by_car", ["car_id"]),

  // 6. MAINTENANCE REQUESTS
  maintenance: defineTable({
    user_id: v.string(),
    type: v.union(v.literal("routine"), v.literal("emergency_roadside"), v.literal("repair")),
    description: v.string(),
    location: v.string(),
    status: v.literal("pending") || v.literal("dispatched") || v.literal("completed"),
    created_at: v.string(),
  }),

  // 7. FUN ZONE (Brain Teasers)
  brain_teasers: defineTable({
    title: v.string(),
    question: v.string(),
    options: v.array(v.string()),
    correct_answer: v.string(),
    difficulty: v.union(v.literal("easy"), v.literal("medium"), v.literal("hard")),
    category: v.union(v.literal("trivia"), v.literal("puzzle"), v.literal("quiz"), v.literal("riddle")),
    points: v.number(),
  }),

  // 8. LEADERBOARD
  // We can aggregate this from a `user_scores` table, but keeping a running total is faster
  leaderboard: defineTable({
    user_id: v.string(),
    full_name: v.string(),
    total_points: v.number(),
    correct_answers: v.number(),
  }).index("by_points", ["total_points"]),


  // Tracks daily notifications sent to enforce the limit
daily_notifications: defineTable({
  user_id: v.string(), // Clerk ID
  date: v.string(), // YYYY-MM-DD
  count: v.number(),
})
.index("by_user_date", ["user_id", "date"])

      // 3. USERS / PROFILES
//   users: defineTable({
//     tokenIdentifier: v.string(), // Unique ID from Auth provider (Clerk, Auth0, etc.)
//     full_name: v.optional(v.string()),
//     phone: v.optional(v.string()),
//     avatar_url: v.optional(v.string()),
//     role: v.union(v.literal("user"), v.literal("admin")), // Basic RBAC
//     created_at: v.string(),
//   }).index("by_token", ["tokenIdentifier"]),
});


