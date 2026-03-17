import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserByUsername } from '@/lib/data';
import ProfileClient from './ProfileClient';

interface Props {
  params: Promise<{ username: string }>;
}

export const revalidate = 60; // ISR Optimization: Revalidate every 60 seconds

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user || user.isActive === false) {
    return {
      title: 'User Not Found | Meowuwu',
      icons: {
        icon: '/meowuwu.png',
        apple: '/meowuwu.png',
      },
    };
  }

  // Optimize title and description for search engines
  const title = user.seo?.title || `@${user.username} | Meowuwu`;
  const description = user.seo?.description || user.bio || `Check out @${user.username}'s profile on Meowuwu! 🐾`;
  const image = user.avatarUrl || '/meowuwu.png';

  return {
    title,
    description,
    icons: {
      icon: '/meowuwu.png',
      apple: '/meowuwu.png',
    },
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
  const user = await getUserByUsername(username);

  if (!user || user.isActive === false) {
    return notFound();
  }

  const plainUser = JSON.parse(JSON.stringify(user));

  // JSON-LD Structured Data for Enhanced SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": user.username,
      "description": user.bio,
      "image": user.avatarUrl,
      "url": `https://meowuwu.in/${user.username}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfileClient user={plainUser} />
    </>
  );
}
