'use client'

import React, { ReactNode } from 'react'
import BaseWrapper from '@/components/ui/Containers/BaseContainer'

interface IAppPage {
  children?: ReactNode
}

const AppPage = ({ children }: IAppPage) => {
  return (
    <BaseWrapper
      className={
        'w-viewport-mobile md:w-viewport-standard mx-auto  px-2 md:px-0'
      }
    >
      {children}
    </BaseWrapper>
  )
}

export default AppPage
