import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { slugField } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Careers: CollectionConfig = {
  slug: 'careers',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Careers',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'department',
              type: 'text',
              localized: true,
            },
            {
              name: 'location',
              type: 'text',
              localized: true,
            },
            {
              name: 'type',
              type: 'text',
              localized: true,
              admin: {
                description: 'e.g., Full-time, Part-time',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              required: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            { ...MetaTitleField({ hasGenerateFn: false }), localized: true },
            MetaImageField({ relationTo: 'media' }),
            { ...MetaDescriptionField({}), localized: true },
            PreviewField({
              hasGenerateFn: false,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'careerCategories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
