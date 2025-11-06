"use client";

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';

const cardData: GlowCardItem[] = [
  { id: "daily-news", title: "Daily News", href: "/news" },
  { id: "essays-md", title: "Essays Markdown", href: "/english/essays-md" },
  { id: "essays-json", title: "Essays JSON", href: "/english/essays" },
  { id: "tools", title: "Online Tools", href: "/tools" },
  { id: "coze-ai", title: "COZE AI", href: "/tools/coze", },
  { id: "google-ai", title: "Google AI", href: "/tools/google" },
  { id: "games", title: "Games", href: "/games" },
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
