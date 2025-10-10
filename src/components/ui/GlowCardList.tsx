"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import GlowCard from './GlowCard';

export interface GlowCardItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
  difficulty?: string;
  comingSoon?: boolean;
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
          {/* Coming Soon badge */}
          {item.comingSoon && (
            <div className="absolute top-3 right-3 z-20">
              <span className="text-xs px-3 py-1 rounded-full bg-black/40 border border-white/30 text-white/80 backdrop-blur-sm">
                Coming Soon
              </span>
            </div>
          )}

          {/* Icon */}
          {item.icon && (
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
          )}

          {/* Title and difficulty */}
          <div className="mb-3">
            <div className="text-xl font-bold mb-2 text-white group-hover:text-white/90 transition-colors duration-300">
              {item.title}
            </div>
            {item.difficulty && (
              <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/70">
                {item.difficulty}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="text-white/60 text-sm mb-4 group-hover:text-white/80 transition-colors duration-300 flex-grow leading-relaxed">
            {item.description}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 justify-center">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full border border-white/20 bg-white/5 text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Button */}
          <div className="mt-auto">
            {item.comingSoon ? (
              <div className="w-full text-center py-2.5 px-4 bg-black/20 border border-white/10 rounded-xl text-white/50 cursor-not-allowed">
                Coming Soon
              </div>
            ) : (
              <Link href={item.href} className="block w-full text-center py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-full text-white hover:text-white/90 transition-all duration-300 no-underline cursor-can-hover">
                View
              </Link>
            )}
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