"use client";

import { motion } from 'framer-motion';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';
import { getSmartHref } from '@/utils/href-helper';

const gamesData: GlowCardItem[] = [
  {
    id: 'solar-skirmish',
    title: 'Solar Skirmish',
    href: getSmartHref('/pages/solar.html')
  },
  {
    id: 'tetris',
    title: 'Tetris',
    href: getSmartHref('/pages/tetris.html')
  },
];



export default function GamesPage() {
  return (
    <div className="min-h-screen text-white pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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