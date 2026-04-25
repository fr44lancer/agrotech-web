import type { Block } from 'payload'

export const ChecklistCardsBlock: Block = {
  slug: 'checklistCardsBlock',
  interfaceName: 'ChecklistCardsBlock',
  imageURL: '/admin/previews/layouts/checkListCards.png',
  labels: {
    singular: 'Checklist Cards',
    plural: 'Checklist Cards',
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
      defaultValue: 'gray',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Light Gray', value: 'gray' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      localized: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon',
          defaultValue: 'CheckCircleOutlined',
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
