'use client';

import { clsx } from 'clsx';
import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'glow' | 'elevated' | 'bordered' | 'gradient';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  interactive?: boolean;
  loading?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  className,
  variant = 'default',
  hover = true,
  padding = 'md',
  rounded = 'xl',
  interactive = false,
  loading = false,
  ...props
}, ref) => {
  const baseClasses = [
    'relative',
    'transition-all',
    'duration-300',
    'ease-out',
    'group',
    'overflow-hidden'
  ];

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const roundedClasses = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    '2xl': 'rounded-[2rem]'
  };

  const variantClasses = {
    default: [
      'bg-gray-900/50',
      'border',
      'border-gray-800',
      'backdrop-blur-sm'
    ],
    glass: [
      'glass-card',
      'border',
      'border-white/10'
    ],
    glow: [
      'glass-card',
      'border',
      'border-blue-500/20',
      'shadow-lg',
      'shadow-blue-500/10',
      hover ? 'hover:shadow-blue-500/20' : '',
      hover ? 'hover:border-blue-400/30' : ''
    ],
    elevated: [
      'bg-gray-900/80',
      'border',
      'border-gray-700/50',
      'shadow-2xl',
      'shadow-black/20',
      'backdrop-blur-xl'
    ],
    bordered: [
      'bg-gray-950/50',
      'border-2',
      'border-gray-700',
      hover ? 'hover:border-gray-600' : '',
      'backdrop-blur-sm'
    ],
    gradient: [
      'bg-gradient-to-br',
      'from-gray-900/90',
      'via-gray-800/80',
      'to-gray-900/90',
      'border',
      'border-gradient-to-br',
      'border-gray-700/50',
      'backdrop-blur-xl'
    ]
  };

  const hoverClasses = hover ? [
    'hover:scale-[1.02]',
    'hover:-translate-y-1',
    'hover:shadow-xl',
    'hover:shadow-black/20'
  ] : [];

  const interactiveClasses = interactive ? [
    'cursor-pointer',
    'touch-card',
    'select-none',
    'active:scale-[0.98]',
    'active:translate-y-0'
  ] : [];

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700/50 rounded"></div>
        <div className="h-3 bg-gray-700/50 rounded w-5/6"></div>
      </div>
    </div>
  );

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30
      }
    },
    hover: hover ? {
      y: -4,
      scale: 1.02,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    } : {},
    tap: interactive ? {
      scale: 0.98,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 30
      }
    } : {}
  };

  return (
    <motion.div
      ref={ref}
      className={clsx(
        baseClasses,
        paddingClasses[padding],
        roundedClasses[rounded],
        variantClasses[variant],
        hoverClasses,
        interactiveClasses,
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={hover ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      {...props}
    >
      {/* Background gradient overlay for glow effect */}
      {variant === 'glow' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      )}

      {/* Shimmer effect for interactive cards */}
      {interactive && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Border glow effect */}
      {variant === 'glow' && (
        <motion.div
          className="absolute inset-0 rounded-inherit bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 blur-sm -z-10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {loading ? <LoadingSkeleton /> : children}
      </div>

      {/* Corner accent for elevated variant */}
      {variant === 'elevated' && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl" />
      )}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;