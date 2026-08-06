'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface LiquidButtonProps {
  children: React.ReactNode
  className?: string
}

export function LiquidButton({ children, className = '' }: LiquidButtonProps) {
  const [hovered, setHovered] = useState(false)

  const liquidPath = hovered
    ? 'M0,0 Q25,-8 50,0 Q75,8 100,0 L100,100 L0,100 Z'
    : 'M0,100 Q25,92 50,100 Q75,108 100,100 L100,100 L0,100 Z'

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden px-8 py-3 rounded-xl font-medium text-sm cursor-pointer select-none
        border border-orange-500/50 text-orange-400
        hover:text-white transition-colors duration-300
        ${className}`}
      style={{ background: 'transparent' }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <motion.path
          d={liquidPath}
          fill="#f97316"
          animate={{ d: liquidPath }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
