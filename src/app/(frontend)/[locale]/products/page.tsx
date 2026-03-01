import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

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
    title: "Coming Soon",
    subtitle: "Our Product Catalog is Under Development",
    desc: "We're working hard to bring you a comprehensive digital catalog of our innovative agricultural solutions. Below is a preview of our product categories.",
    contactBtn: "Contact Sales Team",
    backBtn: "Back to Home",
    newsletterTitle: "Get Notified When We Launch",
    newsletterDesc: "Be the first to know when our product catalog goes live. Subscribe to our newsletter for updates.",
    notifyBtn: "Notify Me",
    emailPlaceholder: "Enter your email address",
    contactInfoText: "In the meantime, for product inquiries please contact:",
  },
  ru: {
    title: "Скоро",
    subtitle: "Наш каталог продуктов находится в разработке",
    desc: "Мы усердно работаем над созданием исчерпывающего цифрового каталога наших инновационных сельскохозяйственных решений. Ниже представлен предварительный просмотр.",
    contactBtn: "Связаться с отделом продаж",
    backBtn: "На главную",
    newsletterTitle: "Получить уведомление о запуске",
    newsletterDesc: "Узнайте первыми, когда наш каталог продуктов заработает. Подпишитесь на нашу рассылку.",
    notifyBtn: "Уведомить меня",
    emailPlaceholder: "Ваш email",
    contactInfoText: "Тем временем по вопросам продукции обращайтесь:",
  },
  hy: {
    title: "Շուտով",
    subtitle: "Մեր ապրանքների կատալոգը մշակման փուլում է",
    desc: "Մենք աշխատում ենք ապրանքների համապարփակ թվային կատալոգ ստեղծելու ուղղությամբ։ Ստորև ներկայացված է մեր ապրանքների տեսականու նախադիտումը։",
    contactBtn: "Կապ վաճառքի բաժնի հետ",
    backBtn: "Վերադառնալ գլխավոր էջ",
    newsletterTitle: "Ստացեք ծանուցում գործարկման ժամանակ",
    newsletterDesc: "Առաջինը տեղեկացեք, երբ մեր կատալոգը հասանելի կդառնա։ Բաժանորդագրվեք մեր նորություններին։",
    notifyBtn: "Ծանուցել",
    emailPlaceholder: "Մուտքագրեք Ձեր էլ. հասցեն",
    contactInfoText: "Մինչ այդ, ապրանքների վերաբերյալ հարցերով խնդրում ենք կապվել՝",
  }
}

export default async function ProductsPage({ params: paramsPromise, searchParams: searchParamsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const searchParams = await searchParamsPromise
  const categorySlug = searchParams?.category
  const payload = await getPayload({ config: configPromise })
  
  const categoriesData = await payload.find({
    collection: 'productCategories',
    locale: locale as any,
    limit: 100
  })

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

  const t = translations[locale as keyof typeof translations] || translations.hy
  const products = productsData.docs

  return (
    <div className="w-full">
      {/* Coming Soon Section */}
      <section className="min-h-screen bg-gradient-to-br from-teal-700 via-green-600 to-green-700 flex items-center justify-center py-20">
        <div className="container mx-auto px-6 w-full max-w-5xl">
            <div className="max-w-4xl mx-auto text-center text-white">
                {/* Icon */}
                <div className="mb-8">
                    <svg className="w-32 h-32 mx-auto text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6">{t.title}</h1>

                {/* Subheading */}
                <p className="text-2xl md:text-3xl text-green-50 mb-8">
                    {t.subtitle}
                </p>

                {/* Description */}
                <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                    {t.desc}
                </p>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  <a href={`/${locale}/products`} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${!categorySlug ? 'bg-white text-teal-700' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                    {locale === 'hy' ? 'Բոլորը' : locale === 'ru' ? 'Все' : 'All'}
                  </a>
                  {categoriesData.docs.map((cat: any) => (
                    <a key={cat.id} href={`/${locale}/products?category=${cat.slug}`} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${categorySlug === cat.slug ? 'bg-white text-teal-700' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                      {cat.title}
                    </a>
                  ))}
                </div>

                {/* Preview Cards - Mapped from Payload Products Collection */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 text-left">
                  {products.map((product: any) => (
                    <div key={product.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all shadow-lg flex flex-col justify-between">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                        <p className="text-green-50">{product.description}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 justify-center mb-12">
                    <a href={`/${locale}/contacts`} className="bg-white text-teal-700 px-8 py-4 rounded-md font-semibold hover:bg-green-50 transition text-lg">
                        {t.contactBtn}
                    </a>
                    <a href={`/${locale}`} className="border-2 border-white text-white px-8 py-4 rounded-md font-semibold hover:bg-white hover:text-teal-700 transition text-lg">
                        {t.backBtn}
                    </a>
                </div>

                {/* Newsletter Signup */}
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                    <h3 className="text-2xl font-semibold mb-4">{t.newsletterTitle}</h3>
                    <p className="text-green-100 mb-6">
                        {t.newsletterDesc}
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder={t.emailPlaceholder}
                            className="flex-1 px-6 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button
                            type="submit"
                            className="bg-white text-teal-700 px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition whitespace-nowrap"
                        >
                            {t.notifyBtn}
                        </button>
                    </form>
                </div>

                {/* Temporary Contact Info */}
                <div className="mt-12 text-green-100">
                    <p className="mb-2">{t.contactInfoText}</p>
                    <p className="font-semibold text-white">Email: info@agrotech.am</p>
                    <p className="font-semibold text-white">Phone: +374 10 123456</p>
                </div>
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
