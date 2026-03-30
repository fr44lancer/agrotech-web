import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RichText from '@/components/RichText'
import { EventRegistrationForm } from '@/components/EventRegistrationForm'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'

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
  const result = await payload.find({
    collection: 'events',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })
  const event = result.docs[0]
  if (!event) return { title: 'Event Not Found' }
  return generateMeta({ doc: event as any })
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug, locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [eventsReq, tr] = await Promise.all([
    payload.find({
      collection: 'events',
      draft,
      limit: 1,
      locale: locale as any,
      depth: 1,
      where: { slug: { equals: slug } },
    }),
    getSiteTranslations(locale),
  ])

  const event = eventsReq.docs[0]
  if (!event) return notFound()

  const isPast = new Date(event.date as string) < new Date()
  const dateStr = new Date(event.date as string).toLocaleDateString(
    locale === 'hy' ? 'hy-AM' : locale,
    { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  )
  const cats = ((event.categories ?? []) as any[]).filter(
    (c: any) => typeof c === 'object' && c?.title,
  )

  const t = {
    back: tr.events?.backToEvents ?? 'Back to Events',
    registerTitle: tr.events?.registerTitle ?? 'Register for this Event',
    registrationClosed: tr.events?.registrationClosed ?? 'Registration Closed',
    registrationClosedMsg:
      tr.events?.registrationClosedMsg ??
      'This event has already taken place. Registration is no longer available.',
    firstName: tr.events?.firstName ?? 'First Name',
    lastName: tr.events?.lastName ?? 'Last Name',
    emailLabel: tr.events?.emailLabel ?? 'Email Address',
    phoneLabel: tr.events?.phoneLabel ?? 'Phone Number',
    registerNow: tr.events?.registerNow ?? 'Register Now',
    registering: tr.events?.registering ?? 'Registering…',
    registerSuccess: tr.events?.registerSuccess ?? "You've been registered! We'll see you there.",
    registerError: tr.events?.registerError ?? 'Something went wrong. Please try again.',
  }

  const imageUrl = event.image && typeof event.image === 'object' ? (event.image as any).url : null

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero */}
      <div className="relative bg-teal-900 text-white overflow-hidden">
        {imageUrl && (
          <div className="absolute inset-0">
            <img
              src={imageUrl}
              alt={event.title as string}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-teal-900/70" />
          </div>
        )}
        {!imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-green-900 opacity-90" />
        )}

        <div className="relative container mx-auto px-6 max-w-6xl py-16 md:py-20">
          {/* Back link */}
          <Link
            href={`/${locale}/events`}
            className="inline-flex items-center gap-1.5 text-gray-200 hover:text-white text-sm font-medium mb-8 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.back}
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cats.map((c: any) => (
              <span
                key={c.id}
                className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm"
              >
                {c.title}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-3xl">
            {event.title as string}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-5 text-white text-sm">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {event.location as string}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Content */}
            <div className="lg:col-span-2">
              {event.description && (
                <p className="text-lg text-gray-500 mb-8 leading-relaxed border-l-4 border-teal-400 pl-5">
                  {event.description as string}
                </p>
              )}
              <div className="prose prose-teal max-w-none text-gray-700">
                <RichText data={event.content} enableGutter={false} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                <EventRegistrationForm
                  eventId={event.id}
                  isPast={isPast}
                  labels={{
                    title: t.registerTitle,
                    firstName: t.firstName,
                    lastName: t.lastName,
                    email: t.emailLabel,
                    phone: t.phoneLabel,
                    registerBtn: t.registerNow,
                    registering: t.registering,
                    success: t.registerSuccess,
                    error: t.registerError,
                    closedTitle: t.registrationClosed,
                    closedMsg: t.registrationClosedMsg,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
