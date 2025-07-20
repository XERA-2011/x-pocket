import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',                  // 启用静态导出
  images: { unoptimized: true },     // 关闭 Next.js 默认图片优化
};

export default nextConfig;
