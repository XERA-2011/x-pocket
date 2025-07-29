"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

// 卡片数据
const cardData = [
  { title: "黑洞", href: "/pages/black-hole" },
  { title: "COZE AI", href: "/coze" },
  { title: "每日英语作文", href: "/essays" },
  { title: "Google AI", href: "/google" },
  { title: "更多功能", href: "#" },
  { title: "AI 助手", href: "#" },
  { title: "知识库", href: "#" },
  { title: "工具箱", href: "#" },
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
        <h2 className="text-3xl md:text-4xl font-bold text-center my-12 bg-clip-text text-transparent bg-white/80">
          探索功能
        </h2>

        <div className="relative">
          <ScrollReveal delay={0.3}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 to-white-900/5 rounded-2xl blur-md opacity-30" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
              {cardData.map((card, index) => (
                <div key={index} className="w-full">
                  <Link
                    href={card.href}
                    className={`w-full border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-300 min-h-[180px] no-underline relative overflow-hidden group bg-gradient-to-br bg-white/10 hover:shadow-lg`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10 flex flex-col items-center">
                      <h3 className="text-xl font-medium">{card.title}</h3>
                      <div className="mt-2 w-12 h-1 bg-white/20 rounded-full group-hover:w-20 transition-all duration-300" />
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* 第二部分：滚动触发的内容 */}
        <div className="mt-32 pt-16 border-t border-white/10 relative">
          <ScrollReveal delay={0.5}>
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
              体验 SmoothScroll 的平滑滚动效果
            </h3>

            <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-2xl">
              <p className="text-lg mb-6 leading-relaxed">
                SmoothScroll 组件使用 Lenis 库实现了页面的平滑滚动效果，让页面滚动更加流畅自然。
                当你滚动页面时，可以感受到动画和过渡效果的平滑变化，这种体验比原生滚动更加舒适。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-xl font-medium mb-3">平滑滚动特性 {item}</h4>
                    <p>体验更加自然的页面过渡和动画效果，让用户界面感觉更加流畅和专业。</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  );
}