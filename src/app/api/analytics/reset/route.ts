import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import User, { ILink } from '@/models/User';

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Find the user and reset analytics
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Reset total views
    user.views = 0;

    // Reset clicks for all links
    if (user.links && user.links.length > 0) {
      user.links = user.links.map((link: ILink) => ({
        ...(link as any).toObject(),
        clicks: 0,
      }));
    }

    await user.save();

    return NextResponse.json({ success: true, message: 'Analytics reset successfully' });
  } catch (error) {
    console.error('Analytics reset error:', error);
    return NextResponse.json({ error: 'Failed to reset analytics' }, { status: 500 });
  }
}
