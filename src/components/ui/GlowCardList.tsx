"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import GlowCard from './GlowCard';

export interface GlowCardItem {
  id: string;
  title: string;
  href: string;
}

interface GlowCardListProps {
  items: GlowCardItem[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  },
};

const getGridClasses = (columns: number) => {
  switch (columns) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-1 md:grid-cols-2';
    case 3:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    case 4:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    default:
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  }
};

const getGapClasses = (gap: string) => {
  switch (gap) {
    case 'sm':
      return 'gap-4';
    case 'md':
      return 'gap-6';
    case 'lg':
      return 'gap-8';
    default:
      return 'gap-6';
  }
};



function ItemCard({ item, index }: { item: GlowCardItem; index: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <GlowCard
        spread={80}
        className="rounded-xl transition duration-300 group h-full overflow-hidden bg-white/5 hover:bg-white/10"
      >
        <div className="relative text-center p-6 h-full flex flex-col">
          <div className="mb-3">
            <div className="text-xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors duration-300">
              {item.title}
            </div>
          </div>
          <div className="mt-auto">
            <Link href={item.href} className="block w-full text-center py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full text-white hover:text-white/90 transition-all duration-300 no-underline cursor-can-hover">
              View
            </Link>
          </div>
        </div>
      </GlowCard>
    </motion.div>
  );
}

export default function GlowCardList({
  items,
  className = '',
  columns = 3,
  gap = 'md'
}: GlowCardListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/60">No items to display</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${getGridClasses(columns)} ${getGapClasses(gap)} ${className}`}
    >
      {items.map((item, index) => (
        <ItemCard
          key={item.id}
          item={item}
          index={index}
        />
      ))}
    </motion.div>
  );
}