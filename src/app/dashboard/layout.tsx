import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-meow-pink overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 pl-0">
        <div className="h-full glass-card p-8 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
