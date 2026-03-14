import React, { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { Col, Row } from 'antd'
import type { ContactLocation } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { getCachedGlobal } from '@/utilities/getGlobals'
import ContactForm from './ContactForm'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'

type Args = {
  params: Promise<{ locale?: string }>
}

export const dynamic = 'force-dynamic'

// ── Social platform SVG icons ────────────────────────────────────────────────
const SocialIcon = ({ platform }: { platform: string }) => {
  const cls = 'w-5 h-5'
  switch (platform) {
    case 'facebook':
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    case 'youtube':
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'telegram':
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg className={cls} fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.828 14.828a4 4 0 015.656 0l1 1a4 4 0 01-5.656 5.656l-1.1-1.1"
          />
        </svg>
      )
  }
}

export default async function ContactsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [locationsReq, page, tr, footerData] = await Promise.all([
    payload.find({
      collection: 'contactLocations',
      locale: locale as any,
      limit: 100,
      sort: 'order',
    }),
    queryPageBySlug({ slug: 'contacts', locale }),
    getSiteTranslations(locale),
    getCachedGlobal('footer', 1, locale)(),
  ])

  const t = {
    infoTitle: tr.contacts?.infoTitle ?? 'Get in Touch',
    desc:
      tr.contacts?.desc ??
      'Whether you have a question about our products, need expert agronomic advice, or want to explore partnership opportunities, our team is ready to answer all your questions.',
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
    sending: tr.contacts?.sending ?? 'Sending…',
    successMsg: tr.contacts?.successMsg ?? "Thank you! We'll be in touch soon.",
    errorMsg: tr.contacts?.errorMsg ?? 'Something went wrong. Please try again.',
    officesTitle: tr.contacts?.officesTitle ?? 'Our Offices',
    departmentsTitle: tr.contacts?.departmentsTitle ?? 'Department Contacts',
    viewOnMap: tr.contacts?.viewOnMap ?? 'View on Map',
    followUs: tr.contacts?.followUs ?? 'Follow Us',
    subjectOptions: tr.contacts?.subjectOptions ?? [],
  }

  const heroBlocks = (page?.layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')
  const offices = locationsReq.docs.filter(
    (l: ContactLocation) => l.type === 'office',
  ) as ContactLocation[]
  const departments = locationsReq.docs.filter(
    (l: ContactLocation) => l.type === 'department',
  ) as ContactLocation[]

  // Pull contact info + social from Footer global
  const footerContact = (footerData as any)?.contact
  const socialLinks: { platform: string; url: string }[] = (footerData as any)?.socialLinks ?? []

  return (
    <div className="w-full">
      <RenderBlocks blocks={heroBlocks} locale={locale} />

      <BaseWrapper className={'container m-auto'}>
        <Row align={'middle'}>
          <Col xs={24} md={12}>
            {/* ── Contact form ──────────────────────────────────────────────── */}
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-6 max-w-4xl">
                <ContactForm
                  labels={{
                    formTitle: t.formTitle,
                    firstName: t.firstName,
                    lastName: t.lastName,
                    email: t.email,
                    phone: t.phone,
                    company: t.company,
                    subject: t.subject,
                    message: t.message,
                    send: t.send,
                    sending: t.sending,
                    successMsg: t.successMsg,
                    errorMsg: t.errorMsg,
                    subjectOptions: t.subjectOptions,
                  }}
                />
              </div>
            </section>
          </Col>
          <Col xs={24} md={12}>
            <section className=" py-12">
              <div className="container mx-auto px-6 max-w-7xl">
                <Row gutter={[24, 24]}>
                  {/* Address */}
                  {footerContact?.address && (
                    <Col xs={24}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <svg
                            className="w-6 h-6 text-teal-950"
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
                        </div>
                        <div>
                          <p className=" text-xs font-semibold uppercase tracking-widest mb-1">
                            {tr.contacts?.addressTitle ?? 'Address'}
                          </p>
                          <p className=" font-medium leading-snug">{footerContact.address}</p>
                        </div>
                      </div>
                    </Col>
                  )}

                  {/* Phone + Email */}
                  {(footerContact?.phone || footerContact?.email) && (
                    <Col xs={24}>
                      <div className="space-y-4">
                        {footerContact?.phone && (
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <svg
                                className="w-6 h-6 text-teal-950"
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
                            </div>
                            <div>
                              <p className=" text-xs font-semibold uppercase tracking-widest mb-0.5">
                                {t.callUs}
                              </p>
                              <p className=" font-medium hover: transition">
                                {footerContact.phone}
                              </p>
                            </div>
                          </div>
                        )}
                        {footerContact?.email && (
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                              <svg
                                className="w-6 h-6 "
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
                            </div>
                            <div>
                              <p className=" text-xs font-semibold uppercase tracking-widest mb-0.5">
                                {t.emailUs}
                              </p>
                              <p className=" font-medium hover: transition">
                                {footerContact.email}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Col>
                  )}

                  {/* Social links */}
                  {socialLinks.length > 0 && (
                    <Col xs={24}>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                          <svg
                            className="w-6 h-6 "
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className=" text-xs font-semibold uppercase tracking-widest mb-3">
                            {t.followUs}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {socialLinks.map((s, i) => (
                              <a
                                key={i}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/10 hover:bg-white/25  rounded-lg flex items-center justify-center transition-colors"
                                aria-label={s.platform}
                              >
                                <SocialIcon platform={s.platform} />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </section>
          </Col>
        </Row>
      </BaseWrapper>
      {/* ── Offices ───────────────────────────────────────────────────── */}
      {offices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t.officesTitle}</h2>
            <LocationGrid locations={offices} viewOnMapLabel={t.viewOnMap} />
          </div>
        </section>
      )}

      {/* ── Departments ───────────────────────────────────────────────── */}
      {departments.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
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
    <Row gutter={[24, 24]}>
      {locations.map((location) => (
        <Col key={location.id} xs={24} sm={12} lg={8}>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center shrink-0">
                {location.type === 'office' ? (
                  <svg
                    className="w-5 h-5 text-teal-700"
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
                    className="w-5 h-5 text-teal-700"
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

            <div className="space-y-3 flex-1">
              {location.address && (
                <div className="flex items-start gap-3">
                  <svg
                    className="w-4 h-4 text-teal-500 shrink-0 mt-0.5"
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
                    className="w-4 h-4 text-teal-500 shrink-0 mt-0.5"
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
                        className="block text-gray-600 text-sm hover:text-teal-700 transition"
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
                    className="w-4 h-4 text-teal-500 shrink-0"
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
                    className="text-gray-600 text-sm hover:text-teal-700 transition"
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
                className="mt-5 flex items-center gap-2 text-teal-700 text-sm font-semibold hover:underline"
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
        </Col>
      ))}
    </Row>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  const title = locale === 'hy' ? 'Կապ' : locale === 'ru' ? 'Контакты' : 'Contact Us'
  return { title: `${title} | Agrotech`, description: 'Get in touch with Agrotech.' }
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
