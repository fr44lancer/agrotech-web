'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

type Category = { id: string; title: string; slug: string }

export default function CategorySelect({
  categories,
  locale,
  currentSlug,
  allLabel,
}: {
  categories: Category[]
  locale: string
  currentSlug?: string
  allLabel: string
}) {
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    router.push(val ? `/${locale}/products/${val}` : `/${locale}/products`)
  }

  return (
    <select
      value={currentSlug ?? ''}
      onChange={handleChange}
      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-sm"
    >
      <option value="">{allLabel}</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.slug}>
          {cat.title}
        </option>
      ))}
    </select>
  )
}
