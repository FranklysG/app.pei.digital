import Head from 'next/head'
import { ReactNode } from 'react'
import Image from 'next/image'
import banner from '../../assets/img/banner.webp'

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
        <div className="hidden lg:flex flex-1">
          <Image
            className="hidden lg:block relative flex-1 inset-0 h-full w-full object-cover"
            src={banner}
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
