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
    difficulty: '中等',
    controls: 'WASD/方向键移动，空格射击，Shift加速',
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
    features: ['量子物理', '时空操作', '多维解谜', '创新玩法'],
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
              React 游戏世界
            </h2>
            <p className="theme-body text-xl max-w-2xl mx-auto leading-relaxed">
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
                      className="absolute top-4 right-4 z-20 text-xs px-3 py-1 rounded-full" 
                      style={{
                        backgroundColor: 'var(--color-white-10)',
                        color: 'var(--color-white-75)',
                        border: `1px solid var(--color-white-25)`
                      }}
                    >
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
                        <h3 
                          className="text-2xl font-bold transition-colors duration-300"
                          style={{ 
                            color: 'var(--color-white)'
                          } as React.CSSProperties}
                        >
                          {game.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              backgroundColor: 'var(--color-white-10)',
                              color: 'var(--color-white-75)'
                            }}
                          >
                            {game.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 描述 */}
                    <p className="theme-body text-base leading-relaxed mb-4 flex-grow">
                      {game.description}
                    </p>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {game.tags.map((tag, i) => (
                        <span 
                          key={i}
                          className="text-xs px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: 'var(--color-white-10)',
                            color: 'var(--color-white-75)',
                            border: `1px solid var(--color-white-25)`
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* 特色功能 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--color-white-90)' }}>
                        游戏特色:
                      </h4>
                      <div className="grid grid-cols-2 gap-1 text-xs" style={{ color: 'var(--color-white-75)' }}>
                        {game.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <div 
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: 'var(--color-white-50)' }}
                            ></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* 操作说明 */}
                    <div 
                      className="text-xs mb-6 p-3 rounded-lg"
                      style={{
                        color: 'var(--color-white-50)',
                        backgroundColor: 'var(--color-black-25)',
                        border: `1px solid var(--color-white-10)`
                      }}
                    >
                      <div className="font-medium mb-1" style={{ color: 'var(--color-white-75)' }}>
                        操作方式:
                      </div>
                      <div>{game.controls}</div>
                    </div>
                    
                    {/* 按钮 */}
                    <div className="mt-auto">
                      {game.comingSoon ? (
                        <div 
                          className="w-full text-center py-3 px-4 rounded-lg cursor-not-allowed font-medium"
                          style={{
                            backgroundColor: 'var(--color-black-50)',
                            color: 'var(--color-white-50)'
                          }}
                        >
                          敬请期待
                        </div>
                      ) : (
                        <Link
                          href="/games"
                          className="theme-button w-full text-center py-3 px-4 no-underline font-medium transform hover:scale-105"
                        >
                          立即体验
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* 悬停时的动画效果 */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div 
                      className="absolute top-0 left-0 w-full h-1"
                      style={{
                        background: 'linear-gradient(to right, transparent, var(--color-white-25), transparent)'
                      }}
                    />
                    <div 
                      className="absolute bottom-0 left-0 w-full h-1"
                      style={{
                        background: 'linear-gradient(to right, transparent, var(--color-white-25), transparent)'
                      }}
                    />
                    <div 
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, var(--color-white-25), transparent)'
                      }}
                    />
                    <div 
                      className="absolute top-0 right-0 w-1 h-full"
                      style={{
                        background: 'linear-gradient(to bottom, transparent, var(--color-white-25), transparent)'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* 技术亮点展示 */}
        <ScrollReveal delay={0.6}>
          <div className="max-w-5xl mx-auto">
            <div className="theme-card p-8">
              <h3 className="theme-subheading mb-6 text-center">
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
                    className="theme-card text-center p-4 theme-hover-scale"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--color-white)' }}>
                      {item.title}
                    </h4>
                    <p className="theme-body text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href="/games"
                  className="theme-button inline-flex items-center gap-2 px-8 py-3 rounded-full no-underline font-medium transform hover:scale-105"
                >
                  <span>探索所有游戏</span>
                  <motion.div
                    className="w-4 h-4 border-t-2 border-r-2 transform rotate-45"
                    style={{ borderColor: 'var(--color-white)' }}
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
            <div className="theme-card p-8">
              <h3 className="theme-subheading mb-4">
                关于游戏开发
              </h3>
              <p className="theme-body leading-relaxed mb-6">
                这些游戏完全使用现代前端技术栈构建，展示了 React 在游戏开发领域的强大潜力。
                每个游戏都经过精心设计，包含完整的游戏机制、优化的性能表现和出色的用户体验。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="theme-surface p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--color-white)' }}>
                    🛠️ 技术栈
                  </h4>
                  <ul className="text-sm theme-body space-y-1">
                    <li>• React 18 + TypeScript</li>
                    <li>• Canvas 2D API</li>
                    <li>• Web Audio API</li>
                    <li>• Framer Motion</li>
                  </ul>
                </div>
                
                <div className="theme-surface p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--color-white)' }}>
                    🎮 游戏特性
                  </h4>
                  <ul className="text-sm theme-body space-y-1">
                    <li>• 实时物理引擎</li>
                    <li>• 智能AI系统</li>
                    <li>• 粒子效果系统</li>
                    <li>• 响应式设计</li>
                  </ul>
                </div>
                
                <div className="theme-surface p-4 rounded-lg">
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--color-white)' }}>
                    ⚡ 性能优化
                  </h4>
                  <ul className="text-sm theme-body space-y-1">
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