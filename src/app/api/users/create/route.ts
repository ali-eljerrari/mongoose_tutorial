import dbConnect from "@/app/config/mongooseConnection";
import User from "@/app/models/user.schema";

export async function POST(request: Request) {
  await dbConnect();
  const { user } = await request.json();

  if (!Object.keys(user).length) {
    return;
  }

  try {
    const result = await User.create(user);
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message });
  }
}
