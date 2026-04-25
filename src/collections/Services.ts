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
    group: 'Catalog',
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
      name: 'icon',
      type: 'text',
      label: 'Icon',
      defaultValue: 'ThunderboltOutlined',
      admin: {
        components: {
          Field: '@/components/IconPicker/index#IconPickerField',
        },
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
