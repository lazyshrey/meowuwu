import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSidebar from "@/components/dashboard/Sidebar";
import { PawPrint } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-y-auto no-scrollbar bg-transparent">
          {/* Unified Mobile Header */}
          <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-6 h-20 bg-white/80 backdrop-blur-md border-b border-neutral-100/50">
            <SidebarTrigger className="h-12 w-12 text-meow-accent hover:bg-meow-accent/5 rounded-2xl border-none transition-all active:scale-90" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-meow-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-meow-accent/20">
                <PawPrint size={22} fill="currentColor" />
              </div>
            </div>
          </header>

          <div className="h-full w-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
