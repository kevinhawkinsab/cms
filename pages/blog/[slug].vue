<template>
  <div class="articulo-page">
    <div v-if="pending" class="min-vh-100 d-flex align-items-center justify-content-center">
      <div class="spinner-border text-bsw" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <template v-else-if="post">
      <section class="article-body-section" style="padding-top:100px;">
        <div class="container-fuild mx-auto" style="max-width: 1400px;">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <PageRenderer :layout="postLayout" :post="post" />
            </div>

            <div class="col-4">
              <div class="sidebar-stack">
                <div class="sidebar-card sidebar-card--cta">
                  <div class="sb-cta-icon">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M3 8l8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                      <rect x="2" y="5" width="18" height="13" rx="2.5" stroke="currentColor" stroke-width="1.6" />
                    </svg>
                  </div>
                  <h4 class="sb-cta-title">¿Te gustó este artículo?</h4>
                  <p class="sb-cta-desc">Compártelo con amigos y familiares y sigue explorando el mundo del agua de manantial volcánica..</p>
                </div>

                <div v-if="post.tags && post.tags.length" class="sidebar-card">
                  <div class="sidebar-kicker">Etiquetas</div>
                  <div class="sb-tags">
                    <span v-for="tag in post.tags" :key="tag" class="sb-tag">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5.5V2a1 1 0 0 1 1-1h3.5l3.5 3.5-4 4L1 5z" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="3.5" cy="3.5" r=".6" fill="currentColor" />
                      </svg>
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <div class="sidebar-card sidebar-card--share">
                  <div class="sidebar-kicker">Compartir</div>
                  <p class="sb-share-desc">Si este artículo te resultó útil, compártelo con tu red.</p>
                  <div class="sb-share-btns">
                    <a :href="facebookShareUrl" target="_blank" rel="noopener noreferrer" class="sb-share-btn sb-share-btn--fb" aria-label="Compartir en Facebook">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <path d="M13 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5V9.5H6.5v-2H8V6a2.5 2.5 0 0 1 2.5-2.5H12v2h-1.25A.75.75 0 0 0 10 6.25V7.5h2l-.375 2H10V15h3a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" />
                      </svg>
                      Facebook
                    </a>
                    <a :href="twitterShareUrl" target="_blank" rel="noopener noreferrer" class="sb-share-btn sb-share-btn--tw" aria-label="Compartir en X">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M10.9 1H13l-4.1 4.7L13.5 13H9.6L6.6 9 3.2 13H1.1l4.4-5L1 1h4l2.8 3.7L10.9 1zm-.65 10.8h1.08L3.75 2.07H2.6l7.65 9.73z" />
                      </svg>
                      X / Twitter
                    </a>
                    <a :href="whatsappShareUrl" target="_blank" rel="noopener noreferrer" class="sb-share-btn sb-share-btn--wa" aria-label="Compartir en WhatsApp">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                        <path d="M7.5 1C3.91 1 1 3.91 1 7.5c0 1.16.3 2.25.83 3.2L1 14l3.4-.81A6.48 6.48 0 0 0 7.5 14C11.09 14 14 11.09 14 7.5S11.09 1 7.5 1zm0 11.64a5.12 5.12 0 0 1-2.6-.71l-.19-.11-1.91.45.46-1.83-.12-.19A5.14 5.14 0 1 1 7.5 12.64zm2.82-3.83c-.15-.08-.91-.45-1.05-.5-.14-.05-.24-.08-.34.08-.1.16-.4.5-.49.61-.09.1-.18.11-.33.04a4.24 4.24 0 0 1-2.07-1.82c-.16-.28.16-.26.45-.87.05-.1.02-.2-.02-.28-.04-.08-.34-.83-.47-1.13-.13-.3-.25-.25-.34-.26H5c-.1 0-.25.04-.39.2-.14.15-.53.52-.53 1.27s.55 1.47.63 1.57c.08.1 1.1 1.7 2.7 2.38.38.16.67.26.9.33.38.12.72.1.99.07.3-.05.91-.37 1.04-.73.13-.36.13-.67.09-.73-.04-.08-.14-.11-.3-.19z" />
                      </svg>
                      WhatsApp
                    </a>
                    <a :href="`mailto:?subject=${encodedArticleTitle}&body=${encodedArticleUrl}`" class="sb-share-btn sb-share-btn--mail" aria-label="Compartir por email">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.35">
                        <rect x="1.5" y="3" width="11" height="8.5" rx="1.5" />
                        <path d="M1.5 5l5.5 4 5.5-4" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>

                <!-- <div v-if="relatedFaqs.length" class="sidebar-card sidebar-card--faq">
                  <div class="sidebar-kicker">Preguntas frecuentes</div>
                  <div class="sb-faq-list">
                    <details v-for="(faq, i) in relatedFaqs?.slice(0, 3)" :key="i" class="sb-faq-item">
                      <summary class="sb-faq-question">
                        <svg class="sb-faq-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M3 4.5L6 7.5l3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {{ faq.question }}
                      </summary>
                      <p class="sb-faq-answer">{{ faq.answer }}</p>
                    </details>
                  </div>
                </div> -->

                <div v-if="relatedPosts.length" class="sidebar-card sidebar-card--accent">
                  <div class="sidebar-kicker">Relacionado</div>
                  <h4 class="sidebar-title" style="font-size:1.05rem; margin-bottom:14px;">Otros artículos</h4>
                  <ul class="list-unstyled mb-0 sb-related-list">
                    <li v-for="related in relatedPosts" :key="related.id">
                      <NuxtLink :to="`/blog/${related.slug}`" class="related-post-card">
                        <div v-if="related.featuredImage" class="related-post-thumb">
                          <img :src="related.featuredImage" :alt="related.title" class="related-post-thumb__img">
                        </div>
                        <div v-else class="related-post-thumb related-post-thumb--placeholder">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.3" />
                            <path d="M2 12l4-4 3 3 2-2 5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                        <div class="related-post-body">
                          <span class="related-post-title">{{ related.title }}</span>
                          <span v-if="related.publishedAt" class="related-post-date">{{ formatDate(related.createdAt) }}</span>
                        </div>
                        <svg class="related-post-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <template v-else>
      <div class="min-vh-100 d-flex align-items-center justify-content-center px-3">
        <div class="not-found-card text-center">
          <div class="not-found-card__icon mb-4">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h2 class="mb-3">Artículo no encontrado</h2>
          <p class="text-muted mb-4">El artículo que buscas no existe o ha sido eliminado.</p>
          <NuxtLink to="/blog" class="btn btn-bsw px-4">Ir al Blog</NuxtLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSeo } from '~/composables/useSeo'
