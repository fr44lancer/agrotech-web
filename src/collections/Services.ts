import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'iconSvg',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Provide the raw SVG string for the icon',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'serviceCategories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
