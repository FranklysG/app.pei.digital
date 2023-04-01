import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useSpecialist } from '../hooks/useSpecialist'
import { useWorkspace } from '../hooks/useWorkspace'
import { useGlobal } from '../hooks/useGlobal'
import { useForm } from '../hooks/useForm'

import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import Textarea from '../components/textarea'
import Select from '../components/select'

import { SpecialistType, SpecialtysType } from '../@types'

export default function Leave() {
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

  const [specialtys, setSpecialtys] = useState<SpecialtysType[]>([])

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
          setSpecialtys(item.specialtys as never)
        })
    }
  }, [currentUuid])

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const handleChange = useCallback(
    (itemIndex, name, value, tableState, setTableState) => {
      setTableState((prevState) => {
        const newState = [...prevState]
        newState[itemIndex] = { ...newState[itemIndex], [name]: value }
        return newState
      })
    },
    [],
  )

  const addInputFields = useCallback((tableState, setTableState) => {
    setTableState((prevState) => [...prevState, [] as never])
  }, [])

  const removeInputFields = useCallback(
    (itemIndex, tableState, setTableState) => {
      setTableState((prevState) => {
        const newState = [...prevState]
        newState.splice(itemIndex, 1)
        return newState
      })
    },
    [],
  )

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()

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
          specialtys,
          setErrors,
          setStatus,
        })
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
        specialtys,
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
      specialtys,
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
              Título
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

          {/* 1. Identificação do Aluno */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              1. Identificação do aluno{' '}
            </Label>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Label>Nome:</Label>
              <Input
                type="text"
                name="name-student"
                id="name-student"
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
                className="block w-36 rounded-md shadow-sm sm:max-w-xs"
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
              3. Nome e Especialidade do profissional responsável pelo
              diagnóstico:
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

          {/* 4. Dados obtidos através da família...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              4. Dados obtidos através da família e da equipe que acompanha o
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

          {/* 5. Tipos de tratamento clínico...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              5. Realiza algum tipo de atendimento clínico, terapêutico ou
              atividades extracurriculares?
            </Label>

            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <table className="text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={7}
                    >
                      Especialidades
                    </th>
                  </tr>
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
                      Horário
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Contato
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() =>
                          addInputFields(specialtys, setSpecialtys)
                        }
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
                  {specialtys?.length === 0 ? (
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
                            name="name"
                            id="name"
                            value={item.name || ''}
                            handleOnChange={(value) =>
                              handleChange(
                                index,
                                'name',
                                value,
                                specialtys,
                                setSpecialtys,
                              )
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
                              handleChange(
                                index,
                                'location',
                                value,
                                specialtys,
                                setSpecialtys,
                              )
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
                              handleChange(
                                index,
                                'professional',
                                value,
                                specialtys,
                                setSpecialtys,
                              )
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
                              handleChange(
                                index,
                                'day',
                                value,
                                specialtys,
                                setSpecialtys,
                              )
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
                              handleChange(
                                index,
                                'hour',
                                value,
                                specialtys,
                                setSpecialtys,
                              )
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
                              handleChange(
                                index,
                                'contact',
                                value,
                                specialtys,
                                setSpecialtys,
                              )
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() =>
                              removeInputFields(
                                index,
                                specialtys,
                                setSpecialtys,
                              )
                            }
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
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              A Escola poderá fazer contato com os profissionais que atendem o
              aluno, para o desenvolvimento do trabalho pedagógico?
            </Label>
            <div className="sm:flex sm:gap-4 ">
              <Input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                value="sim"
                label="Sim"
                handleOnChange={(value) => value}
              />

              <Input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                value="nao"
                label="Não"
                handleOnChange={(value) => value}
              />
            </div>
          </div>

          {/* 6. Expectativas/Contribuição da família...*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              6. Expectativas/Contribuição da família
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
                className="h-52"
              />
            </div>
          </div>

          {/* 7. Diagnóstico Pedagógico*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              7. Diagnóstico Pedagógico
            </Label>

            <div className="sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              {/* ASPECTOS COGNITIVOS */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos cognitivos
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Habilidades/Potencialidades
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Aspectos que precisam ser potencializados
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/* ASPECTOS SOCIAIS */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos sociais e psicoafetivos
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Habilidades/Potencialidades
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Aspectos que precisam ser potencializados
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/* ASPECTOS COMUNICACIONAIS*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos comunicacionais
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Habilidades/Potencialidades
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Aspectos que precisam ser potencializados
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/* ASPECTOS MOTORAS*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos motoras/psicomotoras
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Habilidades/Potencialidades
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Aspectos que precisam ser potencializados
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/* ASPECTOS COTIDIANO*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos do Cotidiano
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Habilidades/Potencialidades
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Aspectos que precisam ser potencializados
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

          {/* 8. Objetivos do programa */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              8. Objetivos do programa
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="diagnostic"
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>

          {/* 9. Metas*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3"> 9. Metas</Label>

            <div className="sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              {/* MATEMÁTICA */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={6}
                    >
                      Matemática
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Metas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Período
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Desempenho Atual
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Estratégia e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/*LINGUAGENS*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={6}
                    >
                      Linguagens (Língua Portuguesa, Lingua Inglesa, Arte,
                      Educação Física)
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Metas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Período
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Desempenho Atual
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Estratégia e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/*CIÊNCIAS DA NATUREZA*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={6}
                    >
                      Ciências da Natureza
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Metas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Período
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Desempenho Atual
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Estratégia e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/*CIÊNCIAS HUMANAS*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className="border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={6}
                    >
                      Ciências Humanas (Humanas e Geografia)
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Metas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Período
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Desempenho Atual
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Estratégia e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/*ENSINO RELIGIOSO*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={6}
                    >
                      Ensino Religioso
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Metas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Período
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Desempenho Atual
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Estratégia e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

              {/*ATIVIDADES DIÁRIAS*/}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className=" border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={6}
                    >
                      Atividades vida diária
                    </th>
                  </tr>
                  <tr>
                    <th className="border-r px-2 py-2 dark:border-neutral-500">
                      Metas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Período
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Desempenho Atual
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Estratégia e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button type="button" onClick={() => {}}>
                        <PlusIcon
                          className="h-4 w-4 text-gray-ring-gray-600"
                          aria-hidden="true"
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specialtys?.length === 0 ? (
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
                        <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.name || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'name', value) */
                            }
                            className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name=""
                            id=""
                            value={/* item.location || */ ''}
                            handleOnChange={
                              (value) => value
                              /* handleChange(index, 'location', value) */
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() => {}}
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

          {/* 10. Proposta de Intervenção*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              10. Proposta de Intervenção:
            </Label>
            <div className="sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <div className="sm:mb-4">
                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Mediação individual nas atividades e avaliações."
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Trabalhar os conceitos/conteúdos no concreto."
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Proporcionar tempo estendido para realização de atividades e avaliações"
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Reduzir textos e enunciados para melhor compreensão."
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Questões objetivas."
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Correção diferenciada nas avaliações."
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Adaptação Curricular"
                  handleOnChange={(value) => value}
                />

                <Input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  value=""
                  label="Outro"
                  handleOnChange={(value) => value}
                />
              </div>
            </div>
          </div>

          {/* 11. Objetivo das adaptações.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              11. Objetivo das adaptações curriculares:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>

          {/* 12. Ações adaptativas.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              12. Ações adaptativas por cada área de conhecimento:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>

          {/* 13. Recursos de tecnologia.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              13. Recursos de tecnologia assistiva:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>

          {/* 14. Recursos avaliativos.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              14. Recursos avaliativos:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>

          {/* 15. Observações.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              15. Observações a considerar como necessárias:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>

          {/* 16. Parecer Semestral */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              16. Parecer Semestral:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name=""
                value={''}
                handleOnChange={(event) => event.target.value}
              />
            </div>
          </div>
        </div>
        <Button
          handleOnClick={() => {
            // setOpenPanel(!openPanel)
          }}
        >
          Enviar Formulário
        </Button>
      </form>
    </div>
  )
}