import { normalizePost, normalizePostList } from '~/utils/normalizers'
import {
  findBestMatchingPost,
  formatBlogDate,
  isPublicBlogPost,
  normalizeArticleCanonicalUrl,
  sanitizeBlogBlocks
} from '~/utils/blog'

const route = useRoute()
const apiBase = useApiBase()
const { public: { siteUrl } } = useRuntimeConfig()

const slug = computed(() => String(route.params.slug || ''))

function safeJson(value, fallback = null) {
  try { return JSON.parse(value) } catch { return fallback }
}

const { data: postIndex } = await useAsyncData(
  'blog-post-index',
  async () => {
    try {
      const response = await $fetch('/GetPosts_CMS/posts', { baseURL: apiBase })
      return normalizePostList(response).filter(isPublicBlogPost)
    } catch (error) {
      console.warn('[Blog] No se pudo cargar el índice de artículos:', error?.message || error)
      return []
    }
  },
  { default: () => [] }
)

const matchedPost = computed(() => findBestMatchingPost(slug.value, postIndex.value || []))
const resolvedSlug = computed(() => matchedPost.value?.slug || slug.value)

if (matchedPost.value?.slug && matchedPost.value.slug !== slug.value) {
  await navigateTo(`/blog/${matchedPost.value.slug}`, { redirectCode: 301, replace: true })
}

