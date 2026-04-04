import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Visit from "@/models/Visit";

export async function POST(request: Request) {
  try {
    const { username, linkId, type, visitorId } = await request.json();

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    await connectToDatabase();

    if (type === 'view') {
      // Always track the raw view
      await User.updateOne({ username }, { $inc: { views: 1 } });
      
      // Attempt to track as a unique view
      if (visitorId) {
        try {
          await Visit.create({ username, visitorId });
          // If we successfully created it, increment unique views
          await User.updateOne({ username }, { $inc: { uniqueViews: 1 } });
        } catch (err: unknown) {
          const error = err as { code?: number };
          // E11000 is a duplicate key error in MongoDB (already visited)
          if (error.code !== 11000) {
            console.error("Unique tracking error:", err);
          }
        }
      }
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
