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

type SpecialistProps = {
  specialists: SpecialistType[]
  update: ({ setErrors, setStatus, ...props }: any) => void
  create: ({ setErrors, setStatus, ...props }: any) => void
  eliminate: ({ setErrors, setStatus, ...props }: any) => void
  currentUuid: string
  setCurrentUuid: (data: string) => void
}

type SpecialistProviderProps = {
  children?: ReactNode
}

export const Specialist = createContext({} as SpecialistProps)

function SpecialistProvider({ children }: SpecialistProviderProps) {
  const [specialists, setSpecialists] = useState<SpecialistType[]>()
  const [currentUuid, setCurrentUuid] = useState<string>('')

  const show = useCallback(async () => {
    await axios
      .get('/api/specialist')
      .then((res) => res.data.data)
      .then((data) => {
        setSpecialists(data)
      })
      .catch(() => {})
  }, [])

  const update = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .put('/api/specialist', props)

        .then((response) => {
          setStatus(response.data.message)
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

  const create = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .post('/api/specialist', props)
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

  const eliminate = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .delete('/api/specialist', {
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
    update,
    create,
    eliminate,
    currentUuid,
    setCurrentUuid,
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
