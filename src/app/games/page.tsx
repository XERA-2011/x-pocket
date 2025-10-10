"use client";

import { motion } from 'framer-motion';
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



export default function GamesPage() {
  return (
    <div className="min-h-screen text-white mt-[100px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Games
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            A collection of interactive games built with React and Canvas.
          </p>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full mt-6" />
        </motion.div>

        <GlowCardList
          items={gamesData}
          columns={3}
          gap="lg"
          className="lg:gap-8"
        />
      </div>
    </div>
  );
}