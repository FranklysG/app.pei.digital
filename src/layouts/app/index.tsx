import { ReactNode } from 'react'
import Head from 'next/head'
import Loading from '../../components/loading'
import { useAuth } from '../../hooks/useAuth'
import Sidebar from '../sidebar'

interface AppProps {
  header: string
  children: ReactNode
}

export default function App({ header, children }: AppProps) {
  const { user } = useAuth()

  if (user === undefined) {
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
