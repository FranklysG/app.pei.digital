import { classNames } from "../../utils";
import { actions } from "../../pages/dashboard"

export function Badge ({children}) {
  const statusStyles = {
    success: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-gray-800',
  }

  return(
    <div>
      <span
        className={classNames(
        statusStyles[children],
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
        )}
      >
        {children}
      </span>
    </div>
  )
}