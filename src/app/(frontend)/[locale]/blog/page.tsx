import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'
import BlogSection from './BlogSection'

type Args = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'hy' } = await paramsPromise
  const page = await queryPageBySlug({ slug: 'blog', locale })
  return generateMeta({ doc: page })
}

export const dynamic = 'force-dynamic'

export default async function BlogPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [postsReq, categoriesReq, tagsReq, page, tr] = await Promise.all([
    payload.find({
      collection: 'posts',
      draft,
      limit: 200,
      locale: locale as any,
      depth: 1,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
    }),
    payload.find({
      collection: 'categories',
      locale: locale as any,
      limit: 100,
      sort: 'title',
    }),
    payload.find({
      collection: 'tags',
      locale: locale as any,
      limit: 200,
      sort: 'title',
    }),
    queryPageBySlug({ slug: 'blog', locale }),
    getSiteTranslations(locale),
  ])

  const heroBlocks = ((page?.layout ?? []) as any[]).filter((b) => b.blockType === 'pageHeroBlock')

  const t = {
    allCategories: tr.blog?.allCategories ?? 'All Categories',
    allTags: tr.blog?.allTags ?? 'All Tags',
    readMore: tr.blog?.readMore ?? 'Read More',
    noPosts: tr.blog?.noPosts ?? 'No articles found.',
    searchPlaceholder: tr.blog?.searchPlaceholder ?? 'Search articles…',
  }

  return (
    <div className="w-full">
      <RenderBlocks blocks={heroBlocks} locale={locale} />
      <BlogSection
        posts={postsReq.docs as any}
        categories={categoriesReq.docs as any}
        tags={tagsReq.docs as any}
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
