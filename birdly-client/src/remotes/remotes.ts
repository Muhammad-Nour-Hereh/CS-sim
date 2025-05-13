import { request } from './request'

export const remote = {
  auth: {
    register: (name: string, email: string, password: string) =>
      request({
        method: 'POST',
        route: '/api/v1/auth/register',
        body: { name, email, password },
      }),

    login: (email: string, password: string) =>
      request({
        method: 'POST',
        route: '/api/v1/auth/login',
        body: { email, password },
      }),

    me: () =>
      request({
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
  snippet: {
    getAll: () =>
      request({
        method: 'GET',
        route: '/api/v1/snippets',
        auth: true,
      }),

    getById: (id: string) =>
      request({
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
      request({
        method: 'POST',
        route: '/api/v1/snippets',
        body: data,
        auth: true,
      }),

    update: (
      id: string,
      data: {
        title?: string
        lang?: string
        code?: string
      },
    ) =>
      request({
        method: 'PUT',
        route: `/api/v1/snippets/${id}`,
        body: data,
        auth: true,
      }),

    delete: (id: string) =>
      request({
        method: 'DELETE',
        route: `/api/v1/snippets/${id}`,
        auth: true,
      }),

    run: (id: string) =>
      request({
        method: 'POST',
        route: `/api/v1/snippets/run/${id}`,
        auth: true,
      }),
  },
}
