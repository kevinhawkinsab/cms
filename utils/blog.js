function slugToComparable(value = '') {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

export function isGenericImageAlt(value = '') {
  const alt = String(value || '').trim().toLowerCase()
  return !alt || /^imagen(?:\s+\d+)?$/.test(alt)
}

export function isPublicBlogPost(post) {
  if (!post) return false
  if (post.visible === false || post.isVisible === false) return false
  return !post.status || String(post.status).toLowerCase() === 'published'
}

function scoreSlugMatch(requestedSlug = '', candidateSlug = '') {
  const requested = slugToComparable(requestedSlug)
  const candidate = slugToComparable(candidateSlug)

  if (!requested || !candidate) return 0
  if (requestedSlug === candidateSlug) return 1
  if (requested === candidate) return 0.99

  const requestedTokens = requested.split('-').filter(Boolean)
  const candidateTokens = candidate.split('-').filter(Boolean)
  const candidateTokenSet = new Set(candidateTokens)
  const commonTokens = requestedTokens.filter((token) => candidateTokenSet.has(token)).length
  const tokenScore = (2 * commonTokens) / Math.max(1, requestedTokens.length + candidateTokens.length)
  const prefixBoost = candidate.startsWith(requested) || requested.startsWith(candidate) ? 0.1 : 0
  const containsBoost =
    candidate.includes(requested.replace(/-/g, '')) || requested.includes(candidate.replace(/-/g, '')) ? 0.05 : 0

  return Math.min(0.98, tokenScore + prefixBoost + containsBoost)
}

function scorePostMatch(requestedSlug = '', post = null) {
  if (!post) return 0

  return Math.max(
    scoreSlugMatch(requestedSlug, post.slug),
    scoreSlugMatch(requestedSlug, post.title),
    scoreSlugMatch(requestedSlug, post.seo?.metaTitle)
  )
}

export function formatBlogDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-PA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function findBestMatchingPost(slug = '', posts = []) {
  let bestPost = null
  let bestScore = 0

  for (const post of posts) {
    const score = scorePostMatch(slug, post)
    if (score > bestScore) {
      bestScore = score
      bestPost = post
    }
  }

  return bestScore >= 0.7 ? bestPost : null
}

function sanitizeHeadingContent(content = {}) {
  const text = String(content.text || '').trim()
  const rawLevel = Number(content.level || 2)

  if (rawLevel === 2 && !text) return null

  return {
    ...content,
    text,
    level: rawLevel >= 5 ? 3 : rawLevel
  }
}

function linkifyPlainUrls(html = '') {
  return String(html).replace(
    /(^|[\s>])((https?:\/\/[^\s<]+))/gi,
    (_, prefix, url) => `${prefix}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  )
}

export function buildDynamicImageAlt(post, fallback = 'Imagen del artículo') {
  if (!post) return fallback

  const featuredAlt = post.featuredImageAlt || post.featuredImage?.alt
  if (featuredAlt && !isGenericImageAlt(featuredAlt)) return featuredAlt

  return String(post.seo?.metaTitle || post.title || fallback).trim()
}

function replaceHardcodedArticleDates(value = '', post = null) {
  if (!post?.publishedAt) return String(value || '')
  const formattedDate = formatBlogDate(post.publishedAt)

  return String(value || '')
    .replace(/\b\d{1,2}(?:-\d{1,2})?\s+de\s+[\p{L}]+\s+de\s+\d{4}\b/gu, formattedDate)
    .replace(/\b\d{1,2}\/\d{1,2}\/\d{4}\b/g, formattedDate)
}

function sanitizeRichTextHtml(html = '', post = null) {
  const imageAlt = buildDynamicImageAlt(post)

  return linkifyPlainUrls(replaceHardcodedArticleDates(html, post))
    .replace(/alt=(["'])Imagen(?:\s+\d+)?\1/gi, `alt="${imageAlt}"`)
    .replace(/<h([2-6])[^>]*>\s*<\/h\1>/gi, '')
    .replace(/<h[56]/gi, '<h3')
    .replace(/<\/h[56]>/gi, '</h3>')
}

function sanitizeGenericContent(content = {}, post = null) {
  const nextContent = { ...content }
  for (const [key, value] of Object.entries(nextContent)) {
    if (typeof value === 'string') {
      nextContent[key] = replaceHardcodedArticleDates(value, post)
    }
  }
  return nextContent
}

function hasGeneratedPostTagsBlock(blocks = []) {
  return blocks.some((block) => block?.type === 'post-tags')
}

function normalizeReference(entry) {
  if (!entry) return null

  if (typeof entry === 'string') {
    const trimmed = entry.trim()
    if (!/^https?:\/\//i.test(trimmed)) return null
    return { url: trimmed, label: trimmed }
  }

  const url = String(entry.url || entry.href || entry.link || '').trim()
  if (!/^https?:\/\//i.test(url)) return null

  return {
    url,
    label: String(entry.label || entry.title || entry.name || url).trim()
  }
}

function extractExternalReferences(post = null) {
  const rawSources = [
    ...(Array.isArray(post?.sources) ? post.sources : []),
    ...(Array.isArray(post?.references) ? post.references : []),
    ...(Array.isArray(post?.externalLinks) ? post.externalLinks : []),
    ...(Array.isArray(post?.links) ? post.links : [])
  ]

  const unique = new Map()
  for (const entry of rawSources.map(normalizeReference).filter(Boolean)) {
    if (!unique.has(entry.url)) unique.set(entry.url, entry)
  }

  return Array.from(unique.values())
}

function buildRelatedThumb(related = {}) {
  const imageUrl =
    related?.featuredImage?.url ||
    related?.featuredImage ||
    related?.featuredImageUrl ||
    ''

  if (imageUrl) {
    return `
      <img
        src="${imageUrl}"
        alt="${buildDynamicImageAlt(related, related?.title || 'Artículo relacionado')}"
        class="rounded-3 object-fit-cover flex-shrink-0"
        style="width:48px;height:48px;"
        loading="lazy"
      >
    `
  }

  return `
    <div
      class="rounded-3 bg-success-subtle text-success d-flex align-items-center justify-content-center flex-shrink-0"
      style="width:48px;height:48px;"
      aria-hidden="true"
    >
      <i class="bi bi-file-earmark-text"></i>
    </div>
  `
}

function buildReferencesBlock(post = null) {
  const references = extractExternalReferences(post)
  if (!references.length) return null

  return {
    id: `generated-references-${post?.id || post?._id || post?.slug || 'post'}`,
    type: 'html',
    visible: true,
    content: {
      code: `
        <section class="article-sources">
          <h3>Fuentes</h3>
          <ul>
            ${references
              .map((reference) => `<li><a href="${reference.url}" target="_blank" rel="noopener noreferrer">${reference.label}</a></li>`)
              .join('')}
          </ul>
        </section>
      `
    },
    styles: {}
  }
}

function buildPostTagsBlock(post = null) {
  const tags = Array.isArray(post?.tags) && post.tags.length
    ? post.tags
    : (post?.categories || [])
      .map((category) => (typeof category === 'object' ? category?.name : category))
      .filter(Boolean)

  return {
    id: `generated-post-tags-${post?.id || post?._id || post?.slug || 'post'}`,
    type: 'post-tags',
    visible: true,
    content: {
      tags,
      align: 'left',
      style: 'pill'
    },
    styles: {}
  }
}

export function sanitizeBlogBlocks(blocks = [], post = null, relatedPosts = []) {
  const sanitizedBlocks = blocks
    .map((block) => {
      if (!block || block.visible === false) return null

      if (block.type === 'heading') {
        const content = sanitizeHeadingContent(sanitizeGenericContent(block.content || {}, post))
        if (!content) return null
        return { ...block, content }
      }

      if (block.type === 'paragraph') {
        return {
          ...block,
          content: {
            ...block.content,
            html: sanitizeRichTextHtml(block.content?.html || '', post)
          }
        }
      }

      if (block.type === 'html') {
        return {
          ...block,
          content: {
            ...block.content,
            code: sanitizeRichTextHtml(block.content?.code || block.content?.html || '', post)
          }
        }
      }

      if (block.type === 'image') {
        return {
          ...block,
          content: {
            ...sanitizeGenericContent(block.content || {}, post),
            alt: isGenericImageAlt(block.content?.alt) ? buildDynamicImageAlt(post) : block.content?.alt
          }
        }
      }

      return {
        ...block,
        content: sanitizeGenericContent(block.content || {}, post)
      }
    })
    .filter(Boolean)

  const hasImageBlock = sanitizedBlocks.some((block) => block.type === 'image')
  if (!hasImageBlock && post?.featuredImage) {
    sanitizedBlocks.splice(Math.min(1, sanitizedBlocks.length), 0, {
      id: `generated-image-${post.id || post._id || post.slug}`,
      type: 'image',
      visible: true,
      content: {
        src: typeof post.featuredImage === 'string' ? post.featuredImage : post.featuredImage?.url,
        alt: buildDynamicImageAlt(post),
        width: '100%'
      },
      styles: {
        marginBottom: '1.5rem'
      }
    })
  }

  const hasInternalLinks = sanitizedBlocks.some((block) => {
    const html = block?.content?.code || block?.content?.html || ''
    return /href=["']\/blog\//i.test(html)
  })


  const hasExternalLinks = sanitizedBlocks.some((block) => {
    const html = block?.content?.code || block?.content?.html || ''
    return /href=["']https?:\/\//i.test(html)
  })

  if (!hasExternalLinks) {
    const referencesBlock = buildReferencesBlock(post)
    if (referencesBlock) sanitizedBlocks.push(referencesBlock)
  }

  if (!hasGeneratedPostTagsBlock(sanitizedBlocks)) {
    sanitizedBlocks.push(buildPostTagsBlock(post))
  }

  return sanitizedBlocks
}

export function normalizeArticleCanonicalUrl(siteUrl, post) {
  if (!siteUrl || !post?.slug) return ''
  return `${String(siteUrl).replace(/\/$/, '')}/blog/${post.slug}`
}