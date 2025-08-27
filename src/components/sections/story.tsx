"use client";

import { motion, Variants } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ItemCard, { ItemCardProps } from '@/components/ui/ItemCard';

const storiesData: ItemCardProps[] = [
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

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
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {storiesData.map((story, index) => (
              <ItemCard key={story.id} item={story} index={index} />
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
