import Head from 'next/head'
import { ReactNode, useEffect, useState } from 'react'
import Loading from '../../components/loading'
import { useAuth } from '../../hooks/useAuth'
import { useWorkspace } from '../../hooks/useWorkspace'
import useMount from '../../utils/useMount'
import Sidebar from '../sidebar'

interface AppProps {
  header: string
  children: ReactNode
}

export default function App({ header, children }: AppProps) {
  const { loading, setMiddleware } = useAuth()
  const { show } = useWorkspace()
  const [load, setLoad] = useState(true)

  useMount(() => {
    show()
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
