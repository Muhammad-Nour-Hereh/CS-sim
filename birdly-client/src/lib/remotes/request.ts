import axios from "axios"
import { baseURL } from "./axios_defaults"

axios.defaults.baseURL = baseURL

export type RequestMethods = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATACH: "PATACH",
  DELETE: "DELETE",
};

export const request = async (
  method: string,
  route: string,
  body?: any,
  auth = false,
  optimistic?: (body: any) => void,
  rollback?: () => void
) => {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": ""
  }

  if (auth) {
    headers.Authorization = `Bearer ${localStorage.access_token}`
  }

  try {
    if (optimistic) {
      optimistic(body)
    }

    const response = await axios.request({
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
      message: error.message,
    }
  }
}
