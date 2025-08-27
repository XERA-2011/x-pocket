'use client';

import React, { useRef, useEffect, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import styles from './style.module.scss';

interface GlowCardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spread?: number;
  borderWidth?: number;
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  spread = 80,
  borderWidth = 4,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  // A ref to track if the mouse is currently inside the proximity zone.
  // This is the key to preventing the flicker.
  const isNearbyRef = useRef(false);
  // A ref to hold the requestAnimationFrame ID.
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const cardNode = cardRef.current;
    if (!cardNode) return;

    // Initialize CSS variables to prevent unexpected behavior.
    cardNode.style.setProperty('--start', '0');
    cardNode.style.setProperty('--active', '0');

    const handleMove = (e: MouseEvent | TouchEvent) => {
      // Cancel any pending animation frame to avoid multiple updates.
      cancelAnimationFrame(animationFrameRef.current);

      // Schedule a new animation frame.
      animationFrameRef.current = requestAnimationFrame(() => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const clientX = 'clientX' in e ? e.clientX : e.touches[0].clientX;
        const clientY = 'clientY' in e ? e.clientY : e.touches[0].clientY;

        const proximity = 50;
        const currentlyIsNearby =
          clientX > rect.left - proximity &&
          clientX < rect.right + proximity &&
          clientY > rect.top - proximity &&
          clientY < rect.bottom + proximity;

        // Only update the --active property if the proximity state *changes*.
        // This prevents the CSS transition from being interrupted and restarted.
        if (currentlyIsNearby !== isNearbyRef.current) {
          isNearbyRef.current = currentlyIsNearby;
          cardRef.current.style.setProperty('--active', currentlyIsNearby ? '1' : '0');
        }

        // Always update the angle when the mouse is nearby.
        if (currentlyIsNearby) {
          const x = clientX - rect.left;
          const y = clientY - rect.top;
          const angle = (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180) / Math.PI + 90;
          const startAngle = (angle + 360) % 360;
          cardRef.current.style.setProperty('--start', `${startAngle}`);
        }
      });
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove, { passive: true });

    // Cleanup function to remove listeners and cancel animation frames.
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('touchmove', handleMove);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount.

  return (
    <div
      ref={cardRef}
      className={cn(styles.card, className)}
      style={
        {
          ...props.style,
          '--spread': spread,
          '--glowingeffect-border-width': `${borderWidth}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className={styles.glowingContainer}>
        <div className={styles.glowingEffect}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default GlowCard;