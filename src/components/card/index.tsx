import { ReactNode } from 'react'

interface cardProps {
  name: string
  href: string
  icon: JSX.Element
  amount: string
}

export default function Card({ name, href, icon, amount }: cardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-500">
                {name}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">
                  {amount}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a
            href={href}
            className="font-medium text-cyan-700 hover:text-cyan-900"
          >
            View all
          </a>
        </div>
      </div>
    </div>
  )
}
