
import React from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  glass?: boolean;
  intensity?: 'light' | 'medium' | 'heavy';
  glowOnHover?: boolean;
}

const AnimatedButton = ({ 
  children, 
  className, 
  glass = false,
  intensity = 'medium',
  glowOnHover = false,
  ...props 
}: AnimatedButtonProps) => {
  const getIntensityClasses = () => {
    if (!glass) return '';
    
    switch (intensity) {
      case 'light':
        return 'bg-white/10 backdrop-blur-md border border-white/10';
      case 'medium':
        return 'bg-white/20 backdrop-blur-lg border border-white/20';
      case 'heavy':
        return 'bg-white/30 backdrop-blur-xl border border-white/30';
      default:
        return 'bg-white/20 backdrop-blur-lg border border-white/20';
    }
  };

  const glowClasses = glowOnHover ? 'hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]' : '';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Button
        className={cn(
          "transition-all duration-300 relative overflow-hidden",
          glass && getIntensityClasses(),
          glowClasses,
          className
        )}
        {...props}
      >
        <motion.span
          className="relative z-10 flex items-center gap-1"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          {children}
        </motion.span>
        
        {glowOnHover && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-500/20 opacity-0 transition-opacity duration-300"
            whileHover={{ opacity: 1 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
