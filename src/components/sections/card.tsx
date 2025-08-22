"use client";

import { motion, Variants } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import ItemCard, { ItemCardProps } from '@/components/ItemCard';

const cardData: ItemCardProps[] = [
  { id: "essays-md", title: "Essays Markdown", href: "/english/essays-md", description: "Markdown content rendering", tags: ['Content', 'Markdown'] },
  { id: "essays-json", title: "Essays JSON", href: "/english/essays", description: "JSON data format rendering", tags: ['Content', 'JSON'] },
  { id: "coze-ai", title: "COZE AI", href: "/ai/coze", description: "AI assistant integration", tags: ['AI', 'Chat'] },
  { id: "google-ai", title: "Google AI", href: "/ai/google", description: "Google AI integration", tags: ['AI', 'Google'] },
  { id: "games", title: "Games", href: "/games", description: "Interactive games", tags: ['Game', 'Interactive'] },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function CardSection() {
  return (
    <section className="relative w-full min-h-screen py-20" id="explore">
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
            Explore Features
          </h2>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </motion.div>

        {/* Cards Grid */}
        <ScrollReveal delay={0.3}>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {cardData.map((card, index) => (
              <ItemCard key={card.id} item={card} index={index} />
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
