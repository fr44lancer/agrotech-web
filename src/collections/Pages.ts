import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { ValuesBlock } from '@/blocks/Values/config'
import { CultureBlock } from '@/blocks/CultureItems/config'
import { WhatWeOfferBlock } from '@/blocks/WhatWeOffer/config'
import { FinancialReportingBlock } from '@/blocks/FinancialReporting/config'
import { CorporateBondsBlock } from '@/blocks/CorporateBonds/config'
import { PageHeroBlock } from '@/blocks/PageHero/config'
import { WhyWorkBlock } from '@/blocks/WhyWork/config'
import { ArticleBlock } from '@/blocks/Article/config'
import { HeroSliderBlock } from '@/blocks/HeroSlider/config'
import { MapEmbedBlock } from '@/blocks/MapEmbed/config'
import { ProductCategoriesBlock } from '@/blocks/ProductCategories/config'
import { ServicesBlock } from '@/blocks/Services/config'
import { FileDownloadsBlock } from '@/blocks/FileDownloads/config'
import { AccentCardGridBlock } from '@/blocks/AccentCardGrid/config'
import { ChecklistCardsBlock } from '@/blocks/ChecklistCards/config'
import { FeatureGroupGridBlock } from '@/blocks/FeatureGroupGrid/config'
import { StatsHighlightBlock } from '@/blocks/StatsHighlight/config'
import { IconCardsBlock } from '@/blocks/IconCards/config'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateDelete, revalidatePage } from '@/hooks/revalidatePage'
import { hero } from '@/components/heros/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },

  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                AccentCardGridBlock,
                ArticleBlock,
                ChecklistCardsBlock,
                CorporateBondsBlock,
                CultureBlock,
                FeatureGroupGridBlock,
                FileDownloadsBlock,
                FinancialReportingBlock,
                HeroSliderBlock,
                IconCardsBlock,
                MapEmbedBlock,
                PageHeroBlock,
                ProductCategoriesBlock,
                ServicesBlock,
                StatsHighlightBlock,
                ValuesBlock,
                WhatWeOfferBlock,
                WhyWorkBlock,
              ],
              required: true,
              localized: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            { ...MetaTitleField({ hasGenerateFn: false }), localized: true },
            MetaImageField({ relationTo: 'media' }),
            { ...MetaDescriptionField({}), localized: true },
            PreviewField({
              hasGenerateFn: false,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
