'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()
  const locale = pathname?.split('/')[1] || 'hy'

  console.log('navItems')
  console.log(navItems)
  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="inline" locale={locale} />
      })}
      <Link href={`/${locale}/search`}>
        <span className="sr-only">Search</span>
      </Link>
    </nav>
  )
}
