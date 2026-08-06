import React from 'react'

export interface ButtonProps {
  label?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  borderRadius?: number
  backgroundColor?: string
  textColor?: string
  disabled?: boolean
  onClick?: () => void
}

const sizeMap = {
  sm: { padding: '6px 14px', fontSize: '12px' },
  md: { padding: '10px 20px', fontSize: '14px' },
  lg: { padding: '14px 28px', fontSize: '16px' }
}

const variantMap = {
  primary: { background: '#2563EB', color: '#FFFFFF', border: 'none' },
  secondary: { background: '#6B7280', color: '#FFFFFF', border: 'none' },
  outline: { background: 'transparent', color: '#2563EB', border: '2px solid #2563EB' },
  ghost: { background: 'transparent', color: '#2563EB', border: 'none' }
}

export const Button = ({
  label = 'Button',
  variant = 'primary',
  size = 'md',
  borderRadius = 6,
  backgroundColor,
  textColor,
  disabled = false,
  onClick
}: ButtonProps) => {
  const v = variantMap[variant]
  const s = sizeMap[size]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: s.padding,
        fontSize: s.fontSize,
        background: backgroundColor ?? v.background,
        color: textColor ?? v.color,
        border: v.border,
        borderRadius: `${borderRadius}px`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: 500,
        lineHeight: 1,
        transition: 'opacity 0.15s ease',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none'
      }}
    >
      {label}
    </button>
  )
}
