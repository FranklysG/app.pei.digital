import { useState } from 'react'
import { classNames } from '../../utils'
import { Switch } from '@headlessui/react'

interface ToggleProps {}

const Toggle = ({}: ToggleProps) => {
  const [enable, setEnable] = useState(true)

  return (
    <Switch.Group>
      <Switch
        checked={enable}
        onChange={setEnable}
        className={classNames(
          enable ? 'bg-cyan-700' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2',
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enable ? 'translate-x-5' : 'translate-x-0',
            'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
          )}
        />
      </Switch>
    </Switch.Group>
  )
}

export default Toggle
