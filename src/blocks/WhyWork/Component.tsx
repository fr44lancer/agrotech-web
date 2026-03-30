import React from 'react'
import { IconRenderer } from '@/components/IconPicker/IconRenderer'

type Item = {
  icon?: string | null
  title?: string | null
  description?: string | null
}

type Props = {
  heading?: string | null
  subheading?: string | null
  items?: Item[]
}

export function WhyWorkBlockComponent({ heading, subheading, items = [] }: Props) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">{subheading}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, i) => {
            return (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconRenderer name={item.icon} style={{ fontSize: '28px', color: '#fff' }} />
                </div>
                {item.title && (
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                )}
                {item.description && <p className="text-gray-600">{item.description}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
