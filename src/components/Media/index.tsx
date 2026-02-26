import React, { Fragment } from 'react'

import type { Props } from './types'
import { ImageMedia } from '@/components/Media/ImageMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props
  const Tag = htmlElement || Fragment

  console.log('media props')
  console.log(props)
  console.log(htmlElement)

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      <ImageMedia {...props} />
    </Tag>
  )
}
