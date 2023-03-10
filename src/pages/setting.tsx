import React, { useCallback, useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { toast } from 'react-toastify'

import { useAuth } from '../hooks/useAuth'
import { useSetting } from '../hooks/useSetting'

import App from '../layouts/app'

import Input from '../components/input'

import { classNames } from '../utils'

const user = {
  name: 'Lisa Marie',
  email: 'lisamarie@example.com',
  handle: 'Profile',
  imageUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

export default function Setting() {
  const { setMiddleware } = useAuth()
  const { setting, update, create } = useSetting()
  const [availableToHire, setAvailableToHire] = useState(true)

  const [uuid, setUuid] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState<string | string[]>('')

  useEffect(() => {
    setUuid(setting?.uuid)
    setFirstName(setting?.first_name)
    setLastName(setting?.last_name)
  }, [])

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  useEffect(() => {
    status && toast.success(status)
  }, [status])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      setMiddleware('auth')
      if (uuid) {
        update({ uuid, firstName, lastName, setErrors, setStatus })
        return
      }
      create({ firstName, lastName, setErrors, setStatus })
    },
    [uuid, firstName, lastName, setErrors, setStatus],
  )

  return (
    <App header={'Profile'}>
      <article className="max-w-7xl pb-10 lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          {/* Payment details */}
          <div className="space-y-6 sm:px-6 lg:col-span-12 lg:px-0">
            <section aria-labelledby="payment-details-heading">
              <form onSubmit={submitForm}>
                {/* Profile section */}
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="py-6 px-4 sm:p-6 lg:pb-8">
                    <div>
                      <h2 className="text-lg font-medium leading-6 text-gray-900">
                        Perfil
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Esta informa????o ser?? exibida publicamente, ent??o esteja
                        cuidado com o que voc?? compartilha.
                      </p>
                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row">
                      <div className="flex-grow space-y-6">
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nome
                          </label>
                          <Input
                            type="text"
                            name="first-name"
                            id="first-name"
                            value={firstName ?? ''}
                            placeholder={'Adicione seu nome'}
                            handleOnChange={(value) => setFirstName(value)}
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-12 sm:col-span-6">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Sobrenome
                          </label>
                          <Input
                            type="text"
                            name="last-name"
                            id="last-name"
                            value={lastName ?? ''}
                            placeholder={'Adicione seu sobrenome'}
                            handleOnChange={(value) => setLastName(value)}
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-shrink-0 lg:flex-grow-0">
                        <div className="mt-1 lg:hidden">
                          <div className="flex items-center">
                            <div
                              className="inline-block h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
                              aria-hidden="true"
                            >
                              <picture>
                                <source
                                  srcSet={user.imageUrl}
                                  type="image/webp"
                                />
                                <img
                                  className="h-full w-full rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </picture>
                            </div>
                            <div className="ml-5 rounded-md shadow-sm">
                              <div className="group relative flex items-center justify-center rounded-md border border-gray-300 py-2 px-3 focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 hover:bg-gray-50">
                                <label
                                  htmlFor="mobile-user-photo"
                                  className="pointer-events-none relative text-sm font-medium leading-4 text-gray-700"
                                >
                                  <span>Change</span>
                                  <span className="sr-only"> user photo</span>
                                </label>
                                <input
                                  id="mobile-user-photo"
                                  name="user-photo"
                                  type="file"
                                  className="absolute h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative hidden overflow-hidden rounded-full lg:block">
                          <picture>
                            <source srcSet={user.imageUrl} type="image/webp" />
                            <img
                              className="relative h-40 w-40 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </picture>

                          <label
                            htmlFor="desktop-user-photo"
                            className="absolute inset-0 flex h-full w-full items-center justify-center bg-black bg-opacity-75 text-sm font-medium text-white opacity-0 focus-within:opacity-100 hover:opacity-100"
                          >
                            <span>Change</span>
                            <span className="sr-only"> user photo</span>
                            <input
                              type="file"
                              id="desktop-user-photo"
                              name="user-photo"
                              className="absolute inset-0 h-full w-full cursor-pointer rounded-md border-gray-300 opacity-0"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy section */}
                  <div className="divide-y divide-gray-200 pt-6">
                    <div className="px-4 sm:px-6">
                      <div>
                        <h2 className="text-lg font-medium leading-6 text-gray-900">
                          Privacidade
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                          Termos de uso da aplica????o
                        </p>
                      </div>
                      <ul role="list" className="mt-2 divide-y divide-gray-200">
                        <Switch.Group
                          as="li"
                          className="flex items-center justify-between py-4"
                        >
                          <div className="flex flex-col">
                            <Switch.Label
                              as="p"
                              className="text-sm font-medium text-gray-900"
                              passive
                            >
                              Nome Visivel
                            </Switch.Label>
                            <Switch.Description className="text-sm text-gray-500">
                              Seu nome ser?? visivel a todos que editarem o mesmo
                              formulario
                            </Switch.Description>
                          </div>
                          <Switch
                            checked={availableToHire}
                            onChange={setAvailableToHire}
                            className={classNames(
                              availableToHire ? 'bg-teal-500' : 'bg-gray-200',
                              'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2',
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={classNames(
                                availableToHire
                                  ? 'translate-x-5'
                                  : 'translate-x-0',
                                'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                              )}
                            />
                          </Switch>
                        </Switch.Group>
                      </ul>
                    </div>
                    <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-cyan-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      >
                        Salvar
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </article>
    </App>
  )
}
