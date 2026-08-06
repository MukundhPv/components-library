'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  color: string
}

const COLORS = ['#a855f7', '#6366f1', '#f59e0b', '#10b981', '#ec4899', '#06b6d4']

let particleId = 0

interface ParticleBurstProps {
  children: React.ReactNode
  className?: string
}

export function ParticleBurst({ children, className = '' }: ParticleBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  const burst = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const newParticles: Particle[] = Array.from({ length: 12 }, () => ({
      id: particleId++,
      x: clickX,
      y: clickY,
      angle: Math.random() * 360,
      distance: 40 + Math.random() * 50,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }))

    setParticles((prev) => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
    }, 700)
  }, [])

  return (
    <button
      onClick={burst}
      className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium text-sm cursor-pointer select-none
        bg-amber-500 text-white shadow-[0_4px_14px_rgba(245,158,11,0.3)]
        hover:shadow-[0_4px_20px_rgba(245,158,11,0.5)] transition-shadow
        ${className}`}
    >
      {children}
      <AnimatePresence>
        {particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180
          const tx = Math.cos(rad) * p.distance
          const ty = Math.sin(rad) * p.distance
          return (
            <motion.span
              key={p.id}
              initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
              animate={{ x: p.x + tx, y: p.y + ty, scale: 0, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ backgroundColor: p.color }}
              className="absolute w-2 h-2 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            />
          )
        })}
      </AnimatePresence>
    </button>
  )
}
