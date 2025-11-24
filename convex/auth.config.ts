// convex/auth.config.ts
import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      // Replace with your own Clerk Issuer URL from your "convex" JWT template
      // or with `process.env.CLERK_JWT_ISSUER_DOMAIN`
      // and configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
      // See https://docs.convex.dev/auth/clerk#configuring-dev-and-prod-instances
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;

// const authConfig = {
//   providers: [
//     {
//       // This maps to your Clerk Issuer URL
//       domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
//       applicationID: "convex",
//     },
//   ],
// };

// export default authConfig;


