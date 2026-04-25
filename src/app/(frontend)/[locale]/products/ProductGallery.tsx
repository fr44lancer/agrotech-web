'use client'

import { Image } from 'antd';
import React, { useState } from 'react'

type ImageItem = {
  image?: { url?: string | null; alt?: string | null } | null | string
  alt?: string | null
}

export default function ProductGallery({ images }: { images: ImageItem[] }) {
  const urls = images
    .map((item) => ({
      url: typeof item.image === 'object' ? item.image?.url : null,
      alt: item.alt ?? (typeof item.image === 'object' ? item.image?.alt : null) ?? '',
    }))
    .filter((i) => i.url)

  const [active, setActive] = useState(0)

  if (urls.length === 0) {
    return (
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-green-300 to-teal-400 flex items-center justify-center">
        <svg className="w-32 h-32 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
        <Image
          src={urls[active]!.url!}
          alt={urls[active]!.alt ?? ''}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnails */}
      {urls.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {urls.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                i === active ? 'border-teal-500' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <img src={item.url!} alt={item.alt ?? ''} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
