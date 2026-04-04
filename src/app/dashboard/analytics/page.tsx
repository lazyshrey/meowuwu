"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointer2,
  Calendar,
  ArrowUpRight,
  PawPrint,
  ExternalLink
} from "lucide-react";
import { DashboardSkeleton } from "@/components/dashboard/SkeletonLoader";

interface LinkStat {
  _id: string;
  title: string;
  url: string;
  clicks: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<{ views: number; uniqueViews: number; links: LinkStat[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/user', { cache: 'no-store' });
        const userData = await res.json();
        setData({
          views: userData.views || 0,
          uniqueViews: userData.uniqueViews || 0,
          links: userData.links || []
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) return <DashboardSkeleton />;

  const totalClicks = data?.links.reduce((acc, curr) => acc + (curr.clicks || 0), 0) || 0;
  // CTR is better calculated based on unique visits to avoid inflation from refreshes
  const ctr = data?.uniqueViews ? ((totalClicks / data.uniqueViews) * 100).toFixed(1) : "0.0";

  const STATS = [
    { label: "Unique Visitors", value: data?.uniqueViews.toLocaleString() || "0", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Total Views", value: data?.views.toLocaleString() || "0", icon: MousePointer2, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Total Clicks", value: totalClicks.toLocaleString(), icon: ExternalLink, color: "text-meow-accent", bg: "bg-meow-accent/10" },
    { label: "Unique CTR", value: `${ctr}%`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="flex-1 min-w-0 h-full overflow-y-auto no-scrollbar pb-20 px-8 py-12 max-w-4xl mx-auto flex flex-col">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-meow-charcoal tracking-tight">Analytics</h1>
          <p className="text-sm font-bold text-meow-charcoal/40 mt-1">Track your cat-tastic performance</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </div>
            <p className="text-xs font-black text-meow-charcoal/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-meow-charcoal">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Links Performance */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-meow-charcoal flex items-center gap-2">
            <BarChart3 size={18} className="text-meow-accent" />
            Link Performance
          </h2>
        </div>
        <div className="bg-white rounded-[2.5rem] border-2 border-neutral-50 shadow-sm overflow-hidden">
          {data?.links && data.links.length > 0 ? (
            <div className="flex flex-col divide-y-2 divide-neutral-50">
              <div className="px-8 py-4 bg-neutral-50/30 flex items-center justify-between gap-4">
                <p className="text-[10px] font-black text-meow-charcoal/30 uppercase tracking-[0.2em]">Link Details</p>
                <p className="text-[10px] font-black text-meow-charcoal/30 uppercase tracking-[0.2em] text-right">Clicks</p>
              </div>
              {data.links
                .sort((a, b) => b.clicks - a.clicks)
                .map((link) => (
                  <div key={link._id} className="p-6 flex flex-row items-center justify-between group hover:bg-neutral-50/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-meow-charcoal/30 group-hover:text-meow-accent transition-colors">
                        <ExternalLink size={18} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-black text-meow-charcoal tracking-tight leading-none mb-1">{link.title}</p>
                        <p className="text-[10px] font-bold text-meow-charcoal/20 uppercase tracking-widest truncate max-w-[200px] md:max-w-[400px] hover:text-meow-accent transition-colors">{link.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-meow-charcoal leading-none mb-1">{(link.clicks || 0).toLocaleString()}</p>
                      <p className="text-[10px] font-black text-meow-charcoal/20 uppercase tracking-widest">Global Clicks</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200 mb-4">
                <PawPrint size={32} />
              </div>
              <p className="font-black text-meow-charcoal/20 text-lg">No links found to track</p>
              <p className="text-xs font-bold text-meow-charcoal/10 uppercase tracking-widest mt-1">Add some links to see the magic</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
