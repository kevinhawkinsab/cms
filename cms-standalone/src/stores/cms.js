import { defineStore } from 'pinia'
import {
  authService,
  postsService,
  categoriesService,
  mediaService,
  pageLayoutService,
  getApiErrorMessage,
  getUserIdFromToken
} from '@/services/api.js'
const isClient = () => typeof window !== 'undefined'
const lsGet = (k) => (isClient() ? localStorage.getItem(k) : null)
const lsSet = (k, v) => { if (isClient()) localStorage.setItem(k, v) }
const lsDel = (k) => { if (isClient()) localStorage.removeItem(k) }

const DEFAULT_PAGINATION = {
  total: 0,
  page: 1,
  limit: 12,
  pages: 1
}

const DEFAULT_OVERVIEW = {
  total: 0,
  published: 0,
  hidden: 0,
  categories: 0
}

/**
 * =====================================================
 * NORMALIZADORES API → UI
 * =====================================================
 * La API usa:   id (numérico), isVisible, featuredImage {obj}, blobUrl, fileSize, isDownloadable
 * La UI usa:    _id,          visible,   featuredImage (string url), url, size, downloadable
 */
const normalizeCategory = (c) => {
  if (!c) return null
  return {
    ...c,
    _id: c._id ?? c.id,
    id: c.id ?? c._id,
    name: c.name,
    slug: c.slug,
    color: c.color || '#86bc42',
    description: c.description || '',
    isActive: c.isActive !== undefined ? c.isActive : true,
    postsCount: c.postsCount ?? 0
  }
}

const normalizePost = (p) => {
  if (!p) return null

  const featured = p.featuredImage
  const featuredUrl = typeof featured === 'string'
    ? featured
    : (featured?.url || featured?.blobUrl || '')
  const featuredAlt = typeof featured === 'object'
    ? (featured?.alt || '')
    : ''
  const featuredImageId = typeof featured === 'object'
    ? (featured?.id ?? null)
    : (p.featuredImageId ?? null)

  const categories = Array.isArray(p.categories)
    ? p.categories.map((c) => (typeof c === 'object' ? normalizeCategory(c) : c))
    : []

  const author = p.author && typeof p.author === 'object'
    ? {
        ...p.author,
        id: p.author.id ?? p.author._id,
        name: p.author.fullName || p.author.name || ''
      }
    : p.author

  const seoRaw = p.seo || {}
  const seo = {
    metaTitle: seoRaw.metaTitle || '',
    metaDescription: seoRaw.metaDescription || '',
    metaKeywords: Array.isArray(seoRaw.metaKeywords)
      ? seoRaw.metaKeywords
      : (seoRaw.metaKeywords
          ? seoRaw.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean)
          : []),
    ogImage: seoRaw.ogImage || '',
    canonicalUrl: seoRaw.canonicalUrl || ''
  }

  const visible = p.visible ?? p.isVisible ?? true

  const rawBlocks = Array.isArray(p.blocks)
    ? p.blocks
    : (Array.isArray(p.content) ? p.content : [])

  const blocks = rawBlocks
    .map((b) => ({
        ...b,
        id: b.id ?? b._id,
        type: b.type || b.blockType,
        content: typeof b.content === 'string' ? safeJson(b.content, {}) : (b.content || {}),
        styles: typeof b.styles === 'string' ? safeJson(b.styles, {}) : (b.styles || {}),
        visible: b.visible ?? b.isVisible ?? true,
        sortOrder: b.sortOrder ?? 0
      }))
    .filter((b) => b.type)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  return {
    ...p,
    _id: p._id ?? p.id,
    id: p.id ?? p._id,
    title: p.title || '',
    slug: p.slug || '',
    excerpt: p.excerpt || '',
    content: Array.isArray(p.content) ? '' : (p.content || ''),
    featuredImage: featuredUrl,
    featuredImageAlt: featuredAlt,
    featuredImageId,
    videoUrl: p.videoUrl || '',
    categories,
    tags: Array.isArray(p.tags) ? p.tags : [],
    faqs: Array.isArray(p.faqs) ? p.faqs : [],
    images: Array.isArray(p.images) ? p.images : [],
    author,
    visible,
    status: p.status || (visible ? 'published' : 'draft'),
    publishedAt: p.publishedAt || null,
    createdAt: p.createdAt || null,
    updatedAt: p.updatedAt || null,
    seo,
    blocks
  }
}

