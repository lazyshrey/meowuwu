import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import ProfileClient from './ProfileClient';

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  
  await connectToDatabase();
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return {
      title: 'User Not Found | Meowuwu',
    };
  }

  // Use saved SEO data or fallback to defaults
  const title = user.seo?.title || `@${user.username} | Meowuwu`;
  const description = user.seo?.description || user.bio || `Check out @${user.username}'s profile on Meowuwu! 🐾`;
  const image = user.avatarUrl || '/meowuwu.png'; // Fallback to site logo

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
      type: 'profile',
      username: user.username,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function PublicProfile({ params }: Props) {
  const { username } = await params;
  
  await connectToDatabase();
  // Using lean() for better performance as we don't need mongoose document features here
  const user = await User.findOne({ username }).lean();

  if (!user) {
    return notFound();
  }

  // Convert MongoDB document to a plain object that can be passed to the Client Component
  // We need to handle the _id conversion to string and other potentially complex types
  const plainUser = JSON.parse(JSON.stringify(user));

  return <ProfileClient user={plainUser} />;
}
