import { ChatResponse, CodeOutput, Snippet } from '@/interfaces/Snippet'
import { request } from './request'
import { Guildbook } from '@/interfaces/Guildbook'
import { Question } from '@/interfaces/Question'
import { Course } from '@/interfaces/Course'

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

  coruse: {
    getAll: () =>
      request<Course[]>({
        method: 'GET',
        route: '/api/v1/courses',
        auth: true,
      }),

    getById: (id: number) =>
      request<Course>({
        method: 'GET',
        route: `/api/v1/courses/${id}`,
        auth: true,
      }),

    create: (title: string, course_id: number, questions: number[]) =>
      request<null>({
        method: 'POST',
        route: '/api/v1/courses',
        body: { title, course_id, questions },
        auth: true,
      }),

    update: (
      id: number,
      data: {
        title?: string
      },
    ) =>
      request<null>({
        method: 'PUT',
        route: `/api/v1/courses/${id}`,
        body: data,
        auth: true,
      }),

    delete: (id: number) =>
      request<undefined>({
        method: 'DELETE',
        route: `/api/v1/courses/${id}`,
        auth: true,
      }),
  },

  level: {
    getAll: () =>
      request<Snippet[]>({
        method: 'GET',
        route: '/api/v1/levels',
        auth: true,
      }),

    getById: (id: number) =>
      request<Snippet>({
        method: 'GET',
        route: `/api/v1/levels/${id}`,
        auth: true,
      }),

    create: (title: string, course_id: number, questions: number[]) =>
      request<null>({
        method: 'POST',
        route: '/api/v1/levels',
        body: { title, course_id, questions },
        auth: true,
      }),

    update: (
      id: number,
      data: {
        title?: string
        course_id?: number
        questions?: number[]
      },
    ) =>
      request<undefined>({
        method: 'PUT',
        route: `/api/v1/levels/${id}`,
        body: data,
        auth: true,
      }),

    delete: (id: number) =>
      request<undefined>({
        method: 'DELETE',
        route: `/api/v1/levels/${id}`,
        auth: true,
      }),

    getQuestions: (id: number) =>
      request<Question[]>({
        method: 'GET',
        route: `/api/v1/levels/${id}/questions`,
        auth: true,
      }),

    attachQuestion: (levelId: number, questionId: number) =>
      request<undefined>({
        method: 'POST',
        route: `/api/v1/levels/${levelId}/questions/${questionId}`,
        auth: true,
      }),

    bulkAttachQuestions: (levelId: number, questions: number[]) =>
      request<undefined>({
        method: 'POST',
        route: `/api/v1/levels/${levelId}/questions/bulk`,
        body: { questions },
        auth: true,
      }),

    detachQuestion: (levelId: number, questionId: number) =>
      request<undefined>({
        method: 'DELETE',
        route: `/api/v1/levels/${levelId}/questions/${questionId}`,
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

  question: {
    check: (prompt: string, id: number) =>
      request<boolean>({
        method: 'POST',
        route: `/api/v1/questions/check/${id}`,
        auth: true,
        body: { prompt: prompt },
      }),
  },

  guildbook: {
    getAll: () =>
      request<Guildbook[]>({
        method: 'GET',
        route: `/api/v1/guildbooks`,
        auth: true,
      }),

    getById: (id: number) =>
      request<Guildbook>({
        method: 'GET',
        route: `/api/v1/guildbooks/${id}`,
        auth: true,
      }),

    create: (course_id: number, title: string, content: string) =>
      request<null>({
        method: 'POST',
        route: '/api/v1/guildbooks',
        body: { course_id, title, content },
        auth: true,
      }),

    update: (
      id: number,
      data: {
        course_id: number
        title: string
        content: string
      },
    ) =>
      request<undefined>({
        method: 'PUT',
        route: `/api/v1/guildbooks/${id}`,
        body: data,
        auth: true,
      }),

    delete: (id: number) =>
      request<undefined>({
        method: 'DELETE',
        route: `/api/v1/guildbooks/${id}`,
        auth: true,
      }),

    chat: (prompt: string, id: number) =>
      request<ChatResponse>({
        method: 'POST',
        route: `/api/v1/guildbooks/chat/${id}`,
        auth: true,
        body: { prompt: prompt },
      }),
  },

  run: (code: string) =>
    request<CodeOutput>({
      method: 'POST',
      route: `/api/v1/run/`,
      auth: true,
      body: { code: code },
    }),
}
