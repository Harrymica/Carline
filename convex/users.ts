import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { pushNotifications } from "./push";

export const syncUser = mutation({
  args: {
    full_name: v.optional(v.string()),
    phone: v.optional(v.string()),
    avatar_url: v.optional(v.string()),
  },
    handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Called syncUser without authentication");

    // identity.subject is the unique Clerk ID
    const clerkId = identity.subject;
    const email = identity.email || "";

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();

    if (existingUser) {
      // Optional: Update details if they changed in Clerk
      await ctx.db.patch(existingUser._id, { 
        full_name: args.full_name || existingUser.full_name,
        avatar_url: args.avatar_url || existingUser.avatar_url
      });
      return existingUser._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      clerkId,
      email,
      full_name: args.full_name,
      phone: args.phone,
      avatar_url: args.avatar_url,
      role: "user", // Default role
      created_at: new Date().toISOString(),
    });
  },
});

export const getUserRole = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    return user?.role || "user";
  }
});


export const recordPushNotificationToken = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await pushNotifications.recordToken(ctx, {
      userId: identity.subject, // Clerk ID
      pushToken: args.token,
    });
  },
});