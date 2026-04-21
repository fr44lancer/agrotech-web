import React from 'react'
import { Row, Col } from 'antd'
import type { ChecklistCardsBlock } from '@/payload-types'
import { IconRenderer } from '@/components/IconPicker/IconRenderer'

type Props = ChecklistCardsBlock & { locale?: string }

function str(value: any, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return value[locale] ?? value['hy'] ?? Object.values(value)[0] ?? ''
  return String(value)
}

const COL_SPAN: Record<string, number> = { '1': 24, '2': 12, '3': 8 }

const SECTION_BG: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
}

const CARD_BG: Record<string, string> = {
  white: 'bg-gray-50',
  gray: 'bg-white',
}

export const ChecklistCardsBlockComponent: React.FC<Props> = ({
  heading,
  subheading,
  columns = '2',
  background = 'gray',
  items,
  locale = 'hy',
}) => {
  const colSpan = COL_SPAN[columns ?? '2'] ?? 12
  const sectionBg = SECTION_BG[background ?? 'gray'] ?? 'bg-gray-50'
  const cardBg = CARD_BG[background ?? 'gray'] ?? 'bg-white'

  return (
    <section className={`py-16 ${sectionBg}`}>
      <div className="container mx-auto px-6 max-w-7xl">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{str(heading, locale)}</h2>
            )}
            {subheading && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">{str(subheading, locale)}</p>
            )}
          </div>
        )}

        <Row gutter={[32, 32]} style={{ alignItems: 'stretch' }}>
          {(items ?? []).map((item, i) => (
            <Col key={item.id ?? i} xs={24} sm={colSpan} style={{ display: 'flex' }}>
              <div
                className={`${cardBg} rounded-lg p-8 shadow-sm border border-gray-100 flex items-start gap-4 w-full`}
              >
                <div className="w-10 h-10 bg-teal-600 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                  <IconRenderer
                    name={item.icon ?? 'CheckCircleOutlined'}
                    style={{ fontSize: '18px', color: '#fff' }}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{str(item.title, locale)}</h3>
                  {item.description && (
                    <p className="text-gray-600 leading-relaxed">{str(item.description, locale)}</p>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
