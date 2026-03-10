import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ValuesBlockComponent } from '@/blocks/Values/Component'
import { CultureBlockComponent } from '@/blocks/CultureItems/Component'
import { WhatWeOfferBlockComponent } from '@/blocks/WhatWeOffer/Component'
import { FinancialReportingBlockComponent } from '@/blocks/FinancialReporting/Component'
import { CorporateBondsBlockComponent } from '@/blocks/CorporateBonds/Component'

const blockComponents: Record<string, React.FC<any>> = {
  banner: BannerBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  mediaBlock: MediaBlock,
  valuesBlock: ValuesBlockComponent as unknown as React.FC<any>,
  cultureBlock: CultureBlockComponent,
  whatWeOfferBlock: WhatWeOfferBlockComponent,
  financialReportingBlock: FinancialReportingBlockComponent,
  corporateBondsBlock: CorporateBondsBlockComponent,
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
