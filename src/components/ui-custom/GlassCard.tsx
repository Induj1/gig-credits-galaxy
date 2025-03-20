
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement>, MotionProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  interactive?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
  withBorder?: boolean;
}

const GlassCard = ({
  children,
  className,
  hoverable = false,
  interactive = false,
  intensity = 'medium',
  withBorder = true,
  ...props
}: GlassCardProps) => {
  const getIntensityClasses = () => {
    switch (intensity) {
      case 'light':
        return 'bg-white/5 backdrop-blur-md';
      case 'medium':
        return 'bg-white/10 backdrop-blur-lg';
      case 'heavy':
        return 'bg-white/15 backdrop-blur-xl';
      default:
        return 'bg-white/10 backdrop-blur-lg';
    }
  };

  const hoverClasses = hoverable
    ? 'transition-all duration-300 hover:shadow-lg hover:bg-white/15 hover:-translate-y-1'
    : '';

  const interactiveClasses = interactive
    ? 'cursor-pointer active:scale-[0.98] active:bg-white/15'
    : '';

  const borderClasses = withBorder
    ? 'border border-white/10'
    : '';

  return (
    <motion.div
      className={cn(
        'rounded-2xl shadow-sm',
        getIntensityClasses(),
        hoverClasses,
        interactiveClasses,
        borderClasses,
        'dark:bg-opacity-10 dark:border-white/5',
        className
      )}
      whileHover={hoverable ? { y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
