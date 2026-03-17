'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Eye, Lock, FileText, UserCheck, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: 'Information Collection',
      content:
        'We collect basic profile information you provide, such as your username and bio. We also track profile views and link clicks to provide you with useful analytics.',
    },
    {
      icon: Lock,
      title: 'Data Security',
      content:
        'We use Clerk for industry-standard authentication. Your password is never stored on our servers, and we use secure connections (HTTPS) to protect your data in transit.',
    },
    {
      icon: FileText,
      title: 'Cookies',
      content:
        'We use local storage and essential cookies to keep you signed in and remember your preferences. We do not use tracking cookies for third-party advertising.',
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content:
        'You have full control over your data. You can update your profile, disable your public page, or reset your analytics data at any time from your dashboard.',
    },
  ];

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
            <Lock size={32} />
          </motion.div>
          <h1 className='text-4xl font-black text-meow-charcoal tracking-tight mb-3'>
            Privacy Policy
          </h1>
          <p className='text-sm font-bold text-meow-charcoal/40 uppercase tracking-widest'>
            Your data is your business 🐾
          </p>
        </section>

        {/* Content Sections */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-20'>
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className='h-full p-8 rounded-[2.5rem] border-2 border-neutral-50 hover:border-meow-accent/20 transition-all shadow-sm'>
                <div className='w-12 h-12 bg-neutral-50 rounded-2xl flex items-center justify-center text-meow-accent/60 mb-6 shrink-0'>
                  <section.icon size={24} />
                </div>
                <h2 className='text-xl font-black text-meow-charcoal mb-4'>
                  {section.title}
                </h2>
                <p className='text-meow-charcoal/50 font-bold leading-relaxed'>
                  {section.content}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <Card className='p-12 rounded-[3rem] bg-meow-charcoal text-white text-center relative overflow-hidden'>
          <div className='relative z-10'>
            <h2 className='text-2xl font-black mb-4'>Privacy Questions?</h2>
            <p className='text-white/40 font-bold mb-8'>
              Feel free to reach out to our privacy officer.
            </p>
            <a
              href='5aprilshrey@gmail.com'
              className='inline-flex items-center gap-2 bg-meow-accent text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-meow-accent/20 hover:scale-105 transition-all'
            >
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
