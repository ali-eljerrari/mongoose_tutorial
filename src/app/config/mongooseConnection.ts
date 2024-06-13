// src/app/config/mongooseConnection.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used to maintain a cached connection across hot reloads in development.
 * This prevents connections growing exponentially during API Route usage.
 */
declare global {
  // Allow the `mongoose` global variable to be declared
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Initialize the `mongoose` global variable if it does not exist
global.mongoose = global.mongoose || { conn: null, promise: null };

let cached = global.mongoose;

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
