import { CodeOutput, Snippet } from '@/interfaces/Snippet'
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

    create: (data: {
      user_id: number
      title: string
      language: string
      code: string
    }) =>
      request<null>({
        method: 'POST',
        route: '/api/v1/snippets',
        body: data,
        auth: true,
      }),

    update: (
      id: string,
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

    delete: (id: string) =>
      request<undefined>({
        method: 'DELETE',
        route: `/api/v1/snippets/${id}`,
        auth: true,
      }),

    run: (id: string) =>
      request<CodeOutput>({
        method: 'POST',
        route: `/api/v1/snippets/run/${id}`,
        auth: true,
      }),
  },
}
