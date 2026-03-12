import React from 'react'
import type { WhatWeOfferBlock as WhatWeOfferBlockProps } from '@/payload-types'

export const WhatWeOfferBlockComponent: React.FC<WhatWeOfferBlockProps> = ({
  heading,
  subheading,
  categories,
}) => {
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

        {categories && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <div key={cat.id ?? i} className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-teal-200">
                  {cat.title}
                </h3>
                {cat.items && cat.items.length > 0 && (
                  <ul className="space-y-2">
                    {cat.items.map((item, j) => (
                      <li key={item.id ?? j} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