const { data: detailData, pending, error: fetchError } = await useAsyncData(
  () => `articulo-${resolvedSlug.value}`,
  async () => {
    try {
      const postResp = await $fetch(`/GetPostBySlug_CMS/slug/${resolvedSlug.value}`, { baseURL: apiBase })
      const normalizedPost = normalizePost(postResp?.data ?? postResp)
      if (!normalizedPost) return null
      return { post: normalizedPost, relatedPosts: postIndex.value || [] }
    } catch (error) {
      const fallbackId = matchedPost.value?.id || matchedPost.value?._id
      if (fallbackId) {
        try {
          const fallbackResp = await $fetch(`/GetPostById_CMS/${fallbackId}`, { baseURL: apiBase })
          const fallbackPost = normalizePost(fallbackResp?.data ?? fallbackResp)
          if (fallbackPost) return { post: fallbackPost, relatedPosts: postIndex.value || [] }
        } catch (fallbackError) {
          console.error('[Blog] Error al obtener el artículo por id:', fallbackError)
        }
      }
      console.error(`[Blog] Error al obtener el artículo ${slug.value}:`, error)
      return null
    }
  },
  { watch: [resolvedSlug], default: () => null }
)

const post = computed(() => detailData.value?.post || null)
const apiRelatedPosts = computed(() => detailData.value?.relatedPosts || [])

if (!post.value || fetchError.value) {
  throw createError({ statusCode: 404, statusMessage: 'Artículo no encontrado', fatal: true })
}

const defaultFaqs = [
  {
    id: 'faq-1',
    category: 'origen',
    emoji: '🌋',
    question: '¿Qué es el agua de manantial?',
    answer: 'El agua de manantial es un tipo de agua que se origina de fuentes subterráneas naturales.'
  },
  {
    id: 'faq-2',
    category: 'origen',
    emoji: '🗺️',
    question: '¿De dónde proviene el agua de manantial Bambito?',
    answer: 'El agua de manantial Bambito proviene de un manantial ubicado en la región de Bambito, en la provincia de Chiriquí, Panamá. Esta área es conocida por su entorno natural protegido y su suelo volcánico.'
  },
  {
    id: 'faq-3',
    category: 'marca',
    emoji: '🛡️',
    question: '¿Es el agua de manantial segura para beber?',
    answer: 'Sí, completamente. El agua de manantial Bambito cumple con todos los estándares internacionales y panameños de calidad alimentaria.'
  },
  {
    id: 'faq-4',
    category: 'marca',
    emoji: '🧪',
    question: '¿Qué hace que el agua de manantial Bambito sea diferente?',
    answer: 'Contamos con certificación ISO 9001 y embotellamos directamente en el origen bajo estrictos controles de calidad, sin aditivos ni tratamientos químicos. Lo que proviene del volcán es lo que llega a tu mesa.'
  }
]

const relatedFaqs = computed(() => {
  const faqs = post.value?.faqs

  if (Array.isArray(faqs) && faqs.length) {
    return faqs
      .filter(
        (faq) =>
          faq?.question &&
          (
            faq?.answer ||
            (Array.isArray(faq?.blocks) && faq.blocks.length)
          )
      )
      .slice(0, 3)
  }

  return defaultFaqs
})

const relatedPosts = computed(() => {
  if (!post.value) return []
  const currentSlug = post.value.slug
  const currentCategoryIds = (post.value.categories || []).map((category) => category?._id || category)
  const others = apiRelatedPosts.value.filter((candidate) => candidate.slug !== currentSlug)
  const sameCategory = others.filter((candidate) =>
    (candidate.categories || []).some((category) => currentCategoryIds.includes(category?._id || category))
  )
  const pool = sameCategory.length >= 2 ? sameCategory : others
  return pool.slice(0, 4)
})

