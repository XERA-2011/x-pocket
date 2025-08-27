"use client";

import { motion, Variants } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ItemCard, { ItemCardProps } from '@/components/ui/ItemCard';

const pagesData: ItemCardProps[] = [
  {
    id: "black-hole-sim",
    title: "Black Hole Simulation",
    description: "Interactive physics simulation of a black hole.",
    href: "/pages/black-hole.html",
    icon: "🕳️",
    tags: ['Physics', 'Simulation'],
    difficulty: 'Medium'
  },
  {
    id: "constellation-map",
    title: "Constellation Map",
    description: "Dynamic generator for starfield effects.",
    href: "/pages/constellation.html",
    icon: "✨",
    tags: ['Visualization', 'Generator'],
    difficulty: 'Easy'
  },
  {
    id: "solar-system-explorer",
    title: "Solar System Explorer",
    description: "Explore a model of our solar system.",
    href: "/pages/solar.html",
    icon: "🌞",
    tags: ['Education', 'Exploration'],
    difficulty: 'Medium'
  },
  {
    id: "x-logo-design",
    title: "X Logo Design",
    description: "X Logo implemented with CSS and SVG.",
    href: "/pages/x-logo.html",
    icon: "❌",
    tags: ['Design', 'CSS', 'SVG'],
    difficulty: 'Easy'
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
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pagesData.map((page, index) => (
              <ItemCard key={page.id} item={page} index={index} />
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
