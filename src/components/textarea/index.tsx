import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface TextareaProps {
  id?: string
  name?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
  required?: boolean
  handleOnChange: (data: any) => void
  value: string
  autoFocus?: boolean
}

export default function Textarea({
  placeholder,
  className,
  required,
  value,
  handleOnChange,
}: TextareaProps) {
  return (
    <textarea
      value={value}
      required={required}
      placeholder={placeholder || 'type here...'}
      onChange={handleOnChange}
      className={`${className} block w-full h-full shadow-sm resize-none border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm`}
    />
  )
}
