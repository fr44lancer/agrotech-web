import type { Block } from 'payload'

export const FileDownloadsBlock: Block = {
  slug: 'fileDownloadsBlock',
  interfaceName: 'FileDownloadsBlock',
  imageURL: '/admin/previews/layouts/fileDownloads.png',
  labels: {
    singular: 'File Downloads Section',
    plural: 'File Downloads Sections',
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
      label: 'Number of Columns',
      required: true,
      defaultValue: '2',
      options: [
        { label: '1 Column', value: '1' },
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
      ],
    },
    {
      name: 'columnList',
      type: 'array',
      label: 'Columns',
      localized: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Add 1–3 columns. Number should match the "Number of Columns" setting above.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Column Title (optional)',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          minRows: 1,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label',
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'File (optional)',
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL (used if no file uploaded)',
            },
          ],
        },
      ],
    },
  ],
}
