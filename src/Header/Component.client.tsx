'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Col, Row } from 'antd'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface HeaderClientProps {
  data: Header
  locale?: string
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md">
      <BaseWrapper className={'container m-auto'}>
        <Row align={'middle'} justify={'space-between'} className="py-4">
          <Col>
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          </Col>
          <Col>
            <Row align={'middle'}>
              <Col>
                <HeaderNav data={data} />
              </Col>
              <Col>
                <LanguageSwitcher currentLocale={locale} />
              </Col>
            </Row>
          </Col>
        </Row>
      </BaseWrapper>
    </header>
  )
}
