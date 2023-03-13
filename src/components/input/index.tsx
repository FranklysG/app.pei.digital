import { Dispatch, SetStateAction, ChangeEvent } from 'react'

interface InputProps {
  id?: string
  defaultValue?: string
  name?: string
  type?: 'text' | 'search' | 'password' | 'email' | 'checkbox' | 'date'
  placeholder?: string
  className?: string
  disabled?: boolean
  autoComplete?: string
  required?: boolean
  handleOnChange?: Dispatch<SetStateAction<string>>
  value?: string | number
  autoFocus?: boolean
}

export default function Input({
  type,
  placeholder,
  className,
  required,
  handleOnChange,
  value,
}: InputProps) {
  return (
    <input
      value={value}
      type={type}
      required={required}
      className={`${className} text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500`}
      placeholder={placeholder || 'Digite aqui...'}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        handleOnChange(e.target.value)
      }
    />
  )
}
