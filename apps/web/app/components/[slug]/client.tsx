'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tag } from 'lucide-react'
import { CategoryMeta, MicroInteraction } from '@/lib/registry'
import { PromptCopyCard } from '@/components/showcase/PromptCopyCard'
import { MagneticButton } from '@/components/micro/MagneticButton'
import { ElasticButton } from '@/components/micro/ElasticButton'
import { ParticleBurst } from '@/components/micro/ParticleBurst'
import { SpotlightCard } from '@/components/micro/SpotlightCard'
import { TiltCard } from '@/components/micro/TiltCard'
import { ScrambleHeading, ScrambleOnHover } from '@/components/micro/TextScramble'
import { GlitchText } from '@/components/micro/GlitchText'
import { BreathingButton } from '@/components/micro/BreathingButton'
import { RippleButton } from '@/components/micro/RippleButton'
import { LiquidButton } from '@/components/micro/LiquidButton'

function Demo({ interaction }: { interaction: MicroInteraction }) {
  switch (interaction.id) {
    case 'magnetic-button': case 'magnetic-icon': case 'magnetic-card':
      return <MagneticButton>{interaction.name}</MagneticButton>
    case 'elastic-button': case 'elastic-card': case 'elastic-toggle':
      return <ElasticButton>{interaction.name}</ElasticButton>
    case 'particle-button': case 'particle-confetti': case 'particle-trail':
      return <ParticleBurst>{interaction.name}</ParticleBurst>
    case 'spotlight-card': case 'spotlight-grid': case 'spotlight-text':
      return (
        <SpotlightCard className="w-72 p-8 text-center">
          <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>Move cursor here</p>
          <h3 className="font-semibold" style={{ color: 'var(--text)' }}>{interaction.name}</h3>
          <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>{interaction.description}</p>
        </SpotlightCard>
      )
    case 'tilt-card': case 'tilt-image': case 'tilt-button':
      return (
        <TiltCard className="w-52 p-6">
          <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Hover to tilt</p>
          <h3 className="font-bold" style={{ color: 'var(--text)' }}>{interaction.name}</h3>
          <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>{interaction.description}</p>
        </TiltCard>
      )
    case 'scramble-heading':
      return <ScrambleHeading text={interaction.name} className="text-3xl font-bold text-green-400" />
    case 'scramble-hover': case 'scramble-counter':
      return <ScrambleOnHover text={interaction.name} className="text-2xl font-bold text-green-400" />
    case 'glitch-text': case 'glitch-card': case 'glitch-image':
      return <GlitchText text={interaction.name} className="text-3xl font-bold text-red-400" />
    case 'breathing-button': case 'breathing-card': case 'breathing-avatar':
      return <BreathingButton>{interaction.name}</BreathingButton>
    case 'ripple-button': case 'ripple-card': case 'ripple-input':
      return <RippleButton>{interaction.name}</RippleButton>
    case 'liquid-button': case 'liquid-progress': case 'liquid-blob':
      return <LiquidButton>{interaction.name}</LiquidButton>
    default:
      return <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Demo coming soon</div>
  }
}

export function ComponentPageClient({ category, interactions }: { category: CategoryMeta; interactions: MicroInteraction[] }) {
  const [selected, setSelected] = useState<MicroInteraction>(interactions[0])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-8 pt-10 pb-20">
        {/* Page header */}
        <div className="mb-8">
          <div
            className="text-xs font-mono px-2.5 py-1 rounded-full border inline-flex mb-3"
            style={{ color: category.color, borderColor: `${category.color}30`, background: `${category.color}10` }}
          >
            Micro-interaction
          </div>
          <h1 className="text-2xl font-bold mb-1.5" style={{ color: 'var(--text)' }}>{category.label}</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{category.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
          {/* Variant list */}
          <div className="space-y-1">
            {interactions.map((interaction) => (
              <button
                key={interaction.id}
                onClick={() => setSelected(interaction)}
                className="w-full text-left px-3.5 py-3 rounded-xl border transition-all duration-150"
                style={{
                  background: selected.id === interaction.id ? 'var(--surface-2)' : 'transparent',
                  borderColor: selected.id === interaction.id ? 'var(--border-2)' : 'transparent',
                  color: selected.id === interaction.id ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                <div className="text-sm font-medium">{interaction.name}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-faint)' }}>{interaction.description}</div>
              </button>
            ))}
          </div>

          {/* Detail */}
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* Demo */}
              <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex gap-1.5">
                    {['#ff5f57','#febc2e','#28c840'].map((c) => (
                      <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
                    ))}
                  </div>
                  <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{selected.id}</span>
                </div>
                <div className="flex items-center justify-center min-h-[220px] p-8">
                  <Demo interaction={selected} />
                </div>
              </div>

              {/* Details */}
              <div className="rounded-2xl border p-5" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <h2 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{selected.name}</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{selected.longDescription}</p>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border"
                      style={{ color: 'var(--text-muted)', borderColor: 'var(--border-2)', background: 'var(--bg-tertiary)' }}
                    >
                      <Tag className="w-2.5 h-2.5" />{tag}
                    </span>
                  ))}
                </div>
              </div>

              <PromptCopyCard interaction={selected} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
