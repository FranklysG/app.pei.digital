import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

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

import { SpecialistType, SpecialtysType } from '../@types'

export default function Leave() {
  const { setMiddleware } = useAuth()
  const { workspace } = useWorkspace()
  const { openPanel, setOpenPanel } = useGlobal()
  const { currentUuid, forms, create, update } = useForm()
  const { specialists } = useSpecialist()

  const [title, setTitle] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [classRoom, setClassRoom] = useState<string>('')
  const [bout, setBout] = useState<string>('')
  const [birthdate, setBirthdate] = useState<string>('')
  const [father, setFather] = useState<string>('')
  const [mother, setMother] = useState<string>('')
  const [medicalUuid, setMedicalUuid] = useState<string>('')

  const [diagnostic, setDiagnostic] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [specialtys, setSpecialtys] = useState([])

  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  const workspace_uuid = values(workspace).shift()?.uuid

  useEffect(() => {
    if (currentUuid !== '') {
      forms
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setTitle(item.title)

          setName(item.name)
          setYear(item.year)
          setClassRoom(item.class)
          setBout(item.bout)
          setBirthdate(item.birthdate)
          setFather(item.father)
          setMother(item.mother)

          setDiagnostic(item.diagnostic)
          setDescription(item.description)
          setMedicalUuid(item.medical_uuid)
          setSpecialtys(item.specialtys)
        })
    }
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const handleChange = (index, id, value) => {
    let newValues = [...specialtys]
    newValues[index][id] = value
    setSpecialtys(newValues)
  }

  const addInputFields = () => {
    setSpecialtys([...specialtys, []])
  }

  const removeInputFields = (i) => {
    let newInputValues = [...specialtys]
    newInputValues.splice(i, 1)
    setSpecialtys(newInputValues)
  }

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      setMiddleware('auth')

      if (currentUuid !== '') {
        update({
          uuid: currentUuid,
          specialist_uuid: medicalUuid,
          title,
          name,
          year,
          diagnostic,
          class: classRoom,
          bout,
          birthdate,
          father,
          mother,
          description,
          setErrors,
          setStatus,
        })
        return
      }
      create({
        workspace_uuid,
        specialist_uuid: medicalUuid,
        title,
        name,
        year,
        diagnostic,
        class: classRoom,
        bout,
        birthdate,
        father,
        mother,
        description,
        setErrors,
        setStatus,
      })
    },
    [
      workspace_uuid,
      medicalUuid,
      title,
      name,
      year,
      diagnostic,
      classRoom,
      bout,
      birthdate,
      father,
      mother,
      description,
      setStatus,
      setErrors,
    ],
  )

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            PROGRAMA EDUCACIONAL PERSONALIZADO
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            ESCOLA MUNICIPAL ELIAS ALFREDO CURY
          </p>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:place-content-center sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <Label htmlFor="first-name" className="text-base sm:mt-px sm:pt-2">
              T??tulo
            </Label>
            <div className="mt-1 sm:col-span-2 sm:mt-0">
              <Input
                type="text"
                name="first-name"
                id="first-name"
                value={title ?? ''}
                handleOnChange={(value) => setTitle(value)}
                autoComplete="given-name"
                className="block w-full rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* 1. Identifica????o do Aluno */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              1. Identifica????o do aluno{' '}
            </Label>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
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

              <Label>Data de Nascimento:</Label>
              <Input
                type="text"
                name="DateOfBirth"
                value={birthdate ?? ''}
                handleOnChange={(value) => setBirthdate(value)}
                className="block w-32 rounded-md shadow-sm sm:max-w-xs"
              />
            </div>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:pt-5">
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
                value={classRoom ?? ''}
                handleOnChange={(value) => setClassRoom(value)}
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

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:pt-5">
              <Label>Pai:</Label>
              <Input
                type="text"
                name="Fathers-name"
                value={father ?? ''}
                handleOnChange={(value) => setFather(value)}
                className="block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
              />
              <Label>M??e:</Label>
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
              2. Diagn??stico e a data do ??ltimo laudo:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="diagnostic"
                value={diagnostic ?? ''}
                handleOnChange={(event) => setDiagnostic(event.target.value)}
              />
            </div>
          </div>

          {/* 3. Nome e Especialidade do profissional...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              3. Nome e Especialidade do profissional respons??vel pelo
              diagn??stico:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5"></div>

            <Select
              defaultValue={medicalUuid}
              handleOnChange={(e) => setMedicalUuid(e.target.value)}
            >
              {specialists?.map((item: SpecialistType) => (
                <option key={item.uuid} value={item.uuid}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>

          {/* 4. Dados obtidos atrav??s da fam??lia...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              4. Dados obtidos atrav??s da fam??lia e da equipe que acompanha o
              caso:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="description"
                value={description ?? ''}
                handleOnChange={(event) => setDescription(event.target.value)}
                className="h-52"
              />
            </div>
          </div>

          {/* 5. Tipos de tratamento cl??nico...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              5. Realiza algum tipo de atendimento cl??nico, terap??utico ou
              atividades extracurriculares?
            </Label>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <table className="text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Especialidade
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Local
                    </th>
                    <th className="border-r px-3 py-2 dark:border-neutral-500">
                      Profissional
                    </th>
                    <th className="border-r px-7 py-2 dark:border-neutral-500">
                      Dia
                    </th>
                    <th className="border-r px-4 py-2 dark:border-neutral-500">
                      Hor??rio
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Contato
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        className="flex justify-evenly items-center"
                        onClick={() => addInputFields()}
                      >
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys.length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    specialtys?.map((item: SpecialtysType, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap border-r px-4 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name="nameSpecialtys"
                            id="nameSpecialtys"
                            value={item.name || ''}
                            handleOnChange={(value) =>
                              handleChange(index, 'name', value)
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-2 dark:border-neutral-500">
                          <Input
                            type="text"
                            name="location"
                            id="location"
                            value={item.location || ''}
                            handleOnChange={(value) =>
                              handleChange(index, 'location', value)
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-2 dark:border-neutral-500">
                          <Input
                            type="text"
                            name="professional"
                            id="professional"
                            value={item.professional || ''}
                            handleOnChange={(value) =>
                              handleChange(index, 'professional', value)
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-2 dark:border-neutral-500">
                          <Input
                            type="text"
                            name="day"
                            id="day"
                            value={item.day || ''}
                            handleOnChange={(value) =>
                              handleChange(index, 'day', value)
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-4 py-2 dark:border-neutral-500">
                          <Input
                            type="text"
                            name="hour"
                            id="hour"
                            value={item.hour || ''}
                            handleOnChange={(value) =>
                              handleChange(index, 'hour', value)
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <Input
                            type="text"
                            name="contact"
                            id="contact"
                            value={item.contact || ''}
                            handleOnChange={(value) =>
                              handleChange(index, 'contact', value)
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => removeInputFields(index)}
                          >
                            <TrashIcon
                              className="h-4 w-4 text-gray-ring-gray-600"
                              aria-hidden="true"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Button
          handleOnClick={() => {
            setOpenPanel(!openPanel)
          }}
        >
          Enviar Formul??rio
        </Button>
      </form>
    </div>
  )
}
