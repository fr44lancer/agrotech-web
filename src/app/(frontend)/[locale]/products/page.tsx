import React, { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'
import CategorySelect from './CategorySelect'

type Args = {
  params: Promise<{
    locale?: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ProductsPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { locale = 'hy' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const categorySlug = searchParams?.category
  const payload = await getPayload({ config: configPromise })

  const [categoriesData, page, tr] = await Promise.all([
    payload.find({
      collection: 'productCategories',
      locale: locale as any,
      limit: 100,
    }),
    queryPageBySlug({ slug: 'products', locale }),
    getSiteTranslations(locale),
  ])

  let productsData
  if (categorySlug) {
    const category = categoriesData.docs.find((c: any) => c.slug === categorySlug)
    productsData = await payload.find({
      collection: 'products',
      locale: locale as any,
      limit: 100,
      where: category ? { categories: { contains: category.id } } : undefined,
    })
  } else {
    productsData = await payload.find({
      collection: 'products',
      locale: locale as any,
      limit: 100,
    })
  }

  const t = {
    all: tr.products?.allCategories ?? 'All Categories',
    viewProducts: tr.products?.viewProducts ?? 'View Products',
    contactBtn: tr.products?.contactBtn ?? 'Contact Sales Team',
  }
  const products = productsData.docs
  const heroBlocks = (page?.layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')

  return (
    <div className="w-full">
      <RenderBlocks blocks={heroBlocks} locale={locale} />

      <section className="py-16 bg-gray-50 min-h-[50vh]">
        <div className="container mx-auto px-6 w-full max-w-7xl">
          {/* Mobile: dropdown */}
          <div className="md:hidden mb-8">
            <CategorySelect
              categories={categoriesData.docs.map((c: any) => ({ id: c.id, title: c.title, slug: c.slug }))}
              locale={locale}
              currentSlug={categorySlug}
              allLabel={t.all}
            />
          </div>

          {/* Desktop: pills */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 mb-12">
            <a
              href={`/${locale}/products`}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${!categorySlug ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {t.all}
            </a>
            {categoriesData.docs.map((cat: any) => (
              <a
                key={cat.id}
                href={`/${locale}/products/${cat.slug}`}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${categorySlug === cat.slug ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {cat.title}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesData.docs
              .filter((c: any) => !categorySlug || c.slug === categorySlug)
              .map((category: any) => (
                <a
                  href={`/${locale}/products/${category.slug}`}
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    {category.image && typeof category.image === 'object' && category.image.url ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${category.image.url})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white/50"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-950 transition-colors">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-gray-500 text-sm line-clamp-2 flex-1">
                        {category.description}
                      </p>
                    )}
                    <div className="flex items-center text-teal-950 font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-4">
                      <span>{t.viewProducts}</span>
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href={`/${locale}/contacts`}
              className="inline-block bg-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-700 transition shadow-md hover:shadow-lg"
            >
              {t.contactBtn}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'hy' } = await paramsPromise
  const page = await queryPageBySlug({ slug: 'products', locale })
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
      where: { slug: { equals: slug } },
    })
    return result.docs?.[0] || null
  },
)
