import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import axios from '../lib/axios'
import { SpecialistType } from '../@types'

type SpecialistProps = {
  specialists: SpecialistType[]
}

type SpecialistProviderProps = {
  children?: ReactNode
}

export const Specialist = createContext({} as SpecialistProps)

function SpecialistProvider({ children }: SpecialistProviderProps) {
  const [specialists, setSpecialists] = useState<SpecialistType[]>()

  useEffect(() => {
    ;(async () => {
      await axios
        .get('/api/specialist')
        .then((response) => response.data.data)
        .then((data: any) => setSpecialists(data))
        .catch(() => {})
    })()
  }, [])

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
