'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false)

  const handleEnter = () => {
    setGlitching(true)
    setTimeout(() => setGlitching(false), 500)
  }

  const glitchKeyframes = glitching
    ? {
        x: [0, -3, 3, -2, 2, 0],
        filter: [
          'none',
          'drop-shadow(-3px 0 #ff003c) drop-shadow(3px 0 #00fff9)',
          'drop-shadow(3px 0 #ff003c) drop-shadow(-3px 0 #00fff9)',
          'drop-shadow(-2px 0 #ff003c) drop-shadow(2px 0 #00fff9)',
          'none',
          'none',
        ],
      }
    : {}

  return (
    <span
      onMouseEnter={handleEnter}
      className={`relative inline-block cursor-default select-none ${className}`}
    >
      <motion.span
        animate={glitchKeyframes}
        transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
        className="relative inline-block"
      >
        {text}
      </motion.span>

      {glitching && (
        <>
          <motion.span
            aria-hidden
            animate={{
              x: [0, -4, 3, -2, 0],
              opacity: [0, 0.7, 0.5, 0.7, 0],
              clipPath: [
                'inset(0 0 60% 0)',
                'inset(30% 0 40% 0)',
                'inset(10% 0 70% 0)',
                'inset(50% 0 20% 0)',
                'inset(0 0 100% 0)',
              ],
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 text-[#ff003c]"
          >
            {text}
          </motion.span>
          <motion.span
            aria-hidden
            animate={{
              x: [0, 4, -3, 2, 0],
              opacity: [0, 0.7, 0.5, 0.7, 0],
              clipPath: [
                'inset(60% 0 0% 0)',
                'inset(40% 0 30% 0)',
                'inset(70% 0 10% 0)',
                'inset(20% 0 50% 0)',
                'inset(100% 0 0% 0)',
              ],
            }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="absolute inset-0 text-[#00fff9]"
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  )
}
