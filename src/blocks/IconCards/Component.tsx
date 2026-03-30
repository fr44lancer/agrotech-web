import React from 'react'
import { Row, Col } from 'antd'
import type { IconCardsBlock as Props } from '@/payload-types'
import { IconRenderer } from '@/components/IconPicker/IconRenderer'

const COL_SPAN: Record<string, number> = { '1': 24, '2': 12, '3': 8, '4': 6 }

const SECTION_BG: Record<string, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
}

const ICON_CIRCLE_BG: Record<string, string> = {
  teal: '#0d9488',
  darkteal: '#115e59',
  green: '#15803d',
  gray: '#4b5563',
}

export const IconCardsBlockComponent: React.FC<Props> = ({
  heading,
  subheading,
  columns = '3',
  background = 'white',
  iconColor = 'teal',
  items,
}) => {
  const colSpan = COL_SPAN[columns ?? '3'] ?? 8
  const sectionBg = SECTION_BG[background ?? 'white'] ?? 'bg-white'
  const iconBg = ICON_CIRCLE_BG[iconColor ?? 'teal'] ?? '#0d9488'

  return (
    <section className={`py-16 ${sectionBg}`}>
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

        <Row gutter={[32, 32]}>
          {(items ?? []).map((item, i) => (
            <Col key={item.id ?? i} xs={24} sm={colSpan}>
              <div className="text-center p-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: iconBg }}
                >
                  <IconRenderer name={item.icon} style={{ fontSize: '28px', color: '#fff' }} />
                </div>
                {item.title && (
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                )}
                {item.description && <p className="text-gray-600">{item.description}</p>}
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}
