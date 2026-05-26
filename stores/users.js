import { defineStore } from 'pinia'
import { useApi } from '~/services/api'
import { normalizeUser } from '~/utils/normalizers'

export const useUsersStore = defineStore('users', {
  state: () => ({
    items: [],
    total: 0,
    loading: false,
    filters: { search: '', role: 'all' },
    lookupState: 'idle',
    lookedUpUser: null,
  }),

  getters: {
    filtered: (state) => {
      let res = state.items
      if (state.filters.search) {
        const q = state.filters.search.toLowerCase()
        res = res.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q) ||
            u.internalId.toLowerCase().includes(q)
        )
      }
      if (state.filters.role !== 'all') {
        res = res.filter((u) => u.role === state.filters.role)
      }
      return res
    },
    roleSummary: (state) => {
      const map = {}
      state.items.forEach((u) => { map[u.role] = (map[u.role] ?? 0) + 1 })
      return map
    },
  },

  actions: {
    async fetch(companyId) {
      this.loading = true
      try {
        const api = useApi()
        const res = await api.get('/GetCMSUsers_CMS', { params: { companyId } })
        const d = res.data
        this.items = (d.data ?? d ?? []).map(normalizeUser)
        this.total = d.pagination?.total ?? this.items.length
      } finally {
        this.loading = false
      }
    },

    async lookupCollaborator(internalId) {
      this.lookupState = 'loading'
      this.lookedUpUser = null
      try {
        const api = useApi()
        const res = await api.get(`/GetCollaborator_CMS/${internalId}`)
        this.lookedUpUser = normalizeUser(res.data?.data ?? res.data)
        const alreadyHas = this.items.some((u) => u.internalId === internalId)
        this.lookupState = alreadyHas ? 'already_has_access' : 'found'
      } catch (err) {
        this.lookupState = err.response?.status === 404 ? 'not_found' : 'not_found'
        this.lookedUpUser = null
      }
    },

    async assignRole(payload) {
      const api = useApi()
      const res = await api.post('/AssignRole_CMS', payload)
      return normalizeUser(res.data?.data ?? res.data)
    },

    async updateRole(userId, role) {
      const api = useApi()
      const res = await api.put(`/UpdateUserRole_CMS/${userId}`, { role })
      const user = normalizeUser(res.data?.data ?? res.data)
      const idx = this.items.findIndex((u) => u.id === userId)
      if (idx !== -1) this.items[idx] = user
      return user
    },

    async revokeAccess(userId) {
      const api = useApi()
      await api.delete(`/RevokeAccess_CMS/${userId}`)
      this.items = this.items.filter((u) => u.id !== userId)
      this.total = Math.max(0, this.total - 1)
    },

    resetLookup() {
      this.lookupState = 'idle'
      this.lookedUpUser = null
    },

    setFilter(key, val) { this.filters[key] = val },
  },
})
