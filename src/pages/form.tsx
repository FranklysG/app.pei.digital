import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'

import { ArrowDownOnSquareIcon } from '@heroicons/react/24/outline'

import App from '../layouts/app'
import Leave from './leave'

import { useForm } from '../hooks/useForm'
import { useWorkspace } from '../hooks/useWorkspace'

import Toggle from '../components/toggle'
import { useGlobal } from '../hooks/useGlobal'
import Panel from '../components/panel'

export default function Form() {
  const { openPanel, setOpenPanel } = useGlobal()
  const { forms, eliminate, generate, setCurrentUuid } = useForm()

  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  useEffect(() => {
    status && toast.success(status)
  }, [status])

  const handleUserDelete = useCallback((uuid: string) => {
    eliminate({
      uuid,
      setErrors,
      setStatus,
    })
  }, [])

  const handleUserGenerate = useCallback((uuid: string) => {
    generate({
      uuid,
      setErrors,
      setStatus,
    })
  }, [])

  return (
    <App header={'Formulários'}>
      <Panel>
        <Leave />
      </Panel>
      <article className="pb-10 lg:py-12 lg:px-8">
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
                    Histórico de formulários
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
                                Nome
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Autor
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Download
                              </th>
                              <th
                                scope="col"
                                className="col-span-2 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {forms?.map((item) => (
                              <tr key={item.uuid}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                  <Toggle />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  <time dateTime={item.date}>
                                    {moment(item.date).format('DD-MM-YYYY')}
                                  </time>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {item.title}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {item.author}
                                </td>
                                <td className="whitespace-nowrap text-center px-12 py-4 text-sm text-gray-500">
                                  <ArrowDownOnSquareIcon
                                    className="flex w-5 h-5 cursor-pointer"
                                    onClick={() =>
                                      handleUserGenerate(item.uuid)
                                    }
                                  />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <button
                                    onClick={() => {
                                      setCurrentUuid(item.uuid)
                                      setOpenPanel(!openPanel)
                                    }}
                                    className="text-cyan-600 hover:text-cyan-900"
                                  >
                                    Editar
                                  </button>
                                  <span> / </span>
                                  <button
                                    onClick={() => {
                                      handleUserDelete(item.uuid)
                                    }}
                                    className="text-cyan-600 hover:text-cyan-900"
                                  >
                                    Deletar
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
