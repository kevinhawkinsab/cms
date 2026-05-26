<template>
  <div class="dashboard">
    <!-- Header -->
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <span>CMS</span>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Dashboard</span>
        </div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-description">Resumen de actividad — <strong>{{ companyStore.activeName || 'Sin empresa' }}</strong></p>
      </div>
      <div class="header-actions">
        <NuxtLink v-if="hasPermission('posts.create')" to="/posts" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nueva publicación
        </NuxtLink>
      </div>
    </div>

    <!-- Metric cards -->
    <div class="metrics-grid">
      <div class="stat-card" v-for="m in metrics" :key="m.key">
        <div class="stat-icon" :style="{ background: m.bg, color: m.color }">
          <span v-html="m.icon" />
        </div>
        <div>
          <div class="stat-value">
            <span v-if="loading" class="skeleton" style="width:48px;height:24px;display:inline-block" />
            <span v-else>{{ m.value }}</span>
          </div>
          <div class="stat-label">{{ m.label }}</div>
        </div>
      </div>
    </div>

    <!-- Main grid -->
    <div class="main-grid">
      <!-- Recent posts -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Publicaciones recientes</h3>
          <NuxtLink to="/posts" class="card-action">Ver todas →</NuxtLink>
        </div>
        <div class="card-body p-0">
          <div v-if="loading" class="p-4 space-y-3">
            <div v-for="i in 5" :key="i" class="skeleton" style="height:52px;border-radius:8px" />
          </div>
          <div v-else-if="!recentPosts.length" class="empty-state">
            <div class="empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <p style="font-size:var(--text-sm);color:var(--color-text-muted)">No hay publicaciones aún</p>
          </div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Estado</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in recentPosts" :key="post.id">
                <td>
                  <div style="font-weight:500;max-width:260px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ post.title }}</div>
                </td>
                <td>
                  <span class="badge" :class="post.visible ? 'badge-green' : 'badge-gray'">
                    {{ post.visible ? 'Publicado' : 'Oculto' }}
                  </span>
                </td>
                <td style="color:var(--color-text-muted);font-size:var(--text-xs)">{{ formatDate(post.publishedAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick access -->
      <div class="quick-access">
        <h3 class="card-title mb-4">Accesos rápidos</h3>
        <div class="quick-grid">
          <NuxtLink
            v-for="qa in quickAccess"
            :key="qa.to"
            :to="qa.to"
            class="quick-card"
            v-show="!qa.permission || hasPermission(qa.permission)"
          >
            <div class="quick-icon" :style="{ background: qa.bg, color: qa.color }" v-html="qa.icon" />
            <div class="quick-label">{{ qa.label }}</div>
            <div class="quick-sub">{{ qa.sub }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { formatDate } from '~/utils/normalizers'

definePageMeta({ middleware: ['auth'] })

const companyStore = useCompanyStore()
const postsStore = usePostsStore()
const { hasPermission } = usePermissions()

const loading = ref(true)
const recentPosts = ref([])

const metrics = computed(() => [
  { key: 'total', label: 'Total publicaciones', value: postsStore.overview.total, icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', bg: '#eef7f2', color: '#1A4F3A' },
  { key: 'published', label: 'Publicadas', value: postsStore.overview.published, icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>', bg: '#dcfce7', color: '#15803d' },
  { key: 'hidden', label: 'Ocultas', value: postsStore.overview.hidden, icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>', bg: '#f1f5f9', color: '#64748b' },
  { key: 'media', label: 'Archivos multimedia', value: '—', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>', bg: '#dbeafe', color: '#1d4ed8' },
])

const quickAccess = [
  { to: '/posts', label: 'Publicaciones', sub: 'Gestionar artículos', permission: 'posts.read', bg: '#eef7f2', color: '#1A4F3A', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
  { to: '/categories', label: 'Categorías', sub: 'Organizar contenido', permission: 'categories.read', bg: '#fef9c3', color: '#a16207', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>' },
  { to: '/media', label: 'Multimedia', sub: 'Archivos y medios', permission: 'media.read', bg: '#dbeafe', color: '#1d4ed8', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
  { to: '/pages', label: 'Páginas', sub: 'Editar sitio público', permission: 'pages.read', bg: '#f3e8ff', color: '#7e22ce', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
  { to: '/page-builder', label: 'Page Builder', sub: 'Editor visual', permission: 'pagebuilder.edit', bg: '#fee2e2', color: '#b91c1c', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
  { to: '/users', label: 'Usuarios', sub: 'Gestionar accesos', permission: 'users.read', bg: '#f0fdf4', color: '#166534', icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' },
]

async function loadData() {
  if (!companyStore.activeId) return
  loading.value = true
  try {
    await postsStore.fetch(companyStore.activeId)
    recentPosts.value = postsStore.items.slice(0, 5)
  } finally {
    loading.value = false
  }
}

function onCompanyChanged() { loadData() }

onMounted(() => {
  loadData()
  window.addEventListener('company:changed', onCompanyChanged)
})
onUnmounted(() => window.removeEventListener('company:changed', onCompanyChanged))
</script>

<style scoped>
.dashboard { max-width: 1200px; }

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}
@media (max-width: 1024px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }

.stat-value { font-size: 1.75rem; font-weight: 800; color: var(--color-text-primary); line-height: 1; }
.stat-label { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 4px; font-weight: 500; }

.main-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 1.5rem;
}
@media (max-width: 1024px) { .main-grid { grid-template-columns: 1fr; } }

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--color-border);
}
.card-title { font-weight: 700; font-size: var(--text-base); color: var(--color-text-primary); margin: 0; }
.card-action { font-size: var(--text-sm); color: var(--color-primary); text-decoration: none; font-weight: 500; }
.card-action:hover { text-decoration: underline; }

.p-0 { padding: 0; }
.p-4 { padding: 1rem; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }

.quick-access { }
.quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }

.quick-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: white;
  border: 1px solid var(--color-border);
  text-decoration: none;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-card);
}
.quick-card:hover {
  border-color: var(--color-brand-200);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-1px);
}
.quick-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.quick-label { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); }
.quick-sub { font-size: var(--text-xs); color: var(--color-text-muted); }

.header-actions { display: flex; gap: 8px; align-items: center; }
</style>
