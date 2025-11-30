import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// 1. Start or Get Existing Conversation
// Used when a user clicks "Chat Seller" on a car page
export const startConversation = mutation({
  args: {
    otherUserId: v.string(), // The Admin or Seller's Clerk ID
    carId: v.optional(v.id("cars")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const currentUserId = identity.subject;

    // Check if a conversation already exists between these two
    // Note: In a real app, you might iterate to find the exact match of participants
    const existing = await ctx.db
      .query("conversations")
      .filter((q) => 
        q.and(
          // This is a simplified check. Ideally, check exact array membership.
           // For MVP, we assume a query filtering logic in the loop below.
        )
      )
      .collect();

    // Logic to find exact match in array
    const match = existing.find(c => 
      c.participantIds.includes(currentUserId) && 
      c.participantIds.includes(args.otherUserId) &&
      c.related_car_id === args.carId
    );

    if (match) {
      return match._id;
    }

    // Create new conversation
    const conversationId = await ctx.db.insert("conversations", {
      participantIds: [currentUserId, args.otherUserId],
      related_car_id: args.carId,
      last_message_time: Date.now(),
      has_unread: false,
    });

    return conversationId;
  },
});

// 2. Send a Message
export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    content: v.string(),
    type: v.union(v.literal("text"), v.literal("image")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    await ctx.db.insert("messages", {
      conversation_id: args.conversationId,
      sender_id: identity.subject,
      content: args.content,
      type: args.type,
      is_read: false,
      created_at: Date.now(),
    });

    // Update the conversation preview
    await ctx.db.patch(args.conversationId, {
      last_message: args.type === "image" ? "📷 Image" : args.content,
      last_message_time: Date.now(),
      has_unread: true,
    });
  },
});

// 3. Get Messages (Real-time)
export const getMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // Security: Ensure user is a participant
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation?.participantIds.includes(identity.subject)) {
      throw new Error("You are not part of this chat");
    }

    return await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversation_id", args.conversationId))
      .order("asc") // Oldest first (standard chat UI)
      .collect();
  },
});

// 4. Get My Inbox (List of Conversations)
export const getMyConversations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const allConversations = await ctx.db.query("conversations").collect();

    // Filter in memory for now (efficient enough for small-medium scale)
    const myConversations = allConversations.filter(c => 
      c.participantIds.includes(identity.subject)
    );

    // Enhance data: Fetch details of the *other* participant
    return await Promise.all(myConversations.map(async (conv) => {
      const otherUserId = conv.participantIds.find(id => id !== identity.subject);
      const otherUser = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", otherUserId || ""))
        .first();

      return {
        ...conv,
        otherUser: otherUser ? { full_name: otherUser.full_name, avatar: otherUser.avatar_url } : null
      };
    }));
  }
});