const postLayout = computed(() => {
  const sourceBlocks = Array.isArray(post.value?.blocks) && post.value.blocks.length
    ? post.value.blocks
    : [{
        id: `fallback-content-${post.value?.id || post.value?._id || post.value?.slug || 'post'}`,
        type: String(post.value?.content || '').trim().startsWith('<') ? 'html' : 'paragraph',
        content: String(post.value?.content || post.value?.excerpt || '').trim().startsWith('<')
          ? { code: String(post.value?.content || post.value?.excerpt || '') }
          : { html: `<p>${String(post.value?.content || post.value?.excerpt || '').trim()}</p>` },
        styles: {},
        visible: true
      }].filter((block) => {
        const payload = block?.content?.html || block?.content?.code || ''
        return String(payload || '').trim().length > 0
      })

  if (!sourceBlocks.length) return null

  return {
    id: `post-${post.value.id || post.value._id}`,
    name: post.value.title,
    route: `/blog/${post.value.slug}`,
    blocks: sanitizeBlogBlocks(
      sourceBlocks.map((block) => ({
        id: block.id ? `block-${block.id}` : `block-${Math.random().toString(36).slice(2, 8)}`,
        type: block.type || block.blockType,
        content: typeof block.content === 'string' ? safeJson(block.content, {}) : (block.content || {}),
        styles: typeof block.styles === 'string' ? safeJson(block.styles, {}) : (block.styles || {}),
        visible: block.visible ?? block.isVisible ?? true
      })),
      post.value,
      relatedPosts.value
    )
  }
})

const articleUrl = computed(() => normalizeArticleCanonicalUrl(siteUrl, post.value))

const absoluteAssetUrl = (value) => {
  if (!value) return `${siteUrl || 'https://www.bambitospringwater.com'}/img/images/bsw1.jpg`
  if (/^https?:\/\//i.test(value)) return value
  return `${siteUrl || 'https://www.bambitospringwater.com'}${value.startsWith('/') ? value : `/${value}`}`
}

const articleImage = computed(() => absoluteAssetUrl(post.value?.seo?.ogImage || post.value?.featuredImage))

const normalizedContent = computed(() => {
  const content = post.value?.content
  if (typeof content === 'string') return content
  if (Array.isArray(content)) return content.join(' ')

  if (Array.isArray(postLayout.value?.blocks) && postLayout.value.blocks.length) {
    return postLayout.value.blocks.map((block) => {
      const blockContent = block?.content || {}
      if (typeof blockContent === 'string') return blockContent
      if (blockContent.html) return blockContent.html
      if (blockContent.code) return blockContent.code
      if (blockContent.text) return blockContent.text
      if (blockContent.title) return blockContent.title
      return Object.values(blockContent).filter((value) => typeof value === 'string').join(' ')
    }).join(' ')
  }

  if (content && typeof content === 'object') return JSON.stringify(content)
  return ''
})

const wordCount = computed(() => {
  if (!normalizedContent.value) return undefined
  return normalizedContent.value.replace(/<[^>]*>/g, '').trim().split(/\s+/).filter(Boolean).length
})

const encodedArticleUrl = computed(() => encodeURIComponent(articleUrl.value))
const encodedArticleTitle = computed(() => encodeURIComponent(post.value?.title || 'Bambito Spring Water'))
const facebookShareUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodedArticleUrl.value}`)
const twitterShareUrl = computed(() => `https://twitter.com/intent/tweet?url=${encodedArticleUrl.value}&text=${encodedArticleTitle.value}`)
const whatsappShareUrl = computed(() => `https://wa.me/?text=${encodedArticleUrl.value}`)

const jsonLd = computed(() => {
  if (!post.value) return null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl.value}#article`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl.value },
    headline: post.value.title,
    description: post.value.excerpt || post.value.seo?.metaDescription || '',
    image: { '@type': 'ImageObject', url: articleImage.value, width: 1200, height: 630 },
    datePublished: post.value.publishedAt || post.value.createdAt,
    dateModified: post.value.updatedAt || post.value.publishedAt,
    author: { '@type': 'Organization', name: 'Bambito Spring Water', '@id': `${siteUrl}/#organization` },
    publisher: { '@type': 'Organization', name: 'Bambito Spring Water', '@id': `${siteUrl}/#organization` },
    articleSection: post.value.categories?.[0]?.name || post.value.categories?.[0] || 'General',
    keywords: Array.isArray(post.value.tags) ? post.value.tags.join(', ') : '',
    inLanguage: 'es-PA'
  }

  if (wordCount.value) articleSchema.wordCount = wordCount.value

  return [
    articleSchema,
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${articleUrl.value}#breadcrumb`,
      inLanguage: 'es-PA',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
        { '@type': 'ListItem', position: 3, name: post.value.title, item: articleUrl.value }
      ]
    },
    ...(relatedFaqs.value.length ? [{
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: relatedFaqs.value.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    }] : [])
  ]
})

