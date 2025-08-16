"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// 游戏数据
const gamesData = [
  {
    id: 'solar-skirmish',
    title: 'Solar Skirmish',
    description: '太空射击游戏 - 驾驶飞船在小行星带中生存，击败敌人获得高分',
    icon: '🚀',
    tags: ['射击', '太空', '生存'],
    difficulty: '中等',
    controls: 'WASD移动 • 空格射击 • Shift加速',
    gradient: 'from-blue-900/30 to-purple-900/50'
  }
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* 头部导航 */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/" 
              className="text-white/70 hover:text-white transition-colors"
            >
              ← 返回首页
            </Link>
            <div className="w-px h-6 bg-white/20" />
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              🎮 React 小游戏
            </h1>
          </div>
          <div className="text-sm text-white/60">
            {gamesData.length} 个游戏
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* 介绍区域 */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            探索 React 游戏世界
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            使用 React 和 Canvas 构建的互动游戏集合，体验纯前端游戏开发的魅力
          </p>
        </motion.div>

        {/* 游戏网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesData.map((game, index) => (
            <motion.div
              key={game.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10">
                {/* 背景渐变 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.gradient} transition-all duration-500`} />
                
                {/* 内容 */}
                <div className="relative z-10 p-6">
                  {/* 游戏图标和标题 */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl transform transition-transform duration-300 group-hover:scale-110">
                      {game.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors duration-300">
                        {game.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/70">
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 描述 */}
                  <p className="text-white/70 text-sm leading-relaxed mb-4">
                    {game.description}
                  </p>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {game.tags.map((tag, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-blue-500/20 text-blue-200 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* 操作说明 */}
                  <div className="text-xs text-white/50 mb-6 p-3 bg-black/20 rounded-lg">
                    <div className="font-medium mb-1">操作方式:</div>
                    <div>{game.controls}</div>
                  </div>
                  
                  {/* 按钮 */}
                  <div className="flex gap-3">
                    <Link
                      href={`/games/${game.id}`}
                      className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-center py-2 px-4 rounded-lg transition-colors duration-300 no-underline font-medium"
                    >
                      开始游戏
                    </Link>
                    <button
                      onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
                      className="px-4 py-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 rounded-lg transition-colors duration-300"
                    >
                      详情
                    </button>
                  </div>
                  
                  {/* 展开的详情 */}
                  {selectedGame === game.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <div className="text-sm text-white/70 space-y-2">
                        <div><strong>技术栈:</strong> React, Canvas 2D, TypeScript</div>
                        <div><strong>特色:</strong> 实时物理模拟、粒子效果、音效系统</div>
                        <div><strong>目标:</strong> 在小行星带中生存并获得最高分数</div>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* 悬停光效 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 底部信息 */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              关于这些游戏
            </h3>
            <div className="text-white/70 space-y-4 text-left">
              <p>
                这些游戏完全使用 React 和原生 Canvas API 构建，展示了前端技术在游戏开发中的潜力。
                每个游戏都包含完整的游戏循环、物理模拟、碰撞检测和音效系统。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-white mb-2">技术特点</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 60fps 游戏循环</li>
                    <li>• 实时物理模拟</li>
                    <li>• 粒子效果系统</li>
                    <li>• 响应式设计</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">开发亮点</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• TypeScript 类型安全</li>
                    <li>• 模块化代码结构</li>
                    <li>• 性能优化</li>
                    <li>• 跨平台兼容</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}