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

  const show = useCallback(async () => {
    await axios
      .get('/api/workspace')
      .then((res) => res.data.data)
      .then((data) => {
        setWorkspace(data)
      })
      .catch((error) => {})
  }, [])

  useMount(() => {
    show()
  })

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
