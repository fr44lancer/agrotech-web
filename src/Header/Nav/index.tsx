'use client'

import React, { useState } from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'

type NavItem = NonNullable<HeaderType['navItems']>[number]

// Mirrors CMSLink's href resolution so we can detect the active route
function resolveHref(link: NavItem['link'], locale: string): string | null {
  if (!link) return null
  const { type, reference, url } = link as any
  if (type === 'reference' && typeof reference?.value === 'object' && reference.value.slug) {
    const prefix = reference.relationTo !== 'pages' ? `/${reference.relationTo}` : ''
    return `/${locale}${prefix}/${reference.value.slug}`
  }
  if (url) {
    return url.startsWith('/') ? `/${locale}${url}` : url
  }
  return null
}

function isActivePath(href: string | null, pathname: string): boolean {
  if (!href) return false
  // strip trailing slash for comparison
  const h = href.replace(/\/$/, '')
  const p = pathname.replace(/\/$/, '')
  return p === h || p.startsWith(h + '/')
}

// ── Desktop dropdown item ────────────────────────────────────────────────────
const DesktopNavItem: React.FC<{ item: NavItem; locale: string; pathname: string }> = ({
  item,
  locale,
  pathname,
}) => {
  const [open, setOpen] = useState(false)
  const children = (item as any).children as NavItem[] | undefined
  const hasChildren = children && children.length > 0

  const href = resolveHref(item.link, locale)
  const childHrefs = hasChildren
    ? children!.map((c) => resolveHref((c as any).link, locale))
    : []
  const active =
    isActivePath(href, pathname) || childHrefs.some((h) => isActivePath(h, pathname))

  const linkClass = `font-medium transition-colors px-2 py-1 ${
    active ? 'text-teal-700' : 'text-gray-900 hover:text-teal-700'
  }`

  if (!hasChildren) {
    return (
      <CMSLink {...item.link} appearance="inline" locale={locale} className={linkClass} />
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-0.5">
        <CMSLink {...item.link} appearance="inline" locale={locale} className={linkClass} />
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${active ? 'text-teal-700' : 'text-gray-500'} ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 py-1.5 min-w-48 z-50">
          {children!.map((child, i) => {
            const childHref = resolveHref((child as any).link, locale)
            const childActive = isActivePath(childHref, pathname)
            return (
              <CMSLink
                key={i}
                {...(child as any).link}
                appearance="inline"
                locale={locale}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                  childActive
                    ? 'text-teal-700 bg-teal-50'
                    : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
                }`}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Mobile accordion item ────────────────────────────────────────────────────
const MobileNavItem: React.FC<{
  item: NavItem
  locale: string
  pathname: string
  onClose: () => void
}> = ({ item, locale, pathname, onClose }) => {
  const [expanded, setExpanded] = useState(false)
  const children = (item as any).children as NavItem[] | undefined
  const hasChildren = children && children.length > 0

  const href = resolveHref(item.link, locale)
  const active = isActivePath(href, pathname)

  const linkClass = `text-lg font-medium transition-colors ${
    active ? 'text-teal-700' : 'text-gray-900 hover:text-teal-700'
  }`

  if (!hasChildren) {
    return (
      <div onClick={onClose} className="border-b border-gray-100 pb-3 w-full">
        <CMSLink {...item.link} appearance="inline" locale={locale} className={linkClass} />
      </div>
    )
  }

  return (
    <div className="border-b border-gray-100 pb-1">
      <div className="flex items-center justify-between w-full pb-3 min-w-80">
        <div onClick={onClose}>
          <CMSLink {...item.link} appearance="inline" locale={locale} className={linkClass} />
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="p-1 text-gray-500 hover:text-teal-700 focus:outline-none shrink-0"
          aria-label="Toggle submenu"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {expanded && (
        <div className="pl-4 pb-2 space-y-2">
          {children!.map((child, i) => {
            const childHref = resolveHref((child as any).link, locale)
            const childActive = isActivePath(childHref, pathname)
            return (
              <div key={i} onClick={onClose}>
                <CMSLink
                  {...(child as any).link}
                  appearance="inline"
                  locale={locale}
                  className={`block text-base font-medium transition-colors py-1 ${
                    childActive ? 'text-teal-700' : 'text-gray-600 hover:text-teal-700'
                  }`}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Public exports ───────────────────────────────────────────────────────────
export const HeaderNav: React.FC<{
  data: HeaderType
  isMobile?: boolean
  onClose?: () => void
}> = ({ data, isMobile = false, onClose }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname() ?? ''
  const locale = pathname.split('/')[1] || 'hy'

  if (isMobile) {
    return (
      <nav className="flex flex-col gap-0 items-start w-full space-y-3">
        {navItems.map((item, i) => (
          <MobileNavItem
            key={i}
            item={item}
            locale={locale}
            pathname={pathname}
            onClose={onClose ?? (() => {})}
          />
        ))}
      </nav>
    )
  }

  return (
    <nav className="flex gap-1 items-center">
      {navItems.map((item, i) => (
        <DesktopNavItem key={i} item={item} locale={locale} pathname={pathname} />
      ))}
    </nav>
  )
}
