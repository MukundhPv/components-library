'use client'

import { motion } from 'framer-motion'

interface ElasticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ElasticButton({ children, className = '', onClick }: ElasticButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-medium text-sm cursor-pointer select-none
        bg-indigo-500 text-white
        shadow-[0_2px_0_rgba(0,0,0,0.3),0_4px_12px_rgba(99,102,241,0.2)]
        hover:shadow-[0_4px_0_rgba(0,0,0,0.3),0_8px_20px_rgba(99,102,241,0.35)]
        transition-shadow duration-150
        ${className}`}
    >
      {children}
    </motion.button>
  )
}
