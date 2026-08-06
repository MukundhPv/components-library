'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
}

export function MagneticButton({ children, className = '' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isNear, setIsNear] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = e.clientX - centerX
    const distY = e.clientY - centerY
    const distance = Math.sqrt(distX * distX + distY * distY)

    if (distance < 120) {
      setIsNear(true)
      const strength = (120 - distance) / 120
      x.set(distX * strength * 0.4)
      y.set(distY * strength * 0.4)
    } else {
      setIsNear(false)
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    setIsNear(false)
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center justify-center p-8"
    >
      <motion.button
        style={{ x: springX, y: springY }}
        className={`relative px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer select-none
          bg-purple-500 text-white
          ${isNear ? 'shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 'shadow-[0_0_0px_rgba(168,85,247,0)]'}
          ${className}`}
      >
        {children}
      </motion.button>
    </div>
  )
}
