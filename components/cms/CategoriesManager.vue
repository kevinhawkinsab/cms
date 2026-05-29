<template>
  <div class="categories-manager">

    <!-- Toast -->
    <Transition name="toast-slide">
      <div v-if="notice.text" class="bsw-toast" :class="notice.type" role="alert" aria-live="polite">
        <div class="bsw-toast__icon">
          <svg v-if="notice.type === 'success'" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 4.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 5v4M8 11h.01" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
            <circle cx="8" cy="8" r="6.25" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <span class="bsw-toast__text">{{ notice.text }}</span>
        <button class="bsw-toast__close" @click="notice = { type: '', text: '' }" aria-label="Cerrar">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </div>
    </Transition>

    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <div class="page-header__breadcrumb">
          <span>CMS</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="active">Categorías</span>
        </div>
        <h1 class="page-header__title">Categorías</h1>
        <p class="page-header__desc">Organiza las publicaciones del blog con una estructura visual clara y fácil de administrar.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="clearFilters">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M4 7h6M6 10.5h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M11 2l-9 10" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          Limpiar
        </button>
        <button v-if="canCreate" class="btn-primary" @click="openModal()" data-testid="new-category-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
          Nueva categoría
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip" v-for="stat in statsCards" :key="stat.label">
        <div class="stat-chip__icon" :class="stat.color">
          <svg v-if="stat.label === 'Total'" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="11" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
          <svg v-else-if="stat.label === 'Con publicaciones'" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h6M4 7.5h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.15"/><path d="M9.3 10l.5.5.9-.9" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <svg v-else-if="stat.label === 'Sin publicaciones'" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 9.5l5-5M9.5 9.5l-5-5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="4" cy="4" r="2" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="4" r="2" stroke="currentColor" stroke-width="1.3"/><circle cx="4" cy="10" r="2" stroke="currentColor" stroke-width="1.3"/><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ stat.value }}</span>
          <span class="stat-chip__label">{{ stat.label }}</span>
        </div>
      </div>
    </div>

    <!-- Main layout -->
    <div class="main-grid">

      <!-- Left: search + list -->
      <div class="main-grid__content">

        <!-- Search bar -->
        <div class="search-bar">
          <svg class="search-bar__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4"/>
            <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          <input
            v-model.trim="searchQuery"
            type="text"
            class="search-bar__input"
            placeholder="Buscar por nombre, descripción o slug..."
          >
          <button v-if="searchQuery" class="search-bar__clear" @click="clearFilters" aria-label="Limpiar búsqueda">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </button>
          <span class="search-bar__count">{{ filteredCategories.length }} encontradas</span>
        </div>

        <!-- Categories list -->
        <div class="cat-list">

          <!-- Loading -->
          <div v-if="loadingCategories" class="cat-list__loading">
            <div v-for="i in 4" :key="i" class="skeleton-row">
              <div class="skeleton skeleton--dot"></div>
              <div class="skeleton-row__body">
                <div class="skeleton skeleton--line skeleton--line-lg"></div>
                <div class="skeleton skeleton--line skeleton--line-md"></div>
              </div>
            </div>
          </div>

          <!-- Empty -->
          <div v-else-if="filteredCategories.length === 0" class="cat-list__empty">
            <div class="empty-icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M2 7h22M2 13h14M2 19h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="20" cy="19" r="4.5" stroke="currentColor" stroke-width="1.4"/>
                <path d="M18.5 20.5l1 1 2.5-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <p class="empty-title">{{ searchQuery ? 'Sin resultados' : 'No hay categorías' }}</p>
            <p class="empty-desc">
              {{ searchQuery ? 'Intenta con otro término de búsqueda.' : 'Crea la primera categoría para organizar mejor las publicaciones.' }}
            </p>
            <button v-if="!searchQuery" class="btn-primary btn-primary--sm" @click="openModal()">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
              Crear categoría
            </button>
          </div>

          <!-- Rows -->
          <div v-else>
            <div
              v-for="category in filteredCategories"
              :key="category._id"
              class="cat-row"
            >
              <!-- Color swatch -->
              <div class="cat-row__swatch" :style="{ background: category.color || '#1A4F3A' }"></div>

              <!-- Body -->
              <div class="cat-row__body">
                <div class="cat-row__top">
                  <div class="cat-row__name-group">
                    <h3 class="cat-row__name">{{ category.name }}</h3>
                    <span class="posts-count-badge" :class="(category.postsCount || 0) > 0 ? 'posts-count-badge--active' : 'posts-count-badge--empty'">
                      {{ category.postsCount || 0 }} {{ (category.postsCount || 0) === 1 ? 'post' : 'posts' }}
                    </span>
                  </div>
                  <div class="cat-row__actions">
                    <button v-if="canEdit" class="action-btn action-btn--edit" @click="openModal(category)">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9.5 2L11 3.5 4 10.5l-2 .5.5-2 7-7z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Editar
                    </button>
                    <button v-if="canDeletePerm" class="action-btn action-btn--delete" @click="confirmDeleteCategory(category)">
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M3 3.5l.75 7h5.5L10 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      Eliminar
                    </button>
                  </div>
                </div>

                <p v-if="category.description" class="cat-row__desc">{{ category.description }}</p>

                <div class="cat-row__meta">
                  <span class="cat-row__slug">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M6 1.5L9.5 5 6 8.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 5h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                    /blog?categoria={{ category.slug }}
                  </span>
                  <span class="cat-row__color-preview">
                    <span class="color-dot" :style="{ background: category.color || '#1A4F3A' }"></span>
                    {{ category.color || '#1A4F3A' }}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Right: sidebar -->
      <div class="main-grid__sidebar">

        <!-- Summary card -->
        <div class="sidebar-card">
          <p class="sidebar-card__title">Resumen</p>
          <div class="summary-list">
            <div class="summary-row">
              <span class="summary-row__label">Total categorías</span>
              <strong class="summary-row__value">{{ categories.length }}</strong>
            </div>
            <div class="summary-row">
              <span class="summary-row__label">Con publicaciones</span>
              <strong class="summary-row__value summary-row__value--green">{{ categories.filter(c => (c.postsCount || 0) > 0).length }}</strong>
            </div>
            <div class="summary-row">
              <span class="summary-row__label">Sin publicaciones</span>
              <strong class="summary-row__value summary-row__value--muted">{{ categories.filter(c => (c.postsCount || 0) === 0).length }}</strong>
            </div>
            <div class="summary-row">
              <span class="summary-row__label">Colores únicos</span>
              <strong class="summary-row__value">{{ new Set(categories.map(c => c.color || '#1A4F3A')).size }}</strong>
            </div>
          </div>
        </div>

        <!-- Color palette preview -->
        <div class="sidebar-card" v-if="categories.length > 0">
          <p class="sidebar-card__title">Paleta de categorías</p>
          <div class="palette-grid">
            <div
              v-for="cat in categories"
              :key="cat._id"
              class="palette-chip"
              :title="cat.name"
            >
              <span class="palette-chip__dot" :style="{ background: cat.color || '#1A4F3A' }"></span>
              <span class="palette-chip__name">{{ cat.name }}</span>
            </div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="sidebar-card">
          <p class="sidebar-card__title">Acceso rápido</p>
          <div class="quick-actions">
            <button class="quick-action" @click="openModal()">
              <span class="quick-action__icon">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </span>
              <span>Crear categoría</span>
              <svg class="quick-action__arrow" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4 2L8 5.5 4 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="quick-action" @click="clearFilters">
              <span class="quick-action__icon">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M4 7h5M5.5 10h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M10 2l-8 10" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>
              </span>
              <span>Limpiar búsqueda</span>
              <svg class="quick-action__arrow" width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M4 2L8 5.5 4 9" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Modal crear / editar ── -->
    <div class="modal fade" id="categoryModal" tabindex="-1" ref="modalRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bsw-modal">

          <div class="bsw-modal__header">
            <div class="bsw-modal__header-left">
              <div class="bsw-modal__header-icon">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path d="M2 4h11M2 7.5h8M2 11h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="12" cy="11" r="2.5" stroke="currentColor" stroke-width="1.3"/>
                </svg>
              </div>
              <div>
                <h2 class="bsw-modal__title">{{ editing ? 'Editar categoría' : 'Nueva categoría' }}</h2>
                <p class="bsw-modal__sub">Nombre, descripción y color de identificación</p>
              </div>
            </div>
            <button type="button" class="bsw-modal__close" data-bs-dismiss="modal" aria-label="Cerrar">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 1l11 11M12 1L1 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            </button>
          </div>

          <div class="modal-body bsw-modal__body">
            <form @submit.prevent="save">

              <div class="form-group">
                <label class="field-label">Nombre <span class="field-required">*</span></label>
                <input
                  v-model.trim="form.name"
                  type="text"
                  class="field-input"
                  required
                  placeholder="Ej: Noticias, Premios, Sostenibilidad"
                  data-testid="category-name-input"
                >
              </div>

              <div class="form-group">
                <label class="field-label">Descripción</label>
                <textarea
                  v-model.trim="form.description"
                  class="field-input field-textarea"
                  rows="3"
                  placeholder="Breve descripción de la categoría…"
                ></textarea>
              </div>

              <div class="form-group">
                <label class="field-label">Color de identificación</label>
                <div class="color-picker-row">
                  <label class="color-native-wrap" :style="{ background: form.color || '#1A4F3A' }">
                    <input v-model="form.color" type="color" class="color-native-input" aria-label="Seleccionar color">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l6-6 3 3-6 6H2v-3z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.5 3.5L11.5 2.5a1 1 0 0 1 1.4 1.4L11.9 4.9" stroke="white" stroke-width="1.3" stroke-linecap="round"/></svg>
                  </label>
                  <input
                    v-model.trim="form.color"
                    type="text"
                    class="field-input color-text-input"
                    placeholder="#1A4F3A"
                  >
                  <div class="color-presets">
                    <button
                      v-for="preset in colorPresets"
                      :key="preset"
                      type="button"
                      class="color-preset"
                      :class="{ active: form.color === preset }"
                      :style="{ background: preset }"
                      @click="form.color = preset"
                      :aria-label="preset"
                    ></button>
                  </div>
                </div>
              </div>

              <!-- Live preview -->
              <div class="cat-preview">
                <div class="cat-preview__swatch" :style="{ background: form.color || '#1A4F3A' }"></div>
                <div class="cat-preview__body">
                  <div class="cat-preview__top">
                    <span class="cat-preview__name">{{ form.name || 'Nombre de categoría' }}</span>
                    <span class="cat-preview__badge" :style="{
                      background: (form.color || '#1A4F3A') + '18',
                      color: form.color || '#1A4F3A',
                      border: `1px solid ${form.color || '#1A4F3A'}30`
                    }">0 posts</span>
                  </div>
                  <p class="cat-preview__desc">{{ form.description || 'Sin descripción' }}</p>
                </div>
              </div>

            </form>
          </div>

          <div class="bsw-modal__footer">
            <button type="button" class="btn-ghost" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn-primary" @click="save" :disabled="saving" data-testid="save-category-btn">
              <span v-if="saving" class="btn-loading">
                <svg class="spin" width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.5" stroke-dasharray="20 12"/></svg>
                Guardando…
              </span>
              <span v-else>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3L11 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ editing ? 'Actualizar' : 'Crear categoría' }}
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCmsStore } from '~/stores/cms'
import { useAuthStore } from '~/stores/auth'
import { notify, confirmDelete, alertPermissionDenied } from '~/services/notifications'

