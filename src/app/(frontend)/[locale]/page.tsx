import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderHero } from '@/components/heros/RenderHero'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'

export function generateStaticParams() {
  return [{ locale: 'hy' }, { locale: 'en' }, { locale: 'ru' }]
}

type Args = {
  params: Promise<{
    locale?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'hy' } = await paramsPromise

  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: 'home',
    locale,
  })

  if (!page) {
    return null
  }

  const { hero, layout } = page

  return (
    <BaseWrapper className={'w-full  m-auto'}>
      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
    </BaseWrapper>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'hy' } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'home',
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale = 'hy' }: { slug: string; locale?: string }) => {
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
})
