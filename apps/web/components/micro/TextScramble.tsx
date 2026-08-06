'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

interface TextScrambleProps {
  text: string
  trigger?: boolean
  className?: string
  speed?: number
}

export function TextScramble({ text, trigger = true, className = '', speed = 80 }: TextScrambleProps) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const iterationRef = useRef(0)

  useEffect(() => {
    if (!trigger) return
    iterationRef.current = 0
    if (frameRef.current) clearInterval(frameRef.current)

    frameRef.current = setInterval(() => {
      const iteration = iterationRef.current
      setDisplay(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < Math.floor(iteration)) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      iterationRef.current += 0.5
      if (iterationRef.current >= text.length) {
        if (frameRef.current) clearInterval(frameRef.current)
        setDisplay(text)
      }
    }, speed / text.length)

    return () => { if (frameRef.current) clearInterval(frameRef.current) }
  }, [text, trigger, speed])

  return (
    <span className={`font-mono ${className}`}>{display}</span>
  )
}

interface ScrambleHeadingProps {
  text: string
  className?: string
}

export function ScrambleHeading({ text, className = '' }: ScrambleHeadingProps) {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setTriggered(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <TextScramble
      text={text}
      trigger={triggered}
      className={className}
      speed={1200}
    />
  )
}

export function ScrambleOnHover({ text, className = '' }: ScrambleHeadingProps) {
  const [key, setKey] = useState(0)
  const [active, setActive] = useState(false)

  const handleEnter = () => {
    setKey((k) => k + 1)
    setActive(true)
    setTimeout(() => setActive(false), 800)
  }

  return (
    <span
      onMouseEnter={handleEnter}
      className={`cursor-default inline-block ${className}`}
    >
      <TextScramble key={key} text={text} trigger={active || key === 0} speed={800} />
    </span>
  )
}
