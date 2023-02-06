import React, { createContext, ReactNode, useContext, useState } from 'react'

type GlobalProps = {
  openSidebar: boolean
  setOpenSidebar: (data: boolean) => void
  openPanel: boolean
  setOpenPanel: (data: boolean) => void
}

type GlobalProviderProps = {
  children?: ReactNode
}

export const Global = createContext({} as GlobalProps)

function GlobalProvider({ children }: GlobalProviderProps) {
  const [openSidebar, setOpenSidebar] = useState(false)
  const [openPanel, setOpenPanel] = useState(false)

  const values = {
    openSidebar,
    setOpenSidebar,
    openPanel,
    setOpenPanel,
  }

  return <Global.Provider value={values}>{children}</Global.Provider>
}

function useGlobal() {
  const context = useContext(Global)
  if (context === undefined) {
    throw new Error('useGlobal must be used within an GlobalProvider')
  }
  return context
}

export { GlobalProvider, useGlobal }
