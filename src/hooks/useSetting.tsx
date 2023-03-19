import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import axios from '../lib/axios'
import useMount from '../utils/useMount'
import { SettingType } from '../@types'

type SettingProps = {
  setting: SettingType
  create: ({ setErrors, setStatus, ...props }: any) => void
  update: ({ setErrors, setStatus, ...props }: any) => void
}

type SettingProviderProps = {
  children?: ReactNode
}

export const Setting = createContext({} as SettingProps)

function SettingProvider({ children }: SettingProviderProps) {
  const [setting, setSetting] = useState<SettingType>()

  const show = useCallback(async () => {
    await axios
      .get('/api/setting')
      .then((res) => res.data.data)
      .then((data) => {
        setSetting(data)
      })
      .catch((error) => {})
  }, [])

  const create = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .post('/api/setting', {
          first_name: props.firstName,
          last_name: props.lastName,
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
        })
    },
    [],
  )

  const update = useCallback(
    async ({ setErrors, setStatus, ...props }: any) => {
      setErrors([])
      setStatus(null)

      await axios
        .put('/api/setting', {
          uuid: props.uuid,
          first_name: props.firstName,
          last_name: props.lastName,
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
        })
    },
    [],
  )

  useEffect(() => {
    show()
  }, [])

  const values = {
    setting,
    update,
    create,
  }
  return <Setting.Provider value={values}>{children}</Setting.Provider>
}

function useSetting() {
  const context = useContext(Setting)
  if (context === undefined) {
    throw new Error('useSetting must be used within an SettingProvider')
  }
  return context
}

export { SettingProvider, useSetting }
