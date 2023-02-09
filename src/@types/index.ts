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

export interface FormType {
  workspace_id: number
  uuid: string
  name: string
  type: string
  status: string
  date: string
  created_at: string
  updated_at: string
  author: string
}