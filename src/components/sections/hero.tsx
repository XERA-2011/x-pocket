"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  const scrollToExplore = () => {
    const exploreElement = document.getElementById('explore');
    if (exploreElement) {
      exploreElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-30" />

      <motion.div
        ref={logoRef}
        className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 cursor-pointer group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={scrollToExplore}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Black hole visualization */}
        <div className="w-full h-full relative rounded-full overflow-hidden">
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, transparent 60%, rgba(255,255,255,0.1) 70%, rgba(255,255,255,0.3) 80%, transparent 90%)',
              boxShadow: isHovering
                ? '0 0 60px rgba(255,255,255,0.3), inset 0 0 60px rgba(255,255,255,0.1)'
                : '0 0 40px rgba(255,255,255,0.2), inset 0 0 40px rgba(255,255,255,0.05)'
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Event horizon */}
          <div className="absolute top-1/2 left-1/2 w-3/5 h-3/5 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full shadow-2xl border border-white/10" />

          {/* X logo */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.svg
              viewBox="0 0 100 100"
              className="w-1/3 h-1/3 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.line
                x1="25" y1="25" x2="75" y2="75"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.line
                x1="25" y1="75" x2="75" y2="25"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              />
            </motion.svg>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={scrollToExplore}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 mb-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <motion.div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
        <span className="text-sm text-white/60 uppercase tracking-wider">Explore</span>
      </motion.div>
    </section>
  );
}
