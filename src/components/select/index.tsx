import { ReactNode } from 'react'

interface SelectProps {
  children?: ReactNode
  defaultValue?: string
  value?: string | number
  placeholder?: string
  className?: string
  id?: string
  name?: string
  handleOnChange: (data: any) => void
}

export default function Select({
  children,
  defaultValue,
  value,
  placeholder,
  className,
  handleOnChange,
}: SelectProps) {
  return (
    <select
      defaultValue={defaultValue}
      value={value}
      onChange={handleOnChange}
      placeholder={placeholder || 'Digite aqui...'}
      className={`${className} resize-none w-full shadow-smborder border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm`}
    >
      {children}
    </select>
  )
}
