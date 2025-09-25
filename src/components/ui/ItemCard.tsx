"use client";

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import GlowCard from './GlowCard';
import { Button } from './ElasticButton';

export interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
  difficulty?: string;
  comingSoon?: boolean;
  href: string;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  },
};

export default function ItemCard({ item }: { item: ItemCardProps; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group h-full"
    >
      <motion.div
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.25 }
        }}
        className="h-full"
      >
        <GlowCard
          className="h-full p-4 sm:p-6 rounded-2xl"
          spread={60}
          borderWidth={3}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-0 group-hover:opacity-50 transition-opacity duration-400" />

          {/* Coming Soon badge */}
          {item.comingSoon && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20">
              <span className="text-xs px-3 py-1 rounded-full bg-black/40 border border-white/30 text-white/80 backdrop-blur-sm">
                Coming Soon
              </span>
            </div>
          )}

          {/* Content */}
          <div className="relative z-20 flex flex-col flex-grow h-full">
            {/* Icon */}
            {item.icon && (
              <motion.div
                className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-105"
              >
                {item.icon}
              </motion.div>
            )}

            {/* Title and difficulty */}
            <div className="mb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                {item.title}
              </h3>
              {item.difficulty && (
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/70">
                  {item.difficulty}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-4 flex-grow group-hover:text-white/70 transition-colors">
              {item.description}
            </p>

            {/* Tags */}
            {item.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
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
                <Button
                  asChild
                  variant="ghost"
                >
                  <Link href={item.href} className="w-full text-center py-2.5 px-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white hover:text-white/90 transition-all duration-300 no-underline">
                    View
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </motion.div>
  );
}
