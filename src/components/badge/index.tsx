import { classNames } from "../../utils";
import { actions } from "../../pages/dashboard"

interface BadgeProps {
  name: string
  type: string
}

export default function Badge ({name, type}: BadgeProps) {
  let color = '';

  switch (type) {
    case 'success':
      color = 'bg-green-100 text-green-800';
      break;
    case 'processing':
      color = 'bg-yellow-100 text-yellow-800';
      break;
    case 'failed':
      color = 'bg-red-100 text-gray-800';
      break;
  }

  return(
    <div>
      <span
        className={classNames(
        `${color} inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize`,
        )}
      >
        {name}
      </span>
    </div>
  )
}