'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Media } from '@/components/Media'

type Feature = { text: string; id?: string | null }

type SlideLink = {
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

type Slide = {
  backgroundImage?: any | null
  title?: string | null
  slogan?: string | null
  features?: Feature[] | null
  links?: SlideLink[] | null
  id?: string | null
}

type Props = {
  slides?: Slide[] | null
  autoplay?: boolean | null
  autoplayInterval?: number | null
}

function resolveHref(link: SlideLink['link'], locale: string): string {
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

export const HeroSliderBlockComponent: React.FC<Props> = ({
  slides,
  autoplay = true,
  autoplayInterval = 3000,
}) => {
  const params = useParams()
  const locale = (params?.locale as string) || 'hy'

  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isHoveringRef = useRef(false)

  const validSlides = (slides ?? []).filter(Boolean)
  const count = validSlides.length

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return
      setAnimating(true)
      setCurrent(index)
      setTimeout(() => setAnimating(false), 600)
    },
    [animating, current],
  )

  const next = useCallback(() => goTo((current + 1) % count), [goTo, current, count])
  const prev = useCallback(() => goTo((current - 1 + count) % count), [goTo, current, count])

  // Autoplay
  const startTimer = useCallback(() => {
    if (!autoplay || count <= 1) return
    timerRef.current = setInterval(() => {
      if (!isHoveringRef.current) {
        setCurrent((c) => (c + 1) % count)
      }
    }, autoplayInterval ?? 5000)
  }, [autoplay, count, autoplayInterval])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  if (!validSlides.length) return null

  return (
    <section
      className="relative text-white min-h-[620px] overflow-hidden"
      onMouseEnter={() => {
        isHoveringRef.current = true
      }}
      onMouseLeave={() => {
        isHoveringRef.current = false
      }}
    >
      {/* Slides */}
      {validSlides.map((slide, i) => (
        <div
          key={slide.id ?? i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={i !== current}
        >
          {/* Background */}
          <div className="absolute inset-0">
            {slide.backgroundImage && typeof slide.backgroundImage === 'object' ? (
              <Media
                fill
                imgClassName="object-cover"
                priority={i === 0}
                resource={slide.backgroundImage}
              />
            ) : (
              <div className="absolute inset-0 bg-teal-800" />
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90" />

          {/* Content */}
          <div className="container mx-auto px-6 py-16 md:py-32 relative z-10 w-full min-h-[560px] flex items-center">
            <div className="max-w-7xl">
              {slide.title && (
                <h1 className="text-2xl md:text-5xl font-bold mb-8 max-w-5xl">{slide.title}</h1>
              )}

              {slide.slogan && (
                <p className="text-xl md:text-2xl mb-6 text-green-50">{slide.slogan}</p>
              )}

              {slide.features && slide.features.length > 0 && (
                <div className="space-y-4 mb-8">
                  {slide.features.map((feature, fi) => (
                    <div key={feature.id ?? fi} className="flex items-start">
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
                      <span className="text-lg md:text-xl">{feature.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {Array.isArray(slide.links) && slide.links.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {slide.links.map(({ link }, li) => {
                    const href = resolveHref(link, locale)
                    const newTabProps = link.newTab
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {}
                    const isOutline = link.appearance === 'outline'
                    return (
                      <Link
                        key={li}
                        href={href}
                        {...newTabProps}
                        className={
                          isOutline
                            ? 'border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-teal-800 transition'
                            : 'bg-white text-teal-800 px-8 py-3 rounded-md font-semibold hover:bg-green-50 transition'
                        }
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next arrows — only if more than 1 slide */}
      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition backdrop-blur-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
            {validSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-7 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
