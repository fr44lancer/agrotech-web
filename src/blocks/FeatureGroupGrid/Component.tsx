import React from 'react'
import { Row, Col } from 'antd'
import type { FeatureGroupGridBlock as Props } from '@/payload-types'

const COL_SPAN: Record<string, number> = { '1': 24, '2': 12, '3': 8 }

const SECTION_BG: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
}

const CARD_BG: Record<string, string> = {
  white: 'bg-gray-50',
  gray: 'bg-white',
}

export const FeatureGroupGridBlockComponent: React.FC<Props> = ({
  heading,
  subheading,
  columns = '2',
  background = 'white',
  groups,
}) => {
  const colSpan = COL_SPAN[columns ?? '2'] ?? 12
  const sectionBg = SECTION_BG[background ?? 'white'] ?? 'bg-white'
  const cardBg = CARD_BG[background ?? 'white'] ?? 'bg-gray-50'

  return (
    <section className={`py-16 ${sectionBg}`}>
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

        <Row gutter={[40, 40]} justify="space-between" style={{ alignItems: 'stretch' }}>
          {(groups ?? []).map((group, i) => (
            <Col key={group.id ?? i} xs={24} md={colSpan} style={{ display: 'flex' }}>
              <div
                className={`${cardBg} rounded-lg p-6 border border-gray-100 h-full w-full`}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b border-teal-900">
                  {group.title}
                </h3>
                {group.items && group.items.length > 0 && (
                  <ul className="space-y-2">
                    {(group.items ?? []).map((item, j) => (
                      <li key={item.id ?? j} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-teal-950 flex-shrink-0 mt-0.5"
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
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
