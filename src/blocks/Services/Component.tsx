import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { IconRenderer } from '@/components/IconPicker/IconRenderer'

type Props = {
  heading?: string | null
  subheading?: string | null
  locale?: string
}

function str(value: any, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return value[locale] ?? value['hy'] ?? Object.values(value)[0] ?? ''
  return String(value)
}

export async function ServicesBlockComponent({ heading, subheading, locale = 'hy' }: Props) {
  const payload = await getPayload({ config: configPromise })
  const { docs: services } = await payload.find({
    collection: 'services',
    locale: locale as any,
    limit: 100,
  })

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 w-full max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-16">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{str(heading, locale)}</h2>
            )}
            {subheading && (
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">{str(subheading, locale)}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service: any) => {
            return (
              <div key={service.id} className="text-center p-6 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-teal-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconRenderer name={service.icon} style={{ fontSize: '28px', color: '#fff' }} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
