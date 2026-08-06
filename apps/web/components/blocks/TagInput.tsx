'use client'

import React, { useState, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#0ea5e9']

export function TagInput() {
  const [tags, setTags] = useState<string[]>(['Design', 'React'])
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/,$/, '')
    if (!tag) return
    if (tags.includes(tag)) {
      setShake(true); setTimeout(() => setShake(false), 400)
      setValue(''); return
    }
    if (tags.length >= 10) return
    setTags((prev) => [...prev, tag]); setValue('')
  }

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag))

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(value) }
    if (e.key === 'Backspace' && !value && tags.length > 0) setTags((prev) => prev.slice(0, -1))
  }

  return (
    <motion.div
      animate={shake ? { x: [0, -5, 5, -3, 3, 0] } : { x: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => inputRef.current?.focus()}
      className="t-input t-border flex flex-wrap items-center gap-2 px-3 py-2.5 rounded-xl border min-h-[48px] w-72 cursor-text transition-colors"
      style={{} as React.CSSProperties}
    >
      <AnimatePresence>
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            layout
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${COLORS[i % COLORS.length]}18`,
              border: `1px solid ${COLORS[i % COLORS.length]}35`,
              color: COLORS[i % COLORS.length],
            }}
          >
            {tag}
            <button
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              className="transition-colors ml-0.5"
              style={{ color: COLORS[i % COLORS.length], opacity: 0.6 }}
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>

      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => addTag(value)}
        placeholder={tags.length === 0 ? 'Add tags...' : ''}
        className="bg-transparent text-sm outline-none min-w-[80px] flex-1"
        style={{ color: 'var(--text)' }}
      />
    </motion.div>
  )
}
