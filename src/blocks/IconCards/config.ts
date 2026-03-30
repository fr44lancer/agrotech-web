import type { Block } from 'payload'

export const IconCardsBlock: Block = {
  slug: 'iconCardsBlock',
  interfaceName: 'IconCardsBlock',
  imageURL: '/admin/previews/layouts/iconCards.png',
  labels: {
    singular: 'Icon Cards',
    plural: 'Icon Cards',
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
        { label: '4 Columns', value: '4' },
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
      name: 'iconColor',
      type: 'select',
      label: 'Icon Circle Color',
      defaultValue: 'teal',
      options: [
        { label: 'Teal', value: 'teal' },
        { label: 'Dark Teal', value: 'darkteal' },
        { label: 'Green', value: 'green' },
        { label: 'Gray', value: 'gray' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon',
          defaultValue: 'ThunderboltOutlined',
          admin: {
            components: {
              Field: '@/components/IconPicker/index#IconPickerField',
            },
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'text',
          localized: true,
          label: 'Description',
        },
      ],
    },
  ],
}
