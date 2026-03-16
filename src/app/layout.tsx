import type { Metadata } from 'next';
import { Quicksand, Geist, Outfit, Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: {
    default: 'Meowuwu - Your Links, But Cuter',
    template: '%s | Meowuwu',
  },
  description:
    'The most exceptionally beautiful, cat-themed link-in-bio platform. Create your purr-fect profile in seconds.',
  keywords: [
    'link in bio',
    'cat themed',
    'social links',
    'meowuwu',
    'aesthetic links',
    'bio link',
  ],
  authors: [{ name: '@ShreyJaiswal1' }],
  creator: 'Meowuwu',
  metadataBase: new URL('https://meowuwu.in'), // Replace with actual production URL if different
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://meowuwu.in',
    siteName: 'Meowuwu',
    title: 'Meowuwu - Your Links, But Cuter',
    description:
      'The most exceptionally beautiful, cat-themed link-in-bio platform.',
    images: [
      {
        url: '/meowuwu.png',
        width: 1200,
        height: 630,
        alt: 'Meowuwu - Cute Links',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meowuwu - Your Links, But Cuter',
    description:
      'The most exceptionally beautiful, cat-themed link-in-bio platform.',
    images: ['/meowuwu.png'],
  },
  icons: {
    icon: '/meowuwu.png',
    apple: '/meowuwu.png',
  },
};

import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        className={cn(
          geist.variable,
          inter.variable,
          outfit.variable,
          quicksand.variable,
        )}
      >
        <body className='font-quicksand antialiased'>
          <TooltipProvider>
            {children}
            <Toaster position='top-center' richColors />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
