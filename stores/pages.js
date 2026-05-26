import { defineStore } from 'pinia'
import { useApi } from '~/services/api'

export const PUBLIC_PAGES = [
  { routeKey: 'home',          name: 'Inicio',               path: '/',                icon: 'home',         description: 'Hero principal y secciones destacadas' },
  { routeKey: 'catalogo',      name: 'Catálogo',             path: '/catalogo',        icon: 'grid',         description: 'Presentaciones de producto' },
  { routeKey: 'origen',        name: 'Origen',               path: '/origen',          icon: 'leaf',         description: 'Historia de la empresa o del proyecto' },
  { routeKey: 'nosotros',      name: 'Nosotros',             path: '/nosotros',        icon: 'users',        description: 'Equipo, misión y valores' },
  { routeKey: 'sostenibilidad',name: 'Sostenibilidad',       path: '/sostenibilidad',  icon: 'globe',        description: 'Programa ambiental y social' },
  { routeKey: 'faq',           name: 'FAQ',                  path: '/faq',             icon: 'question',     description: 'Preguntas frecuentes' },
  { routeKey: 'contacto',      name: 'Contacto',             path: '/contacto',        icon: 'mail',         description: 'Formulario e información de contacto' },
  { routeKey: 'blog',          name: 'Blog',                 path: '/blog',            icon: 'rss',          description: 'Vista del listado de artículos' },
  { routeKey: 'articulo',      name: 'Artículo (plantilla)', path: '/blog/:slug',      icon: 'document',     description: 'Plantilla reutilizable para artículos' },
]

export const usePagesStore = defineStore('pages', {
  state: () => ({
    layouts: {},
    loading: false,
    search: '',
  }),

  getters: {
    pages: (state) => {
      const q = state.search.toLowerCase()
      return PUBLIC_PAGES.filter(
        (p) => !q || p.name.toLowerCase().includes(q) || p.path.toLowerCase().includes(q)
      ).map((p) => ({
        ...p,
        layout: state.layouts[p.routeKey] ?? null,
        hasLayout: !!state.layouts[p.routeKey],
        updatedAt: state.layouts[p.routeKey]?.updatedAt ?? null,
      }))
    },
  },

  actions: {
    async fetchAllLayouts(companyId) {
      this.loading = true
      try {
        const api = useApi()
        const results = await Promise.allSettled(
          PUBLIC_PAGES.map((p) => api.get(`/GetPageLayout_CMS/${companyId}/${p.routeKey}`))
        )
        results.forEach((r, i) => {
          if (r.status === 'fulfilled') {
            const data = r.value.data?.data ?? r.value.data
            if (data) this.layouts[PUBLIC_PAGES[i].routeKey] = data
          }
        })
      } finally {
        this.loading = false
      }
    },

    async upsert(companyId, routeKey, blocks) {
      const api = useApi()
      const res = await api.put(`/UpsertPageLayout_CMS/${companyId}/${routeKey}`, {
        companyId,
        routeKey,
        blocks,
      })
      const data = res.data?.data ?? res.data
      this.layouts[routeKey] = data
      return data
    },

    async deleteLayout(companyId, routeKey) {
      const api = useApi()
      await api.delete(`/DeletePageLayout_CMS/${companyId}/${routeKey}`)
      delete this.layouts[routeKey]
    },

    setSearch(val) { this.search = val },
  },
})
