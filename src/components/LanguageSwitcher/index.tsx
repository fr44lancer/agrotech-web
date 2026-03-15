'use client'

import React from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { usePathname, useRouter } from 'next/navigation'

type Locale = 'en' | 'hy' | 'ru'

// ── SVG flags (inline, work on all platforms / servers) ──────────────────────

const FlagEN = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shrink-0">
    <rect width="20" height="14" fill="#012169" />
    {/* White saltire */}
    <line x1="0" y1="0" x2="20" y2="14" stroke="#fff" strokeWidth="3.2" />
    <line x1="20" y1="0" x2="0" y2="14" stroke="#fff" strokeWidth="3.2" />
    {/* Red saltire */}
    <line x1="0" y1="0" x2="20" y2="14" stroke="#C8102E" strokeWidth="1.8" />
    <line x1="20" y1="0" x2="0" y2="14" stroke="#C8102E" strokeWidth="1.8" />
    {/* White cross */}
    <rect x="8.5" y="0" width="3" height="14" fill="#fff" />
    <rect x="0" y="5.5" width="20" height="3" fill="#fff" />
    {/* Red cross */}
    <rect x="9" y="0" width="2" height="14" fill="#C8102E" />
    <rect x="0" y="6" width="20" height="2" fill="#C8102E" />
  </svg>
)

const FlagAM = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shrink-0">
    <rect width="20" height="4.67" y="0" fill="#D90012" />
    <rect width="20" height="4.67" y="4.67" fill="#0033A0" />
    <rect width="20" height="4.67" y="9.33" fill="#F2A800" />
  </svg>
)

const FlagRU = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg" className="rounded-sm shrink-0">
    <rect width="20" height="4.67" y="0" fill="#fff" />
    <rect width="20" height="4.67" y="4.67" fill="#1C3578" />
    <rect width="20" height="4.67" y="9.33" fill="#E4181C" />
    {/* thin border so white stripe is visible */}
    <rect width="20" height="14" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
  </svg>
)

const flags: Record<Locale, React.ReactNode> = {
  en: <FlagEN />,
  hy: <FlagAM />,
  ru: <FlagRU />,
}

// ─────────────────────────────────────────────────────────────────────────────

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'hy', label: 'AM' },
  { code: 'ru', label: 'RU' },
]

interface LanguageSwitcherProps {
  currentLocale?: string
  onAfterSelect?: () => void
  minimal?: boolean
  showFlag?: boolean
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale = 'hy',
  onAfterSelect,
  minimal = false,
  showFlag = false,
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const newLocale = e.key as Locale
    if (!pathname) return

    const segments = pathname.split('/')
    if (locales.some((l) => l.code === segments[1])) {
      segments[1] = newLocale
      router.push(segments.join('/'))
    } else {
      router.push(`/${newLocale}${pathname === '/' ? '' : pathname}`)
    }
    onAfterSelect?.()
  }

  const items: MenuProps['items'] = locales.map((locale) => ({
    key: locale.code,
    label: (
      <span className={`flex items-center gap-2 ${currentLocale === locale.code ? 'font-semibold text-teal-700' : ''}`}>
        {flags[locale.code]}
        {locale.label}
      </span>
    ),
  }))

  const current = locales.find((l) => l.code === currentLocale)
  const currentLabel = current?.label || 'Language'

  if (minimal) {
    return (
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
        <button className="flex items-center gap-1.5 text-gray-700 hover:text-teal-700 transition-colors focus:outline-none px-1 py-1">
          {showFlag && (
            <span className="leading-none">{flags[(currentLocale as Locale) ?? 'hy']}</span>
          )}
          <span className="text-sm font-medium">{currentLabel}</span>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </Dropdown>
    )
  }

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <Button
        type="text"
        icon={<GlobalOutlined />}
        className="flex items-center gap-2 bg-green-800 ml-4 text-white border-none"
      >
        {currentLabel}
      </Button>
    </Dropdown>
  )
}