const cmsStore = useCmsStore()
const authStore = useAuthStore()
const { categories, loadingCategories } = storeToRefs(cmsStore)

const canCreate = computed(() => authStore.hasPermission('categories.create'))
const canEdit   = computed(() => authStore.hasPermission('categories.edit'))
const canDeletePerm = computed(() => authStore.hasPermission('categories.delete'))

const modalRef = ref(null)
let modal = null

const editing     = ref(null)
const saving      = ref(false)
const searchQuery = ref('')
const notice      = ref({ type: '', text: '' })

const colorPresets = [
  '#1A4F3A', '#2E8B57', '#8fd9b6',
  '#1E88C6', '#c6e8f7', '#e67e22',
  '#e74c3c', '#9b59b6', '#34495e', '#f1c40f'
]

const form = ref({ name: '', description: '', color: '#1A4F3A' })

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value || []
  const q = searchQuery.value.toLowerCase()
  return (categories.value || []).filter(c =>
    c.name?.toLowerCase().includes(q) ||
    c.description?.toLowerCase().includes(q) ||
    c.slug?.toLowerCase().includes(q)
  )
})

const statsCards = computed(() => [
  { label: 'Total',             value: categories.value.length, color: 'green' },
  { label: 'Con publicaciones', value: categories.value.filter(c => (c.postsCount || 0) > 0).length, color: 'teal' },
  { label: 'Sin publicaciones', value: categories.value.filter(c => (c.postsCount || 0) === 0).length, color: 'gray' },
  { label: 'Colores únicos',    value: new Set(categories.value.map(c => c.color || '#1A4F3A')).size, color: 'dark' }
])

