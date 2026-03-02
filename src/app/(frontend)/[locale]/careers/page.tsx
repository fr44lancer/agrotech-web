import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export const dynamic = 'force-dynamic'

const translations = {
  en: {
    heroTitle: 'Join Our Team',
    heroSub: 'Build your career in sustainable agriculture and innovation',
    openPositions: 'Open Positions',
    applyNow: 'Apply Now',
    noPositions: 'No open positions right now.',
    whyWork: 'Why Work at AGROTECH?',
    whySub:
      'Join a team of passionate professionals dedicated to transforming agriculture through innovation and sustainability.',
  },
  ru: {
    heroTitle: 'Присоединяйтесь к нашей команде',
    heroSub: 'Постройте свою карьеру в области устойчивого сельского хозяйства и инноваций',
    openPositions: 'Открытые вакансии',
    applyNow: 'Подать заявку',
    noPositions: 'На данный момент нет открытых вакансий.',
    whyWork: 'Почему стоит работать в AGROTECH?',
    whySub:
      'Присоединяйтесь к команде увлеченных профессионалов, стремящихся преобразовать сельское хозяйство с помощью инноваций.',
  },
  hy: {
    heroTitle: 'Միացեք Մեր Թիմին',
    heroSub: 'Կառուցեք ձեր կարիերան կայուն գյուղատնտեսության և նորարարության ոլորտում',
    openPositions: 'Բաց հաստիքներ',
    applyNow: 'Դիմել հիմա',
    noPositions: 'Այս պահին բաց հաստիքներ չկան:',
    whyWork: 'Ինչու՞ աշխատել AGROTECH-ում:',
    whySub:
      'Միացեք նվիրված մասնագետների թիմին, որը նպատակ ունի վերափոխել գյուղատնտեսությունը նորարարության միջոցով:',
  },
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const careersReq = await payload.find({
    collection: 'careers',
    locale: locale as any,
    limit: 100,
  })

  // We fetch categories globally just in case they're needed to display chips/filters,
  // but to keep server component simple, we'll list them all for now or build client-side filtering later.
  const careers = careersReq.docs
  const t = translations[locale as keyof typeof translations] || translations.hy

  return (
    <div className="w-full">
      <section className="bg-gradient-to-r from-teal-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-green-50">{t.heroSub}</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.whyWork}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t.whySub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Innovation Focus</h3>
              <p className="text-gray-600">Work with the latest agricultural technologies.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Global Impact</h3>
              <p className="text-gray-600">Contribute to sustainable food security worldwide.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Great Team</h3>
              <p className="text-gray-600">Collaborate with experts in agronomy and tech.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.openPositions}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.length === 0 ? (
              <p className="text-gray-600 col-span-3">{t.noPositions}</p>
            ) : (
              careers.map((career) => {
                return (
                  <div
                    key={career.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{career.title}</h3>
                    <div className="text-teal-600 font-medium mb-4">{career.department}</div>

                    <div className="space-y-2 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
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
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
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
                    </div>

                    <Link
                      href={`/${locale}/careers/${career.slug}`}
                      className="inline-block bg-teal-600 text-white px-6 py-2 rounded font-semibold hover:bg-teal-700 transition"
                    >
                      {t.applyNow}
                    </Link>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
