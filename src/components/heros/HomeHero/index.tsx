'use client'
import React from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Media } from '@/components/Media'

type Feature = {
  text: string
  id?: string | null
}

type HeroLink = {
  link: {
    type?: 'custom' | 'reference' | null
    url?: string | null
    label?: string | null
    newTab?: boolean | null
    appearance?: string | null
    reference?: {
      relationTo: string
      value: { slug?: string | null } | string | number
    } | null
  }
}

type HomeHeroProps = {
  title?: string | null
  slogan?: string | null
  features?: Feature[] | null
  backgroundImage?: any | null
  links?: HeroLink[] | null
}

function str(value: any, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return value[locale] ?? value['hy'] ?? Object.values(value)[0] ?? ''
  return String(value)
}

function resolveHref(link: HeroLink['link'], locale: string): string {
  if (
    link.type === 'reference' &&
    typeof link.reference?.value === 'object' &&
    link.reference.value?.slug
  ) {
    const { value, relationTo } = link.reference
    const collection = relationTo !== 'pages' ? `/${relationTo}` : ''
    return `/${locale}${collection}/${(value as { slug: string }).slug}`
  }
  if (link.url) {
    return link.url.startsWith('/') ? `/${locale}${link.url}` : link.url
  }
  return '#'
}

export const HomeHeroHero: React.FC<HomeHeroProps> = ({
  title,
  slogan,
  features,
  backgroundImage,
  links,
}) => {
  const params = useParams()
  const locale = (params?.locale as string) || 'hy'

  return (
    <section className="relative text-white min-h-[520px]">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        {backgroundImage && typeof backgroundImage === 'object' ? (
          <Media fill imgClassName="object-cover" priority resource={backgroundImage} />
        ) : (
          <div className="absolute inset-0 bg-teal-800" />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 " />

      {/* Content */}
      <div className="container mx-auto px-6 py-16 md:py-32 relative z-10 w-full ">
        <div className="max-w-4xl">
          {title && <h1 className="text-2xl md:text-5xl font-bold mb-8 max-w-2xl">{str(title, locale)}</h1>}

          {slogan && <p className="text-xl md:text-2xl mb-6 text-green-50">{str(slogan, locale)}</p>}

          {features && features.length > 0 && (
            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <div key={feature.id ?? i} className="flex items-start">
                  <svg
                    className="w-6 h-6 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg md:text-xl">{str(feature.text, locale)}</span>
                </div>
              ))}
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map(({ link }, i) => {
                const href = resolveHref(link, locale)
                const newTabProps = link.newTab
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {}
                const isOutline = link.appearance === 'outline'
                return (
                  <Link
                    key={i}
                    href={href}
                    {...newTabProps}
                    className={
                      isOutline
                        ? 'border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-800 transition'
                        : 'bg-white text-teal-800 px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition'
                    }
                  >
                    {str(link.label, locale)}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
