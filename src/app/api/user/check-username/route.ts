import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username")?.toLowerCase();

    if (!username || username.length < 3) {
      return NextResponse.json({ available: true });
    }

    await connectToDatabase();
    
    // Check if username exists and doesn't belong to the current user
    const existingUser = await User.findOne({ 
      username,
      clerkId: { $ne: userId } 
    });

    return NextResponse.json({ available: !existingUser });
  } catch (error) {
    console.error("[CHECK_USERNAME_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
