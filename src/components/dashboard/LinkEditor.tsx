"use client";

import { 
  Plus, 
  Share2, 
  GripVertical, 
  Link as LinkIcon, 
  Trash2, 
  Smile, 
  ShoppingBag,
  MousePointer2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
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
  visible: boolean;
  variant: 'primary' | 'secondary';
  clicks: number;
}

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
        "group relative bg-white border-2 border-neutral-50 rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-neutral-100",
        isDragging && "shadow-2xl border-meow-accent/20"
      )}
    >
      <div className="flex items-start gap-6">
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners}
          className="mt-4 text-neutral-300 cursor-grab active:cursor-grabbing hover:text-meow-accent transition-colors p-1"
        >
          <GripVertical size={24} />
        </div>

        {/* Main Info */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input
                value={link.title}
                onChange={(e) => updateLink(link.id, { title: e.target.value })}
                className="text-lg font-black text-meow-charcoal outline-none bg-transparent w-full"
                placeholder="Enter title"
              />
              <div className="flex items-center gap-2 mt-2 bg-neutral-50 px-4 py-2 rounded-xl border border-neutral-100 focus-within:bg-white focus-within:border-meow-accent/20 transition-all">
                <LinkIcon size={14} className="text-meow-charcoal/20" />
                <input
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  className="text-xs font-bold text-meow-charcoal/40 outline-none w-full bg-transparent"
                  placeholder="https://yourlink.com"
                />
              </div>
            </div>

            {/* Toggle Button Area */}
            <div className="flex flex-col items-center gap-1">
              <button 
                onClick={() => updateLink(link.id, { variant: link.variant === 'primary' ? 'secondary' : 'primary' })}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-sm active:scale-95 group/btn",
                  link.variant === 'primary' 
                    ? "bg-red-50 text-red-500 hover:bg-red-100" 
                    : "bg-emerald-50 text-emerald-500 hover:bg-emerald-100"
                )}
                title={`Switch to ${link.variant === 'primary' ? 'Secondary' : 'Primary'} style`}
              >
                {link.variant === 'primary' ? <Smile size={24} /> : <ShoppingBag size={24} />}
              </button>
              <span className="text-[8px] font-black uppercase text-meow-charcoal/20">
                {link.variant}
              </span>
            </div>

            {/* Actions Column */}
            <div className="flex items-center gap-1">
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

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                 <Switch
                   checked={link.visible}
                   onCheckedChange={(checked) => updateLink(link.id, { visible: checked })}
                   className="data-[state=checked]:bg-meow-accent scale-75"
                 />
                 <span className="text-[10px] font-black uppercase tracking-wider text-meow-charcoal/40">Visible</span>
              </div>
              <div className="w-px h-4 bg-neutral-100" />
              <div className="flex items-center gap-2 text-meow-charcoal/40">
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
    useSensor(PointerSensor),
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
    <div className="max-w-3xl mx-auto w-full px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
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
            className="rounded-full h-12 px-6 font-bold border-2 border-neutral-100 hover:bg-neutral-50 transition-all gap-2"
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
              "group border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-4 transition-all shadow-sm active:scale-[0.98]",
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
