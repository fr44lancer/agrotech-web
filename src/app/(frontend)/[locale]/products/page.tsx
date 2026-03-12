import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { PageHeroBlockComponent } from '@/blocks/PageHero/Component'

type Args = {
  params: Promise<{
    locale?: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

const translations = {
  en: {
    title: "Our Products",
    subtitle: "High-quality Agricultural Solutions",
    desc: "Explore our comprehensive range of products categorized for your convenience. Select a category below to dive into our specific offerings.",
    contactBtn: "Contact Sales Team",
    backBtn: "Back to Home",
    all: "All Categories",
  },
  ru: {
    title: "Наша продукция",
    subtitle: "Качественные сельскохозяйственные решения",
    desc: "Ознакомьтесь с нашим полным ассортиментом продукции, разделенным по категориям для вашего удобства.",
    contactBtn: "Связаться с отделом продаж",
    backBtn: "На главную",
    all: "Все категории",
  },
  hy: {
    title: "Մեր Ապրանքները",
    subtitle: "Բարձրորակ Գյուղատնտեսական Լուծումներ",
    desc: "Ուսումնասիրեք մեր ապրանքների համապարփակ տեսականին, որոնք դասակարգված են ձեր հարմարավետության համար:",
    contactBtn: "Կապ վաճառքի բաժնի հետ",
    backBtn: "Գլխավոր էջ",
    all: "Բոլորը",
  }
}

export default async function ProductsPage({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const categorySlug = searchParams?.category
  const payload = await getPayload({ config: configPromise })
  
  const [categoriesData, heroReq] = await Promise.all([
    payload.find({
      collection: 'productCategories',
      locale: locale as any,
      limit: 100,
    }),
    payload.find({
      collection: 'pageHeroes',
      where: { pageKey: { equals: 'products' } },
      locale: locale as any,
      limit: 1,
    }),
  ])

  let productsData;
  if (categorySlug) {
    const category = categoriesData.docs.find((c: any) => c.slug === categorySlug);
    productsData = await payload.find({
      collection: 'products',
      locale: locale as any,
      limit: 100,
      where: category ? { categories: { contains: category.id } } : undefined
    })
  } else {
    productsData = await payload.find({
      collection: 'products',
      locale: locale as any,
      limit: 100
    })
  }

  const hero = heroReq.docs[0]
  const t = translations[locale as keyof typeof translations] || translations.hy
  const products = productsData.docs

  return (
    <div className="w-full">
      <PageHeroBlockComponent
        title={hero?.title ?? t.title}
        subtitle={hero?.subtitle ?? t.subtitle}
        description={hero?.description ?? t.desc}
      />

      <section className="py-16 bg-gray-50 min-h-[50vh]">
        <div className="container mx-auto px-6 w-full max-w-7xl">
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                <a href={`/${locale}/products`} className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${!categorySlug ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                {t.all}
                </a>
                {categoriesData.docs.map((cat: any) => (
                <a key={cat.id} href={`/${locale}/products/${cat.slug}`} className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-sm ${categorySlug === cat.slug ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                    {cat.title}
                </a>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoriesData.docs.filter((c: any) => !categorySlug || c.slug === categorySlug).map((category: any) => (
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
                           <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">{category.title}</h3>
                    <div className="flex items-center text-teal-600 font-medium opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-4">
                      <span>View Products</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="mt-16 text-center">
                 <a href={`/${locale}/contacts`} className="inline-block bg-teal-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-teal-700 transition shadow-md hover:shadow-lg">
                    {t.contactBtn}
                 </a>
            </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise
  return {
    title: 'Products | Agrotech',
    description: 'Our Product Catalog is Under Development'
  }
}
