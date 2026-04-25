'use client'
import React from 'react'
import { getIconComponent } from './AllIcons'

type Props = {
  name?: string | null
  style?: React.CSSProperties
  className?: string
}

export function IconRenderer({ name, style, className }: Props) {
  const IconComponent = getIconComponent(name)
  return <IconComponent style={style} className={className} />
}
