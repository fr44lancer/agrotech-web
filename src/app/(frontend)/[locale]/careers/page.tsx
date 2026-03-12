import React, { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { draftMode } from 'next/headers'
import CareersSection from './CareersSection'

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export const dynamic = 'force-dynamic'

const translations = {
  en: {
    openPositions: 'Open Positions',
    allCategories: 'All',
    applyNow: 'View Position',
    noPositions: 'No open positions right now.',
  },
  ru: {
    openPositions: 'Открытые вакансии',
    allCategories: 'Все',
    applyNow: 'Смотреть вакансию',
    noPositions: 'На данный момент нет открытых вакансий.',
  },
  hy: {
    openPositions: 'Բաց հաստիքներ',
    allCategories: 'Բոլորը',
    applyNow: 'Տեսնել հաստիք',
    noPositions: 'Այս պահին բաց հաստիքներ չկան:',
  },
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [careersReq, categoriesReq, page] = await Promise.all([
    payload.find({
      collection: 'careers',
      locale: locale as any,
      limit: 100,
      depth: 1,
    }),
    payload.find({
      collection: 'careerCategories',
      locale: locale as any,
      limit: 100,
      sort: 'title',
    }),
    queryPageBySlug({ slug: 'careers', locale }),
  ])

  const t = translations[locale as keyof typeof translations] ?? translations.hy
  const heroBlocks = (page?.layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')
  const whyWorkBlocks = (page?.layout ?? []).filter((b) => b.blockType === 'whyWorkBlock')

  return (
    <div className="w-full">
      <RenderBlocks blocks={heroBlocks} locale={locale} />
      <RenderBlocks blocks={whyWorkBlocks} locale={locale} />
      <CareersSection
        careers={careersReq.docs as any}
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
