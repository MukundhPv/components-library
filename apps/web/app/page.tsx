import { categories } from '@/lib/registry'
import { blockCategories } from '@/lib/blocks-registry'
import { CategoryCard } from '@/components/showcase/CategoryCard'
import { BlockCard } from '@/components/showcase/BlockCard'

export default function HomePage() {
  const totalComponents = categories.length + blockCategories.length
  const totalVariants =
    categories.reduce((a, c) => a + c.count, 0) +
    blockCategories.reduce((a, c) => a + c.count, 0)

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Background dot grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.6]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-8 pt-16 pb-24">
        {/* Hero */}
        <div className="mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium mb-7"
            style={{ color: '#a855f7', borderColor: 'rgba(168,85,247,0.25)', background: 'rgba(168,85,247,0.06)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Design Component Library
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-5 text-balance"
            style={{ color: 'var(--text)' }}
          >
            UI that makes users{' '}
            <span className="gradient-text">feel something.</span>
          </h1>

          <p className="text-base max-w-lg leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
            Micro-interactions and UI blocks for AI-generated apps.
            Browse, interact, copy the prompt, ship better UI.
          </p>

          <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-faint)' }}>
            <span>{totalComponents} categories</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-faint)]" />
            <span>{totalVariants} components</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-faint)]" />
            <span>Copy-ready prompts</span>
          </div>
        </div>

        {/* Micro-interactions */}
        <section className="mb-14">
          <SectionHeader
            label="01"
            title="Micro-interactions"
            subtitle="Physics-based animations and interaction effects"
            count={`${categories.length} categories · ${categories.reduce((a, c) => a + c.count, 0)} variants`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>

        <Divider label="UI Blocks" />

        {/* UI Blocks */}
        <section className="mt-14">
          <SectionHeader
            label="02"
            title="UI Blocks"
            subtitle="Ready-to-use interactive UI components"
            count={`${blockCategories.length} categories · ${blockCategories.reduce((a, c) => a + c.count, 0)} variants`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {blockCategories.map((category, index) => (
              <BlockCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionHeader({ label, title, subtitle, count }: { label: string; title: string; subtitle: string; count: string }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--text-faint)' }}>
          Category {label}
        </div>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>{title}</h2>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      </div>
      <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>{count}</span>
    </div>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="relative my-12">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t" style={{ borderColor: 'var(--border)' }} />
      </div>
      <div className="relative flex justify-center">
        <span
          className="px-4 text-[10px] uppercase tracking-widest font-semibold"
          style={{ background: 'var(--bg)', color: 'var(--text-faint)' }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}
