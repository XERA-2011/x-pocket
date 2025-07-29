"use client";

import { ReactNode, useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

// Define types for Lenis to avoid TypeScript errors
type LenisType = {
  raf: (time: number) => void;
  destroy: () => void;
  scrollTo: (target: number, options?: { immediate?: boolean }) => void;
};

// Define Lenis options type
interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  // Add any other options as needed
  [key: string]: unknown; // Allow any other properties with unknown type
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<LenisType | null>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const initSmoothScroll = async () => {
      try {
        // Try to import Lenis dynamically
        const lenisModule = await import('lenis').catch(() => null);

        if (!lenisModule) {
          console.warn('Lenis module could not be loaded');
          return;
        }

        const Lenis = lenisModule.default;

        // Create Lenis instance with options
        const options: LenisOptions = {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
          touchMultiplier: 2,
          direction: 'vertical',
          gestureDirection: 'vertical',
        };

        scrollRef.current = new Lenis(options);

        function raf(time: number) {
          scrollRef.current?.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
      } catch (error) {
        console.warn('Smooth scroll could not be initialized:', error);
        // Fallback to native scroll behavior
      }
    };

    initSmoothScroll();

    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
