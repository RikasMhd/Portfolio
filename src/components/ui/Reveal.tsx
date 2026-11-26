import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
}

const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  style,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-80px' });
  const controls = useAnimation();

  const dirMap = {
    up:    { y: 40, x: 0 },
    down:  { y: -40, x: 0 },
    left:  { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none:  { x: 0, y: 0 },
  };

  const initial = { opacity: 0, ...dirMap[direction] };
  const animate = { opacity: 1, x: 0, y: 0 };

  useEffect(() => {
    if (isInView) controls.start(animate);
    else if (!once) controls.start(initial);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