const seoTitle = computed(() =>
  post.value?.seo?.metaTitle || (post.value?.title ? `${post.value.title} | Bambito Spring Water` : 'Articulo | Bambito Spring Water')
)

const seoDescription = computed(() =>
  post.value?.seo?.metaDescription || post.value?.excerpt || 'Lee el artículo completo en Bambito Spring Water.'
)

useSeo({
  title: seoTitle,
  description: seoDescription,
  keywords: computed(() => {
    const fromSeo = post.value?.seo?.metaKeywords
    if (Array.isArray(fromSeo) && fromSeo.length) return fromSeo
    if (typeof fromSeo === 'string' && fromSeo) return fromSeo
    return post.value?.tags || []
  }),
  image: articleImage,
  url: articleUrl,
  canonical: computed(() => post.value?.seo?.canonicalUrl || articleUrl.value),
  twitterImageAlt: computed(() => `${post.value?.title || 'Articulo'} | Blog de Bambito Spring Water`),
  type: 'article',
  jsonLd
})

useSeoMeta({
  articlePublishedTime: computed(() => post.value?.publishedAt || post.value?.createdAt),
  articleModifiedTime: computed(() => post.value?.updatedAt || post.value?.publishedAt),
  articleAuthor: 'Bambito Spring Water',
  articleSection: computed(() => post.value?.categories?.[0]?.name || post.value?.categories?.[0] || 'General'),
  articleTag: computed(() => post.value?.tags || [])
})

const formatDate = (date) => formatBlogDate(date)
</script>

<style scoped>
.articulo-page {
  background:
    radial-gradient(circle at top left, rgba(134, 188, 66, 0.10), transparent 28%),
    radial-gradient(circle at top right, rgba(1, 180, 228, 0.08), transparent 24%),
    #f7f8fb;
  color: #0f172a;
}

.article-hero {
  position: relative;
  min-height: 68vh;
  display: flex;
  align-items: end;
  padding: 110px 0 72px;
  background: center/cover no-repeat;
  overflow: hidden;
}

.article-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(3, 11, 21, 0.20), rgba(3, 11, 21, 0.82)),
    linear-gradient(135deg, rgba(0, 0, 0, 0.20), rgba(17, 24, 39, 0.20));
}

.article-hero__content {
  z-index: 1;
}

.breadcrumb-custom .breadcrumb-item+.breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.55);
}

.article-hero__title {
  font-size: clamp(2.3rem, 5vw, 4.6rem);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.05em;
  text-wrap: balance;
}

.article-hero__meta {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.98rem;
}

.category-pill {
  border: 1px solid transparent;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);
}

.article-body-section {
  padding: 42px 0 90px;
}

.article-card {
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 30px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  backdrop-filter: blur(14px);
}

.article-card__header {
  padding: 26px 26px 0;
}

.article-excerpt {
  font-size: 1.1rem;
  line-height: 1.85;
  color: #475569;
  border-left: 4px solid var(--bsw-primary);
  padding-left: 18px;
}

.article-content-wrapper {
  padding: 26px;
}

.article-content {
  font-size: 1.06rem;
  line-height: 1.9;
  color: #334155;
}

.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #0f172a;
}

.article-content :deep(p) {
  margin-bottom: 1.25rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  margin-bottom: 0.55rem;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 18px;
  margin: 1rem 0;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--bsw-primary);
  padding: 0.25rem 0 0.25rem 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #64748b;
}

.article-section {
  padding: 0 26px 26px;
}

.article-faq-section {
  padding: 0 0 26px;
}

.article-faq-stack {
  display: grid;
  gap: 0.85rem;
}

.article-faq-card {
  padding: 1rem 1.1rem;
  border-radius: 20px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.05);
}

.article-faq-card h3 {
  font-size: 1rem;
  font-weight: 800;
  line-height: 1.35;
  color: #0f172a;
  margin-bottom: 0.55rem;
}

