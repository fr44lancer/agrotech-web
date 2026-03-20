import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const HeroSliderBlock: Block = {
  slug: 'heroSliderBlock',
  interfaceName: 'HeroSliderBlock',
  labels: {
    singular: 'Hero Slider',
    plural: 'Hero Sliders',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'Add 1–5 slides. Each slide shares the same layout as the home hero.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
          admin: {
            description: 'Full-width background image for this slide.',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          localized: true,
        },
        {
          name: 'slogan',
          type: 'text',
          label: 'Slogan / Subtitle',
          localized: true,
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          localized: true,
          admin: {
            description: 'Bullet-point features shown below the slogan.',
            initCollapsed: true,
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Feature text',
              required: true,
            },
          ],
        },
        linkGroup({ overrides: { maxRows: 2 } }),
      ],
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      label: 'Autoplay',
      defaultValue: true,
      admin: {
        description: 'Automatically advance slides every 5 seconds.',
        position: 'sidebar',
      },
    },
    {
      name: 'autoplayInterval',
      type: 'number',
      label: 'Autoplay interval (ms)',
      defaultValue: 5000,
      admin: {
        description: 'Milliseconds between slide transitions.',
        position: 'sidebar',
        condition: (_, { autoplay } = {}) => !!autoplay,
      },
    },
  ],
}
