'use client'

import React from 'react'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'
import { usePathname, useRouter } from 'next/navigation'

type Locale = 'en' | 'hy' | 'ru'

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'hy', label: 'Հայերեն' },
  { code: 'ru', label: 'Русский' },
]

interface LanguageSwitcherProps {
  currentLocale?: string
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale = 'hy' }) => {
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
  }

  const items: MenuProps['items'] = locales.map((locale) => ({
    key: locale.code,
    label: (
      <span className={`${currentLocale === locale.code ? 'font-semibold text-blue-600' : ''}`}>
        {locale.label}
      </span>
    ),
  }))

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={['click']}>
      <Button type="text" icon={<GlobalOutlined />} className="flex items-center gap-2">
        {locales.find((l) => l.code === currentLocale)?.label || 'Language'}
      </Button>
    </Dropdown>
  )
}
