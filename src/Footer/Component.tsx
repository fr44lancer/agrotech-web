import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { FooterDevCredit } from '@/components/FooterDevCredit'
import { Col, Row } from 'antd'
import { IconRenderer } from '@/components/IconPicker/IconRenderer'
import { getIconComponent } from '@/components/IconPicker/AllIcons'
import { ICON_COMPONENTS } from '@/components/IconPicker/iconComponents'
import Icon from '@ant-design/icons'

function str(value: any, locale: string): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && !Array.isArray(value)) return value[locale] ?? value['hy'] ?? Object.values(value)[0] ?? ''
  return String(value)
}

export async function Footer({ locale = 'hy' }: { locale?: string }) {
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()

  const companyName = str(footerData?.companyName, locale) || 'AGROTECH LLC'
  const companyTagline = str(footerData?.companyTagline, locale) || ''
  const contact = footerData?.contact
  const navColumns = footerData?.navColumns || []
  const copyrightSuffix = str((footerData as any)?.copyrightSuffix, locale) || `${companyName}. All rights reserved.`
  const copyrightText = `© ${new Date().getFullYear()} ${copyrightSuffix}`
  const socialLinks = footerData?.socialLinks

  return (
    <footer className="bg-gray-800 text-white mt-6 lg:mt-8">
      <div className="container mx-auto px-6 max-w-7xl py-10 lg:py-12">
        <Row gutter={[40, 40]} justify="space-between">
          <Col xs={24} md={6}>
            <h3 className="text-xl font-bold mb-3">{companyName}</h3>
            {companyTagline && (
              <p className="text-gray-400 text-sm leading-relaxed">{companyTagline}</p>
            )}
          </Col>

          {navColumns.map((col, i) => (
            <Col xs={24} md={6} key={col.id ?? i}>
              <ul className="space-y-2">
                {(col.links || []).map(({ link }, j) => (
                  <li key={j}>
                    <CMSLink
                      {...link}
                      locale={locale}
                      className="text-gray-400 hover:text-white transition  inline-block text-sm"
                    />
                  </li>
                ))}
              </ul>
            </Col>
          ))}

          {(contact?.columnLabel || contact?.address || contact?.phone || contact?.email) && (
            <Col xs={24} md={6}>
              {contact.columnLabel && (
                <h4 className="font-semibold text-white mb-4">{str(contact.columnLabel, locale)}</h4>
              )}
              <ul className="space-y-3 text-sm mb-4">
                {contact?.address && (
                  <li className="flex items-start gap-2.5 text-gray-300">
                    <svg
                      className="w-4 h-4 text-white mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {contact?.addressUrl && (
                    <a 
                      href={contact.addressUrl}
                      target='_blank'
                      className="text-gray-300 hover:text-white transition inline-block text-sm"
                      >
                        <span>
                          {str(contact.address, locale)}
                        </span>
                    </a>
                    )}
                  </li>
                )}
                {contact?.phone && (
                  <li className="flex items-center gap-2.5 text-gray-300">
                    <svg
                      className="w-4 h-4 text-white shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                      <a
                        href={`tel:${str(contact.phone, locale)}`}
                        className="text-gray-300 hover:text-white transition inline-block text-sm"
                      >
                        {str(contact.phone, locale)}
                      </a>                      
                  </li>
                )}
                {contact?.email && (
                  <li className="flex items-center gap-2.5 text-gray-300">
                    <svg
                      className="w-4 h-4 text-white shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="hover:text-white transition">{str(contact.email, locale)}</p>
                  </li>
                )}
              </ul>
              
              {socialLinks && (
                <ul className="flex gap-4 flex-wrap ">
                  {socialLinks.map((platformData , i) => (
                    <li key={i} className="flex gap-4">
                      <a href={platformData.url} target='_blank' className='text-gray-400'>
                        <IconRenderer 
                          name= {platformData.icon} 
                          className='w-10 h-10 text-gray-400'
                          style={{ fontSize: '30px'}}
                        />
                      </a>
                  </li>
                  ))}
                </ul>
              )}
            </Col>
          )}
        </Row>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-gray-500 text-sm">{copyrightText}</span>
          <FooterDevCredit />
        </div>
      </div>
    </footer>
  )
}
