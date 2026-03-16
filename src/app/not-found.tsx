'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PawPrint, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-6 relative overflow-hidden font-quicksand">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-meow-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-meow-accent/10 rounded-full blur-3xl"
        />
        
        {/* Floating Paws */}
        <div className="absolute inset-0 opacity-[0.03]">
          <PawPrint className="absolute top-[15%] left-[20%] -rotate-12" size={80} />
          <PawPrint className="absolute bottom-[20%] right-[15%] rotate-12" size={120} />
          <PawPrint className="absolute top-[40%] right-[25%] rotate-45" size={60} />
        </div>
      </div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* 404 Illustration Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mb-12"
        >
          <div className="flex items-center justify-center gap-1 md:gap-4 text-[8rem] md:text-[10rem] font-black text-meow-accent/10 leading-none select-none">
            <span>4</span>
            
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="relative"
            >
              <div className="relative">
                 {/* Cute Cat Silhouette/Icon */}
                 <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-meow-accent/20">
                    <PawPrint className="w-14 h-14 md:w-16 md:h-16 text-meow-accent" fill="currentColor" />
                 </div>
                 {/* Question Mark Bubble */}
                 <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-10 h-10 md:w-12 md:h-12 bg-meow-accent rounded-full flex items-center justify-center text-white shadow-lg font-black text-lg md:text-xl"
                 >
                  ?
                 </motion.div>
              </div>
            </motion.div>

            <span>4</span>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-10 px-4"
        >
          <h1 className="text-2xl md:text-3xl font-black text-meow-charcoal tracking-tight">
            Lost in the Yarn? 🧶
          </h1>
          <p className="text-sm md:text-base text-meow-charcoal/60 font-medium">
            Oops! It seems this page has wandered off like a curious kitten. 
            We couldn&apos;t find what you were looking for.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4 px-6"
        >
          <Link 
            href="/" 
            className={cn(
              "h-14 rounded-2xl bg-meow-accent hover:bg-meow-accent/90 text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-meow-accent/20 transition-all hover:scale-[1.02] active:scale-[0.98] w-full flex items-center justify-center gap-2"
            )}
          >
            <Home size={18} />
            <span>Back to Homebase</span>
          </Link>
          
          <Link 
            href="/dashboard" 
            className={cn(
               "h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-white transition-all text-meow-charcoal/40 hover:text-meow-accent w-full flex items-center justify-center gap-2 border-2 border-transparent hover:border-meow-accent/10"
            )}
          >
            <ArrowLeft size={18} />
            <span>Return to Dashboard</span>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-2 opacity-20"
        >
          <PawPrint size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Meowuwu</span>
        </motion.div>
      </div>
    </div>
  );
}
