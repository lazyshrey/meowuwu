import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { username, linkId, type } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    await connectToDatabase();

    if (type === 'view') {
      await User.updateOne({ username }, { $inc: { views: 1 } });
    } else if (type === 'click' && linkId) {
      await User.updateOne(
        { username, "links._id": linkId },
        { $inc: { "links.$.clicks": 1 } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