.article-faq-card p {
  color: #475569;
  line-height: 1.75;
  margin-bottom: 0;
}

.section-heading h5 {
  font-weight: 800;
  letter-spacing: -0.03em;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
  aspect-ratio: 1/1;
  background: #e2e8f0;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.gallery-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.10);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag-pill {
  background: rgba(134, 188, 66, 0.10);
  color: #334155;
  border: 1px solid rgba(134, 188, 66, 0.18);
  padding: 0.72rem 0.95rem;
  font-weight: 700;
}

.share-card {
  margin: 0 26px 26px;
  padding: 22px;
  border-radius: 24px;
  background: radial-gradient(circle at top right, rgba(134, 188, 66, 0.09), transparent 24%), #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.05);
}

.btn-share {
  border-radius: 999px;
  font-weight: 700;
  padding: 0.78rem 1rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.btn-facebook {
  background: rgba(24, 119, 242, 0.08);
  color: #1877f2;
}

.btn-twitter {
  background: rgba(29, 155, 240, 0.08);
  color: #1d9bf0;
}

.btn-whatsapp {
  background: rgba(37, 211, 102, 0.08);
  color: #25d366;
}

.btn-mail {
  background: rgba(100, 116, 139, 0.08);
  color: #334155;
}

.article-back-btn {
  border-radius: 999px;
}

.sidebar-stack {
  position: sticky;
  top: 102px;
  display: grid;
  gap: 1rem;
}

.sidebar-card {
  background: rgba(255, 255, 255, 0.90);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 26px;
  padding: 22px;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(14px);
}

.sidebar-card--hero {
  background: linear-gradient(180deg, rgba(134, 188, 66, 0.10), rgba(255, 255, 255, 0.92)), #fff;
}

.sidebar-card--accent {
  background: radial-gradient(circle at top right, rgba(1, 180, 228, 0.10), transparent 24%), #fff;
}

.sidebar-kicker {
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #64748b;
  margin-bottom: 10px;
  display: block;
}

.sidebar-icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(134, 188, 66, 0.12);
  color: var(--bsw-primary);
}

.sidebar-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.25;
  margin-bottom: 12px;
}

.sidebar-text {
  color: #475569;
  line-height: 1.8;
  margin: 0;
}

.sidebar-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
  background: rgba(134, 188, 66, 0.10);
  color: var(--bsw-primary);
  font-size: 0.8rem;
  font-weight: 800;
}

.detail-list {
  display: grid;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item span {
  color: #64748b;
  font-weight: 600;
}

.detail-item strong {
  color: #0f172a;
  font-weight: 800;
  text-align: right;
}

.not-found-card {
  max-width: 520px;
  width: 100%;
  padding: 34px 28px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.not-found-card__icon {
  width: 78px;
  height: 78px;
  margin: 0 auto;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(134, 188, 66, 0.10);
  color: var(--bsw-primary);
  font-size: 2rem;
}

.sb-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.sb-meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.78rem;
  color: #64748b;
  font-weight: 600;
}

.sb-category-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  background: rgba(26, 79, 58, 0.08);
  color: #1A4F3A;
  border: 1px solid rgba(26, 79, 58, 0.15);
}

.sb-reading-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.sb-reading-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #94a3b8;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.06);
  border-radius: 99px;
  padding: 3px 9px;
}

.sb-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
}

.sb-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border-radius: 99px;
  font-size: 0.78rem;
  font-weight: 700;
  background: rgba(134, 188, 66, 0.08);
  color: #334155;
  border: 1px solid rgba(134, 188, 66, 0.18);
  cursor: default;
  transition: background 0.15s;
}

.sb-tag:hover {
  background: rgba(134, 188, 66, 0.16);
}

.sidebar-card--share {
  background: linear-gradient(135deg, rgba(26, 79, 58, 0.05), rgba(255, 255, 255, 0.95)), #fff;
}

.sb-share-desc {
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.55;
  margin: 8px 0 14px;
}

.sb-share-btns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.sb-share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: all 0.17s;
}

.sb-share-btn--fb {
  background: rgba(24, 119, 242, 0.08);
  color: #1877f2;
  border-color: rgba(24, 119, 242, 0.15);
}

