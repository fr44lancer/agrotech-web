import type { Block } from 'payload'

export const WhyWorkBlock: Block = {
  slug: 'whyWorkBlock',
  interfaceName: 'WhyWorkBlock',
  labels: {
    singular: 'Why Work Section',
    plural: 'Why Work Sections',
  },
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
          type: 'select',
          label: 'Icon',
          defaultValue: 'lightning',
          options: [
            { label: 'Lightning / Innovation', value: 'lightning' },
            { label: 'Globe / Global Impact', value: 'globe' },
            { label: 'People / Team', value: 'people' },
            { label: 'Star / Excellence', value: 'star' },
            { label: 'Leaf / Sustainability', value: 'leaf' },
            { label: 'Chart / Growth', value: 'chart' },
            { label: 'Shield / Security', value: 'shield' },
            { label: 'Heart / Culture', value: 'heart' },
          ],
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
