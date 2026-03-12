import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const ContactLocations: CollectionConfig = {
  slug: 'contactLocations',
  labels: {
    singular: 'Contact Location',
    plural: 'Contact Locations',
  },
  admin: {
    group: 'Company',
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'order', 'updatedAt'],
    description: 'Office and department contact cards displayed on the Contacts page.',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Name',
      admin: {
        description: 'e.g. "Main Office & Showroom" or "Sales Department"',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'office',
      label: 'Type',
      options: [
        { label: 'Office', value: 'office' },
        { label: 'Department', value: 'department' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Determines which section on the Contacts page this card appears in.',
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
    {
      name: 'address',
      type: 'text',
      localized: true,
      label: 'Address',
    },
    {
      name: 'phones',
      type: 'array',
      label: 'Phone Numbers',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          label: 'Number',
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'mapUrl',
      type: 'text',
      label: 'Google Maps URL',
      admin: {
        description: 'Link to Google Maps for the "View on Map" button.',
      },
    },
  ],
}
