import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { CompanyValue } from '@/payload-types'

type Props = {
  heading?: string | null
  subheading?: string | null
  locale?: string
}

// Teal accent colors cycling through a set of shades for visual variety
const borderColors = [
  'border-teal-600',
  'border-green-600',
  'border-teal-500',
  'border-green-500',
  'border-teal-700',
  'border-green-700',
]

export async function ValuesBlockComponent({ heading, subheading, locale = 'hy' }: Props) {
  const payload = await getPayload({ config: configPromise })

  const { docs: values } = await payload.find({
    collection: 'companyValues',
    sort: 'order',
    limit: 100,
    locale: locale as any,
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value: CompanyValue, i: number) => (
            <div
              key={value.id}
              className={`bg-gray-50 rounded-lg p-6 border-l-4 ${borderColors[i % borderColors.length]}`}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
              {value.description && <p className="text-gray-600 leading-relaxed">{value.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
