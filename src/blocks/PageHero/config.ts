import type { Block } from 'payload'

export const PageHeroBlock: Block = {
  slug: 'pageHeroBlock',
  interfaceName: 'PageHeroBlock',
  labels: {
    singular: 'Page Hero',
    plural: 'Page Heroes',
  },
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
      admin: {
        description: 'Optional additional paragraph below the subtitle.',
      },
    },
  ],
}
