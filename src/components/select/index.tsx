import { ChangeEvent, Dispatch, SetStateAction } from 'react'

interface SelectProps {
  id?: string
  name?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
  required?: boolean
  handleOnChange?: Dispatch<SetStateAction<string>>
  value?: string | number
  autoFocus?: boolean
}

export default function Select({   
  placeholder,
  className,
  required,
  handleOnChange,
  value
}: SelectProps) {

  return (
    <select
      value={value}
      required={required}
      placeholder={placeholder || 'type here...'}
/* 
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        handleOnChange(e.target.value)
      } */


      className={`${className} resize-none w-full max-w-lg shadow-smborder border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm`}
    >
      <option value={value}>{value}</option>
      <option value={value}>{value}</option>
    </select>
  )
}
