import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const scheduleTestDrive = mutation({
  args: {
    car_id: v.id("cars"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.insert("test_drives", {
      user_id: identity.subject,
      car_id: args.car_id,
      scheduled_date: args.date,
      status: "requested",
    });
  }
});