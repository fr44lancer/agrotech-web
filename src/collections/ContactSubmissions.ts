import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contactSubmissions',
  labels: {
    singular: 'Contact Submission',
    plural: 'Contact Submissions',
  },
  admin: {
    group: 'Company',
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'subject', 'createdAt'],
    description: 'Messages submitted through the Contact Us form.',
  },
  access: {
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'subject',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
  ],
}
