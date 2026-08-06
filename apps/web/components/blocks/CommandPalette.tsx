'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, FileText, Settings, User, BarChart2, Zap, ArrowRight, Command } from 'lucide-react'

const commands = [
  { id: '1', group: 'Navigation', icon: FileText, label: 'View Dashboard', shortcut: '⌘D' },
  { id: '2', group: 'Navigation', icon: BarChart2, label: 'Open Analytics', shortcut: '⌘A' },
  { id: '3', group: 'Navigation', icon: User, label: 'Profile Settings', shortcut: '⌘P' },
  { id: '4', group: 'Actions', icon: Zap, label: 'Create New Project', shortcut: '⌘N' },
  { id: '5', group: 'Actions', icon: Settings, label: 'Open Preferences', shortcut: '⌘,' },
  { id: '6', group: 'Actions', icon: ArrowRight, label: 'Export as PDF', shortcut: '' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = query
    ? commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))
    : commands

  const grouped = filtered.reduce<Record<string, typeof commands>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {})

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen((o) => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
    else { setQuery(''); setFocused(0) }
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowDown') setFocused((f) => Math.min(f + 1, filtered.length - 1))
      if (e.key === 'ArrowUp') setFocused((f) => Math.max(f - 1, 0))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered.length])

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-auto">
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="t-input t-border flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm w-full transition-all t-hover"
        style={{ color: 'var(--text-2)' }}
      >
        <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-3)' }} />
        <span className="flex-1 text-left">Search commands...</span>
        <span className="t-kbd flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-md border">
          <Command className="w-3 h-3" />K
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="t-dropdown fixed top-[20%] left-1/2 -translate-x-1/2 w-[480px] max-w-[90vw] z-50 rounded-2xl border overflow-hidden t-border"
            >
              {/* Search row */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b t-border">
                <Search className="w-4 h-4 shrink-0" style={{ color: 'var(--text-3)' }} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setFocused(0) }}
                  placeholder="Search commands..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--text)', caretColor: '#a855f7' }}
                />
                <kbd className="t-kbd text-[10px] px-1.5 py-0.5 rounded border">ESC</kbd>
              </div>

              <div className="max-h-72 overflow-y-auto py-2">
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group}>
                    <div className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-3)' }}>
                      {group}
                    </div>
                    {items.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd)
                      return (
                        <button
                          key={cmd.id}
                          onMouseEnter={() => setFocused(globalIdx)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors t-dropdown-item"
                          style={{ background: focused === globalIdx ? 'var(--hover-bg)' : undefined, color: focused === globalIdx ? 'var(--text)' : 'var(--text-2)' }}
                        >
                          <cmd.icon className="w-4 h-4 shrink-0" style={{ color: 'var(--text-3)' }} />
                          <span className="flex-1 text-left">{cmd.label}</span>
                          {cmd.shortcut && (
                            <span className="t-kbd text-[10px] px-1.5 py-0.5 rounded border">{cmd.shortcut}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--text-3)' }}>
                    No commands found.
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
