import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pageLayoutService, postsService, getApiErrorMessage, getUserIdFromToken } from '@/services/api.js'

const isClient = () => typeof window !== 'undefined'

const generateId = () => `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const BLOCK_TYPES = {
  heading: {
    label: 'Titulo',
    icon: 'fas fa-heading',
    defaultContent: { text: 'Nuevo titulo', level: 2 },
    defaultStyles: { color: '#3f6458', textAlign: 'left', marginBottom: '16px' }
  },
  paragraph: {
    label: 'Parrafo',
    icon: 'fas fa-paragraph',
    defaultContent: { html: '<p>Escribe tu contenido aqui...</p>' },
    defaultStyles: { color: '#1f2937', fontSize: '16px', lineHeight: '1.8', marginBottom: '16px' }
  },
  image: {
    label: 'Imagen',
    icon: 'fas fa-image',
    defaultContent: { src: '', alt: '', caption: '', width: '100%' },
    defaultStyles: { borderRadius: '16px', marginBottom: '16px' }
  },
  separator: {
    label: 'Separador',
    icon: 'fas fa-minus',
    defaultContent: { style: 'solid', thickness: '1px' },
    defaultStyles: { color: '#dfe0d6', marginTop: '24px', marginBottom: '24px' }
  },
  youtube: {
    label: 'Video YouTube',
    icon: 'fab fa-youtube',
    defaultContent: { url: '', aspectRatio: '16/9' },
    defaultStyles: { borderRadius: '16px', marginBottom: '16px' }
  },
  quote: {
    label: 'Cita',
    icon: 'fas fa-quote-left',
    defaultContent: { text: 'Escribe una cita aqui...', author: '' },
    defaultStyles: { borderLeftColor: '#80ba49', backgroundColor: 'rgba(128,186,73,0.06)', marginBottom: '16px' }
  },
  button: {
    label: 'Boton',
    icon: 'fas fa-hand-pointer',
    defaultContent: { text: 'Click aqui', url: '#', target: '_self', variant: 'primary' },
    defaultStyles: { marginBottom: '16px' }
  },
  html: {
    label: 'HTML Libre',
    icon: 'fas fa-code',
    defaultContent: { code: '<div>Contenido HTML personalizado</div>' },
    defaultStyles: { marginBottom: '16px' }
  },
  'article-list': {
    label: 'Lista de Articulos',
    icon: 'fas fa-newspaper',
    defaultContent: {
      layout: 'grid',
      columns: 3,
      limit: 6,
      showExcerpt: true,
      showImage: true,
      showCategory: true,
      showDate: true,
      showButton: true,
      categoryFilter: '',
      buttonText: 'Leer mas',
      imageAspectRatio: '16/10',
      cardStyle: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        shadow: 'medium',
        titleColor: '#0f172a',
        titleSize: '1.05rem',
        excerptColor: '#475569',
        dateColor: '#64748b',
        buttonColor: '#80ba49',
        tagStyle: 'pill',
        imageHeight: 'auto',
        cardBorder: 'rgba(15,23,42,0.06)'
      }
    },
    defaultStyles: { marginBottom: '24px' }
  },
  'post-sidebar': {
    label: 'Sidebar Articulo',
    icon: 'fas fa-columns',
    defaultContent: {
      showSearch: true,
      showCategories: true,
      showRecentPosts: true,
      showTags: true,
      recentPostsLimit: 5,
      categories: [],
      tags: []
    },
    defaultStyles: { marginBottom: '16px' }
  },
  'image-gallery': {
    label: 'Galeria de Imagenes',
    icon: 'fas fa-images',
    defaultContent: {
      images: [
        { src: '/img/images/9.jpg', alt: '' },
        { src: '/img/images/1.jpg', alt: '' }
      ],
      layout: 'grid',
      columns: 3,
      gap: '12px',
      aspectRatio: '1/1'
    },
    defaultStyles: { marginBottom: '16px', borderRadius: '14px' }
  },
  'post-tags': {
    label: 'Tags del Articulo',
    icon: 'fas fa-tags',
    defaultContent: {
      tags: ['Agua', 'Salud', 'Bienestar'],
      style: 'pill',
      align: 'left'
    },
    defaultStyles: { marginTop: '24px', marginBottom: '16px' }
  },
  'front-page': {
    label: 'Seccion Front Page',
    icon: 'fas fa-home',
    defaultContent: {
      variant: 'hero',
      title: 'Bienvenido a Bambito Spring Water',
      backgroundImage: '/img/images/musgo.jpg',
      backgroundPosition: 'center center',
      align: 'center',
      overlay: true,
      breadcrumbs: [
        { label: 'Inicio', url: '/' },
        { label: 'Blog', url: '/blog' },
        { label: 'Articulo' }
      ],
      tags: [
        { text: 'Salud', color: '#8BC34A' },
        { text: 'Hidratacion', color: '#17B6E6' },
        { text: 'Agua de Manantial', color: '#FF9800' },
        { text: 'Bienestar', color: '#F44336' }
      ],
      date: '12 de abril de 2026',
      author: 'Bambito Spring Water'
    },
    defaultStyles: {
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center',
      minHeight: '420px'
    }
  },
  spacer: {
    label: 'Espaciador',
    icon: 'fas fa-arrows-alt-v',
    defaultContent: { height: '40px' },
    defaultStyles: {}
  }
}

function createDefaultPrensaLayout() {
  return {
    id: 'page-prensa',
    name: 'Sala de Blog',
    route: '/blog',
    routeKey: 'prensa',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: generateId(),
        type: 'heading',
        content: { text: 'Sala de Blog', level: 1 },
        styles: { color: '#3f6458', textAlign: 'center', marginBottom: '8px', fontSize: '3rem', fontWeight: '800' },
        visible: true
      },
      {
        id: generateId(),
        type: 'paragraph',
        content: { html: '<p style="text-align:center">Noticias, comunicados y recursos para medios de Bambito Spring Water.</p>' },
        styles: { color: '#64748b', textAlign: 'center', fontSize: '1.1rem', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' },
        visible: true
      },
      {
        id: generateId(),
        type: 'separator',
        content: { style: 'gradient', thickness: '2px' },
        styles: { marginTop: '0', marginBottom: '32px' },
        visible: true
      },
      {
        id: generateId(),
        type: 'article-list',
        content: { layout: 'grid', columns: 3, limit: 6, showExcerpt: true, showImage: true, showCategory: true, showDate: true, categoryFilter: '' },
        styles: { marginBottom: '40px' },
        visible: true
      }
    ]
  }
}

function createDefaultArticuloLayout() {
  return {
    id: 'page-articulo',
    name: 'Plantilla de Articulo',
    route: '/blog/:slug',
    routeKey: 'articulo',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: generateId(),
        type: 'heading',
        content: { text: '{{post.title}}', level: 1 },
        styles: { color: '#3f6458', marginBottom: '16px', fontWeight: '800' },
        visible: true
      },
      {
        id: generateId(),
        type: 'paragraph',
        content: { html: '{{post.excerpt}}' },
        styles: { color: '#475569', fontSize: '1.15rem', lineHeight: '1.8', borderLeft: '4px solid #80ba49', paddingLeft: '16px', marginBottom: '24px' },
        visible: true
      },
      {
        id: generateId(),
        type: 'html',
        content: { code: '{{post.content}}' },
        styles: { marginBottom: '24px' },
        visible: true
      },
      {
        id: generateId(),
        type: 'separator',
        content: { style: 'solid', thickness: '1px' },
        styles: { color: '#dfe0d6', marginTop: '32px', marginBottom: '32px' },
        visible: true
      }
    ]
  }
}

/**
 * Normaliza la respuesta del API (bloques) al formato del builder.
 */
function normalizeApiBlocks(blocks = []) {
  return (blocks || [])
    .filter((b) => b)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((b) => ({
      id: b.id ? `block-${b.id}` : generateId(),
      serverId: b.id ?? null,
      type: b.type || b.blockType,
      content: typeof b.content === 'string' ? safeJson(b.content, {}) : (b.content || {}),
      styles: typeof b.styles === 'string' ? safeJson(b.styles, {}) : (b.styles || {}),
      visible: b.visible ?? b.isVisible ?? true,
      sortOrder: b.sortOrder ?? 0
    }))
}

function safeJson(value, fallback = null) {
  try { return JSON.parse(value) } catch { return fallback }
}

function unwrapPayload(response) {
  const payload = response?.data ?? response
  return payload?.data ?? payload
}

function buildApiBlocks(blocks = []) {
  return blocks.map((b, i) => ({
    blockType: b.type,
    content: b.content || {},
    styles: b.styles || {},
    sortOrder: i,
    isVisible: b.visible !== false
  }))
}

function cloneValue(value) {
  return JSON.parse(JSON.stringify(value))
}

function buildPostSavePayload(post = {}, blocks = []) {
  const categories = Array.isArray(post.categories) ? post.categories : []
  const tags = Array.isArray(post.tags) ? post.tags : []
  const images = Array.isArray(post.images) ? post.images : []
  const seo = post.seo || {}
  const visible = post.visible ?? post.isVisible ?? true

  const currentUserId = getUserIdFromToken()
  const authorId =
    (post.author && typeof post.author === 'object'
      ? (post.author.id ?? post.author._id)
      : post.author) ||
    post.authorId ||
    post.createdBy ||
    currentUserId ||
    null

  const apiBlocks = buildApiBlocks(blocks)

  return {
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: apiBlocks,
    featuredImageId: post.featuredImageId || null,
    featuredImage: post.featuredImage || null,
    videoUrl: post.videoUrl || null,
    images,
    categoryIds: categories
      .map((category) => (typeof category === 'object' ? (category.id ?? category._id) : category))
      .filter((value) => value !== undefined && value !== null),
    tags,
    isVisible: visible,
    visible,
    status: post.status || (visible ? 'published' : 'draft'),
    publishedAt: post.publishedAt || new Date().toISOString(),
    author: authorId,
    authorId,
    createdBy: authorId,
    updatedBy: currentUserId || authorId,
    seo: {
      metaTitle: seo.metaTitle || '',
      metaDescription: seo.metaDescription || '',
      metaKeywords: Array.isArray(seo.metaKeywords)
        ? seo.metaKeywords
        : (seo.metaKeywords ? String(seo.metaKeywords).split(',').map((item) => item.trim()).filter(Boolean) : []),
      ogImage: seo.ogImage || post.featuredImage || '',
      canonicalUrl: seo.canonicalUrl || ''
    },
    blocks: apiBlocks
  }
}

function buildBlocksFromArticleTemplate(existingBlocks = []) {
  if (Array.isArray(existingBlocks) && existingBlocks.length) {
    return existingBlocks
  }
  return createDefaultArticuloLayout().blocks
}

export const usePageBuilderStore = defineStore('pageBuilder', () => {
  const layouts = ref({})
  const selectedBlockId = ref(null)
  const isEditing = ref(false)
  const isDragging = ref(false)
  const loading = ref(false)
  const saving = ref(false)
  const currentRoute = ref(null)

  const currentLayout = computed(() => {
    if (!currentRoute.value) return null
    return layouts.value[currentRoute.value] || null
  })

  const selectedBlock = computed(() => {
    if (!selectedBlockId.value || !currentLayout.value) return null
    return currentLayout.value.blocks.find((b) => b.id === selectedBlockId.value) || null
  })

  const blockTypes = computed(() => BLOCK_TYPES)

  /**
   * Inicializa un layout desde el API (o fallback a default/localStorage).
   */
  async function initLayout(route, options = {}) {
    const { force = false } = options
    currentRoute.value = route
    selectedBlockId.value = null

    // 1. Ya está cacheado en memoria
    if (!force && layouts.value[route]) return layouts.value[route]

    loading.value = true
    try {
      const routeKey = resolveRouteKey(route)

      // Si es plantilla de artículo, usamos default (cada artículo guarda su propio layout)
      if (route === '/blog/:slug' || routeKey === 'articulo') {
        const cached = loadFromLocalStorage(route)
        layouts.value[route] = cached || createDefaultArticuloLayout()
        return layouts.value[route]
      }

      // Intentar cargar layout de la API
      try {
        const response = await pageLayoutService.getByRouteKey(routeKey)
        const data = unwrapPayload(response)
        if (data && Array.isArray(data.blocks)) {
          layouts.value[route] = {
            id: data.id ?? `layout-${routeKey}`,
            serverId: data.id ?? null,
            name: data.name || 'Sala de Blog',
            route,
            routeKey,
            updatedAt: data.updatedAt,
            blocks: normalizeApiBlocks(data.blocks)
          }
          return layouts.value[route]
        }
      } catch (error) {
        console.warn('[PageBuilder] No se pudo cargar layout desde la API, usando fallback:', getApiErrorMessage(error))
      }

      // Fallback: localStorage o default
      const cached = loadFromLocalStorage(route)
      layouts.value[route] = cached || (route === '/blog'
        ? createDefaultPrensaLayout()
        : createDefaultArticuloLayout())

      return layouts.value[route]
    } finally {
      loading.value = false
    }
  }

  /**
   * Inicializa el layout de un post específico (editor de artículo individual).
   * @param {object} post - Post normalizado (con blocks)
   */
  function initPostLayout(post) {
    if (!post) return null
    const routeKey = `post-${post.id ?? post._id}`
    currentRoute.value = routeKey
    selectedBlockId.value = null

    const blocks = Array.isArray(post.blocks) && post.blocks.length
      ? normalizeApiBlocks(post.blocks)
      : buildBlocksFromArticleTemplate()

    layouts.value[routeKey] = {
      id: `post-${post.id}`,
      serverId: post.id,
      postId: post.id,
      name: post.title || 'Artículo',
      route: `/blog/${post.slug}`,
      routeKey,
      updatedAt: post.updatedAt,
      postData: cloneValue(post),
      blocks
    }
    return layouts.value[routeKey]
  }

  function resolveRouteKey(route) {
    if (!route) return 'prensa'
    if (route === '/blog') return 'prensa'
    if (route === '/blog/:slug') return 'articulo'
    if (route.startsWith('post-')) return route
    return route.replace(/^\//, '').replace(/\//g, '-')
  }

  function loadFromLocalStorage(route) {
    if (!isClient()) return null
    const key = `bambito_layout_${route.replace(/\//g, '_')}`
    const saved = localStorage.getItem(key)
    if (!saved) return null
    try {
      const parsed = JSON.parse(saved)
      if (parsed && Array.isArray(parsed.blocks)) {
        parsed.blocks = parsed.blocks.filter((b) => b && b.id && b.type)
      }
      return parsed
    } catch {
      return null
    }
  }

  function saveToLocalStorage(route, data) {
    if (!isClient()) return
    const key = `bambito_layout_${route.replace(/\//g, '_')}`
    localStorage.setItem(key, JSON.stringify(data))
  }

  function addBlock(type, index = -1) {
    if (!currentLayout.value || !BLOCK_TYPES[type]) return
    const def = BLOCK_TYPES[type]
    const block = {
      id: generateId(),
      type,
      content: JSON.parse(JSON.stringify(def.defaultContent)),
      styles: JSON.parse(JSON.stringify(def.defaultStyles)),
      visible: true
    }
    const newBlocks = [...currentLayout.value.blocks]
    if (index >= 0) newBlocks.splice(index, 0, block)
    else newBlocks.push(block)
    currentLayout.value.blocks = newBlocks
    selectedBlockId.value = block.id
    return block
  }

  function removeBlock(blockId) {
    if (!currentLayout.value) return
    if (selectedBlockId.value === blockId) selectedBlockId.value = null
    currentLayout.value.blocks = currentLayout.value.blocks.filter((b) => b.id !== blockId)
  }

  function duplicateBlock(blockId) {
    if (!currentLayout.value) return
    const idx = currentLayout.value.blocks.findIndex((b) => b.id === blockId)
    if (idx === -1) return
    const original = currentLayout.value.blocks[idx]
    const clone = JSON.parse(JSON.stringify(original))
    clone.id = generateId()
    delete clone.serverId
    const newBlocks = [...currentLayout.value.blocks]
    newBlocks.splice(idx + 1, 0, clone)
    currentLayout.value.blocks = newBlocks
    selectedBlockId.value = clone.id
  }

  function moveBlock(fromIndex, toIndex) {
    if (!currentLayout.value) return
    const blocks = [...currentLayout.value.blocks]
    if (fromIndex < 0 || fromIndex >= blocks.length) return
    if (toIndex < 0 || toIndex >= blocks.length) return
    const [moved] = blocks.splice(fromIndex, 1)
    blocks.splice(toIndex, 0, moved)
    currentLayout.value.blocks = blocks
  }

  function updateBlockContent(blockId, content) {
    if (!currentLayout.value) return
    const block = currentLayout.value.blocks.find((b) => b.id === blockId)
    if (block) block.content = { ...block.content, ...content }
  }

  function updateBlockStyles(blockId, styles) {
    if (!currentLayout.value) return
    const block = currentLayout.value.blocks.find((b) => b.id === blockId)
    if (block) block.styles = { ...block.styles, ...styles }
  }

  function toggleBlockVisibility(blockId) {
    if (!currentLayout.value) return
    const block = currentLayout.value.blocks.find((b) => b.id === blockId)
    if (block) block.visible = !block.visible
  }

  function selectBlock(blockId) { selectedBlockId.value = blockId }
  function clearSelection() { selectedBlockId.value = null }

  /**
   * Persiste el layout actual.
   * - Rutas /prensa -> API page-layout (PUT /UpsertPageLayout_CMS/{routeKey})
   * - Rutas post-{id} -> API posts/{id} (PUT /UpdatePost_CMS/posts/{id})
   * - Otras (plantilla genérica /prensa/:slug) -> localStorage
   *
   * En caso de error real de API, NO se hace fallback silencioso: se propaga
   * el error para que el usuario lo vea y pueda corregirlo.
   */
  async function saveLayout() {
    if (!currentLayout.value || !currentRoute.value) return null

    saving.value = true
    const layout = currentLayout.value
    console.log("LAYOUT: ", layout);
    

    try {
      // Actualizar fecha local
      layout.updatedAt = new Date().toISOString()

      const route = currentRoute.value

      // CASO: Página especial (prensa) -> endpoint dedicado de page-layout
      if (route === '/blog' || layout.routeKey === 'prensa') {
        const payload = {
          name: layout.name || 'Sala de Blog',
          blocks: buildApiBlocks(layout.blocks),
          updatedBy: getUserIdFromToken()
        }

        try {
          const response = await pageLayoutService.upsert(layout.routeKey || 'prensa', payload)
          const data = unwrapPayload(response)
          if (data) {
            layout.id = data.id ?? layout.id
            layout.serverId = data.id ?? layout.serverId
            layout.name = data.name || layout.name
            layout.routeKey = data.routeKey || layout.routeKey || 'prensa'
            layout.updatedAt = data.updatedAt || layout.updatedAt
          }
          if (Array.isArray(data?.blocks)) {
            layout.blocks = normalizeApiBlocks(data.blocks)
          }
          // Respaldo local sólo cuando la API respondió OK
          saveToLocalStorage(route, cloneValue(layout))
          return { success: true, persisted: 'api', data }
        } catch (error) {
          // Propagamos el error: no hacemos fallback silencioso.
          return { success: false, error: getApiErrorMessage(error) }
        }
      }

      // CASO: Layout de un post específico -> PUT /posts/{id}
      if (layout.postId) {
        try {
          let sourcePost = layout.postData

          if (!sourcePost) {
            const fallbackResponse = await postsService.getById(layout.postId)
            const fallbackData = fallbackResponse?.data ?? fallbackResponse
            sourcePost = fallbackData?.data ?? fallbackData
          }

          const payload = buildPostSavePayload(sourcePost || {}, layout.blocks)
          const response = await postsService.update(layout.postId, payload)
          const data = response?.data ?? response
          const updatedPost = data?.data ?? data

          if (updatedPost) {
            layout.name = updatedPost.title || layout.name
            layout.updatedAt = updatedPost.updatedAt || layout.updatedAt
            layout.postData = cloneValue({
              ...(sourcePost || {}),
              ...updatedPost,
              blocks: updatedPost.blocks || payload.blocks
            })
          } else if (sourcePost) {
            layout.postData = cloneValue({
              ...sourcePost,
              blocks: payload.blocks
            })
          }

          if (Array.isArray(updatedPost?.blocks)) {
            layout.blocks = normalizeApiBlocks(updatedPost.blocks)
          } else if (Array.isArray(updatedPost?.content)) {
            layout.blocks = normalizeApiBlocks(updatedPost.content)
          } else if (Array.isArray(data?.blocks)) {
            layout.blocks = normalizeApiBlocks(data.blocks)
          } else if (Array.isArray(data?.content)) {
            layout.blocks = normalizeApiBlocks(data.content)
          }

          saveToLocalStorage(route, cloneValue(layout))
          return { success: true, persisted: 'api', data }
        } catch (error) {
          return { success: false, error: getApiErrorMessage(error) }
        }
      }

      // CASO: Plantilla genérica de artículo (/prensa/:slug) sin post asociado
      // -> sólo localStorage (no existe un endpoint para plantillas sin post)
      saveToLocalStorage(route, cloneValue(layout))
      return { success: true, persisted: 'local' }
    } finally {
      saving.value = false
    }
  }

  function resetLayout() {
    if (!currentRoute.value) return
    const route = currentRoute.value
    if (isClient()) {
      const key = `bambito_layout_${route.replace(/\//g, '_')}`
      localStorage.removeItem(key)
    }
    layouts.value[route] = route === '/blog'
      ? createDefaultPrensaLayout()
      : createDefaultArticuloLayout()
    selectedBlockId.value = null
  }

  function reorderBlocks(newOrder) {
    if (!currentLayout.value) return
    currentLayout.value.blocks = newOrder.filter((b) => b && b.id && b.type)
  }

  return {
    // state
    layouts,
    selectedBlockId,
    isEditing,
    isDragging,
    loading,
    saving,
    currentRoute,
    currentLayout,
    selectedBlock,
    blockTypes,
    // actions
    initLayout,
    initPostLayout,
    addBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    updateBlockContent,
    updateBlockStyles,
    toggleBlockVisibility,
    selectBlock,
    clearSelection,
    saveLayout,
    resetLayout,
    reorderBlocks
  }
})
