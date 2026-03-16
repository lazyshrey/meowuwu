"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Link as LinkIcon, 
  Palette, 
  BarChart3, 
  Settings, 
  PawPrint, 
  LogOut, 
  Crown,
  User
} from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { icon: LinkIcon, label: "Links", href: "/dashboard" },
  { icon: Palette, label: "Appearance", href: "/dashboard/appearance" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar className="border-r border-neutral-100 bg-white">
      <SidebarHeader className="p-8 pb-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-meow-accent rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-12 shadow-lg shadow-meow-accent/20">
            <PawPrint size={22} fill="currentColor" />
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-black text-meow-charcoal tracking-tight">Meowuwu</span>
             <span className="text-[10px] font-black text-meow-accent uppercase tracking-widest -mt-1">Dashboard</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={isActive}
                      className={cn(
                        "h-14 px-6 rounded-2xl font-bold transition-all border-none relative group/btn overflow-hidden",
                        isActive 
                          ? "bg-meow-accent/5 text-meow-accent" 
                          : "text-meow-charcoal/40 hover:text-meow-charcoal hover:bg-neutral-50"
                      )}
                    >
                      {/* Left Indicator */}
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-meow-accent rounded-r-full" />
                      )}

                      <div className="flex items-center gap-4 w-full">
                        <item.icon 
                          size={22} 
                          className={cn(
                            "transition-all duration-300", 
                            isActive ? "scale-110" : "group-hover/btn:scale-105"
                          )} 
                        />
                        <span className="text-base flex-1">{item.label}</span>
                        {isActive && <PawPrint size={14} className="opacity-40" />}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6">

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-neutral-100">
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback className="bg-meow-accent/10 text-meow-accent font-black">
              <User size={18} />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-meow-charcoal truncate">
              {user?.fullName || "Meow Master"}
            </p>
            <p className="text-[10px] font-medium text-meow-charcoal/40 truncate">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <SignOutButton>
            <Button variant="ghost" size="icon" className="text-meow-charcoal/30 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
              <LogOut size={18} />
            </Button>
          </SignOutButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
