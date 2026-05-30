<template>
  <div class="page-builder-view" data-testid="page-builder-view">
    <!-- Loading -->
    <div v-if="loadingPost" class="min-vh-100 d-flex align-items-center justify-content-center">
      <div class="loading-card text-center">
        <div class="spinner-border spinner-border-sm text-success" role="status"></div>

        <p class="text-secondary small mb-0 mt-3">
          Cargando publicación...
        </p>
      </div>
    </div>

    <!-- Route Selector -->
    <div
      v-else-if="!activeRoute && !postLoaded"
      class="container-fluid py-5"
    >
      <div class="mx-auto builder-wrapper">
        <!-- Header -->
        <div class="d-flex align-items-start gap-3 mb-4">
          <button
            class="btn btn-light border back-btn"
            @click="$router.push('/dashboard')"
            data-testid="builder-back"
          >
            <i class="fas fa-arrow-left small"></i>
          </button>

          <div>
            <span class="text-uppercase small fw-semibold text-success letter-spacing">
              Content Builder
            </span>

            <h1 class="builder-title mb-2">
              Page Builder
            </h1>

            <p class="text-secondary small mb-0 builder-description">
              Administra la experiencia editorial y visual de las páginas.
            </p>
          </div>
        </div>

        <!-- Section -->
        <div>
          <div class="text-uppercase text-secondary fw-semibold section-label mb-3">
            Páginas disponibles
          </div>

          <div class="route-cards-grid">
            <!-- Home -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/'"
              data-testid="select-home-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-home"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Inicio</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Página principal del sitio web.</p>
              </div>
            </div>

            <!-- About -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/nosotros'"
              data-testid="select-about-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Nosotros</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/nosotros</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Página sobre la empresa y su historia.</p>
              </div>
            </div>

            <!-- Contact -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/contacto'"
              data-testid="select-contact-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Contacto</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/contacto</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Página de contacto y formularios.</p>
              </div>
            </div>

            <!-- Products -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/productos'"
              data-testid="select-products-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-box"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Productos</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/productos</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Catálogo de productos y servicios.</p>
              </div>
            </div>

            <!-- FAQ -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/faq'"
              data-testid="select-faq-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-question-circle"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">FAQ</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/faq</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Preguntas frecuentes.</p>
              </div>
            </div>

            <!-- Landing -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/landing'"
              data-testid="select-landing-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-rocket"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Landing</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/landing</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Página de aterrizaje para campañas.</p>
              </div>
            </div>

            <!-- Origen -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/origen'"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-mountain"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Origen</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/origen</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Historia y origen del producto.</p>
              </div>
            </div>

            <!-- Catalogo -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/catalogo'"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-th-large"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Catálogo</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/catalogo</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Catálogo completo de productos.</p>
              </div>
            </div>

            <!-- Sostenibilidad -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/sostenibilidad'"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-leaf"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Sostenibilidad</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Page</span>
                </div>
                <code class="route-code">/sostenibilidad</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Compromiso ambiental y sostenibilidad.</p>
              </div>
            </div>

            <!-- Blog -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/blog'"
              data-testid="select-prensa-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-newspaper"></i>
                  </div>

                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>

                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">
                    Sala de Blog
                  </h5>

                  <span class="badge rounded-pill text-bg-light border fw-medium">
                    Collection
                  </span>
                </div>

                <code class="route-code">
                  /blog
                </code>

                <p class="text-secondary small mb-0 mt-3 route-text">
                  Gestiona el hero, filtros, categorías y publicaciones
                  principales del blog.
                </p>
              </div>
            </div>

            <!-- Blog Post -->
            <div
              class="card border-0 route-card"
              @click="activeRoute = '/blog/:slug'"
              data-testid="select-post-route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon">
                    <i class="fas fa-file-alt"></i>
                  </div>
                  <div class="route-arrow">
                    <i class="fas fa-arrow-up-right-from-square"></i>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">Post de Blog</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Post</span>
                </div>
                <code class="route-code">/blog/:slug</code>
                <p class="text-secondary small mb-0 mt-3 route-text">
                  Layout de publicación individual del blog.
                </p>
              </div>
            </div>

            <!-- Custom pages -->
            <div
              v-for="page in customPages"
              :key="page.route"
              class="card border-0 route-card route-card--custom"
              @click="activeRoute = page.route"
            >
              <div class="card-body p-4">
                <div class="d-flex align-items-start justify-content-between mb-4">
                  <div class="route-icon route-icon--custom">
                    <i class="fas fa-file-code"></i>
                  </div>
                  <div class="d-flex align-items-center gap-2">
                    <button
                      class="route-delete-btn"
                      @click.stop="removeCustomPage(page.route)"
                      title="Eliminar página"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    <div class="route-arrow">
                      <i class="fas fa-arrow-up-right-from-square"></i>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <h5 class="mb-0 fw-semibold text-dark route-title">{{ page.name }}</h5>
                  <span class="badge rounded-pill text-bg-light border fw-medium">Custom</span>
                </div>
                <code class="route-code">{{ page.route }}</code>
                <p class="text-secondary small mb-0 mt-3 route-text">Página personalizada.</p>
              </div>
            </div>

            <!-- Add new page card -->
            <div
              class="card border-0 route-card route-card--add"
              @click="openNewPageModal"
            >
              <div class="card-body p-4 d-flex flex-column align-items-center justify-content-center text-center gap-3">
                <div class="add-page-icon">
                  <i class="fas fa-plus"></i>
                </div>
                <div>
                  <h5 class="mb-1 fw-semibold route-title" style="color:var(--primary-700)">Nueva página</h5>
                  <p class="text-secondary small mb-0">Define nombre y ruta personalizada</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Builder -->
    <PageBuilder
      v-else-if="activeRoute"
      :route="activeRoute"
      :post-id="activePostId"
      @close="handleClose"
    />

    <!-- New Page Modal (outside v-if chain) -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showNewPageModal" class="npb-overlay" @click.self="closeNewPageModal">
          <div class="npb-modal">
            <div class="npb-modal__header">
              <h3 class="npb-modal__title">Nueva página</h3>
              <button class="npb-modal__close" @click="closeNewPageModal">
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="npb-modal__body">
              <div class="npb-field">
                <label class="npb-label">Nombre de la página</label>
                <input
                  v-model.trim="newPage.name"
                  type="text"
                  class="npb-input"
                  placeholder="Ej. Distribuidores"
                  @keydown.enter="newPage.name && newPage.route && saveNewPage()"
                  ref="nameInputRef"
                />
                <p class="npb-hint">Nombre visible en el listado del Page Builder.</p>
              </div>

              <div class="npb-field">
                <label class="npb-label">Ruta de la página</label>
                <div class="npb-input-prefix">
                  <span class="npb-prefix">/</span>
                  <input
                    v-model="newPageSlug"
                    type="text"
                    class="npb-input npb-input--prefixed"
                    placeholder="distribuidores"
                    @keydown.enter="newPage.name && newPage.route && saveNewPage()"
                  />
                </div>
                <p class="npb-hint">
                  Ruta pública del sitio. Solo letras, números y guiones.
                  Vista previa: <code class="npb-code">{{ newPage.route || '/' }}</code>
                </p>
              </div>

              <div v-if="newPageError" class="npb-error">
                <i class="fas fa-exclamation-circle"></i> {{ newPageError }}
              </div>
            </div>

            <div class="npb-modal__footer">
              <button class="npb-btn npb-btn--ghost" @click="closeNewPageModal">Cancelar</button>
              <button
                class="npb-btn npb-btn--primary"
                @click="saveNewPage"
                :disabled="!newPage.name || !newPage.route"
              >
                <i class="fas fa-arrow-right"></i>
                Crear y diseñar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { usePageBuilderStore } from '@/stores/pageBuilder.js'
