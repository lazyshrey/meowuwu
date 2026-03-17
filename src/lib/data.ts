import { cache } from 'react';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export const getUserByUsername = cache(async (username: string) => {
  await connectToDatabase();
  // Using lean() to return plain objects for better performance
  return await User.findOne({ username }).lean();
});
