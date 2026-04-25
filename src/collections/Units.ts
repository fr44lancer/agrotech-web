import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Units: CollectionConfig = {
  slug: 'units',
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
    description: 'Measurement units for products (e.g. kg, meter, liter).',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Unit Name',
      admin: {
        description: 'Full name (e.g. "Kilogram", "Meter", "Liter").',
      },
    },
  ],
}
