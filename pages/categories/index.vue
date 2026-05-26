<template>
  <div class="categories-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <NuxtLink to="/dashboard" class="breadcrumb-link">Dashboard</NuxtLink>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Categorías</span>
        </div>
        <h1 class="page-title">Categorías</h1>
        <p class="page-description">Organiza el contenido de {{ companyStore.activeName }}</p>
      </div>
      <button v-if="hasPermission('categories.create')" class="btn-primary" @click="openCreate">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Nueva categoría
      </button>
    </div>

    <!-- Search -->
    <div class="search-bar card">
      <div class="search-wrapper">
        <span class="search-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <input v-model="search" class="form-input search-input" placeholder="Buscar categorías…" @input="categoriesStore.setSearch(search)" />
      </div>
      <span class="result-count">{{ categoriesStore.filtered.length }} categoría(s)</span>
    </div>

    <!-- Grid -->
    <div v-if="categoriesStore.loading" class="categories-grid">
      <div v-for="i in 6" :key="i" class="skeleton" style="height:100px;border-radius:12px" />
    </div>

    <div v-else-if="!categoriesStore.filtered.length" class="empty-state card">
      <div class="empty-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
      </div>
      <p style="color:var(--color-text-muted);font-size:var(--text-sm)">No hay categorías aún</p>
    </div>

    <div v-else class="categories-grid">
      <div
        v-for="cat in categoriesStore.filtered"
        :key="cat.id"
        class="cat-card card"
      >
        <div class="cat-color-bar" :style="{ background: cat.color }" />
        <div class="cat-body">
          <div class="cat-header">
            <div>
              <h3 class="cat-name">{{ cat.name }}</h3>
              <div class="cat-slug mono">{{ cat.slug }}</div>
            </div>
            <div class="cat-actions">
              <span class="badge badge-brand">{{ cat.postsCount }} posts</span>
            </div>
          </div>
          <p v-if="cat.description" class="cat-desc">{{ cat.description }}</p>
          <div class="cat-footer">
            <div class="color-preview" :style="{ background: cat.color }" :title="cat.color" />
            <span class="cat-hex mono">{{ cat.color }}</span>
            <div class="spacer" />
            <button v-if="hasPermission('categories.edit')" class="btn-ghost btn-icon-sm" @click="openEdit(cat)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button v-if="hasPermission('categories.delete')" class="btn-ghost btn-icon-sm" style="color:#ef4444" @click="deleteCategory(cat)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <CategoryModal
      v-if="showModal"
      :category="editingCategory"
      :company-id="companyStore.activeId"
      @close="closeModal"
      @saved="onSaved"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { notify } from '~/services/notifications'

definePageMeta({ middleware: ['auth', 'company'] })

const companyStore = useCompanyStore()
const categoriesStore = useCategoriesStore()
const { hasPermission } = usePermissions()

const showModal = ref(false)
const editingCategory = ref(null)
const search = ref('')

async function load() {
  if (companyStore.activeId) await categoriesStore.fetch(companyStore.activeId)
}

onMounted(() => { load(); window.addEventListener('company:changed', load) })
onUnmounted(() => window.removeEventListener('company:changed', load))

function openCreate() { editingCategory.value = null; showModal.value = true }
function openEdit(cat) { editingCategory.value = cat; showModal.value = true }
function closeModal() { showModal.value = false; editingCategory.value = null }
async function onSaved() { closeModal() }

async function deleteCategory(cat) {
  const ok = await import('~/services/notifications').then((m) =>
    m.notify.confirm('¿Eliminar categoría?', `"${cat.name}" será eliminada.`, 'Eliminar', true)
  )
  if (!ok) return
  try { await categoriesStore.remove(cat.id); notify.success('Categoría eliminada') }
  catch { notify.error('Error al eliminar') }
}
</script>

<style scoped>
.categories-page { max-width: 1100px; }
.search-bar { display: flex; align-items: center; gap: 12px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; }
.search-wrapper { position: relative; flex: 1; }
.search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); display: flex; align-items: center; pointer-events: none; }
.search-input { padding-left: 2.2rem; }
.result-count { font-size: var(--text-xs); color: var(--color-text-muted); white-space: nowrap; }

.categories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }

.cat-card { display: flex; overflow: hidden; }
.cat-color-bar { width: 6px; flex-shrink: 0; }
.cat-body { flex: 1; padding: 1rem; }

.cat-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
.cat-name { font-weight: 700; font-size: var(--text-sm); color: var(--color-text-primary); margin: 0; }
.cat-slug { font-size: 0.7rem; color: var(--color-text-muted); }
.cat-desc { font-size: var(--text-xs); color: var(--color-text-muted); margin: 6px 0; }

.cat-footer { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.color-preview { width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.1); }
.cat-hex { font-size: 0.7rem; color: var(--color-text-muted); }
.spacer { flex: 1; }
</style>
