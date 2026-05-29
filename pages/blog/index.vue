<template>
  <div class="prensa-page">
    <template v-if="isLoading">
      <section class="section-shell section-loading">
        <div class="container">
          <div class="row align-items-center g-4 mb-5">
            <div class="col-lg-7">
              <div class="sk sk-text sk-sm mb-3"></div>
              <div class="sk sk-title mb-3"></div>
              <div class="sk sk-text mb-2"></div>
              <div class="sk sk-text w-75 mb-4"></div>
              <div class="d-flex gap-2">
                <div class="sk sk-btn"></div>
                <div class="sk sk-btn sk-outline"></div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="sk sk-card h-100"></div>
            </div>
          </div>
          <div class="row g-4">
            <div v-for="i in 6" :key="i" class="col-12 col-md-6 col-lg-4">
              <div class="sk sk-card">
                <div class="sk sk-image"></div>
                <div class="sk sk-body">
                  <div class="sk sk-text sk-sm mb-2"></div>
                  <div class="sk sk-text mb-2"></div>
                  <div class="sk sk-text w-75 mb-3"></div>
                  <div class="sk sk-link w-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <template v-else-if="hasError">
      <section class="section-shell py-5">
        <div class="container text-center py-5">
          <div class="card border-0 shadow-sm mx-auto p-5" style="max-width: 550px; border-radius: 24px; background: #fff;">
            <div class="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle text-danger mb-4" style="width: 72px; height: 72px;">
              <i class="fas fa-triangle-exclamation fs-3"></i>
            </div>
            <h3 class="h5 fw-bold text-dark mb-2">Error de conexión</h3>
            <p class="text-muted mb-4">No se lograron obtener las publicaciones en este momento. Por favor, verifica tu conexión o intenta más tarde.</p>
            <button class="btn btn-bsw rounded-pill px-4" @click="refreshPage">
              <i class="fas fa-rotate me-2"></i>Intentar de nuevo
            </button>
          </div>
        </div>
      </section>
    </template>

    <template v-else-if="hasCustomLayout">
        <div class="container-fluid p-0 overflow-hidden">
          <PageRenderer :layout="customLayout" />
        </div>
    </template>

    <template v-else>
      <section class="section-shell section-shell-tight" id="noticias">
        <div class="container">
          <div class="press-toolbar">
            <h3 class="mt-4 fw-bold">Publicaciones recientes</h3>
          </div>

          <template v-if="regularPosts.length > 0">
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <div class="col" v-for="post in regularPosts" :key="post._id">
                <NuxtLink :to="`/blog/${post.slug}`" class="text-decoration-none h-100 d-block"
                  :data-testid="`post-card-${post.slug}`">
                  <article class="news-card h-100">
                    <div class="news-card__image">
                      <img :src="post.featuredImage || '/img/images/bambito-logo.png'" :alt="post.title" loading="lazy"
                        decoding="async">
                      <span v-if="post.categories && post.categories[0]" class="news-card__tag"
                        :style="{ backgroundColor: post.categories[0].color || '#86bc42' }">
                        {{ post.categories[0].name }}
                      </span>
                    </div>
                    <div class="news-card__body">
                      <small class="news-card__date">{{ formatDate(post.publishedAt) }}</small>
                      <h5 class="news-card__title">{{ post.title }}</h5>
                      <p class="news-card__excerpt text-muted">{{ post.excerpt }}</p>
                      <span class="read-more">
                        Leer más <i class="fas fa-arrow-right ms-1"></i>
                      </span>
                    </div>
                  </article>
                </NuxtLink>
              </div>
            </div>
          </template>

          <div v-else class="empty-state">
            <div class="empty-state__icon">
              <i class="fas fa-newspaper"></i>
            </div>
            <h5>No hay publicaciones disponibles</h5>
            <p>Próximamente compartiremos noticias y comunicados.</p>
          </div>

          <nav v-if="totalPages > 1" class="mt-5 d-flex justify-content-end" aria-label="Navegación de páginas">
            <ul class="pagination justify-content-center press-pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" :href="`/blog?page=${currentPage - 1}`" @click.prevent="goToPage(currentPage - 1)">
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link" :href="`/blog?page=${page}`" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" :href="`/blog?page=${currentPage + 1}`" @click.prevent="goToPage(currentPage + 1)">
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section class="section-shell section-shell-alt brand-resources">
        <div class="container">
          <div class="resources-header">
            <p class="section-kicker mx-auto">Recursos de marca</p>
            <h2 class="section-title section-title-center">Historia, datos y materiales oficiales</h2>
            <p class="section-copy section-copy-center">
              Un bloque editorial pensado para presentar la información institucional con mejor jerarquía visual y una
              lectura más clara.
            </p>
          </div>
          <div class="row g-4 align-items-stretch">
            <div class="col-lg-7">
              <div class="resource-feature h-100">
                <div class="resource-feature__top">
                  <span class="resource-pill">Historia de la marca</span>
                  <span class="resource-feature__icon">
                    <i class="fas fa-mountain"></i>
                  </span>
                </div>
                <h3>Origen natural, esencia premium</h3>
                <p>
                  Bambito Spring Water nace en las tierras altas de Chiriquí, Panamá, de un
                  manantial ubicado a 1,510 metros sobre el nivel del mar en las faldas del
                  Volcán Barú. Nuestra agua se filtra naturalmente a través de formaciones
                  rocosas volcánicas durante décadas, enriqueciéndose con minerales esenciales
                  como sílice (~65 mg/L).
                </p>
                <div class="resource-feature__footer">
                  <NuxtLink to="/origen" class="btn btn-resource">Conocer más</NuxtLink>
                </div>
              </div>
            </div>
            <div class="col-lg-5">
              <div class="resource-mini h-100">
                <div class="resource-mini__head">
                  <span class="resource-mini__icon">
                    <i class="fas fa-flask"></i>
                  </span>
                  <h5>Datos del producto</h5>
                </div>
                <ul class="resource-specs">
                  <li v-for="item in productSpecs" :key="item.label">
                    <span>{{ item.label }}</span>
                    <strong>{{ item.value }}</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSeo } from '~/composables/useSeo'
