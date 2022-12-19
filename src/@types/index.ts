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

export interface IntegrationType {
  uuid: string
  name: string
  acitve: boolean
  token: string
  created_at: string
  updated_at: string
}
