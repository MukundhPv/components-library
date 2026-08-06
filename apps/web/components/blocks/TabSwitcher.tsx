'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, BarChart2, FileText, Settings } from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard, content: 'Dashboard overview with key metrics and activity feed.' },
  { id: 'analytics', label: 'Analytics', Icon: BarChart2, content: 'Detailed analytics, charts, and performance breakdowns.' },
  { id: 'reports', label: 'Reports', Icon: FileText, content: 'Generated reports and exportable data summaries.' },
  { id: 'settings', label: 'Settings', Icon: Settings, content: 'Configuration, preferences, and account settings.' },
]

export function SlidingTabs() {
  const [active, setActive] = useState(tabs[0].id)
  const [direction, setDirection] = useState(1)
  const activeIndex = tabs.findIndex((t) => t.id === active)
  const activeTab = tabs.find((t) => t.id === active)!

  const handleTab = (id: string) => {
    const newIdx = tabs.findIndex((t) => t.id === id)
    setDirection(newIdx > activeIndex ? 1 : -1)
    setActive(id)
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center p-1 rounded-xl border t-border mb-4" style={{ background: 'var(--bg-2)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            className="relative flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-lg transition-colors z-10"
            style={{ color: active === tab.id ? 'var(--text)' : 'var(--text-3)' }}
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-bg"
                className="absolute inset-0 rounded-lg t-toggle-pill border"
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              />
            )}
            <tab.Icon className="w-3.5 h-3.5 relative" />
            <span className="relative">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border t-border t-surface p-5 min-h-[80px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.p
            key={active}
            custom={direction}
            initial={{ x: direction * 16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction * -16, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            className="text-sm"
            style={{ color: 'var(--text-2)' }}
          >
            {activeTab.content}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function UnderlineTabs() {
  const [active, setActive] = useState(tabs[0].id)
  const [direction, setDirection] = useState(1)
  const activeIndex = tabs.findIndex((t) => t.id === active)
  const activeTab = tabs.find((t) => t.id === active)!

  const handleTab = (id: string) => {
    const newIdx = tabs.findIndex((t) => t.id === id)
    setDirection(newIdx > activeIndex ? 1 : -1)
    setActive(id)
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex border-b t-border mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTab(tab.id)}
            className="relative px-4 py-2.5 text-sm font-medium transition-colors"
            style={{ color: active === tab.id ? 'var(--text)' : 'var(--text-3)' }}
          >
            {tab.label}
            {active === tab.id && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-400 rounded-full"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="overflow-hidden min-h-[60px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-sm"
            style={{ color: 'var(--text-2)' }}
          >
            {activeTab.content}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
