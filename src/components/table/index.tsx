import { ReactNode } from 'react'

interface TableProps {
  children?: ReactNode
  className?: string
}

export default function Table({ children, className }: TableProps) {
  return console.log('a')
}
