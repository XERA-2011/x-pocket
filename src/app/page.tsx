"use client";

// React的Suspense组件，用于处理加载状态并在内容加载时显示备用UI
import { Suspense, useEffect } from 'react';
// 显示主要标题和介绍内容
import HeroSection from '@/components/sections/hero';
// 卡牌列表
import CardSection from '@/components/sections/card';
// 提供页面平滑滚动行为的组件
import SmoothScroll from '@/components/SmoothScroll';
// 处理页面之间导航时的过渡动画组件
import PageTransition from '@/components/PageTransition';


// Fallback components for when animations are loading
const FallbackSection = () => (
  <div className="animate-pulse bg-white/5 rounded-xl h-40 w-full"></div>
);

export default function Home() {
  // Reset scroll position to top on page refresh
  useEffect(() => {
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
      </PageTransition>
    </SmoothScroll>
  );
}
