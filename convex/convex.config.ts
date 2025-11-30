import { defineApp } from "convex/server";
// ⚠️ You must create this file if it doesn't exist
import pushNotifications from "@convex-dev/expo-push-notifications/convex.config.js";

const app = defineApp();
app.use(pushNotifications);

export default app;