import { normalizePostList, normalizeCategoryList, normalizeLayout } from '~/utils/normalizers'
import { isPublicBlogPost } from '~/utils/blog'

const { public: { siteUrl } } = useRuntimeConfig()
const apiBase = useApiBase()

// SSR data fetching: corre en server y se hidrata al cliente.
const {
  data: prensaData,
  pending,
  error,
  refresh
} = await useAsyncData('prensa-page', async () => {
  try {
    const settle = (promise) =>
      promise
        .then((value) => ({ status: 'fulfilled', value }))
        .catch((reason) => ({ status: 'rejected', reason }))

    const [postsResp, catsResp, layoutResp] = await Promise.all([
      settle($fetch('/GetPosts_CMS/posts', {
        baseURL: apiBase
      })),
      settle($fetch('/GetCategories_CMS/categories', { baseURL: apiBase })),
      settle($fetch('/GetPageLayout_CMS/prensa', { baseURL: apiBase }))
    ])

    const postsFailed = postsResp.status === 'rejected'
    const catsFailed = catsResp.status === 'rejected'
    const posts = postsResp.status === 'fulfilled'
      ? normalizePostList(postsResp.value).filter(isPublicBlogPost)
      : []
    const categories = catsResp.status === 'fulfilled' ? normalizeCategoryList(catsResp.value) : []
    const layout = layoutResp.status === 'fulfilled' ? normalizeLayout(layoutResp.value) : null

    return { 
      posts, 
      categories, 
      layout, 
      hasError: postsFailed || catsFailed 
    }
  } catch (e) {
    console.error('[Prensa] Error al cargar los datos de la API:', e)
    return {
      posts: [],
      categories: [],
      layout: null,
      hasError: true
    }
  }
})

const posts = computed(() => prensaData.value?.posts || [])
const categories = computed(() => prensaData.value?.categories || [])
const customLayout = computed(() => prensaData.value?.layout || null)
const hasError = computed(() => !!prensaData.value?.hasError)

const refreshPage = () => {
  refresh()
}

const hasCustomLayout = computed(() =>
  // false
  !!(customLayout.value && customLayout.value.blocks?.length)
);

const isLoading = computed(() => pending.value)
const route = useRoute()
// Read page from URL query so SSR renders the correct page for Googlebot
const currentPage = ref(Math.max(1, parseInt(String(route.query.page || '1'), 10) || 1))
const selectedCategory = ref(null)
const searchQuery = ref('')

const SITE_URL = 'https://www.bambitospringwater.com'

