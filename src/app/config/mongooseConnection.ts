// lib/dbConnect.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log("Using existing mongoose connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("Creating new mongoose connection promise");
    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log("Mongoose connection established");
        return mongoose;
      })
      .catch((error) => {
        console.error("Mongoose connection error:", error);
      });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Mongoose connection resolved");
  } catch (error) {
    console.error("Error resolving mongoose connection promise:", error);
  }

  return cached.conn;
}

export default dbConnect;
