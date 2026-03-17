'use client';

import Link from 'next/link';
import { PawPrint, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-white pt-24 pb-12 px-6 border-t border-meow-charcoal/5'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-20'>
          {/* Brand Column */}
          <div className='flex flex-col gap-6'>
            <Link href='/' className='flex items-center gap-2 group w-fit'>
              <div className='w-9 h-9 bg-meow-accent rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12 animate-in fade-in zoom-in'>
                <PawPrint size={20} />
              </div>
              <span className='text-xl font-bold tracking-tight text-meow-charcoal'>
                Meowuwu
              </span>
            </Link>
            <p className='text-meow-charcoal/50 font-medium leading-relaxed max-w-[240px]'>
              Making the internet a cuter place, one link at a time. 🐾
            </p>
            <div className='flex items-center gap-4'>
              <a
                href='https://meowuwu.in'
                className='w-10 h-10 rounded-full bg-meow-accent/5 flex items-center justify-center text-meow-charcoal/40 hover:text-meow-accent hover:bg-meow-accent/10 transition-all'
              >
                <Globe size={18} />
              </a>
              <a
                href='https://discord.gg/ZVCB8EnRX2'
                className='w-10 h-10 rounded-full bg-meow-accent/5 flex items-center justify-center text-meow-charcoal/40 hover:text-meow-accent hover:bg-meow-accent/10 transition-all'
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className='grid grid-cols-2 md:grid-cols-2 gap-12'>
            <div className='flex flex-col gap-6'>
              <h4 className='text-[10px] font-black uppercase tracking-widest text-meow-charcoal/30'>
                Platform
              </h4>
              <nav className='flex flex-col gap-4 text-sm font-bold text-meow-charcoal/60'>
                <Link
                  href='/dashboard'
                  className='w-fit hover:text-meow-accent transition-colors'
                >
                  Dashboard
                </Link>
                <Link
                  href='/dashboard/appearance'
                  className='w-fit hover:text-meow-accent transition-colors'
                >
                  Themes
                </Link>
                <Link
                  href='/dashboard/analytics'
                  className='w-fit hover:text-meow-accent transition-colors'
                >
                  Insights
                </Link>
              </nav>
            </div>
            <div className='flex flex-col gap-6'>
              <h4 className='text-[10px] font-black uppercase tracking-widest text-meow-charcoal/30'>
                Support
              </h4>
              <nav className='flex flex-col gap-4 text-sm font-bold text-meow-charcoal/60'>
                <Link
                  href='/support'
                  className='w-fit hover:text-meow-accent transition-colors'
                >
                  Help Center
                </Link>
                <Link
                  href='/terms'
                  className='w-fit hover:text-meow-accent transition-colors'
                >
                  Terms of Service
                </Link>
                <Link
                  href='/privacy'
                  className='w-fit hover:text-meow-accent transition-colors'
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-12 border-t border-meow-charcoal/5 flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-xs font-bold text-meow-charcoal/30'>
            © 2026 Meowuwu Inc. All rights reserved.
          </p>
          <p className='text-xs font-bold text-meow-charcoal/30 flex items-center gap-1.5'>
            <Link href='https://lazyshrey.in'>
              Made with <span className='text-meow-accent text-sm'>❤️</span> by{' '}
              <span className='text-meow-charcoal'>Shrey</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
