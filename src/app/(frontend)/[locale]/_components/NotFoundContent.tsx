'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const t: Record<string, { title: string; subtitle: string; home: string; back: string }> = {
  en: {
    title: 'Page Not Found',
    subtitle: "Sorry, the page you're looking for doesn't exist or has been moved.",
    home: 'Go to Homepage',
    back: 'Go Back',
  },
  hy: {
    title: 'Էջը Չի Գտնվել',
    subtitle: 'Ներողություն, Ձեր փնտրած էջը գոյություն չունի կամ տեղափոխվել է։',
    home: 'Գլխավոր Էջ',
    back: 'Վերադառնալ',
  },
  ru: {
    title: 'Страница не найдена',
    subtitle: 'Извините, запрашиваемая страница не существует или была перемещена.',
    home: 'На главную',
    back: 'Назад',
  },
}

export default function NotFoundContent() {
  const pathname = usePathname() ?? ''
  const router = useRouter()
  const locale = (['hy', 'en', 'ru'].includes(pathname.split('/')[1])
    ? pathname.split('/')[1]
    : 'hy') as 'hy' | 'en' | 'ru'

  const tr = t[locale]

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-20 text-center bg-white">
      {/* Large 404 */}
      <div className="relative mb-6 select-none">
        <span
          className="text-[160px] sm:text-[220px] font-extrabold leading-none tracking-tighter"
          style={{
            background: 'linear-gradient(135deg, #0d9488 0%, #34d399 50%, #6ee7b7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </span>
        {/* Subtle decorative ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-teal-100 opacity-60" />
        </div>
      </div>

      {/* Text */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{tr.title}</h1>
      <p className="text-gray-500 max-w-md mb-10 leading-relaxed">{tr.subtitle}</p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-700 text-white font-medium hover:bg-teal-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {tr.home}
        </Link>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {tr.back}
        </button>
      </div>
    </div>
  )
}
