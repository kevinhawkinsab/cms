/**
 * Normalizadores compartidos entre stores y páginas SSR.
 * Convierten respuestas del API ASP.NET (id, isVisible, etc.) al formato UI.
 */

export function safeJson(value, fallback = null) {
  try { return JSON.parse(value) } catch { return fallback }
}

export function normalizeCategory(c) {
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

export function normalizePost(p) {
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
          ? String(seoRaw.metaKeywords).split(',').map((k) => k.trim()).filter(Boolean)
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

function unwrapCollection(payload) {
  const data = payload?.data ?? payload
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(data?.items)) return data.items
  return []
}

function unwrapPayload(payload) {
  const d = payload?.data ?? payload
  return d?.data ?? d
}

export function normalizePostList(payload) {
  return unwrapCollection(payload).map(normalizePost).filter(Boolean)
}

export function normalizeCategoryList(payload) {
  return unwrapCollection(payload).map(normalizeCategory).filter(Boolean)
}

export function normalizeLayout(payload) {
  const raw = unwrapPayload(payload)
  if (!raw || !Array.isArray(raw.blocks)) return null
  const blocks = raw.blocks
    .filter((b) => b)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((b) => ({
      id: b.id ? `block-${b.id}` : `block-${Math.random().toString(36).slice(2, 8)}`,
      type: b.type || b.blockType,
      content: typeof b.content === 'string' ? safeJson(b.content, {}) : (b.content || {}),
      styles: typeof b.styles === 'string' ? safeJson(b.styles, {}) : (b.styles || {}),
      visible: b.visible ?? b.isVisible ?? true,
      sortOrder: b.sortOrder ?? 0
    }))
    .filter((b) => b.type && b.visible !== false)

  if (!blocks.length) return null

  return {
    id: raw.id ?? `layout-${raw.routeKey || 'page'}`,
    name: raw.name || '',
    routeKey: raw.routeKey || '',
    updatedAt: raw.updatedAt,
    blocks
  }
}
