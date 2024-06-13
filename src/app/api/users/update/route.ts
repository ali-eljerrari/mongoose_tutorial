import dbConnect from "@/app/config/mongooseConnection";
import User from "@/app/models/user.schema";

export async function POST(request: Request) {
  await dbConnect();
  const { _id, user } = await request.json();

  if (!_id || !user.name || !user.email) {
    return;
  }

  try {
    const result = await User.findByIdAndUpdate({ _id }, user);
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message });
  }
}
