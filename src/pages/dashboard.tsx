import { useState } from 'react'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ArrowTrendingUpIcon, PlusIcon } from '@heroicons/react/24/outline'

import moment from 'moment'

import App from '../layouts/app'
import Navbar from '../layouts/navbar'

import Badge from '../components/badge'
import Panel from '../components/panel'

import { useAuth } from '../hooks/useAuth'
import { useForm } from '../hooks/useForm'
import { useGlobal } from '../hooks/useGlobal'

import Leave from './leave'
import { classNames, generateGreetings } from '../utils'

export default function Dashboard() {
  const { forms } = useForm()
  const { user, verified } = useAuth()
  const { openPanel, setOpenPanel } = useGlobal()
  const [hour, setHour] = useState(moment().format('HH'))
  
  return (
    <App header={'Dashboard'}>
      <Navbar />
      <Panel>
        <Leave/>
      </Panel>
      <section className="flex-1 pb-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                  <picture>
                    <source
                      srcSet="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      type="image/webp"
                    />
                    <img
                      width="4rem"
                      height="4rem"
                      className="hidden h-16 w-16 rounded-full sm:block"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                      alt="avatar"
                    />
                  </picture>

                  <div>
                    <div className="flex items-center">
                      <picture>
                        <source
                          srcSet="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                          type="image/webp"
                        />
                        <img
                          width="4rem"
                          height="4rem"
                          className="h-16 w-16 rounded-full sm:hidden"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                          alt="avatar"
                        />
                      </picture>

                      <h1 className="-mt-4 sm:-mt-0 ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        {generateGreetings(hour)}, {user?.name}
                      </h1>
                    </div>
                    <dl className="flex flex-col ml-16 -mt-9 sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6 sm:mt-0">
                        <CheckCircleIcon
                          className={classNames(
                            verified ? 'text-green-400' : 'text-red-400',
                            'mr-1.5 h-5 w-5 flex-shrink-0',
                          )}
                          aria-hidden="true"
                        />
                        {verified ? 'Verified' : 'uverified'} account
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="min-w-0 flex-1 mt-5 md:mt-0">
                {/* Button Plus */}
                <div className="flex justify-center md:justify-end ">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full bg-cyan-600 p-2 text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    onClick={() => setOpenPanel(!openPanel)}
                  >
                    <span className="mr-3">Adicionar novo formulário</span>
                    <PlusIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Adicionar novo formulário</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mt-8 px-4 text-xl font-bold leading-6 text-gray-900 sm:px-6 lg:px-8">
            Ultimas atividades
          </h2>

          {/* Activity list (smallest breakpoint only) */}

          <div className="shadow sm:hidden">
            <ul
              role="list"
              className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
            >
              {forms?.map((item) => (
                <li key={item.uuid}>
                  <a
                    href={"api/generate"}
                    className="block bg-white px-4 py-4 hover:bg-gray-50"
                  >
                    <div className="grid gap-2">
                      <span className="flex justify-between">
                        <h4 className="text-gray-600">{item.author}</h4>
                        <Badge
                          className="text-2xl"
                          name={item.status}
                          type={item.type}
                          status={item.status}
                        />
                      </span>
                      <span className="flex justify-start">
                        <h2 className="font-semibold text-lg">{item.name}</h2>
                      </span>
                      <span className="flex justify-between">
                        <h4 className="text-gray-600">{item.date}</h4>
                        <ChevronRightIcon className="h-6 w-6" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Activity table (small breakpoint and up) */}
          <div className="hidden sm:block">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mt-2 flex flex-col">
                <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Ação
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Author
                        </th>
                        <th
                          className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                          scope="col"
                        >
                          Status
                        </th>
                        <th
                          className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                          scope="col"
                        >
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {forms?.map((item) => (
                        <tr key={item.uuid} className="bg-white">
                          <td className="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            <div className="flex">
                              <a
                                href={"api/generate"}
                                className="group inline-flex space-x-2 truncate text-sm"
                              >
                                <ArrowTrendingUpIcon
                                  className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                                <p className="truncate text-gray-500 group-hover:text-gray-900">
                                  {item.name}
                                </p>
                              </a>
                            </div>
                          </td>
                          <td className="w-full max-w-lg whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                            <p className="truncate text-gray-500 group-hover:text-gray-900">
                              {item.author}
                            </p>
                          </td>
                          <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block">
                            <Badge
                              name={item.status}
                              type={item.type}
                              status={item.status}
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                            <time dateTime={item.created_at}>{item.date}</time>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Pagination */}
                  <nav
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                    aria-label="Pagination"
                  >
                    <div className="hidden sm:block">
                      <p className="text-sm text-gray-700">
                        Encontrados <span className="font-medium">1</span> to{' '}
                        <span className="font-medium">10</span> of{' '}
                        <span className="font-medium">20</span> resultados
                      </p>
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Anterior
                      </a>
                      <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Proximo
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </App>
  )
}
