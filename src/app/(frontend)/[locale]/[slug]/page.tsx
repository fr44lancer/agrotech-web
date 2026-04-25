import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderHero } from '@/components/heros/RenderHero'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const locales = ['hy', 'en', 'ru']
  const params: { slug: string; locale: string }[] = []

  // Exclude slugs that have dedicated page routes to prevent pre-rendered
  // static HTML from shadowing the dynamic route components in production.
  const dedicatedRoutes = ['about-us', 'careers', 'events', 'products', 'partners', 'contacts', 'blog']

  pages.docs?.forEach((doc) => {
    if (doc.slug !== 'home' && !dedicatedRoutes.includes(doc.slug as string)) {
      locales.forEach((locale) => {
        params.push({ slug: doc.slug as string, locale })
      })
    }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', locale = 'hy' } = await paramsPromise

  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  if (!page) return notFound()

  const { hero, layout } = page

  // Hoist leading pageHeroBlocks outside BaseWrapper so they render full-width
  const heroBlocks = (layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')
  const innerBlocks = (layout ?? []).filter((b) => b.blockType !== 'pageHeroBlock')

  return (
    <>
      <RenderBlocks blocks={heroBlocks} locale={locale} />
      <BaseWrapper className={'w-full  m-auto'}>
        <article className="pt-16 pb-24">
          <PageClient />

          {draft && <LivePreviewListener />}

          <RenderHero {...hero} locale={locale} />
          <RenderBlocks blocks={innerBlocks} locale={locale} />
        </article>
      </BaseWrapper>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home', locale = 'hy' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
  })

  return generateMeta({ doc: page })
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
