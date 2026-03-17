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

    // Reset views and unique views
    user.views = 0;
    user.uniqueViews = 0;

    // Reset clicks for all links
    if (user.links) {
      user.links.forEach((link: any) => {
        link.clicks = 0;
      });
    }

    // Clear unique visits from the Visit collection
    const Visit = (await import('@/models/Visit')).default;
    await Visit.deleteMany({ username: user.username });

    await user.save();

    return NextResponse.json({ success: true, message: 'Analytics reset successfully' });
  } catch (error) {
    console.error('Analytics reset error:', error);
    return NextResponse.json({ error: 'Failed to reset analytics' }, { status: 500 });
  }
}
