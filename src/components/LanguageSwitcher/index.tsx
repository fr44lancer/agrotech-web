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

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  // Extract current locale from pathname
  const currentLocale = pathname?.split('/')[1] as Locale

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const newLocale = e.key as Locale

    if (!pathname) return

    const segments = pathname.split('/')
    segments[1] = newLocale

    const newPath = segments.join('/')

    router.push(newPath)
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
