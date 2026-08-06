'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock } from 'lucide-react'

const recent = ['Dashboard analytics', 'User settings', 'Billing overview']
const suggestions = [
  'Dashboard analytics', 'User management', 'Revenue reports', 'API settings', 'Team members',
]

export function ExpandingSearch() {
  const [expanded, setExpanded] = useState(false)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const showDropdown = focused && expanded
  const filtered = query ? suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())) : []

  return (
    <div className="relative flex justify-center">
      <motion.div
        layout
        animate={{ width: expanded ? 300 : 44 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="relative flex items-center rounded-xl border t-input t-border overflow-hidden"
        style={{ height: 44 }}
      >
        <button
          onClick={() => { setExpanded(true); setTimeout(() => inputRef.current?.focus(), 100) }}
          className="absolute left-0 w-11 h-11 flex items-center justify-center transition-colors t-hover rounded-xl"
          style={{ color: 'var(--text-3)' }}
        >
          <Search className="w-4 h-4" />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.input
              ref={inputRef}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15, delay: 0.1 }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search..."
              className="absolute left-10 right-8 bg-transparent text-sm outline-none"
              style={{ color: 'var(--text)' }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {expanded && query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => { setQuery(''); setExpanded(false) }}
              className="absolute right-2 w-6 h-6 flex items-center justify-center transition-colors rounded-full t-hover"
              style={{ color: 'var(--text-3)' }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: 'top' }}
            className="t-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[300px] rounded-xl border t-border overflow-hidden z-50"
          >
            {query ? (
              filtered.map((s) => (
                <button key={s} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors t-dropdown-item">
                  <Search className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
                  {s}
                </button>
              ))
            ) : (
              <>
                <div className="px-4 py-2 text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text-3)' }}>
                  Recent
                </div>
                {recent.map((r) => (
                  <button key={r} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors t-dropdown-item">
                    <Clock className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
                    {r}
                  </button>
                ))}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
