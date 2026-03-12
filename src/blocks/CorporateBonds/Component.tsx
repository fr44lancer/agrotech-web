import React from 'react'
import Link from 'next/link'
import type { CorporateBondsBlock as CorporateBondsBlockProps } from '@/payload-types'

export const CorporateBondsBlockComponent: React.FC<CorporateBondsBlockProps> = ({
  heading,
  subheading,
  productName,
  stats,
  benefits,
  ctaLabel,
  ctaUrl,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Product details */}
          <div className="bg-gradient-to-br from-teal-600 to-green-700 rounded-xl p-8 text-white">
            {productName && (
              <h3 className="text-2xl font-bold mb-6">{productName}</h3>
            )}
            {stats && stats.length > 0 && (
              <div className="space-y-4">
                {stats.map((stat, i) => (
                  <div key={stat.id ?? i} className="flex justify-between items-center border-b border-white/20 pb-3 last:border-0">
                    <span className="text-green-100">{stat.label}</span>
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                ))}
              </div>
            )}
            {ctaUrl && (
              <Link
                href={ctaUrl}
                className="inline-block mt-6 bg-white text-teal-700 px-6 py-3 rounded-md font-semibold hover:bg-green-50 transition"
              >
                {ctaLabel || 'Learn More'}
              </Link>
            )}
          </div>

          {/* Benefits */}
          {benefits && benefits.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Why Invest</h3>
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={benefit.id ?? i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
