import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Visit from '@/models/Visit';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not defined');
    return new Response('Error occured -- missing webhook secret', {
      status: 500
    });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    
    if (!id) {
       return new Response('Error occured -- no user id', {
        status: 400
      });
    }

    try {
      await connectToDatabase();
      
      // Find the user to get their username
      const user = await User.findOne({ clerkId: id });
      
      if (user) {
        const username = user.username;
        
        // Delete all visits associated with the user's profile
        await Visit.deleteMany({ username });
        
        // Delete the user record
        await User.deleteOne({ clerkId: id });
        
        // Purge the user's page from cache
        revalidatePath(`/${username}`);
        
        console.log(`[CLERK_WEBHOOK] Successfully deleted data for user: ${username} (clerkId: ${id})`);
      } else {
        console.log(`[CLERK_WEBHOOK] User not found in DB: ${id}`);
      }
    } catch (error) {
      console.error('[CLERK_WEBHOOK] Error deleting user data:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  return new Response('Webhook received', { status: 200 });
}
