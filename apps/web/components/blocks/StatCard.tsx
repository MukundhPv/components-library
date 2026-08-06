'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, DollarSign, Eye, Zap } from 'lucide-react'

function useCountUp(target: number, duration = 1500, inView = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, inView])
  return value
}

interface StatCardProps {
  label: string; value: number; prefix?: string; suffix?: string
  trend: number; color: string; Icon: React.ElementType; delay?: number
}

function StatCard({ label, value, prefix = '', suffix = '', trend, color, Icon, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const count = useCountUp(value, 1500, inView)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isPositive = trend >= 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
      className="relative rounded-2xl border p-5 overflow-hidden cursor-default t-card"
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />

      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: delay + 0.4, duration: 0.3 }}
          className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
          style={{
            color: isPositive ? '#10b981' : '#ef4444',
            background: isPositive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
          }}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}%
        </motion.div>
      </div>

      <div className="text-2xl font-bold tabular-nums" style={{ color: 'var(--text)' }}>
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs mt-1" style={{ color: 'var(--text-2)' }}>{label}</div>

      <div className="absolute bottom-4 right-4 opacity-20">
        <svg width="52" height="24" viewBox="0 0 52 24">
          <polyline points="0,20 8,14 18,16 26,8 34,12 42,4 52,6" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </motion.div>
  )
}

export function StatGrid() {
  const stats = [
    { label: 'Total Users', value: 24891, trend: 12.5, color: '#6366f1', Icon: Users, prefix: '' },
    { label: 'Revenue', value: 48320, trend: 8.2, color: '#10b981', Icon: DollarSign, prefix: '$' },
    { label: 'Page Views', value: 183450, trend: -3.1, color: '#f59e0b', Icon: Eye },
    { label: 'Conversions', value: 3847, trend: 22.7, color: '#ec4899', Icon: Zap },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-sm mx-auto">
      {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.1} />)}
    </div>
  )
}

export function SingleStatCard() {
  return <StatCard label="Monthly Revenue" value={48320} prefix="$" trend={8.2} color="#10b981" Icon={DollarSign} />
}
