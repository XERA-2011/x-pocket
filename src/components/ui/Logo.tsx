"use client";

import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface LogoProps {
  /** Custom CSS classes for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Enable/disable entrance animations */
  animate?: boolean;
  /** Size variant for common use cases */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  /** Color variant following the black/white theme */
  variant?: 'white' | 'black' | 'inherit';
  /** Custom animation delays */
  animationDelay?: number;
  /** Stroke width for the X lines */
  strokeWidth?: number;
  /** Click handler for interactive logos */
  onClick?: () => void;
  /** Hover effects */
  hover?: boolean;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-12 h-12',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
  custom: ''
};

const colorClasses = {
  white: 'text-white',
  black: 'text-black',
  inherit: ''
};

export default function Logo({
  className,
  style,
  animate = true,
  size = 'custom',
  variant = 'inherit',
  animationDelay = 0.5,
  strokeWidth = 8,
  onClick,
  hover = false
}: LogoProps) {
  const baseClasses = cn(
    sizeClasses[size],
    colorClasses[variant],
    onClick && 'cursor-pointer',
    hover && 'transition-transform duration-300 hover:scale-110',
    className
  );

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={baseClasses}
      style={style}
      initial={animate ? { opacity: 0 } : undefined}
      animate={animate ? { opacity: 1 } : undefined}
      transition={animate ? { delay: animationDelay, duration: 0.8 } : undefined}
      onClick={onClick}
      whileHover={hover ? { scale: 1.1 } : undefined}
      whileTap={onClick ? { scale: 0.95 } : undefined}
    >
      <motion.line
        x1="25" y1="25" x2="75" y2="75"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={animate ? { delay: animationDelay + 0.3, duration: 0.6 } : undefined}
      />
      <motion.line
        x1="25" y1="75" x2="75" y2="25"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        initial={animate ? { pathLength: 0 } : undefined}
        animate={animate ? { pathLength: 1 } : undefined}
        transition={animate ? { delay: animationDelay + 0.5, duration: 0.6 } : undefined}
      />
    </motion.svg>
  );
}