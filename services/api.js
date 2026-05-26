import axios from 'axios'

let apiInstance = null

export function createApi(baseURL) {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  })

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('cms_token')
    if (token) config.headers.Authorization = `Bearer ${token}`

    const companyId = localStorage.getItem('cms_company_id')
    if (companyId && config.method === 'get') {
      config.params = { ...config.params, companyId }
    }

    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('cms_token')
        localStorage.removeItem('cms_user')
        localStorage.removeItem('cms_company_id')
        window.location.href = '/'
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export function useApi() {
  if (!apiInstance) {
    const config = useRuntimeConfig()
    apiInstance = createApi(config.public.apiBase)
  }
  return apiInstance
}
