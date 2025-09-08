"use client";

import { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ItemCard, { ItemCardProps } from '@/components/ui/ItemCard';
import { getSmartHref } from '@/utils/href-helper';

const gamesData: ItemCardProps[] = [
  {
    id: 'solar-skirmish',
    title: 'Solar Skirmish',
    description: 'A space shooter game through asteroid fields.',
    icon: '🚀',
    tags: ['Shooter', 'Space'],
    difficulty: 'Medium',
    href: getSmartHref('/pages/solar.html')
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Classic block-stacking puzzle game with modern controls.',
    icon: '🧩',
    tags: ['Puzzle', 'Classic'],
    difficulty: 'Easy',
    href: getSmartHref('/pages/tetris.html')
  },
  {
    id: 'coming-soon-1',
    title: 'Stellar Explorer',
    description: 'Explore galaxies and establish space bases.',
    icon: '🌌',
    tags: ['Exploration', 'Strategy'],
    difficulty: 'Easy',
    comingSoon: true,
    href: '#'
  },
  {
    id: 'coming-soon-2',
    title: 'Quantum Maze',
    description: 'Solve puzzles in a quantum world.',
    icon: '🔬',
    tags: ['Puzzle', 'Sci-Fi'],
    difficulty: 'Hard',
    comingSoon: true,
    href: '#'
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

export default function GamesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full min-h-screen py-20" id="games-showcase">
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
            Games
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </motion.div>

        {/* Games Grid */}
        <ScrollReveal delay={0.4}>
          <motion.div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {gamesData.map((game, index) => (
              <ItemCard key={game.id} item={game} index={index} />
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}