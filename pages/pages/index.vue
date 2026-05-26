<template>
  <div class="pages-view">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <NuxtLink to="/dashboard" class="breadcrumb-link">Dashboard</NuxtLink>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Páginas públicas</span>
        </div>
        <h1 class="page-title">Páginas públicas</h1>
        <p class="page-description">Administra el contenido visual de {{ companyStore.activeName }}</p>
      </div>
    </div>

    <!-- Search -->
    <div class="search-bar card">
      <div class="search-wrapper">
        <span class="search-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <input v-model="search" @input="pagesStore.setSearch(search)" class="form-input search-input" placeholder="Buscar páginas…" />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pagesStore.loading" class="pages-grid">
      <div v-for="i in 9" :key="i" class="skeleton" style="height:160px;border-radius:12px" />
    </div>

    <!-- Grid -->
    <div v-else class="pages-grid">
      <div v-for="page in pagesStore.pages" :key="page.routeKey" class="page-card card">
        <div class="page-card-header">
          <div class="page-icon" v-html="pageIcons[page.routeKey] ?? pageIcons.default" />
          <div class="page-card-meta">
            <h3 class="page-card-name">{{ page.name }}</h3>
            <code class="page-path">{{ page.path }}</code>
          </div>
        </div>

        <p class="page-description-text">{{ page.description }}</p>

        <div class="page-card-status">
          <span class="badge" :class="page.hasLayout ? 'badge-green' : 'badge-gray'">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline v-if="page.hasLayout" points="20 6 9 17 4 12"/>
              <circle v-else cx="12" cy="12" r="10"/>
            </svg>
            {{ page.hasLayout ? 'Layout guardado' : 'Layout por defecto' }}
          </span>
          <span v-if="page.updatedAt" class="update-date">{{ formatDate(page.updatedAt) }}</span>
        </div>

        <div class="page-card-actions">
          <NuxtLink
            :to="`/page-builder?routeKey=${page.routeKey}`"
            class="btn-primary btn-sm"
            v-if="hasPermission('pagebuilder.edit')"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            Editar en Page Builder
          </NuxtLink>
          <button
            v-if="page.hasLayout && isAdmin()"
            class="btn-secondary btn-sm"
            @click="resetLayout(page)"
          >
            Restablecer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { notify } from '~/services/notifications'
import { formatDate } from '~/utils/normalizers'

definePageMeta({ middleware: ['auth', 'company'] })

const companyStore = useCompanyStore()
const pagesStore = usePagesStore()
const { hasPermission, isAdmin } = usePermissions()

const search = ref('')

const pageIcons = {
  home: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  catalogo: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  origen: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>',
  nosotros: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  sostenibilidad: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  faq: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  contacto: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  blog: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>',
  articulo: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
  default: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
}

async function load() {
  if (companyStore.activeId) await pagesStore.fetchAllLayouts(companyStore.activeId)
}

onMounted(() => { load(); window.addEventListener('company:changed', load) })
onUnmounted(() => window.removeEventListener('company:changed', load))

async function resetLayout(page) {
  const ok = await import('~/services/notifications').then((m) =>
    m.notify.confirm('¿Restablecer layout?', `El layout de "${page.name}" será eliminado y se usará el predeterminado.`, 'Restablecer', true)
  )
  if (!ok) return
  try {
    await pagesStore.deleteLayout(companyStore.activeId, page.routeKey)
    notify.success('Layout restablecido')
  } catch { notify.error('Error al restablecer') }
}
</script>

<style scoped>
.pages-view { max-width: 1100px; }
.search-bar { display: flex; align-items: center; gap: 12px; padding: 0.75rem 1rem; margin-bottom: 1.25rem; }
.search-wrapper { position: relative; flex: 1; }
.search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); display: flex; align-items: center; pointer-events: none; }
.search-input { padding-left: 2.2rem; }

.pages-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1rem; }

.page-card { padding: 1.25rem; display: flex; flex-direction: column; gap: 10px; transition: box-shadow var(--transition-fast); }
.page-card:hover { box-shadow: var(--shadow-card-hover); }

.page-card-header { display: flex; align-items: flex-start; gap: 12px; }
.page-icon {
  flex-shrink: 0;
  width: 44px; height: 44px;
  border-radius: 10px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  display: flex; align-items: center; justify-content: center;
}
.page-card-meta { min-width: 0; }
.page-card-name { font-weight: 700; font-size: var(--text-sm); color: var(--color-text-primary); margin: 0 0 3px; }
.page-path { font-size: 0.7rem; font-family: var(--font-mono); color: var(--color-text-muted); background: var(--color-bg); padding: 1px 5px; border-radius: 4px; }

.page-description-text { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; }

.page-card-status { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.update-date { font-size: 0.7rem; color: var(--color-text-muted); }

.page-card-actions { display: flex; gap: 8px; flex-wrap: wrap; }
</style>
