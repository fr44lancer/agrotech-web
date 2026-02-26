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
  // const pathname = usePathname() // not used for locale logic anymore

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const newLocale = e.key as Locale

    // Set a cookie so the server knows the user's preferred language
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`

    // Refresh the router to trigger server components to re-render with the new locale
    router.refresh()
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
