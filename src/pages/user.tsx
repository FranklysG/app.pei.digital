import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { useWorkspace } from '../hooks/useWorkspace'
import { useGlobal } from '../hooks/useGlobal'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../hooks/useAuth'

import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import { useUser } from '../hooks/useUser'

export default function User() {
  const { workspace } = useWorkspace()
  const { openPanel, setOpenPanel } = useGlobal()
  const { users, update, create, currentUuid } = useUser()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  const workspace_uuid = values(workspace).shift()?.uuid

  useEffect(() => {
    if (currentUuid !== '') {
      users
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setName(item.name), setEmail(item.email)
        })
    }
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()

      if (currentUuid !== '') {
        update({
          uuid: currentUuid,
          name,
          email,
          password,
          setStatus,
          setErrors,
        })
        return
      }
      create({
        name,
        email,
        password,
        workspace_uuid,
        setStatus,
        setErrors,
      })
    },
    [name, email, password, workspace_uuid, setStatus, setErrors],
  )

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            CRIE USUÁRIOS PERSONALIZADOS
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            TODOS OS USUÁRIOS CRIADOS, TERÃO ACESSO AOS FORMULÁRIOS DA
            INSTITUIÇÃO
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:place-content-center sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Nome
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="first-name"
                id="first-name"
                value={name ?? ''}
                handleOnChange={(value) => setName(value)}
                placeholder="Nome do usuário"
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md sm:max-w-xs"
              />
            </div>
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Email
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="first-name"
                id="first-name"
                value={email ?? ''}
                handleOnChange={(value) => setEmail(value)}
                placeholder="Email"
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md sm:max-w-xs"
              />
            </div>
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Senha
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="password"
                name="first-name"
                id="first-name"
                value={password ?? ''}
                handleOnChange={(value) => setPassword(value)}
                placeholder="Senha"
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md sm:max-w-xs"
              />
            </div>
          </div>
        </div>
        <Button
          handleOnClick={() => {
            setOpenPanel(!openPanel)
          }}
        >
          Criar novo usuário
        </Button>
      </form>
    </div>
  )
}
