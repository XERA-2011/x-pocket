"use client";

import { useState, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, MotionProps } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  radius?: number;
  style?: React.CSSProperties;
  onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  transition?: MotionProps['transition'];
  viewport?: MotionProps['viewport'];
}

export default function GlowCard({
  children,
  className = "",
  radius = 100,
  style = {},
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onClick,
  initial,
  whileInView,
  transition,
  viewport,
}: GlowCardProps) {
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    
    if (onMouseMove) {
      onMouseMove(event);
    }
  }

  function handleMouseEnter() {
    setVisible(true);
    if (onMouseEnter) {
      onMouseEnter();
    }
  }

  function handleMouseLeave() {
    setVisible(false);
    if (onMouseLeave) {
      onMouseLeave();
    }
  }

  const glowStyle = {
    background: useMotionTemplate`
      radial-gradient(
        ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
        rgba(255, 255, 255, 0.1),
        transparent 80%
      )
    `,
    ...style,
  };

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={viewport}
      style={glowStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
}