import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const PartnerTestimonials: CollectionConfig = {
  slug: 'partnerTestimonials',
  labels: {
    singular: 'Partner Testimonial',
    plural: 'Partner Testimonials',
  },
  admin: {
    useAsTitle: 'authorName',
    defaultColumns: ['authorName', 'authorTitle', 'order', 'updatedAt'],
    description: 'Testimonial quotes displayed on the Partners page.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Quote',
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'authorTitle',
      type: 'text',
      localized: true,
      label: 'Author Title / Organization',
      admin: {
        description: 'e.g. "CEO, Asia Pacific Agri"',
      },
    },
    {
      name: 'partner',
      type: 'relationship',
      relationTo: 'partners',
      label: 'Partner (optional)',
      admin: {
        position: 'sidebar',
      },
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
