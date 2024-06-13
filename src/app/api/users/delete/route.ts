import dbConnect from "@/app/config/mongooseConnection";
import User from "@/app/models/user.schema";

export async function POST(request: Request) {
  await dbConnect();
  const { _id } = await request.json();

  if (!_id) {
    return;
  }

  try {
    const result = await User.findByIdAndDelete(_id);
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    return Response.json({ success: false, error: error.message });
  }
}
