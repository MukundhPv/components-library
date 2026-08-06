'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ArrowUpDown, ArrowUp } from 'lucide-react'

const options = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
  { id: 'alpha', label: 'Alphabetical' },
  { id: 'popular', label: 'Most popular' },
  { id: 'price-asc', label: 'Price: Low → High' },
  { id: 'price-desc', label: 'Price: High → Low' },
]

export function SortDropdown() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])

  const choose = (opt: typeof options[0]) => { setSelected(opt); setOpen(false) }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="t-input t-border flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition-all t-hover"
        style={{ color: 'var(--text)' }}
      >
        <ArrowUpDown className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
        <AnimatePresence mode="wait">
          <motion.span
            key={selected.id}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="font-medium"
          >
            {selected.label}
          </motion.span>
        </AnimatePresence>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--text-3)' }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              style={{ transformOrigin: 'top left' }}
              className="t-dropdown absolute top-full left-0 mt-2 w-52 rounded-xl border t-border z-40 overflow-hidden py-1"
            >
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => choose(opt)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors t-dropdown-item"
                  style={{ color: selected.id === opt.id ? 'var(--text)' : 'var(--text-2)' }}
                >
                  <span className="flex-1 text-left">{opt.label}</span>
                  <AnimatePresence>
                    {selected.id === opt.id && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-3.5 h-3.5 text-purple-400" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export function SortToggleBar() {
  const sorts = ['Trending', 'Newest', 'Top rated', 'Price']
  const [active, setActive] = useState('Trending')
  const [dir, setDir] = useState<'asc' | 'desc'>('desc')

  return (
    <div className="flex items-center gap-1 p-1 rounded-xl border t-border w-fit" style={{ background: 'var(--bg-2)' }}>
      {sorts.map((s) => (
        <button
          key={s}
          onClick={() => { if (active === s) setDir((d) => d === 'asc' ? 'desc' : 'asc'); else setActive(s) }}
          className="relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors z-10"
          style={{ color: active === s ? 'var(--text)' : 'var(--text-3)' }}
        >
          {active === s && (
            <motion.div
              layoutId="sort-pill"
              className="absolute inset-0 rounded-lg t-toggle-pill border"
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />
          )}
          <span className="relative flex items-center gap-1">
            {s}
            {active === s && (
              <motion.span animate={{ rotate: dir === 'asc' ? 0 : 180 }} transition={{ duration: 0.2 }}>
                <ArrowUp className="w-3 h-3" />
              </motion.span>
            )}
          </span>
        </button>
      ))}
    </div>
  )
}
