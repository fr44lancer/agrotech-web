'use client'

import { createCache, StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'
import antdTheme from '@/assets/styles/antd.theme'
import enUS from 'antd/locale/en_US'

export default function StylesRegistry({ children }: { children: React.ReactNode }) {
  const cache = createCache()

  if (typeof window !== 'undefined') {
    return (
      <ConfigProvider locale={enUS} theme={antdTheme} wave={{ disabled: true }}>
        {children}
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider locale={enUS} theme={antdTheme} wave={{ disabled: true }}>
      <StyleProvider cache={cache}>{children}</StyleProvider>
    </ConfigProvider>
  )
}
