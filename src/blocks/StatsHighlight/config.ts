import type { Block } from 'payload'

export const StatsHighlightBlock: Block = {
  slug: 'statsHighlightBlock',
  interfaceName: 'StatsHighlightBlock',
  labels: {
    singular: 'Stats Highlight',
    plural: 'Stats Highlights',
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
      name: 'highlightTitle',
      type: 'text',
      localized: true,
      label: 'Highlight Card Title',
      admin: {
        description: 'Bold title shown inside the gradient card',
      },
    },
    {
      name: 'stats',
      type: 'array',
      localized: true,
      label: 'Stats',
      admin: {
        description: 'Key figures shown as boxes inside the highlight card (e.g. "Annual Rate" / "4.5%")',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
        },
      ],
    },
    {
      name: 'statsColumns',
      type: 'select',
      label: 'Stats Columns',
      defaultValue: '3',
      options: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      label: 'Button Label',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Button URL',
    },
    {
      name: 'benefits',
      type: 'array',
      localized: true,
      label: 'Benefits / Bullet Points',
      admin: {
        description: 'Checklist shown below the highlight card',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Text',
        },
      ],
    },
  ],
}
