'use client';

import { clsx } from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

interface Props extends Omit<HTMLMotionProps<'button'>, 'size'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'glow' | 'outline' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const baseClasses = [
    'btn',
    'focus-ring',
    'micro-bounce',
    'touch-target',
    'relative',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'transition-all',
    'duration-300',
    'ease-out',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:transform-none',
    'overflow-hidden',
    'group'
  ];

  const sizeClasses = {
    xs: 'px-3 py-1.5 text-xs min-h-[32px]',
    sm: 'px-4 py-2 text-sm min-h-[36px]',
    md: 'px-6 py-3 text-base min-h-[44px]',
    lg: 'px-8 py-4 text-lg min-h-[52px]',
    xl: 'px-10 py-5 text-xl min-h-[60px]'
  };

  const variantClasses = {
    primary: [
      'btn-primary',
      'text-white',
      'shadow-lg',
      'hover:shadow-xl',
      'active:shadow-md',
      'before:absolute',
      'before:inset-0',
      'before:bg-gradient-to-r',
      'before:from-transparent',
      'before:via-white/20',
      'before:to-transparent',
      'before:translate-x-[-100%]',
      'before:transition-transform',
      'before:duration-700',
      'hover:before:translate-x-[100%]'
    ],
    secondary: [
      'btn-secondary',
      'text-white',
      'hover:text-white',
      'shadow-md',
      'hover:shadow-lg',
      'active:shadow-sm'
    ],
    ghost: [
      'btn-ghost',
      'text-gray-300',
      'hover:text-white',
      'hover:bg-white/5',
      'active:bg-white/10'
    ],
    outline: [
      'bg-transparent',
      'text-blue-400',
      'border-2',
      'border-blue-500/50',
      'hover:border-blue-400',
      'hover:bg-blue-500/10',
      'hover:text-blue-300',
      'active:bg-blue-500/20',
      'shadow-sm',
      'hover:shadow-md'
    ],
    glow: [
      'bg-gradient-to-r',
      'from-blue-500',
      'to-cyan-400',
      'text-white',
      'shadow-lg',
      'shadow-blue-500/25',
      'hover:shadow-xl',
      'hover:shadow-blue-500/40',
      'animate-pulse-glow',
      'hover:scale-105',
      'active:scale-95'
    ],
    danger: [
      'bg-gradient-to-r',
      'from-red-500',
      'to-red-600',
      'text-white',
      'border',
      'border-red-400/30',
      'shadow-lg',
      'shadow-red-500/25',
      'hover:shadow-xl',
      'hover:shadow-red-500/40',
      'hover:from-red-600',
      'hover:to-red-700',
      'active:from-red-700',
      'active:to-red-800'
    ]
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const LoadingSpinner = () => (
    <motion.div
      className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const buttonContent = (
    <>
      {loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="mr-2"
        >
          <LoadingSpinner />
        </motion.div>
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <motion.div
          className="mr-2 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      )}
      
      <motion.span
        className="relative z-10"
        initial={false}
        animate={{ opacity: loading ? 0.7 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {!loading && icon && iconPosition === 'right' && (
        <motion.div
          className="ml-2 flex-shrink-0"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Shimmer effect for glow variant */}
      {variant === 'glow' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}
    </>
  );

  return (
    <motion.button
      ref={ref}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        widthClasses,
        className
      )}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { 
        scale: variant === 'glow' ? 1.05 : 1.02,
        y: -2 
      } : undefined}
      whileTap={!disabled && !loading ? { 
        scale: 0.98,
        y: 0 
      } : undefined}
      initial={false}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25
      }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;