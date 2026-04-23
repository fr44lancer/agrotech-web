'use client'

import React from 'react'
import { Select } from 'antd'
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

  const options = [
    { value: '', label: allLabel },
    ...categories.map((cat) => ({ value: cat.slug, label: cat.title })),
  ]

  const handleChange = (val: string) => {
    router.push(val ? `/${locale}/products/${val}` : `/${locale}/products`)
  }

  return (
    <Select
      value={currentSlug ?? ''}
      onChange={handleChange}
      options={options}
      className="w-full"
      size="medium"
    />
  )
}
