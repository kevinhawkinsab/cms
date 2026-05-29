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
      class="container py-5"
    >
      <div class="mx-auto builder-wrapper">
        <!-- Header -->
        <div class="d-flex align-items-start gap-3 mb-4">
          <button
            class="btn btn-light border back-btn"
            @click="$router.push('/bambito-cms/dashboard')"
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

          <!-- Card -->
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
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'cms',
  middleware: 'auth',
  permission: 'pagebuilder.edit'
})

import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { usePageBuilderStore } from '~/stores/pageBuilder'
import { useCmsStore } from '~/stores/cms'

import { notify } from '~/services/notifications'

import PageBuilder from '~/components/builder/PageBuilder.vue'

const route = useRoute()
const router = useRouter()

const pageBuilderStore = usePageBuilderStore()
const cmsStore = useCmsStore()

const activeRoute = ref(null)
const activePostId = ref(null)

const loadingPost = ref(false)
const postLoaded = ref(false)

const handleClose = () => {
  activeRoute.value = null
  activePostId.value = null
  postLoaded.value = false

  if (route.query.postId) {
    router.replace({
      path: '/bambito-cms/page-builder'
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
    radial-gradient(circle at top left, rgba(128, 186, 73, 0.05), transparent 20%),
    #f6f8f7;
}

/* Wrapper */

.builder-wrapper {
  max-width: 680px;
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
  border-color: rgba(128, 186, 73, 0.18) !important;
}

.route-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(128, 186, 73, 0.1);
  color: #3f6458;
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
  color: #80ba49;
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
  background: rgba(128, 186, 73, 0.08);
  color: #3f6458;
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
}
</style>