import { ReactNode } from 'react'

interface ButtonProps {
  className?: string
  type?: 'button' | 'submit' | 'reset'
  outline?: boolean
  handleOnClick?: () => void
  children: ReactNode
}

const Button = ({
  className,
  type,
  handleOnClick,
  children,
  outline = true,
}: ButtonProps) => (
  <button
    type={type}
    onClick={handleOnClick}
    className={`${className} w-full flex justify-center py-2 px-4 border rounded-md shadow-sm text-sm font-medium ${
      outline
        ? 'border-transparent bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 '
        : 'border-rose-500 hover:bg-rose-200 text-rose-700 active:border-none'
    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500`}
  >
    {children}
  </button>
)

export default Button
