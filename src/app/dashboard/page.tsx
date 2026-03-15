import LinkEditor from "@/components/dashboard/LinkEditor";
import { PawPrint } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex h-full gap-8">
      {/* Editor Section */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-4 custom-scrollbar">
        <LinkEditor />
      </div>

      {/* Preview Section */}
      <div className="hidden lg:flex w-96 flex-col">
        <div className="flex items-center justify-between mb-8 pr-4">
          <h2 className="text-xl font-bold text-meow-charcoal">Live Preview</h2>
          <div className="flex items-center gap-1 text-sm bg-meow-accent/10 text-meow-accent px-3 py-1 rounded-full font-bold">
            <span className="w-2 h-2 bg-meow-accent rounded-full animate-pulse"></span>
            Syncing
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="w-[320px] h-[640px] glass-card border-12 border-white/60 rounded-4xl shadow-2xl relative overflow-hidden flex flex-col p-8 items-center text-center">
             <div className="absolute inset-0 bg-meow-pink -z-10 opacity-30"></div>
             
             <div className="w-20 h-20 bg-white rounded-full mb-4 border-4 border-white shadow-lg relative cat-ears">
                <Image src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=preview" alt="Avatar" fill className="rounded-full object-cover" unoptimized />
             </div>
             <h3 className="font-bold text-xl mb-1 text-meow-charcoal">@username</h3>
             <p className="text-xs text-meow-charcoal/60 mb-8 font-medium">Digital Creator 🐾</p>

             <div className="w-full space-y-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="w-full h-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 flex items-center px-4 shadow-sm">
                   <div className="w-6 h-6 bg-meow-accent/20 rounded-lg mr-3"></div>
                   <div className="h-2 w-24 bg-meow-charcoal/10 rounded"></div>
                 </div>
               ))}
             </div>

             <div className="mt-auto pt-8 opacity-20 flex items-center gap-1 font-black text-[10px] tracking-widest uppercase">
               <PawPrint size={10} /> Meowuwu
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
