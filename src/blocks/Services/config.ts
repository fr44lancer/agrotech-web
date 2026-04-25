import type { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'servicesBlock',
  interfaceName: 'ServicesBlock',
  labels: {
    singular: 'Services Section',
    plural: 'Services Sections',
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
  ],
}
