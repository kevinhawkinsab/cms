import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

/**
 * =====================================================
 * CONFIG
 * =====================================================
 * En Nuxt 3, baseURL se inyecta vía plugin desde useRuntimeConfig.
 * Aquí creamos la instancia con baseURL vacío y luego en el plugin
 * `~/plugins/api.ts` se asigna api.defaults.baseURL.
 */
const LOGIN_PATH = '/bambito-cms'
const isClient = typeof window !== 'undefined'

/**
 * AUTH HELPERS (sólo cliente — usan localStorage)
 */
export const getToken = () => {
  if (!isClient) return null
  return localStorage.getItem('bambito_token')
}

export const getDecodedToken = () => {
  const token = getToken()
  if (!token) return null
  try {
    return jwtDecode(token)
  } catch (error) {
    console.error('[JWT] Error decodificando token:', error)
    return null
  }
}

export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token)
    return decoded.exp * 1000 < Date.now()
  } catch {
    return true
  }
}

export const getUserIdFromToken = () => {
  const decoded = getDecodedToken();
  return decoded?.sub || decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null
}

/**
 * ERROR HELPER
 */
export const getApiErrorMessage = (error) => {
  if (!error) return 'Ocurrió un error inesperado.'
  if (typeof error === 'string') return error
  return (
    error?.message ||
    error?.error ||
    error?.detail ||
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    'Ocurrió un error inesperado.'
  )
}

/**
 * AXIOS INSTANCE
 */
const api = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' }
})

/**
 * REQUEST INTERCEPTOR (sólo cliente)
 */
api.interceptors.request.use((config) => {
  if (!isClient) return config

  const token = getToken()
  if (token) {
    if (isTokenExpired(token)) {
      console.warn('[AUTH] Token expirado')
      localStorage.removeItem('bambito_token')
      localStorage.removeItem('bambito_user')
      if (window.location.pathname.startsWith('/bambito-cms')) {
        window.location.href = LOGIN_PATH
      }
      return Promise.reject('Token expirado')
    }
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  }
  return config
})

/**
 * RESPONSE INTERCEPTOR
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const data = error.response?.data
    const requestUrl = error.config?.url || ''

    if (!error.response) {
      // Sin response = falla de red, CORS, cert self-signed o backend caído
      const msg = error?.message || 'Error de conexión con el servidor'
      console.error(
        `[API NETWORK] No se pudo contactar al backend para "${requestUrl}".`,
        '\n   Causa probable: backend caído, CORS no configurado, certificado HTTPS no aceptado o proxy mal configurado.',
        '\n   Mensaje original:', msg
      )
      return Promise.reject({
        error: 'NETWORK_ERROR',
        message: 'No se pudo contactar al servidor. Verifica que el API esté corriendo y accesible.',
        originalMessage: msg
      })
    }

    if (status === 401 && isClient) {
      const isLoginRequest = requestUrl.includes('/CMS/login')
      if (!isLoginRequest) {
        console.warn('[AUTH] Sesión expirada')
        localStorage.removeItem('bambito_token')
        localStorage.removeItem('bambito_user')
        const currentPath = window.location.pathname
        const isCmsArea = currentPath.startsWith('/bambito-cms')
        if (isCmsArea && currentPath !== LOGIN_PATH) {
          window.location.href = LOGIN_PATH
        }
      }
    }

    if (status === 403) {
      console.warn('[CMS] Permiso denegado:', data?.message || data?.error)
    }

    return Promise.reject(data || { error: 'UNKNOWN_ERROR', message: error.message })
  }
)

/**
 * SERVICES
 */
export const authService = {
  login: async (credentials) => {
    // Devuelve la respuesta del API tal cual (el store se encarga de persistir).
    // Esperado: { token, expiresAt, user: { id, email, role: { name, permissions } } }
    return await api.post('/CMS/login', credentials)
  },
  getProfile: () => api.get('/CMS/me'),
  logout: () => {
    if (isClient) {
      localStorage.removeItem('bambito_token')
      localStorage.removeItem('bambito_user')
    }
    return api.post('/CMS/logout')
  }
}

export const postsService = {
  getAll: (params = {}) => api.get('/GetPosts_CMS/posts', { params }),
  getById: (id) => api.get(`/GetPostById_CMS/${id}`),
  getBySlug: (slug) => api.get(`/GetPostBySlug_CMS/slug/${slug}`),
  create: (data) => api.post('/CreatePost_CMS/posts', data),
  update: (id, data) => api.put(`/UpdatePost_CMS/posts/${id}`, data),
  toggleVisibility: (id, visible) =>
    api.patch(`/UpdateVisibility_CMS/${id}/visibility`, {
      isVisible: visible,
      visible
    }),
  delete: (id) => api.delete(`/DeletePost_CMS/${id}`)
}

export const categoriesService = {
  getAll: () => api.get('/GetCategories_CMS/categories'),
  getById: (id) => api.get(`/GetCategory_CMS/categories/${id}`),
  create: (data) => api.post('/CreateCategory_CMS/categories', data),
  update: (id, data) => api.put(`/UpdateCategory_CMS/categories/${id}`, data),
  delete: (id) => api.delete(`/DeleteCategory_CMS/categories/${id}`),
}

export const mediaService = {
  getAll: (params = {}) => api.get('/GetMedia_CMS/media', { params }),
  upload: (file, metadata = {}) => {
    const formData = new FormData()
    const currentUserId =
      metadata.uploadedById ||
      metadata.uploadedBy ||
      metadata.createdBy ||
      metadata.updatedBy ||
      getUserIdFromToken() ||
      ''

    formData.append('file', file)
    Object.entries(metadata).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, typeof value === 'boolean' ? String(value) : value)
      }
    })
    if (currentUserId) {
      formData.append('uploadedById', currentUserId)
      formData.append('UploadedById', currentUserId)
      formData.append('uploadedBy', currentUserId)
      formData.append('createdBy', currentUserId)
      formData.append('updatedBy', currentUserId)
    }
    return api.post('/UploadMedia_CMS/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  update: (id, data) => api.put(`/UpdateMedia_CMS/media/${id}`, data),
  delete: (id) => api.delete(`/DeleteMedia_CMS/media/${id}`)
}

export const pageLayoutService = {
  getByRouteKey: (routeKey) => api.get(`/GetPageLayout_CMS/${routeKey}`),
  upsert: (routeKey, data = {}) =>
    api.put(`/UpsertPageLayout_CMS/${routeKey}`, {
      name: data?.name || 'Sala de Prensa',
      updatedBy: data.updatedBy || getUserIdFromToken() || '8aa53b35-f94c-4862-8bc5-b1e3c0b448f3',
      blocks: Array.isArray(data?.blocks) ? data.blocks : []
    })
}

export const bambitoService = {
  updateOrderStatus: () => api.get('/OrderUpdateStatus'),
  getPendingInvoices: () => api.get('/InvoicePending')
}

export default api
