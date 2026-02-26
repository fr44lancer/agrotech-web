'use client'
import { Layout, LayoutProps } from 'antd'

const { Content } = Layout

interface IAppLayout extends LayoutProps {}

const AppLayout = ({ children }: IAppLayout) => {
  return (
    <Layout className={'min-h-screen'}>
      <Content className={' w-full flex flex-col justify-center'}>{children}</Content>
    </Layout>
  )
}

export default AppLayout
