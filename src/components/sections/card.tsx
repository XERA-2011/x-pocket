"use client";

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';

const cardData: GlowCardItem[] = [
  { id: "daily-news", title: "Daily News", href: "/news", description: "Global hot news TOP10 from mainstream English media", tags: ['News', 'Global'] },
  { id: "essays-md", title: "Essays Markdown", href: "/english/essays-md", description: "Markdown content rendering", tags: ['Content', 'Markdown'] },
  { id: "essays-json", title: "Essays JSON", href: "/english/essays", description: "JSON data format rendering", tags: ['Content', 'JSON'] },
  { id: "tools", title: "Online Tools", href: "/tools", description: "Practical online tool collection, including Base64 encoding/decoding, information generators, etc.", tags: ['Tools', 'Utilities'] },
  { id: "coze-ai", title: "COZE AI", href: "/ai/coze", description: "AI assistant integration", tags: ['AI', 'Chat'] },
  { id: "google-ai", title: "Google AI", href: "/ai/google", description: "Google AI integration", tags: ['AI', 'Google'] },
  { id: "games", title: "Games", href: "/games", description: "Interactive games", tags: ['Game', 'Interactive'] },
];


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
          <GlowCardList
            items={cardData}
            columns={4}
            gap="lg"
            className="lg:gap-8"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
