import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import { userUpdateSchema } from '@/lib/validations';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    await connectToDatabase();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create user if not exists
      const clerkUser = await currentUser();
      if (!clerkUser) return new NextResponse('Unauthorized', { status: 401 });

      const email = clerkUser.emailAddresses[0]?.emailAddress;
      const username = (
        clerkUser.username ||
        (email
          ? email.split('@')[0]
          : `user_${Math.random().toString(36).substr(2, 5)}`)
      )
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '');

      user = await User.create({
        clerkId: userId,
        username: username,
        bio: 'Welcome to my Meowuwu profile! 🐾',
        avatarUrl: clerkUser.imageUrl,
        links: [
          {
            title: 'My First Link',
            url: 'https://meowuwu.in',
            isVisible: true,
            order: 0,
          },
        ],
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('[USER_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const validatedData = userUpdateSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.flatten() },
        { status: 400 },
      );
    }

    const {
      bio,
      avatarUrl,
      links,
      theme,
      username,
      socials,
      seo,
      showBranding,
    } = validatedData.data;

    await connectToDatabase();

    // Check username uniqueness if changing
    if (username) {
      const existingUser = await User.findOne({
        username: username.toLowerCase(),
        clerkId: { $ne: userId },
      });
      if (existingUser) {
        return NextResponse.json(
          {
            error: { fieldErrors: { username: ['Username is already taken'] } },
          },
          { status: 400 },
        );
      }
    }

    const updateData: Record<string, unknown> = {};
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (links !== undefined) updateData.links = links;
    if (theme !== undefined) updateData.theme = theme;
    if (username !== undefined) updateData.username = username.toLowerCase();
    if (socials !== undefined) updateData.socials = socials;
    if (seo !== undefined) updateData.seo = seo;
    if (showBranding !== undefined) updateData.showBranding = showBranding;

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: updateData },
      { new: true, upsert: true },
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error('[USER_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
