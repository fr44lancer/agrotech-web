import type { Block } from 'payload'

export const CultureBlock: Block = {
  slug: 'cultureBlock',
  interfaceName: 'CultureBlock',
  labels: {
    singular: 'Corporate Culture Section',
    plural: 'Corporate Culture Sections',
  },
  admin: { group: 'Special' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
      defaultValue: 'Corporate Culture',
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: 'Subheading',
    },
    {
      name: 'items',
      type: 'array',
      localized: true,
      label: 'Culture Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
        },
      ],
    },
  ],
}
