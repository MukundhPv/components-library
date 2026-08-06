'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 30 })
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['150%', '-50%'])
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['150%', '-50%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <div style={{ perspective: '1000px' }} className="inline-block">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', background: 'var(--card-bg)', borderColor: 'var(--border)' }}
        className={`relative rounded-xl border overflow-hidden ${className}`}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl"
          style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.08) 0%, transparent 60%)` }}
        />
        <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
      </motion.div>
    </div>
  )
}
