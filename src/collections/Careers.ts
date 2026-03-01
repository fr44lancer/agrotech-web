import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from 'payload'

export const Careers: CollectionConfig = {
  slug: 'careers',
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
      name: 'department',
      type: 'text',
      localized: true,
    },
    {
      name: 'location',
      type: 'text',
      localized: true,
    },
    {
      name: 'type',
      type: 'text',
      localized: true,
      admin: {
        description: 'e.g., Full-time, Part-time',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'careerCategories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      required: true,
    },
    slugField(),
  ],
}
