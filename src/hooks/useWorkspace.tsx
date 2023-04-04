import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import axios from '../lib/axios'
import { WorkspaceType } from '../@types'

type WorkspaceProps = {
  workspace: WorkspaceType[]
}

type WorkspaceProviderProps = {
  children?: ReactNode
}

export const Workspace = createContext({} as WorkspaceProps)

function WorkspaceProvider({ children }: WorkspaceProviderProps) {
  const [workspace, setWorkspace] = useState<WorkspaceType[]>([])

  useEffect(() => {
    ;(async () => {
      await axios
        .get('/api/workspace')
        .then((res) => res.data.data)
        .then((data) => {
          setWorkspace(data)
        })
        .catch(() => {})
    })()
  }, [])

  const values = {
    workspace,
    setWorkspace,
  }
  return <Workspace.Provider value={values}>{children}</Workspace.Provider>
}

function useWorkspace() {
  const context = useContext(Workspace)
  if (context === undefined) {
    throw new Error('useWorkspace must be used within an WorkspaceProvider')
  }
  return context
}

export { WorkspaceProvider, useWorkspace }
