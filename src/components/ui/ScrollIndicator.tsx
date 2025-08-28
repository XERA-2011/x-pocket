"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  onClick?: () => void;
  className?: string;
}

export default function ScrollIndicator({ onClick, className = "" }: ScrollIndicatorProps) {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`absolute bottom-8 flex flex-col items-center cursor-pointer ${className}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: showScrollIndicator ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      <motion.div
        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-center mb-2 relative overflow-hidden"
      >
        <motion.div
          className="w-1.5 h-3 bg-white/70 rounded-full"
          animate={{
            y: [-8, 8, -8]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
}