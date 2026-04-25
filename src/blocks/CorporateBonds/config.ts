import type { Block } from 'payload'

export const CorporateBondsBlock: Block = {
  slug: 'corporateBondsBlock',
  interfaceName: 'CorporateBondsBlock',
  labels: {
    singular: 'Corporate Bonds Section',
    plural: 'Corporate Bonds Sections',
  },
  admin: { group: 'Special' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
      defaultValue: 'Corporate Bonds',
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: 'Subheading',
      defaultValue: 'Investment opportunities in sustainable agriculture',
    },
    {
      name: 'productName',
      type: 'text',
      localized: true,
      label: 'Product Name',
    },
    {
      name: 'stats',
      type: 'array',
      localized: true,
      label: 'Key Stats',
      admin: {
        description: 'e.g. "Annual Interest Rate" / "4.5%"',
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
      name: 'benefits',
      type: 'array',
      localized: true,
      label: 'Benefits',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Benefit',
        },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      label: 'Button Label',
      defaultValue: 'Learn More',
    },
    {
      name: 'ctaUrl',
      type: 'text',
      label: 'Button URL',
    },
  ],
}
