import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import EventsSection from './EventsSection'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Events & Conferences',
    description: 'Join us at upcoming agricultural events and exhibitions worldwide.',
  }
}

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export const dynamic = 'force-dynamic'

export default async function EventsPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [eventsReq, categoriesReq, page, tr] = await Promise.all([
    payload.find({
      collection: 'events',
      draft,
      limit: 200,
      locale: locale as any,
      depth: 1,
      sort: '-date',
    }),
    payload.find({
      collection: 'eventCategories',
      locale: locale as any,
      limit: 100,
      sort: 'title',
    }),
    queryPageBySlug({ slug: 'events', locale }),
    getSiteTranslations(locale),
  ])

  const heroBlocks = ((page?.layout ?? []) as any[]).filter((b) => b.blockType === 'pageHeroBlock')

  const t = {
    upcomingTitle: tr.events?.upcomingTitle ?? 'Upcoming Events',
    pastTitle: tr.events?.pastTitle ?? 'Past Events',
    noUpcoming: tr.events?.noUpcoming ?? 'No upcoming events are currently scheduled.',
    noPast: tr.events?.noPast ?? 'No past events found.',
    noResults: tr.events?.noResults ?? 'No events match the selected filters.',
    registerNow: tr.events?.registerNow ?? 'Register Now',
    viewHighlights: tr.events?.viewHighlights ?? 'View Highlights',
    eventLabel: tr.events?.eventLabel ?? 'Event',
    allEvents: tr.events?.allEvents ?? 'All Events',
    upcoming: tr.events?.upcoming ?? 'Upcoming',
    past: tr.events?.past ?? 'Past',
    allCategories: tr.events?.allCategories ?? 'All Categories',
  }

  return (
    <div className="w-full">
      <RenderBlocks blocks={heroBlocks} locale={locale} />
      <EventsSection
        events={eventsReq.docs as any}
        categories={categoriesReq.docs as any}
        locale={locale}
        t={t}
      />
    </div>
  )
}

const queryPageBySlug = cache(
  async ({ slug, locale = 'hy' }: { slug: string; locale?: string }) => {
    const { isEnabled: draft } = await draftMode()
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale: locale as any,
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  },
)
