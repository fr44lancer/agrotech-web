'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Select } from 'antd'

type EventDoc = {
  id: string
  title: string
  slug: string
  date: string
  location: string
  description?: string
  image?: any
  categories?: any[]
}

type Category = { id: string; title: string }

type T = {
  upcomingTitle: string
  pastTitle: string
  noUpcoming: string
  noPast: string
  noResults: string
  registerNow: string
  viewHighlights: string
  eventLabel: string
  allEvents: string
  upcoming: string
  past: string
  allCategories: string
}

type Props = {
  events: EventDoc[]
  categories: Category[]
  locale: string
  t: T
}

type Tab = 'all' | 'upcoming' | 'past'

export default function EventsSection({ events, categories, locale, t }: Props) {
  const now = new Date()
  const [tab, setTab] = useState<Tab>('all')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const isPast = new Date(e.date) < now
      if (tab === 'upcoming' && isPast) return false
      if (tab === 'past' && !isPast) return false
      if (categoryId) {
        const cats = e.categories ?? []
        const hasCategory = cats.some((c: any) => (typeof c === 'object' ? c.id : c) === categoryId)
        if (!hasCategory) return false
      }
      return true
    })
  }, [events, tab, categoryId])

  const upcomingFiltered = filtered.filter((e) => new Date(e.date) >= now)
  const pastFiltered = filtered.filter((e) => new Date(e.date) < now)

  const showUpcoming = tab === 'all' || tab === 'upcoming'
  const showPast = tab === 'all' || tab === 'past'

  const tabBtns: { key: Tab; label: string }[] = [
    { key: 'all', label: t.allEvents },
    { key: 'upcoming', label: t.upcoming },
    { key: 'past', label: t.past },
  ]

  return (
    <div className="bg-gray-50">
      {/* Filter bar */}
      <div className="bg-gray-100 border border-gray-100 shadow-sm p-5 mb-10">
        {/* Tab row */}
        <div className="container mx-auto flex flex-wrap gap-2 mb-4">
          {tabBtns.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                tab === key
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <div className="container mx-auto pt-3 border-t border-gray-100">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                value={categoryId ?? ''}
                onChange={(val) => setCategoryId(val || null)}
                options={[
                  { value: '', label: t.allCategories },
                  ...categories.map((c) => ({ value: c.id, label: c.title })),
                ]}
                className="w-full"
                size="middle"
              />
            </div>
          </div>
        )}
      </div>
      <div className="container mx-auto px-6 ">
        {/* No results */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20 text-lg">{t.noResults}</p>
        )}

        {/* Upcoming events */}
        {showUpcoming && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
              <span className="w-1 h-7 bg-teal-600 rounded-full inline-block" />
              {t.upcomingTitle}
            </h2>
            {upcomingFiltered.length === 0 && tab !== 'all' ? (
              <p className="text-gray-400 py-10 text-center">{t.noUpcoming}</p>
            ) : upcomingFiltered.length > 0 ? (
              <div className="flex flex-col gap-6">
                {upcomingFiltered.map((event) => (
                  <UpcomingCard key={event.id} event={event} locale={locale} t={t} />
                ))}
              </div>
            ) : null}
          </div>
        )}

        {/* Past events */}
        {showPast && pastFiltered.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-teal-800 mb-6 flex items-center gap-3">
              <span className="w-1 h-7 bg-teal-600 rounded-full inline-block" />
              {t.pastTitle}
            </h2>
            <div className="flex flex-col gap-6">
              {pastFiltered.map((event) => (
                <UpcomingCard key={event.id} event={event} locale={locale} t={t} />
              ))}
            </div>
          </div>
        )}

        {showPast && pastFiltered.length === 0 && tab === 'past' && (
          <p className="text-gray-400 py-10 text-center">{t.noPast}</p>
        )}
      </div>
    </div>
  )
}

function UpcomingCard({ event, locale, t }: { event: EventDoc; locale: string; t: T }) {
  const imageUrl = typeof event.image === 'object' && event.image ? event.image.url : null
  const dateStr = new Date(event.date).toLocaleDateString(locale === 'hy' ? 'hy-AM' : locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const cats = (event.categories ?? []).filter((c: any) => typeof c === 'object' && c?.title)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-72 lg:w-80 shrink-0 h-52 md:h-auto bg-gradient-to-br from-teal-700 to-green-200 overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
          {/* Date badge overlay */}
          <div className="absolute top-4 left-4 bg-teal-700 text-white rounded-lg px-3 py-2 text-center shadow-lg">
            <div className="text-xl font-bold leading-none">{new Date(event.date).getDate()}</div>
            <div className="text-xs uppercase tracking-wide mt-0.5 opacity-90">
              {new Date(event.date).toLocaleDateString(locale === 'hy' ? 'hy-AM' : locale, {
                month: 'short',
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {cats.map((c: any) => (
              <span
                key={c.id}
                className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full"
              >
                {c.title}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{event.title}</h3>

          {event.description && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{event.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
            <span className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {dateStr}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <svg
                  className="w-4 h-4 text-teal-800"
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
                {event.location}
              </span>
            )}
          </div>

          <Link
            href={`/${locale}/events/${event.slug}`}
            className="inline-flex items-center gap-2 bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-teal-800 transition self-start"
          >
            {t.registerNow}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

function PastCard({ event, locale, t }: { event: EventDoc; locale: string; t: T }) {
  const imageUrl = typeof event.image === 'object' && event.image ? event.image.url : null

  return (
    <Link
      href={`/${locale}/events/${event.slug}`}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col group"
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-200 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <span className="absolute top-3 left-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {new Date(event.date).toLocaleDateString(locale === 'hy' ? 'hy-AM' : locale, {
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-800 mb-2 leading-snug group-hover:text-teal-800 transition-colors line-clamp-2">
          {event.title}
        </h3>
        {event.description && (
          <p className="text-sm text-gray-500 line-clamp-2 flex-1">{event.description}</p>
        )}
        <div className="flex items-center gap-1 text-teal-950 text-sm font-semibold mt-4">
          {t.viewHighlights}
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}
