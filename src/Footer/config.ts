import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    // ── Company info ──────────────────────────────────────────────────────────
    {
      name: 'companyName',
      type: 'text',
      localized: true,
      defaultValue: 'AGROTECH LLC',
    },
    {
      name: 'companyTagline',
      type: 'textarea',
      localized: true,
      defaultValue:
        'Supplying greenhouses and farmers with high-quality products and agronomic guidance since 2014.',
    },

    // ── Contact info (4th column) ─────────────────────────────────────────────
    {
      name: 'contact',
      type: 'group',
      label: 'Footer Contact Info',
      fields: [
        {
          name: 'columnLabel',
          label: 'Footer Column Label',
          type: 'text',
          localized: true,
          defaultValue: 'Contact Us',
        },
        {
          name: 'address',
          label: 'Address text',
          type: 'text',
          localized: true,
        },
        {
          name: 'addressUrl',
          label: 'Map Embed URL',
          type: 'text',
          admin: {
            description:
              'Paste the iframe src URL from Yandex Maps (Share → Embed → copy only the src="..." value).',
            }
        },
        {
          name: 'phone',
          label: 'Phone number',
          type: 'text',
          localized: false,
        },
        {
          name: 'email',
          type: 'email',
          localized: false,
        },
      ],
    },

    // ── Navigation columns ────────────────────────────────────────────────────
    {
      name: 'navColumns',
      type: 'array',
      label: 'Footer Navigation',
      localized: true,
      maxRows: 2,
      admin: {
        description: 'Up to 2 link columns shown in the footer.',
      },
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: [link({ appearances: false })],
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },

    // ── Social links ──────────────────────────────────────────────────────────
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      admin: {
        description: 'Shown in the footer and on the Contacts page.',
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon',
          defaultValue: 'FacebookOutlined',
          required: true,
          admin: {
            components: {
              Field: '@/components/IconPicker/index#IconPickerField',
            },
          },
        },
      ],
    },

    // ── Copyright ─────────────────────────────────────────────────────────────
    {
      name: 'copyrightSuffix',
      type: 'text',
      localized: true,
      label: 'Copyright Suffix',
      defaultValue: 'AGROTECH LLC. All rights reserved.',
      admin: {
        description: 'The current year and © symbol are added automatically. Only edit the text after the year.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
