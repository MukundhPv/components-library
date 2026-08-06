import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: '#111111',
        'surface-2': '#1a1a1a',
        border: '#222222',
        'border-bright': '#333333',
        muted: '#666666',
        subtle: '#444444',
        accent: {
          DEFAULT: '#a855f7',
          dim: '#7c3aed',
          glow: 'rgba(168,85,247,0.15)',
        },
        indigo: {
          glow: 'rgba(99,102,241,0.15)',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-fade': 'gridFade 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gridFade: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, #333 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'dot-sm': '24px 24px',
        'dot-md': '32px 32px',
      },
      boxShadow: {
        'glow-purple': '0 0 40px rgba(168, 85, 247, 0.15)',
        'glow-purple-lg': '0 0 80px rgba(168, 85, 247, 0.2)',
        'glow-indigo': '0 0 40px rgba(99, 102, 241, 0.15)',
        'card': '0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.4)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}

export default config