import { useCmsStore } from '@/stores/cms.js'

import { notify } from '@/services/notifications.js'

import PageBuilder from '@/components/builder/PageBuilder.vue'

const route = useRoute()
const router = useRouter()

const pageBuilderStore = usePageBuilderStore()
const cmsStore = useCmsStore()

const activeRoute = ref(null)
const activePostId = ref(null)

const loadingPost = ref(false)
const postLoaded = ref(false)

// ── Custom pages ──────────────────────────────────────────────
const STORAGE_KEY = 'cms_custom_pages'
const customPages = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

const saveCustomPages = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customPages.value))
}

const removeCustomPage = (pageRoute) => {
  customPages.value = customPages.value.filter(p => p.route !== pageRoute)
  saveCustomPages()
}

// ── New page modal ────────────────────────────────────────────
const showNewPageModal = ref(false)
const nameInputRef = ref(null)
const newPage = ref({ name: '', route: '' })
const newPageError = ref('')

const newPageSlug = computed({
  get: () => newPage.value.route.replace(/^\//, ''),
  set: (val) => {
    // Strip leading slash if user types it, sanitize
    const sanitized = val.replace(/^\/+/, '').replace(/[^a-zA-Z0-9\-_/]/g, '')
    newPage.value.route = sanitized ? `/${sanitized}` : ''
  }
})

const openNewPageModal = () => {
  newPage.value = { name: '', route: '' }
  newPageError.value = ''
  showNewPageModal.value = true
  nextTick(() => nameInputRef.value?.focus())
}

const closeNewPageModal = () => {
  showNewPageModal.value = false
}

const BUILTIN_ROUTES = ['/', '/nosotros', '/contacto', '/productos', '/faq', '/landing',
  '/origen', '/catalogo', '/sostenibilidad', '/blog', '/blog/:slug']

const saveNewPage = () => {
  newPageError.value = ''
  const name = newPage.value.name.trim()
  const pageRoute = newPage.value.route.trim()

  if (!name) { newPageError.value = 'El nombre es obligatorio.'; return }
  if (!pageRoute || pageRoute === '/') { newPageError.value = 'Ingresa una ruta válida.'; return }
  if (BUILTIN_ROUTES.includes(pageRoute)) {
    newPageError.value = 'Esa ruta ya existe en las páginas predefinidas.'; return
  }
  if (customPages.value.some(p => p.route === pageRoute)) {
    newPageError.value = 'Ya existe una página personalizada con esa ruta.'; return
  }

  customPages.value.push({ name, route: pageRoute })
  saveCustomPages()
  closeNewPageModal()
  // Open builder immediately
  activeRoute.value = pageRoute
}

const handleClose = () => {
  activeRoute.value = null
  activePostId.value = null
  postLoaded.value = false

  if (route.query.postId) {
    router.replace({
      path: '/dashboard/page-builder'
    })
  }
}

const loadPostIntoBuilder = async (postId) => {
  if (!postId) return

  loadingPost.value = true

  try {
    const post = await cmsStore.fetchPostById(postId)

    if (!post) {
      notify.error('No se encontró la publicación.')
      return
    }

    const layout = pageBuilderStore.initPostLayout(post)

    activeRoute.value = layout.route
    activePostId.value = post.id || post._id
    postLoaded.value = true
  } catch (error) {
    notify.error(error?.message || 'Ocurrió un error.')
  } finally {
    loadingPost.value = false
  }
}

onMounted(() => {
  const postId = route.query.postId

  if (postId) {
    loadPostIntoBuilder(postId)
  }
})

watch(
  () => route.query.postId,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      loadPostIntoBuilder(newId)
    }
  }
)
</script>

