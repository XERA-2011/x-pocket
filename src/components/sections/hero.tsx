"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Register GSAP plugins if available
if (typeof window !== 'undefined') {
  try {
    // Dynamic import for TextPlugin
    import('gsap/TextPlugin').then(module => {
      const { TextPlugin } = module;
      gsap.registerPlugin(TextPlugin);
    }).catch(error => {
      console.warn('GSAP TextPlugin not available:', error);
    });
  } catch (error) {
    console.warn('GSAP TextPlugin not available:', error);
  }
}

export default function HeroSection() {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate the logo
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }
    );

  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full flex flex-col items-center justify-center text-center p-8 rounded-3xl relative"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-white-900/5 to-yellow-900/10 rounded-3xl blur-xl opacity-50" />

      <motion.div
        ref={logoRef}
        className="relative w-[30vmin] h-[30vmin] rounded-full cursor-pointer"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
          // 使用标准的URL锚点方式跳转
          window.location.href = '#explore';
        }}
      >
        {/* Black hole effect using Tailwind CSS */}
        <div className="w-full h-full relative black-hole transition-transform duration-400 ease-in-out hover:scale-[1.05]">
          {/* Accretion disk (outer ring) - using the style from the example */}
          <div
            className={`absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 rounded-full 
              ${isHovering ?
                'shadow-[inset_0_0_2vmin_#fff,inset_0_0_5vmin_#fff,inset_0_0_10vmin_#fff,0_0_12vmin_#fff]' :
                'shadow-[inset_0_0_1vmin_#fff,inset_0_0_3vmin_#fff,inset_0_0_6vmin_#fff,0_0_7vmin_#fff]'
              } transition-shadow duration-400 ease-in-out`}
            style={{
              transition: 'box-shadow 0.4s ease-in-out'
            }}
          />

          {/* Event horizon (black center) */}
          <div className="absolute top-1/2 left-1/2 w-3/4 h-3/4 -translate-x-1/2 -translate-y-1/2 bg-black rounded-full shadow-[0_0_2vmin_#000] z-[1]" />

          {/* X text */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* <span className="text-7xl font-bold bg-clip-text text-transparent bg-white select-none">X</span> */}
            <svg id="xLogoSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="X logo" className="w-1/2 h-1/2">
              <line x1="10" y1="10" x2="90" y2="90" stroke="#fff" strokeWidth="20" strokeLinecap="butt" />
              <line x1="10" y1="90" x2="90" y2="10" stroke="#fff" strokeWidth="20" strokeLinecap="butt" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* <h1     
        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white-200 to-black-200 min-h-[3.5rem] mt-20"
      >
        Pocket Universe
      </h1> */}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1"
          initial={{ y: 0 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <motion.div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Add this inline style
<style jsx global>{`
  /* Ensure the black hole container has proper cursor */
  .black-hole {
    cursor: default;
  }
`}</style>
