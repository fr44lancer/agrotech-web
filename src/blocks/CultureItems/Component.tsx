import React from 'react'
import type { CultureBlock as CultureBlockProps } from '@/payload-types'

export const CultureBlockComponent: React.FC<CultureBlockProps> = ({ heading, subheading, items }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>}
          </div>
        )}

        {items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {items.map((item, i) => (
              <div key={item.id ?? i} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    {item.description && <p className="text-gray-600 leading-relaxed">{item.description}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
