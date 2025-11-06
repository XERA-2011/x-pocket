"use client";

// React的Suspense组件，用于处理加载状态并在内容加载时显示备用UI
import { Suspense, useEffect } from 'react';
// 显示主要标题和介绍内容
import HeroSection from '@/components/sections/hero';
// 卡牌列表
import CardSection from '@/components/sections/card';
// 单页面展示区域
import PagesSection from '@/components/sections/pages';
// 游戏展示区域
import GamesSection from '@/components/sections/games';
// 故事展示区域
import StorySection from '@/components/sections/story';
// 提供页面平滑滚动行为的组件
import SmoothScroll from '@/components/SmoothScroll';
// 处理页面之间导航时的过渡动画组件
import PageTransition from '@/components/PageTransition';
// 滚动时更新 URL hash
import { useScrollHash } from '@/hooks/use-scroll-hash';
// 导航配置
import { getHomeSections } from '@/components/header/config';


// Fallback components for when animations are loading
const FallbackSection = () => (
  <div className="animate-pulse bg-white/5 rounded-xl h-40 w-full"></div>
);

export default function Home() {
  // 使用 header 配置的 section 定义
  const sections = getHomeSections();

  // 使用滚动 hash 更新功能
  useScrollHash(sections);

  // 刷新页面时，清空 url 参数，并初始化滚动条
  useEffect(() => {
    // Clear URL parameters (but keep hash)
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);

    // 立即重置滚动位置
    window.scrollTo(0, 0);

    // 使用 requestAnimationFrame 确保在下一帧执行
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    // 延迟执行，确保所有组件都已加载
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      <PageTransition>
        <Suspense fallback={<FallbackSection />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<FallbackSection />}>
          <CardSection />
        </Suspense>

        <Suspense fallback={<FallbackSection />}>
          <PagesSection />
        </Suspense>

        <Suspense fallback={<FallbackSection />}>
          <GamesSection />
        </Suspense>

        <Suspense fallback={<FallbackSection />}>
          <StorySection />
        </Suspense>
      </PageTransition>
    </SmoothScroll>
  );
}
