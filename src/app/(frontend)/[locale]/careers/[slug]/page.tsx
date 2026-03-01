import React from 'react'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RichText from '@/components/RichText'
import Link from 'next/link'

type Args = {
  params: Promise<{
    locale?: string
    slug: string
  }>
}

const translations = {
  en: { back: 'Back to Open Positions', apply: 'Apply Now' },
  ru: { back: 'Назад к открытым вакансиям', apply: 'Подать заявку' },
  hy: { back: 'Վերադառնալ բաց հաստիքներին', apply: 'Դիմել հիմա' },
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'hy', slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const careerReq = await payload.find({
    collection: 'careers',
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      }
    },
    limit: 1,
  })

  const career = careerReq.docs[0]
  const t = translations[locale as keyof typeof translations] || translations.hy

  if (!career) return <div className="p-8 text-center text-gray-500">Not Found</div>

  return (
    <div className="w-full bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-4xl bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <Link href={`/${locale}/careers`} className="text-teal-600 hover:text-teal-700 font-semibold mb-8 inline-block">
          &larr; {t.back}
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{career.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium mb-8 pb-8 border-b border-gray-100">
          <span className="text-teal-600">{career.department}</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {career.location}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            {career.type}
          </span>
        </div>
        
        <div className="prose prose-teal max-w-none text-gray-700 mb-12">
           <RichText data={career.description} enableGutter={false} />
        </div>

        <div className="border-t border-gray-100 pt-8 text-center sm:text-left">
           <a href="mailto:hr@agrotech.example.com" className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-teal-700 transition shadow hover:shadow-lg">
             {t.apply}
           </a>
        </div>
      </div>
    </div>
  )
}
