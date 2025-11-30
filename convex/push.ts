import { PushNotifications } from "@convex-dev/expo-push-notifications";
import { components } from "./_generated/api";
// We use v.string() as the userId type because Clerk IDs are strings.
import { v } from "convex/values"; 

// Instantiate the PushNotifications client
export const pushNotifications = new PushNotifications<string>(
  components.pushNotifications;
);