const filteredPosts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return posts.value.filter((post) => {
    const matchesCategory =
      !selectedCategory.value?._id ||
      post.categories?.some((c) =>
        typeof c === 'object' ? c._id === selectedCategory.value._id : c === selectedCategory.value.name
      )
    const haystack = [post.title, post.excerpt, post.content, post.slug]
      .filter(Boolean).join(' ').toLowerCase()
    const matchesSearch = !q || haystack.includes(q)
    return matchesCategory && matchesSearch
  })
})

const pageSize = 6
const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / pageSize)))
const regularPosts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredPosts.value.slice(start, start + pageSize)
})

const blogJsonLd = computed(() => ([
  {
    '@context':    'https://schema.org',
    '@type':       'Blog',
    '@id':         `${siteUrl}/blog#blog`,
    'name':        'Blog — Bambito Spring Water',
    'description': 'Artículos sobre agua de manantial volcánica, salud, hidratación, mineralidad y sostenibilidad.',
    'url':         `${siteUrl}/blog`,
    'inLanguage':  'es-PA',
    'publisher':   { '@id': `${siteUrl}/#organization` },
    'image':       { '@type': 'ImageObject', 'url': `${siteUrl}/img/images/Botellas.png` }
  },
  {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': `${siteUrl}/` },
      { '@type': 'ListItem', 'position': 2, 'name': 'Blog',   'item': `${siteUrl}/blog` }
    ]
  }
]))

useSeo({
  title:           'Blog | Bambito Spring Water',
  description:     'Artículos sobre agua de manantial volcánica, salud, hidratación, mineralidad y sostenibilidad. Blog oficial de Bambito Spring Water.',
  keywords:        ['blog Bambito', 'agua de manantial', 'hidratación', 'agua volcánica', 'Volcán Barú', 'Panamá', 'blog sobre agua de manantial', 'sílice natural', 'agua y salud', 'mineralidad del agua'],
  type:            'website',
  url:             `${siteUrl}/blog`,
  image:           `${siteUrl}/img/images/Botellas.png`,
  twitterImageAlt: 'Blog de Bambito Spring Water — Artículos sobre agua de manantial, salud e hidratación',
  jsonLd:          blogJsonLd
})

