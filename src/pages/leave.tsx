import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { useWorkspace } from '../hooks/useWorkspace'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../hooks/useAuth'

import Button from '../components/button'
import Input from '../components/input'
import { useGlobal } from '../hooks/useGlobal'

export default function Leave() {
  const { setMiddleware } = useAuth()
  const { workspace } = useWorkspace()
  const { openPanel, setOpenPanel } = useGlobal()
  const { currentUuid, forms, create, update } = useForm()

  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  const workspace_uuid = values(workspace).shift().uuid

  useEffect(() => {
    if (currentUuid !== '') {
      forms
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setName(item.name)
        })
    }
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      setMiddleware('auth')

      if(currentUuid !== '') {
        update({
          uuid: currentUuid,
          name,
          setStatus,
          setErrors,
        })
        return;
      }

      create({
        name,
        workspace_uuid,
        setStatus,
        setErrors,
      })
    },
    [name, workspace_uuid, setStatus, setErrors],
  )

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
      <form onSubmit={submitForm} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Título
            </label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="first-name"
                id="first-name"

                value={name ?? ''}
                handleOnChange={(value) => setName(value)}

                placeholder=""
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
        <Button
          handleOnClick={() => {
            setOpenPanel(!openPanel)
          }}
        >
          Enviar Formulário
        </Button>
      </form>
    </div>
  )
}
