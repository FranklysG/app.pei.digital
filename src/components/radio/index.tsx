import { ReactNode } from 'react'

interface RadioButtonProps {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  handleOnClick?: () => void
  children: ReactNode
}

export default function RadioButton({
  className,
  type,
  handleOnClick,
  children,
}: RadioButtonProps) {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={`${className} w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gradient-to-r from-teal-500 to-pink-600 text-white hover:from-teal-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
    >
      {children}
    </button>
  )
}
