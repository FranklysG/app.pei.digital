import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import axios from '../lib/axios'

type FormProps = { 
  forms: [],
}

type FormProviderProps = {
  children?: ReactNode
}

export const Form = createContext({} as FormProps)

function FormProvider({ children }: FormProviderProps) {
  const [forms, setForms] = useState();

  useEffect(() => {
    (async () => {
      await axios
      .get('/api/forms')
      .then((response) => response.data.content.data)
      .then((data: any) => setForms(data))
      .catch((error: any) => {
        if (error.response.status !== 422) throw error
      })
    })();
  }, [])

  const values = { forms }

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
