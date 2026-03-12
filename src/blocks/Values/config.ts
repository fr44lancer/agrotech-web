import type { Block } from 'payload'

export const ValuesBlock: Block = {
  slug: 'valuesBlock',
  interfaceName: 'ValuesBlock',
  labels: {
    singular: 'Our Values Section',
    plural: 'Our Values Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: 'Heading',
      defaultValue: 'Our Values',
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: 'Subheading',
      defaultValue: 'The principles that guide everything we do',
    },
  ],
}
