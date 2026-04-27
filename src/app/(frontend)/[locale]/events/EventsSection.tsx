'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'
import { Select } from 'antd'
import EventCard from './EventCard'

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
        {showUpcoming && upcomingFiltered.length > 0 && (
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
                  <EventCard key={event.id} event={event} locale={locale} t={t} cardType="upcoming"/>
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
                <EventCard key={event.id} event={event} locale={locale} t={t} cardType="past"/>
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
