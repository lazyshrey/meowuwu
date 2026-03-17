'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Clock, Globe, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
  const sections = [
    {
      icon: Shield,
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using Meowuwu, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
    },
    {
      icon: BookOpen,
      title: '2. Use License',
      content:
        'Permission is granted to use Meowuwu for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials.',
    },
    {
      icon: Globe,
      title: '3. User Responsibilities',
      content:
        'You are solely responsible for the content you post on your Meowuwu profile. We prohibit the use of our services for illegal activities, spam, or harassment. We reserve the right to suspend any account that violates these guidelines.',
    },
    {
      icon: Clock,
      title: '4. Limitations',
      content:
        "In no event shall Meowuwu or its suppliers be liable for any damages arising out of the use or inability to use the materials on Meowuwu's website.",
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
            <Shield size={32} />
          </motion.div>
          <h1 className='text-4xl font-black text-meow-charcoal tracking-tight mb-3'>
            Terms & Conditions
          </h1>
          <p className='text-sm font-bold text-meow-charcoal/40 uppercase tracking-widest'>
            Last Updated: March 2026 🐾
          </p>
        </section>

        {/* Introduction */}
        <section className='bg-white rounded-[2.5rem] border-2 border-neutral-50 p-10 mb-12 shadow-sm'>
          <p className='text-lg leading-relaxed text-meow-charcoal/50 font-bold'>
            Welcome to Meowuwu. These terms and conditions outline the rules and
            regulations for the use of our platform. By continuing to use
            Meowuwu, we assume you accept these terms and conditions in full.
          </p>
        </section>

        {/* Content Sections */}
        <div className='space-y-6 mb-20'>
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className='p-10 rounded-[2.5rem] border-2 border-neutral-50 hover:border-meow-accent/20 transition-all shadow-sm group'>
                <div className='flex flex-col md:flex-row gap-10'>
                  <div className='w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center text-meow-charcoal/30 shrink-0 group-hover:scale-110 group-hover:bg-meow-accent/5 group-hover:text-meow-accent transition-all'>
                    <section.icon size={28} />
                  </div>
                  <div className='space-y-4'>
                    <h2 className='text-2xl font-black text-meow-charcoal leading-none'>
                      {section.title}
                    </h2>
                    <p className='text-lg leading-relaxed text-meow-charcoal/50 font-bold'>
                      {section.content}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <div className='text-center p-12 bg-neutral-50 rounded-[3rem] border-2 border-dashed border-neutral-200'>
          <p className='text-meow-charcoal/40 font-bold mb-6'>
            If you have any questions about our Terms, please reach out.
          </p>
          <a
            href='https://discord.gg/ZVCB8EnRX2'
            className='inline-flex items-center gap-2 text-meow-accent font-black text-sm uppercase tracking-widest hover:gap-4 transition-all'
          >
            Contact Legal Dept <ArrowRight size={16} />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
