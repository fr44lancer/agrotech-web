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

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Catalog',
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'identifier','updatedAt'],
    description: 'Product catalog entries. Not a shop — no pricing.',
    listSearchableFields: ['title', 'slug','identifier'],
  },
  fields: [
    // ── Core ──────────────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Product Name',
    },
    {
      name: 'identifier',
      type: 'text',
      label: 'Identifier',
      admin: {
        description: 'Custom product identifier or SKU (e.g. AGR-001).',
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'shortDescription',
              type: 'text',
              localized: true,
              label: 'Short Description',
              admin: {
                description: 'One-line summary shown on catalog cards.',
              },
            },
            {
              name: 'description',
              type: 'richText',
              localized: true,
              label: 'Full Description',
            },
            // ── Media ──────────────────────────────────────────────────────────
            {
              name: 'images',
              type: 'array',
              label: 'Images',
              admin: {
                description: 'First image is used as the main thumbnail on listing cards.',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Image',
                },
                {
                  name: 'alt',
                  type: 'text',
                  localized: true,
                  label: 'Alt text',
                },
              ],
            },
            // ── Key Features ───────────────────────────────────────────────────
            {
              name: 'features',
              type: 'array',
              label: 'Key Features',
              admin: {
                description: 'Bullet-point highlights shown on the detail page.',
              },
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: 'Feature',
                },
              ],
            },
            // ── Specifications ─────────────────────────────────────────────────
            {
              name: 'specifications',
              type: 'array',
              label: 'Specifications',
              admin: {
                description: 'Technical spec table (e.g. "Package sizes" / "1 kg, 5 kg, 20 kg").',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: 'Label',
                },
                {
                  name: 'value',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: 'Value',
                },
              ],
            },
            // ── Documents ──────────────────────────────────────────────────────
            {
              name: 'documents',
              type: 'array',
              label: 'Documents & Downloads',
              admin: {
                description: 'Datasheets, brochures, safety sheets etc.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: 'Label',
                  admin: {
                    description: 'e.g. "Product Datasheet" or "Safety Data Sheet"',
                  },
                },
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'File',
                },
              ],
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

    // ── Sidebar ───────────────────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      label: 'Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Discontinued', value: 'discontinued' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured product',
      admin: {
        position: 'sidebar',
        description: 'Highlighted on the category listing.',
      },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'productCategories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}
