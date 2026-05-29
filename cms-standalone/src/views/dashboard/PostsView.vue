<template>
  <div class="posts-view">

    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-header__title">Publicaciones</h1>
        <p class="page-header__desc">Gestiona noticias, comunicados y artículos del blog corporativo.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="refreshAll">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13.5 7.5A6 6 0 1 1 7.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 1.5v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Actualizar
        </button>
        <button v-if="canCreate" class="btn-primary" @click="openPostModal()">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 2v11M2 7.5h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
          Nueva publicación
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip" v-for="stat in statsCards" :key="stat.label">
        <div class="stat-chip__icon" :class="stat.color">
          <svg v-if="stat.label === 'Total'" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
          <svg v-else-if="stat.label === 'Publicadas'" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else-if="stat.label === 'Ocultas'" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.4"/><circle cx="7" cy="7" r="1.75" stroke="currentColor" stroke-width="1.4"/><path d="M2 2l10 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="11" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ stat.value }}</span>
          <span class="stat-chip__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Main layout -->
    <div class="main-grid">

      <div class="main-grid__content">

        <!-- Filters -->
        <div class="filters-bar">
          <div class="filters-bar__search">
            <svg class="filters-bar__search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            <input v-model.trim="searchQuery" type="text" class="filters-bar__input" placeholder="Buscar por título, slug o resumen...">
            <button v-if="searchQuery" class="filters-bar__clear-search" @click="searchQuery = ''" aria-label="Limpiar">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="filters-bar__controls">
            <select v-model="filterCategory" class="filter-select">
              <option value="">Todas las categorías</option>
              <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.name }}</option>
            </select>
            <div class="status-pills">
              <button v-for="opt in statusOptions" :key="opt.value" class="status-pill" :class="{ active: filterStatus === opt.value }" @click="filterStatus = opt.value">{{ opt.label }}</button>
            </div>
            <select v-model="pageSize" class="filter-select filter-select--sm">
              <option :value="6">6 / pág.</option>
              <option :value="12">12 / pág.</option>
              <option :value="24">24 / pág.</option>
            </select>
            <button class="btn-ghost btn-ghost--sm" @click="clearFilters">Limpiar</button>
          </div>
        </div>

        <!-- Results meta -->
        <div class="results-meta">
          <span class="results-meta__count">{{ pagination.total }} publicaciones</span>
          <span class="results-meta__sep">·</span>
          <span class="results-meta__page">Página {{ pagination.page }} de {{ pagination.pages }}</span>
        </div>

        <!-- Posts list -->
        <div class="posts-list">

          <div v-if="loadingPosts" class="posts-list__loading">
            <div v-for="i in 4" :key="i" class="skeleton-row">
              <div class="skeleton skeleton--thumb"></div>
              <div class="skeleton-row__body">
                <div class="skeleton skeleton--line" style="width:60%"></div>
                <div class="skeleton skeleton--line" style="width:40%"></div>
                <div class="skeleton skeleton--line" style="width:25%"></div>
              </div>
            </div>
          </div>

          <div v-else-if="posts.length === 0" class="empty-state">
            <div class="empty-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <p class="empty-title">No hay publicaciones</p>
            <p class="empty-desc">Intenta ajustar los filtros o crea una nueva publicación.</p>
            <button v-if="canCreate" class="btn-primary btn-primary--sm" @click="openPostModal()">Crear publicación</button>
          </div>

          <div v-else>
            <div v-for="post in posts" :key="post._id" class="post-row">
              <div class="post-row__thumb">
                <img :src="post.featuredImage || 'https://via.placeholder.com/72x72/f3f4f6/9ca3af?text=IMG'" :alt="post.title" class="post-row__img">
              </div>
              <div class="post-row__body">
                <div class="post-row__top">
                  <div class="post-row__meta-left">
                    <span class="status-badge" :class="post.visible ? 'status-badge--published' : 'status-badge--hidden'">
                      <span class="status-badge__dot"></span>
                      {{ post.visible ? 'Publicada' : 'Oculta' }}
                    </span>
                    <span v-if="getPrimaryCategory(post)" class="cat-badge" :style="{ '--cat-color': getPrimaryCategory(post)?.color || '#2563eb' }">{{ getPrimaryCategory(post)?.name }}</span>
                    <span v-else class="cat-badge cat-badge--empty">Sin categoría</span>
                  </div>
                  <span class="post-row__date">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                    {{ formatDate(post.publishedAt) }}
                  </span>
                </div>
                <h3 class="post-row__title">{{ post.title }}</h3>
                <p v-if="post.excerpt" class="post-row__excerpt">{{ post.excerpt }}</p>
                <div class="post-row__actions">
                  <button v-if="canEdit" class="action-btn action-btn--edit" @click="openPostModal(post, 'edit')">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9.5 2L11 3.5 4 10.5l-2 .5.5-2 7-7z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Editar
                  </button>
                  <button v-if="canUseBuilder && canEdit" class="action-btn action-btn--builder" @click="openInBuilder(post)">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="7" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.2"/><rect x="1.5" y="7" width="4.5" height="4.5" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M9.25 7v5M7 9.25h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                    Page Builder
                  </button>
                  <button v-if="canEdit || canPublish" class="action-btn action-btn--toggle" @click="toggleVisibility(post)">
                    <svg v-if="post.visible" width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5s2.5-4.5 5.5-4.5S12 6.5 12 6.5s-2.5 4.5-5.5 4.5S1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.3"/><circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" stroke-width="1.3"/><path d="M2 2l9 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <svg v-else width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5s2.5-4.5 5.5-4.5S12 6.5 12 6.5s-2.5 4.5-5.5 4.5S1 6.5 1 6.5z" stroke="currentColor" stroke-width="1.3"/><circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" stroke-width="1.3"/></svg>
                    {{ post.visible ? 'Ocultar' : 'Mostrar' }}
                  </button>
                  <button v-if="canDelete" class="action-btn action-btn--delete" @click="confirmDeleteAction(post)">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M3 3.5l.75 7h5.5L10 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="pagination-bar">
          <span class="pagination-bar__info">Mostrando {{ posts.length }} de {{ pagination.total }}</span>
          <div class="pagination-bar__controls">
            <button class="page-btn" :disabled="pagination.page === 1" @click="goToPage(pagination.page - 1)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.5 3L5 7l3.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button v-for="page in pagesToShow" :key="page" class="page-btn" :class="{ 'page-btn--active': page === pagination.page }" @click="goToPage(page)">{{ page }}</button>
            <button class="page-btn" :disabled="pagination.page === pagination.pages" @click="goToPage(pagination.page + 1)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9 7l-3.5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>

      </div>

      <!-- Sidebar -->
      <div class="main-grid__sidebar">
        <div class="sidebar-card">
          <p class="sidebar-card__title">Visibilidad</p>
          <div ref="overviewChartRef" style="width:100%;height:180px;"></div>
          <div class="chart-legend">
            <div class="chart-legend__item">
              <span class="chart-legend__dot" style="background:#2563eb"></span>
              <span class="chart-legend__label">Publicadas</span>
              <strong class="chart-legend__value">{{ overview.published }}</strong>
            </div>
            <div class="chart-legend__item">
              <span class="chart-legend__dot" style="background:#d1d5db"></span>
              <span class="chart-legend__label">Ocultas</span>
              <strong class="chart-legend__value">{{ overview.hidden }}</strong>
            </div>
          </div>
        </div>
        <div class="sidebar-card">
          <p class="sidebar-card__title">Acceso rápido</p>
          <div class="quick-actions">
            <button class="quick-action" @click="openPostModal()">
              <span class="quick-action__icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>
              <span>Crear publicación</span>
              <svg class="quick-action__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="quick-action" @click="refreshAll">
              <span class="quick-action__icon"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12.5 7A5.5 5.5 0 1 1 7 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M12.5 1.5v5.5H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
              <span>Sincronizar</span>
              <svg class="quick-action__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal crear/editar -->
    <div class="modal fade" id="postModal" tabindex="-1" ref="postModalRef">
      <div class="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
        <div class="modal-content bsw-modal">
          <div class="bsw-modal__header">
            <div class="bsw-modal__header-left">
              <div class="bsw-modal__header-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.5"/><path d="M5 6h6M5 8.5h6M5 11h4" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/></svg>
              </div>
              <div>
                <h2 class="bsw-modal__title">{{ editingPost ? 'Editar publicación' : 'Nueva publicación' }}</h2>
                <p class="bsw-modal__sub">Contenido principal, SEO, categorías e imágenes</p>
              </div>
            </div>
            <button type="button" class="bsw-modal__close" data-bs-dismiss="modal" aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
          </div>

          <div class="modal-body bsw-modal__body">
            <form @submit.prevent="savePost">
              <div class="modal-grid">
                <div class="modal-grid__main">
                  <div class="form-section">
                    <div class="form-section__header"><span class="form-section__label">Contenido</span></div>
                    <div class="form-group">
                      <label class="field-label">Título <span class="field-required">*</span></label>
                      <input v-model.trim="postForm.title" type="text" class="field-input" required placeholder="Título de la publicación">
                    </div>
                    <div class="form-group">
                      <label class="field-label">Resumen / Extracto <span class="field-required">*</span></label>
                      <textarea v-model.trim="postForm.excerpt" class="field-input field-textarea" rows="3" required placeholder="Breve descripción..."></textarea>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Contenido</label>
                      <div class="quill-wrapper">
                        <QuillEditor v-model:content="postForm.content" contentType="html" theme="snow" :options="quillOptions" style="min-height:240px;" />
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group">
                        <label class="field-label">URL de video</label>
                        <input v-model.trim="postForm.videoUrl" type="url" class="field-input" placeholder="https://youtube.com/watch?v=...">
                      </div>
                      <div class="form-group">
                        <label class="field-label">URL canónica</label>
                        <input v-model.trim="postForm.seo.canonicalUrl" type="url" class="field-input" placeholder="https://...">
                      </div>
                    </div>
                  </div>
                  <div class="form-section">
                    <div class="form-section__header"><span class="form-section__label">SEO</span><span class="form-section__badge">Opcional</span></div>
                    <div class="form-group">
                      <label class="field-label">Meta título</label>
                      <input v-model.trim="postForm.seo.metaTitle" type="text" class="field-input" maxlength="60" placeholder="Máximo 60 caracteres">
                      <div class="field-hint"><span :class="{ 'field-hint--warn': postForm.seo.metaTitle.length > 50 }">{{ postForm.seo.metaTitle.length }}/60</span></div>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Meta descripción</label>
                      <textarea v-model.trim="postForm.seo.metaDescription" class="field-input field-textarea" rows="3" maxlength="160" placeholder="Máximo 160 caracteres"></textarea>
                    </div>
                    <div class="form-group">
                      <label class="field-label">Keywords</label>
                      <input v-model.trim="seoKeywordsInput" type="text" class="field-input" placeholder="palabra1, palabra2 (separadas por comas)">
                    </div>
                  </div>
                </div>

                <div class="modal-grid__sidebar">
                  <div class="form-section">
                    <div class="form-section__header"><span class="form-section__label">Imagen destacada</span></div>
                    <div class="img-preview-box" :class="{ 'img-preview-box--filled': postForm.featuredImage }">
                      <img v-if="postForm.featuredImage" :src="postForm.featuredImage" alt="Imagen destacada" class="img-preview-box__img">
                      <div v-else class="img-preview-box__placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.4"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M3 15l5-5 4 4 3-3 6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        <span>Sin imagen</span>
                      </div>
                    </div>
                    <div class="form-group" style="margin-top:10px">
                      <input v-model.trim="postForm.featuredImage" type="url" class="field-input" placeholder="URL de imagen">
                    </div>
                    <label class="file-upload-label">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8M3.5 4L6.5 1l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M1 10.5h11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                      {{ uploadingMedia ? 'Subiendo...' : 'Cargar desde archivo' }}
                      <input type="file" accept="image/*" class="sr-only" @change="handleImageUpload($event, 'featured')" :disabled="uploadingMedia">
                    </label>
                  </div>

                  <div class="form-section">
                    <div class="form-section__header"><span class="form-section__label">Estado</span></div>
                    <div class="toggle-row">
                      <label class="toggle-row__label" for="visible">Visible en el sitio</label>
                      <div class="bsw-toggle">
                        <input id="visible" v-model="postForm.visible" type="checkbox" class="bsw-toggle__input">
                        <span class="bsw-toggle__track"><span class="bsw-toggle__thumb"></span></span>
                      </div>
                    </div>
                    <div class="form-group" style="margin-top:12px">
                      <label class="field-label">Fecha de publicación</label>
                      <input v-model="postForm.publishedAt" type="datetime-local" class="field-input">
                    </div>
                  </div>

                  <div class="form-section">
                    <div class="form-section__header"><span class="form-section__label">Categorías</span></div>
                    <div class="categories-list">
                      <label v-for="cat in categories" :key="cat._id" class="cat-check" :for="`cat-${cat._id}`">
                        <div class="cat-check__left">
                          <span class="cat-check__dot" :style="{ background: cat.color || '#2563eb' }"></span>
                          <span class="cat-check__name">{{ cat.name }}</span>
                        </div>
                        <input class="cat-check__input" type="checkbox" :id="`cat-${cat._id}`" :value="cat._id" v-model="postForm.categories">
                        <span class="cat-check__box"></span>
                      </label>
                    </div>
                  </div>

                  <div class="form-section">
                    <div class="form-section__header"><span class="form-section__label">Etiquetas</span></div>
                    <input v-model.trim="tagsInput" type="text" class="field-input" placeholder="tag1, tag2, tag3 (separadas por comas)">
                    <div class="tags-container" v-if="postForm.tags.length">
                      <span v-for="tag in postForm.tags" :key="tag" class="tag-pill">
                        {{ tag }}
                        <button type="button" class="tag-pill__remove" @click="removeTag(tag)">
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 1l7 7M8 1L1 8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div class="bsw-modal__footer">
            <button type="button" class="btn-ghost" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn-primary" @click="savePost" :disabled="savingPost || uploadingMedia">
              <span v-if="savingPost" class="btn-loading">
                <svg class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="20 12"/></svg>
                Guardando…
              </span>
              <span v-else>{{ editingPost ? 'Actualizar' : 'Publicar' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import { useCmsStore } from '@/stores/cms.js'
import { useAuthStore } from '@/stores/auth.js'
import { notify, confirmDelete, alertPermissionDenied } from '@/services/notifications.js'
import { postsService } from '@/services/api.js'

const cmsStore  = useCmsStore()
const authStore = useAuthStore()
const router    = useRouter()

const canCreate  = computed(() => authStore.hasPermission('posts.create'))
const canEdit    = computed(() => authStore.hasPermission('posts.edit'))
const canDelete  = computed(() => authStore.hasPermission('posts.delete'))
const canPublish = computed(() => authStore.hasPermission('posts.publish'))
const canUseBuilder = computed(() => authStore.hasPermission('pagebuilder.edit'))

const { posts, categories, pagination, overview, loadingPosts, savingPost, uploadingMedia } = storeToRefs(cmsStore)

const searchQuery   = ref('')
const filterCategory = ref('')
const filterStatus  = ref('all')
const pageSize      = ref(12)
const editingPost   = ref(null)
const deletingPostItem = ref(null)
const tagsInput     = ref('')
const seoKeywordsInput = ref('')

const postModalRef = ref(null)
let postModal = null
const overviewChartRef = ref(null)
let overviewChart = null
let filterTimer = null

const statusOptions = [
  { value: 'all', label: 'Todas' },
  { value: 'visible', label: 'Publicadas' },
  { value: 'hidden', label: 'Ocultas' }
]

const quillOptions = {
  modules: {
    toolbar: [
      [{ header: [1,2,3,false] }],
      ['bold','italic','underline','strike'],
      [{ list:'ordered' }, { list:'bullet' }],
      ['blockquote','link','image'],
      ['clean']
    ]
  }
}

const createDefaultSeo = () => ({ metaTitle:'', metaDescription:'', metaKeywords:[], canonicalUrl:'', ogImage:'' })
const defaultPostForm = () => ({
  title:'', excerpt:'', content:'', featuredImage:'', images:[], videoUrl:'',
  categories:[], tags:[], visible:true, author:'',
  publishedAt: new Date().toISOString().slice(0,16), seo: createDefaultSeo()
})
const postForm = ref(defaultPostForm())

const parseCommaList = (v) => v ? v.split(',').map(s => s.trim()).filter(Boolean) : []

const clearFilters = () => {
  searchQuery.value = ''; filterCategory.value = ''; filterStatus.value = 'all'; pageSize.value = 12
}

const getPrimaryCategory = (post) => {
  const first = post?.categories?.[0]
  if (!first) return null
  if (typeof first === 'object') return first
  return categories.value.find(c => c._id === first) || null
}

const createFormFromPost = (post = {}) => ({
  ...defaultPostForm(), ...post,
  images: Array.isArray(post.images) ? [...post.images] : [],
  tags: Array.isArray(post.tags) ? [...post.tags] : [],
  categories: post.categories?.map(c => typeof c === 'object' ? c._id : c) || [],
  publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString().slice(0,16) : new Date().toISOString().slice(0,16),
  seo: { ...createDefaultSeo(), ...(post.seo || {}) }
})

const openPostModal = async (post = null, action = '') => {
  if (post && !canEdit.value) { alertPermissionDenied('posts.edit'); return }
  if (!post && !canCreate.value) { alertPermissionDenied('posts.create'); return }
  editingPost.value = post
  postForm.value = post ? createFormFromPost(post) : defaultPostForm()
  tagsInput.value = postForm.value.tags.join(', ')
  seoKeywordsInput.value = (postForm.value.seo.metaKeywords || []).join(', ')
  postModal?.show()
}

const confirmDeleteAction = async (post) => {
  if (!canDelete.value) { alertPermissionDenied('posts.delete'); return }
  const ok = await confirmDelete({ title: '¿Eliminar publicación?', text: `Se eliminará "${post.title}".` })
  if (!ok) return
  deletingPostItem.value = post
  await deletePost()
}

const openInBuilder = (post) => {
  if (!canUseBuilder.value) { alertPermissionDenied('pagebuilder.edit'); return }
  router.push({ path: '/dashboard/page-builder', query: { postId: post._id || post.id } })
}

const buildPayload = () => {
  const tags = parseCommaList(tagsInput.value)
  const metaKeywords = parseCommaList(seoKeywordsInput.value)
  return {
    ...postForm.value, tags,
    seo: { ...postForm.value.seo, metaKeywords, ogImage: postForm.value.seo.ogImage || postForm.value.featuredImage || '' }
  }
}

const loadPosts = async (page = 1) => {
  try {
    await cmsStore.fetchPosts({
      search: searchQuery.value || undefined,
      category: filterCategory.value || undefined,
      visible: filterStatus.value === 'all' ? undefined : filterStatus.value === 'visible',
      page, limit: pageSize.value
    })
  } catch (error) { notify.error(error) }
}

const savePost = async () => {
  try {
    if (editingPost.value && !canEdit.value) { alertPermissionDenied('posts.edit'); return }
    if (!editingPost.value && !canCreate.value) { alertPermissionDenied('posts.create'); return }
    const payload = buildPayload()
    if (editingPost.value) {
      await cmsStore.updatePost(editingPost.value._id || editingPost.value.id, payload)
      notify.success('La publicación fue actualizada correctamente.')
    } else {
      await cmsStore.createPost(payload)
      notify.success('La publicación fue creada correctamente.')
    }
    postModal?.hide()
    await cmsStore.fetchOverview()
    await loadPosts(pagination.value.page || 1)
  } catch (error) { notify.error(error) }
}

const deletePost = async () => {
  try {
    await cmsStore.deletePost(deletingPostItem.value._id || deletingPostItem.value.id)
    notify.success('La publicación fue eliminada correctamente.')
    await cmsStore.fetchOverview()
    await loadPosts(pagination.value.page || 1)
  } catch (error) { notify.error(error) }
}

const toggleVisibility = async (post) => {
  if (!canPublish.value && !canEdit.value) { alertPermissionDenied('posts.publish'); return }
  try {
    await cmsStore.togglePostVisibility(post._id || post.id, !post.visible)
    notify.success(post.visible ? 'Publicación ocultada.' : 'Publicación publicada.')
    await cmsStore.fetchOverview()
    await loadPosts(pagination.value.page || 1)
  } catch (error) { notify.error(error) }
}

const handleImageUpload = async (event, type) => {
  const files = Array.from(event.target.files || [])
  if (!files.length) return
  try {
    const uploaded = await Promise.all(files.map(f => cmsStore.uploadMedia(f, { category: 'general', alt: postForm.value.title || f.name })))
    const urls = uploaded.map(item => item?.url || item?.data?.url).filter(Boolean)
    if (type === 'featured' && urls[0]) { postForm.value.featuredImage = urls[0] }
    else { postForm.value.images.push(...urls) }
    notify.success(`${urls.length} imagen(es) cargada(s).`)
  } catch (error) { notify.error(error) }
  finally { event.target.value = '' }
}

const removeTag = (tag) => {
  postForm.value.tags = postForm.value.tags.filter(t => t !== tag)
  tagsInput.value = postForm.value.tags.join(', ')
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('es-PA', { year:'numeric', month:'short', day:'numeric' })
}

const refreshAll = async () => {
  try {
    await Promise.all([cmsStore.fetchCategories(), cmsStore.fetchOverview()])
    await loadPosts(pagination.value.page || 1)
    notify.success('Datos actualizados.')
  } catch (error) { notify.error(error) }
}

const goToPage = async (page) => {
  if (page < 1 || page > pagination.value.pages || page === pagination.value.page) return
  await loadPosts(page)
}

const pagesToShow = computed(() => {
  const totalPages = pagination.value.pages || 1
  const current = pagination.value.page || 1
  const start = Math.max(1, current - 2)
  const end = Math.min(totalPages, start + 4)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

const statsCards = computed(() => [
  { label: 'Total',       value: overview.value.total,      color: 'blue' },
  { label: 'Publicadas',  value: overview.value.published,  color: 'green' },
  { label: 'Ocultas',     value: overview.value.hidden,     color: 'gray' },
  { label: 'Categorías',  value: overview.value.categories, color: 'dark' }
])

const initOverviewChart = () => {
  if (!overviewChartRef.value) return
  overviewChart = echarts.init(overviewChartRef.value)
  overviewChart.setOption({
    tooltip: { trigger:'item', borderWidth:0, backgroundColor:'#fff', textStyle:{ color:'#1a1a1a', fontSize:12 } },
    series: [{ name:'Publicaciones', type:'pie', radius:['55%','78%'], center:['50%','48%'],
      avoidLabelOverlap:false, label:{ show:false },
      data: [
        { value: overview.value.published, name:'Publicadas', itemStyle:{ color:'#2563eb' } },
        { value: overview.value.hidden,    name:'Ocultas',    itemStyle:{ color:'#d1d5db' } }
      ]
    }]
  })
}

const updateOverviewChart = () => {
  if (!overviewChart) return
  overviewChart.setOption({ series: [{ data: [
    { value: overview.value.published, name:'Publicadas', itemStyle:{ color:'#2563eb' } },
    { value: overview.value.hidden,    name:'Ocultas',    itemStyle:{ color:'#d1d5db' } }
  ]}]})
}

watch([searchQuery, filterCategory, filterStatus, pageSize], () => {
  clearTimeout(filterTimer)
  filterTimer = setTimeout(() => loadPosts(1), 300)
})
watch(() => [overview.value.published, overview.value.hidden], () => { nextTick(updateOverviewChart) })
watch(tagsInput, (val) => { postForm.value.tags = parseCommaList(val) })
watch(seoKeywordsInput, (val) => { postForm.value.seo.metaKeywords = parseCommaList(val) })

onMounted(async () => {
  const { Modal } = await import('bootstrap')
  postModal = new Modal(postModalRef.value)
  window.addEventListener('resize', () => overviewChart?.resize())
  await Promise.all([cmsStore.fetchCategories(), cmsStore.fetchOverview()])
  await loadPosts(1)
  initOverviewChart()
})
onBeforeUnmount(() => {
  clearTimeout(filterTimer)
  if (overviewChart) { overviewChart.dispose(); overviewChart = null }
})
</script>

<style scoped>
.posts-view {
  padding: 32px 28px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

.main-grid { display: grid; grid-template-columns: 1fr 280px; gap: 20px; align-items: start; }
@media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }
.main-grid__content { display: flex; flex-direction: column; gap: 12px; }

.filters-bar { background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 14px 16px; display: flex; flex-direction: column; gap: 12px; }
.filters-bar__search { display: flex; align-items: center; gap: 8px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: var(--radius-sm); padding: 0 12px; transition: border-color .15s; }
.filters-bar__search:focus-within { border-color: var(--primary-700); }
.filters-bar__search-icon { color: var(--gray-400); flex-shrink: 0; }
.filters-bar__input { flex: 1; border: none; background: transparent; padding: 9px 0; font-size: 13.5px; color: var(--gray-900); font-family: var(--font-sans); outline: none; }
.filters-bar__input::placeholder { color: var(--gray-400); }
.filters-bar__clear-search { background: none; border: none; cursor: pointer; color: var(--gray-400); display: flex; align-items: center; padding: 2px; border-radius: 4px; }
.filters-bar__controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.filter-select { padding: 7px 10px; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); font-size: 12.5px; color: var(--gray-700); background: var(--gray-50); font-family: var(--font-sans); cursor: pointer; outline: none; }
.filter-select:focus { border-color: var(--primary-700); }
.filter-select--sm { width: auto; }
.status-pills { display: flex; gap: 4px; }
.status-pill { padding: 6px 12px; border-radius: 99px; border: 1px solid var(--gray-200); background: transparent; font-size: 12px; font-weight: 500; color: var(--gray-500); cursor: pointer; transition: all .15s; font-family: var(--font-sans); }
.status-pill:hover { background: var(--gray-50); color: var(--gray-800); }
.status-pill.active { background: var(--primary-700); border-color: var(--primary-700); color: #fff; }

.results-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--gray-400); padding: 0 2px; }
.results-meta__count { font-weight: 600; color: var(--gray-600); }
.results-meta__sep { color: var(--gray-300); }

.posts-list { background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); overflow: hidden; }
.posts-list__loading { padding: 8px; display: flex; flex-direction: column; gap: 1px; }
.skeleton-row { display: flex; align-items: center; gap: 14px; padding: 14px; }
.skeleton-row__body { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.skeleton--thumb { width: 72px; height: 72px; border-radius: var(--radius-sm); flex-shrink: 0; }
.skeleton--line { height: 10px; border-radius: 5px; }

.post-row { display: flex; gap: 14px; padding: 16px; border-bottom: 1px solid var(--gray-100); transition: background .12s; }
.post-row:last-child { border-bottom: none; }
.post-row:hover { background: var(--gray-50); }
.post-row__thumb { width: 72px; height: 72px; border-radius: var(--radius-sm); overflow: hidden; flex-shrink: 0; background: var(--gray-100); }
.post-row__img { width: 100%; height: 100%; object-fit: cover; }
.post-row__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.post-row__top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
.post-row__meta-left { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.post-row__date { display: flex; align-items: center; gap: 4px; font-size: 11.5px; color: var(--gray-400); white-space: nowrap; }
.post-row__title { font-size: 14px; font-weight: 620; color: var(--gray-900); margin: 0; line-height: 1.35; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.post-row__excerpt { font-size: 12.5px; color: var(--gray-500); margin: 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.post-row__actions { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }

.cat-badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 600; background: color-mix(in srgb, var(--cat-color, #2563eb) 12%, transparent); color: var(--cat-color, #2563eb); }
.cat-badge--empty { background: var(--gray-100); color: var(--gray-400); }

.chart-legend { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.chart-legend__item { display: flex; align-items: center; gap: 8px; }
.chart-legend__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.chart-legend__label { font-size: 12.5px; color: var(--gray-500); flex: 1; }
.chart-legend__value { font-size: 13px; font-weight: 650; color: var(--gray-900); }

.modal-grid { display: grid; grid-template-columns: 1fr 300px; gap: 16px; align-items: start; }
@media (max-width: 900px) { .modal-grid { grid-template-columns: 1fr; } }

.toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.toggle-row__label { font-size: 13px; font-weight: 500; color: var(--gray-700); }

.img-preview-box { width: 100%; aspect-ratio: 16/9; border-radius: var(--radius-sm); overflow: hidden; background: var(--gray-50); border: 1px solid var(--gray-200); display: flex; align-items: center; justify-content: center; }
.img-preview-box__img { width: 100%; height: 100%; object-fit: cover; display: block; }
.img-preview-box__placeholder { display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--gray-300); font-size: 12px; }

.file-upload-label { display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: var(--radius-xs); border: 1px dashed var(--gray-300); background: var(--gray-50); font-size: 12.5px; font-weight: 500; color: var(--gray-600); cursor: pointer; transition: all .13s; width: 100%; justify-content: center; box-sizing: border-box; }
.file-upload-label:hover { border-color: var(--primary-700); color: var(--primary-700); background: var(--primary-50); }

.categories-list { display: flex; flex-direction: column; gap: 6px; }
.cat-check { display: flex; align-items: center; gap: 10px; padding: 9px 11px; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); cursor: pointer; transition: all .13s; }
.cat-check:hover { background: var(--gray-50); border-color: var(--gray-300); }
.cat-check__left { display: flex; align-items: center; gap: 8px; flex: 1; }
.cat-check__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.cat-check__name { font-size: 13px; font-weight: 500; color: var(--gray-700); }
.cat-check__input { display: none; }
.cat-check__box { width: 16px; height: 16px; border: 1.5px solid var(--gray-300); border-radius: 4px; flex-shrink: 0; transition: all .13s; position: relative; }
.cat-check__input:checked ~ .cat-check__box { background: var(--primary-700); border-color: var(--primary-700); }
.cat-check__input:checked ~ .cat-check__box::after { content: ''; position: absolute; top: 2px; left: 4.5px; width: 4px; height: 7px; border: 1.5px solid #fff; border-top: none; border-left: none; transform: rotate(45deg); }

.tags-container { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.tag-pill { display: inline-flex; align-items: center; gap: 5px; padding: 4px 10px; border-radius: 99px; background: var(--primary-50); border: 1px solid rgba(37,99,235,.15); font-size: 12px; font-weight: 500; color: var(--primary-700); }
.tag-pill__remove { display: flex; align-items: center; background: none; border: none; cursor: pointer; color: var(--primary-600); padding: 0; opacity: .6; transition: opacity .13s; }
.tag-pill__remove:hover { opacity: 1; }

.field-hint { display: flex; align-items: center; gap: 4px; margin-top: 5px; font-size: 11.5px; color: var(--gray-400); }
.field-hint--warn { color: #e67e22; font-weight: 600; }

.quill-wrapper { border: 1px solid var(--gray-200); border-radius: var(--radius-sm); overflow: hidden; }
.quill-wrapper :deep(.ql-toolbar) { border: none; border-bottom: 1px solid var(--gray-200); padding: 8px 10px; background: var(--gray-50); }
.quill-wrapper :deep(.ql-container) { border: none; font-family: var(--font-sans); font-size: 13.5px; }
</style>
