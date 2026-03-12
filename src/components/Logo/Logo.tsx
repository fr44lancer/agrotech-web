import React from 'react'
import NextImage from 'next/image'
import logo from '/public/images/logo.png'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <NextImage
      alt="Agrotech Logo"
      width={150}
      height={67}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      src={logo}
    />
  )
}
