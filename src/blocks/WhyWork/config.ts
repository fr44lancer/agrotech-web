import type { Block } from 'payload'

export const WhyWorkBlock: Block = {
  slug: 'whyWorkBlock',
  interfaceName: 'WhyWorkBlock',
  labels: {
    singular: 'Why Work Section',
    plural: 'Why Work Sections',
  },
  admin: { group: 'Special' },
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
      name: 'items',
      type: 'array',
      label: 'Reasons',
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
