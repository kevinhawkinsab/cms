import { defineStore } from 'pinia'
import { useApi } from '~/services/api'
import { normalizeCategory } from '~/utils/normalizers'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    items: [],
    loading: false,
    search: '',
  }),

  getters: {
    filtered: (state) => {
      if (!state.search) return state.items
      const q = state.search.toLowerCase()
      return state.items.filter(
        (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
      )
    },
    total: (state) => state.items.length,
  },

  actions: {
    async fetch(companyId) {
      this.loading = true
      try {
        const api = useApi()
        const res = await api.get('/GetCategories_CMS/categories', { params: { companyId } })
        this.items = (res.data?.data ?? res.data ?? []).map(normalizeCategory)
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      const api = useApi()
      const res = await api.post('/CreateCategory_CMS/categories', payload)
      const cat = normalizeCategory(res.data?.data ?? res.data)
      this.items.unshift(cat)
      return cat
    },

    async update(id, payload) {
      const api = useApi()
      const res = await api.put(`/UpdateCategory_CMS/categories/${id}`, payload)
      const cat = normalizeCategory(res.data?.data ?? res.data)
      const idx = this.items.findIndex((c) => c.id === id)
      if (idx !== -1) this.items[idx] = cat
      return cat
    },

    async remove(id) {
      const api = useApi()
      await api.delete(`/DeleteCategory_CMS/${id}`)
      this.items = this.items.filter((c) => c.id !== id)
    },

    setSearch(val) { this.search = val },
  },
})
