"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

// 游戏数据 - 使用主题颜色
const gamesData = [
  {
    id: 'solar-skirmish',
    title: 'Solar Skirmish',
    description: '太空射击游戏，驾驶飞船在小行星带中生存，击败AI敌人获得高分',
    icon: '🚀',
    tags: ['射击', '太空', '生存'],
    difficulty: '中等'
  },
  {
    id: 'coming-soon-1',
    title: '星际探索',
    description: '探索未知星系，发现新行星，建立太空基地',
    icon: '🌌',
    tags: ['探索', '策略', '建造'],
    difficulty: '简单',
    comingSoon: true
  },
  {
    id: 'coming-soon-2',
    title: '量子迷宫',
    description: '在量子世界中解谜，利用量子特性通过复杂迷宫',
    icon: '🔬',
    tags: ['解谜', '科幻', '策略'],
    difficulty: '困难',
    comingSoon: true
  }
];

export default function GamesShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full min-h-screen py-20" id="games-showcase">
      <motion.div
        ref={containerRef}
        className="min-h-screen w-full px-6 md:px-8 relative"
      >
        {/* 标题部分 */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="theme-heading mb-6">
              游戏
            </h2>
          </div>
        </ScrollReveal>

        {/* 游戏卡片网格 */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {gamesData.map((game, index) => (
              <motion.div
                key={game.id}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="theme-card-elevated relative overflow-hidden h-full">
                  {/* 主题背景渐变 */}
                  <div
                    className="absolute inset-0 transition-all duration-500 group-hover:opacity-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-black-90), var(--color-black-75))'
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-white-10), var(--color-black-50))'
                    }}
                  />

                  {/* Coming Soon 标签 - 使用主题颜色 */}
                  {game.comingSoon && (
                    <div
                      className="absolute top-4 right-4 z-20 text-xs px-3 py-1 rounded-full border border-[var(--color-white-25)] bg-[var(--color-white-10)] text-[var(--color-white-75)]"
                    >
                      即将推出
                    </div>
                  )}

                  {/* 内容 */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* 游戏图标和标题 */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold transition-colors duration-300 text-[var(--color-white)]"
                        >
                          {game.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-2 py-1 rounded-full bg-[var(--color-white-10)] text-[var(--color-white-75)]"
                          >
                            {game.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="theme-body text-sm leading-relaxed mb-4 flex-grow">
                      {game.description}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {game.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full border border-[var(--color-white-25)] bg-[var(--color-white-10)] text-[var(--color-white-75)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* 按钮 */}
                    <div className="mt-auto">
                      {game.comingSoon ? (
                        <div
                          className="w-full text-center py-2 px-4 rounded-lg cursor-not-allowed text-sm bg-[var(--color-black-50)] text-[var(--color-white-50)]"
                        >
                          敬请期待
                        </div>
                      ) : (
                        <Link
                          href="/games"
                          className="theme-button w-full text-center py-2 px-4 no-underline text-sm transform transition-all duration-300"
                        >
                          立即体验
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* 悬停时的动画效果 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div
                      className="absolute top-0 left-0 w-full h-px"
                      style={{
                        background: 'linear-gradient(to right, transparent, var(--color-white-25), transparent)'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}