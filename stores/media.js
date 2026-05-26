import { defineStore } from 'pinia'
import { useApi } from '~/services/api'
import { normalizeMedia } from '~/utils/normalizers'

export const useMediaStore = defineStore('media', {
  state: () => ({
    items: [],
    total: 0,
    page: 1,
    perPage: 24,
    totalPages: 1,
    loading: false,
    uploading: false,
    filters: { search: '', type: 'all', category: '' },
  }),

  getters: {
    overview: (state) => ({
      total: state.total,
      images: state.items.filter((m) => m.mimeType?.startsWith('image/')).length,
      documents: state.items.filter((m) => !m.mimeType?.startsWith('image/')).length,
    }),
  },

  actions: {
    async fetch(companyId) {
      this.loading = true
      try {
        const api = useApi()
        const res = await api.get('/GetMedia_CMS/media', {
          params: {
            companyId,
            page: this.page,
            perPage: this.perPage,
            search: this.filters.search || undefined,
            type: this.filters.type !== 'all' ? this.filters.type : undefined,
            category: this.filters.category || undefined,
          },
        })
        const d = res.data
        this.items = (d.data ?? d.items ?? []).map(normalizeMedia)
        this.total = d.pagination?.total ?? d.total ?? this.items.length
        this.totalPages = d.pagination?.totalPages ?? Math.ceil(this.total / this.perPage)
      } finally {
        this.loading = false
      }
    },

    async upload(files, meta, companyId) {
      this.uploading = true
      try {
        const api = useApi()
        const results = []
        for (const file of files) {
          const fd = new FormData()
          fd.append('file', file)
          fd.append('companyId', companyId)
          if (meta.alt) fd.append('alt', meta.alt)
          if (meta.caption) fd.append('caption', meta.caption)
          if (meta.category) fd.append('category', meta.category)
          fd.append('downloadable', meta.downloadable ? '1' : '0')
          const res = await api.post('/UploadMedia_CMS/media/upload', fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          const item = normalizeMedia(res.data?.data ?? res.data)
          this.items.unshift(item)
          this.total++
          results.push(item)
        }
        return results
      } finally {
        this.uploading = false
      }
    },

    async updateMeta(id, payload) {
      const api = useApi()
      const res = await api.put(`/UpdateMedia_CMS/media/${id}`, payload)
      const item = normalizeMedia(res.data?.data ?? res.data)
      const idx = this.items.findIndex((m) => m.id === id)
      if (idx !== -1) this.items[idx] = item
      return item
    },

    async remove(id) {
      const api = useApi()
      await api.delete(`/DeleteMedia_CMS/${id}`)
      this.items = this.items.filter((m) => m.id !== id)
      this.total = Math.max(0, this.total - 1)
    },

    setPage(page) { this.page = page },
    setFilter(key, val) { this.filters[key] = val; this.page = 1 },
  },
})
