import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ArticleBlock: Block = {
  slug: 'articleBlock',
  interfaceName: 'ArticleBlock',
  labels: {
    singular: 'Article Block',
    plural: 'Article Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
    },
    {
      name: 'titleType',
      type: 'select',
      defaultValue: 'h2',
      options: [
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
      ],
      admin: {
        condition: (data, siblingData) => Boolean(siblingData?.title),
      },
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
        ],
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'imageAlignment',
          type: 'select',
          defaultValue: 'right',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            width: '50%',
            condition: (data, siblingData) => Boolean(siblingData?.image),
          },
        },
        {
          name: 'imageColPercent',
          type: 'select',
          defaultValue: '40',
          label: 'Image Width',
          options: [
            { label: '25%', value: '25' },
            { label: '33%', value: '33' },
            { label: '40%', value: '40' },
            { label: '50%', value: '50' },
          ],
          admin: {
            width: '50%',
            condition: (data, siblingData) => Boolean(siblingData?.image),
          },
        },
      ],
    },
  ],
}
