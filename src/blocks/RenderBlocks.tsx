import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { ValuesBlockComponent } from '@/blocks/Values/Component'
import { CultureBlockComponent } from '@/blocks/CultureItems/Component'
import { WhatWeOfferBlockComponent } from '@/blocks/WhatWeOffer/Component'
import { FinancialReportingBlockComponent } from '@/blocks/FinancialReporting/Component'
import { CorporateBondsBlockComponent } from '@/blocks/CorporateBonds/Component'
import { PageHeroBlockComponent } from '@/blocks/PageHero/Component'
import { WhyWorkBlockComponent } from '@/blocks/WhyWork/Component'
import { ArticleBlockComponent } from '@/blocks/Article/Component'
import { HeroSliderBlockComponent } from '@/blocks/HeroSlider/Component'

const blockComponents: Record<string, React.FC<any>> = {
  valuesBlock: ValuesBlockComponent as unknown as React.FC<any>,
  cultureBlock: CultureBlockComponent,
  whatWeOfferBlock: WhatWeOfferBlockComponent,
  financialReportingBlock: FinancialReportingBlockComponent,
  corporateBondsBlock: CorporateBondsBlockComponent,
  pageHeroBlock: PageHeroBlockComponent,
  whyWorkBlock: WhyWorkBlockComponent,
  articleBlock: ArticleBlockComponent,
  heroSliderBlock: HeroSliderBlockComponent,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  locale?: string
}> = (props) => {
  const { blocks, locale } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} locale={locale} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
