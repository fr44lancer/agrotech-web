import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  localized: true,
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      localized: true,
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Home Hero',
          value: 'homeHero',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },

    // ── Home Hero fields ────────────────────────────────────────────
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
        description: 'Full-width background image for the hero section.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },
    {
      name: 'slogan',
      type: 'text',
      label: 'Slogan',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
      },
    },
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => type === 'homeHero',
        description: 'Bullet-point features shown below the slogan.',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Feature text',
          required: true,
        },
      ],
    },

    // ── Shared fields (other hero types) ───────────────────────────
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      admin: {
        condition: (_, { type } = {}) => type !== 'homeHero',
      },
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      localized: true,
      admin: {
        condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
  ],
  label: false,
}
