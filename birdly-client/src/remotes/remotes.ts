import { ChatResponse, CodeOutput, Snippet } from '@/interfaces/Snippet'
import { request } from './request'

export const remote = {
  // Auth APIs:
  auth: {
    register: (name: string, email: string, password: string) =>
      request<string>({
        method: 'POST',
        route: '/api/v1/auth/register',
        body: { name, email, password },
      }),

    login: (email: string, password: string) =>
      request<string>({
        method: 'POST',
        route: '/api/v1/auth/login',
        body: { email, password },
      }),

    me: () =>
      request<string>({
        method: 'GET',
        route: '/api/v1/auth/me',
        auth: true,
      }),

    logout: () =>
      request({
        method: 'POST',
        route: '/api/v1/auth/logout',
        auth: true,
      }),
  },

  // snippets APIs:
  snippet: {
    getAll: () =>
      request<Snippet[]>({
        method: 'GET',
        route: '/api/v1/snippets',
        auth: true,
      }),

    getById: (id: number) =>
      request<Snippet>({
        method: 'GET',
        route: `/api/v1/snippets/${id}`,
        auth: true,
      }),

    create: (title: string, language: string, code: string) =>
      request<null>({
        method: 'POST',
        route: '/api/v1/snippets',
        body: { title, language, code },
        auth: true,
      }),

    update: (
      id: number,
      data: {
        title?: string
        language?: string
        code?: string
      },
    ) =>
      request<undefined>({
        method: 'PUT',
        route: `/api/v1/snippets/${id}`,
        body: data,
        auth: true,
      }),

    delete: (id: number) =>
      request<undefined>({
        method: 'DELETE',
        route: `/api/v1/snippets/${id}`,
        auth: true,
      }),

    run: (id: number) =>
      request<CodeOutput>({
        method: 'POST',
        route: `/api/v1/snippets/run/${id}`,
        auth: true,
      }),

    chat: (id: number) =>
      request<ChatResponse>({
        method: 'POST',
        route: `/api/v1/snippets/chat/${id}`,
        auth: true,
      }),
  },
  chat: (prompt: string): any =>
    request<CodeOutput>({
      method: 'POST',
      route: `/api/v1/chat`,
      auth: true,
      body: { prompt: prompt },
    }),

  guildbook: {
    getById: (id: number) =>
      request<any>({
        method: 'GET',
        route: `/api/v1//guildbooks/${id}`,
        auth: true,
      }),
  },
}
