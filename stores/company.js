import { defineStore } from 'pinia'
import { useApi } from '~/services/api'
import { normalizeCompany } from '~/utils/normalizers'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    list: [],
    active: null,
    loading: false,
  }),

  getters: {
    activeId: (state) => state.active?.id ?? null,
    activeName: (state) => state.active?.name ?? '',
    hasMultiple: (state) => state.list.length > 1,
  },

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const api = useApi()
        const res = await api.get('/GetCompanies_CMS')
        this.list = (res.data?.data ?? res.data ?? []).map(normalizeCompany)
      } finally {
        this.loading = false
      }
    },

    async setActive(companyId) {
      const found = this.list.find((c) => String(c.id) === String(companyId))
      if (found) {
        this.active = found
        localStorage.setItem('cms_company_id', String(found.id))
      }
    },

    restoreFromStorage() {
      const stored = localStorage.getItem('cms_company_id')
      if (stored && this.list.length) {
        const found = this.list.find((c) => String(c.id) === stored)
        if (found) {
          this.active = found
          return true
        }
      }
      return false
    },

    initFromAuth(companies) {
      if (companies?.length) {
        this.list = companies.map(normalizeCompany)
        if (!this.active) {
          const restored = this.restoreFromStorage()
          if (!restored) this.active = this.list[0]
        }
      }
    },

    clear() {
      this.list = []
      this.active = null
    },
  },
})
