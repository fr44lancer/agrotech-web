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
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  console.log('header data')
  console.log(data)
  return (
    <header className="w-full relative z-20 ">
      <BaseWrapper className={'container m-auto'}>
        <Row align={'middle'} justify={'space-between'} className="py-4">
          <Col>
            <Link href="/">
              <Logo loading="eager" priority="high" />
            </Link>
          </Col>
          <Col>
            <HeaderNav data={data} />
          </Col>
          <Col>
            <LanguageSwitcher />
          </Col>
        </Row>
      </BaseWrapper>
    </header>
  )
}
