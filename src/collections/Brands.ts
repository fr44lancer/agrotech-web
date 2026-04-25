import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from 'payload'

export const Brands: CollectionConfig = {
  slug: 'brands',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Brands',
    useAsTitle: 'title',
    defaultColumns: ['title', 'websiteUrl', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Brand name',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media'
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'websiteUrl',
      type: 'text',
    },
    slugField(),
  ],
}
