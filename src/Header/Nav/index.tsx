'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType; isMobile?: boolean }> = ({
  data,
  isMobile = false,
}) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || 'hy'

  console.log('navItems')
  console.log(navItems)
  return (
    <nav
      className={`flex ${isMobile ? 'flex-col gap-6 items-start w-full' : 'gap-3 items-center'}`}
    >
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="inline"
            locale={locale}
            className={`text-gray-900 font-medium ${isMobile ? 'text-lg w-full block border-b border-gray-100 pb-2' : 'hover:text-teal-950 transition-colors px-2 py-1'}`}
          />
        )
      })}
    </nav>
  )
}
