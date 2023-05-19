import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import App from '../layouts/app'
import User from './user'

import { useGlobal } from '../hooks/useGlobal'
import { useUser } from '../hooks/useUser'
import { useAuth } from '../hooks/useAuth'

import Toggle from '../components/toggle'
import Panel from '../components/panel'
import { PlusIcon } from '@heroicons/react/24/outline'
import Loading from '../components/loading'

export default function Users() {
  const router = useRouter()
  const { openPanel, setOpenPanel } = useGlobal()
  const { users, setCurrentUuid, eliminate } = useUser()
  const { user } = useAuth()
  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  useEffect(() => {
    status && toast.success(status)
  }, [status])

  // useEffect(() => {
  //   if (user?.role != 'admin') {
  //     toast.info('Parece que você não tem permissão :)')
  //     router.push('dashboard')
  //   }
  // }, [user])

  const handleUserDelete = useCallback((uuid: string) => {
    eliminate({
      uuid,
      setErrors,
      setStatus,
    })
  }, [])

  // if (!user?.role) {
  //   return <Loading />
  // }

  return (
    <App header={'Usuários'}>
      <Panel>
        <User />
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
                    Usuários nessa escola
                  </h2>
                </div>
                <div className="min-w-0 flex-1 mt-5 md:mt-0">
                  {/* Button Plus */}
                  <div className="flex justify-center md:justify-end ">
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-full bg-pink-600 p-2 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                      onClick={() => {
                        setCurrentUuid('')
                        setOpenPanel(!openPanel)
                      }}
                    >
                      <span className="mr-3">Criar usuário</span>
                      <PlusIcon className="h-6 w-6" aria-hidden="true" />
                      <span className="sr-only">Criar usuário</span>
                    </button>
                  </div>
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
                                Nome
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              >
                                Permissão
                              </th>
                              <th
                                scope="col"
                                className="col-span-2 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                              ></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {users?.map((item) => (
                              <tr key={item.uuid}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                  <Toggle />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                  {item.name}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {item.email}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                  {item.role}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                  <button
                                    onClick={() => {
                                      setCurrentUuid(item.uuid)
                                      setOpenPanel(!openPanel)
                                    }}
                                    className="text-pink-600 hover:text-pink-900"
                                  >
                                    Editar
                                  </button>
                                  <span> / </span>
                                  <button
                                    onClick={() => handleUserDelete(item.uuid)}
                                    className="text-pink-600 hover:text-pink-900"
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
