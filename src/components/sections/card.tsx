"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

// 卡片数据
const cardData = [
  { title: "Essays Markdown", href: "/essays-md" },
  { title: "Essays JSON", href: "/essays" },
  { title: "COZE AI", href: "/coze" },
  { title: "Google AI", href: "/google" },
];

export default function CardSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full min-h-screen" id="explore">
      <motion.div
        ref={containerRef}
        className="min-h-screen w-full py-20 px-6 md:px-8 relative transform-gpu"
        style={{
          perspective: "1000px"
        }}
      >
        <h2 className="theme-heading text-center my-12">
          功能
        </h2>

        <div className="relative">
          <ScrollReveal delay={0.3}>
            <div
              className="absolute inset-0 rounded-2xl blur-md opacity-20"
              style={{
                background: 'radial-gradient(circle, var(--color-white-10), var(--color-black-90))'
              }}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {cardData.map((card, index) => (
                <div key={index} className="w-full">
                  <Link
                    href={card.href}
                    className="theme-card w-full rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center min-h-[180px] no-underline relative overflow-hidden group"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-white-10), var(--color-white-5))'
                      }}
                    />

                    <div className="relative z-10 flex flex-col items-center">
                      <h3 className="text-xl font-medium" style={{ color: 'var(--color-white)' }}>
                        {card.title}
                      </h3>
                      <div
                        className="mt-2 w-12 h-1 rounded-full group-hover:w-20 transition-all duration-300"
                        style={{ backgroundColor: 'var(--color-white-25)' }}
                      />
                    </div>

                    <div
                      className="absolute bottom-0 left-0 w-full h-1 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"
                      style={{
                        background: 'linear-gradient(90deg, var(--color-white-50), var(--color-white-75))'
                      }}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  );
}