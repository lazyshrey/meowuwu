"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="flex h-full w-full">
      <div className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-10 w-48 rounded-2xl" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 rounded-[2.5rem] border-2 border-neutral-50">
              <div className="flex gap-4">
                <Skeleton className="w-12 h-12 rounded-2xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="hidden xl:flex w-[480px] border-l border-neutral-100 py-12 px-10 flex-col items-center">
        <Skeleton className="w-[300px] h-[600px] rounded-[3rem]" />
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { PawPrint } from "lucide-react";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen py-20 px-6 flex flex-col items-center justify-center space-y-8 bg-[#FFF5F7]">
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 bg-white/60 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-meow-accent shadow-sm border-2 border-white"
      >
        <PawPrint size={48} strokeWidth={2.5} />
      </motion.div>
      
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-4 w-32 rounded-full opacity-50" />
        <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-meow-accent/20 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-meow-accent/20 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-meow-accent/20 animate-bounce" />
        </div>
      </div>

      <div className="w-full max-w-sm space-y-4 pt-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full h-16 bg-white/40 backdrop-blur-sm rounded-[2rem] border-2 border-white/50 flex items-center px-6">
            <Skeleton className="h-2 w-1/2 opacity-30" />
          </div>
        ))}
      </div>
    </div>
  );
}
