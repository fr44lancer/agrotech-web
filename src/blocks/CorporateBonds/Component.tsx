import React from 'react'
import Link from 'next/link'
import type { CorporateBondsBlock as CorporateBondsBlockProps } from '@/payload-types'
import { Col, Row } from 'antd'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'

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
        <Row>
          {(heading || subheading) && (
            <Col xs={24} className="text-center mb-12">
              {heading && (
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{heading}</h2>
              )}
              {subheading && (
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subheading}</p>
              )}
            </Col>
          )}

          <Col xs={24}>
            {/* Product details */}
            <div className="bg-gradient-to-br from-teal-800 to-gray-200 rounded-xl p-8 text-white">
              {productName && <h3 className="text-2xl font-bold mb-6">{productName}</h3>}
              {stats && stats.length > 0 && (
                <Row gutter={[40, 24]}>
                  {stats.map((stat, i) => (
                    <Col xs={24} md={8} key={stat.id ?? i}>
                      <BaseWrapper className={'bg-gray-400/70 p-6 rounded-lg'}>
                        <p className="text-white">{stat.label}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </BaseWrapper>
                    </Col>
                  ))}
                </Row>
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
          </Col>

          <Col xs={24}>
            {/* Benefits */}
            {benefits && benefits.length > 0 && (
              <Row justify={'center'} className="mt-12">
                <Col xs={24} md={8}>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Why Invest</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, i) => (
                      <li key={benefit.id ?? i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-100 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5">
                          <svg
                            className="w-3.5 h-3.5 text-teal-700"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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
          </Col>
        </Row>
      </div>
    </section>
  )
}
