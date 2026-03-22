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
        <SidebarInset className="flex-1 flex flex-col h-full overflow-hidden bg-transparent">
          {/* Unified Mobile Header */}
          <header className="md:hidden w-full shrink-0 sticky top-0 z-40 flex items-center justify-between px-6 h-20 bg-white/80 backdrop-blur-md border-b border-neutral-100/50">
            <SidebarTrigger className="h-12 w-12 shrink-0 text-meow-accent hover:bg-meow-accent/5 rounded-2xl border-none transition-all active:scale-90" />
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 bg-meow-accent rounded-2xl flex items-center justify-center text-white shadow-lg shadow-meow-accent/20">
                <PawPrint size={22} fill="currentColor" />
              </div>
            </div>
          </header>

          <div className="flex-1 min-h-0 w-full">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