const normalizeMedia = (m) => {
  if (!m) return null
  return {
    ...m,
    _id: m._id ?? m.id,
    id: m.id ?? m._id,
    originalName: m.originalName || m.fileName,
    url: m.url || m.blobUrl || '',
    blobUrl: m.blobUrl || m.url || '',
    thumbnailUrl: m.thumbnailUrl || m.url || m.blobUrl || '',
    mimeType: m.mimeType || '',
    size: m.size ?? m.fileSize ?? 0,
    fileSize: m.fileSize ?? m.size ?? 0,
    alt: m.alt || '',
    caption: m.caption || '',
    category: m.category || 'general',
    downloadable: m.downloadable ?? m.isDownloadable ?? false,
    isDownloadable: m.isDownloadable ?? m.downloadable ?? false
  }
}

function safeJson(value, fallback = null) {
  try { return JSON.parse(value) } catch { return fallback }
}

/**
 * =====================================================
 * BUILDERS UI → API
 * =====================================================
 */
const buildPostPayload = (form = {}) => {
  const tags = Array.isArray(form.tags) ? form.tags : []
  const categoryIds = Array.isArray(form.categories)
    ? form.categories
        .map((c) => (typeof c === 'object' ? (c.id ?? c._id) : c))
        .filter((v) => v !== undefined && v !== null)
    : []

  const seo = form.seo || {}

  // Author/createdBy: UUID del usuario autenticado (JWT nameidentifier).
  // El backend necesita este valor para la FK Posts.AuthorId.
  const currentUserId = getUserIdFromToken()
  const authorId =
    (form.author && typeof form.author === 'object'
      ? (form.author.id ?? form.author._id)
      : form.author) ||
    form.authorId ||
    form.createdBy ||
    currentUserId ||
    null

  return {
    title: form.title,
    excerpt: form.excerpt,
    content: form.content,
    featuredImageId: form.featuredImageId || null,
    featuredImage: form.featuredImage || null,
    videoUrl: form.videoUrl || null,
    images: Array.isArray(form.images) ? form.images : [],
    categoryIds,
    tags,
    isVisible: form.visible !== false,
    visible: form.visible !== false,
    status: form.status || (form.visible === false ? 'draft' : 'published'),
    publishedAt: form.publishedAt || new Date().toISOString(),
    // Enviamos tanto `author` como `authorId`/`createdBy` para compatibilidad
    // con distintas convenciones del backend (AspNetUsers.Id).
    author: authorId,
    authorId,
    createdBy: authorId,
    updatedBy: currentUserId || authorId,
    seo: {
      metaTitle: seo.metaTitle || '',
      metaDescription: seo.metaDescription || '',
      metaKeywords: Array.isArray(seo.metaKeywords)
        ? seo.metaKeywords
        : (seo.metaKeywords ? String(seo.metaKeywords).split(',').map((k) => k.trim()).filter(Boolean) : []),
      ogImage: seo.ogImage || form.featuredImage || '',
      canonicalUrl: seo.canonicalUrl || ''
    },
    blocks: Array.isArray(form.blocks) ? form.blocks.map((b, i) => ({
      blockType: b.type || b.blockType,
      content: b.content || {},
      styles: b.styles || {},
      sortOrder: b.sortOrder ?? i,
      isVisible: b.visible !== false
    })) : undefined
  }
}

const buildCategoryPayload = (form = {}) => ({
  name: form.name,
  description: form.description || '',
  color: form.color || '#86bc42'
})

const buildMediaMetadataPayload = (form = {}) => ({
  alt: form.alt || '',
  caption: form.caption || '',
  category: form.category || 'general',
  isDownloadable: form.downloadable ?? form.isDownloadable ?? false
})

/**
 * =====================================================
 * HELPERS DE RESPUESTA
 * =====================================================
 */
const unwrapPayload = (response) => {
  const payload = response?.data ?? response
  return payload?.data ?? payload
}

