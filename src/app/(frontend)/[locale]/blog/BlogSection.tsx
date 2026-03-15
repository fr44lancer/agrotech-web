'use client'

import React, { useMemo, useState } from 'react'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  slug: string
  publishedAt?: string | null
  excerpt?: string | null
  heroImage?: { url: string; alt?: string } | null
  categories?: Array<{ id: string; title: string } | string>
  tags?: Array<{ id: string; title: string } | string>
}

type Category = { id: string; title: string }
type Tag = { id: string; title: string }

type T = {
  allCategories: string
  allTags: string
  readMore: string
  noPosts: string
  searchPlaceholder: string
}

export default function BlogSection({
  posts,
  categories,
  tags,
  locale,
  t,
}: {
  posts: Post[]
  categories: Category[]
  tags: Tag[]
  locale: string
  t: T
}) {
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [tagId, setTagId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (categoryId) {
        const cats = (post.categories ?? []) as any[]
        if (!cats.some((c) => (typeof c === 'object' ? c.id : c) === categoryId)) return false
      }
      if (tagId) {
        const postTags = (post.tags ?? []) as any[]
        if (!postTags.some((tg) => (typeof tg === 'object' ? tg.id : tg) === tagId)) return false
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        if (
          !(post.title as string).toLowerCase().includes(q) &&
          !(post.excerpt ?? '').toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [posts, categoryId, tagId, search])

  return (
    <section className="pb-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 ">
        {/* Filter Bar */}
        <div className="border border-gray-100 p-5 mb-10">
          {/* Search */}
          {/*<div className="mb-4">*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    placeholder={t.searchPlaceholder}*/}
          {/*    value={search}*/}
          {/*    onChange={(e) => setSearch(e.target.value)}*/}
          {/*    className="w-full sm:w-80 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"*/}
          {/*  />*/}
          {/*</div>*/}

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setCategoryId(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !categoryId
                    ? 'bg-teal-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                }`}
              >
                {t.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(categoryId === cat.id ? null : cat.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    categoryId === cat.id
                      ? 'bg-teal-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-700'
                  }`}
                >
                  {cat.title as string}
                </button>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTagId(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                  !tagId
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-600'
                }`}
              >
                {t.allTags}
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setTagId(tagId === tag.id ? null : tag.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                    tagId === tag.id
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 text-gray-500 hover:border-teal-400 hover:text-teal-600'
                  }`}
                >
                  #{tag.title as string}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">{t.noPosts}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} readMore={t.readMore} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function PostCard({ post, locale, readMore }: { post: Post; locale: string; readMore: string }) {
  const imageUrl =
    post.heroImage && typeof post.heroImage === 'object' ? (post.heroImage as any).url : null
  const cats = ((post.categories ?? []) as any[]).filter((c) => typeof c === 'object' && c?.title)
  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(locale === 'hy' ? 'hy-AM' : locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      {/* Image */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={post.title as string}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-50 to-green-100 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-teal-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {cats.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {cats.slice(0, 2).map((c: any) => (
              <span
                key={c.id}
                className="bg-teal-700/90 text-white text-xs font-medium px-2.5 py-0.5 rounded-full backdrop-blur-sm"
              >
                {c.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        {dateStr && <p className="text-xs text-gray-400 mb-2">{dateStr}</p>}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-teal-700 transition-colors">
          {post.title as string}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3 flex-1">{post.excerpt as string}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-teal-700 text-sm font-medium">
          {readMore}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