.sb-share-btn--fb:hover {
  background: rgba(24, 119, 242, 0.16);
  color: #1877f2;
}

.sb-share-btn--tw {
  background: rgba(15, 23, 42, 0.06);
  color: #0f1729;
  border-color: rgba(15, 23, 42, 0.1);
}

.sb-share-btn--tw:hover {
  background: rgba(15, 23, 42, 0.12);
  color: #0f1729;
}

.sb-share-btn--wa {
  background: rgba(37, 211, 102, 0.08);
  color: #128c3e;
  border-color: rgba(37, 211, 102, 0.18);
}

.sb-share-btn--wa:hover {
  background: rgba(37, 211, 102, 0.16);
  color: #128c3e;
}

.sb-share-btn--mail {
  background: rgba(100, 116, 139, 0.07);
  color: #475569;
  border-color: rgba(100, 116, 139, 0.14);
}

.sb-share-btn--mail:hover {
  background: rgba(100, 116, 139, 0.14);
  color: #334155;
}

.sidebar-card--faq {
  background: #fafaf8;
}

.sb-faq-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 12px;
}

.sb-faq-item {
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
}

.sb-faq-item[open] {
  border-color: rgba(26, 79, 58, 0.18);
}

.sb-faq-question {
  list-style: none;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 11px 14px;
  font-size: 0.83rem;
  font-weight: 700;
  color: #0f172a;
  cursor: pointer;
  user-select: none;
  line-height: 1.4;
}

.sb-faq-question::-webkit-details-marker {
  display: none;
}

.sb-faq-question::marker {
  display: none;
}

.sb-faq-chevron {
  flex-shrink: 0;
  margin-top: 1px;
  color: #1A4F3A;
  transition: transform 0.2s;
}

.sb-faq-item[open] .sb-faq-chevron {
  transform: rotate(180deg);
}

.sb-faq-answer {
  padding: 0 14px 12px 34px;
  font-size: 0.8rem;
  color: #475569;
  line-height: 1.7;
  margin: 0;
}

.sb-related-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.related-post-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  color: #0f172a;
  text-decoration: none;
}

.related-post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.09);
  color: #1A4F3A;
}

.related-post-thumb {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: #e2e8f0;
}

.related-post-thumb__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.related-post-thumb--placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
}

.related-post-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.related-post-title {
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.35;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.related-post-date {
  font-size: 0.72rem;
  color: #94a3b8;
  font-weight: 600;
}

.related-post-arrow {
  flex-shrink: 0;
  color: #cbd5e1;
  transition: color 0.15s;
}

.related-post-card:hover .related-post-arrow {
  color: #1A4F3A;
}

.sidebar-card--cta {
  background: linear-gradient(145deg, #1A4F3A 0%, #1f6347 100%);
  color: #fff;
  border-color: transparent;
}

.sidebar-card--cta .sidebar-kicker {
  color: rgba(255, 255, 255, 0.5);
}

.sb-cta-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 12px;
}

.sb-cta-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: #fff;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.sb-cta-desc {
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.6;
  margin: 0 0 16px;
}

.sb-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.18s;
  backdrop-filter: blur(6px);
}

.sb-cta-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  color: #fff;
  transform: translateX(2px);
}

@media (max-width: 991.98px) {
  .article-hero {
    min-height: auto;
    padding: 98px 0 56px;
  }

  .article-hero__title {
    font-size: clamp(2rem, 7vw, 3.4rem);
  }

  .article-body-section {
    padding: 28px 0 72px;
  }

  .sidebar-stack {
    position: static;
  }
}

@media (max-width: 575.98px) {
  .article-hero__title {
    font-size: 2.2rem;
  }

  .article-card__header,
  .article-content-wrapper,
  .article-section,
  .share-card {
    padding-left: 18px;
    padding-right: 18px;
  }

  .share-card {
    margin-left: 18px;
    margin-right: 18px;
  }

  .btn-share {
    width: 100%;
    justify-content: center;
  }

  .sidebar-card {
    padding: 18px;
  }

  .sb-share-btns {
    grid-template-columns: 1fr;
  }
}
</style>
