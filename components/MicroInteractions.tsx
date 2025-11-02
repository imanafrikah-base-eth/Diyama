'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MicroInteractionProps {
  children: ReactNode
  type?: 'hover' | 'tap' | 'focus' | 'scale' | 'glow'
  className?: string
}

const interactionVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)',
    transition: { duration: 0.2 }
  },
  scale: {
    scale: 1.05,
    transition: { duration: 0.3 }
  },
  glow: {
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)',
    transition: { duration: 0.3 }
  }
}

export function HoverEffect({ children, className = '' }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={interactionVariants.hover}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export function TapEffect({ children, className = '' }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileTap={interactionVariants.tap}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleEffect({ children, className = '' }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={interactionVariants.scale}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function GlowEffect({ children, className = '' }: MicroInteractionProps) {
  return (
    <motion.div
      className={className}
      whileHover={interactionVariants.glow}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function FadeInUp({ children, delay = 0, className = '' }: { children: ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}