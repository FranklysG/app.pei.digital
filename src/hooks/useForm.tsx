import { useRouter } from 'next/router'
import { times } from 'lodash'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'
import { FormType } from '../@types'
import axios from '../lib/axios'
import useMount from '../utils/useMount'

type FormProps = {
  forms: FormType[]
  create: ({ setErrors, setStatus, ...props }: any) => void
  eliminate: ({ setErrors, setStatus, ...props }: any) => void
  generate: ({ setErrors, setStatus, ...props }: any) => void
  update: ({ setErrors, setStatus, ...props }: any) => void
  currentUuid: string
  setCurrentUuid: (data: string) => void
}

type FormProviderProps = {
  children?: ReactNode
}

export const Form = createContext({} as FormProps)

function FormProvider({ children }: FormProviderProps) {
  const [forms, setForms] = useState<FormType[]>()
  const [currentUuid, setCurrentUuid] = useState<string>('')

  const create = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .post('/api/forms', props)
        .then((response) => {
          setStatus(response.data.message)
          show()
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error
          setErrors(Object.values(error.response.data.errors).flat())
        })
    },
    [],
  )

  const update = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .put('/api/forms', props)

        .then((response) => {
          setStatus(response.data.message)
          show()
        })

        .catch((error) => {
          if (error.response.status !== 422) throw error
        })
    },
    [],
  )
  const eliminate = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .delete('/api/forms', {
          data: props,
        })
        .then((response) => {
          setStatus(response.data.message)
          show()
        })
        .catch((error) => {
          if (error.response.status !== 422) throw error
          setErrors(Object.values(error.response.data.errors).flat())
        })
    },
    [],
  )

  const generate = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      await axios
        .get('/api/forms/generate', {
          params: props,
          responseType: 'blob',
        })
        .then((response) => {
          if (response.data.size < 100) throw response
          setStatus('Relatorio baixado com sucesso :)')
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          const timestamp = Date.now()
          link.setAttribute('download', `pei-digital-form-${timestamp}.pdf`) //or any other extension
          document.body.appendChild(link)
          link.click()
        })
        .catch((error) => {
          setErrors(['Oops.. Tente mais tarte :)'])
        })
    },
    [],
  )

  const show = useCallback(async () => {
    await axios
      .get('/api/forms')
      .then((response) => response.data.data)
      .then((data: any) => setForms(data))
      .catch((error: any) => {
        if (error.response.status !== 422) throw error
      })
  }, [])

  useMount(() => {
    show()
  })

  const values = {
    forms,
    create,
    update,
    eliminate,
    generate,
    currentUuid,
    setCurrentUuid,
  }

  return <Form.Provider value={values}>{children}</Form.Provider>
}

function useForm() {
  const context = useContext(Form)
  if (context === undefined) {
    throw new Error('useForm must be used within an FormProvider')
  }
  return context
}

export { FormProvider, useForm }
