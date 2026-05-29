import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, getApiErrorMessage, isTokenExpired } from '@/services/api.js'

const isClient = () => typeof window !== 'undefined'
const lsGet = (k) => (isClient() ? localStorage.getItem(k) : null)
const lsSet = (k, v) => { if (isClient()) localStorage.setItem(k, v) }
const lsDel = (k) => { if (isClient()) localStorage.removeItem(k) }

export const useAuthStore = defineStore('auth', () => {
  const token = ref(lsGet('cms_token'))
  const user = ref(JSON.parse(lsGet('cms_user') || 'null'))
  const loading = ref(false)
  const selectedCompany = ref(JSON.parse(lsGet('cms_company') || 'null'))

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const role = computed(() => user.value?.role?.name || null)

  const permissions = computed(() => {
    const perms = user.value?.role?.permissions
    if (!perms) return []
    if (Array.isArray(perms)) return perms
    if (typeof perms === 'string') {
      try { return JSON.parse(perms) } catch { return [] }
    }
    return []
  })

  function hasPermission(permission) {
    if (!isAuthenticated.value) return false
    if (role.value === 'SuperAdmin') return true
    if (!permission) return true
    return permissions.value.includes(permission)
  }

  function hasAnyPermission(permList = []) {
    if (!permList.length) return true
    if (role.value === 'SuperAdmin') return true
    return permList.some((p) => permissions.value.includes(p))
  }

  function persistSession({ token: tk, user: usr } = {}) {
    if (tk) {
      token.value = tk
      lsSet('cms_token', tk)
    }
    if (usr !== undefined) {
      user.value = usr
      lsSet('cms_user', JSON.stringify(usr))
    }
  }

  function hydrateSession() {
    const storedToken = lsGet('cms_token') || lsGet('bambito_token')
    const storedUser = lsGet('cms_user') || lsGet('bambito_user')
    const storedCompany = lsGet('cms_company')

    token.value = storedToken || null
    try {
      user.value = storedUser ? JSON.parse(storedUser) : null
    } catch {
      user.value = null
      lsDel('cms_user')
    }
    try {
      selectedCompany.value = storedCompany ? JSON.parse(storedCompany) : null
    } catch {
      selectedCompany.value = null
    }
  }

  async function ensureSession() {
    hydrateSession()
    if (!token.value) return false
    if (isTokenExpired(token.value)) {
      await logout()
      return false
    }
    const hasStoredPermissions = Array.isArray(permissions.value) && permissions.value.length > 0
    if (user.value && hasStoredPermissions) return true
    try {
      await fetchProfile()
      return !!token.value && !!user.value
    } catch {
      await logout()
      return false
    }
  }

  async function login(email, password) {
    loading.value = true
    try {
      const response = await authService.login({ email, password })
      const payload = response?.data ?? response
      const tk = payload?.token || payload?.accessToken || payload?.jwt
      const usr = payload?.user || payload?.profile || null

      if (!tk || !usr) {
        return {
          success: false,
          error: 'La respuesta del servidor no contiene token o usuario.'
        }
      }

      persistSession({ token: tk, user: usr })

      return {
        success: true,
        user: usr,
        token: tk,
        message: 'Sesión iniciada correctamente.'
      }
    } catch (error) {
      return {
        success: false,
        error: getApiErrorMessage(error)
      }
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    try {
      const response = await authService.getProfile()
      const profile = response?.data ?? response
      if (profile) {
        user.value = profile
        lsSet('cms_user', JSON.stringify(profile))
      }
      return profile
    } catch (error) {
      if (error?.error === 'TOKEN_EXPIRED' || error?.status === 401) {
        logout()
      }
      throw error
    }
  }

  async function logout() {
    try {
      if (token.value) {
        await authService.logout().catch(() => {})
      }
    } finally {
      token.value = null
      user.value = null
      selectedCompany.value = null
      lsDel('cms_token')
      lsDel('cms_user')
      lsDel('cms_company')
      lsDel('bambito_token')
      lsDel('bambito_user')
    }
  }

  function selectCompany(company) {
    selectedCompany.value = company
    lsSet('cms_company', JSON.stringify(company))
  }

  function getToken() {
    return token.value
  }

  return {
    token,
    user,
    loading,
    role,
    permissions,
    isAuthenticated,
    selectedCompany,
    hydrateSession,
    ensureSession,
    hasPermission,
    hasAnyPermission,
    login,
    logout,
    fetchProfile,
    getToken,
    selectCompany
  }
})
