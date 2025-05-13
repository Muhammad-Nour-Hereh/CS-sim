import axios, { AxiosResponse } from 'axios'
import { baseURL } from './axios_defaults'

axios.defaults.baseURL = baseURL

export enum RequestMethods {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface RequestParams {
  method: keyof typeof RequestMethods
  route: string
  body?: any
  auth?: boolean
  optimistic?: (body: any) => void
  rollback?: () => void
}

interface ResponseData {
  success?: 'true' | 'false'
  error?: boolean
  message?: string
  data?: string
}

export const request = async ({
  method,
  route,
  body,
  auth = false,
  optimistic,
  rollback,
}: RequestParams): Promise<ResponseData> => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    headers.Authorization = `Bearer ${localStorage.getItem('access_token')}` // Assuming access_token is stored in localStorage
  }

  try {
    if (optimistic) {
      optimistic(body)
    }

    const response: AxiosResponse = await axios.request({
      method,
      headers,
      url: route,
      data: body,
    })

    return response.data
  } catch (error: any) {
    if (rollback) {
      rollback()
    }

    return {
      error: true,
      message: error.message || 'An error occurred',
    }
  }
}
