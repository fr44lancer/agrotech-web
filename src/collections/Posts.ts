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
import { revalidateDelete } from '@/hooks/revalidatePage'
import { populateAuthors } from '@/hooks/populateAuthors'
import { revalidatePost } from '@/hooks/revalidatePost'
import { ValuesBlock } from '@/blocks/Values/config'
import { CultureBlock } from '@/blocks/CultureItems/config'
import { WhatWeOfferBlock } from '@/blocks/WhatWeOffer/config'
import { FinancialReportingBlock } from '@/blocks/FinancialReporting/config'
import { CorporateBondsBlock } from '@/blocks/CorporateBonds/config'
import { PageHeroBlock } from '@/blocks/PageHero/config'
import { WhyWorkBlock } from '@/blocks/WhyWork/config'
import { ArticleBlock } from '@/blocks/Article/config'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'posts',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'posts',
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
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Short summary shown on listing/cards.',
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              localized: true,
              blocks: [
                ArticleBlock,
                ValuesBlock,
                CultureBlock,
                WhatWeOfferBlock,
                FinancialReportingBlock,
                CorporateBondsBlock,
                PageHeroBlock,
                WhyWorkBlock,
              ],
              admin: {
                initCollapsed: true,
                description: 'Build the article body using content blocks.',
              },
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => ({
                id: { not_in: [id] },
              }),
              hasMany: true,
              relationTo: 'posts',
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
            },
            {
              name: 'tags',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'tags',
            },
          ],
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
        date: { pickerAppearance: 'dayAndTime' },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: { position: 'sidebar' },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: { update: () => false },
      admin: { disabled: true, readOnly: true },
      fields: [
        { name: 'id', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: { interval: 100 },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
