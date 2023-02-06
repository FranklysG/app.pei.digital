import { classNames } from '../../utils'

interface BadgeProps {
  name: string
  type: string
  status: string
  className?: string
}

export default function Badge({ name, type, status, className }: BadgeProps) {
  let color = ''

  switch (type) {
    case 'success':
      color = 'bg-green-100 text-green-800'
      break
    case 'processing':
      color = 'bg-yellow-100 text-yellow-800'
      break
    case 'failed':
      color = 'bg-red-100 text-gray-800'
      break
  }

  return (
    <div>
      <span
        className={`${color} inline-flex items-center px-2.5 py-0.5 rounded-full text-sm sm:text-xs font-medium capitalize`}
      >
        {status}
      </span>
    </div>
  )
}
