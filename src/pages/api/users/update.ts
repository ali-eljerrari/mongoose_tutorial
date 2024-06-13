import dbConnect from "@/app/config/mongooseConnection";
import User from "@/app/models/user.schema";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { _id, user } = await req.body;

    if (!_id || !user.name || !user.email) {
      return;
    }

    try {
      await dbConnect();
      const result = await User.findByIdAndUpdate({ _id }, user);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
