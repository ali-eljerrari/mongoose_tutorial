import dbConnect from "@/app/config/mongooseConnection";
import User from "@/app/models/user.schema";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const users = await User.find({});
      // .select(["_id", "name", "email", "age"]);
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
