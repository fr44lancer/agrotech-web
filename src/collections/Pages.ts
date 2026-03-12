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
import { Content } from '@/blocks/Content/config'
import { Banner } from '@/blocks/Banner/config'
import { CallToAction } from '@/blocks/CallToAction/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { ValuesBlock } from '@/blocks/Values/config'
import { CultureBlock } from '@/blocks/CultureItems/config'
import { WhatWeOfferBlock } from '@/blocks/WhatWeOffer/config'
import { FinancialReportingBlock } from '@/blocks/FinancialReporting/config'
import { CorporateBondsBlock } from '@/blocks/CorporateBonds/config'
import { PageHeroBlock } from '@/blocks/PageHero/config'
import { WhyWorkBlock } from '@/blocks/WhyWork/config'
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
                Content,
                Banner,
                CallToAction,
                MediaBlock,
                ValuesBlock,
                CultureBlock,
                WhatWeOfferBlock,
                FinancialReportingBlock,
                CorporateBondsBlock,
                PageHeroBlock,
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
          localized: true,
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
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
