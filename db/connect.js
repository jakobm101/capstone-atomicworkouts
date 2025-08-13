// Lots of logging added for debugging
// Make sure to call this ASYNC

import mongoose from "mongoose";

mongoose.set("debug", true); // █ zeigt alle Mongo-Queries in der Konsole

let MONGODB_URI = process.env.MONGODB_ATOMICWORKOUTS;
// offline database for offline development˚˚˚
// MONGODB_URI = "mongodb://127.0.0.1:27017/2";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("✅ Mongoose connected");
        return mongoose;
      })
      .catch((err) => console.error("❌ Mongoose connection error:", err));
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // Events loggen – sehr präzise Kontrolle:
  const db = mongoose.connection;

  db.on("connected", () => console.log("🔌 connected to MongoDB"));
  db.on("error", (err) => console.error("🔥 connection error:", err));
  db.on("disconnected", () => console.warn("❗ disconnected from MongoDB"));
  db.on("reconnected", () => console.log("🔁 reconnected to MongoDB"));

  return cached.conn;
}

export default dbConnect;
