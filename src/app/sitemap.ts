import { MetadataRoute } from 'next';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://meowuwu.in';

  // Static routes
  const staticRoutes = ['', '/sign-in', '/sign-up'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic user profile routes
  let userRoutes: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    // Only include active profiles in the sitemap
    const users = await User.find({ isActive: { $ne: false } }, 'username updatedAt')
      .sort({ updatedAt: -1 })
      .limit(50000)
      .lean();

    userRoutes = users.map((user: any) => ({
      url: `${baseUrl}/${user.username}`,
      lastModified: user.updatedAt || new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap error:', error);
  }

  return [...staticRoutes, ...userRoutes];
}
