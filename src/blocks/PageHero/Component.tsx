import React from 'react'

type Props = {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  locale?: string
}

function str(value: any, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return value[locale] ?? value['hy'] ?? Object.values(value)[0] ?? ''
  return String(value)
}

export function PageHeroBlockComponent({ title, subtitle, description, locale = 'hy' }: Props) {
  return (
    <section className="bg-gradient-to-r from-teal-800 to-gray-200 text-white py-16 px-6 ">
      <div className="container mx-auto px-6 ">
        {title && <h1 className="text-4xl md:text-5xl font-bold mb-4">{str(title, locale)}</h1>}
        {subtitle && <p className="text-xl text-green-50">{str(subtitle, locale)}</p>}
        {description && <p className="text-lg text-green-100 mt-4 max-w-2xl">{str(description, locale)}</p>}
      </div>
    </section>
  )
}
