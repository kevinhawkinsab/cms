export function normalizePost(raw) {
  return {
    id: raw.id ?? raw.postId,
    title: raw.title ?? '',
    slug: raw.slug ?? '',
    excerpt: raw.excerpt ?? raw.summary ?? '',
    content: raw.content ?? raw.body ?? '',
    thumbnail: raw.thumbnail ?? raw.featuredImage ?? raw.imageUrl ?? null,
    visible: raw.visible ?? raw.isVisible ?? false,
    publishedAt: raw.publishedAt ?? raw.publishDate ?? null,
    categories: raw.categories ?? [],
    tags: raw.tags ?? [],
    videoUrl: raw.videoUrl ?? '',
    canonicalUrl: raw.canonicalUrl ?? '',
    metaTitle: raw.metaTitle ?? '',
    metaDescription: raw.metaDescription ?? '',
    metaKeywords: raw.metaKeywords ?? '',
    additionalImages: raw.additionalImages ?? [],
    blocks: raw.blocks ?? [],
    companyId: raw.companyId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

export function normalizeCategory(raw) {
  return {
    id: raw.id ?? raw.categoryId,
    name: raw.name ?? '',
    description: raw.description ?? '',
    slug: raw.slug ?? '',
    color: raw.color ?? '#1A4F3A',
    postsCount: raw.postsCount ?? raw.posts ?? 0,
    companyId: raw.companyId,
    createdAt: raw.createdAt,
  }
}

export function normalizeMedia(raw) {
  return {
    id: raw.id ?? raw.mediaId,
    url: raw.url ?? raw.fileUrl ?? '',
    filename: raw.filename ?? raw.name ?? '',
    alt: raw.alt ?? raw.altText ?? '',
    caption: raw.caption ?? '',
    category: raw.category ?? raw.mediaCategory ?? '',
    downloadable: raw.downloadable ?? raw.isDownloadable ?? false,
    size: raw.size ?? raw.fileSize ?? 0,
    mimeType: raw.mimeType ?? raw.type ?? '',
    width: raw.width ?? null,
    height: raw.height ?? null,
    companyId: raw.companyId,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

export function normalizeUser(raw) {
  return {
    id: raw.id ?? raw.userId,
    internalId: raw.internalId ?? '',
    name: raw.name ?? raw.fullName ?? `${raw.firstName ?? ''} ${raw.lastName ?? ''}`.trim(),
    email: raw.email ?? '',
    role: raw.role ?? '',
    companyId: raw.companyId,
    companyName: raw.companyName ?? '',
    assignedBy: raw.assignedBy ?? raw.assignedByName ?? '',
    assignedAt: raw.assignedAt ?? raw.createdAt ?? null,
    avatar: raw.avatar ?? null,
    department: raw.department ?? '',
  }
}

export function normalizeCompany(raw) {
  return {
    id: raw.id ?? raw.companyId,
    name: raw.name ?? raw.companyName ?? '',
    key: raw.key ?? raw.companyKey ?? '',
    logo: raw.logo ?? raw.logoUrl ?? null,
    domain: raw.domain ?? '',
    active: raw.active ?? raw.isActive ?? true,
  }
}

export function normalizeBlock(raw) {
  return {
    id: raw.id ?? crypto.randomUUID(),
    serverId: raw.serverId ?? raw.blockId ?? null,
    type: raw.type ?? 'paragraph',
    content: raw.content ?? {},
    styles: raw.styles ?? {},
    visible: raw.visible ?? true,
    sortOrder: raw.sortOrder ?? raw.order ?? 0,
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  return d.toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export function formatFileSize(bytes) {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getFileType(mimeType) {
  if (!mimeType) return 'unknown'
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.includes('pdf')) return 'pdf'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'word'
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'excel'
  return 'file'
}
