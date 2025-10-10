"use client";

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';

const storiesData: GlowCardItem[] = [
  {
    id: 'pocket-journey',
    title: 'Pocket Journey',
    description: 'Documenting our growth from a simple idea to a feature-rich platform.',
    icon: '🎒',
    tags: ['Journey', 'Growth'],
    difficulty: '2024-01-15', // Using difficulty to display date
    href: '/story/pocket-journey'
  },
  {
    id: 'tech-evolution',
    title: 'Tech Evolution',
    description: 'The development history of our frontend technology.',
    icon: '💻',
    tags: ['Technology', 'Innovation'],
    difficulty: '2024-03-22', // Using difficulty to display date
    href: '/story/tech-evolution'
  },
  {
    id: 'design-philosophy',
    title: 'Design Philosophy',
    description: 'Our philosophy on balancing minimalism and functionality.',
    icon: '🎨',
    tags: ['Design', 'Philosophy'],
    difficulty: '2024-05-10', // Using difficulty to display date
    href: '/story/design-philosophy'
  },
  {
    id: 'community-impact',
    title: 'Community Impact',
    description: 'How we give back to the open source community.',
    icon: '👥',
    tags: ['Community', 'Open Source'],
    difficulty: '2024-07-08', // Using difficulty to display date
    href: '/story/community-impact'
  }
];



export default function StorySection() {
  return (
    <section className="relative w-full min-h-screen py-20" id="story">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Stories
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </motion.div>

        {/* Stories Grid */}
        <ScrollReveal delay={0.4}>
          <GlowCardList
            items={storiesData}
            columns={4}
            gap="lg"
            className="lg:gap-8"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
