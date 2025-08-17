"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { getSmartHref } from '@/utils/href-helper';

// 单页面数据
const pagesData = [
  {
    title: "黑洞模拟",
    description: "交互式黑洞物理模拟，包含吸积盘和粒子效果",
    href: "/pages/black-hole.html",
    icon: "🕳️",
    gradient: "from-purple-900/20 to-black/40",
    hoverGradient: "from-purple-600/30 to-black/50"
  },
  {
    title: "星座图",
    description: "动态星座生成器，展示美丽的星空效果",
    href: "/pages/constellation.html",
    icon: "✨",
    gradient: "from-blue-900/20 to-indigo-900/40",
    hoverGradient: "from-blue-600/30 to-indigo-600/50"
  },
  {
    title: "太阳系探索",
    description: "交互式太阳系模型，探索行星轨道和特性",
    href: "/pages/solar.html",
    icon: "🌞",
    gradient: "from-orange-900/20 to-yellow-900/40",
    hoverGradient: "from-orange-600/30 to-yellow-600/50"
  },
  {
    title: "X Logo 设计",
    description: "CSS 和 SVG 实现的 X Logo 对比展示",
    href: "/pages/x-logo.html",
    icon: "❌",
    gradient: "from-gray-900/20 to-slate-900/40",
    hoverGradient: "from-gray-600/30 to-slate-600/50"
  }
];

export default function PagesShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full min-h-screen py-20" id="pages-showcase">
      <motion.div
        ref={containerRef}
        className="min-h-screen w-full px-6 md:px-8 relative"
      >
        {/* 标题部分 */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              创意单页面展示
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              探索各种有趣的可视化效果和交互体验，每个页面都是独特的创意实现
            </p>
          </div>
        </ScrollReveal>

        {/* 页面卡片网格 */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {pagesData.map((page, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Link
                  href={getSmartHref(page.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10 no-underline"
                >
                  {/* 背景渐变 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.gradient} transition-all duration-500 group-hover:opacity-0`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${page.hoverGradient} opacity-0 transition-all duration-500 group-hover:opacity-100`} />
                  
                  {/* 内容 */}
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* 图标和标题 */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                        {page.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                        {page.title}
                      </h3>
                    </div>
                    
                    {/* 描述 */}
                    <p className="text-white/70 text-lg leading-relaxed mb-6 flex-grow">
                      {page.description}
                    </p>
                    
                    {/* 底部装饰和链接指示 */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-white/50">
                        <span>点击体验</span>
                        <motion.div
                          className="w-4 h-4 border-t-2 border-r-2 border-white/50 transform rotate-45"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        />
                      </div>
                      
                      {/* 装饰性进度条 */}
                      <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-400 to-purple-600 rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* 悬停时的光效 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* 底部说明 */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20 text-center">
            <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-white">
                技术实现亮点
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white/80">Canvas 2D 渲染</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-white/80">物理模拟算法</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white/80">实时交互效果</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-white/80">响应式设计</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}