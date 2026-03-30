import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import RichText from '@/components/RichText'
import ProductGallery from '../../ProductGallery'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    locale?: string
    categorySlug?: string
    productSlug?: string
  }>
}

export default async function ProductDetailPage({ params: paramsPromise }: Args) {
  const { locale = 'hy', categorySlug, productSlug } = await paramsPromise
  if (!categorySlug || !productSlug) return notFound()

  const payload = await getPayload({ config: configPromise })

  const [categoryReq, productReq, tr] = await Promise.all([
    payload.find({
      collection: 'productCategories',
      locale: locale as any,
      where: { slug: { equals: categorySlug } },
      limit: 1,
    }),
    payload.find({
      collection: 'products',
      locale: locale as any,
      depth: 2,
      where: { slug: { equals: productSlug } },
      limit: 1,
    }),
    getSiteTranslations(locale),
  ])

  const category = categoryReq.docs[0]
  const product = productReq.docs[0]
  if (!category || !product) return notFound()

  const t = {
    inquire: tr.products?.inquire ?? 'Inquire About This Product',
    features: tr.products?.featuresHeading ?? 'Key Features',
    specs: tr.products?.specsHeading ?? 'Specifications',
    documents: tr.products?.documentsHeading ?? 'Documents & Downloads',
    download: tr.products?.download ?? 'Download',
    comingSoon: tr.products?.comingSoon ?? 'Coming Soon',
    discontinued: tr.products?.discontinued ?? 'Discontinued',
    featured: tr.products?.featured ?? 'Featured',
  }

  const statusBadgeMap: Record<string, { key: 'comingSoon' | 'discontinued'; cls: string }> = {
    'coming-soon': { key: 'comingSoon', cls: 'bg-amber-100 text-amber-700' },
    discontinued: { key: 'discontinued', cls: 'bg-gray-200 text-gray-600' },
  }
  const badge = product.status ? statusBadgeMap[product.status as string] : null
  const images = (product.images ?? []) as any[]
  const features = (product.features ?? []) as any[]
  const specifications = (product.specifications ?? []) as any[]
  const documents = (product.documents ?? []) as any[]

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link
              href={`/${locale}/products`}
              className="text-teal-950 hover:text-teal-950 transition"
            >
              Products
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <Link
              href={`/${locale}/products/${categorySlug}`}
              className="text-teal-950 hover:text-teal-950 transition"
            >
              {category.title}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-800 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Gallery */}
            <div className="lg:sticky lg:top-8">
              <ProductGallery images={images} />
            </div>

            {/* Info panel */}
            <div>
              {/* Status & category badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="bg-teal-50 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
                  {category.title}
                </span>
                {badge && (
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.cls}`}>
                    {t[badge.key]}
                  </span>
                )}
                {product.featured && (
                  <span className="bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full border border-amber-100">
                    ★ {t.featured}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                {product.title}
              </h1>

              {(product as any).identifier && (
                <p className="text-sm text-gray-600  mb-4">{(product as any).identifier}</p>
              )}

              {product.shortDescription && (
                <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}

              {/* Full description */}
              {product.description && (
                <div className="prose prose-teal max-w-none text-gray-700 mb-8 pb-8 border-b border-gray-100">
                  <RichText data={product.description} enableGutter={false} />
                </div>
              )}

              {/* Key Features */}
              {features.length > 0 && (
                <div className="mb-8 pb-8 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">{t.features}</h2>
                  <ul className="space-y-2">
                    {features.map((f: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <svg
                          className="w-5 h-5 text-teal-800 mt-0.5 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {specifications.length > 0 && (
                <div className="mb-8 pb-8 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">{t.specs}</h2>
                  <table className="w-full text-sm">
                    <tbody>
                      {specifications.map((spec: any, i: number) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-2.5 px-3 font-medium text-gray-600 w-2/5 rounded-l">
                            {spec.label}
                          </td>
                          <td className="py-2.5 px-3 text-gray-900 rounded-r">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Documents */}
              {documents.length > 0 && (
                <div className="mb-8 pb-8 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">{t.documents}</h2>
                  <div className="space-y-2">
                    {documents.map((doc: any, i: number) => {
                      const fileUrl = typeof doc.file === 'object' ? doc.file?.url : null
                      if (!fileUrl) return null
                      return (
                        <a
                          key={i}
                          href={fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-teal-400 hover:bg-teal-50 transition group"
                        >
                          <svg
                            className="w-8 h-8 text-teal-500 shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="flex-grow font-medium text-gray-700 group-hover:text-teal-800">
                            {doc.label}
                          </span>
                          <span className="text-xs text-teal-950 font-semibold">
                            {t.download} ↓
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                href={`/${locale}/contacts`}
                className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition shadow-md hover:shadow-lg"
              >
                {t.inquire}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { productSlug, locale = 'hy' } = await paramsPromise
  if (!productSlug) return { title: 'Product Not Found' }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    locale: locale as any,
    where: { slug: { equals: productSlug } },
    limit: 1,
  })

  const product = result.docs[0]
  if (!product) return { title: 'Product Not Found' }

  return generateMeta({ doc: product as any })
}
