import React, { HTMLAttributes } from 'react'

type IBaseWrapperProps = HTMLAttributes<HTMLDivElement>

const BaseWrapper = ({ children, className }: IBaseWrapperProps) => {
  return <div className={className}>{children}</div>
}

export default BaseWrapper
