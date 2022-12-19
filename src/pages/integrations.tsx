import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { toast } from 'react-toastify'
import { classNames } from '../utils'
import App from '../layouts/app'

const integrations = [
  { uuid: '', name: 'Formulario 1', date: '2022-12-11', author: 'John Doe' },
]

export default function Integrations() {
  const [enable, setEnable] = useState(true)
  const [_, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])
  const [current, setCurrent] = useState({
    name: '',
    uuid: '',
    token: '',
  })

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const handleUserUpdate = useCallback(() => {
    if (current.uuid !== '') {
      // update({
      //   uuid: current.uuid,
      //   name: current.name,
      //   setErrors,
      //   setStatus,
      // })
    } else {
      // create({ name: current.name, setErrors, setStatus })
    }
  }, [current])

  const setStateValue = (
    setStateAction: (value: any) => void,
    key: string,
    value: string,
  ) => {
    setStateAction((prevState) => {
      return { ...prevState, [key]: value }
    })
  }

  return (
    <App header={'Workspaces'}>
      <article className="max-w-7xl pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:gap-x-5">
          {/* Generate token details */}
          <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
            {/* Workspace history */}
            <section aria-labelledby="workspace-history-heading">
              <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
                <div className="px-4 sm:px-6">
                  <h2
                    id="workspace-history-heading"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Historico de formularios
                  </h2>
                </div>
                <div className="mt-6 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-t border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                {' '}
                                Ativo / Inativo
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Data
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Autor
                              </th>
                              <th
                                scope="col"
                                className="col-span-2 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {integrations?.map((item) => (
                              <tr key={item.uuid}>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <Switch.Group
                                    as="div"
                                    className="flex items-center"
                                  >
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
                                          enable
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                          'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                        )}
                                      />
                                    </Switch>
                                  </Switch.Group>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  <time dateTime={item.date}>
                                    {moment(item.date).format('YYYY-MM-DD')}
                                  </time>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {item.author}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <button
                                    onClick={() => {
                                      setCurrent((prevState) => {
                                        return {
                                          ...prevState,
                                          uuid: item.uuid,
                                          name: item.name,
                                          token: item.date,
                                        }
                                      })
                                    }}
                                    className="text-cyan-600 hover:text-cyan-900"
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </article>
    </App>
  )
}
