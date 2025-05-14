export let baseURL = ""

export async function loadEnv() {
  const res = await fetch("/env.json")
  const data = await res.json()
  baseURL = data.base_url
}