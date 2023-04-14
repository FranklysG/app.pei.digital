import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

import axios from '../lib/axios'
import { SkillsType } from '../@types'

type SkillProps = {
  skill: SkillsType[] | SkillsType
}

type SkillProviderProps = {
  children?: ReactNode
}

export const Skill = createContext({} as SkillProps)

function SkillProvider({ children }: SkillProviderProps) {
  const [skill, setSkill] = useState<SkillsType[]>()

  useEffect(() => {
    ;(async () => {
      await axios
        .get('/api/skill')
        .then((res) => res.data.data)
        .then((data) => {
          setSkill(data)
        })
        .catch(() => {})
    })()
  }, [])

  const values = {
    skill,
  }
  return <Skill.Provider value={values}>{children}</Skill.Provider>
}

function useSkill() {
  const context = useContext(Skill)
  if (context === undefined) {
    throw new Error('useSkill must be used within an SkillProvider')
  }
  return context
}

export { SkillProvider, useSkill }
