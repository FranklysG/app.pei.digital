import { ReactNode } from 'react'

interface SelectProps {
  children?: ReactNode
  id?: string
  name?: string
  placeholder?: string
  className?: string
  value?: string | number
}

export default function Select({
  children,
  placeholder,
  className,
  value,
}: SelectProps) {
  return (
    <select
      value={value}
      placeholder={placeholder || 'type here...'}
      className={`${className} resize-none w-full max-w-lg shadow-smborder border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm`}
    >
      {children}
    </select>
  )
}
