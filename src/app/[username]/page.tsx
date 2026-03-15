import connectToDatabase from "@/lib/mongodb";
import User, { ILink, IUser } from "@/models/User";
import { notFound } from "next/navigation";
import { PawPrint, ExternalLink } from "lucide-react";
import Image from "next/image";

export default async function PublicProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  await connectToDatabase();
  const user = await User.findOne({ username }).lean() as unknown as IUser;

  if (!user) {
    notFound();
  }

  const theme = user.theme || {
    backgroundColor: '#FFD1DC',
    cardColor: 'rgba(255, 255, 255, 0.4)',
    textColor: '#333333',
    buttonColor: '#ec5177',
  };

  return (
    <main 
      className="min-h-screen py-20 px-6 flex flex-col items-center justify-start text-center"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      {/* Profile Header */}
      <div className="relative mb-8">
        <div 
          className="w-32 h-32 rounded-full border-8 border-white shadow-2xl overflow-hidden cat-ears relative bg-white"
        >
          <Image 
            src={user.avatarUrl || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${username}`} 
            alt={username} 
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      <h1 className="text-3xl font-black mb-2" style={{ color: theme.textColor }}>
        @{user.username}
      </h1>
      <p className="max-w-xs text-lg mb-10 font-medium opacity-80" style={{ color: theme.textColor }}>
        {user.bio || "Welcome to my Meowuwu profile! 🐾"}
      </p>

      {/* Links List */}
      <div className="w-full max-w-md space-y-4">
        {user.links.filter((l: ILink) => l.isVisible).map((link: ILink, index: number) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full p-4 glass-card flex items-center justify-between group transition-all hover:scale-105 active:scale-95 text-left"
            style={{ backgroundColor: theme.cardColor, color: theme.textColor }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center text-meow-accent">
                <PawPrint size={20} />
              </div>
              <span className="text-lg font-bold">{link.title}</span>
            </div>
            <ExternalLink size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
        
        {user.links.filter((l: ILink) => l.isVisible).length === 0 && (
          <div className="glass-card p-8 italic opacity-60">
            No links added yet. Meow!
          </div>
        )}
      </div>

      {/* Footer Branding */}
      <div className="mt-20 flex items-center gap-2 opacity-50 font-bold tracking-tight">
        <PawPrint size={16} /> Meowuwu
      </div>
    </main>
  );
}
