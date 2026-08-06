'use client'

import { motion } from 'framer-motion'

interface BreathingButtonProps {
  children: React.ReactNode
  className?: string
  color?: string
}

export function BreathingButton({
  children,
  className = '',
  color = 'rgba(236,72,153,',
}: BreathingButtonProps) {
  return (
    <motion.button
      animate={{
        scale: [1, 1.04, 1],
        boxShadow: [
          `0 0 0px ${color}0)`,
          `0 0 24px ${color}0.45)`,
          `0 0 0px ${color}0)`,
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.07,
        boxShadow: `0 0 30px ${color}0.55)`,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-xl font-medium text-sm cursor-pointer select-none
        bg-pink-500 text-white
        ${className}`}
    >
      {children}
    </motion.button>
  )
}