const openModal = (category = null) => {
  if (category && !canEdit.value)   { alertPermissionDenied('categories.edit');   return }
  if (!category && !canCreate.value){ alertPermissionDenied('categories.create'); return }
  editing.value = category
  form.value = category
    ? { name: category.name || '', description: category.description || '', color: category.color || '#1A4F3A' }
    : { name: '', description: '', color: '#1A4F3A' }
  modal?.show()
}

const save = async () => {
  saving.value = true
  try {
    if (editing.value) {
      await cmsStore.updateCategory(editing.value._id || editing.value.id, form.value)
      notify.success('La categoría fue actualizada correctamente.')
    } else {
      await cmsStore.createCategory(form.value)
      notify.success('La categoría fue creada correctamente.')
    }
    modal?.hide()
  } catch (error) {
    notify.error(error)
  } finally {
    saving.value = false
  }
}

const confirmDeleteCategory = async (category) => {
  if (!canDeletePerm.value) { alertPermissionDenied('categories.delete'); return }
  const ok = await confirmDelete({
    title: '¿Eliminar categoría?',
    text: `Se eliminará "${category.name}". Las publicaciones asociadas podrán quedar sin categoría.`
  })
  if (!ok) return
  try {
    await cmsStore.deleteCategory(category._id || category.id)
    notify.success('La categoría fue eliminada correctamente.')
  } catch (error) {
    notify.error(error)
  }
}

