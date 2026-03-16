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

export function ProfileSkeleton() {
    return (
        <div className="min-h-screen py-20 px-6 flex flex-col items-center space-y-8 bg-[#FFF5F7]">
            <Skeleton className="w-32 h-32 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <div className="w-full max-w-sm space-y-4 pt-10">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="w-full h-16 rounded-[2rem]" />
                ))}
            </div>
        </div>
    );
}
