import Head from 'next/head'
import { ReactNode } from 'react'

interface GuestProps {
  children: ReactNode
}

export default function Guest({ children }: GuestProps) {
  return (
    <div className="h-screen">
      <Head>
        <title>Pei Digital | By Unibalsas</title>
      </Head>

      <div className="min-h-full flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          {children}
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <picture>
            <source src="https://source.unsplash.com/random/?/children-study" />
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src="https://source.unsplash.com/random/?/children-study"
              alt=""
            />
          </picture>
        </div>
      </div>
    </div>
  )
}
