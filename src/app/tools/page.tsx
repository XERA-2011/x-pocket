"use client";

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import GlowCardList, { GlowCardItem } from '@/components/ui/GlowCardList';

const toolsData: GlowCardItem[] = [
  {
    id: "base64",
    title: "Base64 编码解码",
    href: "/tools/base64",
    description: "在线Base64编码和解码工具",
    tags: ['编码', '工具']
  },
  {
    id: "info-create",
    title: "信息生成器",
    href: "/tools/info-create",
    description: "随机生成中文姓名、手机号、身份证等信息",
    tags: ['生成器', '随机']
  },
];

export default function ToolsPage() {
  return (
    <div className="relative w-full min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            在线工具
          </h1>
          <p className="text-lg text-white/70 mb-8">
            实用的在线工具集合
          </p>
          <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
        </motion.div>

        {/* Tools Grid */}
        <ScrollReveal delay={0.3}>
          <GlowCardList
            items={toolsData}
            columns={2}
            gap="lg"
            className="lg:gap-8 max-w-4xl mx-auto"
          />
        </ScrollReveal>
      </div>
    </div>
  );
}