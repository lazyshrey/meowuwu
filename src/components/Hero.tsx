"use client";

import { motion } from 'framer-motion';
import { Sparkles, Palette, ShoppingBag, Globe, Camera, Youtube, CheckCircle2, ChevronRight, PawPrint } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Show } from '@clerk/nextjs';

export default function Hero() {
  return (
    <section className="relative pt-44 pb-32 px-6 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#FFF5F7]/50 -z-10" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-left"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-meow-accent/5 text-meow-accent font-bold text-xs mb-8 border border-meow-accent/10">
            <Sparkles size={14} className="fill-current" /> NEW: PASTEL THEMES
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black text-meow-charcoal mb-8 leading-[1.1]">
            Your Links, <br />
            <span className="italic text-meow-accent relative inline-block">
              But Cuter
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-meow-accent/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q25 0 50 10 T100 10" fill="none" stroke="currentColor" strokeWidth="6" />
              </svg>
            </span>
          </h1>
          
          <p className="max-w-lg text-lg text-meow-charcoal/60 mb-10 leading-relaxed font-medium">
            The purr-fect way to share everything you do. Create a beautiful, cat-themed link card in seconds and let your personality shine.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <Show when="signed-out">
              <Link href="/sign-up" className="bg-meow-accent text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl shadow-meow-accent/30 hover:scale-105 transition-all active:scale-95 text-center">
                Create your card
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard" className="bg-meow-accent text-white px-10 py-5 rounded-3xl font-bold text-lg shadow-2xl shadow-meow-accent/30 hover:scale-105 transition-all active:scale-95">
                Go to Dashboard
              </Link>
            </Show>
          </div>
        </motion.div>

        {/* Hero Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 0 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative max-w-sm w-full"
        >
          {/* Paw background element */}
          <div className="absolute -top-10 -right-10 text-meow-accent/10 rotate-12 -z-10">
            <PawPrint size={120} />
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative overflow-hidden flex flex-col items-center">
            {/* Soft pink gradient background */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-pink-50/30 -z-10" />

            <div className="w-28 h-28 p-1.5 rounded-full border-4 border-meow-accent/20 mb-6 relative">
               <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md relative">
                 <Image src="/assets/cute-cat-avatar.png" alt="Cat Avatar" fill className="object-cover" />
               </div>
               <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md">
                 <CheckCircle2 size={16} className="text-blue-500 fill-white" />
               </div>
            </div>

            <h3 className="font-black text-2xl text-meow-charcoal mb-1 flex items-center gap-1.5">
              @meowly_artist <CheckCircle2 size={18} className="text-blue-500" />
            </h3>
            <p className="text-sm text-meow-charcoal/60 mb-10 font-medium">Digital artist & treat connoisseur 🐾</p>
               
            <div className="w-full space-y-4 mb-10">
              <MockupLink icon={Palette} label="My Portfoli-meow" color="text-[#ec5177]" />
              <MockupLink icon={ShoppingBag} label="Shop Stickers" color="text-[#ec5177]" />
              <MockupLink icon={Youtube} label="Latest YouTube Vlog" color="text-[#ec5177]" />
            </div>

            {/* Mockup Footer Icons */}
            <div className="flex items-center gap-8 text-meow-charcoal/30">
              <Globe size={22} />
              <Camera size={22} />
              <Youtube size={22} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MockupLink({ icon: Icon, label, color }: { icon: React.ElementType, label: string, color: string }) {
  return (
    <div className="w-full p-4 rounded-2xl border border-meow-charcoal/5 flex items-center justify-between group cursor-pointer hover:bg-meow-pink/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center ${color}`}>
          <Icon size={20} />
        </div>
        <span className="text-sm font-bold text-meow-charcoal/80">{label}</span>
      </div>
      <ChevronRight size={18} className="text-meow-charcoal/20 group-hover:text-meow-charcoal/40" />
    </div>
  );
}
