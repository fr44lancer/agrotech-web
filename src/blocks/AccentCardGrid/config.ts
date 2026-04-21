import type { Block } from 'payload'

export const AccentCardGridBlock: Block = {
  slug: 'accentCardGridBlock',
  interfaceName: 'AccentCardGridBlock',
  imageURL: '/admin/previews/layouts/accentCardGrid.png',
  labels: {
    singular: 'Accent Card Grid',
    plural: 'Accent Card Grids',
  },
  admin: { group: 'Common' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: 'Subheading',
    },
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      required: true,
      defaultValue: '3',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
    },
    {
      name: 'background',
      type: 'select',
      label: 'Section Background',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      localized: true,
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
