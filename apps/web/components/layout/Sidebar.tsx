'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, Layers } from 'lucide-react'
import { categories } from '@/lib/registry'
import { blockCategories } from '@/lib/blocks-registry'

function SidebarSection({
  title,
  items,
  basePath,
  defaultOpen = true,
}: {
  title: string
  items: { id: string; label: string; color: string }[]
  basePath: string
  defaultOpen?: boolean
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--border)] transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--text-muted)]">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-[var(--text-faint)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-0.5 ml-1">
              {items.map((item) => {
                const href = `/${basePath}/${item.id}`
                const isActive = pathname === href
                return (
                  <Link key={item.id} href={href}>
                    <div
                      className="px-3 py-2 rounded-lg text-sm transition-colors duration-150 cursor-pointer truncate"
                      style={{ color: isActive ? 'var(--text)' : 'var(--text-muted)' }}
                    >
                      {item.label}
                    </div>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Sidebar() {
  return (
    <aside
      className="fixed top-14 left-0 bottom-0 w-56 border-r overflow-y-auto flex flex-col z-30"
      style={{
        background: 'var(--sidebar-bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex-1 p-3 space-y-4">
        {/* All link */}
        <Link href="/">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-all mb-1">
            <Layers className="w-3.5 h-3.5" />
            All components
          </div>
        </Link>

        <div className="h-px bg-[var(--border)]" />

        <SidebarSection
          title="Micro-interactions"
          basePath="components"
          items={categories.map((c) => ({ id: c.id, label: c.label, color: c.color }))}
        />

        <div className="h-px bg-[var(--border)]" />

        <SidebarSection
          title="UI Blocks"
          basePath="blocks"
          items={blockCategories.map((c) => ({ id: c.id, label: c.label, color: c.color }))}
        />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border)]">
        <div className="text-[10px] text-[var(--text-faint)] text-center">
          {categories.length + blockCategories.length} categories ·{' '}
          {categories.reduce((a, c) => a + c.count, 0) +
            blockCategories.reduce((a, c) => a + c.count, 0)}{' '}
          components
        </div>
      </div>
    </aside>
  )
}
