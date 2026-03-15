"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Palette, BarChart3, Settings, PawPrint, LogOut } from 'lucide-react';
import { SignOutButton } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Links', href: '/dashboard' },
  { icon: Palette, label: 'Appearance', href: '/dashboard/appearance' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full flex flex-col p-6 pr-0">
      <div className="glass-card h-full flex flex-col p-6">
        <Link href="/" className="flex items-center gap-2 mb-10 group">
          <div className="w-8 h-8 bg-meow-accent rounded-lg flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <PawPrint size={18} />
          </div>
          <span className="text-xl font-bold text-meow-charcoal">Meowuwu</span>
        </Link>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all",
                pathname === item.href 
                  ? "bg-meow-accent text-white shadow-md shadow-meow-accent/20" 
                  : "text-meow-charcoal/60 hover:bg-white/50 hover:text-meow-charcoal"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/20">
          <SignOutButton>
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-meow-charcoal/60 hover:bg-red-50 hover:text-red-500 transition-all w-full text-left">
              <LogOut size={20} />
              Logout
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}
