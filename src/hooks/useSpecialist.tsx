import { createContext, ReactNode, useCallback, useContext, useState } from 'react'
import axios from '../lib/axios'
import { SpecialistType } from '../@types'
import useMount from '../utils/useMount'

type SpecialistProps = {
  specialists: SpecialistType[]
  show: () => Promise<void>
  /* currentSpecialistUuid: string
  setCurrentSpecialistUuid: (data: string) => void */
}

type SpecialistProviderProps = {
  children?: ReactNode
}

export const Specialist = createContext({} as SpecialistProps)

function SpecialistProvider({ children }: SpecialistProviderProps) {
  const [specialists, setSpecialists] = useState<SpecialistType[]>()
 /*  const [currentSpecialistUuid, setCurrentSpecialistUuid] = useState<string>('') */

  const show = useCallback(
    async (/* { setErrors, setStatus, ...props }: any */) => {
      /* setErrors([])
      setStatus(null) */

      await axios
        .get('/api/specialist')
        .then((response) => response.data.data)
        .then((data:any) => setSpecialists(data))
        .catch((error: any) => {
          if (error.response.status !== 422) throw error
        })
  }, [])

  useMount(() => {
    show()
  }) 
 
  const values = {
    specialists,
    show
  }

  return <Specialist.Provider value={values}>{children}</Specialist.Provider>
}

function useSpecialist() {
  const context = useContext(Specialist)
  if (context === undefined) {
    throw new Error('useForm must be used within an FormProvider')
  }
  return context
}

export { SpecialistProvider, useSpecialist }