'use client'

import React from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { usePathname, useRouter } from 'next/navigation'

type Locale = 'en' | 'hy' | 'ru'

const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'hy', label: 'AM', flag: '🇦🇲' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
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
      <span className={`${currentLocale === locale.code ? 'font-semibold text-teal-700' : ''}`}>
        {locale.label}
      </span>
    ),
  }))

  const current = locales.find((l) => l.code === currentLocale)
  const currentLabel = current?.label || 'Language'
  const currentFlag = current?.flag

  if (minimal) {
    return (
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
        <button className="flex items-center gap-1.5 text-gray-700 hover:text-teal-700 transition-colors focus:outline-none px-1 py-1">
          {showFlag && currentFlag && (
            <span className="text-base leading-none">{currentFlag}</span>
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
