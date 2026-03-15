import React from 'react'
import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{ slug: string; locale?: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    pagination: false,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })

  const locales = ['hy', 'en', 'ru']
  return posts.docs.flatMap((doc) =>
    locales.map((locale) => ({ slug: doc.slug as string, locale })),
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    locale: locale as any,
    limit: 1,
  })
  const post = result.docs[0]
  if (!post) return { title: 'Article Not Found' }
  return generateMeta({ doc: post as any })
}

export default async function BlogPostPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug, locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [postsReq, tr] = await Promise.all([
    payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      locale: locale as any,
      depth: 2,
      where: { slug: { equals: slug } },
    }),
    getSiteTranslations(locale),
  ])

  const post = postsReq.docs[0]
  if (!post) return notFound()

  const t = {
    backToBlog: tr.blog?.backToBlog ?? 'Back to Blog',
    tagsLabel: tr.blog?.tags ?? 'Tags',
    relatedPostsLabel: tr.blog?.relatedPosts ?? 'Related Articles',
    readMore: tr.blog?.readMore ?? 'Read More',
  }

  const imageUrl =
    post.heroImage && typeof post.heroImage === 'object' ? (post.heroImage as any).url : null
  const cats = ((post.categories ?? []) as any[]).filter((c) => typeof c === 'object' && c?.title)
  const tags = (((post as any).tags ?? []) as any[]).filter(
    (tg) => typeof tg === 'object' && tg?.title,
  )
  const related = ((post.relatedPosts ?? []) as any[]).filter(
    (p) => typeof p === 'object' && p?.title,
  )
  const layout = (post as any).layout ?? []

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'hy' ? 'hy-AM' : locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero */}
      <div className="relative bg-teal-900 text-white overflow-hidden min-h-72">
        {imageUrl && (
          <div className="absolute inset-0">
            <img src={imageUrl} alt={post.title as string} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-teal-900/70" />
          </div>
        )}
        {!imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-br from-teal-800 to-green-900 opacity-90" />
        )}

        <div className="relative container mx-auto px-6  py-6 md:py-10">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-1.5 text-teal-200 hover:text-white text-sm font-medium mb-8 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {t.backToBlog}
          </Link>

          {cats.length > 0 && (
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
          )}

          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight max-w-3xl">
            {post.title as string}
          </h1>

          {dateStr && <p className="text-teal-200 text-sm">{dateStr}</p>}
        </div>
      </div>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-6 ">
          {layout.length > 0 && <RenderBlocks blocks={layout} locale={locale} />}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-100">
              <span className="text-sm font-semibold text-gray-500 mr-3">{t.tagsLabel}:</span>
              <div className="inline-flex flex-wrap gap-2">
                {tags.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full border border-teal-100"
                  >
                    #{tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t.relatedPostsLabel}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p: any) => {
                  const relImg =
                    p.heroImage && typeof p.heroImage === 'object' ? p.heroImage.url : null
                  return (
                    <Link
                      key={p.id}
                      href={`/${locale}/blog/${p.slug}`}
                      className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      {relImg && (
                        <div className="h-36 overflow-hidden">
                          <img
                            src={relImg}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-teal-700 transition-colors">
                          {p.title}
                        </h3>
                        <span className="mt-2 inline-flex items-center gap-1 text-teal-600 text-xs font-medium">
                          {t.readMore} →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
