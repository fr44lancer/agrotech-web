'use client'

import React from 'react'
import { Select } from 'antd'
import { useRouter } from 'next/navigation'

type Brand = { id: string; title: string; slug: string }

export default function BrandSelect({
  brands,
  locale,
  categorySlug,
  currentSlug,
  allLabel,
}: {
  brands: Brand[]
  locale: string
  categorySlug?: string
  currentSlug?: string
  allLabel: string
}) {
  const router = useRouter()

  const options = [
    { value: '', label: allLabel },
    ...brands.map((b) => ({ value: b.slug, label: b.title })),
  ]

  const handleChange = (val: string) => {
    const base = categorySlug
      ? `/${locale}/products/${categorySlug}`
      : `/${locale}/products`
    router.push(val ? `${base}?brand=${val}` : base)
  }

  return (
    <Select
      value={currentSlug ?? ''}
      onChange={handleChange}
      options={options}
      className="w-full"
      size="medium"
      listHeight={280}
      virtual={false}
      getPopupContainer={triggerNode => triggerNode.parentElement}
    />
  )
}
