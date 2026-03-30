import React, { cache } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { Media } from '@/components/Media'
import type { Partner, PartnerCategory } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getSiteTranslations } from '@/utilities/getSiteTranslations'
import { generateMeta } from '@/utilities/generateMeta'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'
import { Col, Row } from 'antd'

type Args = {
  params: Promise<{ locale?: string }>
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'hy' } = await paramsPromise
  const page = await queryPageBySlug({ slug: 'partners', locale })
  return generateMeta({ doc: page })
}

const accentColors = [
  'border-teal-600',
  'border-green-600',
  'border-teal-500',
  'border-green-500',
  'border-teal-700',
  'border-green-700',
]

export const dynamic = 'force-dynamic'

export default async function Page({ params: paramsPromise }: Args) {
  const { locale = 'hy' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const [partnersReq, categoriesReq, benefitsReq, testimonialsReq, page, tr] = await Promise.all([
    payload.find({ collection: 'partners', locale: locale as any, limit: 200, depth: 2 }),
    payload.find({
      collection: 'partnerCategories',
      locale: locale as any,
      limit: 100,
      sort: 'title',
    }),
    payload.find({
      collection: 'partnerBenefits',
      locale: locale as any,
      limit: 100,
      sort: 'order',
    }),
    payload.find({
      collection: 'partnerTestimonials',
      locale: locale as any,
      limit: 20,
      sort: 'order',
      depth: 1,
    }),
    queryPageBySlug({ slug: 'partners', locale }),
    getSiteTranslations(locale),
  ])

  const t = {
    growingTitle: tr.partners?.growingTitle ?? 'Growing Together',
    growingSub1:
      tr.partners?.growingSub1 ??
      'At AGROTECH, we believe in the power of collaboration. Our partnerships with leading organizations, research institutions, and distributors enable us to deliver innovative solutions and expand our global reach.',
    growingSub2:
      tr.partners?.growingSub2 ??
      "Together, we're shaping the future of sustainable agriculture and making a positive impact on communities worldwide.",
    strategicTitle: tr.partners?.strategicTitle ?? 'Strategic Partners',
    strategicSub:
      tr.partners?.strategicSub ?? 'Our global network of trusted partners across key sectors',
    otherPartners: tr.partners?.otherPartners ?? 'Other Partners',
    benefitsTitle: tr.partners?.benefitsTitle ?? 'Partnership Benefits',
    benefitsSub:
      tr.partners?.benefitsSub ??
      'Partnering with AGROTECH means access to innovative solutions and a global support network',
    becomeTitle: tr.partners?.becomeTitle ?? 'Become a Partner',
    becomeText:
      tr.partners?.becomeText ??
      'Join our growing network of partners and help shape the future of sustainable agriculture. Together we can make a greater impact.',
    contactBtn: tr.partners?.contactBtn ?? 'Contact Partnership Team',
    testimonialsTitle: tr.partners?.testimonialsTitle ?? 'What Our Partners Say',
    visitWebsite: tr.partners?.visitWebsite ?? 'Visit Website',
    noPartners: tr.partners?.noPartners ?? 'No partners listed yet.',
  }

  const allPartners = partnersReq.docs as Partner[]
  const categories = categoriesReq.docs as PartnerCategory[]
  const benefits = benefitsReq.docs
  const testimonials = testimonialsReq.docs
  const heroBlocks = (page?.layout ?? []).filter((b) => b.blockType === 'pageHeroBlock')

  // Group partners by category
  const assignedIds = new Set<string>()
  const categoryGroups = categories
    .map((category) => {
      const grouped = allPartners.filter(
        (p) =>
          Array.isArray(p.categories) &&
          p.categories.some((c) => (typeof c === 'object' ? c.id : c) === category.id),
      )
      grouped.forEach((p) => assignedIds.add(p.id))
      return { category, partners: grouped }
    })
    .filter((g) => g.partners.length > 0)

  const uncategorized = allPartners.filter((p) => !assignedIds.has(p.id))

  return (
    <div className="w-full">
      {/* Hero */}
      <RenderBlocks blocks={heroBlocks} locale={locale} />

      {/* Growing Together */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{t.growingTitle}</h2>
          <p className="text-gray-600 text-lg mb-4">{t.growingSub1}</p>
          <p className="text-gray-600 text-lg">{t.growingSub2}</p>
        </div>
      </section>

      {/* Strategic Partners — grouped by category */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t.strategicTitle}
            </h2>
            <p className="text-gray-600 text-lg">{t.strategicSub}</p>
          </div>

          {allPartners.length === 0 ? (
            <p className="text-gray-500 text-center">{t.noPartners}</p>
          ) : (
            <div className="space-y-14">
              {categoryGroups.map(({ category, partners }) => (
                <div key={category.id}>
                  <h3 className="text-xl font-bold text-teal-700 mb-6 pb-2 border-b border-teal-100">
                    {category.title}
                  </h3>
                  <PartnerGrid partners={partners} visitLabel={t.visitWebsite} />
                </div>
              ))}
              {uncategorized.length > 0 && (
                <div>
                  {categoryGroups.length > 0 && (
                    <h3 className="text-xl font-bold text-teal-700 mb-6 pb-2 border-b border-teal-100">
                      {t.otherPartners}
                    </h3>
                  )}
                  <PartnerGrid partners={uncategorized} visitLabel={t.visitWebsite} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      {benefits.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t.benefitsTitle}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.benefitsSub}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <div
                  key={benefit.id}
                  className={`bg-gray-50 rounded-lg p-6 border-l-4 ${accentColors[i % accentColors.length]}`}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  {benefit.description && (
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Become a Partner CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-green-700 text-white">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.becomeTitle}</h2>
          <p className="text-green-50 text-lg mb-8">{t.becomeText}</p>
          <Link
            href={`/${locale}/contacts`}
            className="bg-white text-teal-700 px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition"
          >
            {t.contactBtn}
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t.testimonialsTitle}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 flex flex-col"
                >
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow italic">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-gray-800">{testimonial.authorName}</p>
                    {testimonial.authorTitle && (
                      <p className="text-sm text-teal-950">{testimonial.authorTitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function PartnerGrid({ partners, visitLabel }: { partners: Partner[]; visitLabel: string }) {
  return (
    <BaseWrapper>
      <Row gutter={[24, 24]} justify={'start'}>
        {partners.map((partner) => (
          <Col xs={24} md={6} key={partner.id}>
            <BaseWrapper className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow h-full">
              <div className="h-60 w-full flex items-center justify-center mb-4 overflow-hidden">
                {partner.logo && typeof partner.logo === 'object' ? (
                  <Media resource={partner.logo} className="max-h-60 max-w-full object-contain" />
                ) : (
                  <div className="text-gray-400 font-bold text-2xl">{partner.title}</div>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{partner.title}</h3>
              {partner.description && (
                <p className="text-gray-600 text-sm mb-4 flex-grow">{partner.description}</p>
              )}
              {partner.websiteUrl && (
                <a
                  href={partner.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto text-teal-950 font-semibold hover:text-teal-700 w-full rounded border border-teal-600 py-2 text-sm transition hover:bg-teal-50"
                >
                  {visitLabel}
                </a>
              )}
            </BaseWrapper>
          </Col>
        ))}
      </Row>
    </BaseWrapper>
  )
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