// FIX #3: Canonical + Hreflang — no estaban implementados
useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/blog` },
    { rel: 'alternate', hreflang: 'es',         href: `${siteUrl}/blog` },
    { rel: 'alternate', hreflang: 'es-PA',      href: `${siteUrl}/blog` },
    { rel: 'alternate', hreflang: 'x-default',  href: `${siteUrl}/blog` }
  ]
})

// Paginación SEO — prev/next para Googlebot
useHead(() => {
  const links = []
  if (currentPage.value > 1) {
    const prev = currentPage.value === 2 ? `${siteUrl}/blog` : `${siteUrl}/blog?page=${currentPage.value - 1}`
    links.push({ rel: 'prev', href: prev })
  }
  if (currentPage.value < totalPages.value) {
    links.push({ rel: 'next', href: `${siteUrl}/blog?page=${currentPage.value + 1}` })
  }
  return { link: links }
})

// FIX #4: Open Graph + Twitter Card completos
useSeoMeta({
  ogTitle:            'Blog | Bambito Spring Water',
  ogDescription:      'Artículos sobre agua de manantial volcánica, salud, hidratación, mineralidad y sostenibilidad. Blog oficial de Bambito Spring Water.',
  ogUrl:              `${siteUrl}/blog`,
  ogType:             'website',
  ogImage:            `${siteUrl}/img/images/Botellas.png`,
  ogImageAlt:         'Blog de Bambito Spring Water — Artículos sobre agua de manantial, salud e hidratación',
  ogImageWidth:       '1200',
  ogImageHeight:      '630',
  twitterTitle:       'Blog | Bambito Spring Water',
  twitterDescription: 'Artículos sobre agua de manantial volcánica, salud, hidratación, mineralidad y sostenibilidad. Blog oficial de Bambito Spring Water.',
  twitterImage:       `${siteUrl}/img/images/Botellas.png`,
  twitterImageAlt:    'Blog de Bambito Spring Water — Artículos sobre agua de manantial, salud e hidratación'
})

const heroStyle = computed(() => ({
  backgroundImage:
    "linear-gradient(180deg, rgba(58, 88, 255, 0.2) 0%, rgba(70, 98, 255, 0.2) 100%), url('/img/images/Botellas.png')"
}))

const productSpecs = [
  { label: 'Sílice (SiO₂)', value: '~65 mg/L' },
  { label: 'pH', value: '7.2 - 7.8' },
  { label: 'Calcio', value: '15-25 mg/L' },
  { label: 'Magnesio', value: '8-15 mg/L' },
  { label: 'TDS', value: '<250 mg/L' },
  { label: 'Origen', value: 'Volcán Barú' },
  { label: 'Altitud', value: '1,510 m' },
  { label: 'Certificación', value: 'ISO 9001' }
]

const filterByCategory = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
}

const router = useRouter()
const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  const query = page === 1 ? {} : { page: String(page) }
  router.push({ path: '/blog', query })
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-PA', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}
</script>

<style scoped>
.prensa-page {
  background:
    radial-gradient(circle at top left, rgba(134, 188, 66, 0.10), transparent 30%),
    radial-gradient(circle at top right, rgba(1, 180, 228, 0.08), transparent 28%),
    #f7f8fb;
  color: #1f2937;
}

.press-hero {
  position: relative;
  overflow: hidden;
  min-height: 78vh;
  display: flex;
  align-items: end;
  padding: 110px 0 70px;
  background: linear-gradient(180deg, rgba(3, 11, 21, 0.30), rgba(3, 11, 21, 0.78)),
    url('/img/images/Volcán-Barú-.jpg') center/cover no-repeat;
}

.press-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.25), rgba(20, 34, 44, 0.25)),
    linear-gradient(180deg, transparent 0%, rgba(10, 16, 25, 0.55) 100%);
}

.hero-shell {
  z-index: 1;
}

.hero-kicker,
.section-eyebrow,
.mini-label,
.resource-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
}

.hero-kicker {
  color: rgba(255, 255, 255, 0.82);
  margin-bottom: 16px;
}

.hero-title {
  color: #fff;
  font-size: clamp(2.4rem, 5vw, 4.9rem);
  line-height: 0.98;
  font-weight: 800;
  letter-spacing: -0.05em;
  max-width: 11ch;
  margin-bottom: 18px;
}

.hero-title span {
  display: block;
  color: rgba(255, 255, 255, 0.88);
}

.hero-description {
  color: rgba(255, 255, 255, 0.78);
  max-width: 58ch;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 28px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.btn-hero-primary,
.btn-hero-secondary,
.btn-filter,
.btn-resource,
.btn-kit {
  border-radius: 999px;
  padding: 0.9rem 1.3rem;
  font-weight: 700;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn-hero-primary {
  background: linear-gradient(135deg, #86bc42, #b3d96d);
  color: #0d1a08;
  border: none;
  box-shadow: 0 18px 40px rgba(134, 188, 66, 0.28);
}

.btn-hero-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(18px);
}

.btn-hero-primary:hover,
.btn-hero-secondary:hover,
.btn-filter:hover,
.btn-resource:hover,
.btn-kit:hover {
  transform: translateY(-1px);
}

.hero-panel {
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  padding: 22px;
  color: #fff;
  box-shadow: 0 22px 65px rgba(0, 0, 0, 0.18);
}

.hero-panel__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.mini-label {
  color: rgba(255, 255, 255, 0.75);
}

.mini-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 0.45rem 0.75rem;
}

.hero-panel__body h5 {
  font-size: 1.25rem;
  line-height: 1.35;
  margin-bottom: 10px;
}

.hero-panel__body p {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
  margin-bottom: 0;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 22px;
}

.metric-card {
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  padding: 14px 12px;
  text-align: center;
}

.metric-card strong {
  display: block;
  font-size: 1.15rem;
}

.metric-card span {
  display: block;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.74);
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  min-width: min(100%, 320px);
  padding: 0.9rem 1rem;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04);
}

.search-wrap i {
  color: #6b766f;
  font-size: 0.95rem;
}

.search-input {
  border: none;
  box-shadow: none;
  padding: 0;
  background: transparent;
  min-width: 220px;
}

.search-input:focus {
  box-shadow: none;
}

.press-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 18px;
  margin-bottom: 12px;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.btn-filter {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.05);
  color: #0f172a;
}

.btn-resource {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.10);
  color: #0f172a;
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.05);
}

.filter-menu {
  min-width: 240px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  padding: 8px;
}

.filter-menu .dropdown-item {
  border-radius: 12px;
  padding: 0.8rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-menu .dropdown-item:hover {
  background: rgba(134, 188, 66, 0.08);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.empty-state {
  min-height: 280px;
  display: grid;
  place-items: center;
  text-align: center;
  background: #fff;
  border-radius: 28px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.05);
  padding: 42px 20px;
}

.empty-state__icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(134, 188, 66, 0.10);
  color: var(--bsw-primary);
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.news-card {
  height: 100%;
  overflow: hidden;
  background: #fff;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 55px rgba(15, 23, 42, 0.10);
}

.news-card__image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.news-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.news-card:hover .news-card__image img {
  transform: scale(1.03);
}

.news-card__tag {
  position: absolute;
  left: 16px;
  top: 16px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
}

.news-card__body {
  padding: 20px 20px 22px;
}

.news-card__date {
  display: block;
  color: #64748b;
  margin-bottom: 8px;
}

.news-card__title {
  font-size: 1.15rem;
  line-height: 1.35;
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 10px;
  color: #0f172a;
}

.read-more {
  font-weight: 700;
  color: var(--bsw-primary);
}

.brand-resources {
  padding: 28px 0 90px;
}

.resources-header {
  margin-bottom: 28px;
  text-align: center;
}

.resource-feature {
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at top left, rgba(134, 188, 66, 0.10), transparent 30%),
    linear-gradient(180deg, #ffffff, #f9fbf7);
  padding: 30px;
}

.resource-feature__top {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 14px;
  margin-bottom: 18px;
}

.resource-pill {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  color: #33433a;
  background: #fff;
  border: 1px solid rgba(24, 33, 27, 0.08);
  letter-spacing: 0.18em;
}

.resource-feature__icon,
.resource-mini__icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: #0f172a;
  color: #fff;
  font-size: 1.15rem;
  flex: 0 0 auto;
}

.resource-feature h3 {
  font-size: clamp(1.5rem, 2.4vw, 2.2rem);
  margin-bottom: 14px;
}

.resource-feature__footer {
  margin-top: 24px;
}

.resource-mini {
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.resource-mini__head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;
}

.resource-mini h5 {
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 0;
  color: #18211b;
}

.resource-specs {
  list-style: none;
  padding: 0;
  margin: 0;
}

.resource-specs li {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.resource-specs li:last-child {
  border-bottom: none;
}

.resource-specs span {
  color: #334155;
  font-weight: 600;
}

.resource-specs strong {
  color: var(--bsw-primary);
  font-weight: 800;
}

.press-pagination .page-link {
  color: var(--bsw-primary);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 14px;
  margin: 0 4px;
  min-width: 44px;
  text-align: center;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.04);
}

.press-pagination .page-item.active .page-link {
  background: linear-gradient(135deg, #86bc42, #b3d96d);
  border-color: transparent;
  color: #0d1a08;
}

.press-pagination .page-item.disabled .page-link {
  opacity: 0.5;
}

@media (max-width: 991.98px) {
  .press-hero {
    min-height: auto;
    padding: 88px 0 56px;
  }

  .hero-title {
    max-width: 100%;
  }

  .press-toolbar {
    flex-direction: column;
    align-items: start;
  }

  .toolbar-actions {
    width: 100%;
    justify-content: stretch;
  }

  .search-wrap {
    width: 100%;
  }

  .search-input {
    min-width: 0;
    width: 100%;
  }
}

@media (max-width: 575.98px) {
  .press-hero {
    padding-top: 88px;
  }

  .hero-title {
    font-size: 2.35rem;
  }

  .hero-description {
    font-size: 0.98rem;
  }

  .resource-feature,
  .resource-mini {
    padding: 22px;
  }

  .news-card__body {
    padding: 18px;
  }
}

.section-loading {
  min-height: 60vh;
}

.sk {
  position: relative;
  overflow: hidden;
  background: #e2e8f0;
  border-radius: 12px;
}

.sk::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.sk-title {
  height: 28px;
  width: 60%;
}

.sk-text {
  height: 14px;
  width: 100%;
}

.sk-text.sk-sm {
  height: 10px;
  width: 40%;
}

.sk-btn {
  height: 38px;
  width: 140px;
  border-radius: 999px;
}

.sk-btn.sk-outline {
  width: 120px;
}

.sk-input {
  height: 38px;
  width: 200px;
  border-radius: 10px;
}

.sk-card {
  border-radius: 20px;
  padding: 16px;
  background: #f1f5f9;
}

.sk-image {
  height: 180px;
  border-radius: 16px;
  margin-bottom: 12px;
}

.sk-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sk-link {
  height: 12px;
  width: 80px;
}

.w-75 {
  width: 75%;
}

.w-50 {
  width: 50%;
}

.w-25 {
  width: 25%;
}

.w-120 {
  width: 120px;
}
</style>
