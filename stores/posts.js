import { defineStore } from 'pinia'
import { useApi } from '~/services/api'
import { normalizePost } from '~/utils/normalizers'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    items: [],
    total: 0,
    page: 1,
    perPage: 12,
    totalPages: 1,
    loading: false,
    overview: { total: 0, published: 0, hidden: 0 },
    filters: { search: '', category: '', status: 'all' },
  }),

  actions: {
    async fetch(companyId) {
      this.loading = true
      try {
        const api = useApi()
        const res = await api.get('/GetPosts_CMS/posts', {
          params: {
            companyId,
            page: this.page,
            perPage: this.perPage,
            search: this.filters.search || undefined,
            category: this.filters.category || undefined,
            status: this.filters.status !== 'all' ? this.filters.status : undefined,
          },
        })
        const d = res.data
        this.items = (d.data ?? d.items ?? []).map(normalizePost)
        this.total = d.pagination?.total ?? d.total ?? this.items.length
        this.totalPages = d.pagination?.totalPages ?? Math.ceil(this.total / this.perPage)
        this.overview = d.overview ?? this.overview
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      const api = useApi()
      const res = await api.post('/CreatePost_CMS/posts', payload)
      return normalizePost(res.data?.data ?? res.data)
    },

    async update(id, payload) {
      const api = useApi()
      const res = await api.put(`/UpdatePost_CMS/posts/${id}`, payload)
      return normalizePost(res.data?.data ?? res.data)
    },

    async toggleVisibility(id) {
      const api = useApi()
      const res = await api.patch(`/UpdateVisibility_CMS/${id}/visibility`)
      return res.data
    },

    async remove(id) {
      const api = useApi()
      await api.delete(`/DeletePost_CMS/${id}`)
      this.items = this.items.filter((p) => p.id !== id)
      this.total = Math.max(0, this.total - 1)
    },

    setPage(page) { this.page = page },
    setPerPage(n) { this.perPage = n; this.page = 1 },
    setFilter(key, val) { this.filters[key] = val; this.page = 1 },
    resetFilters() { this.filters = { search: '', category: '', status: 'all' }; this.page = 1 },
  },
})