const clearFilters = () => { searchQuery.value = '' }

onMounted(async () => {
  const { Modal } = await import('bootstrap')
  modal = new Modal(modalRef.value)
})
</script>

<style scoped>
/* ─── Tokens ─── */
.categories-manager {
  --green-900: #0d2e1e;
  --green-800: #1A4F3A;
  --green-700: #1f6347;
  --green-600: #2E8B57;
  --green-100: #e6f5ed;
  --green-50:  #f0faf4;
  --teal-300:  #8fd9b6;
  --blue-400:  #1E88C6;
  --blue-50:   #e8f4fd;
  --gray-900:  #111827;
  --gray-800:  #1f2937;
  --gray-600:  #4b5563;
  --gray-500:  #6b7280;
  --gray-400:  #9ca3af;
  --gray-300:  #d1d5db;
  --gray-200:  #e5e7eb;
  --gray-100:  #f3f4f6;
  --gray-50:   #f9fafb;
  --red-600:   #dc2626;
  --red-50:    #fef2f2;
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  padding: 32px 28px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: var(--font-sans);
  color: var(--gray-900);
}

/* ─── Toast ─── */
.bsw-toast {
  position: fixed; top: 20px; right: 20px; z-index: 9999;
  display: flex; align-items: center; gap: 10px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: #fff;
  border: 1px solid var(--gray-200);
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  min-width: 280px; max-width: 400px;
  font-size: 13.5px;
}
.bsw-toast.success .bsw-toast__icon { color: var(--green-600); }
.bsw-toast.error   .bsw-toast__icon { color: var(--red-600); }
.bsw-toast__text  { flex: 1; color: var(--gray-800); line-height: 1.4; }
.bsw-toast__close { background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 2px; border-radius: 4px; display: flex; align-items: center; transition: color .15s; }
.bsw-toast__close:hover { color: var(--gray-800); }
.toast-slide-enter-active, .toast-slide-leave-active { transition: all .25s cubic-bezier(.4,0,.2,1); }
.toast-slide-enter-from, .toast-slide-leave-to { opacity: 0; transform: translateX(20px); }

