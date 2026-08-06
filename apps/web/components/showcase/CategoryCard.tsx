'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CategoryMeta } from '@/lib/registry'
import { MagneticButton } from '@/components/micro/MagneticButton'
import { ElasticButton } from '@/components/micro/ElasticButton'
import { ParticleBurst } from '@/components/micro/ParticleBurst'
import { SpotlightCard } from '@/components/micro/SpotlightCard'
import { TiltCard } from '@/components/micro/TiltCard'
import { ScrambleOnHover } from '@/components/micro/TextScramble'
import { GlitchText } from '@/components/micro/GlitchText'
import { BreathingButton } from '@/components/micro/BreathingButton'
import { RippleButton } from '@/components/micro/RippleButton'
import { LiquidButton } from '@/components/micro/LiquidButton'

function MiniDemo({ category }: { category: string }) {
  switch (category) {
    case 'magnetic': return <MagneticButton>Hover near me</MagneticButton>
    case 'elastic': return <ElasticButton>Click me</ElasticButton>
    case 'particle': return <ParticleBurst>Click me!</ParticleBurst>
    case 'spotlight':
      return (
        <SpotlightCard className="h-full w-full flex items-center justify-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Move cursor over me</p>
        </SpotlightCard>
      )
    case 'tilt':
      return (
        <TiltCard className="p-4 w-28 text-center">
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Hover & tilt</p>
          <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>3D</p>
        </TiltCard>
      )
    case 'scramble':
      return <ScrambleOnHover text="Hover to scramble" className="text-sm font-mono text-green-400" />
    case 'glitch':
      return <GlitchText text="Hover me" className="text-2xl font-bold text-red-400" />
    case 'breathing': return <BreathingButton>Breathing</BreathingButton>
    case 'ripple': return <RippleButton>Click ripple</RippleButton>
    case 'liquid': return <LiquidButton>Hover fill</LiquidButton>
    default: return null
  }
}

export function CategoryCard({ category, index }: { category: CategoryMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/components/${category.id}`}>
        <div
          className="group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300"
          style={{
            background: 'var(--card-bg)',
            borderColor: 'var(--border)',
          }}
        >
          {/* Accent top line on hover */}
          <div
            className="h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${category.color}70, transparent)` }}
          />

          {/* Demo area */}
          <div
            className="relative overflow-hidden min-h-[130px] flex items-center justify-center p-4 border-b"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(500px at 50% 50%, ${category.color}07, transparent)` }}
            />
            <MiniDemo category={category.id} />
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--text)' }}>{category.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{category.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                  style={{ color: category.color, borderColor: `${category.color}30`, background: `${category.color}10` }}
                >
                  {category.count} variants
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all duration-200"
                  style={{ color: 'var(--text-faint)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
