'use client';

import {
  PawPrint,
  Share2,
  ExternalLink,
  User as UserIcon,
  Instagram,
  Youtube,
  Github,
  Twitter,
  Video,
} from 'lucide-react';
import { DiscordIcon } from '@/components/icons/BrandIcons';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ILink {
  title: string;
  url: string;
  isVisible: boolean;
  variant?: 'primary' | 'secondary';
  _id?: string;
}

interface IUser {
  username: string;
  avatarUrl?: string;
  bio?: string;
  theme?: {
    backgroundColor: string;
    buttonColor: string;
    textColor: string;
    font?: string;
    socialPosition?: 'top' | 'bottom';
  };
  socials?: {
    instagram?: string;
    x?: string;
    youtube?: string;
    tiktok?: string;
    github?: string;
    discord?: string;
  };
  seo?: {
    title?: string;
    description?: string;
  };
  showBranding?: boolean;
  links: ILink[];
}

export default function ProfileClient({ user }: { user: IUser }) {
  const username = user.username;
  const [isHovering, setIsHovering] = useState(false);

  // Performance optimized cursor handling
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 40, stiffness: 800, mass: 0.1 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, type: 'view' }),
        });
      } catch (err) {
        console.error("Visit tracking failed:", err);
      }
    };
    trackVisit();
  }, [username]);

  const handleLinkClick = async (linkId?: string) => {
    try {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, type: 'click', linkId }),
      });
    } catch (err) {
      console.error("Click tracking failed:", err);
    }
  };

  const theme = user.theme || {
    backgroundColor: '#FFF5F7',
    textColor: '#333333',
    buttonColor: '#ec5177',
    font: 'Inter',
    socialPosition: 'top',
  };

  const shareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard! 🐾');
  };

  return (
    <div className="cursor-none">
      <style jsx global>{`
        .cursor-none, .cursor-none * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Magical Theme Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-9999 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? -5 : 5,
        }}
      >
        <div 
          className="relative flex items-center justify-center -scale-x-100"
          style={{ color: theme.buttonColor }}
        >
          {/* Main Paw */}
          <PawPrint 
            size={32} 
            fill="currentColor" 
            className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)] opacity-80"
          />
          
          {/* Hover Glow Essence */}
          {isHovering && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              className="absolute inset-0 rounded-full blur-xl -z-10"
              style={{ backgroundColor: `${theme.buttonColor}40` }}
            />
          )}
        </div>
      </motion.div>

      <main
        onMouseEnter={() => setIsHovering(false)}
        className={cn(
          'min-h-svh flex items-center justify-center p-4 md:p-8 relative overflow-x-hidden transition-colors duration-700',
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
        {/* Magical Background Elements */}
        <div className='absolute inset-0 overflow-hidden pointer-events-none'>
          {/* Animated Orbs */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className='absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20'
            style={{ backgroundColor: theme.buttonColor }}
          />
          <motion.div
            animate={{
              x: [0, -120, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className='absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[140px] opacity-20'
            style={{ backgroundColor: theme.buttonColor }}
          />

          {/* Floating Paws Essence */}
          <div className='absolute inset-0 opacity-[0.05]'>
             <PawPrint className='absolute top-[10%] left-[15%] -rotate-12' size={120} style={{ color: theme.textColor }} />
             <PawPrint className='absolute bottom-[15%] left-[5%] rotate-12' size={180} style={{ color: theme.textColor }} />
             <PawPrint className='absolute top-[40%] right-[10%] rotate-45' size={90} style={{ color: theme.textColor }} />
             <PawPrint className='absolute bottom-[5%] right-[20%] -rotate-12' size={150} style={{ color: theme.textColor }} />
          </div>
        </div>

        {/* High-End Noise Overlay */}
        <div
          className='absolute inset-0 opacity-[0.04] pointer-events-none'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Main Centered Zen Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className='w-full max-w-[580px] rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] flex flex-col items-center overflow-hidden relative'
          style={{
            backgroundColor: `${theme.backgroundColor}dd`,
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {/* Card Header Actions */}
          <div className='w-full h-24 flex items-center justify-end px-8 absolute top-0 left-0 z-20'>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={shareProfile}
              className='w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-black/5 cursor-pointer'
              style={{ backgroundColor: 'white', color: theme.buttonColor }}
            >
              <Share2 size={18} />
            </motion.div>
          </div>

          {/* Profile Content */}
          <div className='w-full pt-20 pb-16 px-6 md:px-12 flex flex-col items-center'>
            {/* Avatar Area */}
            <motion.div
              className='relative mb-6'
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              <div
                className='w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[6px] shadow-2xl relative'
                style={{ borderColor: `${theme.buttonColor}40` }}
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt={user.username}
                    fill
                    className='object-cover'
                    unoptimized
                  />
                ) : (
                  <div
                    className='w-full h-full flex items-center justify-center bg-white'
                    style={{ color: theme.buttonColor }}
                  >
                    <UserIcon size={40} />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Identity */}
            <div className='flex flex-col items-center gap-1 mb-8 text-center'>
              <motion.h1
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-2xl md:text-4xl font-black tracking-tight'
                style={{ color: theme.textColor }}
              >
                @{user.username}
              </motion.h1>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='text-sm md:text-lg font-bold opacity-60 max-w-[320px] leading-relaxed'
                style={{ color: theme.textColor }}
              >
                {user.bio || 'Welcome to my Meowuwu profile! 🐾'}
              </motion.p>
            </div>

            {/* Social Icons - TOP POSITION */}
            {theme.socialPosition === 'top' && user.socials && Object.values(user.socials).some((v) => v) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='flex flex-wrap items-center justify-center gap-4 mb-10 px-6'
              >
                {Object.entries(user.socials).map(([platform, value]) => {
                  if (!value) return null;
                  const Icon = {
                    instagram: Instagram,
                    x: Twitter,
                    youtube: Youtube,
                    tiktok: Video,
                    github: Github,
                    discord: DiscordIcon,
                  }[platform as keyof typeof user.socials];

                  if (!Icon) return null;

                  // Robust URL generation
                  let url = value.trim();
                  if (!url.startsWith('http')) {
                    const domains: Record<string, string> = {
                      instagram: 'instagram.com/',
                      x: 'x.com/',
                      youtube: 'youtube.com/',
                      tiktok: 'tiktok.com/@',
                      github: 'github.com/',
                      discord: 'discord.gg/',
                    };

                    const domain = domains[platform];
                    if (url.includes(domain.replace('@', ''))) {
                      url = `https://${url}`;
                    } else {
                      url = `https://${domain}${url.replace('@', '')}`;
                    }
                  }

                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLinkClick(platform)}
                      className='w-11 h-11 rounded-full flex items-center justify-center shadow-md border border-black/5 hover:border-black/10 transition-colors'
                      style={{ backgroundColor: 'white', color: theme.buttonColor }}
                    >
                      <Icon size={20} className="opacity-90" />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}

            {/* Polished Dynamic Links */}
            <div className='w-full space-y-4 mb-20 px-2'>
              <AnimatePresence>
                {user.links
                  .filter((l) => l.isVisible)
                  .map((link, index) => {
                    const variant = link.variant || 'primary';
                    return (
                      <motion.a
                        key={link._id || index}
                        href={link.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * index + 0.6 }}
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleLinkClick(link._id)}
                        className={cn(
                          'group relative w-full h-[72px] rounded-2xl flex items-center justify-between px-8 border-2 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.1)] overflow-hidden',
                          variant === 'primary' ? 'border-transparent' : ''
                        )}
                        style={{
                          backgroundColor: variant === 'primary' ? theme.buttonColor : 'white',
                          borderColor: variant === 'primary' ? 'transparent' : `${theme.buttonColor}20`,
                        }}
                      >
                        {/* Hover Bar Essence */}
                        <div
                          className='absolute top-0 left-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-opacity'
                          style={{ backgroundColor: variant === 'primary' ? 'rgba(255,255,255,0.2)' : theme.buttonColor }}
                        />
    
                        <span 
                          className={cn(
                            'text-base md:text-xl font-black tracking-tight',
                            variant === 'primary' ? 'text-white' : 'text-[#1E231E]'
                          )}
                        >
                          {link.title}
                        </span>
                        <div
                          className='w-8 h-8 rounded-lg flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity'
                          style={{ color: variant === 'primary' ? 'white' : theme.buttonColor }}
                        >
                          <ExternalLink size={20} />
                        </div>
                      </motion.a>
                    );
                  })}
              </AnimatePresence>

              {user.links.filter((l) => l.isVisible).length === 0 && (
                <div
                  className='w-full h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl opacity-20 font-black tracking-widest uppercase text-xs gap-3'
                  style={{ borderColor: theme.textColor, color: theme.textColor }}
                >
                  <PawPrint size={24} />
                  <span>Empty Colony</span>
                </div>
              )}
            </div>

            {/* Social Icons - BOTTOM POSITION */}
            {theme.socialPosition === 'bottom' && user.socials && Object.values(user.socials).some((v) => v) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='flex flex-wrap items-center justify-center gap-4 mb-10 px-6'
              >
                {Object.entries(user.socials).map(([platform, value]) => {
                  if (!value) return null;
                  const Icon = {
                    instagram: Instagram,
                    x: Twitter,
                    youtube: Youtube,
                    tiktok: Video,
                    github: Github,
                    discord: DiscordIcon,
                  }[platform as keyof typeof user.socials];

                  if (!Icon) return null;

                  // Robust URL generation
                  let url = value.trim();
                  if (!url.startsWith('http')) {
                    const domains: Record<string, string> = {
                      instagram: 'instagram.com/',
                      x: 'x.com/',
                      youtube: 'youtube.com/',
                      tiktok: 'tiktok.com/@',
                      github: 'github.com/',
                      discord: 'discord.gg/',
                    };

                    const domain = domains[platform];
                    if (url.includes(domain.replace('@', ''))) {
                      url = `https://${url}`;
                    } else {
                      url = `https://${domain}${url.replace('@', '')}`;
                    }
                  }

                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target='_blank'
                      rel='noopener noreferrer'
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleLinkClick(platform)}
                      className='w-11 h-11 rounded-full flex items-center justify-center shadow-md border border-black/5 hover:border-black/10 transition-colors'
                      style={{ backgroundColor: 'white', color: theme.buttonColor }}
                    >
                      <Icon size={20} className="opacity-90" />
                    </motion.a>
                  );
                })}
              </motion.div>
            )}

            {/* Bottom CTA & Branding */}
            <div className='flex flex-col items-center gap-10 w-full px-4'>
              <motion.a
                href="/"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className='px-6 py-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer group flex items-center gap-2 border no-underline'
                style={{
                  backgroundColor: theme.buttonColor,
                  color: 'white',
                  borderColor: `${theme.textColor}10`,
                }}
              >
                <span className='text-xs md:text-sm font-black tracking-tight'>
                  Join @{user.username} on Meowuwu
                </span>
                <PawPrint
                  size={14}
                  fill='currentColor'
                  className='group-hover:rotate-12 transition-transform'
                />
              </motion.a>

              {user.showBranding !== false && (
                <div className='flex flex-col items-center gap-6 opacity-50 hover:opacity-100 transition-opacity mt-2'>
                  <a 
                    href="/" 
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className='flex items-center gap-2 cursor-pointer group no-underline'
                  >
                    <PawPrint
                      size={12}
                      fill='currentColor'
                      style={{ color: theme.buttonColor }}
                      className='group-hover:scale-110 transition-transform'
                    />
                    <span
                      className='text-[9px] font-black tracking-[0.4em] uppercase'
                      style={{ color: theme.textColor }}
                    >
                      Meowuwu
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
