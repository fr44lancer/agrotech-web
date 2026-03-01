import Link from 'next/link'
import React from 'react'

import type { Career, Page, Post, Product, ProductCategory } from '@/payload-types'
import { Button, ButtonProps } from 'antd'

type CMSLinkType = {
  appearance?: 'inline' | 'default' | 'primary' | 'secondary' | 'outline' | null
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages' | 'posts' | 'products' | 'productCategories' | 'careers'
    value: Page | Post | Product | ProductCategory | Career | string | number
  } | null
  size?: ButtonProps['size'] | null
  type?: 'custom' | 'reference' | null
  url?: string | null
  locale?: string
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = 'inline',
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    locale,
  } = props

  const href =
    type === 'reference' && typeof reference?.value === 'object' && reference.value.slug
      ? `${locale ? `/${locale}` : ''}${reference?.relationTo !== 'pages' ? `/${reference?.relationTo}` : ''}/${
          reference.value.slug
        }`
      : url
        ? `${locale && url.startsWith('/') ? `/${locale}${url}` : url}`
        : url

  if (!href) return null

  const size = appearance === 'inline' ? undefined : sizeFromProps || undefined
  const newTabProps = newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  if (appearance === 'inline') {
    return (
      <Link href={href || url || ''} {...newTabProps} className={className}>
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button className={className} size={size}>
      <Link href={href || url || ''} {...newTabProps}>
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
