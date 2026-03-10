import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const PartnerBenefits: CollectionConfig = {
  slug: 'partnerBenefits',
  labels: {
    singular: 'Partnership Benefit',
    plural: 'Partnership Benefits',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    description: 'Benefit cards displayed on the Partners page.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
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
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      label: 'Order',
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first.',
      },
    },
  ],
}
