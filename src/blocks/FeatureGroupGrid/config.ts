import type { Block } from 'payload'

export const FeatureGroupGridBlock: Block = {
  slug: 'featureGroupGridBlock',
  interfaceName: 'FeatureGroupGridBlock',
  imageURL: '/admin/previews/layouts/featureGroupGrid.png',
  labels: {
    singular: 'Feature Group Grid',
    plural: 'Feature Group Grids',
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
      defaultValue: '2',
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
      name: 'groups',
      type: 'array',
      label: 'Groups',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Group Title',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              localized: true,
              label: 'Item Text',
            },
          ],
        },
      ],
    },
  ],
}
