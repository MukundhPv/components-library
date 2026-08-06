'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free', monthly: 0, annual: 0,
    description: 'For personal projects', color: '#64748b',
    features: ['5 projects', '1 GB storage', 'Basic analytics', 'Community support'],
    cta: 'Get started', popular: false,
  },
  {
    name: 'Pro', monthly: 29, annual: 19,
    description: 'For growing teams', color: '#a855f7',
    features: ['Unlimited projects', '100 GB storage', 'Advanced analytics', 'Priority support', 'Custom domains'],
    cta: 'Start free trial', popular: true,
  },
  {
    name: 'Enterprise', monthly: 99, annual: 79,
    description: 'For large organizations', color: '#6366f1',
    features: ['Everything in Pro', 'Unlimited storage', 'SSO / SAML', 'Dedicated support', 'SLA guarantee'],
    cta: 'Contact sales', popular: false,
  },
]

export function PricingToggle() {
  const [annual, setAnnual] = useState(false)

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm transition-colors" style={{ color: !annual ? 'var(--text)' : 'var(--text-3)' }}>Monthly</span>
        <button
          onClick={() => setAnnual((a) => !a)}
          className="relative w-11 h-6 rounded-full border transition-colors"
          style={{
            background: annual ? 'rgba(168,85,247,0.2)' : 'var(--bg-2)',
            borderColor: annual ? 'rgba(168,85,247,0.4)' : 'var(--border)',
          }}
        >
          <motion.div
            animate={{ x: annual ? 22 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="absolute top-1 w-4 h-4 rounded-full shadow"
            style={{ background: annual ? '#a855f7' : 'var(--text)' }}
          />
        </button>
        <span className="text-sm transition-colors" style={{ color: annual ? 'var(--text)' : 'var(--text-3)' }}>Annual</span>
        <AnimatePresence>
          {annual && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.15, 1], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-[10px] font-semibold text-emerald-500 px-2 py-0.5 rounded-full border"
              style={{ background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.2)' }}
            >
              Save 35%
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-3 w-full">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative rounded-2xl border p-5 flex flex-col transition-all"
            style={{
              background: plan.popular ? `${plan.color}08` : 'var(--surface)',
              borderColor: plan.popular ? `${plan.color}35` : 'var(--border)',
              boxShadow: plan.popular ? `0 0 30px ${plan.color}10` : undefined,
            }}
          >
            {plan.popular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-3 py-1 rounded-full border"
                style={{ color: plan.color, borderColor: `${plan.color}40`, background: 'var(--surface)' }}
              >
                Most Popular
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{plan.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-2)' }}>{plan.description}</p>
            </div>

            <div className="mb-5 overflow-hidden" style={{ height: 52 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? 'annual' : 'monthly'}
                  initial={{ y: annual ? 12 : -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: annual ? -12 : 12, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                    {plan.monthly === 0 ? 'Free' : `$${annual ? plan.annual : plan.monthly}`}
                    {plan.monthly !== 0 && <span className="text-sm font-normal" style={{ color: 'var(--text-2)' }}>/mo</span>}
                  </div>
                  {plan.monthly !== 0 && (
                    <p className="text-[10px]" style={{ color: 'var(--text-3)' }}>
                      {annual ? `$${plan.annual * 12}/yr billed annually` : 'Billed monthly'}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="space-y-2 mb-5 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-2)' }}>
                  <Check className="w-3 h-3 shrink-0" style={{ color: plan.color }} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className="w-full py-2 rounded-xl text-xs font-semibold border transition-all"
              style={
                plan.popular
                  ? { background: plan.color, color: '#fff', border: 'none' }
                  : { background: 'transparent', color: 'var(--text-2)', borderColor: 'var(--border-2)' }
              }
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
