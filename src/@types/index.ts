import internal from "stream"

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
  name: string
  year: string
  class: string
  bout: string
  birthdate: string
  father: string
  mother: string
  diagnostic: string
  description: string
  type: string
  status: string
  date: string
  created_at: string
  updated_at: string
  author: string
}

export interface SpecialistType {
  uuid: string
  name: string
  area: string
  residence: string
  created_at: string
  updated_at: string
}
