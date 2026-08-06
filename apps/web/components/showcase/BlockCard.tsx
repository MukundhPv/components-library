'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BlockCategoryMeta } from '@/lib/blocks-registry'
import { CommandPalette } from '@/components/blocks/CommandPalette'
import { ExpandingSearch } from '@/components/blocks/SearchBar'
import { FilterPills } from '@/components/blocks/FilterPills'
import { SortDropdown } from '@/components/blocks/SortDropdown'
import { SingleStatCard } from '@/components/blocks/StatCard'
import { ToastDemo } from '@/components/blocks/Toast'
import { CardSkeleton } from '@/components/blocks/Skeleton'
import { SlidingTabs } from '@/components/blocks/TabSwitcher'
import { TagInput } from '@/components/blocks/TagInput'
import { PricingToggle } from '@/components/blocks/PricingToggle'

function MiniDemo({ category }: { category: string }) {
  switch (category) {
    case 'command-palette': return <div className="scale-90 w-full"><CommandPalette /></div>
    case 'search': return <ExpandingSearch />
    case 'filter-pills': return <FilterPills />
    case 'sort': return <SortDropdown />
    case 'stat-card': return <div className="scale-[0.8] origin-center"><SingleStatCard /></div>
    case 'toast': return <ToastDemo />
    case 'skeleton': return <div className="scale-[0.7] origin-center"><CardSkeleton /></div>
    case 'tabs': return <div className="scale-90 origin-center w-full"><SlidingTabs /></div>
    case 'tag-input': return <TagInput />
    case 'pricing-toggle': return <div className="scale-[0.5] origin-center w-[520px]"><PricingToggle /></div>
    default: return null
  }
}

export function BlockCard({ category, index }: { category: BlockCategoryMeta; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/blocks/${category.id}`}>
        <div
          className="group rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300"
          style={{ background: 'var(--card-bg)', borderColor: 'var(--border)' }}
        >
          <div
            className="h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: `linear-gradient(90deg, transparent, ${category.color}70, transparent)` }}
          />
          <div
            className="relative overflow-hidden min-h-[140px] flex items-center justify-center p-4 border-b"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(500px at 50% 50%, ${category.color}06, transparent)` }}
            />
            <MiniDemo category={category.id} />
          </div>
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
