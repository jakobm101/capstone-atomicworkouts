import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

const isPreview = process.env.VERCEL_ENV === "preview";

const client = new MongoClient(process.env.MONGODB_ATOMICWORKOUTS);
const db = client.db();

console.log("🗿", db, client);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: isPreview,
    disableSignUp: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      enabled: !isPreview,
    },
  },
});
