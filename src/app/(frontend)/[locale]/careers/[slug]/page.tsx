import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import Link from 'next/link'
import ApplyForm from '../ApplyForm'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    locale?: string
    slug: string
  }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'careers',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })
  const career = result.docs[0]
  if (!career) return { title: 'Position Not Found' }
  return generateMeta({ doc: career as any })
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'hy', slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [careerReq, tr] = await Promise.all([
    payload.find({
      collection: 'careers',
      locale: locale as any,
      where: { slug: { equals: slug } },
      limit: 1,
    }),
    getSiteTranslations(locale),
  ])

  const career = careerReq.docs[0]
  const t = {
    back: tr.careers?.back ?? 'Back to Open Positions',
    applyTitle: tr.careers?.applyTitle ?? 'Apply for this Position',
  }
  const applyLabels = {
    name: tr.careers?.applyName ?? 'Full Name',
    email: tr.careers?.applyEmail ?? 'Email Address',
    phone: tr.careers?.applyPhone ?? 'Phone Number',
    message: tr.careers?.applyMessage ?? 'Cover Letter / Message',
    submit: tr.careers?.applySubmit ?? 'Submit Application',
    sending: tr.careers?.applySending ?? 'Sending…',
    success:
      tr.careers?.applySuccess ?? 'Your application has been submitted! We will be in touch.',
    error: tr.careers?.applyError ?? 'Something went wrong. Please try again.',
  }

  if (!career) return <div className="p-8 text-center text-gray-500">Not Found</div>

  return (
    <div className="w-full bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <Link
          href={`/${locale}/careers`}
          className="text-teal-950 hover:text-teal-800 font-semibold mb-8 inline-flex items-center gap-1"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Main content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{career.title}</h1>

            <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-gray-100">
              {career.department && (
                <span className="inline-flex items-center gap-1.5 bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
                  <svg
                    className="w-3.5 h-3.5"
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
                  {career.department}
                </span>
              )}
              {career.location && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  <svg
                    className="w-3.5 h-3.5"
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
                </span>
              )}
              {career.type && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                  <svg
                    className="w-3.5 h-3.5"
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
                </span>
              )}
            </div>

            <div className="prose prose-teal max-w-none text-gray-700">
              <RichText data={career.description} enableGutter={false} />
            </div>
          </div>

          {/* Apply form sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">{t.applyTitle}</h2>
              <ApplyForm careerId={career.id} locale={locale} labels={applyLabels} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
