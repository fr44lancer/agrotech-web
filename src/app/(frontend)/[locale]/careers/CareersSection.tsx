'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type Category = {
  id: string
  title: string
  slug?: string | null
}

type Career = {
  id: string
  title: string
  department?: string | null
  location?: string | null
  type?: string | null
  slug?: string | null
  categories?: (string | Category)[]
}

type Props = {
  careers: Career[]
  categories: Category[]
  locale: string
  t: {
    openPositions: string
    allCategories: string
    applyNow: string
    noPositions: string
  }
}

export default function CareersSection({ careers, categories, locale, t }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered =
    activeCategory === null
      ? careers
      : careers.filter(
          (c) =>
            Array.isArray(c.categories) &&
            c.categories.some((cat) => (typeof cat === 'object' ? cat.id : cat) === activeCategory),
        )

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.openPositions}</h2>

        {/* Category filter tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === null
                  ? 'bg-teal-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-400'
              }`}
            >
              {t.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-400'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-gray-500 py-8">{t.noPositions}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((career) => (
              <div
                key={career.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-1">{career.title}</h3>
                {career.department && (
                  <div className="text-teal-950 font-medium text-sm mb-4">{career.department}</div>
                )}
                <div className="space-y-2 mb-6 text-sm text-gray-500 flex-grow">
                  {career.location && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {career.location}
                    </div>
                  )}
                  {career.type && (
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {career.type}
                    </div>
                  )}
                </div>
                <Link
                  href={`/${locale}/careers/${career.slug}`}
                  className="mt-auto inline-block bg-teal-600 text-white text-center px-5 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition text-sm"
                >
                  {t.applyNow}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
