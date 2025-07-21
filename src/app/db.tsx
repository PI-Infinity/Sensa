// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("❌ Missing MONGODB_URI environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        autoIndex: true,
        writeConcern: { w: "majority" },
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongoose) => {
        console.log("✅ Connected to MongoDB");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ Initial connection error:", err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err: any) {
    console.error("❌ connectDB failed:", err.message);
    throw err;
  }
}
