import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const CareerApplications: CollectionConfig = {
  slug: 'careerApplications',
  labels: {
    singular: 'Career Application',
    plural: 'Career Applications',
  },
  admin: {
    group: 'Careers',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'career', 'createdAt'],
    description: 'Applications submitted via the Apply Now form.',
    listSearchableFields: ['name', 'email','career','phone','message'],

  },
  access: {
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'career',
      type: 'relationship',
      relationTo: 'careers',
      label: 'Position Applied For',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Cover Letter / Message',
    },
  ],
  timestamps: true,
}
