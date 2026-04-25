import type { Block } from 'payload'

export const WhatWeOfferBlock: Block = {
  slug: 'whatWeOfferBlock',

  imageURL: '/admin/previews/layouts/pageHeader.png',
  interfaceName: 'WhatWeOfferBlock',
  labels: {
    singular: 'What We Offer Section',
    plural: 'What We Offer Sections',
  },
  admin: { group: 'Special' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
      defaultValue: 'What We Offer',
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: 'Subheading',
      defaultValue: 'Comprehensive solutions for modern agriculture',
    },
    {
      name: 'categories',
      type: 'array',
      localized: true,
      label: 'Offer Categories',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Category Title',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Item',
            },
          ],
        },
      ],
    },
  ],
}
