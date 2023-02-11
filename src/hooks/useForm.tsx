import { useRouter } from 'next/router'
import React, { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from 'react'
import { FormType } from '../@types'
import axios from '../lib/axios'

type FormProps = { 
  forms: FormType[],
  create: ({ setErrors, setStatus, ...props }: any) => void,
  eliminate: ({ setErrors, setStatus, ...props }: any) => void
}

type FormProviderProps = {
  children?: ReactNode
}

export const Form = createContext({} as FormProps)

function FormProvider({ children }: FormProviderProps) {
  const router = useRouter();
  const [forms, setForms] = useState<FormType[]>();
  
  const create = useCallback(async ({setErrors, setStatus, ...props}: any) => {
    setErrors([])
    setStatus(null)
    
    await axios
    .post('/api/forms', props)
    .then((response) => {
      setStatus(response.status)
      router.reload()
    })
    
    .catch((error) => {
        if (error.response.status !== 422) throw error

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }, [])

  
  const eliminate = useCallback(async ({setErrors, setStatus, ...props}: any) => {
    setErrors([])
    setStatus(null) 

    await axios
    .delete('/api/forms', props)
    .then((response) => {
      setStatus(response.status)
      router.reload()
    })
    
    .catch((error) => {
        if (error.response.status !== 422) throw error
        setErrors(Object.values(error.response.data.errors).flat())
    })
  }, [])

  useEffect(() => {
    (async () => {
      await axios
      .get('/api/forms')
      .then((response) => response.data.data)
      .then((data: any) => setForms(data))
      .catch((error: any) => {
        if (error.response.status !== 422) throw error
      })
    })();
  }, [])

  const values = { create, eliminate, forms }
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
