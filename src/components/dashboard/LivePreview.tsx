'use client';

import {
  Smartphone,
  Monitor,
  RotateCcw,
  PawPrint,
  Instagram,
  Youtube,
  Github,
  Twitter,
  Video,
  ExternalLink,
  User as UserIcon,
  Link as LinkIcon,
  Music,
  Heart,
  Star,
  Globe,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { DiscordIcon } from '@/components/icons/BrandIcons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  visible: boolean;
  variant: 'primary' | 'secondary';
  clicks: number;
}

interface LivePreviewProps {
  username?: string;
  bio?: string;
  avatarUrl?: string;
  links: LinkItem[];
  socials?: {
    instagram?: string;
    x?: string;
    youtube?: string;
    tiktok?: string;
    github?: string;
    discord?: string;
  };
  showBranding?: boolean;
  theme?: {
    backgroundColor: string;
    buttonColor: string;
    textColor: string;
    font?: string;
    socialPosition?: 'top' | 'bottom';
  };
}

export default function LivePreview({
  username = 'mochithecat',
  bio = 'Snack expert & Nap enthusiast 🐾',
  avatarUrl = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=150&q=80',
  links = [],
  socials = {},
  showBranding = true,
  theme = {
    backgroundColor: '#ffffff',
    buttonColor: '#8A2BE2',
    textColor: '#333333',
  },
}: LivePreviewProps) {
  return (
    <div className='flex flex-col h-full w-full items-center justify-center p-4 min-h-0'>
      {/* Phone Mockup Frame - Responsive Container */}
      <div className='relative group w-full h-full max-h-[85vh] flex items-center justify-center'>
        {/* Device Shadow */}
        <div className='absolute inset-x-8 -bottom-10 h-16 bg-black/20 blur-[50px] rounded-full -z-10 transition-transform group-hover:scale-110' />

        {/* Phone Body - Dynamic Aspect Ratio Scaling */}
        <div className='relative aspect-9/19 h-full max-h-full bg-[#1a1625] rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-[#2d2a37] group/phone'>
          {/* Strict Clipping Wrapper - Isolation fixed for backdrop-filter issues */}
          <div className='w-full h-full rounded-[2.8rem] overflow-hidden relative bg-black/5 isolation-isolate z-10'>
            {/* Internal Content Area - Now Scrollable */}
            <div
              className={cn(
                'absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center transition-all duration-500 z-0',
                {
                  'font-inter': theme.font === 'Inter',
                  'font-outfit': theme.font === 'Outfit',
                  'font-poppins': theme.font === 'Poppins',
                  'font-geist': theme.font === 'Geist',
                  'font-quicksand': theme.font === 'Quicksand',
                }
              )}
              style={{ backgroundColor: theme.backgroundColor }}
            >
            {/* Magical Background Orbs */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <motion.div
                animate={{
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className='absolute -top-[10%] -left-[10%] w-[80%] h-[60%] rounded-full blur-2xl opacity-20'
                style={{ backgroundColor: theme.buttonColor }}
              />
              <motion.div
                animate={{
                  x: [0, -20, 0],
                  y: [0, 15, 0],
                  scale: [1, 1.15, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className='absolute -bottom-[10%] -right-[10%] w-[90%] h-[70%] rounded-full blur-[50px] opacity-20'
                style={{ backgroundColor: theme.buttonColor }}
              />

              {/* Decorative Paws Essence */}
              <div className='absolute inset-0 opacity-[0.03]'>
                 <PawPrint className='absolute top-[10%] left-[10%] -rotate-12' size={60} style={{ color: theme.textColor }} />
                 <PawPrint className='absolute bottom-[10%] right-[10%] rotate-12' size={80} style={{ color: theme.textColor }} />
              </div>
            </div>

            {/* Main Profile Card Mockup - Glassmorphism (Fluid Height & Centered) */}
            <div 
              className='w-[88%] mt-[40%] mb-8 rounded-[2.2rem] shadow-[0_16px_32px_-8px_rgba(0,0,0,0.06)] flex flex-col items-center pt-8 pb-10 px-4 relative border border-white/20 shrink-0'
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {/* Profile Avatar */}
              <div 
                className='w-20 h-20 rounded-full border-4 shadow-lg relative overflow-hidden mb-4 bg-white'
                style={{ borderColor: `${theme.buttonColor}30` }}
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt='Avatar'
                    fill
                    unoptimized
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center' style={{ color: theme.buttonColor }}>
                    <UserIcon size={30} />
                  </div>
                )}
              </div>

              {/* Identity */}
              <div className='flex flex-col items-center gap-0.5 mb-6 text-center'>
                <h3
                  className='text-base font-black tracking-tight'
                  style={{ color: theme.textColor }}
                >
                  @{username}
                </h3>
                <p
                  className='text-[9px] font-bold opacity-60'
                  style={{ color: theme.textColor }}
                >
                  {bio || 'Welcome to my Meowuwu profile! 🐾'}
                </p>
              </div>

              {/* Social Icons Mockup - TOP POSITION */}
              {theme.socialPosition === 'top' && socials && Object.values(socials).some((v) => v) && (
                <div className='flex flex-wrap items-center justify-center gap-2 mb-6'>
                  {Object.entries(socials).map(([platform, value]) => {
                    if (!value) return null;
                    const Icon = {
                      instagram: Instagram,
                      x: Twitter,
                      youtube: Youtube,
                      tiktok: Video,
                      github: Github,
                      discord: DiscordIcon,
                    }[platform as keyof typeof socials];

                    if (!Icon) return null;

                    return (
                      <div
                        key={platform}
                        className='w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5'
                        style={{ color: theme.buttonColor }}
                      >
                        <Icon size={14} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Social Icons Mockup - REMOVED OLD HARDCODED POSITION */}

              {/* Links List Mockup - Now Fluid */}
              <div className='w-full space-y-2 px-1'>
                {links
                  .filter((l) => l.visible)
                  .map((link) => {
                    const variant = link.variant || 'primary';
                    return (
                      <div
                        key={link.id}
                        className={cn(
                          'w-full h-12 rounded-xl shadow-sm flex items-center justify-between px-4 transition-all border-2',
                          variant === 'primary' ? 'border-transparent' : ''
                        )}
                        style={{
                          backgroundColor: variant === 'primary' ? theme.buttonColor : 'white',
                          borderColor: variant === 'primary' ? 'transparent' : `${theme.buttonColor}15`,
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={cn(
                              'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-sm',
                              variant === 'primary' ? 'bg-white/20 text-white' : 'bg-neutral-50 text-neutral-400'
                            )}
                          >
                            {(() => {
                              const Icon = {
                                paw: PawPrint,
                                link: LinkIcon,
                                instagram: Instagram,
                                twitter: Twitter,
                                youtube: Youtube,
                                github: Github,
                                globe: Globe,
                                music: Music,
                                heart: Heart,
                                star: Star,
                                video: Video,
                                sparkles: Sparkles,
                              }[link.icon as string] || LinkIcon;
                              return <Icon size={12} />;
                            })()}
                          </div>
                          <span 
                            className={cn(
                              'text-[10px] font-black tracking-tight truncate',
                              variant === 'primary' ? 'text-white' : 'text-meow-charcoal'
                            )}
                          >
                            {link.title}
                          </span>
                        </div>
                        <div
                          className='w-5 h-5 flex items-center justify-center opacity-40'
                          style={{ color: variant === 'primary' ? 'white' : theme.buttonColor }}
                        >
                          <ExternalLink size={12} />
                        </div>
                      </div>
                    );
                  })}
                {links.filter((l) => l.visible).length === 0 && (
                  <div className='w-full py-6 border-2 border-dashed border-meow-charcoal/5 rounded-2xl flex items-center justify-center opacity-20'>
                     <PawPrint size={16} />
                  </div>
                )}
              </div>

              {/* Social Icons Mockup - BOTTOM POSITION */}
              {theme.socialPosition === 'bottom' && socials && Object.values(socials).some((v) => v) && (
                <div className='flex flex-wrap items-center justify-center gap-2 mt-6 mb-2'>
                  {Object.entries(socials).map(([platform, value]) => {
                    if (!value) return null;
                    const Icon = {
                      instagram: Instagram,
                      x: Twitter,
                      youtube: Youtube,
                      tiktok: Video,
                      github: Github,
                      discord: DiscordIcon,
                    }[platform as keyof typeof socials];

                    if (!Icon) return null;

                    return (
                      <div
                        key={platform}
                        className='w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5'
                        style={{ color: theme.buttonColor }}
                      >
                        <Icon size={14} />
                      </div>
                    );
                  })}
                </div>
              )}

                {/* Bottom CTA Mockup - Naturally positioned at the bottom */}
                <div className="mt-12 flex flex-col items-center gap-6 w-full">
                <div 
                  className='px-4 py-2 rounded-full shadow-md flex items-center gap-1.5'
                  style={{ backgroundColor: theme.buttonColor, color: 'white' }}
                >
                  <span className='text-[7px] font-black uppercase tracking-tight'>Join @{username} on Meowuwu</span>
                  <PawPrint size={8} fill="white" />
                </div>

                {showBranding && (
                  <div className='flex items-center gap-1 opacity-20'>
                    <PawPrint size={8} style={{ color: theme.buttonColor }} fill="currentColor" />
                    <span className='text-[6px] font-black tracking-[0.3em] text-meow-charcoal uppercase'>
                      Meowuwu
                    </span>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
