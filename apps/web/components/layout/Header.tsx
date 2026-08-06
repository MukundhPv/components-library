'use client'

import Link from 'next/link'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { motion } from 'framer-motion'

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl h-14 flex items-center"
      style={{
        background: theme === 'dark' ? 'rgba(8,8,8,0.85)' : 'rgba(249,249,249,0.9)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center gap-4 px-4 w-56 border-r h-full shrink-0" style={{ borderColor: 'var(--border)' }}>
        <Link href="/" className="flex items-center group">
          <span className="font-semibold text-base tracking-tight" style={{ color: 'var(--text)' }}>
            Mukundh PV
          </span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-between px-6">
        <div className="flex items-center gap-1">
          <span className="text-xs px-2 py-0.5 rounded-full border font-mono" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-2)' }}>
            v0.1.0
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://mukundhpv.co.in"
            className="text-xs px-3.5 py-1.5 rounded-full border transition-all"
            style={{ color: 'var(--text-muted)', borderColor: 'var(--border-2)' }}
          >
            ← Portfolio
          </a>
          <a
            href="#"
            className="text-xs px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all"
          >
            Copy prompt
          </a>

          {/* Theme toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:bg-[var(--border)]"
            style={{ borderColor: 'var(--border-2)', color: 'var(--text-muted)' }}
            aria-label="Toggle theme"
          >
            <AnimatedThemeIcon theme={theme} />
          </motion.button>
        </div>
      </div>
    </header>
  )
}

function AnimatedThemeIcon({ theme }: { theme: 'dark' | 'light' }) {
  return (
    <motion.div
      key={theme}
      initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
      animate={{ rotate: 0, opacity: 1, scale: 1 }}
      exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
    </motion.div>
  )
}
