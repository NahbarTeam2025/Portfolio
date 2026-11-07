import React, { useRef } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

export const MagneticButton = ({ 
  children, 
  className, 
  onClick, 
  href,
  id,
  type = "button",
  target,
  rel
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (ref.current) {
      const { width, height, left, top } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from center
      const deltaX = (clientX - centerX) * 0.35;
      const deltaY = (clientY - centerY) * 0.35;
      
      // Limit translation to 15px
      const limitedX = Math.max(-15, Math.min(15, deltaX));
      const limitedY = Math.max(-15, Math.min(15, deltaY));
      
      mouseX.set(limitedX);
      mouseY.set(limitedY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Component = href ? m.a : m.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      id={id}
      type={!href ? type : undefined}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      initial="initial"
      whileHover="hover"
      className={`relative group flex items-center justify-center ${className}`}
    >
      {children}
    </Component>
  );
};

export const IconShift = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`flex items-center justify-center ${className}`}>
      {children}
    </span>
  );
};
