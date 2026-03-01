import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'colorGradient',
      type: 'select',
      required: true,
      options: [
        { label: 'Green to Teal', value: 'from-green-400 to-teal-500' },
        { label: 'Gold to Green', value: 'from-amber-400 to-green-600' },
        { label: 'Green to Dark Teal', value: 'from-green-500 to-teal-700' },
        { label: 'Teal to Light Green', value: 'from-teal-500 to-green-400' },
      ],
      defaultValue: 'from-green-400 to-teal-500',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'productCategories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
