import React, { ReactNode } from 'react'

interface LabelProps {
  className?: string
  htmlFor?: string
  children: ReactNode
}

const Label = ({ className, htmlFor, children }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={`${className} block font-medium text-sm text-gray-700`}
  >
    {children}
  </label>
)

export default Label
