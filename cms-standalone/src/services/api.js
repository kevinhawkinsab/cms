import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const LOGIN_PATH = '/login'
const isClient = typeof window !== 'undefined'

// API base URL from env variable or fallback
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://trencoapp.tropigas.com.pa/fortshielddev/api/PBambito'

export const getToken = () => {
  if (!isClient) return null
  return localStorage.getItem('cms_token') || localStorage.getItem('bambito_token')
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
  const decoded = getDecodedToken()
  return decoded?.sub || decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || null
}

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

// ── Audit helpers ──────────────────────────────────────────────────────────────

function inferAction(method, url) {
  if (url.includes('/login')) return 'LOGIN'
  if (url.includes('/logout')) return 'LOGOUT'
  if (url.includes('Visibility') || url.includes('visibility')) return 'PUBLISH'
  if (method === 'POST') return 'CREATE'
  if (method === 'PUT' || method === 'PATCH') return 'UPDATE'
  if (method === 'DELETE') return 'DELETE'
  return 'VIEW'
}

function inferEntity(url) {
  if (url.includes('/posts') || url.includes('Post')) return 'Post'
  if (url.includes('/categories') || url.includes('Categor')) return 'Category'
  if (url.includes('/media') || url.includes('Media')) return 'Media'
  if (url.includes('/users') || url.includes('User')) return 'User'
  if (url.includes('/roles') || url.includes('Role')) return 'Role'
  if (url.includes('PageLayout') || url.includes('layout')) return 'PageLayout'
  if (url.includes('/login') || url.includes('/logout')) return 'Session'
  return 'System'
}

function shouldAudit(method, url) {
  if (method !== 'GET') return true
  // Log specific GET endpoints
  if (url.includes('/login') || url.includes('/me')) return true
  return false
}

function sendAuditEntry(entry) {
  import('@/stores/auditLog.js')
    .then((mod) => {
      const store = mod.useAuditLogStore?.()
      if (store && typeof store.addEntry === 'function') {
        store.addEntry(entry)
      }
    })
    .catch(() => {
      // Silently fail — audit must never block the app
    })
}

// ── Axios instance ─────────────────────────────────────────────────────────────

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

// ── Request interceptors ───────────────────────────────────────────────────────

api.interceptors.request.use((config) => {
  if (!isClient) return config

  // Stamp start time for response-time calculation
  config._startTime = Date.now()

  const token = getToken()
  if (token) {
    if (isTokenExpired(token)) {
      console.warn('[AUTH] Token expirado')
      localStorage.removeItem('cms_token')
      localStorage.removeItem('cms_user')
      localStorage.removeItem('bambito_token')
      localStorage.removeItem('bambito_user')
      if (window.location.pathname !== LOGIN_PATH) {
        window.location.href = LOGIN_PATH
      }
      return Promise.reject('Token expirado')
    }
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
  }
  return config
})

// ── Response interceptors ──────────────────────────────────────────────────────

api.interceptors.response.use(
  (response) => {
    // ── Audit (success) ──
    try {
      const config = response.config
      const method = config.method?.toUpperCase() || 'GET'
      const url = config.url || ''

      if (isClient && shouldAudit(method, url)) {
        const user = JSON.parse(localStorage.getItem('cms_user') || 'null')
        const rawPayload = config.data
        let parsedPayload = rawPayload
        if (typeof rawPayload === 'string') {
          try { parsedPayload = JSON.parse(rawPayload) } catch { parsedPayload = rawPayload }
        }

        sendAuditEntry({
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          userId: user?.id || user?.Id || 'anonymous',
          userName: user?.fullName || user?.firstName || user?.email || 'Sistema',
          userAvatar: null,
          action: inferAction(method, url),
          entity: inferEntity(url),
          entityId: null,
          description: `${method} ${url}`,
          endpoint: url,
          method,
          statusCode: response.status,
          responseTimeMs: Date.now() - (config._startTime || Date.now()),
          payload: parsedPayload,
          ipAddress: '—',
          userAgent: navigator.userAgent.substring(0, 80),
          companyId: JSON.parse(localStorage.getItem('cms_company') || 'null')?.id || null
        })
      }
    } catch {
      // Audit errors must never propagate
    }

    return response.data
  },
  (error) => {
    // ── Audit (error) ──
    try {
      const config = error.config
      if (isClient && config) {
        const method = config.method?.toUpperCase() || 'GET'
        const url = config.url || ''

        if (shouldAudit(method, url)) {
          const user = JSON.parse(localStorage.getItem('cms_user') || 'null')
          const rawPayload = config.data
          let parsedPayload = rawPayload
          if (typeof rawPayload === 'string') {
            try { parsedPayload = JSON.parse(rawPayload) } catch { parsedPayload = rawPayload }
          }

          sendAuditEntry({
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            userId: user?.id || user?.Id || 'anonymous',
            userName: user?.fullName || user?.firstName || user?.email || 'Sistema',
            userAvatar: null,
            action: inferAction(method, url),
            entity: inferEntity(url),
            entityId: null,
            description: `${method} ${url}`,
            endpoint: url,
            method,
            statusCode: error.response?.status,
            responseTimeMs: Date.now() - (config._startTime || Date.now()),
            payload: parsedPayload,
            ipAddress: '—',
            userAgent: navigator.userAgent.substring(0, 80),
            companyId: JSON.parse(localStorage.getItem('cms_company') || 'null')?.id || null
          })
        }
      }
    } catch {
      // Audit errors must never propagate
    }

    // ── Original error handling ──
    const status = error.response?.status
    const data = error.response?.data
    const requestUrl = error.config?.url || ''

    if (!error.response) {
      const msg = error?.message || 'Error de conexión con el servidor'
      console.error(
        `[API NETWORK] No se pudo contactar al backend para "${requestUrl}".`,
        '\n   Causa probable: backend caído, CORS no configurado, certificado HTTPS no aceptado.',
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
        localStorage.removeItem('cms_token')
        localStorage.removeItem('cms_user')
        localStorage.removeItem('bambito_token')
        localStorage.removeItem('bambito_user')
        if (window.location.pathname !== LOGIN_PATH) {
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

export const authService = {
  login: async (credentials) => {
    return await api.post('/CMS/login', credentials)
  },
  getProfile: () => api.get('/CMS/me'),
  logout: () => {
    if (isClient) {
      localStorage.removeItem('cms_token')
      localStorage.removeItem('cms_user')
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
  delete: (id) => api.delete(`/DeleteCategory_CMS/categories/${id}`)
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
      name: data?.name || 'Página',
      updatedBy: data.updatedBy || getUserIdFromToken() || '',
      blocks: Array.isArray(data?.blocks) ? data.blocks : []
    })
}

export const usersService = {
  getAll: () => api.get('/GetCMSUsers_CMS/users'),
  validateByInternalId: (internalId) => api.get(`/ValidateEmployee_CMS/employees/${internalId}`),
  getRoles: () => api.get('/GetRoles_CMS/roles'),
  assignAccess: (userId, roleId) => api.post('/AssignCMSAccess_CMS/users/access', { UserId: userId, RoleId: roleId }),
  removeAccess: (userId) => api.delete(`/RemoveCMSAccess_CMS/users/${userId}/access`)
}

export default api
