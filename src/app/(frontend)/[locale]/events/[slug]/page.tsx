import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'
import { notFound } from 'next/navigation'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { EventRegistrationForm } from '@/components/EventRegistrationForm'

type Args = {
  params: Promise<{
    slug: string
    locale?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
  })

  const locales = ['hy', 'en', 'ru']
  const params: { slug: string; locale: string }[] = []

  events.docs?.forEach((doc) => {
    locales.forEach((locale) => {
      params.push({ slug: doc.slug as string, locale })
    })
  })

  return params
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const event = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })

  return {
    title: event.docs[0]?.meta?.title || event.docs[0]?.title || 'Event',
    description: event.docs[0]?.meta?.description || event.docs[0]?.description,
  }
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug, locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const events = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const event = events.docs[0]

  if (!event) return notFound()

  return (
    <BaseWrapper className="w-full container m-auto pt-16 pb-24">
      <div className="max-w-4xl mx-auto">
        {/* EVENT HERO INFO */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground font-medium mb-8">
            <span className="bg-muted px-4 py-2 rounded-full">
              📅 {new Date(event.date as string).toLocaleDateString(locale)}
            </span>
            <span className="bg-muted px-4 py-2 rounded-full">
              📍 {event.location}
            </span>
            <span className="bg-muted px-4 py-2 rounded-full uppercase text-sm flex items-center">
              Status: {event.status}
            </span>
          </div>

          {event.image && (
            <div className="w-full aspect-video relative rounded-2xl overflow-hidden mb-12">
              <Media resource={event.image} fill imgClassName="object-cover" priority />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* EVENT CONTENT */}
          <div className="lg:col-span-2">
            <div className="prose dark:prose-invert max-w-none">
              <RichText data={event.content} enableGutter={false} />
            </div>
          </div>

          {/* REGISTRATION FORM SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EventRegistrationForm eventId={event.id} />
            </div>
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}
