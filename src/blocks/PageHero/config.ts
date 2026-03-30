import type { Block } from 'payload'

export const PageHeroBlock: Block = {
  slug: 'pageHeroBlock',
  interfaceName: 'PageHeroBlock',
  imageURL: '/admin/previews/layouts/pageHeader.png',
  labels: {
    singular: 'Page Header',
    plural: 'Page Headers',
  },
  admin: { group: 'Common' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
    },
  ],
}
