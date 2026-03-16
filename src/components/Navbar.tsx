import Link from 'next/link';
import { UserButton, Show } from '@clerk/nextjs';
import { PawPrint } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-8 py-3 relative">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 bg-meow-accent rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <PawPrint size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-meow-charcoal">Meowuwu</span>
        </Link>

        <div className="hidden md:flex flex-1" />
        
        <div className="flex items-center gap-6">
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm font-bold text-meow-charcoal hover:text-meow-accent transition-colors">
              Log In
            </Link>
            <Link href="/sign-up" className="bg-meow-accent text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-meow-accent/20 hover:scale-105 transition-all active:scale-95">
              Sign Up
            </Link>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-bold text-meow-charcoal hover:text-meow-accent transition-colors mr-2">
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
}
