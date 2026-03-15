"use client";

import { motion } from 'framer-motion';
import { MousePointer2, Palette, BarChart3, Layout } from 'lucide-react';

const features = [
  {
    title: "Custom Links",
    description: "Add all your links in one place with custom icons and titles. Easy for your fans to find everything.",
    icon: <MousePointer2 className="text-meow-accent" size={32} />,
  },
  {
    title: "Cat Themes",
    description: "Express yourself with exceptionally beautiful cat-themed designs, pastel colors, and cute motifs.",
    icon: <Palette className="text-meow-accent" size={32} />,
  },
  {
    title: "Purr-fect Analytics",
    description: "Track your link clicks and see where your audience is coming from with our simple dashboard.",
    icon: <BarChart3 className="text-meow-accent" size={32} />,
  },
  {
    title: "Responsive Cards",
    description: "Your link card looks beautiful on every device, from mobile to desktop. Always paw-some.",
    icon: <Layout className="text-meow-accent" size={32} />,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-meow-charcoal mb-6">Purr-fect Features</h2>
          <p className="text-xl text-meow-charcoal/50 max-w-2xl mx-auto font-medium">
            Everything you need to share your content in the cutest way possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] group hover:-translate-y-2 transition-all duration-300 border border-meow-charcoal/5"
            >
              <div className="w-16 h-16 bg-meow-accent/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-meow-charcoal mb-4">{feature.title}</h3>
              <p className="text-meow-charcoal/50 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
