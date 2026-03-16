'use client';

import { useEffect, useState } from 'react';
import { useUser, SignOutButton, useClerk } from '@clerk/nextjs';
import { toast } from 'sonner';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  User as UserIcon,
  Shield,
  Globe,
  Trash2,
  Mail,
  Instagram,
  Youtube,
  Github,
  Twitter,
  Video,
  Search,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { DiscordIcon } from '@/components/icons/BrandIcons';
import { Separator } from '@/components/ui/separator';
import { DashboardSkeleton } from '@/components/dashboard/SkeletonLoader';
import LivePreview from '@/components/dashboard/LivePreview';

export default function SettingsPage() {
  const { user: clerkUser } = useUser();
  const { openUserProfile } = useClerk();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showBranding, setShowBranding] = useState(true);
  const [seo, setSeo] = useState({ title: '', description: '' });
  const [socials, setSocials] = useState({
    instagram: '',
    x: '',
    youtube: '',
    tiktok: '',
    github: '',
    discord: '',
  });
  const [links, setLinks] = useState([]);
  const [theme, setTheme] = useState({
    backgroundColor: '#FFF5F7',
    buttonColor: '#ec5177',
    textColor: '#333333',
  });
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        if (data) {
          setShowBranding(data.showBranding ?? true);
          if (data.seo) setSeo(data.seo);
          if (data.socials) {
            setSocials({
              instagram: data.socials.instagram || '',
              x: data.socials.x || '',
              youtube: data.socials.youtube || '',
              tiktok: data.socials.tiktok || '',
              github: data.socials.github || '',
              discord: data.socials.discord || '',
            });
          }
          if (data.links) {
            setLinks(
              data.links.map((l: any) => ({
                id: l._id,
                title: l.title,
                url: l.url,
                visible: l.isVisible,
              })),
            );
          }
          if (data.theme) setTheme(data.theme);
          setUsername(data.username || '');
          setBio(data.bio || '');
          setAvatarUrl(data.avatarUrl || '');
        }
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async (updates: any) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        toast.success('Settings updated! 🐾');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className='flex-1 min-w-0 overflow-y-auto no-scrollbar pb-20 px-8 py-12 max-w-3xl mx-auto text-meow-charcoal'>
      <header className='mb-12'>
        <h1 className='text-3xl font-black tracking-tight'>Settings</h1>
        <p className='text-sm font-bold opacity-40 mt-1'>
          Configure your cat command center 🐾
        </p>
      </header>

      <div className='space-y-12'>
        {/* Account Section */}
        <section className='space-y-6'>
          <div className='flex items-center gap-2 mb-2'>
            <UserIcon size={18} className='text-meow-accent' />
            <h2 className='text-lg font-black'>Account Settings</h2>
          </div>
          <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm space-y-8'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
              <div className='flex items-center gap-4'>
                <div className='w-14 h-14 bg-neutral-50 rounded-2xl flex items-center justify-center text-meow-charcoal/40 relative overflow-hidden'>
                  {clerkUser?.imageUrl ? (
                    <Image
                      src={clerkUser.imageUrl}
                      alt='User'
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <Mail size={24} />
                  )}
                </div>
                <div>
                  <Label className='text-[10px] font-black uppercase tracking-widest opacity-40'>
                    Email Address
                  </Label>
                  <p className='text-sm font-bold'>
                    {clerkUser?.primaryEmailAddress?.emailAddress ||
                      'loading...'}
                  </p>
                </div>
              </div>
              <Button
                variant='outline'
                className='w-full md:w-auto rounded-xl font-black text-[10px] uppercase tracking-widest h-10 px-6 border-2'
                onClick={() => openUserProfile()}
              >
                Manage Profile
              </Button>
            </div>
          </Card>
        </section>

        {/* Socials Section */}
        <section className='space-y-6'>
          <div className='flex items-center gap-2 mb-2'>
            <Sparkles size={18} className='text-meow-accent' />
            <h2 className='text-lg font-black'>Social Accounts</h2>
          </div>
          <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm space-y-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {[
                {
                  id: 'instagram',
                  label: 'Instagram',
                  icon: Instagram,
                  ph: 'instagram.com/username',
                },
                {
                  id: 'x',
                  label: 'X (Twitter)',
                  icon: Twitter,
                  ph: 'x.com/username',
                },
                {
                  id: 'youtube',
                  label: 'YouTube',
                  icon: Youtube,
                  ph: 'youtube.com/@channel',
                },
                {
                  id: 'tiktok',
                  label: 'TikTok',
                  icon: Video,
                  ph: 'tiktok.com/@username',
                },
                {
                  id: 'github',
                  label: 'GitHub',
                  icon: Github,
                  ph: 'github.com/username',
                },
                  {
                    id: 'discord',
                    label: 'Discord Server',
                    icon: DiscordIcon,
                    ph: 'discord.gg/invite',
                  },
              ].map((social) => (
                <div key={social.id} className='space-y-3'>
                  <Label className='text-[10px] font-black uppercase tracking-widest opacity-40 ml-1'>
                    {social.label}
                  </Label>
                  <div className='relative group'>
                    <social.icon
                      size={16}
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-meow-charcoal/20 group-focus-within:text-meow-accent transition-colors'
                    />
                    <Input
                      value={(socials as any)[social.id] || ''}
                      onChange={(e) =>
                        setSocials((prev) => ({
                          ...prev,
                          [social.id]: e.target.value,
                        }))
                      }
                      placeholder={social.ph}
                      className='pl-11 h-14 rounded-2xl border-neutral-100 font-bold focus:ring-meow-accent/10 transition-all border-2'
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              className='w-full h-14 rounded-2xl bg-meow-accent hover:bg-meow-accent/90 text-white font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-meow-accent/20'
              onClick={() => handleSave({ socials })}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Social Updates'}
            </Button>
          </Card>
        </section>

        {/* SEO Section */}
        <section className='space-y-6'>
          <div className='flex items-center gap-2 mb-2'>
            <Search size={18} className='text-meow-accent' />
            <h2 className='text-lg font-black'>SEO & Discovery</h2>
          </div>
          <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm space-y-8'>
            <div className='space-y-6'>
              <div className='space-y-3'>
                <Label className='text-[10px] font-black uppercase tracking-widest opacity-40 ml-1'>
                  Meta Title
                </Label>
                <Input
                  value={seo.title}
                  onChange={(e) =>
                    setSeo((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder='The purr-fect link page'
                  className='h-14 rounded-2xl border-neutral-100 font-bold border-2'
                />
              </div>
              <div className='space-y-3'>
                <Label className='text-[10px] font-black uppercase tracking-widest opacity-40 ml-1'>
                  Meta Description
                </Label>
                <Textarea
                  value={seo.description}
                  onChange={(e) =>
                    setSeo((prev) => ({ ...prev, description: e.target.value }))
                  }
                  placeholder='Everything about my meow-life in one place.'
                  className='rounded-2xl border-neutral-100 font-bold min-h-[100px] border-2 p-5 resize-none'
                />
              </div>
              <Button
                className='w-full h-14 rounded-2xl bg-meow-accent hover:bg-meow-accent/90 text-white font-black text-[11px] uppercase tracking-widest transition-all shadow-xl shadow-meow-accent/20'
                onClick={() => handleSave({ seo })}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Update SEO Settings'}
              </Button>
            </div>
          </Card>
        </section>

        {/* Branding preferences */}
        <section className='space-y-6'>
          <div className='flex items-center gap-2 mb-2'>
            <Shield size={18} className='text-meow-accent' />
            <h2 className='text-lg font-black'>Preferences</h2>
          </div>
          <Card className='p-0 overflow-hidden rounded-[2.5rem] border-2 border-neutral-50 shadow-sm'>
            <div className='p-8 flex items-center justify-between hover:bg-neutral-50/50 transition-colors'>
              <div className='space-y-1'>
                <p className='font-black'>Show Meowuwu Branding</p>
                <p className='text-xs font-bold opacity-30 uppercase tracking-wider'>
                  Display the badge at the bottom of your profile
                </p>
              </div>
              <Switch
                checked={showBranding}
                onCheckedChange={(val) => {
                  setShowBranding(val);
                  handleSave({ showBranding: val });
                }}
              />
            </div>
          </Card>
        </section>

        {/* Session Section */}
        <section className='space-y-6'>
          <div className='flex items-center gap-2 mb-2'>
            <Shield size={18} className='text-meow-accent' />
            <h2 className='text-lg font-black'>Session</h2>
          </div>
          <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm space-y-4'>
            <div className='flex flex-col gap-4'>
              <Button
                variant='outline'
                className='w-full h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest border-2'
                onClick={() => openUserProfile()}
              >
                Account Settings
              </Button>
              <SignOutButton>
                <Button
                  variant='ghost'
                  className='w-full h-14 rounded-2xl font-black text-[11px] uppercase tracking-widest border-2 border-neutral-200 hover:bg-neutral-50 transition-colors'
                >
                  <LogOut size={16} className='mr-3' />
                  Sign Out
                </Button>
              </SignOutButton>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
