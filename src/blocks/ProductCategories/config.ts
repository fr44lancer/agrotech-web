import type { Block } from 'payload'

export const ProductCategoriesBlock: Block = {
  slug: 'productCategoriesBlock',
  interfaceName: 'ProductCategoriesBlock',
  labels: {
    singular: 'Product Categories Section',
    plural: 'Product Categories Sections',
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
      name: 'learnMoreLabel',
      type: 'text',
      localized: true,
      label: 'Learn More Label',
      defaultValue: 'Learn More →',
    },
  ],
}
