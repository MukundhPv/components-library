'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

type ToastVariant = 'success' | 'error' | 'warning' | 'info'

interface ToastItem { id: number; variant: ToastVariant; title: string; description?: string }

let toastId = 0

const variantConfig = {
  success: { icon: CheckCircle, color: '#10b981', border: 'rgba(16,185,129,0.25)' },
  error:   { icon: XCircle,    color: '#ef4444', border: 'rgba(239,68,68,0.25)' },
  warning: { icon: AlertTriangle, color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  info:    { icon: Info,       color: '#6366f1', border: 'rgba(99,102,241,0.25)' },
}

function ToastItem({ toast, onRemove }: { toast: ToastItem; onRemove: (id: number) => void }) {
  const { icon: Icon, color, border } = variantConfig[toast.variant]
  return (
    <motion.div
      layout
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="relative flex items-start gap-3 p-4 rounded-xl border w-72 overflow-hidden"
      style={{ background: 'var(--surface)', borderColor: border, boxShadow: 'var(--dropdown-shadow)' }}
    >
      <Icon className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{toast.title}</p>
        {toast.description && <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{toast.description}</p>}
      </div>
      <button onClick={() => onRemove(toast.id)} className="shrink-0 mt-0.5 transition-colors t-hover rounded" style={{ color: 'var(--text-3)' }}>
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: color, opacity: 0.3 }} />
    </motion.div>
  )
}

export function ToastDemo() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((variant: ToastVariant) => {
    const messages = {
      success: { title: 'Changes saved!', description: 'Your project has been updated.' },
      error:   { title: 'Something went wrong', description: 'Please try again later.' },
      warning: { title: 'Heads up', description: 'This action cannot be undone.' },
      info:    { title: 'New update available', description: 'Refresh to get the latest version.' },
    }
    const id = toastId++
    const toast = { id, variant, ...messages[variant] }
    setToasts((prev) => [...prev.slice(-4), toast])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])

  const remove = useCallback((id: number) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex flex-wrap gap-2 justify-center">
        {(['success', 'error', 'warning', 'info'] as ToastVariant[]).map((v) => (
          <button
            key={v}
            onClick={() => addToast(v)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all t-hover capitalize"
            style={{ borderColor: 'var(--border-2)', color: 'var(--text-2)', background: 'var(--bg-2)' }}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onRemove={remove} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
