import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { values } from 'lodash'

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

import { useSpecialist } from '../hooks/useSpecialist'
import { useWorkspace } from '../hooks/useWorkspace'
import { useGlobal } from '../hooks/useGlobal'
import { useForm } from '../hooks/useForm'
import { useSkill } from '../hooks/useSkill'

import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import Textarea from '../components/textarea'
import Select from '../components/select'

import {
  GoalsExtractType,
  GoalsType,
  SkillsType,
  SpecialistType,
  SpecialtysType,
} from '../@types'

export default function Leave() {
  const { workspace } = useWorkspace()
  const { openPanel, setOpenPanel } = useGlobal()
  const { currentUuid, forms, create, update } = useForm()
  const { skill } = useSkill()
  const { specialists } = useSpecialist()

  const [title, setTitle] = useState<string>('')
  const [school, setSchool] = useState<string>('')
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

  const [specialistBool, setSpecialistBool] = useState<boolean>(false)
  const [familyDescription, setFamilyDescription] = useState<string>('')
  const [objective, setObjective] = useState<string>('')
  const [proposal, setProposal] = useState<string>('')
  const [objectiveAdaptive, setObjectiveAdaptive] = useState<string>('')
  const [actionAdaptive, setActionAdaptive] = useState<string>('')
  const [resourcesTech, setResourcesTech] = useState<string>('')
  const [resourcesAvaliation, setResourcesAvaliation] = useState<string>('')
  const [object, setObject] = useState<string>('')
  const [conclusion, setConclusion] = useState<string>('')

  const [specialtys, setSpecialtys] = useState<SpecialtysType[]>([])
  const [skills, setSkills] = useState<SkillsType[]>([])
  const [goals, setGoals] = useState<GoalsType[]>([])

  const [status, setStatus] = useState<string>('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  useEffect(() => {
    status && toast.success(status)
  }, [status])

  const workspace_uuid = values(workspace).shift()?.uuid

  useEffect(() => {
    if (currentUuid !== '') {
      forms
        .filter((item) => item.uuid === currentUuid)
        .map((item) => {
          setTitle(item.title)
          setSchool(item.school)

          setName(item.name)
          setYear(item.year)
          setClassRoom(item.class)
          setBout(item.bout)
          setBirthdate(item.birthdate)
          setFather(item.father)
          setMother(item.mother)
          setMedicalUuid(item.medical_uuid)

          setDiagnostic(item.diagnostic)
          setDescription(item.description)

          setSpecialistBool(item.specialist_bool)
          setFamilyDescription(item.family_description)
          setObjective(item.objective)
          setProposal(item.proposal)
          setObjectiveAdaptive(item.objective_adaptive)
          setActionAdaptive(item.action_adaptive)
          setResourcesTech(item.resources_tech)
          setResourcesAvaliation(item.resources_avaliation)
          setObject(item.object)
          setConclusion(item.conclusion)

          setSpecialtys(item.specialtys as never)
          setSkills(item.skills as never)
          setGoals(item.goals as never)
        })
    }
  }, [currentUuid])

  const handleChange = useCallback(
    (itemIndex, name, value, _, setTableState) => {
      setTableState((prevState) => {
        const newState = [...prevState]
        newState[itemIndex] = { ...newState[itemIndex], [name]: value }
        return newState
      })
    },
    [],
  )

  const handleChangeComplex = useCallback(
    (arrIndex, itemIndex, name, value, setTableState) => {
      setTableState((prevState) => {
        const newState = { ...prevState }
        const itemToUpdate = { ...newState[arrIndex][itemIndex] }
        itemToUpdate[name] = value
        newState[arrIndex][itemIndex] = itemToUpdate
        return newState
      })
    },
    [],
  )

  const addInputFields = useCallback((_, setTableState) => {
    setTableState((prevState) => [...prevState, [] as never])
  }, [])

  const addComplexInputField = useCallback((arr, setTableState) => {
    setTableState((prevState) => {
      const newState = { ...prevState }

      if (!newState[arr]) {
        newState[arr] = [{}]
      } else {
        newState[arr] = [...prevState[arr], {}]
      }

      return newState
    })
  }, [])

  const removeComplexInputField = useCallback((arr, index, setTableState) => {
    setTableState((prevState) => {
      const newState = { ...prevState }

      newState[arr] = [...prevState[arr]]
      newState[arr].splice(index, 1)

      return newState
    })
  }, [])

  const removeInputFields = useCallback((itemIndex, _, setTableState) => {
    setTableState((prevState) => {
      const newState = [...prevState]
      newState.splice(itemIndex, 1)
      return newState
    })
  }, [])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()

      const sendSkills = removeFirstKeyAndJoinValues(values(skills))

      if (currentUuid !== '') {
        console.log('update')
        update({
          uuid: currentUuid,
          specialist_uuid: medicalUuid,
          title,
          school,
          name,
          year,
          diagnostic,
          class: classRoom,
          bout,
          birthdate,
          father,
          mother,
          specialistBool,
          familyDescription,
          objective,
          proposal,
          objectiveAdaptive,
          actionAdaptive,
          resourcesTech,
          resourcesAvaliation,
          object,
          conclusion,
          description,
          specialtys,
          skills: sendSkills,
          goals,
          setErrors,
          setStatus,
        })

        return
      }

      create({
        workspace_uuid,
        specialist_uuid: medicalUuid,
        title,
        school,
        name,
        year,
        diagnostic,
        class: classRoom,
        bout,
        birthdate,
        father,
        mother,
        specialistBool,
        familyDescription,
        objective,
        proposal,
        objectiveAdaptive,
        actionAdaptive,
        resourcesTech,
        resourcesAvaliation,
        object,
        conclusion,
        description,
        specialtys,
        skills: sendSkills,
        goals,
        setErrors,
        setStatus,
      })
    },
    [
      workspace_uuid,
      medicalUuid,
      title,
      school,
      name,
      year,
      diagnostic,
      classRoom,
      bout,
      birthdate,
      father,
      mother,
      specialistBool,
      familyDescription,
      objective,
      proposal,
      objectiveAdaptive,
      actionAdaptive,
      resourcesTech,
      resourcesAvaliation,
      object,
      conclusion,
      description,
      specialtys,
      skills,
      goals,
      setStatus,
      setErrors,
    ],
  )

  const filterComplexByKey = useCallback((data, key) => {
    const keys = Object.keys(data)
    if (keys.includes(key)) {
      return data[key]
    }
    return []
  }, [])

  const removeFirstKeyAndJoinValues = useCallback((array) => {
    let result = []

    for (let i = 0; i < array.length; i++) {
      result.push(Object.values(array[i])[0])
    }

    return result
  }, [])

  return (
    <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10 sm:pb-8">
      <form onSubmit={submitForm} className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            PLANO EDUCACIONAL INDIVIDUALIZADO
          </h3>
        </div>
        <div className="space-y-6 sm:space-y-5">
          <div className="flex justify-between items-center sm:border-t sm:border-gray-200 sm:pt-5">
            <Label className="mr-6">Nome da escola:</Label>
            <div className="mt-1 flex-1">
              <Input
                type="text"
                name="school"
                id="school"
                value={school ?? ''}
                handleOnChange={(value) => setSchool(value)}
                autoComplete="school"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <Label className="mr-6">Título:</Label>
            <div className="mt-1 flex-1">
              <Input
                type="text"
                name="title"
                id="title"
                value={title ?? ''}
                handleOnChange={(value) => setTitle(value)}
                autoComplete="title"
                className="w-full"
              />
            </div>
          </div>

          {/* 1. Identificação do Aluno*/}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <div className="">
              <Label className="text-base sm:mt-px sm:pt-2 my-3">
                {' '}
                1. Identificação do aluno{' '}
              </Label>
            </div>
            <div className="sm:border-t">
              <div className="sm:flex place-content-center grid-cols-4 justify-between items-center gap-4 pt-5">
                <div className="col-span-2 flex items-center">
                  <Label className="mr-4">Nome:</Label>
                  <Input
                    type="text"
                    name="name-student"
                    id="name-student"
                    value={name ?? ''}
                    handleOnChange={(value) => setName(value)}
                    placeholder=""
                    autoComplete="given-name"
                    className="w-72 flex-1 rounded-md shadow-sm"
                  />
                </div>
                <div className="col-span-2 flex items-center">
                  <Label className="mr-4">Data de Nascimento:</Label>
                  <Input
                    type="text"
                    name="DateOfBirth"
                    value={birthdate ?? ''}
                    handleOnChange={(value) => setBirthdate(value)}
                    className="w-72 flex-1 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="sm:flex sm:items-center sm:gap-4 sm:pt-5 grid-cols-4  place-content-center justify-between items-center gap-4 pt-5">
                <div className="  col-span-3 flex items-center">
                  <Label className="mr-4">Ano:</Label>
                  <Input
                    type="text"
                    name="year"
                    value={year ?? ''}
                    handleOnChange={(value) => setYear(value)}
                    className="w-48 rounded-md shadow-sm sm:max-w-xs"
                  />
                </div>

                <div className=" col-span-2 flex items-center">
                  <Label className="mr-4">Turma:</Label>
                  <Input
                    type="text"
                    name="class"
                    value={classRoom ?? ''}
                    handleOnChange={(value) => setClassRoom(value)}
                    className="w-48 flex-1 rounded-md shadow-sm"
                  />
                </div>

                <div className="col-span-3 flex items-center">
                  <Label className="mr-4">Turno:</Label>
                  <Input
                    type="text"
                    name="Shift"
                    value={bout ?? ''}
                    handleOnChange={(value) => setBout(value)}
                    className="w-48 flex-1 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="">
              <div className="sm:flex place-content-center grid-cols-4 justify-between items-center gap-4 pt-5">
                <div className="col-span-2 flex items-center">
                  <Label className="mr-4">Pai:</Label>
                  <Input
                    type="text"
                    name="Fathers-name"
                    value={father ?? ''}
                    handleOnChange={(value) => setFather(value)}
                    className="w-80 flex-1 rounded-md shadow-sm"
                  />
                </div>

                <div className="col-span-2 flex items-center">
                  <Label className="mr-4">Mãe:</Label>
                  <Input
                    type="text"
                    name="Mothers-name"
                    value={mother ?? ''}
                    handleOnChange={(value) => setMother(value)}
                    className="w-80 flex-1 rounded-md shadow-sm"
                  />
                </div>
              </div>
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
                <option className="truncate" key={item.uuid} value={item.uuid}>
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
                        <td className="whitespace-nowrap border-r px-4 py-2 dark:border-neutral-500">
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
                name="specialist-check"
                id="specialist-check"
                value="sim"
                label="Sim"
                handleOnChange={() => setSpecialistBool(specialistBool)}
              />

              <Input
                type="checkbox"
                name="specialist-check"
                id="specialist-check"
                value="nao"
                label="Não"
                handleOnChange={() => setSpecialistBool(!specialistBool)}
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
                name="family_description"
                id="family_description"
                value={familyDescription ?? ''}
                handleOnChange={(event) =>
                  setFamilyDescription(event.target.value)
                }
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
                      className="border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
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
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField(
                            'habilidades-cognitivas',
                            setSkills,
                          )
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
                  {filterComplexByKey(skills, 'habilidades-cognitivas')
                    ?.length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(skills, 'habilidades-cognitivas')?.map(
                      (item: SkillsType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap w-80 border-r px-10 py-2 font-medium dark:border-neutral-500">
                            <Select
                              value={item?.uuid}
                              handleOnChange={(e) =>
                                handleChangeComplex(
                                  'habilidades-cognitivas',
                                  index,
                                  'uuid',
                                  e.target.value,
                                  setSkills,
                                )
                              }
                            >
                              {filterComplexByKey(
                                skill,
                                'habilidades-cognitivas',
                              )?.map((item: SkillsType) => (
                                <option
                                  className="truncate"
                                  key={item.uuid}
                                  value={item.uuid}
                                >
                                  {item.title}
                                </option>
                              ))}
                            </Select>
                          </td>
                          <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="helper"
                              id="helper"
                              value={item.helper || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'habilidades-cognitivas',
                                  index,
                                  'helper',
                                  value,
                                  setSkills,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              className="remove"
                              onClick={() =>
                                removeComplexInputField(
                                  'habilidades-cognitivas',
                                  index,
                                  setSkills,
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
                      ),
                    )
                  )}
                </tbody>
              </table>
            </div>

            <div className="sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              {/* ASPECTOS SOCIAIS E PSICOAFETIVOS */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className="border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
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
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField(
                            'habilidades-socioemocionais',
                            setSkills,
                          )
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
                  {filterComplexByKey(skills, 'habilidades-socioemocionais')
                    ?.length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(
                      skills,
                      'habilidades-socioemocionais',
                    )?.map((item: SkillsType, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap w-80 border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Select
                            value={item?.uuid}
                            handleOnChange={(e) =>
                              handleChangeComplex(
                                'habilidades-socioemocionais',
                                index,
                                'uuid',
                                e.target.value,
                                setSkills,
                              )
                            }
                          >
                            {filterComplexByKey(
                              skill,
                              'habilidades-socioemocionais',
                            )?.map((item: SkillsType) => (
                              <option
                                className="truncate"
                                key={item.uuid}
                                value={item.uuid}
                              >
                                {item.title}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name="helper"
                            id="helper"
                            value={item.helper || ''}
                            handleOnChange={(value) =>
                              handleChangeComplex(
                                'habilidades-socioemocionais',
                                index,
                                'helper',
                                value,
                                setSkills,
                              )
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() =>
                              removeComplexInputField(
                                'habilidades-socioemocionais',
                                index,
                                setSkills,
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

            <div className="sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              {/* ASPECTOS COMUNICACIONAIS */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className="border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos Comunicacionais
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
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField(
                            'habilidades-comunicacionais',
                            setSkills,
                          )
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
                  {filterComplexByKey(skills, 'habilidades-comunicacionais')
                    ?.length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(
                      skills,
                      'habilidades-comunicacionais',
                    )?.map((item: SkillsType, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap w-80 border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Select
                            value={item?.uuid}
                            handleOnChange={(e) =>
                              handleChangeComplex(
                                'habilidades-comunicacionais',
                                index,
                                'uuid',
                                e.target.value,
                                setSkills,
                              )
                            }
                          >
                            {filterComplexByKey(
                              skill,
                              'habilidades-comunicacionais',
                            )?.map((item: SkillsType) => (
                              <option
                                className="truncate"
                                key={item.uuid}
                                value={item.uuid}
                              >
                                {item.title}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name="helper"
                            id="helper"
                            value={item.helper || ''}
                            handleOnChange={(value) =>
                              handleChangeComplex(
                                'habilidades-comunicacionais',
                                index,
                                'helper',
                                value,
                                setSkills,
                              )
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() =>
                              removeComplexInputField(
                                'habilidades-comunicacionais',
                                index,
                                setSkills,
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

            <div className="sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              {/* ASPECTOS MOTORAS/PSICOMOTORES */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className="border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
                      colSpan={3}
                    >
                      Aspectos motoras/psicomotores
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
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField(
                            'habilidades-motoraspsicomotoras',
                            setSkills,
                          )
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
                  {filterComplexByKey(skills, 'habilidades-motoraspsicomotoras')
                    ?.length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(
                      skills,
                      'habilidades-motoraspsicomotoras',
                    )?.map((item: SkillsType, index) => (
                      <tr
                        key={index}
                        className="border-b dark:border-neutral-500"
                      >
                        <td className="whitespace-nowrap w-80 border-r px-10 py-2 font-medium dark:border-neutral-500">
                          <Select
                            value={item?.uuid}
                            handleOnChange={(e) =>
                              handleChangeComplex(
                                'habilidades-motoraspsicomotoras',
                                index,
                                'uuid',
                                e.target.value,
                                setSkills,
                              )
                            }
                          >
                            {filterComplexByKey(
                              skill,
                              'habilidades-motoraspsicomotoras',
                            )?.map((item: SkillsType) => (
                              <option
                                className="truncate"
                                key={item.uuid}
                                value={item.uuid}
                              >
                                {item.title}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                          <Input
                            type="text"
                            name="helper"
                            id="helper"
                            value={item.helper || ''}
                            handleOnChange={(value) =>
                              handleChangeComplex(
                                'habilidades-motoraspsicomotoras',
                                index,
                                'helper',
                                value,
                                setSkills,
                              )
                            }
                            className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                          />
                        </td>
                        <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                          <button
                            type="button"
                            className="remove"
                            onClick={() =>
                              removeComplexInputField(
                                'habilidades-motoraspsicomotoras',
                                index,
                                setSkills,
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

            <div className="sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              {/* ASPECTOS DO COTIDIANO */}
              <table className="mb-6 text-xs min-w-full border text-center font-light dark:border-neutral-500">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th
                      className="border-b px-2 py-2 dark:border-neutral-500 bg-pink-600 text-white"
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
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField(
                            'habilidades-do-cotidiano',
                            setSkills,
                          )
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
                  {filterComplexByKey(skills, 'habilidades-do-cotidiano')
                    ?.length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(skills, 'habilidades-do-cotidiano')?.map(
                      (item: SkillsType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap w-80 border-r px-10 py-2 font-medium dark:border-neutral-500">
                            <Select
                              value={item?.uuid}
                              handleOnChange={(e) =>
                                handleChangeComplex(
                                  'habilidades-do-cotidiano',
                                  index,
                                  'uuid',
                                  e.target.value,
                                  setSkills,
                                )
                              }
                            >
                              {filterComplexByKey(
                                skill,
                                'habilidades-do-cotidiano',
                              )?.map((item: SkillsType) => (
                                <option
                                  className="truncate"
                                  key={item.uuid}
                                  value={item.uuid}
                                >
                                  {item.title}
                                </option>
                              ))}
                            </Select>
                          </td>
                          <td className="whitespace-nowrap border-r px-8 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="helper"
                              id="helper"
                              value={item.helper || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'habilidades-do-cotidiano',
                                  index,
                                  'helper',
                                  value,
                                  setSkills,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              className="remove"
                              onClick={() =>
                                removeComplexInputField(
                                  'habilidades-do-cotidiano',
                                  index,
                                  setSkills,
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
                      ),
                    )
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
                name="objective"
                id="objective"
                value={objective ?? ''}
                handleOnChange={(event) => setObjective(event.target.value)}
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
                      Estratégias e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField('matematica', setGoals)
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
                  {filterComplexByKey(goals, 'matematica').length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(goals, 'matematica')?.map(
                      (item: GoalsExtractType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                            <Input
                              type="text"
                              name="goal"
                              id="goal"
                              value={item.goal || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'matematica',
                                  index,
                                  'goal',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="period"
                              id="period"
                              value={item.period || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'matematica',
                                  index,
                                  'period',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="performance"
                              id="performance"
                              value={item.perfomance || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'matematica',
                                  index,
                                  'perfomance',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="strategy"
                              id="strategy"
                              value={item.strategy || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'matematica',
                                  index,
                                  'strategy',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="resource"
                              id="resource"
                              value={item.resource || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'matematica',
                                  index,
                                  'resource',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              onClick={() =>
                                removeComplexInputField(
                                  'matematica',
                                  index,
                                  setGoals,
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
                      ),
                    )
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
                      Estratégias e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField('linguagens', setGoals)
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
                  {filterComplexByKey(goals, 'linguagens').length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(goals, 'linguagens')?.map(
                      (item: GoalsExtractType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                            <Input
                              type="text"
                              name="goal"
                              id="goal"
                              value={item.goal || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'linguagens',
                                  index,
                                  'goal',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="period"
                              id="period"
                              value={item.period || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'linguagens',
                                  index,
                                  'period',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="performance"
                              id="performance"
                              value={item.perfomance || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'linguagens',
                                  index,
                                  'perfomance',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="strategy"
                              id="strategy"
                              value={item.strategy || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'linguagens',
                                  index,
                                  'strategy',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="resource"
                              id="resource"
                              value={item.resource || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'linguagens',
                                  index,
                                  'resource',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              onClick={() =>
                                removeComplexInputField(
                                  'linguagens',
                                  index,
                                  setGoals,
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
                      ),
                    )
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
                      Estratégias e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField('natureza', setGoals)
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
                  {filterComplexByKey(goals, 'natureza').length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(goals, 'natureza')?.map(
                      (item: GoalsExtractType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                            <Input
                              type="text"
                              name="goal"
                              id="goal"
                              value={item.goal || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'natureza',
                                  index,
                                  'goal',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="period"
                              id="period"
                              value={item.period || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'natureza',
                                  index,
                                  'period',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="performance"
                              id="performance"
                              value={item.perfomance || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'natureza',
                                  index,
                                  'perfomance',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="strategy"
                              id="strategy"
                              value={item.strategy || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'natureza',
                                  index,
                                  'strategy',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="resource"
                              id="resource"
                              value={item.resource || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'natureza',
                                  index,
                                  'resource',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              onClick={() =>
                                removeComplexInputField(
                                  'natureza',
                                  index,
                                  setGoals,
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
                      ),
                    )
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
                      Estratégias e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField('humanas', setGoals)
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
                  {filterComplexByKey(goals, 'humanas').length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(goals, 'humanas')?.map(
                      (item: GoalsExtractType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                            <Input
                              type="text"
                              name="goal"
                              id="goal"
                              value={item.goal || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'humanas',
                                  index,
                                  'goal',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="period"
                              id="period"
                              value={item.period || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'humanas',
                                  index,
                                  'period',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="performance"
                              id="performance"
                              value={item.perfomance || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'humanas',
                                  index,
                                  'perfomance',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="strategy"
                              id="strategy"
                              value={item.strategy || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'humanas',
                                  index,
                                  'strategy',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="resource"
                              id="resource"
                              value={item.resource || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'humanas',
                                  index,
                                  'resource',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              onClick={() =>
                                removeComplexInputField(
                                  'humanas',
                                  index,
                                  setGoals,
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
                      ),
                    )
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
                      Estratégias e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() =>
                          addComplexInputField('religiao', setGoals)
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
                  {filterComplexByKey(goals, 'religiao').length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(goals, 'religiao')?.map(
                      (item: GoalsExtractType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                            <Input
                              type="text"
                              name="goal"
                              id="goal"
                              value={item.goal || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'religiao',
                                  index,
                                  'goal',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="period"
                              id="period"
                              value={item.period || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'religiao',
                                  index,
                                  'period',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="performance"
                              id="performance"
                              value={item.perfomance || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'religiao',
                                  index,
                                  'perfomance',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="strategy"
                              id="strategy"
                              value={item.strategy || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'religiao',
                                  index,
                                  'strategy',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="resource"
                              id="resource"
                              value={item.resource || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'religiao',
                                  index,
                                  'resource',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              onClick={() =>
                                removeComplexInputField(
                                  'religiao',
                                  index,
                                  setGoals,
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
                      ),
                    )
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
                      Estratégias e Intervenções Pedagógicas
                    </th>
                    <th className="border-r px-5 py-2 dark:border-neutral-500">
                      Recursos
                    </th>
                    <th className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                      <button
                        type="button"
                        onClick={() => addComplexInputField('diaria', setGoals)}
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
                  {filterComplexByKey(goals, 'diaria').length === 0 ? (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="py-3 " colSpan={6}>
                        Nenhum item encontrado.
                      </td>
                    </tr>
                  ) : (
                    filterComplexByKey(goals, 'diaria')?.map(
                      (item: GoalsExtractType, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-neutral-500"
                        >
                          <td className="whitespace-nowrap border-r px-3 py-2 font-medium dark:border-neutral-500">
                            <Input
                              type="text"
                              name="goal"
                              id="goal"
                              value={item.goal || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'diaria',
                                  index,
                                  'goal',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block w-full max-w-lg rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="period"
                              id="period"
                              value={item.period || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'diaria',
                                  index,
                                  'period',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="performance"
                              id="performance"
                              value={item.perfomance || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'diaria',
                                  index,
                                  'perfomance',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="strategy"
                              id="strategy"
                              value={item.strategy || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'diaria',
                                  index,
                                  'strategy',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500 ">
                            <Input
                              type="text"
                              name="resource"
                              id="resource"
                              value={item.resource || ''}
                              handleOnChange={(value) =>
                                handleChangeComplex(
                                  'diaria',
                                  index,
                                  'resource',
                                  value,
                                  setGoals,
                                )
                              }
                              className="text-xs block m-auto w-full rounded-md shadow-sm sm:max-w-xs"
                            />
                          </td>
                          <td className="whitespace-nowrap border-r px-3 py-2 dark:border-neutral-500">
                            <button
                              type="button"
                              onClick={() =>
                                removeComplexInputField(
                                  'diaria',
                                  index,
                                  setGoals,
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
                      ),
                    )
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
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Mediação individual nas atividades e avaliações."
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Trabalhar os conceitos/conteúdos no concreto."
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Proporcionar tempo estendido para realização de atividades e avaliações"
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Reduzir textos e enunciados para melhor compreensão."
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Questões objetivas."
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Correção diferenciada nas avaliações."
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Adaptação Curricular"
                />

                <Input
                  type="checkbox"
                  name="proposal"
                  id="proposal"
                  value={proposal ?? ''}
                  handleOnChange={(value) => setProposal(value)}
                  label="Outro"
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
                name="objective_adaptive"
                id="objective_adaptive"
                value={objectiveAdaptive ?? ''}
                handleOnChange={(event) =>
                  setObjectiveAdaptive(event.target.value)
                }
              />
            </div>
          </div>

          {/*a. Ações adaptativas.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              a. Ações adaptativas por cada área de conhecimento:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="action_adaptive"
                id="action_adaptive"
                value={actionAdaptive ?? ''}
                handleOnChange={(event) =>
                  setActionAdaptive(event.target.value)
                }
              />
            </div>
          </div>

          {/* 12. Recursos de tecnologia.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              12. Recursos de tecnologia assistiva:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="resources_tech"
                id="resources_tech"
                value={resourcesTech ?? ''}
                handleOnChange={(event) => setResourcesTech(event.target.value)}
              />
            </div>
          </div>

          {/* 13. Recursos avaliativos.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              13. Recursos avaliativos:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="resources_avaliation"
                id="resources_avaliation"
                value={resourcesAvaliation ?? ''}
                handleOnChange={(event) =>
                  setResourcesAvaliation(event.target.value)
                }
              />
            </div>
          </div>

          {/* 14. Observações.. */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              14. Observações:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="object"
                id="object"
                value={object ?? ''}
                handleOnChange={(event) => setObject(event.target.value)}
              />
            </div>
          </div>

          {/* 15. Parecer Semestral */}
          <div className="sm:items-start sm:gap-4 sm:pt-5">
            <Label className="text-base sm:mt-px sm:pt-2 my-3">
              {' '}
              15. Parecer Semestral:
            </Label>
            <div className="sm:flex sm:justify-between sm:items-center sm:gap-4 sm:border-t sm:pt-5">
              <Textarea
                name="conclusion"
                id="conclusion"
                value={conclusion ?? ''}
                handleOnChange={(event) => setConclusion(event.target.value)}
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
