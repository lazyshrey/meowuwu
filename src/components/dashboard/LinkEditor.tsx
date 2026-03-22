"use client";

import { 
  Plus, 
  Share2, 
  GripVertical, 
  Link as LinkIcon, 
  Trash2, 
  Smile, 
  ShoppingBag,
  MousePointer2,
  PawPrint,
  Instagram,
  Twitter,
  Youtube,
  Github,
  Music,
  Heart,
  Star,
  Globe,
  Video,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: string;
  visible: boolean;
  variant: 'primary' | 'secondary';
  clicks: number;
}

const AVAILABLE_ICONS = [
  { name: 'paw', icon: PawPrint },
  { name: 'link', icon: LinkIcon },
  { name: 'instagram', icon: Instagram },
  { name: 'twitter', icon: Twitter },
  { name: 'youtube', icon: Youtube },
  { name: 'github', icon: Github },
  { name: 'globe', icon: Globe },
  { name: 'music', icon: Music },
  { name: 'heart', icon: Heart },
  { name: 'star', icon: Star },
  { name: 'video', icon: Video },
  { name: 'sparkles', icon: Sparkles },
];

interface LinkEditorProps {
  links: LinkItem[];
  onLinksChange: (links: LinkItem[]) => void;
  username: string;
}

interface SortableLinkItemProps {
  link: LinkItem;
  index: number;
  updateLink: (id: string, updates: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
}

function SortableLinkItem({ link, updateLink, deleteLink }: SortableLinkItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative bg-white border-2 border-neutral-50 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:border-neutral-100",
        isDragging && "shadow-2xl border-meow-accent/20"
      )}
    >
      {/* Delete Button - Top Right Absolute on Mobile */}
      <button
        onClick={() => deleteLink(link.id)}
        className="absolute top-4 right-4 md:static z-10 w-8 h-8 flex items-center justify-center text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all md:hidden"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-start gap-4 md:gap-6">
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners}
          className="mt-4 text-neutral-300 cursor-grab active:cursor-grabbing hover:text-meow-accent transition-colors p-1 touch-none shrink-0"
        >
          <GripVertical size={22} />
        </div>

        {/* Main Info Wrapper */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
           <div className="flex items-start gap-4">
              {/* Icon Picker */}
              <div className="shrink-0 pt-1">
                <Popover>
                    <PopoverTrigger className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-neutral-50 border-2 border-neutral-100 flex items-center justify-center text-meow-charcoal/40 hover:border-meow-accent/20 hover:bg-white transition-all group/icon relative">
                      {(() => {
                        const IconComp = AVAILABLE_ICONS.find(i => i.name === link.icon)?.icon || LinkIcon;
                        return <IconComp size={22} />;
                      })()}
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white border border-neutral-100 rounded-full flex items-center justify-center shadow-sm text-[8px]">
                          <ChevronDown size={10} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 rounded-2xl" align="start">
                      <div className="grid grid-cols-4 gap-2">
                        {AVAILABLE_ICONS.map((icon) => (
                          <button
                            key={icon.name}
                            onClick={() => updateLink(link.id, { icon: icon.name })}
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center transition-all hover:bg-meow-accent/5 hover:text-meow-accent",
                              link.icon === icon.name ? "bg-meow-accent text-white hover:bg-meow-accent" : "text-meow-charcoal/40"
                            )}
                          >
                            <icon.icon size={20} />
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                </Popover>
              </div>

              {/* Title and URL */}
              <div className="flex-1 min-w-0 space-y-2.5">
                <input
                  value={link.title}
                  onChange={(e) => updateLink(link.id, { title: e.target.value })}
                  className="text-base font-bold text-meow-charcoal outline-none bg-transparent w-full placeholder:text-neutral-200"
                  placeholder="Link Title"
                />
                <div className="flex items-center gap-2 bg-neutral-50/50 px-3 py-2 rounded-xl border border-neutral-100/50 focus-within:bg-white focus-within:border-meow-accent/20 transition-all">
                  <LinkIcon size={12} className="text-meow-charcoal/20" />
                  <input
                    value={link.url}
                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                    onFocus={(e) => updateLink(link.id, { url: "" })}
                    className="text-[11px] font-medium text-meow-charcoal/40 outline-none w-full bg-transparent placeholder:text-neutral-200"
                    placeholder="https://meowuwu.in/"
                  />
                </div>
              </div>

              {/* Desktop Delete Button */}
              <div className="hidden md:block shrink-0 pt-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteLink(link.id)}
                  className="text-neutral-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
           </div>

           {/* Footer Action Row */}
           <div className="pt-4 border-t border-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 md:gap-6">
                 {/* Visibility */}
                 <div className="flex items-center gap-2">
                    <Switch
                      checked={link.visible}
                      onCheckedChange={(checked) => updateLink(link.id, { visible: checked })}
                      className="data-[state=checked]:bg-meow-accent scale-75"
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider text-meow-charcoal/30">Visible</span>
                 </div>

                 {/* Highlight Toggle (Primary/Secondary) */}
                 <div className="flex items-center gap-2">
                    <Switch
                      checked={link.variant === 'secondary'}
                      onCheckedChange={(checked) => updateLink(link.id, { variant: checked ? 'secondary' : 'primary' })}
                      className="data-[state=checked]:bg-emerald-500 scale-75"
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider text-meow-charcoal/30">Secondary</span>
                 </div>

                 <div className="w-px h-3 bg-neutral-100" />

                 {/* Clicks */}
                 <div className="flex items-center gap-1.5 text-meow-charcoal/30">
                    <MousePointer2 size={12} />
                    <span className="text-[10px] font-black uppercase tracking-wider">{link.clicks} clicks</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default function LinkEditor({ links, onLinksChange, username }: LinkEditorProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleShare = () => {
    const url = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Profile link copied! 🐾");
  };

  const addLink = () => {
    if (links.length >= 10) {
      toast.error("You've reached the maximum limit of 10 links! 🐾");
      return;
    }
    const newLink: LinkItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: "New Link",
      url: "https://meowuwu.in",
      icon: 'paw',
      visible: true,
      variant: 'primary',
      clicks: 0
    };
    onLinksChange([newLink, ...links]);
  };

  const updateLink = (id: string, updates: Partial<LinkItem>) => {
    onLinksChange(links.map(link => link.id === id ? { ...link, ...updates } : link));
  };

  const deleteLink = (id: string) => {
    onLinksChange(links.filter(link => link.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((item) => item.id === active.id);
      const newIndex = links.findIndex((item) => item.id === over.id);

      onLinksChange(arrayMove(links, oldIndex, newIndex));
    }
  };

  const maxReached = links.length >= 10;

  return (
    <div className="max-w-3xl mx-auto w-full px-4 md:px-8 py-6 md:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-meow-charcoal tracking-tight">
            Link Editor {links.length > 0 && <span className="text-meow-accent/40 ml-2">({links.length}/10)</span>}
          </h1>
          <p className="text-sm font-bold text-meow-charcoal/40 mt-1">Design your purr-fect landing page</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleShare}
            className="rounded-full h-10 md:h-12 px-5 md:px-6 font-bold border-2 border-neutral-100 hover:bg-neutral-50 transition-all gap-2 w-full sm:w-auto"
          >
            <Share2 size={18} />
            Share
          </Button>
        </div>
      </div>

      {/* Links List with DnD */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-6">
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {links.map((link, index) => (
              <SortableLinkItem
                key={link.id}
                link={link}
                index={index}
                updateLink={updateLink}
                deleteLink={deleteLink}
              />
            ))}
          </SortableContext>

          {/* Empty State / Add Button */}
          <div
            onClick={addLink}
            className={cn(
              "group border-2 border-dashed rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center gap-4 transition-all shadow-sm active:scale-[0.98]",
              maxReached
                ? "border-neutral-100 bg-neutral-50 cursor-not-allowed opacity-60"
                : "border-meow-accent/20 bg-meow-accent/5 cursor-pointer hover:border-meow-accent hover:bg-meow-accent/10"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform",
              maxReached
                ? "bg-neutral-200 text-neutral-400 shadow-none"
                : "bg-white text-meow-accent shadow-meow-accent/10 group-hover:scale-110"
            )}>
              <Plus size={28} strokeWidth={3} />
            </div>
            <p className={cn(
              "text-base font-black transition-colors",
              maxReached ? "text-neutral-400" : "text-meow-accent/60 group-hover:text-meow-accent"
            )}>
              {maxReached ? "Colony Full! (Max 10 Links)" : "Drop more links here!"}
            </p>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
