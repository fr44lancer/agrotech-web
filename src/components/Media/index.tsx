import React, { Fragment } from 'react'

import type { Props } from './types'
import { ImageMedia } from '@/components/Media/ImageMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props
  const Tag = htmlElement || Fragment

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
