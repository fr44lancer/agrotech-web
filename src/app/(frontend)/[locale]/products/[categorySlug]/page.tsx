import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import CategorySelect from '../CategorySelect'

type Args = {
  params: Promise<{
    locale?: string
    categorySlug?: string
  }>
}

function str(value: any, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && !Array.isArray(value)) return value[locale] ?? value['hy'] ?? Object.values(value)[0] ?? ''
  return String(value)
}

export default async function CategoryProductsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy', categorySlug } = await paramsPromise
  if (!categorySlug) return notFound()

  const payload = await getPayload({ config: configPromise })

  const [categoryReq, allCategoriesReq, tr] = await Promise.all([
    payload.find({
      collection: 'productCategories',
      locale: locale as any,
      where: { slug: { equals: categorySlug } },
      limit: 1,
    }),
    payload.find({
      collection: 'productCategories',
      locale: locale as any,
      limit: 100,
    }),
    getSiteTranslations(locale),
  ])

  const category = categoryReq.docs[0]
  if (!category) return notFound()

  const productsReq = await payload.find({
    collection: 'products',
    locale: locale as any,
    depth: 1,
    where: { categories: { contains: category.id } },
    limit: 100,
  })

  const t = {
    all: tr.products?.allCategories ?? 'All Categories',
    noProducts: tr.products?.noProducts ?? 'No products in this category yet.',
    viewDetails: tr.products?.viewDetails ?? 'View Details',
    featured: tr.products?.featured ?? 'Featured',
    comingSoon: tr.products?.comingSoon ?? 'Coming Soon',
    discontinued: tr.products?.discontinued ?? 'Discontinued',
  }
  const products = productsReq.docs

  return (
    <div className="w-full">
      {/* Category hero */}
      <section className="bg-gradient-to-r from-teal-700 to-gray-200 text-white py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{str(category.title, locale)}</h1>
          {(category as any).description && (
            <p className="text-xl text-green-50">{str((category as any).description, locale)}</p>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Mobile: dropdown */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 mb-8 gap-8 justify-left">
            <CategorySelect
              categories={allCategoriesReq.docs.map((c: any) => ({ id: c.id, title: c.title, slug: c.slug }))}
              locale={locale}
              currentSlug={categorySlug}
              allLabel={t.all}
            />
          </div>

          {/* Desktop: pills */}
          <div className="hidden flex-wrap gap-2 mb-10">
            <Link
              href={`/${locale}/products`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-600 border border-gray-200 hover:border-teal-400 transition"
            >
              {t.all}
            </Link>
            {allCategoriesReq.docs.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/${locale}/products/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  cat.slug === categorySlug
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-teal-400'
                }`}
              >
                {str(cat.title, locale)}
              </Link>
            ))}
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500 py-16 text-center">{t.noProducts}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => {
                const firstImage = product.images?.[0]?.image
                const imageUrl = typeof firstImage === 'object' ? firstImage?.url : null

                return (
                  <Link
                    href={`/${locale}/products/${categorySlug}/${product.slug}`}
                    key={product.id}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    {/* Image */}
                    <div className="relative h-52 bg-gray-100 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={str(product.title, locale)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                          <svg
                            className="w-16 h-16 text-white/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                      )}
                      {product.featured && (
                        <span className="absolute top-3 left-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ★ {t.featured}
                        </span>
                      )}
                      {product.status === 'coming-soon' && (
                        <span className="absolute top-3 right-3 bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">
                          {t.comingSoon}
                        </span>
                      )}
                      {product.status === 'discontinued' && (
                        <span className="absolute top-3 right-3 bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                          {t.discontinued}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-teal-950 transition-colors leading-snug">
                        {str(product.title, locale)}
                      </h3>
                      {product.shortDescription && (
                        <p className="text-sm text-gray-500 line-clamp-2 flex-grow">
                          {str(product.shortDescription, locale)}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-teal-950 text-sm font-semibold mt-4">
                        {t.viewDetails}
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { categorySlug, locale = 'en' } = await paramsPromise
  if (!categorySlug) return { title: 'Category Not Found' }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    where: { slug: { equals: categorySlug } },
    limit: 1,
  })

  const category = result.docs[0]
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.title} | Agrotech Products`,
    description: `Browse our ${category.title} agricultural product catalog.`,
  }
}
