import React from 'react'

import type { Page } from '@/payload-types'
import { HighImpactHero } from '@/components/heros/HighImpact'
import { HomeHeroHero } from '@/components/heros/HomeHero'
import { LowImpactHero } from '@/components/heros/LowImpact'
import { MediumImpactHero } from '@/components/heros/MediumImpact'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const heroes: Record<string, React.FC<any>> = {
  highImpact: HighImpactHero,
  homeHero: HomeHeroHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

/** Resolve a Payload locale object {hy, en, ru} to the requested locale's value. */
function resolveLocale<T>(value: T, locale: string): T {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return value
  const v = value as Record<string, unknown>
  if ('hy' in v || 'en' in v || 'ru' in v) {
    return (v[locale] ?? v['hy'] ?? v['en'] ?? v['ru'] ?? null) as T
  }
  return value
}

type RenderHeroProps = Page['hero'] & { locale?: string }

export const RenderHero: React.FC<RenderHeroProps> = (props) => {
  const { locale = 'hy', ...rest } = props || {}
  const type = resolveLocale(rest.type, locale)

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]
  if (!HeroToRender) return null

  // Resolve richText locale object before passing to the hero component
  const richText = resolveLocale((rest as any).richText, locale)

  return <HeroToRender {...rest} richText={richText} />
}
