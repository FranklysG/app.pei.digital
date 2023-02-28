import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from '../lib/axios'
import { SpecialistType } from '../@types'
import useMount from '../utils/useMount'

type SpecialistProps = {
  specialists: SpecialistType[]
}

type SpecialistProviderProps = {
  children?: ReactNode
}

export const Specialist = createContext({} as SpecialistProps)

function SpecialistProvider({ children }: SpecialistProviderProps) {
  const [specialists, setSpecialists] = useState<SpecialistType[]>()

  const show = useCallback(async () => {
    await axios
      .get('/api/specialist')
      .then((response) => response.data.data)
      .then((data: any) => setSpecialists(data))
      .catch((error: any) => {})
  }, [])

  useMount(() => {
    show()
  })

  const values = {
    specialists,
  }

  return <Specialist.Provider value={values}>{children}</Specialist.Provider>
}

function useSpecialist() {
  const context = useContext(Specialist)
  if (context === undefined) {
    throw new Error('useSpecialist must be used within an SpecialistProvider')
  }
  return context
}

export { SpecialistProvider, useSpecialist }
