import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const PackagingTypes: CollectionConfig = {
  slug: 'packagingTypes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Catalog',
    useAsTitle: 'name',
    defaultColumns: ['name', 'updatedAt'],
    description: 'Packaging types for products (e.g. bag, container, bottle).',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Packaging Type Name',
      admin: {
        description: 'e.g. "Bag", "Container", "Bottle", "Box".',
      },
    },
  ],
}
