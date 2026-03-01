import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'
import { RenderHero } from '@/components/heros/RenderHero'

export function generateStaticParams() {
  return [{ locale: 'hy' }, { locale: 'en' }, { locale: 'ru' }]
}

type Args = {
  params: Promise<{
    locale?: string
  }>
}

const translations = {
  en: {
    heroTitle: 'Ensure Stable Plant Health and Productivity',
    heroSub: 'Through our offered products and consultation services',
    heroFeature1: 'Make your production more efficient via our products and advisory services',
    heroFeature2: 'Reduce risks and losses through our offerings',
    exploreBtn: 'Explore Products',
    contactBtn: 'Contact Us',
    productsTitle: 'Our Products',
    productsSub: 'High-quality agricultural solutions from European and global manufacturers',
    servicesTitle: 'Agronomic Consultation Services',
    servicesSub:
      'Expert consultation on hydroponic cultivation methods through our in-house specialists and international experts',
    learnMore: 'Learn More →',
  },
  ru: {
    heroTitle: 'Обеспечение стабильного здоровья и продуктивности растений',
    heroSub: 'Благодаря предлагаемым нами продуктам и консультационным услугам',
    heroFeature1:
      'Сделайте свое производство более эффективным с помощью наших продуктов и консультационных услуг',
    heroFeature2: 'Снизьте риски и потери благодаря нашим предложениям',
    exploreBtn: 'Изучить продукты',
    contactBtn: 'Связаться с нами',
    productsTitle: 'Наши продукты',
    productsSub:
      'Высококачественные сельскохозяйственные решения от европейских и мировых производителей',
    servicesTitle: 'Агрономические консультационные услуги',
    servicesSub:
      'Экспертные консультации по методам гидропонного выращивания от наших штатных специалистов и международных экспертов',
    learnMore: 'Узнать больше →',
  },
  hy: {
    heroTitle: 'Ապահովեք բույսերի կայուն առողջությունը և արտադրողականությունը',
    heroSub: 'Մեր առաջարկած ապրանքների և խորհրդատվական ծառայությունների միջոցով',
    heroFeature1:
      'Ավելի արդյունավետ դարձրեք ձեր արտադրությունը մեր ապրանքների և խորհրդատվական ծառայությունների միջոցով',
    heroFeature2: 'Նվազեցրեք ռիսկերը և կորուստները մեր առաջարկների միջոցով',
    exploreBtn: 'Ուսումնասիրել ապրանքները',
    contactBtn: 'Կապ մեզ հետ',
    productsTitle: 'Մեր ապրանքները',
    productsSub:
      'Բարձրորակ գյուղատնտեսական լուծումներ եվրոպական և համաշխարհային արտադրողների կողմից',
    servicesTitle: 'Ագրոնոմիական խորհրդատվական ծառայություններ',
    servicesSub:
      'Փորձագիտական խորհրդատվություն հիդրոպոնիկ մշակության մեթոդների վերաբերյալ մեր ներքին մասնագետների և միջազգային փորձագետների կողմից',
    learnMore: 'Իմանալ ավելին →',
  },
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'hy' } = await paramsPromise

  const payload = await getPayload({ config: configPromise })

  const [page, productCategoriesData, servicesData] = await Promise.all([
    queryPageBySlug({ slug: 'home', locale }),
    payload.find({ collection: 'productCategories', locale: locale as any, limit: 100 }),
    payload.find({ collection: 'services', locale: locale as any, limit: 100 }),
  ])

  if (!page) {
    return null
  }

  const { hero, layout } = page
  const t = translations[locale as keyof typeof translations] || translations.hy
  const productCategories = productCategoriesData.docs
  const services = servicesData.docs

  return (
    <div className="w-full">
      {draft && <LivePreviewListener />}

      <section
        className="relative  text-white"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <BaseWrapper className={'w-full  m-auto'}>
          <RenderHero {...hero} />
        </BaseWrapper>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600/90 to-green-700/85"></div>
        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10 w-full max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-8">{t.heroTitle}</h1>
            <p className="text-xl md:text-2xl mb-6 text-green-50">{t.heroSub}</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-lg md:text-xl">{t.heroFeature1}</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="w-6 h-6 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-lg md:text-xl">{t.heroFeature2}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`/${locale}/products`}
                className="bg-white text-teal-700 px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition"
              >
                {t.exploreBtn}
              </a>
              <a
                href={`/${locale}/contacts`}
                className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-700 transition"
              >
                {t.contactBtn}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 w-full max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.productsTitle}</h2>
            <p className="text-gray-600 text-lg">{t.productsSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((category: any) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition flex flex-col"
              >
                {category.image && typeof category.image === 'object' && category.image.url ? (
                  <div
                    className="h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${category.image.url})` }}
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-green-400 to-teal-500 w-full" />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                  <a
                    href={`/${locale}/products/${category.slug}`}
                    className="text-teal-600 font-semibold hover:underline inline-block mt-auto pt-6"
                  >
                    {t.learnMore}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t.servicesTitle}</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">{t.servicesSub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any) => (
              <div key={service.id} className="text-center p-6   hover:shadow-lg transition">
                <div
                  className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4"
                  dangerouslySetInnerHTML={{ __html: service.iconSvg }}
                />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <div className="mb-3 flex flex-wrap justify-center gap-2">
                  {(service.categories || []).map((cat: any) => (
                    <span
                      key={cat.id}
                      className="bg-teal-50 text-teal-700 text-xs font-semibold px-2 py-1 rounded inline-block"
                    >
                      {cat.title}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'hy' } = await paramsPromise
  const page = await queryPageBySlug({
    slug: 'home',
    locale,
  })

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
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  },
)