/* ─── Page header ─── */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.page-header__breadcrumb { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--gray-400); font-weight: 500; letter-spacing: .03em; text-transform: uppercase; margin-bottom: 6px; }
.page-header__breadcrumb .active { color: var(--green-800); }
.page-header__breadcrumb svg { color: var(--gray-300); }
.page-header__title { font-size: 22px; font-weight: 650; letter-spacing: -.4px; color: var(--gray-900); margin: 0 0 5px; line-height: 1.2; }
.page-header__desc  { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

/* ─── Buttons ─── */
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 16px; background: var(--green-800); color: #fff;
  border: none; border-radius: var(--radius-sm); font-size: 13.5px;
  font-weight: 550; cursor: pointer; transition: background .15s, transform .1s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-primary:hover  { background: var(--green-700); }
.btn-primary:active { transform: scale(.98); }
.btn-primary--sm    { padding: 7px 13px; font-size: 12.5px; }
.btn-primary:disabled { opacity: .5; cursor: not-allowed; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; background: transparent; color: var(--gray-600);
  border: 1px solid var(--gray-200); border-radius: var(--radius-sm);
  font-size: 13.5px; font-weight: 500; cursor: pointer; transition: all .15s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }

/* ─── Stats ─── */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
@media (max-width: 768px) { .stats-row { grid-template-columns: repeat(2, 1fr); } }

.stat-chip { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); transition: border-color .15s; }
.stat-chip:hover { border-color: var(--gray-300); }
.stat-chip__icon { width: 34px; height: 34px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-chip__icon.green { background: var(--green-50);  color: var(--green-800); }
.stat-chip__icon.teal  { background: var(--blue-50);   color: var(--blue-400); }
.stat-chip__icon.gray  { background: var(--gray-100);  color: var(--gray-600); }
.stat-chip__icon.dark  { background: var(--gray-900);  color: #fff; }
.stat-chip__info  { display: flex; flex-direction: column; gap: 1px; }
.stat-chip__value { font-size: 20px; font-weight: 700; line-height: 1; color: var(--gray-900); letter-spacing: -.5px; }
.stat-chip__label { font-size: 11.5px; color: var(--gray-400); font-weight: 500; }

/* ─── Main grid ─── */
.main-grid { display: grid; grid-template-columns: 1fr 260px; gap: 20px; align-items: start; }
@media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }
.main-grid__content { display: flex; flex-direction: column; gap: 12px; }

/* ─── Search bar ─── */
.search-bar {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md);
  padding: 0 14px; transition: border-color .15s;
}
.search-bar:focus-within { border-color: var(--green-700); }
.search-bar__icon  { color: var(--gray-400); flex-shrink: 0; }
.search-bar__input { flex: 1; border: none; background: transparent; padding: 11px 0; font-size: 13.5px; color: var(--gray-900); font-family: var(--font-sans); outline: none; }
.search-bar__input::placeholder { color: var(--gray-400); }
.search-bar__clear { background: none; border: none; cursor: pointer; color: var(--gray-400); display: flex; align-items: center; padding: 2px; border-radius: 4px; transition: color .13s; }
.search-bar__clear:hover { color: var(--gray-800); }
.search-bar__count { font-size: 12px; color: var(--gray-400); font-weight: 500; white-space: nowrap; padding: 4px 10px; background: var(--gray-100); border-radius: 99px; flex-shrink: 0; }

/* ─── Cat list ─── */
.cat-list { background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); overflow: hidden; }