const unwrapCollection = (response) => {
  const payload = response?.data ?? response
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

const extractPagination = (response, fallback = {}) => {
  const payload = response?.data ?? response
  const pagination = payload?.pagination || payload?.meta?.pagination || null
  if (pagination) return { ...DEFAULT_PAGINATION, ...pagination }

  const total = payload?.total ?? payload?.count ?? fallback.total ?? 0
  const page = Number(fallback.page || 1)
  const limit = Number(fallback.limit || DEFAULT_PAGINATION.limit)
  const pages = Math.max(1, Math.ceil(Number(total || 0) / limit))
  return { total: Number(total || 0), page, limit, pages }
}

const extractTotal = (response) => {
  const payload = response?.data ?? response
  if (payload?.pagination?.total !== undefined) return Number(payload.pagination.total)
  if (payload?.total !== undefined) return Number(payload.total)
  if (payload?.count !== undefined) return Number(payload.count)
  if (Array.isArray(payload?.data)) return payload.data.length
  if (Array.isArray(payload)) return payload.length
  return 0
}

/**
 * =====================================================
 * STORE CMS
 * =====================================================
 */
export const useCmsStore = defineStore('cms', {
  state: () => ({
    user: null,
    token: lsGet('bambito_token'),

    posts: [],
    postById: null,
    postBySlug: null,

    categories: [],
    categoryById: null,

    media: [],
    mediaItem: null,

    pagination: { ...DEFAULT_PAGINATION },
    overview: { ...DEFAULT_OVERVIEW },

    orderUpdateStatus: null,
    pendingInvoices: null,

    loadingAuth: false,
    loadingPosts: false,
    loadingCategories: false,
    loadingMedia: false,
    loadingOverview: false,
    loadingAux: false,

    savingPost: false,
    deletingPost: false,

    savingCategory: false,
    deletingCategory: false,

    savingMedia: false,
    deletingMedia: false,

    uploadingMedia: false,

    error: null,
    successMessage: '',
    lastPostsQuery: {},
    lastCategoriesQuery: {},
    lastMediaQuery: {}
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    publishedPosts: (state) => state.posts.filter((p) => p.visible),
    hiddenPosts: (state) => state.posts.filter((p) => !p.visible),
    categoriesWithPosts: (state) => state.categories.filter((c) => (c.postsCount || 0) > 0),
    emptyCategories: (state) => state.categories.filter((c) => (c.postsCount || 0) === 0)
  },

  actions: {
    clearMessages() {
      this.error = null
      this.successMessage = ''
    },

    setSuccess(message) {
      this.successMessage = message
      this.error = null
    },

    setError(error) {
      this.error = getApiErrorMessage(error)
      this.successMessage = ''
    },

    setAuthSession({ token, user } = {}) {
      if (token) {
        this.token = token
        lsSet('bambito_token', token)
      }
      if (user !== undefined) {
        this.user = user
        lsSet('bambito_user', JSON.stringify(user))
      }
    },

    clearAuthSession() {
      this.token = null
      this.user = null
      lsDel('bambito_token')
      lsDel('bambito_user')
    },

    hydrateAuthFromStorage() {
      const storedToken = lsGet('bambito_token')
      const storedUser = lsGet('bambito_user')
      this.token = storedToken || null
      this.user = storedUser ? JSON.parse(storedUser) : null
    },

    /**
     * AUTH
     */
    async login(credentials) {
      this.loadingAuth = true
      this.error = null
      try {
        const response = await authService.login(credentials)
        const payload = unwrapPayload(response)
        const token = payload?.token || payload?.accessToken || payload?.jwt || null
        const user = payload?.user || payload?.profile || null
        if (token) this.setAuthSession({ token, user })
        else if (user) {
          this.user = user
          lsSet('bambito_user', JSON.stringify(user))
        }
        this.setSuccess('Sesión iniciada correctamente.')
        return payload
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingAuth = false
      }
    },

    async logout() {
      this.loadingAuth = true
      try {
        await authService.logout().catch(() => {})
      } finally {
        this.clearAuthSession()
        this.loadingAuth = false
      }
    },

    async fetchProfile() {
      this.loadingAuth = true
      try {
        const response = await authService.getProfile()
        const profile = unwrapPayload(response)
        this.user = profile
        lsSet('bambito_user', JSON.stringify(profile))
        return profile
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingAuth = false
      }
    },

    /**
     * POSTS
     */
    async fetchPosts(params = {}) {
      this.loadingPosts = true
      this.error = null
      this.lastPostsQuery = { ...params }
      try {
        const response = await postsService.getAll(params)
        const items = unwrapCollection(response).map(normalizePost)
        this.posts = items
        this.pagination = extractPagination(response, params)
        return items
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingPosts = false
      }
    },

    async fetchPostById(id) {
      this.loadingPosts = true
      this.error = null
      try {
        const response = await postsService.getById(id)
        const post = normalizePost(unwrapPayload(response))
        this.postById = post
        return post
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingPosts = false
      }
    },
    async fetchPostBySlug(slug) {
      this.loadingPosts = true
      this.error = null
      try {
        const response = await postsService.getBySlug(slug)
        const post = normalizePost(unwrapPayload(response))
        this.postBySlug = post
        return post
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingPosts = false
      }
    },

    async createPost(form) {
      this.savingPost = true
      this.error = null
      try {
        const payload = buildPostPayload(form)
        const response = await postsService.create(payload)
        const created = normalizePost(unwrapPayload(response))
        this.setSuccess('La publicación fue creada correctamente.')
        await this.refreshPostsOnly()
        return created
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.savingPost = false
      }
    },

    async updatePost(id, form) {
      this.savingPost = true
      this.error = null
      try {
        const payload = buildPostPayload(form)
        const response = await postsService.update(id, payload)
        const updated = normalizePost(unwrapPayload(response))
        this.setSuccess('La publicación fue actualizada correctamente.')
        await this.refreshPostsOnly()
        return updated
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.savingPost = false
      }
    },

    async deletePost(id) {
      this.deletingPost = true
      this.error = null
      try {
        const response = await postsService.delete(id)
        this.setSuccess('La publicación fue eliminada correctamente.')
        await this.refreshPostsOnly()
        return response
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.deletingPost = false
      }
    },

    async togglePostVisibility(id, visible) {
      this.savingPost = true
      this.error = null
      try {
        // Endpoint: PATCH /posts/{id}/visibility { isVisible }
        const response = await postsService.toggleVisibility(id, visible)
        const updated = normalizePost(unwrapPayload(response))
        this.setSuccess(visible ? 'La publicación ahora está visible.' : 'La publicación fue ocultada.')
        await this.refreshPostsOnly()
        return updated
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.savingPost = false
      }
    },

    /**
     * CATEGORIES
     */
    async fetchCategories() {
      this.loadingCategories = true
      this.error = null
      try {
        const response = await categoriesService.getAll()
        const items = unwrapCollection(response).map(normalizeCategory)
        this.categories = items
        return items
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingCategories = false
      }
    },

    async fetchCategoryById(id) {
      this.loadingCategories = true
      try {
        const response = await categoriesService.getById(id)
        const cat = normalizeCategory(unwrapPayload(response))
        this.categoryById = cat
        return cat
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingCategories = false
      }
    },

    async createCategory(form) {
      this.savingCategory = true
      try {
        const response = await categoriesService.create(buildCategoryPayload(form))
        const created = normalizeCategory(unwrapPayload(response))
        this.setSuccess('La categoría fue creada correctamente.')
        await this.fetchCategories()
        return created
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.savingCategory = false
      }
    },

    async updateCategory(id, form) {
      this.savingCategory = true
      try {
        const response = await categoriesService.update(id, buildCategoryPayload(form))
        const updated = normalizeCategory(unwrapPayload(response))
        this.setSuccess('La categoría fue actualizada correctamente.')
        await this.fetchCategories()
        return updated
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.savingCategory = false
      }
    },

    async deleteCategory(id) {
      this.deletingCategory = true
      try {
        const response = await categoriesService.delete(id)
        this.setSuccess('La categoría fue eliminada correctamente.')
        await this.fetchCategories()
        return response
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.deletingCategory = false
      }
    },

    /**
     * MEDIA
     */
    async fetchMedia(params = {}) {
      this.loadingMedia = true
      this.lastMediaQuery = { ...params }
      try {
        const response = await mediaService.getAll(params)
        const items = unwrapCollection(response).map(normalizeMedia)
        this.media = items
        return items
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingMedia = false
      }
    },

    async uploadMedia(file, metadata = {}) {
      this.uploadingMedia = true
      try {
        const currentUserId =
          this.user?.id ||
          this.user?._id ||
          getUserIdFromToken() ||
          null

        console.log("CURRENT USER ID:", getUserIdFromToken());
        const meta = {
          alt: metadata.alt || '',
          caption: metadata.caption || '',
          category: metadata.category || 'general',
          isDownloadable: metadata.downloadable ?? metadata.isDownloadable ?? false,
          UploadedById: metadata.uploadedById || currentUserId,
          uploadedBy: metadata.uploadedBy || currentUserId,
          createdBy: metadata.createdBy || currentUserId,
          updatedBy: metadata.updatedBy || currentUserId
        }
        const response = await mediaService.upload(file, meta)
        const uploaded = normalizeMedia(unwrapPayload(response))
        this.setSuccess('El archivo fue cargado correctamente.')
        return uploaded
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.uploadingMedia = false
      }
    },

    async updateMedia(id, form) {
      this.savingMedia = true
      try {
        const response = await mediaService.update(id, buildMediaMetadataPayload(form))
        const updated = normalizeMedia(unwrapPayload(response))
        this.setSuccess('El archivo fue actualizado correctamente.')
        await this.fetchMedia(this.lastMediaQuery)
        return updated
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.savingMedia = false
      }
    },

    async deleteMedia(id) {
      this.deletingMedia = true
      try {
        const response = await mediaService.delete(id)
        this.setSuccess('El archivo fue eliminado correctamente.')
        await this.fetchMedia(this.lastMediaQuery)
        return response
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.deletingMedia = false
      }
    },

    /**
     * PAGE LAYOUT (Page Builder especial: /prensa)
     */
    async fetchPageLayout(routeKey) {
      try {
        const response = await pageLayoutService.getByRouteKey(routeKey)
        return unwrapPayload(response)
      } catch (error) {
        this.setError(error)
        throw error
      }
    },

    async savePageLayout(routeKey, payload) {
      try {
        const response = await pageLayoutService.upsert(routeKey, payload)
        this.setSuccess('Layout guardado correctamente.')
        return unwrapPayload(response)
      } catch (error) {
        this.setError(error)
        throw error
      }
    },

    /**
     * OVERVIEW
     */
    async fetchOverview() {
      this.loadingOverview = true
      try {
        if (!this.categories.length) {
          await this.fetchCategories()
        }

        if (!this.posts.length || this.posts.length === 1) {
          await this.fetchPosts({ limit: 1, page: 1 })
        }


        
        console.log("HERE: ", this.posts);

        this.overview = {
          total: this.posts.length ?? 0,
          published :  this.posts.filter((p) => p.isVisible).length,
          hidden: this.posts.filter((p) => !p.isVisible).length,
          categories: this.categories.length
        }
        return this.overview
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingOverview = false
      }
    },

    async refreshPostsOnly() {
      const query = Object.keys(this.lastPostsQuery || {}).length
        ? this.lastPostsQuery
        : { limit: DEFAULT_PAGINATION.limit, page: 1 }
      await this.fetchPosts(query)
    },

    async refreshAll() {
      await Promise.all([this.fetchCategories(), this.fetchOverview()])
      await this.refreshPostsOnly()
      if (Object.keys(this.lastMediaQuery || {}).length) {
        await this.fetchMedia(this.lastMediaQuery)
      }
    },

    /**
     * BAMBITO EXTRA ENDPOINTS
     */
    async fetchOrderUpdateStatus() {
      this.loadingAux = true
      try {
        const response = await Promise.resolve({ data: null })
        const payload = unwrapPayload(response)
        this.orderUpdateStatus = payload
        return payload
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingAux = false
      }
    },

    async fetchPendingInvoices() {
      this.loadingAux = true
      try {
        const response = await Promise.resolve({ data: null })
        const payload = unwrapPayload(response)
        this.pendingInvoices = payload
        return payload
      } catch (error) {
        this.setError(error)
        throw error
      } finally {
        this.loadingAux = false
      }
    }
  }
})
