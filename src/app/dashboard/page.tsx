"use client";

import { useEffect, useState, useRef } from "react";
import LinkEditor from "@/components/dashboard/LinkEditor";
import LivePreview from "@/components/dashboard/LivePreview";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";
import { DashboardSkeleton } from "@/components/dashboard/SkeletonLoader";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  visible: boolean;
  variant: 'primary' | 'secondary';
  clicks: number;
}

export default function DashboardPage() {
  const { user } = useUser();
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [theme, setTheme] = useState({
    backgroundColor: "#FFF5F7",
    buttonColor: "#ec5177",
    textColor: "#333333",
    font: "Inter",
    socialPosition: "top" as "top" | "bottom"
  });
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [socials, setSocials] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showBranding, setShowBranding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const initialFetchDone = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user", { cache: "no-store" });
        const data = await response.json();
        
        if (data) {
          const transformedLinks = data.links.map((l: { _id: string; title: string; url: string; isVisible: boolean; variant?: string; clicks?: number }) => ({
            id: l._id || Math.random().toString(36).substr(2, 9),
            title: l.title,
            url: l.url,
            visible: l.isVisible,
            variant: (l.variant as 'primary' | 'secondary') || 'primary',
            clicks: l.clicks || 0
          }));
          
          setLinks(transformedLinks);
          setBio(data.bio || "");
          setUsername(data.username || "");
          setAvatarUrl(data.avatarUrl || "");
          setSocials(data.socials || {});
          setShowBranding(data.showBranding ?? true);
          if (data.theme) {
            setTheme({
              backgroundColor: data.theme.backgroundColor || '#FFF5F7',
              buttonColor: data.theme.buttonColor || '#ec5177',
              textColor: data.theme.textColor || '#333333',
              font: data.theme.font || 'Inter',
              socialPosition: data.theme.socialPosition || 'top'
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        toast.error("Failed to load your data");
      } finally {
        setIsLoading(false);
        initialFetchDone.current = true;
      }
    };

    fetchUserData();
  }, []);

  const debouncedSave = useDebouncedCallback(async (linksToSave: LinkItem[]) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          links: linksToSave.map(l => ({
            title: l.title,
            url: l.url,
            isVisible: l.visible,
            variant: l.variant || 'primary',
            clicks: l.clicks
          }))
        })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.fieldErrors?.links?.[0] || "Failed to save");
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save changes";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }, 1000);

  const handleLinksChange = (newLinks: LinkItem[]) => {
    setLinks(newLinks);
    debouncedSave(newLinks);
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex h-full w-full relative">
      {/* Saving Indicator */}
      {isSaving && (
        <div className="absolute top-6 right-8 z-50 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-neutral-100 animate-in fade-in slide-in-from-top-4">
          <div className="w-2 h-2 bg-meow-accent rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-meow-accent">Saving Data</span>
        </div>
      )}

      {/* Editor Section */}
      <div className="flex-1 min-w-0 overflow-y-auto no-scrollbar pb-20">
        <LinkEditor links={links} onLinksChange={handleLinksChange} username={username} />
      </div>
      {/* Preview Section - Only visible on Large Screens */}
      <div className="hidden xl:flex w-[480px] border-l border-neutral-100 py-12 px-10 flex-col bg-white sticky top-0 h-screen">
        <LivePreview 
          username={username || user?.username || "shrey"}
          avatarUrl={avatarUrl || user?.imageUrl}
          bio={bio}
          links={links} 
          socials={socials}
          showBranding={showBranding}
          theme={theme}
        />
      </div>
    </div>
  );
}
