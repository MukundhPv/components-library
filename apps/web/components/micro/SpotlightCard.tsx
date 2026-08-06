'use client'

import { useRef, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
}

export function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${className}`}
      style={{
        borderColor: 'var(--border)',
        background: isHovered
          ? `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(168,85,247,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 70%), var(--bg-secondary)`
          : 'var(--bg-secondary)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.03), transparent)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
