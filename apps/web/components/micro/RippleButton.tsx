'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
}

let rippleId = 0

interface RippleButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function RippleButton({ children, className = '', onClick }: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = rippleId++
    const newRipple = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700)
    onClick?.()
  }, [onClick])

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium text-sm cursor-pointer select-none
        bg-sky-500 text-white
        hover:bg-sky-400 transition-colors duration-150
        shadow-[0_4px_14px_rgba(14,165,233,0.3)]
        ${className}`}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.35)',
              pointerEvents: 'none',
            }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}
