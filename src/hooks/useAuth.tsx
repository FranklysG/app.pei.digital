import useSWR from 'swr'
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { useRouter } from 'next/router'

import axios from '../lib/axios'

type AuthProps = {
  user: any
  verified: boolean
  loading: boolean
  register: ({ setErrors, ...props }: any) => void
  login: ({ setErrors, setStatus, ...props }: any) => void
  forgotPassword: ({ setErrors, setStatus, email }: any) => void
  resetPassword: ({ setErrors, setStatus, ...props }: any) => void
  resendEmailVerification: ({ setStatus }: any) => void
  logout: () => void
  setMiddleware: Dispatch<SetStateAction<string>>
  setRedirectIfAuthenticated: Dispatch<SetStateAction<string>>
}

type AuthProviderProps = {
  children?: ReactNode
}

export const Auth = createContext({} as AuthProps)

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const [middleware, setMiddleware] = useState('guest')
  const [redirectIfAuthenticated, setRedirectIfAuthenticated] = useState('')
  const [loading, setLoading] = useState(false)

  const { data: user, error, mutate } = useSWR(
    '/api/user',
    async () =>
      await axios
        .get('/api/user')
        .then((res) => res.data)
        .catch((error) => {
          if (error.response?.status !== 409) throw error

          router.push('/verify-email')
        }),
  )

  const register = useCallback(async ({ setErrors, ...props }: any) => {
    setErrors([])
    await axios
      .post('/register', props)
      .then(() => mutate())
      .catch((error) => {
        if (error.response?.status !== 422) {
          console.log(error)
          return
        }

        setErrors(Object.values(error.response.data.errors).flat())
      })
  }, [])

  const login = useCallback(async ({ setErrors, setStatus, ...props }: any) => {
    setErrors([])
    setStatus(null)

    setLoading(true)
    await axios
      .post('/login', props)
      .then((response) => response.data.data)
      .then((data) => {
        const token = data.token
        localStorage.setItem('@peidigital:token', token)
        return mutate()
      })
      .catch((error) => {
        if (error.response?.status !== 422) {
          console.log(error)
          return
        }
        setErrors(Object.values(error.response.data.errors).flat())
      })
    setLoading(false)
  }, [])

  const forgotPassword = useCallback(
    async ({ setErrors, setStatus, email }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .post('/forgot-password', { email })
        .then((response) => setStatus(response.data.status))
        .catch((error) => {
          if (error.response?.status !== 422) {
            console.log(error)
            return
          }

          setErrors(Object.values(error.response.data.errors).flat())
        })
    },
    [],
  )

  const resetPassword = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .post('/reset-password', { token: router.query.token, ...props })
        .then((response) =>
          router.push('/login?reset=' + btoa(response.data.status)),
        )
        .catch((error) => {
          if (error.response?.status !== 422) {
            console.log(error)
            return
          }

          setErrors(Object.values(error.response.data.errors).flat())
        })
    },
    [],
  )

  const resendEmailVerification = useCallback(async ({ setStatus }: any) => {
    await axios
      .post('/email/verification-notification')
      .then((response) => setStatus(response.data.status))
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const logout = useCallback(async () => {
    await axios
      .post('/logout')
      .then(() => {
        localStorage.clear()
        router.push('/signin')
        mutate()
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (redirectIfAuthenticated === '') {
      setRedirectIfAuthenticated(localStorage.getItem('@peidigital:route:auth'))
    }

    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated)
    }

    if (middleware === 'auth' && error) {
      logout()
    }
  }, [error])

  const values = {
    user,
    verified: !!user?.email_verified_at,
    loading,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
    setMiddleware,
    setRedirectIfAuthenticated,
  }
  return <Auth.Provider value={values}>{children}</Auth.Provider>
}

function useAuth() {
  const context = useContext(Auth)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
