import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { useSpecialist } from '../hooks/useSpecialist'
import { useWorkspace } from '../hooks/useWorkspace'
import { useGlobal } from '../hooks/useGlobal'
import { useForm } from '../hooks/useForm'
import { useAuth } from '../hooks/useAuth'

import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import Textarea from '../components/textarea'
import Select from '../components/select'

export default function Leave() {
  const { setMiddleware } = useAuth()
  const { workspace } = useWorkspace()
  const { openPanel, setOpenPanel } = useGlobal()
  const { currentUuid, forms, create, update } = useForm()
  const { specialists } = useSpecialist()

  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [classroom, setClassroom] = useState<string>('')
  const [bout, setBout] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>('')
  const [father, setFather] = useState<string>('')
  const [mother, setMother] = useState<string>('')

  const [diagnostic, setDiagnostic] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  const workspace_uuid = values(workspace).shift().uuid

  useEffect(() => {
    if (currentUuid !== '') {
      forms
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setTitle(item.title)

          setName(item.name)
          setYear(item.year)
          setClassroom(item.class)
          setBout(item.bout)
          setBirthdate(item.birthdate)
          setFather(item.father)
          setMother(item.mother)

          setDiagnostic(item.diagnostic)
          setDescription(item.description)
        })
    }

    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      setMiddleware('auth')

      if (currentUuid !== '') {
        update({
          uuid: currentUuid,
          name,
          setStatus,
          setErrors,
        })
        return
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
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            PROGRAMA EDUCACIONAL PERSONALIZADO
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            ESCOLA MUNICIPAL ELIAS ALFREDO CURY
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:place-content-center sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              Título
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="first-name"
                id="first-name"
                value={title ?? ''}
                handleOnChange={(value) => setTitle(value)}
                placeholder=""
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md sm:max-w-xs"
              />
            </div>
          </div>

          {/* 1. Identificação do Aluno */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              1. Identificação do aluno{' '}
            </Label>

            <div className="flex justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Label>Nome:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name ?? ''}
                handleOnChange={(value) => setName(value)}
                placeholder=""
                autoComplete="given-name"
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
            </div>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4  sm:pt-5">
              <Label>Ano:</Label>
              <Input
                type="text"
                name="year"
                value={year ?? ''}
                handleOnChange={(value) => setYear(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
              <Label> Turma:</Label>
              <Input
                type="text"
                name="class"
                value={classroom ?? ''}
                handleOnChange={(value) => setClassroom(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
              <Label> Turno:</Label>
              <Input
                type="text"
                name="Shift"
                value={bout ?? ''}
                handleOnChange={(value) => setBout(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
            </div>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4  sm:pt-5">
              <Label>Data de Nascimento:</Label>
              <Input
                type="text"
                name="DateOfBirth"
                value={birthdate ?? ''}
                handleOnChange={(value) => setBirthdate(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
            </div>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4  sm:pt-5">
              <Label>Pai:</Label>
              <Input
                type="text"
                name="Fathers-name"
                value={father ?? ''}
                handleOnChange={(value) => setFather(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
              <Label>Mãe:</Label>
              <Input
                type="text"
                name="Mothers-name"
                value={mother ?? ''}
                handleOnChange={(value) => setMother(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs "
              />
            </div>
          </div>

          {/* 2. Diagnostico e a data do ultimo laudo */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              2. Diagnóstico e a data do último laudo:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea 
                name="diagnosis"
                value={diagnostic ?? ''}
                handleOnChange={(value) => setDiagnostic(value)} />
            </div>
          </div>

          {/* 3. Nome e Especialidade do profissional...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              3. Nome e Especialidade do profissional responsável pelo
              diagnóstico:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
            </div>

            <Select>
              {specialists.map((specialist) => (
                <option key={specialist.uuid} value={specialist.uuid}>
                  {specialist.name}
                </option>
              ))}
            </Select>
          </div>

          {/* 4. Dados obtidos através da família...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              4. Dados obtidos através da família e da equipe que acompanha o
              caso:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea 
                name="diagnosis"
                value={description ?? ''}
                handleOnChange={(value) => setDescription(value)} 
                className="h-52"
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
