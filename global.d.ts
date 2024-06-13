// global.d.ts
import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// To make the file a module and avoid TypeScript errors
export {};
