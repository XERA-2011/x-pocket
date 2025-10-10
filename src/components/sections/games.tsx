"use client";

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';
import { getSmartHref } from '@/utils/href-helper';

const gamesData: GlowCardItem[] = [
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



export default function GamesSection() {

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
          <GlowCardList
            items={gamesData}
            columns={4}
            gap="lg"
            className="lg:gap-8"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}