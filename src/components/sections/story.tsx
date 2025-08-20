"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

// 故事数据
const storiesData = [
  {
    id: 'pocket-journey',
    title: '口袋之旅',
    description: '从一个简单的想法到功能丰富的平台，记录我们的成长足迹',
    icon: '🎒',
    tags: ['历程', '成长', '回忆'],
    date: '2024-01-15'
  },
  {
    id: 'tech-evolution',
    title: '技术演进',
    description: '探索前端技术的发展历程，从传统到现代的转变',
    icon: '💻',
    tags: ['技术', '发展', '创新'],
    date: '2024-03-22'
  },
  {
    id: 'design-philosophy',
    title: '设计理念',
    description: '极简主义与功能性的完美平衡，创造纯粹的用户体验',
    icon: '🎨',
    tags: ['设计', '美学', '哲学'],
    date: '2024-05-10'
  },
  {
    id: 'community-impact',
    title: '社区影响',
    description: '开源社区的力量，以及我们如何回馈技术生态',
    icon: '👥',
    tags: ['社区', '开源', '贡献'],
    date: '2024-07-08'
  }
];

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full min-h-screen py-20" id="story">
      <motion.div
        ref={containerRef}
        className="min-h-screen w-full px-6 md:px-8 relative"
      >
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="theme-heading mb-6">
              故事
            </h2>
          </div>
        </ScrollReveal>

        {/* 故事卡片网格 */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {storiesData.map((story, index) => (
              <motion.div
                key={story.id}
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

                  {/* 内容 */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* 故事图标和标题 */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                        {story.icon}
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-xl font-bold transition-colors duration-300 text-[var(--color-white)]"
                        >
                          {story.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-[var(--color-white-50)]">
                            {story.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="theme-body text-sm leading-relaxed mb-4 flex-grow">
                      {story.description}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {story.tags.map((tag, i) => (
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
                      <Link
                        href={`/story/${story.id}`}
                        className="theme-button w-full text-center py-2 px-4 no-underline text-sm transform transition-all duration-300"
                      >
                        阅读故事
                      </Link>
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