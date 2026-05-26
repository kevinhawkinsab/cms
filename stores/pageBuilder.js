import { defineStore } from 'pinia'
import { useApi } from '~/services/api'
import { normalizeBlock } from '~/utils/normalizers'

export const usePageBuilderStore = defineStore('pageBuilder', {
  state: () => ({
    blocks: [],
    selectedBlockId: null,
    context: { routeKey: null, postId: null, name: '' },
    dirty: false,
    saving: false,
    loading: false,
    previewMode: false,
  }),

  getters: {
    selectedBlock: (state) => state.blocks.find((b) => b.id === state.selectedBlockId) ?? null,
    orderedBlocks: (state) => [...state.blocks].sort((a, b) => a.sortOrder - b.sortOrder),
  },

  actions: {
    async load(companyId, routeKey, postId) {
      this.loading = true
      this.blocks = []
      this.dirty = false
      this.selectedBlockId = null
      try {
        const api = useApi()
        if (routeKey) {
          this.context = { routeKey, postId: null, name: routeKey }
          const res = await api.get(`/GetPageLayout_CMS/${companyId}/${routeKey}`)
          const data = res.data?.data ?? res.data
          this.blocks = (data?.blocks ?? []).map(normalizeBlock)
          this.context.name = data?.name ?? routeKey
        } else if (postId) {
          this.context = { routeKey: null, postId, name: `Post #${postId}` }
          const res = await api.get(`/GetPostById_CMS/${postId}`)
          const data = res.data?.data ?? res.data
          this.blocks = (data?.blocks ?? []).map(normalizeBlock)
          this.context.name = data?.title ?? `Post #${postId}`
        }
      } catch {
        this.blocks = []
      } finally {
        this.loading = false
      }
    },

    async save(companyId) {
      this.saving = true
      try {
        const api = useApi()
        const blocks = this.orderedBlocks.map((b, i) => ({ ...b, sortOrder: i }))

        if (this.context.routeKey) {
          await api.put(`/UpsertPageLayout_CMS/${companyId}/${this.context.routeKey}`, {
            companyId,
            routeKey: this.context.routeKey,
            name: this.context.name,
            blocks,
          })
        } else if (this.context.postId) {
          await api.put(`/UpdatePost_CMS/posts/${this.context.postId}`, { blocks })
        } else {
          localStorage.setItem('builder_draft', JSON.stringify({ blocks, name: this.context.name }))
        }
        this.dirty = false
      } finally {
        this.saving = false
      }
    },

    addBlock(type, afterId = null) {
      const maxOrder = this.blocks.reduce((m, b) => Math.max(m, b.sortOrder), -1)
      const block = normalizeBlock({
        type,
        sortOrder: maxOrder + 1,
        content: defaultContent(type),
        visible: true,
      })
      if (afterId) {
        const idx = this.blocks.findIndex((b) => b.id === afterId)
        this.blocks.splice(idx + 1, 0, block)
        this.reorder()
      } else {
        this.blocks.push(block)
      }
      this.selectedBlockId = block.id
      this.dirty = true
    },

    duplicateBlock(id) {
      const src = this.blocks.find((b) => b.id === id)
      if (!src) return
      const copy = { ...JSON.parse(JSON.stringify(src)), id: crypto.randomUUID(), serverId: null }
      const idx = this.blocks.findIndex((b) => b.id === id)
      this.blocks.splice(idx + 1, 0, copy)
      this.reorder()
      this.dirty = true
    },

    removeBlock(id) {
      this.blocks = this.blocks.filter((b) => b.id !== id)
      if (this.selectedBlockId === id) this.selectedBlockId = null
      this.reorder()
      this.dirty = true
    },

    updateBlock(id, changes) {
      const block = this.blocks.find((b) => b.id === id)
      if (!block) return
      Object.assign(block, changes)
      this.dirty = true
    },

    updateBlockContent(id, content) {
      const block = this.blocks.find((b) => b.id === id)
      if (!block) return
      block.content = { ...block.content, ...content }
      this.dirty = true
    },

    toggleBlockVisibility(id) {
      const block = this.blocks.find((b) => b.id === id)
      if (block) { block.visible = !block.visible; this.dirty = true }
    },

    setBlocks(blocks) {
      this.blocks = blocks
      this.reorder()
      this.dirty = true
    },

    reorder() {
      this.blocks.forEach((b, i) => (b.sortOrder = i))
    },

    selectBlock(id) { this.selectedBlockId = id },
    deselectBlock() { this.selectedBlockId = null },
    setPreview(val) { this.previewMode = val },
    setName(name) { this.context.name = name; this.dirty = true },
    reset() {
      this.blocks = []
      this.selectedBlockId = null
      this.context = { routeKey: null, postId: null, name: '' }
      this.dirty = false
      this.previewMode = false
    },
  },
})

function defaultContent(type) {
  const defaults = {
    heading:       { text: 'Título', level: 'h2', align: 'left', color: '#0f172a' },
    paragraph:     { html: '<p>Escribe tu contenido aquí...</p>', color: '#475569' },
    quote:         { text: 'Tu cita aquí', author: 'Autor' },
    image:         { url: '', alt: '', caption: '', width: '100%', align: 'center' },
    youtube:       { url: '' },
    'image-gallery': { images: [], columns: 3 },
    separator:     { style: 'solid', color: '#e2e8f0', thickness: 1, width: '100%' },
    spacer:        { height: 40 },
    html:          { code: '<div></div>' },
    button:        { text: 'Botón', url: '#', variant: 'primary', align: 'center' },
    'article-list':{ count: 6, category: '' },
    'post-sidebar':{ showSearch: true, showCategories: true, showRecent: true },
    'post-tags':   { style: 'pill', color: '#1A4F3A' },
    'front-page':  { backgroundUrl: '', title: '', showBreadcrumbs: true },
  }
  return defaults[type] ?? {}
}
