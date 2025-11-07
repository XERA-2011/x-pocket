"use client";

import { motion } from 'framer-motion';
import { usePageTitle } from '@/hooks/use-page-title';
import JokeCard from '@/components/ui/JokeCard';

export default function JokeCardPage() {
  usePageTitle('编程笑话卡片');

  return (
    <div className="relative w-full min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Page Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            编程笑话卡片
          </h1>
          <p className="text-white/70 text-lg">
            每天一个编程笑话，让代码更有趣 😄
          </p>
        </motion.div>

        {/* Joke Card */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <JokeCard showControls={true} />
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">功能说明</h2>
          <ul className="space-y-2 text-white/70">
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>支持 40+ 种主题风格，包括 Dracula、Tokyo Night、Monokai 等</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>400+ 条精选编程笑话，随机展示</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>一键刷新获取新笑话</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-white/50">•</span>
              <span>响应式设计，完美适配桌面和移动端</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
