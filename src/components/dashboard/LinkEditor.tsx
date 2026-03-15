"use client";

import { useState } from 'react';
import { Plus, GripVertical, Trash2, Eye, EyeOff } from 'lucide-react';
import { Reorder } from 'framer-motion';

export default function LinkEditor() {
  const [links, setLinks] = useState([
    { id: '1', title: 'My Portfolio', url: 'https://mysite.com', isVisible: true },
    { id: '2', title: 'Twitter / X', url: 'https://twitter.com', isVisible: true },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-meow-charcoal">Links</h1>
          <p className="text-meow-charcoal/60 font-medium">Manage your link cards here.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} /> Add New Link
        </button>
      </div>

      <Reorder.Group axis="y" values={links} onReorder={setLinks} className="space-y-4">
        {links.map((link) => (
          <Reorder.Item 
            key={link.id} 
            value={link}
            className="glass-card bg-white/20 p-4 border-2 border-transparent hover:border-white/40 transition-colors cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-4 items-center">
              <GripVertical className="text-meow-charcoal/20" size={24} />
              
              <div className="flex-1 space-y-2">
                <input 
                  type="text" 
                  defaultValue={link.title}
                  placeholder="Link Title"
                  className="bg-transparent border-none p-0 text-lg font-bold focus:ring-0 w-full placeholder:opacity-30"
                />
                <input 
                  type="text" 
                  defaultValue={link.url}
                  placeholder="Link URL"
                  className="bg-transparent border-none p-0 text-sm text-meow-charcoal/50 focus:ring-0 w-full placeholder:opacity-30"
                />
              </div>

              <div className="flex items-center gap-2">
                <button 
                  className="p-2 hover:bg-white/40 rounded-xl transition-colors text-meow-charcoal/40 hover:text-meow-accent"
                >
                  {link.isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
                <button 
                  className="p-2 hover:bg-red-50 rounded-xl transition-colors text-meow-charcoal/20 hover:text-red-500"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {links.length === 0 && !isAdding && (
        <div className="text-center py-20 border-2 border-dashed border-white/40 rounded-4xl">
          <p className="text-meow-charcoal/40 font-bold text-xl mb-4">No links added yet!</p>
          <button onClick={() => setIsAdding(true)} className="text-meow-accent font-black hover:underline underline-offset-4">
            Create your first link card 🐾
          </button>
        </div>
      )}
    </div>
  );
}
