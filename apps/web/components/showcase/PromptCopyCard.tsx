'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Sparkles } from 'lucide-react'
import { MicroInteraction } from '@/lib/registry'

interface PromptCopyCardProps {
  interaction: MicroInteraction
}

export function PromptCopyCard({ interaction }: PromptCopyCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(interaction.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Copilot Prompt</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
            bg-purple-500/10 text-purple-400 border border-purple-500/20
            hover:bg-purple-500/20 hover:border-purple-500/40"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Check className="w-3 h-3" /> Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3 h-3" /> Copy prompt
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <div className="p-4">
        <p className="text-xs leading-relaxed font-mono whitespace-pre-wrap" style={{ color: 'var(--text-muted)' }}>
          {interaction.prompt}
        </p>
      </div>
    </div>
  )
}
