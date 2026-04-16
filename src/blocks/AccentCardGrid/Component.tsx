import React from 'react'
import { Row, Col } from 'antd'
import type { AccentCardGridBlock as Props } from '@/payload-types'

const ACCENT_COLORS = ['#0d9488', '#16a34a', '#0f766e', '#15803d', '#0891b2', '#059669']
const ACCENT_COLOR = '#15803d'
const border = 'border-green-600'

const COL_SPAN: Record<string, number> = { '1': 24, '2': 12, '3': 8 }

const SECTION_BG: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
}

const CARD_BG: Record<string, string> = {
  white: 'bg-gray-50',
  gray: 'bg-white',
}

export const AccentCardGridBlockComponent: React.FC<Props> = ({
  heading,
  subheading,
  columns = '3',
  background = 'white',
  items,
}) => {
  const colSpan = COL_SPAN[columns ?? '3'] ?? 8
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

        <Row gutter={[32, 32]}>
          {(items ?? []).map((item, i) => (
            <Col key={item.id ?? i} xs={24} sm={colSpan}>
              <div
                className={`${cardBg} rounded-lg p-6 h-full border-l-4 ${border}`}
                //style={{ borderLeft: `4px solid ${ACCENT_COLORS[i % ACCENT_COLORS.length]}` }}
                //style={{ borderLeft: `4px solid ${ACCENT_COLOR}` }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
