import { defineStore } from 'pinia'
import { jwtDecode } from 'jwt-decode'
import { useApi } from '~/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    role: null,
    permissions: [],
    companies: [],
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.name ?? state.user?.fullName ?? '',
    userEmail: (state) => state.user?.email ?? '',
    userAvatar: (state) => state.user?.avatar ?? null,
  },

  actions: {
    init() {
      const token = localStorage.getItem('cms_token')
      if (token) {
        try {
          const decoded = jwtDecode(token)
          if (decoded.exp * 1000 < Date.now()) {
            this.logout()
            return false
          }
          this.token = token
          const saved = localStorage.getItem('cms_user')
          if (saved) {
            const data = JSON.parse(saved)
            this.user = data.user
            this.role = data.role
            this.permissions = data.permissions ?? []
            this.companies = data.companies ?? []
          }
          return true
        } catch {
          this.logout()
          return false
        }
      }
      return false
    },

    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const api = useApi()
        const res = await api.post('/CMS/login', { email, password })
        const { token, user, role, permissions, companies } = res.data
        this.token = token
        this.user = user
        this.role = role
        this.permissions = permissions ?? []
        this.companies = companies ?? []
        localStorage.setItem('cms_token', token)
        localStorage.setItem('cms_user', JSON.stringify({ user, role, permissions, companies }))
        return { success: true, companies }
      } catch (err) {
        this.error = err.response?.data?.message ?? 'Credenciales incorrectas'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async fetchMe() {
      try {
        const api = useApi()
        const res = await api.get('/CMS/me')
        const { user, role, permissions, companies } = res.data
        this.user = user
        this.role = role
        this.permissions = permissions ?? []
        this.companies = companies ?? []
        localStorage.setItem('cms_user', JSON.stringify({ user, role, permissions, companies }))
      } catch {
        this.logout()
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.role = null
      this.permissions = []
      this.companies = []
      localStorage.removeItem('cms_token')
      localStorage.removeItem('cms_user')
      localStorage.removeItem('cms_company_id')
    },
  },
})
