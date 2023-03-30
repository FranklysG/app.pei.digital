import { ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import Loading from '../../components/loading'

import { useAuth } from '../../hooks/useAuth'
import { WorkspaceProvider } from '../../hooks/useWorkspace'
import { GlobalProvider } from '../../hooks/useGlobal'
import { FormProvider } from '../../hooks/useForm'
import { SettingProvider } from '../../hooks/useSetting'
import { UserProvider } from '../../hooks/useUser'
import { SpecialistProvider } from '../../hooks/useSpecialist'

import Sidebar from '../sidebar'
import { useRouter } from 'next/router'

interface AppProps {
  header: string
  children: ReactNode
}

export default function App({ header, children }: AppProps) {
  const router = useRouter()
  const [token, setToken] = useState(0)

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('@peidigital:token')?.length ?? 0
      setToken(token)
      if (token === 0) {
        setTimeout(() => {
          router.push('/signin')
        }, 1000)
      }
    })()
  }, [])

  if (token === 0) {
    return <Loading />
  }

  return (
    <main className="h-screen">
      <Head>
        <title>{header} | By Unibalsas</title>
      </Head>
      <Sidebar />
      <div className="flex flex-1 flex-col lg:pl-64">{children}</div>
    </main>
  )
}
