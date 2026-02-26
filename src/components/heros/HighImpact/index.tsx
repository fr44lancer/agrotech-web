'use client'
import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  console.log('home media')
  console.log(media)
  return (
    <BaseWrapper className="relative bg-gradient-to-r from-teal to-green-700 text-white">
      <div className="w-full  select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="object-cover" priority resource={media} />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-teal/90 to-green-700/85"></div>
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-4">
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex md:justify-center gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </BaseWrapper>
  )
}
