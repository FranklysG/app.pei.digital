import Head from 'next/head'
import { ReactNode, useEffect, useState } from 'react'
import Loading from '../../components/loading'
import Panel from '../../components/panel'
import { useAuth } from '../../hooks/useAuth'
import { useWorkspace } from '../../hooks/useWorkspace'
import Leave from '../../pages/leave'
import useMount from '../../utils/useMount'
import Sidebar from '../sidebar'

interface AppProps {
  header: string
  children: ReactNode
}

export default function App({ header, children }: AppProps) {
  const { loading, setMiddleware } = useAuth()
  const [load, setLoad] = useState(true)

  useMount(() => {
    setTimeout(() => setLoad(false), 2000)
  })

  useEffect(() => {
    setMiddleware('auth')
  }, [])

  if (loading) {
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
