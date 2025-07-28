"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import gsap from 'gsap';
// 随着元素滚动进入视图时显示动画效果的组件
import ScrollReveal from '@/components/ScrollReveal';

export default function GlassNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Store a reference to the current container element
    const container = containerRef.current;

    // Intersection Observer for scroll-based animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');

            // Add GSAP animation for the container when it comes into view
            gsap.fromTo(
              container,
              {
                y: 30,
                opacity: 0.5,
                scale: 0.98
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out"
              }
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    // Add hover effect for the entire grid
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;

      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Calculate position relative to the center
      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate distance from center (normalized)
      const distanceX = (x - centerX) / centerX;
      const distanceY = (y - centerY) / centerY;

      // Apply subtle tilt effect to the container
      gsap.to(container, {
        rotateX: -distanceY * 2, // Invert for natural feel
        rotateY: distanceX * 2,
        duration: 0.5,
        ease: "power1.out"
      });
    };

    const handleMouseLeave = () => {
      if (!container) return;

      gsap.to(container, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power1.out"
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      observer.unobserve(container);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="h-screen w-full nav-grid p-6 md:p-8 rounded-2xl relative transform-gpu backdrop-filter backdrop-blur-[6px]"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ScrollReveal delay={0.3}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 to-purple-900/5 rounded-2xl blur-md opacity-30" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="w-full">
            <Link
              href="/page/black-hole.html"
              className="w-full border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-500 min-h-[130px] no-underline relative overflow-hidden group"
            >
              黑洞
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/coze"
              className="w-full border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-500 min-h-[130px] no-underline relative overflow-hidden group"
            >
              COZE AI
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/essays"
              className="w-full border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-500 min-h-[130px] no-underline relative overflow-hidden group"
            >
              每日英语作文
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/google"
              className="w-full border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-500 min-h-[130px] no-underline relative overflow-hidden group"
            >
              Google AI
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="#"
              className="w-full border-0 rounded-[24px] p-6 text-center cursor-pointer flex flex-col items-center justify-center transition-all duration-500 min-h-[130px] no-underline relative overflow-hidden group"
            >
              更多功能
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </motion.section>
  );
}
