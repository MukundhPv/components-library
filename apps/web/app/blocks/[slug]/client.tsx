'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Tag } from 'lucide-react'
import { BlockCategoryMeta, UIBlock } from '@/lib/blocks-registry'
import { PromptCopyCard } from '@/components/showcase/PromptCopyCard'
import { CommandPalette } from '@/components/blocks/CommandPalette'
import { ExpandingSearch } from '@/components/blocks/SearchBar'
import { FilterPills } from '@/components/blocks/FilterPills'
import { SortDropdown, SortToggleBar } from '@/components/blocks/SortDropdown'
import { SingleStatCard, StatGrid } from '@/components/blocks/StatCard'
import { ToastDemo } from '@/components/blocks/Toast'
import { CardSkeleton, ListSkeleton } from '@/components/blocks/Skeleton'
import { SlidingTabs, UnderlineTabs } from '@/components/blocks/TabSwitcher'
import { TagInput } from '@/components/blocks/TagInput'
import { PricingToggle } from '@/components/blocks/PricingToggle'

function toPromptItem(block: UIBlock) {
  return {
    id: block.id, name: block.name, category: block.category as string,
    description: block.description, longDescription: block.longDescription,
    prompt: block.prompt, tags: block.tags, component: block.id, accentColor: block.accentColor,
  }
}

function Demo({ block }: { block: UIBlock }) {
  switch (block.id) {
    case 'command-palette-default': case 'command-palette-compact': return <CommandPalette />
    case 'search-expanding': case 'search-suggestions': return <ExpandingSearch />
    case 'filter-pills-default': case 'filter-pills-grouped': return <FilterPills />
    case 'sort-dropdown': return <SortDropdown />
    case 'sort-toggle': return <SortToggleBar />
    case 'stat-counter': return <SingleStatCard />
    case 'stat-grid': return <StatGrid />
    case 'toast-stack': case 'toast-banner': return <ToastDemo />
    case 'skeleton-card': return <CardSkeleton />
    case 'skeleton-list': return <ListSkeleton />
    case 'tabs-sliding': return <SlidingTabs />
    case 'tabs-underline': return <UnderlineTabs />
    case 'tag-input-default': case 'tag-input-suggestions': return <TagInput />
    case 'pricing-toggle-default': case 'pricing-toggle-cards':
      return <div className="w-full overflow-x-auto"><PricingToggle /></div>
    default: return <div className="text-sm" style={{ color: 'var(--text-muted)' }}>Demo coming soon</div>
  }
}

export function BlockPageClient({ category, blocks }: { category: BlockCategoryMeta; blocks: UIBlock[] }) {
  const [selected, setSelected] = useState<UIBlock>(blocks[0])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto px-8 pt-10 pb-20">
        <div className="mb-8">
          <div
            className="text-xs font-mono px-2.5 py-1 rounded-full border inline-flex mb-3"
            style={{ color: category.color, borderColor: `${category.color}30`, background: `${category.color}10` }}
          >
            UI Block
          </div>
          <h1 className="text-2xl font-bold mb-1.5" style={{ color: 'var(--text)' }}>{category.label}</h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{category.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
          <div className="space-y-1">
            {blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => setSelected(block)}
                className="w-full text-left px-3.5 py-3 rounded-xl border transition-all duration-150"
                style={{
                  background: selected.id === block.id ? 'var(--surface-2)' : 'transparent',
                  borderColor: selected.id === block.id ? 'var(--border-2)' : 'transparent',
                  color: selected.id === block.id ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                <div className="text-sm font-medium">{block.name}</div>
                <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-faint)' }}>{block.description}</div>
              </button>
            ))}
          </div>

          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
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
                  <Demo block={selected} />
                </div>
              </div>

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

              <PromptCopyCard interaction={toPromptItem(selected) as Parameters<typeof PromptCopyCard>[0]['interaction']} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
