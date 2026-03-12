import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{
    locale?: string
    categorySlug?: string
  }>
}

const translations = {
  en: {
    backBtn: "Back Setup",
    all: "All Categories",
  },
  ru: {
    backBtn: "Назад",
    all: "Все категории",
  },
  hy: {
    backBtn: "Գլխավոր էջ",
    all: "Բոլորը",
  }
}

export default async function CategoryProductsPage({ params: paramsPromise }: Args) {
  const { locale = 'hy', categorySlug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  
  if (!categorySlug) return notFound()

  // First fetch the specific category
  const categoriesData = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    where: {
      slug: { equals: categorySlug }
    },
    limit: 1
  })

  const category = categoriesData.docs[0]
  if (!category) return notFound()

  // Now fetch all products strictly within this category
  const productsData = await payload.find({
    collection: 'products',
    locale: locale as any,
    where: {
      categories: { contains: category.id }
    },
    limit: 100
  })

  // Also fetch all categories for the filter pill bar
  const allCategoriesData = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    limit: 100
  })

  const t = translations[locale as keyof typeof translations] || translations.hy
  const products = productsData.docs

  return (
    <div className="w-full">
      <section className="min-h-[40vh] bg-gradient-to-br from-teal-700 via-green-600 to-green-700 pt-32 pb-16">
        <div className="container mx-auto px-6 w-full max-w-5xl">
            <div className="max-w-4xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.title}</h1>
            </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 min-h-[50vh]">
        <div className="container mx-auto px-6 w-full max-w-7xl">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                <a href={`/${locale}/products`} className="px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm bg-white text-gray-700 hover:bg-gray-100">
                  {t.all}
                </a>
                {allCategoriesData.docs.map((cat: any) => (
                <a key={cat.id} href={`/${locale}/products/${cat.slug}`} className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${categorySlug === cat.slug ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                    {cat.title}
                </a>
                ))}
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-xl">No products found in this category.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product: any) => (
                    <a
                    href={`/${locale}/products/${category.slug}/${product.slug}`}
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                    >
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                        {product.image && typeof product.image === 'object' && product.image.url ? (
                            <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                            style={{ backgroundImage: `url(${product.image.url})` }}
                            />
                        ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                            <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{product.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{product.description}</p>
                        <div className="flex items-center text-teal-600 font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-auto pt-4 border-t border-gray-100">
                        <span>View Details</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                    </div>
                    </a>
                ))}
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
  const categoriesData = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    where: { slug: { equals: categorySlug } },
    limit: 1
  })

  const category = categoriesData.docs[0]
  if (!category) return { title: 'Category Not Found' }

  return {
    title: `${category.title} | Agrotech Products`,
    description: `Browse our comprehensive range of ${category.title} agricultural solutions.`,
  }
}
