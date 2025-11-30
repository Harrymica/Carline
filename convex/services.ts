import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Request Emergency Assistance or Mechanic
export const requestService = mutation({
  args: {
    type: v.union(v.literal("routine"), v.literal("emergency_roadside"), v.literal("repair")),
    description: v.string(),
    location: v.string(), // GPS Coordinates
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    await ctx.db.insert("maintenance", {
      user_id: identity ? identity.subject : "guest",
      type: args.type,
      description: args.description,
      location: args.location,
      status: "pending",
      created_at: new Date().toISOString(),
    });
  }
});