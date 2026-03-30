import React from 'react'
import Link from 'next/link'
import { Row, Col } from 'antd'
import type { StatsHighlightBlock as Props } from '@/payload-types'

const COL_SPAN: Record<string, number> = { '1': 24, '2': 12, '3': 8 }

export const StatsHighlightBlockComponent: React.FC<Props> = ({
  heading,
  subheading,
  highlightTitle,
  stats,
  statsColumns = '3',
  benefits,
  ctaLabel,
  ctaUrl,
}) => {
  const statColSpan = COL_SPAN[statsColumns ?? '3'] ?? 8

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>
            )}
          </div>
        )}

        {/* Highlight card */}
        {(highlightTitle || ((stats ?? []).length > 0) || ctaUrl) && (
          <div className="bg-gradient-to-br from-teal-800 to-gray-200 rounded-xl p-8 text-white mb-10">
            {highlightTitle && <h3 className="text-2xl font-bold mb-6">{highlightTitle}</h3>}
            {(stats ?? []).length > 0 && (
              <Row gutter={[40, 24]}>
                {(stats ?? []).map((stat, i) => (
                  <Col xs={24} md={statColSpan} key={stat.id ?? i}>
                    <div className="bg-gray-400/70 p-6 rounded-lg h-full">
                      <p className="text-white">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            {ctaUrl && (
              <Link
                href={ctaUrl}
                className="inline-block mt-6 bg-white text-teal-800 px-6 py-3 rounded-md font-semibold hover:bg-green-50 transition"
              >
                {ctaLabel || 'Learn More'}
              </Link>
            )}
          </div>
        )}

        {/* Benefits list */}
        {(benefits ?? []).length > 0 && (
          <Row justify="center">
            <Col xs={24} md={10}>
              <ul className="space-y-4">
                {(benefits ?? []).map((benefit, i) => (
                  <li key={benefit.id ?? i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-teal-800 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        )}
      </div>
    </section>
  )
}
