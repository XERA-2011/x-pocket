"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

// 游戏数据
const gamesData = [
  {
    id: 'solar-skirmish',
    title: 'Solar Skirmish',
    description: '太空射击游戏，驾驶飞船在小行星带中生存，击败AI敌人获得高分',
    icon: '🚀',
    tags: ['射击', '太空', '生存'],
    difficulty: '中等',
    controls: 'WASD/方向键移动，空格射击，Shift加速',
    gradient: 'from-blue-900/20 to-purple-900/40',
    hoverGradient: 'from-blue-600/30 to-purple-600/50',
    features: ['实时物理模拟', '粒子效果', '音效系统', 'AI敌人']
  },
  {
    id: 'coming-soon-1',
    title: '星际探索',
    description: '探索未知星系，发现新行星，建立太空基地',
    icon: '🌌',
    tags: ['探索', '策略', '建造'],
    difficulty: '简单',
    controls: '鼠标点击操作',
    gradient: 'from-purple-900/20 to-pink-900/40',
    hoverGradient: 'from-purple-600/30 to-pink-600/50',
    features: ['开放世界', '资源管理', '基地建设', '科技树'],
    comingSoon: true
  },
  {
    id: 'coming-soon-2',
    title: '量子迷宫',
    description: '在量子世界中解谜，利用量子特性通过复杂迷宫',
    icon: '🔬',
    tags: ['解谜', '科幻', '策略'],
    difficulty: '困难',
    controls: 'WASD移动，空格激活量子态',
    gradient: 'from-green-900/20 to-teal-900/40',
    hoverGradient: 'from-green-600/30 to-teal-600/50',
    features: ['量子物理', '时空操作', '多维解谜', '创新玩法'],
    comingSoon: true
  }
];

export default function GamesShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  return (
    <section className="relative w-full min-h-screen py-20" id="games-showcase">
      <motion.div
        ref={containerRef}
        className="min-h-screen w-full px-6 md:px-8 relative"
      >
        {/* 标题部分 */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-purple-200">
              React 游戏世界
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              使用 React 和 Canvas 构建的互动游戏，体验纯前端游戏开发的无限可能
            </p>
          </div>
        </ScrollReveal>

        {/* 游戏卡片网格 */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {gamesData.map((game, index) => (
              <motion.div
                key={game.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredGame(game.id)}
                onMouseLeave={() => setHoveredGame(null)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10 h-full">
                  {/* 背景渐变 */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} transition-all duration-500 group-hover:opacity-0`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.hoverGradient} opacity-0 transition-all duration-500 group-hover:opacity-100`} />
                  
                  {/* Coming Soon 标签 */}
                  {game.comingSoon && (
                    <div className="absolute top-4 right-4 z-20 bg-yellow-500/20 text-yellow-200 text-xs px-3 py-1 rounded-full border border-yellow-500/30">
                      即将推出
                    </div>
                  )}
                  
                  {/* 内容 */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    {/* 游戏图标和标题 */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl transform transition-transform duration-300 group-hover:scale-110">
                        {game.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                          {game.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70">
                            {game.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 描述 */}
                    <p className="text-white/70 text-base leading-relaxed mb-4 flex-grow">
                      {game.description}
                    </p>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {game.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* 特色功能 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white/90 mb-2">游戏特色:</h4>
                      <div className="grid grid-cols-2 gap-1 text-xs text-white/60">
                        {game.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 操作说明 */}
                    <div className="text-xs text-white/50 mb-6 p-3 bg-black/20 rounded-lg border border-white/5">
                      <div className="font-medium mb-1 text-white/70">操作方式:</div>
                      <div>{game.controls}</div>
                    </div>
                    
                    {/* 按钮 */}
                    <div className="mt-auto">
                      {game.comingSoon ? (
                        <div className="w-full bg-gray-600/50 text-gray-300 text-center py-3 px-4 rounded-lg cursor-not-allowed font-medium">
                          敬请期待
                        </div>
                      ) : (
                        <Link
                          href="/games"
                          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-center py-3 px-4 rounded-lg transition-all duration-300 no-underline font-medium transform hover:scale-105"
                        >
                          立即体验
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* 悬停时的动画效果 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* 技术亮点展示 */}
        <ScrollReveal delay={0.6}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                技术实现亮点
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: '⚡',
                    title: '高性能渲染',
                    desc: '60fps 游戏循环，Canvas 2D 优化渲染'
                  },
                  {
                    icon: '🎯',
                    title: '物理模拟',
                    desc: '实时碰撞检测，重力和惯性系统'
                  },
                  {
                    icon: '✨',
                    title: '视觉效果',
                    desc: '粒子系统，动态光效，平滑动画'
                  },
                  {
                    icon: '🎵',
                    title: '音效系统',
                    desc: 'Web Audio API，动态音效生成'
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-white/70">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href="/games"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3 rounded-full transition-all duration-300 no-underline font-medium transform hover:scale-105"
                >
                  <span>探索所有游戏</span>
                  <motion.div
                    className="w-4 h-4 border-t-2 border-r-2 border-white transform rotate-45"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* 开发说明 */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                关于游戏开发
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                这些游戏完全使用现代前端技术栈构建，展示了 React 在游戏开发领域的强大潜力。
                每个游戏都经过精心设计，包含完整的游戏机制、优化的性能表现和出色的用户体验。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">🛠️ 技术栈</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• React 18 + TypeScript</li>
                    <li>• Canvas 2D API</li>
                    <li>• Web Audio API</li>
                    <li>• Framer Motion</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">🎮 游戏特性</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 实时物理引擎</li>
                    <li>• 智能AI系统</li>
                    <li>• 粒子效果系统</li>
                    <li>• 响应式设计</li>
                  </ul>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">⚡ 性能优化</h4>
                  <ul className="text-sm text-white/70 space-y-1">
                    <li>• 对象池管理</li>
                    <li>• 渲染优化</li>
                    <li>• 内存管理</li>
                    <li>• 帧率稳定</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}