<style scoped>
.page-builder-view {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.05), transparent 20%),
    #f6f8f7;
}

/* Wrapper */

.builder-wrapper {
  max-width: 1600px;
}

/* Loading */

.loading-card {
  width: 220px;
  padding: 24px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(15, 23, 42, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
}

/* Header */

.letter-spacing {
  letter-spacing: 0.12em;
}

.builder-title {
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: #172033;
}

.builder-description {
  max-width: 520px;
  line-height: 1.6;
}

.section-label {
  font-size: 0.72rem;
  letter-spacing: 0.1em;
}

/* Back button */

.back-btn {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

/* Cards grid */

.route-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

/* Card */

.route-card {
  cursor: pointer;
  overflow: hidden;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  border: 1px solid rgba(15, 23, 42, 0.05) !important;
}

.route-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  border-color: rgba(37, 99, 235, 0.18) !important;
}

.route-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.route-arrow {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.04);
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.route-card:hover .route-arrow {
  transform: translate(2px, -2px);
  color: #2563eb;
}

.route-title {
  font-size: 1rem;
}

.route-code {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}

.route-text {
  line-height: 1.7;
}

/* Responsive */

@media (max-width: 768px) {
  .container {
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }

  .builder-title {
    font-size: 1.45rem;
  }

  .route-card .card-body {
    padding: 1.2rem !important;
  }

  .route-cards-grid {
    grid-template-columns: 1fr;
  }
}
/* Custom page card */
.route-card--custom .route-icon--custom {
  background: #f0f9ff;
  color: #0284c7;
}
.route-delete-btn {
  width: 24px; height: 24px; border-radius: 6px;
  border: 1px solid var(--bs-border-color, #dee2e6);
  background: #fff; cursor: pointer; display: flex; align-items: center;
  justify-content: center; font-size: 10px; color: #dc2626;
  transition: all 0.13s; opacity: 0;
}
.route-card--custom:hover .route-delete-btn { opacity: 1; }
.route-delete-btn:hover { background: #fef2f2; border-color: #fecaca; }

/* Add new page card */
.route-card--add {
  border: 2px dashed #cbd5e1 !important;
  background: #f8fafc !important;
  cursor: pointer;
  min-height: 160px;
  transition: all 0.15s;
}
.route-card--add:hover {
  border-color: #2563eb !important;
  background: #eff6ff !important;
}
.add-page-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: #eff6ff; color: #2563eb;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; transition: all 0.15s;
}
.route-card--add:hover .add-page-icon {
  background: #2563eb; color: #fff;
}

/* Modal overlay */
.npb-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(15,23,42,0.45);
  display: flex; align-items: center; justify-content: center;
  padding: 24px;
}
.npb-modal {
  background: #fff; border-radius: 16px; width: 100%; max-width: 460px;
  box-shadow: 0 20px 60px rgba(0,0,0,.18);
  overflow: hidden;
}
.npb-modal__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 24px 0;
}
.npb-modal__title { font-size: 16px; font-weight: 700; color: #0f172a; margin: 0; }
.npb-modal__close {
  width: 30px; height: 30px; border-radius: 8px; border: 1px solid #e2e8f0;
  background: none; cursor: pointer; display: flex; align-items: center;
  justify-content: center; font-size: 12px; color: #64748b; transition: all 0.13s;
}
.npb-modal__close:hover { background: #f1f5f9; }
.npb-modal__body { padding: 20px 24px; display: flex; flex-direction: column; gap: 16px; }
.npb-modal__footer {
  padding: 16px 24px; border-top: 1px solid #f1f5f9;
  display: flex; justify-content: flex-end; gap: 8px;
}

.npb-field { display: flex; flex-direction: column; gap: 5px; }
.npb-label { font-size: 13px; font-weight: 600; color: #374151; }
.npb-input {
  width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13.5px; color: #0f172a; outline: none; transition: border-color 0.15s;
  font-family: inherit;
}
.npb-input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.npb-input-prefix {
  display: flex; align-items: center;
  border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden;
  transition: border-color 0.15s;
}
.npb-input-prefix:focus-within { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,.1); }
.npb-prefix {
  padding: 9px 10px 9px 12px; background: #f8fafc;
  font-size: 14px; font-weight: 600; color: #64748b;
  border-right: 1.5px solid #e2e8f0; user-select: none;
}
.npb-input--prefixed { border: none; border-radius: 0; flex: 1; }
.npb-input--prefixed:focus { box-shadow: none; }
.npb-hint { font-size: 12px; color: #94a3b8; margin: 3px 0 0; }
.npb-code { font-size: 11.5px; background: #f1f5f9; padding: 1px 6px; border-radius: 4px; color: #2563eb; }
.npb-error {
  display: flex; align-items: center; gap: 7px;
  background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px;
  color: #dc2626; font-size: 13px; padding: 9px 12px;
}

.npb-btn {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 8px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
  cursor: pointer; border: none; transition: all 0.13s; font-family: inherit;
}
.npb-btn--ghost { background: #f1f5f9; color: #475569; }
.npb-btn--ghost:hover { background: #e2e8f0; }
.npb-btn--primary { background: #2563eb; color: #fff; }
.npb-btn--primary:hover { background: #1d4ed8; }
.npb-btn--primary:disabled { opacity: 0.5; cursor: not-allowed; }

/* Modal animation */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.2s; }
.modal-fade-enter-active .npb-modal, .modal-fade-leave-active .npb-modal { transition: transform 0.2s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-from .npb-modal, .modal-fade-leave-to .npb-modal { transform: scale(0.96) translateY(8px); }
</style>
