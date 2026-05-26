<template>
  <div class="media-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <NuxtLink to="/dashboard" class="breadcrumb-link">Dashboard</NuxtLink>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Multimedia</span>
        </div>
        <h1 class="page-title">Biblioteca multimedia</h1>
        <p class="page-description">{{ mediaStore.total }} archivos · {{ companyStore.activeName }}</p>
      </div>
      <div class="header-actions">
        <button v-if="hasPermission('media.upload')" class="btn-primary" @click="showUpload = true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
          Subir archivos
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar card">
      <div class="search-wrapper">
        <span class="search-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <input v-model="search" @input="onSearch" class="form-input search-input" placeholder="Buscar archivos…" />
      </div>
      <div class="pill-group">
        <button v-for="t in types" :key="t.val" class="pill-tab" :class="{ active: activeType === t.val }" @click="setType(t.val)">{{ t.label }}</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-pill"><span class="stat-num">{{ mediaStore.overview.total }}</span><span class="stat-lbl">Total</span></div>
      <div class="stat-pill blue"><span class="stat-num">{{ mediaStore.overview.images }}</span><span class="stat-lbl">Imágenes</span></div>
      <div class="stat-pill gray"><span class="stat-num">{{ mediaStore.overview.documents }}</span><span class="stat-lbl">Documentos</span></div>
    </div>

    <!-- Grid -->
    <div v-if="mediaStore.loading" class="media-grid">
      <div v-for="i in 12" :key="i" class="skeleton" style="aspect-ratio:1;border-radius:12px" />
    </div>

    <div v-else-if="!mediaStore.items.length" class="empty-state card">
      <div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>
      <p style="color:var(--color-text-muted);font-size:var(--text-sm)">No hay archivos aún</p>
      <button v-if="hasPermission('media.upload')" class="btn-primary btn-sm mt-4" @click="showUpload = true">Subir primer archivo</button>
    </div>

    <div v-else class="media-grid">
      <div v-for="item in mediaStore.items" :key="item.id" class="media-card card">
        <div class="media-preview">
          <img v-if="isImage(item)" :src="item.url" :alt="item.alt" class="media-img" />
          <div v-else class="media-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div class="media-overlay">
            <button v-if="hasPermission('media.upload')" class="overlay-btn" @click="openEdit(item)" title="Editar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="overlay-btn" @click="copyUrl(item.url)" title="Copiar URL">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            </button>
            <button v-if="hasPermission('media.delete')" class="overlay-btn danger" @click="deleteMedia(item)" title="Eliminar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
          <span v-if="item.downloadable" class="badge-dl">Desc.</span>
        </div>
        <div class="media-info">
          <div class="media-name" :title="item.filename">{{ item.filename }}</div>
          <div class="media-meta">
            <span v-if="item.alt" class="media-alt">{{ item.alt }}</span>
            <span class="media-size">{{ formatFileSize(item.size) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="mediaStore.totalPages > 1" class="pagination">
      <button class="btn-secondary btn-sm" :disabled="mediaStore.page === 1" @click="changePage(mediaStore.page - 1)">← Anterior</button>
      <span style="font-size:var(--text-sm);color:var(--color-text-muted)">Página {{ mediaStore.page }} de {{ mediaStore.totalPages }}</span>
      <button class="btn-secondary btn-sm" :disabled="mediaStore.page >= mediaStore.totalPages" @click="changePage(mediaStore.page + 1)">Siguiente →</button>
    </div>

    <!-- Upload modal -->
    <UploadModal
      v-if="showUpload"
      :company-id="companyStore.activeId"
      @close="showUpload = false"
      @uploaded="onUploaded"
    />

    <!-- Edit modal -->
    <EditMediaModal
      v-if="editingItem"
      :item="editingItem"
      @close="editingItem = null"
      @saved="onSaved"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { notify } from '~/services/notifications'
import { formatFileSize } from '~/utils/normalizers'

definePageMeta({ middleware: ['auth', 'company'] })

const companyStore = useCompanyStore()
const mediaStore = useMediaStore()
const { hasPermission } = usePermissions()

const showUpload = ref(false)
const editingItem = ref(null)
const search = ref('')
const activeType = ref('all')

const types = [
  { val: 'all', label: 'Todos' },
  { val: 'image', label: 'Imágenes' },
  { val: 'document', label: 'Documentos' },
]

const isImage = (item) => item.mimeType?.startsWith('image/')

async function load() {
  if (companyStore.activeId) await mediaStore.fetch(companyStore.activeId)
}

onMounted(() => { load(); window.addEventListener('company:changed', load) })
onUnmounted(() => window.removeEventListener('company:changed', load))

function onSearch() { mediaStore.setFilter('search', search.value); load() }
function setType(val) { activeType.value = val; mediaStore.setFilter('type', val); load() }
function changePage(p) { mediaStore.setPage(p); load() }
function openEdit(item) { editingItem.value = item }

async function copyUrl(url) {
  try { await navigator.clipboard.writeText(url); notify.success('URL copiada') }
  catch { notify.error('No se pudo copiar') }
}

async function deleteMedia(item) {
  const ok = await import('~/services/notifications').then((m) =>
    m.notify.confirm('¿Eliminar archivo?', `"${item.filename}" será eliminado.`, 'Eliminar', true)
  )
  if (!ok) return
  try { await mediaStore.remove(item.id); notify.success('Archivo eliminado') }
  catch { notify.error('Error al eliminar') }
}

async function onUploaded() { showUpload.value = false; await load() }
async function onSaved() { editingItem.value = null; await load() }
</script>

<style scoped>
.media-page { max-width: 1200px; }
.header-actions { display: flex; gap: 8px; }

.filters-bar { display: flex; align-items: center; gap: 12px; padding: 0.75rem 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.search-wrapper { position: relative; }
.search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); display: flex; align-items: center; pointer-events: none; }
.search-input { padding-left: 2.2rem; width: 220px; }

.stats-row { display: flex; gap: 12px; margin-bottom: 1rem; }
.stat-pill { display: flex; align-items: center; gap: 8px; padding: 0.4rem 0.85rem; border-radius: var(--radius-full); background: white; border: 1px solid var(--color-border); }
.stat-pill.blue { border-color: #bfdbfe; background: #eff6ff; }
.stat-pill.gray { border-color: #e2e8f0; }
.stat-num { font-weight: 700; font-size: var(--text-sm); }
.stat-lbl { font-size: var(--text-xs); color: var(--color-text-muted); }

.media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }

.media-card { overflow: hidden; }
.media-preview { position: relative; aspect-ratio: 1; background: var(--color-bg); }
.media-img { width: 100%; height: 100%; object-fit: cover; }
.media-icon { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); }

.media-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; gap: 6px;
  opacity: 0; transition: opacity var(--transition-fast);
}
.media-card:hover .media-overlay { opacity: 1; }
.overlay-btn {
  display: flex; align-items: center; justify-content: center;
  width: 30px; height: 30px;
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.9);
  border: none; cursor: pointer;
  color: var(--color-text-primary);
  transition: background var(--transition-fast);
}
.overlay-btn:hover { background: white; }
.overlay-btn.danger { color: #ef4444; }

.badge-dl {
  position: absolute; top: 6px; right: 6px;
  background: rgba(0,0,0,0.6); color: white;
  font-size: 0.65rem; padding: 0.15rem 0.45rem;
  border-radius: var(--radius-full);
}

.media-info { padding: 0.5rem 0.75rem 0.65rem; }
.media-name { font-size: var(--text-xs); font-weight: 500; color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.media-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 2px; }
.media-alt { font-size: 0.65rem; color: var(--color-text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100px; }
.media-size { font-size: 0.65rem; color: var(--color-text-muted); flex-shrink: 0; }

.pagination { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 1.5rem; }
.mt-4 { margin-top: 1rem; }
</style>
