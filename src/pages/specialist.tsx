import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { useWorkspace } from '../hooks/useWorkspace'
import { useGlobal } from '../hooks/useGlobal'

import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import { useSpecialist } from '../hooks/useSpecialist'

export default function Specialist() {
  const { workspace } = useWorkspace()
  const { openPanel, setOpenPanel } = useGlobal()
  const { specialists, update, create, currentUuid } = useSpecialist()

  const [name, setName] = useState<string>('')
  const [area, setArea] = useState<string>('')
  const [residence, setResidence] = useState<string>('')

  const [_, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  const workspace_uuid = values(workspace).shift()?.uuid

  useEffect(() => {
    if (currentUuid !== '') {
      specialists
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setName(item.name), setArea(item.area)
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
          area,
          residence,
          setStatus,
          setErrors,
        })
        return
      }
      create({
        name,
        area,
        residence,
        workspace_uuid,
        setStatus,
        setErrors,
      })
    },
    [name, area, residence, workspace_uuid, setStatus, setErrors],
  )

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            ADICIONE ESPECIALISTAS
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            AO CADASTRAR UM NOVO FORMULÁRIO, VOCÊ PODERÁ SELECIONAR OS
            ESPECIALISTAS QUE FORAM ADICIONADOS
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:place-content-center sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <Label htmlFor="name" className="text-base sm:mt-px sm:pt-2">
              Nome
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="name"
                id="name"
                value={name ?? ''}
                handleOnChange={(value) => setName(value)}
                placeholder="Nome do especialista"
                autoComplete="name"
                className="block w-full max-w-lg rounded-md sm:max-w-xs"
              />
            </div>
            <Label htmlFor="area" className="text-base sm:mt-px sm:pt-2">
              Área
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="area"
                id="area"
                value={area ?? ''}
                handleOnChange={(value) => setArea(value)}
                placeholder="Área de especialização"
                autoComplete="area"
                className="block w-full max-w-lg rounded-md sm:max-w-xs"
              />
            </div>
            <Label htmlFor="residence" className="text-base sm:mt-px sm:pt-2">
              Residência
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="residence"
                id="residence"
                value={residence ?? ''}
                handleOnChange={(value) => setResidence(value)}
                placeholder="Residência"
                autoComplete="residence"
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
          Adicionar novo especialista
        </Button>
      </form>
    </div>
  )
}
