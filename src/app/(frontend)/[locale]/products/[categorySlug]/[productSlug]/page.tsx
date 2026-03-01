import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    locale?: string
    categorySlug?: string
    productSlug?: string
  }>
}

const translations = {
  en: {
    backBtn: "Back to Category",
    contactBtn: "Inquire Now",
    descTitle: "Product Description",
    featuresTitle: "Key Features",
    specsTitle: "Specifications",
  },
  ru: {
    backBtn: "Назад к категории",
    contactBtn: "Запросить сейчас",
    descTitle: "Описание продукта",
    featuresTitle: "Ключевые особенности",
    specsTitle: "Технические характеристики",
  },
  hy: {
    backBtn: "Վերադառնալ կատեգորիա",
    contactBtn: "Հարցում հիմա",
    descTitle: "Ապրանքի նկարագրություն",
    featuresTitle: "Հիմնական հատկանիշները",
    specsTitle: "Տեխնիկական պայմաններ",
  }
}

export default async function ProductDetailsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy', categorySlug, productSlug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  
  if (!categorySlug || !productSlug) return notFound()

  // Verify the category exists to ensure valid routing hierarchy
  const categoriesData = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    where: { slug: { equals: categorySlug } },
    limit: 1
  })
  
  const category = categoriesData.docs[0]
  if (!category) return notFound()

  // Fetch the specific product
  const productsData = await payload.find({
    collection: 'products',
    locale: locale as any,
    where: { 
      and: [
          { slug: { equals: productSlug } },
          { categories: { contains: category.id } }
      ]
    },
    limit: 1
  })

  const product = productsData.docs[0]
  if (!product) return notFound()

  const t = translations[locale as keyof typeof translations] || translations.hy

  return (
    <div className="w-full bg-white">
      {/* Breadcrumb Navigation Area */}
      <div className="bg-gray-50 pt-32 pb-8 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
            <a href={`/${locale}/products/${categorySlug}`} className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                {t.backBtn}
            </a>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                
                {/* Product Image Gallery Placeholder */}
                <div className="sticky top-24">
                  <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square border border-gray-100 relative group">
                     {product.image && typeof product.image === 'object' && product.image.url ? (
                            <div
                            className="absolute inset-0 bg-contain bg-center bg-no-repeat bg-white transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${product.image.url})` }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-green-300 to-teal-400 flex items-center justify-center">
                            <svg className="w-32 h-32 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </div>
                     )}
                  </div>
                </div>

                {/* Product Info Setup */}
                <div className="flex flex-col">
                    <div className="mb-4 flex items-center gap-3">
                         <span className="bg-teal-50 text-teal-700 text-sm font-semibold px-4 py-1.5 rounded-full border border-teal-100">
                             {category.title}
                         </span>
                         {/* Optional Additional Badges Placeholder */}
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {product.title}
                    </h1>

                    <div className="prose prose-lg text-gray-600 mb-10">
                        {product.description}
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 mb-10 border border-gray-100">
                         <h3 className="text-xl font-bold text-gray-800 mb-4">{t.specsTitle}</h3>
                         <ul className="space-y-3">
                            <li className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="text-gray-500 font-medium">Availability</span>
                                <span className="text-gray-900 font-semibold text-right">In Stock</span>
                            </li>
                            <li className="flex items-start justify-between border-b border-gray-200 pb-3">
                                <span className="text-gray-500 font-medium">SKU</span>
                                <span className="text-gray-900 font-semibold text-right text-sm">{product.id.toString().substring(0, 8).toUpperCase()}</span>
                            </li>
                            <li className="flex items-start justify-between pb-1">
                                <span className="text-gray-500 font-medium">Category</span>
                                <span className="text-gray-900 font-semibold text-right">{category.title}</span>
                            </li>
                         </ul>
                    </div>

                    <div className="flex gap-4 mt-auto">
                        <a href={`/${locale}/contacts`} className="flex-1 bg-teal-600 text-white text-center px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-700 hover:-translate-y-1 transition-all shadow-lg hover:shadow-xl">
                            {t.contactBtn}
                        </a>
                    </div>
                </div>

            </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { productSlug, locale = 'en' } = await paramsPromise
  if (!productSlug) return { title: 'Product Not Found' }

  const payload = await getPayload({ config: configPromise })
  const productsData = await payload.find({
    collection: 'products',
    locale: locale as any,
    where: { slug: { equals: productSlug } },
    limit: 1
  })

  const product = productsData.docs[0]
  if (!product) return { title: 'Product Not Found' }

  return {
    title: `${product.title} | Agrotech Products`,
    description: product.description,
  }
}
