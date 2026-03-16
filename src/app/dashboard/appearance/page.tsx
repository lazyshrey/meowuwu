'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import Image from 'next/image';
import { Palette, Sparkles, Type, Check, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import LivePreview from '@/components/dashboard/LivePreview';
import { DashboardSkeleton } from '@/components/dashboard/SkeletonLoader';

const THEMES = [
  { name: 'Sakura', bg: '#FFF5F7', accent: '#ec5177', text: '#333333' },
  { name: 'Midnight', bg: '#1a1625', accent: '#a78bfa', text: '#ffffff' },
  { name: 'Ocean', bg: '#F0F9FF', accent: '#0ea5e9', text: '#0f172a' },
  { name: 'Matcha', bg: '#F7FEE7', accent: '#65a30d', text: '#1a2e05' },
];

const FONTS = [
  { id: 'Inter', name: 'Inter', class: 'font-inter' },
  { id: 'Outfit', name: 'Outfit', class: 'font-outfit' },
  { id: 'Roboto', name: 'Roboto', class: 'font-roboto' },
  { id: 'Geist', name: 'Geist', class: 'font-geist' },
  { id: 'Quicksand', name: 'Quicksand', class: 'font-quicksand' },
];

export default function AppearancePage() {
  const { user } = useUser();
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [theme, setTheme] = useState({
    backgroundColor: '#FFF5F7',
    buttonColor: '#ec5177',
    textColor: '#333333',
    font: 'Inter',
    socialPosition: 'top' as 'top' | 'bottom',
  });
  const [links, setLinks] = useState([]);
  const [socials, setSocials] = useState({});
  const [showBranding, setShowBranding] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        if (data) {
          setBio(data.bio || '');
          setUsername(data.username || '');
          setAvatarUrl(data.avatarUrl || '');
          setSocials(data.socials || {});
          setShowBranding(data.showBranding ?? true);
          if (data.theme) {
            setTheme({
              backgroundColor: data.theme.backgroundColor || '#FFF5F7',
              buttonColor: data.theme.buttonColor || '#ec5177',
              textColor: data.theme.textColor || '#333333',
              font: data.theme.font || 'Inter',
              socialPosition: data.theme.socialPosition || 'top',
            });
          }
          if (data.links) {
            setLinks(
              data.links.map(
                (l: {
                  _id: string;
                  title: string;
                  url: string;
                  isVisible: boolean;
                  variant?: string;
                }) => ({
                  id: l._id,
                  title: l.title,
                  url: l.url,
                  visible: l.isVisible,
                  variant: (l.variant as 'primary' | 'secondary') || 'primary',
                }),
              ),
            );
          }
        }
      } catch {
        toast.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const checkUsername = async (name: string) => {
    if (name.length < 3) return;
    setIsCheckingUsername(true);
    try {
      const res = await fetch(`/api/user/check-username?username=${name}`);
      const data = await res.json();
      setIsUsernameAvailable(data.available);
      if (!data.available) {
        toast.error('Username is already taken! 🐾', { id: 'username-check' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleUsernameChange = (val: string) => {
    const cleaned = val.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(cleaned);
    if (cleaned.length >= 3) {
      checkUsername(cleaned);
    } else {
      setIsUsernameAvailable(true);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!IMGBB_KEY) {
      toast.error('ImgBB API Key is missing! 🐾');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      if (data.success) {
        setAvatarUrl(data.data.url);
        toast.success('Avatar uploaded! 📸');
      } else {
        throw new Error();
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrors({});
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio, theme, username, avatarUrl }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Appearance updated!');
      } else {
        if (data.error?.fieldErrors) {
          setErrors(data.error.fieldErrors);
          toast.error('Please fix the errors below');
        } else {
          throw new Error();
        }
      }
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <DashboardSkeleton />;

  return (
    <div className='flex h-full w-full relative'>
      {/* Saving Indicator */}
      {isSaving && (
        <div className='absolute top-6 right-8 z-50 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-neutral-100 animate-in fade-in slide-in-from-top-4'>
          <div className='w-2 h-2 bg-meow-accent rounded-full animate-pulse' />
          <span className='text-[10px] font-black uppercase tracking-wider text-meow-accent'>
            Saving Changes
          </span>
        </div>
      )}

      {/* Editor Section */}
      <div className='flex-1 min-w-0 overflow-y-auto no-scrollbar pb-20 px-8 py-12 max-w-3xl mx-auto'>
        <header className='mb-12'>
          <h1 className='text-3xl font-black text-meow-charcoal tracking-tight'>
            Appearance
          </h1>
          <p className='text-sm font-bold text-meow-charcoal/40 mt-1'>
            Make your profile as unique as your cat 🐾
          </p>
        </header>

        <div className='space-y-10'>
          {/* Avatar Section */}
          <section className='space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Card className='w-full p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm flex flex-col md:flex-row items-center gap-8'>
                <div className='relative group'>
                  <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-neutral-100 shadow-xl relative bg-neutral-50 flex items-center justify-center'>
                    {isUploading ? (
                      <div className='absolute inset-0 bg-white/80 z-10 flex items-center justify-center'>
                        <div className='w-8 h-8 border-4 border-meow-accent border-t-transparent rounded-full animate-spin' />
                      </div>
                    ) : avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt='Avatar'
                        fill
                        className='object-cover group-hover:scale-110 transition-transform duration-500'
                        unoptimized
                      />
                    ) : (
                      <UserIcon size={48} className='text-neutral-200' />
                    )}
                  </div>
                  <label className='absolute inset-0 cursor-pointer rounded-full z-20'>
                    <input
                      type='file'
                      className='hidden'
                      accept='image/*'
                      onChange={handleAvatarUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <div className='flex-1 text-center md:text-left space-y-4'>
                  <div className='space-y-1'>
                    <h3 className='text-xl font-black text-meow-charcoal'>
                      Profile Picture
                    </h3>
                    <p className='text-xs font-bold text-meow-charcoal/40 uppercase tracking-wider'>
                      Click the image to upload a new avatar 🐾
                    </p>
                  </div>
                  <div className='flex flex-wrap justify-center md:justify-start gap-2'>
                    <Button
                      variant='outline'
                      className='rounded-full h-10 px-6 font-black text-[10px] uppercase tracking-widest border-2 hover:bg-neutral-50'
                      onClick={() =>
                        (
                          document.querySelector(
                            'input[type="file"]',
                          ) as HTMLInputElement
                        )?.click()
                      }
                    >
                      Change Avatar
                    </Button>
                    {avatarUrl && (
                      <Button
                        variant='ghost'
                        className='rounded-full h-10 px-6 font-black text-[10px] uppercase tracking-widest text-red-500 hover:bg-red-50 hover:text-red-600'
                        onClick={() => setAvatarUrl('')}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </section>
          {/* Profile Section */}
          <section className='space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Type size={18} className='text-meow-accent' />
              <h2 className='text-lg font-black text-meow-charcoal'>Profile</h2>
            </div>
            <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm space-y-8'>
              <div className='space-y-3'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-meow-charcoal/40 ml-1'>
                  Your Custom URL
                </Label>
                <div
                  className={cn(
                    'flex items-center h-16 rounded-2xl border-2 border-neutral-100 bg-neutral-50/30 overflow-hidden transition-all focus-within:border-meow-accent focus-within:bg-white focus-within:ring-4 focus-within:ring-meow-accent/10 group',
                    errors.username &&
                      'border-red-500 bg-red-50/30 focus-within:border-red-500 focus-within:ring-red-500/10',
                  )}
                >
                  <div className='px-5 border-r border-neutral-100 h-full flex items-center bg-neutral-50 group-focus-within:bg-neutral-100 transition-colors'>
                    <span className='text-sm font-black text-meow-charcoal/30 tracking-tight'>
                      meowuwu.in/
                    </span>
                  </div>
                  <input
                    value={username}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    placeholder='username'
                    className='flex-1 h-full px-5 bg-transparent border-none outline-none font-bold text-meow-charcoal placeholder:text-meow-charcoal/10'
                  />
                  {isCheckingUsername && (
                    <div className='pr-5'>
                      <div className='w-4 h-4 border-2 border-meow-accent border-t-transparent rounded-full animate-spin' />
                    </div>
                  )}
                </div>
                {!isUsernameAvailable && (
                  <p className='text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1'>
                    Username is not available
                  </p>
                )}
                {errors.username && (
                  <p className='text-[10px] font-bold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1'>
                    {errors.username[0]}
                  </p>
                )}
              </div>
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <Label className='text-[10px] font-black uppercase tracking-widest text-meow-charcoal/40 ml-1'>
                    Bio
                  </Label>
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mr-1",
                    bio.length > 70 ? "text-meow-accent" : "text-meow-charcoal/20"
                  )}>
                    {bio.length}/80
                  </span>
                </div>
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  maxLength={80}
                  placeholder='Snack expert & Nap enthusiast...'
                  className='rounded-2xl border-neutral-100 font-medium min-h-[100px] focus:ring-meow-accent/20 transition-all resize-none'
                />
              </div>
            </Card>
          </section>

          {/* Theme Section */}
          <section className='space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Palette size={18} className='text-meow-accent' />
              <h2 className='text-lg font-black text-meow-charcoal'>Themes</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {THEMES.map((t) => (
                <button
                  key={t.name}
                  onClick={() =>
                    setTheme((prev) => ({
                      ...prev,
                      backgroundColor: t.bg,
                      buttonColor: t.accent,
                      textColor: t.text,
                    }))
                  }
                  className={cn(
                    'group relative h-32 rounded-[2rem] border-4 transition-all overflow-hidden',
                    theme.backgroundColor === t.bg
                      ? 'border-meow-accent'
                      : 'border-neutral-50 hover:border-neutral-100',
                  )}
                  style={{ backgroundColor: t.bg }}
                >
                  <div className='absolute inset-0 flex flex-col items-center justify-center gap-2'>
                    <div
                      className='w-8 h-4 rounded-full'
                      style={{ backgroundColor: t.accent }}
                    />
                    <span
                      className='text-[10px] font-black uppercase tracking-widest'
                      style={{ color: t.text }}
                    >
                      {t.name}
                    </span>
                  </div>
                  {theme.backgroundColor === t.bg && (
                    <div className='absolute top-2 right-2 w-5 h-5 bg-meow-accent rounded-full flex items-center justify-center text-white scale-90'>
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Custom Colors */}
          <section className='space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Sparkles size={18} className='text-meow-accent' />
              <h2 className='text-lg font-black text-meow-charcoal'>
                Custom Colors
              </h2>
            </div>
            <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-10'>
              <div className='space-y-4'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-meow-charcoal/40 ml-1'>
                  Page Background
                </Label>
                <div className='flex gap-4 items-center'>
                  <div className='relative w-16 h-16 shrink-0 group'>
                    <div
                      className='absolute inset-0 rounded-[1.25rem] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110'
                      style={{ backgroundColor: theme.backgroundColor }}
                    >
                      <input
                        type='color'
                        value={theme.backgroundColor}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            backgroundColor: e.target.value,
                          }))
                        }
                        className='absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150'
                      />
                    </div>
                  </div>
                  <div className='flex-1 space-y-1'>
                    <Input
                      value={theme.backgroundColor}
                      onChange={(e) =>
                        setTheme((prev) => ({
                          ...prev,
                          backgroundColor: e.target.value,
                        }))
                      }
                      className='h-12 rounded-xl border-neutral-100 font-mono font-bold tracking-wider uppercase text-xs focus:ring-meow-accent/10'
                      maxLength={7}
                    />
                    <p className='text-[9px] font-black text-meow-charcoal/20 uppercase tracking-widest ml-1'>
                      Hex Code
                    </p>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <Label className='text-[10px] font-black uppercase tracking-widest text-meow-charcoal/40 ml-1'>
                  Button Color
                </Label>
                <div className='flex gap-4 items-center'>
                  <div className='relative w-16 h-16 shrink-0 group'>
                    <div
                      className='absolute inset-0 rounded-[1.25rem] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110'
                      style={{ backgroundColor: theme.buttonColor }}
                    >
                      <input
                        type='color'
                        value={theme.buttonColor}
                        onChange={(e) =>
                          setTheme((prev) => ({
                            ...prev,
                            buttonColor: e.target.value,
                          }))
                        }
                        className='absolute inset-0 opacity-0 cursor-pointer w-full h-full scale-150'
                      />
                    </div>
                  </div>
                  <div className='flex-1 space-y-1'>
                    <Input
                      value={theme.buttonColor}
                      onChange={(e) =>
                        setTheme((prev) => ({
                          ...prev,
                          buttonColor: e.target.value,
                        }))
                      }
                      className='h-12 rounded-xl border-neutral-100 font-mono font-bold tracking-wider uppercase text-xs focus:ring-meow-accent/10'
                      maxLength={7}
                    />
                    <p className='text-[9px] font-black text-meow-charcoal/20 uppercase tracking-widest ml-1'>
                      Hex Code
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Typography Section */}
          <section className='space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Type size={18} className='text-meow-accent' />
              <h2 className='text-lg font-black text-meow-charcoal'>Typography</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
              {FONTS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setTheme((prev) => ({ ...prev, font: f.id }))}
                  className={cn(
                    'group relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 bg-white',
                    theme.font === f.id
                      ? 'border-meow-accent bg-meow-accent/5'
                      : 'border-neutral-100 hover:border-neutral-200'
                  )}
                >
                  <span className={cn('text-lg', f.class)}>Aa</span>
                  <span className='text-[10px] font-bold opacity-40 uppercase tracking-widest'>
                    {f.name}
                  </span>
                  {theme.font === f.id && (
                    <div className='absolute top-2 right-2 w-4 h-4 bg-meow-accent rounded-full flex items-center justify-center text-white'>
                      <Check size={10} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Social Position Section */}
          <section className='space-y-6'>
            <div className='flex items-center gap-2 mb-2'>
              <Palette size={18} className='text-meow-accent' />
              <h2 className='text-lg font-black text-meow-charcoal'>Social Icon Position</h2>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              {[
                { id: 'top', label: 'Top of Page' },
                { id: 'bottom', label: 'Bottom of Page' },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setTheme((prev) => ({ ...prev, socialPosition: pos.id as any }))}
                  className={cn(
                    'group relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 bg-white',
                    theme.socialPosition === pos.id
                      ? 'border-meow-accent bg-meow-accent/5'
                      : 'border-neutral-100 hover:border-neutral-200'
                  )}
                >
                  <div className='w-full h-12 bg-neutral-50 rounded-lg relative overflow-hidden flex flex-col'>
                    <div className={cn(
                      'absolute left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-meow-accent/20',
                      pos.id === 'top' ? 'top-2' : 'bottom-2'
                    )} />
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-1'>
                      <div className='w-12 h-1 bg-neutral-200 rounded-full' />
                      <div className='w-8 h-1 bg-neutral-200 rounded-full mx-auto' />
                    </div>
                  </div>
                  <span className='text-[10px] font-black uppercase tracking-widest'>
                    {pos.label}
                  </span>
                  {theme.socialPosition === pos.id && (
                    <div className='absolute top-3 right-3 w-5 h-5 bg-meow-accent rounded-full flex items-center justify-center text-white shadow-lg'>
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <Button
            onClick={handleSave}
            disabled={isSaving || !isUsernameAvailable || isCheckingUsername}
            className='w-full h-16 rounded-[2rem] bg-meow-accent hover:bg-meow-accent/90 text-white font-black text-xl shadow-2xl shadow-meow-accent/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Preview Section */}
      <div className='hidden xl:flex w-[480px] border-l border-neutral-100 py-12 px-10 flex-col bg-white sticky top-0 h-screen'>
        <LivePreview
          username={username || user?.username || 'shrey'}
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
