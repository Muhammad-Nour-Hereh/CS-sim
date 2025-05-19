export interface Snippet {
  id: number
  title: string
  language: string
  code: string
  created_at: string
  updated_at: string
}

export interface CodeOutput {
  status: string
  output: string
}

export interface ChatResponse {
  response: string
}
