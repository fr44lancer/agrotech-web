import React from 'react'

type Props = {
  title?: string | null
  subtitle?: string | null
  description?: string | null
}

export function PageHeroBlockComponent({ title, subtitle, description }: Props) {
  return (
    <section className="bg-gradient-to-r from-teal-700 to-green-700 text-white py-16">
      <div className="container mx-auto px-6 max-w-7xl">
        {title && <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>}
        {subtitle && <p className="text-xl text-green-50">{subtitle}</p>}
        {description && <p className="text-lg text-green-100 mt-4 max-w-2xl">{description}</p>}
      </div>
    </section>
  )
}
