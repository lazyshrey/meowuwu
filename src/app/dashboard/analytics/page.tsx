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
  const [data, setData] = useState<{ views: number; links: LinkStat[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/user', { cache: 'no-store' });
        const userData = await res.json();
        setData({
          views: userData.views || 0,
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
  const ctr = data?.views ? ((totalClicks / data.views) * 100).toFixed(1) : "0.0";

  const STATS = [
    { label: "Total Views", value: data?.views.toLocaleString() || "0", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Total Clicks", value: totalClicks.toLocaleString(), icon: MousePointer2, color: "text-meow-accent", bg: "bg-meow-accent/10" },
    { label: "Avg. CTR", value: `${ctr}%`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="flex-1 min-w-0 overflow-y-auto no-scrollbar pb-20 px-8 py-12 max-w-5xl mx-auto">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-meow-charcoal tracking-tight">Analytics</h1>
          <p className="text-sm font-bold text-meow-charcoal/40 mt-1">Track your cat-tastic performance 📈</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border-2 border-neutral-50 shadow-sm">
          <Calendar size={16} className="text-meow-accent" />
          <span className="text-xs font-black uppercase tracking-widest text-meow-charcoal/60">Real-time Stats</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {STATS.map((stat) => (
          <Card key={stat.label} className="p-6 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-[10px] font-black">
                <ArrowUpRight size={10} />
                Live
              </div>
            </div>
            <p className="text-xs font-black text-meow-charcoal/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-meow-charcoal">{stat.value}</p>
          </Card>
        ))}
      </div>

      {/* Links Performance */}
      <section className="space-y-6">
        <h2 className="text-lg font-black text-meow-charcoal flex items-center gap-2">
          <BarChart3 size={18} className="text-meow-accent" />
          Link Performance
        </h2>
        <div className="grid gap-4">
          {data?.links && data.links.length > 0 ? (
            data.links
              .sort((a, b) => b.clicks - a.clicks)
              .map((link) => (
                <Card key={link._id} className="p-6 rounded-[2rem] border-2 border-neutral-50 shadow-sm flex items-center justify-between group hover:border-meow-accent/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-neutral-50 rounded-xl flex items-center justify-center text-meow-charcoal/30 group-hover:text-meow-accent transition-colors">
                      <ExternalLink size={18} />
                    </div>
                    <div>
                      <p className="font-black text-meow-charcoal tracking-tight">{link.title}</p>
                      <p className="text-[10px] font-bold text-meow-charcoal/30 uppercase tracking-widest truncate max-w-[200px]">{link.url}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-meow-charcoal">{link.clicks || 0}</p>
                    <p className="text-[10px] font-black text-meow-charcoal/30 uppercase tracking-widest">Clicks</p>
                  </div>
                </Card>
              ))
          ) : (
            <Card className="p-12 rounded-[3rem] border-2 border-dashed border-neutral-100 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center text-neutral-200 mb-4">
                <PawPrint size={32} />
              </div>
              <p className="font-black text-meow-charcoal/20 text-lg">No links found to track</p>
              <p className="text-xs font-bold text-meow-charcoal/10 uppercase tracking-widest mt-1">Add some links to see the magic</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
