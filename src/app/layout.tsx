import type { Metadata } from "next";
import { Quicksand, Geist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: "Meowuwu - Your Links, But Cuter",
  description: "Create exceptionally beautiful cat-themed custom link cards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn("font-sans", geist.variable)}>
        <body className={`${quicksand.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
