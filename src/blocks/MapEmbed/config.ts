import type { Block } from 'payload'

export const MapEmbedBlock: Block = {
  slug: 'mapEmbedBlock',
  interfaceName: 'MapEmbedBlock',
  labels: {
    singular: 'Map Embed',
    plural: 'Map Embeds',
  },
  admin: { group: 'Common' },
  fields: [
    {
      name: 'embedUrl',
      type: 'text',
      label: 'Map Embed URL',
      required: true,
      admin: {
        description:
          'Paste the iframe src URL from Yandex Maps (Share → Embed → copy only the src="..." value).',
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (px)',
      defaultValue: 450,
      admin: {
        description: 'Map height in pixels.',
      },
    },
  ],
}
