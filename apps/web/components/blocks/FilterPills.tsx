'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

const filters = [
  { id: 'active', label: 'Active', color: '#10b981' },
  { id: 'pending', label: 'Pending', color: '#f59e0b' },
  { id: 'draft', label: 'Draft', color: '#6366f1' },
  { id: 'archived', label: 'Archived', color: '#64748b' },
  { id: 'featured', label: 'Featured', color: '#ec4899' },
]

export function FilterPills() {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const count = selected.size

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((f) => {
        const isActive = selected.has(f.id)
        return (
          <motion.button
            key={f.id}
            layout
            onClick={() => toggle(f.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all"
            style={{
              background: isActive ? `${f.color}18` : 'var(--bg-2)',
              borderColor: isActive ? `${f.color}50` : 'var(--border)',
              color: isActive ? f.color : 'var(--text-2)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ scale: 0, width: 0, opacity: 0 }}
                  animate={{ scale: 1, width: 'auto', opacity: 1 }}
                  exit={{ scale: 0, width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                >
                  <Check className="w-3 h-3" />
                </motion.span>
              )}
            </AnimatePresence>
            {f.label}
          </motion.button>
        )
      })}

      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="flex items-center gap-2 pl-2 ml-1"
            style={{ borderLeft: '1px solid var(--border)' }}
          >
            <span className="text-xs" style={{ color: 'var(--text-2)' }}>
              <span className="font-semibold" style={{ color: 'var(--text)' }}>{count}</span> active
            </span>
            <button
              onClick={() => setSelected(new Set())}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors t-hover"
              style={{ color: 'var(--text-2)' }}
            >
              <X className="w-3 h-3" /> Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
