import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const EventRegistrations: CollectionConfig = {
  slug: 'event-registrations',
  access: {
    // Anyone can register for an event from the frontend API
    create: () => true,
    // Only authenticated admins can read, update, or delete registrations
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Events',
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'event', 'createdAt'],
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
      required: true,
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
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
