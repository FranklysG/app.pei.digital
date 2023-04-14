export interface Requests {
  id: string
  name: string
  href: string
  status: string
  date: string
  datetime: string
}

export interface WorkspaceType {
  uuid: string
  requests: number
  created_at: string
  updated_at: string
}

export interface SettingType {
  uuid: string
  first_name: string
  last_name: string
  contact_movel: string
  contact_email: string
  created_at: string
  updated_at: string
}

export interface UserType {
  uuid: string
  name: string
  email: string
  email_verified_at: boolean | null
  role: string
  created_at: string
  updated_at: string
}

export interface FormType {
  workspace_id: number
  uuid: string
  title: string
  school: string
  name: string
  year: string
  class: string
  bout: string
  birthdate: string
  father: string
  mother: string
  diagnostic: string
  description: string
  specialist_bool: boolean
  family_description: string
  objective: string
  proposal_one: boolean
  proposal_two: boolean
  proposal_three: boolean
  proposal_four: boolean
  proposal_five: boolean
  proposal_six: boolean
  proposal_seven: boolean
  proposal_eight: boolean
  objective_adaptive: string
  action_adaptive: string
  resources_tech: string
  resources_avaliation: string
  object: string
  conclusion: string
  type: string
  status: string
  date: string
  created_at: string
  updated_at: string
  author: string
  medical: string
  medical_uuid: string

  specialtys: SpecialtysType
  skills: SkillsType
  goals: GoalsType
}

export interface SpecialtysType {
  uuid: string
  name: string
  location: string
  professional: string
  day: string
  hour: string
  contact: string
}

export interface SpecialistType {
  uuid: string
  name: string
  area: string
  residence: string
  created_at: string
  updated_at: string
}

export interface SkillsType {
  uuid: string
  title: string
  helper: string
}

export interface GoalsType {
  matematica: GoalsExtractType
  linguagens: GoalsExtractType
  natureza: GoalsExtractType
  humanas: GoalsExtractType
  religiao: GoalsExtractType
  diaria: GoalsExtractType
}

export interface GoalsExtractType {
  uuid: string
  goal: string
  period: string
  perfomance: string
  strategy: string
  resource: string
  slug: string
}
