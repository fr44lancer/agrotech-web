import React from 'react'
import type { MapEmbedBlock as MapEmbedBlockProps } from '@/payload-types'

export const MapEmbedBlockComponent: React.FC<MapEmbedBlockProps> = ({ embedUrl, height }) => {
  if (!embedUrl) return null

  return (
    <div className="w-full" style={{ height: height ?? 450 }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
        style={{ display: 'block' }}
      />
    </div>
  )
}
