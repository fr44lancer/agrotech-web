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

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
