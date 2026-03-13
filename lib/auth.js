import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const auth = betterAuth({
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    },
  },
});

// Kann weg?
export const authClient = createAuthClient({
  //you can pass client configuration here
});
