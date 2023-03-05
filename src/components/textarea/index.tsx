import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface TextareaProps {
  id?: string
  name?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
  required?: boolean
  handleOnChange?: Dispatch<SetStateAction<string>>
  value?: string | number
  defaultValue: string
  autoFocus?: boolean
}

export default function Textarea({   
  placeholder,
  className,
  required,
  defaultValue,
  value
}: TextareaProps) {

  return (
    <textarea
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder || 'type here...'}
      
      className={`${className} resize-none w-full max-w-lg shadow-smborder border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm`}
    />
  )
}
