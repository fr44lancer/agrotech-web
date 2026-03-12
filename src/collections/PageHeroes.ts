import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'

export const PageHeroes: CollectionConfig = {
  slug: 'pageHeroes',
  labels: {
    singular: 'Page Hero',
    plural: 'Page Heroes',
  },
  admin: {
    useAsTitle: 'pageKey',
    defaultColumns: ['pageKey', 'title', 'updatedAt'],
    description:
      'Hero banner content for dedicated pages (Events, Careers, Products, Contacts, Partners).',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  fields: [
    {
      name: 'pageKey',
      type: 'select',
      required: true,
      unique: true,
      label: 'Page',
      options: [
        { label: 'Events & Conferences', value: 'events' },
        { label: 'Careers', value: 'careers' },
        { label: 'Products', value: 'products' },
        { label: 'Contacts', value: 'contacts' },
        { label: 'Partners', value: 'partners' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which page this hero applies to.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: 'Subtitle',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
      admin: {
        description: 'Optional additional paragraph below the subtitle.',
      },
    },
  ],
}
