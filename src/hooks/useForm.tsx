import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { FormType } from '../@types'
import axios from '../lib/axios'

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
        .post('/api/form', props)
        .then((response) => {
          setStatus(response.data.message), setCurrentUuid('')
          show()
        })
        .catch((error) => {
          if (error.response.status !== 422) {
            console.log(error)
            return
          }
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
        .put('/api/form', props)

        .then((response) => {
          setStatus(response.data.message)
          setCurrentUuid('')
          show()
        })

        .catch((error) => {
          if (error.response.status !== 422) {
            console.log(error)
            return
          }
        })
    },
    [],
  )

  const eliminate = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .delete('/api/form', {
          data: props,
        })
        .then((response) => {
          setStatus(response.data.message)
          show()
        })
        .catch((error) => {
          if (error.response.status !== 422) {
            console.log(error)
            return
          }
          setErrors(Object.values(error.response.data.errors).flat())
        })
    },
    [],
  )

  const generate = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      await axios
        .post('/api/form/generate', props, {
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
        .catch(() => {
          setErrors(['Oops.. Tente mais tarte :)'])
        })
    },
    [],
  )

  const show = useCallback(async () => {
    await axios
      .get('/api/form')
      .then((response) => response.data.data)
      .then((data: any) => setForms(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    ;(async () => {
      await axios
        .get('/api/form')
        .then((response) => response.data.data)
        .then((data: any) => setForms(data))
        .catch(() => {})
    })()
  }, [])

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
