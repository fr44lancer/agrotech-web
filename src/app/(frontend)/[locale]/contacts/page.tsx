import React, { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import type { ContactLocation } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'

type Args = {
  params: Promise<{ locale?: string }>
}

export const dynamic = 'force-dynamic'

export default async function ContactsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise

  const payload = await getPayload({ config: configPromise })

  const [locationsReq, page, tr] = await Promise.all([
    payload.find({
      collection: 'contactLocations',
      locale: locale as any,
      limit: 100,
      sort: 'order',
    }),
    queryPageBySlug({ slug: 'contacts', locale }),
    getSiteTranslations(locale),
  ])

  const t = {
    infoTitle: tr.contacts?.infoTitle ?? 'Get in Touch',
    desc:
      tr.contacts?.desc ??
      'Whether you have a question about our products, need expert agronomic advice, or want to explore partnership opportunities, our team is ready to answer all your questions.',
    addressTitle: tr.contacts?.addressTitle ?? 'Visit Our Office',
    callUs: tr.contacts?.callUs ?? 'Call Us',
    emailUs: tr.contacts?.emailUs ?? 'Email Us',
    viewMap: tr.contacts?.viewMap ?? 'View on Google Maps',
    formTitle: tr.contacts?.formTitle ?? 'Send Us a Message',
    firstName: tr.contacts?.firstName ?? 'First Name',
    lastName: tr.contacts?.lastName ?? 'Last Name',
    email: tr.contacts?.emailLabel ?? 'Email Address',
    phone: tr.contacts?.phoneLabel ?? 'Phone Number',
    company: tr.contacts?.company ?? 'Company',
    subject: tr.contacts?.subject ?? 'Subject',
    message: tr.contacts?.message ?? 'Message',
    send: tr.contacts?.send ?? 'Send Message',
    officesTitle: tr.contacts?.officesTitle ?? 'Our Offices',
    departmentsTitle: tr.contacts?.departmentsTitle ?? 'Department Contacts',
    viewOnMap: tr.contacts?.viewOnMap ?? 'View on Map',
    subjectOptions: tr.contacts?.subjectOptions ?? [],
  }

  const heroBlocks = (page?.layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')

  const offices = locationsReq.docs.filter(
    (l: ContactLocation) => l.type === 'office',
  ) as ContactLocation[]

  const departments = locationsReq.docs.filter(
    (l: ContactLocation) => l.type === 'department',
  ) as ContactLocation[]

  return (
    <div className="w-full">
      {/* Hero */}
      <RenderBlocks blocks={heroBlocks} locale={locale} />

      {/* Contact Info + Form */}
      <section className="container mx-auto px-6 max-w-7xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — General contact info + map */}
          <div className="space-y-8 flex flex-col h-full">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t.infoTitle}</h2>
              <p className="text-gray-600 mb-8">{t.desc}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-950 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{t.addressTitle}</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-950 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{t.callUs}</h3>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-teal-50 w-12 h-12 rounded-full flex items-center justify-center text-teal-950 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">{t.emailUs}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative flex items-center justify-center group border border-gray-100">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{
                  backgroundImage:
                    "url('https://maps.googleapis.com/maps/api/staticmap?center=Yerevan,Armenia&zoom=12&size=600x300&maptype=roadmap')",
                }}
              />
              <div className="relative z-10 bg-white/90 px-6 py-3 rounded shadow-md text-sm font-semibold text-teal-700 backdrop-blur-sm group-hover:scale-105 transition-transform duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {t.viewMap}
              </div>
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.formTitle}</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.firstName}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.lastName}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.email}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.phone}</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="+374 __ ___ ___"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.company}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t.subject}</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all">
                    {t.subjectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.message}</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <button
                type="button"
                className="w-full bg-teal-600 text-white font-semibold flex items-center justify-center py-4 rounded-lg hover:bg-teal-700 transition shadow-md hover:shadow-lg gap-2 mt-4 group"
              >
                {t.send}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Our Offices */}
      {offices.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              {t.officesTitle}
            </h2>
            <LocationGrid locations={offices} viewOnMapLabel={t.viewOnMap} />
          </div>
        </section>
      )}

      {/* Department Contacts — identical card design */}
      {departments.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
              {t.departmentsTitle}
            </h2>
            <LocationGrid locations={departments} viewOnMapLabel={t.viewOnMap} />
          </div>
        </section>
      )}
    </div>
  )
}

function LocationGrid({
  locations,
  viewOnMapLabel,
}: {
  locations: ContactLocation[]
  viewOnMapLabel: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {locations.map((location) => (
        <div
          key={location.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          {/* Icon + name */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
              {location.type === 'office' ? (
                <svg
                  className="w-5 h-5 text-teal-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-teal-950"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight">{location.name}</h3>
          </div>

          <div className="space-y-3">
            {location.address && (
              <div className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5"
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
                <span className="text-gray-600 text-sm">{location.address}</span>
              </div>
            )}

            {location.phones && location.phones.length > 0 && (
              <div className="flex items-start gap-3">
                <svg
                  className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="space-y-0.5">
                  {location.phones.map((p, i) => (
                    <a
                      key={i}
                      href={`tel:${p.number}`}
                      className="block text-gray-600 text-sm hover:text-teal-950 transition-colors"
                    >
                      {p.number}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {location.email && (
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-teal-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${location.email}`}
                  className="text-gray-600 text-sm hover:text-teal-950 transition-colors"
                >
                  {location.email}
                </a>
              </div>
            )}
          </div>

          {location.mapUrl && (
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 text-teal-950 text-sm font-semibold hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              {viewOnMapLabel}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const title = locale === 'hy' ? 'Կապ' : locale === 'ru' ? 'Контакты' : 'Contact Us'
  return {
    title: `${title} | Agrotech`,
    description: 'Get in touch with Agrotech for agricultural solutions and partnerships.',
  }
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
