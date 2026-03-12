import type { Metadata } from 'next'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { Media } from '@/components/Media'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Events & Conferences',
    description: 'Join us at upcoming agricultural events and exhibitions worldwide.',
  }
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: string
  }>
}

export default async function EventsPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'events', locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [eventsReq] = await Promise.all([
    payload.find({
      collection: 'events',
      draft,
      limit: 100,
      locale: locale as any,
      sort: '-date',
    }),
  ])
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })
  const { layout } = page
  const events = eventsReq
  const upcomingEvents = events.docs.filter((event) => event.status === 'upcoming')
  const pastEvents = events.docs.filter((event) => event.status === 'past')
  const heroBlocks = (layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')
  return (
    <div className="w-full">
      <RenderBlocks blocks={heroBlocks} locale={locale} />
      <div className="container mx-auto">
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 gap-8">
                {upcomingEvents.map((event: any) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-200"
                  >
                    <div className="md:flex">
                      {event.image && (
                        <div className="w-full aspect-video relative  overflow-hidden  max-w-80">
                          <Media resource={event.image} fill imgClassName="object-cover" priority />
                        </div>
                      )}
                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Event
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(event.date as string).toLocaleDateString(locale, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                        <div className="flex items-center text-gray-600 mb-4">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                          {event.location}
                        </div>
                        <Link
                          href={`/${locale}/events/${event.slug}`}
                          className="inline-block bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition font-semibold"
                        >
                          Register Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming events are currently scheduled.</p>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Past Events</h2>
            {pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pastEvents.map((event: any) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600"></div>
                    <div className="p-6">
                      <span className="text-gray-500 text-sm">
                        {new Date(event.date as string).toLocaleDateString(locale, {
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-1">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      <Link
                        href={`/${locale}/events/${event.slug}`}
                        className="text-teal-600 font-semibold hover:underline"
                      >
                        View Highlights →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No past events found.</p>
            )}
          </div>
        </section>
      </div>
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
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  },
)
