"use client";

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';
import { getSmartHref } from '@/utils/href-helper';

const pagesData: GlowCardItem[] = [
  {
    id: "black-hole-sim",
    title: "Black Hole Simulation",
    href: getSmartHref("/pages/black-hole.html"),
  },
  {
    id: "constellation-map",
    title: "Constellation Map",
    href: getSmartHref("/pages/constellation.html"),
  },
  {
    id: "solar-system-explorer",
    title: "Solar System Explorer",
    href: getSmartHref("/pages/solar.html"),
  },
  {
    id: "x-logo-design",
    title: "X Logo Design",
    href: getSmartHref("/pages/x-logo.html"),
  }
];



export default function PagesShowcaseSection() {
  return (
    <section className="relative w-full min-h-screen py-20" id="pages-showcase">
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
            Creative Pages
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </motion.div>

        {/* Pages Grid */}
        <ScrollReveal delay={0.4}>
          <GlowCardList
            items={pagesData}
            columns={4}
            gap="lg"
            className="lg:gap-8"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
