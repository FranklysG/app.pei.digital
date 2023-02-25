import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

import axios from '../lib/axios'
import useMount from '../utils/useMount'
import { UserType } from '../@types'

type UserProps = {
  users: UserType[]
  update: ({ setErrors, setStatus, ...props }: any) => void
}

type UserProviderProps = {
  children?: ReactNode
}

export const User = createContext({} as UserProps)

function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<UserType[]>()

  const show = useCallback(async () => {
    await axios
      .get('/api/users')
      .then((res) => res.data.data)
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {})
  }, [])

  useMount(() => {
    show()
  })

  const update = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .put('/api/user', props)

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

  const values = {
    users,
    update,
  }
  return <User.Provider value={values}>{children}</User.Provider>
}

function useUser() {
  const context = useContext(User)
  if (context === undefined) {
    throw new Error('useUser must be used within an UserProvider')
  }
  return context
}

export { UserProvider, useUser }
