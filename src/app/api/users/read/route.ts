import dbConnect from "@/app/config/mongooseConnection";
import User from "@/app/models/user.schema";

export const GET = async () => {
  await dbConnect();

  try {
    const users = await User.find({});
    // .select(["_id", "name", "email", "age"]);
    return Response.json(users);
  } catch (error: any) {
    return Response.json({ success: false, error: error.message });
  }
};
