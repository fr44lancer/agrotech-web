'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface HeaderClientProps {
  data: Header
  locale?: string
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <BaseWrapper className={'container m-auto px-2 sm:px-6'}>
        <div className="flex items-center justify-between py-2">
          {/* Logo Section */}
          <Link href={`/${locale || ''}`} className="z-50 relative flex-shrink-0 ml-2 sm:ml-0">
            <Logo loading="eager" priority="high" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <HeaderNav data={data} />
            <div className="border-l border-gray-200 h-6 mx-2 hidden lg:block"></div>
            <LanguageSwitcher currentLocale={locale} minimal showFlag />
          </div>

          {/* Mobile: language switcher + hamburger */}
          <div className="md:hidden flex items-center gap-1 z-50">
            <LanguageSwitcher
              currentLocale={locale}
              minimal
              onAfterSelect={() => setIsMobileMenuOpen(false)}
            />
            <button
              className="relative p-2 text-gray-800 hover:text-teal-950 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between items-center overflow-hidden">
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-px' : ''}`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-current transform transition-all duration-300 origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-px' : ''}`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </BaseWrapper>

      {/* Mobile Animated Dropdown Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out border-t border-gray-100 overflow-hidden z-40 ${isMobileMenuOpen ? 'max-h-[calc(100vh-72px)] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="container mx-auto px-6 py-6">
          <HeaderNav data={data} isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>

      {/* Mobile Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full h-screen bg-black/50 z-30 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}