/* Skeleton */
.cat-list__loading { padding: 8px; display: flex; flex-direction: column; gap: 1px; }
.skeleton-row { display: flex; align-items: center; gap: 14px; padding: 16px; }
.skeleton-row__body { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.skeleton { background: linear-gradient(90deg, var(--gray-100) 25%, var(--gray-50) 50%, var(--gray-100) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 4px; }
.skeleton--dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.skeleton--line { height: 10px; }
.skeleton--line-lg { width: 55%; }
.skeleton--line-md { width: 35%; }
@keyframes shimmer { to { background-position: -200% 0; } }

/* Empty */
.cat-list__empty { display: flex; flex-direction: column; align-items: center; padding: 52px 24px; text-align: center; }
.empty-icon { width: 50px; height: 50px; border-radius: var(--radius-md); background: var(--gray-100); display: flex; align-items: center; justify-content: center; color: var(--gray-400); margin-bottom: 14px; }
.empty-title { font-size: 15px; font-weight: 600; color: var(--gray-800); margin: 0 0 6px; }
.empty-desc  { font-size: 13px; color: var(--gray-400); margin: 0 0 20px; max-width: 260px; line-height: 1.5; }

/* Cat row */
.cat-row {
  display: flex; align-items: stretch;
  border-bottom: 1px solid var(--gray-100);
  transition: background .12s;
}
.cat-row:last-child { border-bottom: none; }
.cat-row:hover { background: var(--gray-50); }

.cat-row__swatch { width: 4px; flex-shrink: 0; border-radius: 0; }
.cat-row:first-child .cat-row__swatch { border-top-left-radius: 0; }

.cat-row__body { flex: 1; padding: 15px 18px; display: flex; flex-direction: column; gap: 5px; min-width: 0; }

.cat-row__top { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.cat-row__name-group { display: flex; align-items: center; gap: 8px; }
.cat-row__name { font-size: 14px; font-weight: 620; color: var(--gray-900); margin: 0; }

.posts-count-badge { display: inline-flex; align-items: center; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600; }
.posts-count-badge--active { background: var(--green-50); color: var(--green-800); border: 1px solid rgba(26,79,58,.15); }
.posts-count-badge--empty  { background: var(--gray-100); color: var(--gray-500); }

.cat-row__actions { display: flex; align-items: center; gap: 5px; flex-shrink: 0; }

.action-btn { display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: var(--radius-xs); font-size: 12px; font-weight: 550; cursor: pointer; border: 1px solid transparent; background: transparent; transition: all .13s; font-family: var(--font-sans); }
.action-btn--edit   { color: var(--blue-400); }
.action-btn--edit:hover   { background: var(--blue-50); border-color: rgba(30,136,198,.2); }
.action-btn--delete { color: var(--red-600); }
.action-btn--delete:hover { background: var(--red-50); border-color: rgba(220,38,38,.2); }

.cat-row__desc { font-size: 12.5px; color: var(--gray-500); margin: 0; line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.cat-row__meta { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.cat-row__slug { display: flex; align-items: center; gap: 4px; font-size: 11.5px; color: var(--gray-400); font-family: 'SFMono-Regular', 'Fira Mono', monospace; }
.cat-row__color-preview { display: flex; align-items: center; gap: 5px; font-size: 11.5px; color: var(--gray-400); font-family: 'SFMono-Regular', 'Fira Mono', monospace; }
.color-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0,0,0,.08); }

/* ─── Sidebar ─── */
.sidebar-card { background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); padding: 18px; margin-bottom: 12px; }
.sidebar-card:last-child { margin-bottom: 0; }
.sidebar-card__title { font-size: 13px; font-weight: 650; color: var(--gray-900); margin: 0 0 14px; }

/* Summary */
.summary-list { display: flex; flex-direction: column; gap: 10px; }
.summary-row { display: flex; align-items: center; justify-content: space-between; }
.summary-row__label { font-size: 12.5px; color: var(--gray-500); }
.summary-row__value { font-size: 14px; font-weight: 700; color: var(--gray-900); }
.summary-row__value--green { color: var(--green-800); }
.summary-row__value--muted { color: var(--gray-400); }

/* Palette */
.palette-grid { display: flex; flex-direction: column; gap: 7px; }
.palette-chip { display: flex; align-items: center; gap: 9px; padding: 6px 8px; border-radius: var(--radius-sm); transition: background .12s; }
.palette-chip:hover { background: var(--gray-50); }
.palette-chip__dot { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0,0,0,.08); }
.palette-chip__name { font-size: 12.5px; color: var(--gray-700); font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Quick actions */
.quick-actions { display: flex; flex-direction: column; gap: 4px; }
.quick-action { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: var(--radius-sm); border: none; background: transparent; font-size: 13px; font-weight: 500; color: var(--gray-700); cursor: pointer; transition: background .13s; text-align: left; font-family: var(--font-sans); }
.quick-action:hover { background: var(--gray-50); }
.quick-action__icon { width: 26px; height: 26px; border-radius: var(--radius-xs); background: var(--green-50); color: var(--green-800); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.quick-action__arrow { margin-left: auto; color: var(--gray-300); }

/* ─── Modal ─── */
.bsw-modal { border: none; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,.15); }
.bsw-modal__header { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid var(--gray-100); }
.bsw-modal__header-left { display: flex; align-items: center; gap: 12px; }
.bsw-modal__header-icon { width: 34px; height: 34px; border-radius: var(--radius-sm); background: var(--green-50); color: var(--green-800); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.bsw-modal__title { font-size: 15px; font-weight: 650; color: var(--gray-900); margin: 0; }
.bsw-modal__sub { font-size: 12px; color: var(--gray-400); margin: 2px 0 0; }
.bsw-modal__close { width: 28px; height: 28px; border-radius: var(--radius-xs); border: none; background: transparent; color: var(--gray-400); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .13s; }
.bsw-modal__close:hover { background: var(--gray-100); color: var(--gray-800); }
.bsw-modal__body { padding: 22px; background: var(--gray-50); }
.bsw-modal__footer { display: flex; align-items: center; justify-content: flex-end; gap: 8px; padding: 16px 22px; border-top: 1px solid var(--gray-100); background: #fff; }

/* Form elements */
.form-group { margin-bottom: 16px; }
.form-group:last-child { margin-bottom: 0; }
.field-label { display: block; font-size: 12px; font-weight: 600; color: var(--gray-700); margin-bottom: 6px; }
.field-required { color: #e53e3e; }
.field-input { display: block; width: 100%; padding: 8px 12px; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); font-size: 13.5px; color: var(--gray-900); background: #fff; font-family: var(--font-sans); outline: none; box-sizing: border-box; transition: border-color .15s, box-shadow .15s; }
.field-input:focus { border-color: var(--green-700); box-shadow: 0 0 0 3px rgba(26,79,58,.08); }
.field-input::placeholder { color: var(--gray-400); }
.field-textarea { resize: vertical; min-height: 78px; }

/* Color picker */
.color-picker-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.color-native-wrap { width: 42px; height: 38px; border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(0,0,0,.12); overflow: hidden; transition: opacity .15s; }
.color-native-wrap:hover { opacity: .85; }
.color-native-input { position: absolute; opacity: 0; pointer-events: none; width: 0; height: 0; }
.color-text-input { flex: 1; min-width: 100px; font-family: 'SFMono-Regular', 'Fira Mono', monospace; font-size: 13px; }
.color-presets { display: flex; gap: 6px; flex-wrap: wrap; }
.color-preset { width: 20px; height: 20px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: transform .13s, border-color .13s; flex-shrink: 0; }
.color-preset:hover  { transform: scale(1.18); }
.color-preset.active { border-color: var(--gray-900); transform: scale(1.1); }

/* Live preview */
.cat-preview { display: flex; align-items: stretch; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); overflow: hidden; background: #fff; margin-top: 16px; }
.cat-preview__swatch { width: 5px; flex-shrink: 0; transition: background .2s; }
.cat-preview__body { flex: 1; padding: 12px 14px; }
.cat-preview__top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.cat-preview__name { font-size: 13.5px; font-weight: 620; color: var(--gray-900); }
.cat-preview__badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 99px; transition: all .2s; }
.cat-preview__desc { font-size: 12px; color: var(--gray-500); margin: 0; }

/* Spinner */
.btn-loading { display: inline-flex; align-items: center; gap: 6px; }
.spin { animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>