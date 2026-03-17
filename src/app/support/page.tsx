'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  BookOpen,
  Search,
  ChevronRight,
  PawPrint,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const FAQS = [
  {
    question: 'How do I change my profile URL?',
    answer:
      "You can change your username in the Appearance section of your dashboard. Just click on your current username and type a new one! (Don't forget to save 🐾)",
  },
  {
    question: 'Can I use external links?',
    answer:
      "Absolutely! Meowuwu was made for links. Add any URL to your dashboard and we'll handle the rest.",
  },
  {
    question: 'Do you offer analytics?',
    answer:
      'Yes! Check out our Analytics tab to see total views, unique visitors, and click-through rates for every link you share.',
  },
  {
    question: 'Is Meowuwu free?',
    answer:
      'Meowuwu is completely free to use! We want everyone to have a cute place for their links.',
  },
];

export default function SupportPage() {
  return (
    <div className='min-h-screen flex flex-col pt-32'>
      <Navbar />

      <main className='flex-1 max-w-4xl mx-auto w-full px-6 mb-24'>
        {/* Header Section */}
        <section className='text-center mb-16'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='w-16 h-16 bg-meow-accent/10 rounded-3xl flex items-center justify-center text-meow-accent mx-auto mb-6'
          >
            <HelpCircle size={32} />
          </motion.div>
          <h1 className='text-4xl font-black text-meow-charcoal tracking-tight mb-4'>
            Help & Support
          </h1>
          <p className='text-lg font-bold text-meow-charcoal/40'>
            Everything you need to know about your Meow-page.
          </p>
        </section>

        {/* Categories */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
          <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm hover:shadow-md transition-all group cursor-pointer'>
            <div className='w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform'>
              <BookOpen size={24} />
            </div>
            <h3 className='text-xl font-black text-meow-charcoal mb-2'>
              Getting Started
            </h3>
            <p className='text-sm font-bold text-meow-charcoal/40'>
              New to Meowuwu? Learn the basics of setting up your profile.
            </p>
          </Card>
          <Card className='p-8 rounded-[2.5rem] border-2 border-neutral-50 shadow-sm hover:shadow-md transition-all group cursor-pointer'>
            <div className='w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform'>
              <Sparkles size={24} />
            </div>
            <h3 className='text-xl font-black text-meow-charcoal mb-2'>
              Customization
            </h3>
            <p className='text-sm font-bold text-meow-charcoal/40'>
              Make your profile truly yours with themes and custom colors.
            </p>
          </Card>
        </div>

        {/* FAQs */}
        <section className='space-y-8'>
          <h2 className='text-2xl font-black text-meow-charcoal flex items-center gap-2 mb-10'>
            <MessageCircle size={24} className='text-meow-accent' />
            Frequently Asked Questions
          </h2>
          <div className='grid grid-cols-1 gap-4'>
            {FAQS.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className='p-8 rounded-[2rem] border-2 border-neutral-50 shadow-sm hover:border-meow-accent/20 transition-all'>
                  <h4 className='text-lg font-black text-meow-charcoal mb-3'>
                    {faq.question}
                  </h4>
                  <p className='text-meow-charcoal/50 font-bold leading-relaxed'>
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className='mt-24 bg-meow-charcoal text-white rounded-[3rem] p-12 text-center relative overflow-hidden group'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-meow-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-meow-accent/20 transition-all' />
          <h2 className='text-3xl font-black mb-4 relative z-10'>
            Still need help?
          </h2>
          <p className='text-white/50 font-bold mb-10 relative z-10'>
            Our cat-support team is ready to assist you!
          </p>
          <a
            href='https://discord.gg/ZVCB8EnRX2'
            className='inline-flex items-center gap-3 bg-white text-meow-charcoal px-10 py-5 rounded-full font-black text-[13px] uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl'
          >
            <Mail size={18} />
            Contact Support
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
