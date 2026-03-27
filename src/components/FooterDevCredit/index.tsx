'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFabcdef0123456789@#$%!?/\\|<>~=+'
const TARGET = 'elvs.dev'
const INTERVAL_MS = 45 // ms per scramble frame
const FRAMES_PER_LOCK = 6 // scramble frames before each char locks in

export function FooterDevCredit() {
  const [display, setDisplay] = useState(() =>
    TARGET.split('')
      .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
      .join(''),
  )
  const [locked, setLocked] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const scramble = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    let revealed = 0
    let frame = 0
    setLocked(0)

    timerRef.current = setInterval(() => {
      frame++

      if (frame % FRAMES_PER_LOCK === 0 && revealed < TARGET.length) {
        revealed++
        setLocked(revealed)
      }

      const next = TARGET.split('')
        .map((ch, i) => (i < revealed ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join('')

      setDisplay(next)

      if (revealed >= TARGET.length) {
        clearInterval(timerRef.current!)
        setDisplay(TARGET)
      }
    }, INTERVAL_MS)
  }, [])

  useEffect(() => {
    const t = setTimeout(scramble, 600)
    return () => {
      clearTimeout(t)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [scramble])

  return (
    <a
      href="https://elvs.dev"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={scramble}
      className="inline-flex items-center gap-1.5 group text-sm select-none"
    >
      <span className="text-gray-600 group-hover:text-teal-800 transition-colors duration-200 font-mono text-xs">
        Made by
      </span>
      <span className="font-mono tracking-tight text-xs">
        {display.split('').map((ch, i) => (
          <span
            key={i}
            className={i < locked ? 'text-teal-800' : 'text-gray-600 group-hover:text-gray-400'}
          >
            {ch}
          </span>
        ))}
      </span>
    </a>
  )
}
