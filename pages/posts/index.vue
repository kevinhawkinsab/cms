<template>
  <div class="posts-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <NuxtLink to="/dashboard" class="breadcrumb-link">Dashboard</NuxtLink>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Publicaciones</span>
        </div>
        <h1 class="page-title">Publicaciones</h1>
        <p class="page-description">{{ postsStore.overview.total }} publicaciones en total</p>
      </div>
      <div class="header-actions" v-if="hasPermission('posts.create')">
        <button class="btn-primary" @click="openCreate">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Nueva publicación
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-pill">
        <span class="stat-num">{{ postsStore.overview.total }}</span>
        <span class="stat-lbl">Total</span>
      </div>
      <div class="stat-pill green">
        <span class="stat-num">{{ postsStore.overview.published }}</span>
        <span class="stat-lbl">Publicadas</span>
      </div>
      <div class="stat-pill gray">
        <span class="stat-num">{{ postsStore.overview.hidden }}</span>
        <span class="stat-lbl">Ocultas</span>
      </div>
    </div>

    <div class="content-grid">
      <!-- Main column -->
      <div>
        <!-- Filters -->
        <PostFilters @change="onFilter" />

        <!-- List -->
        <div v-if="postsStore.loading" class="posts-list">
          <div v-for="i in 6" :key="i" class="skeleton" style="height:120px;border-radius:12px" />
        </div>

        <div v-else-if="!postsStore.items.length" class="empty-state card">
          <div class="empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <p style="color:var(--color-text-muted);font-size:var(--text-sm)">No hay publicaciones que mostrar</p>
          <button v-if="hasPermission('posts.create')" class="btn-primary btn-sm mt-4" @click="openCreate">Crear primera publicación</button>
        </div>

        <div v-else class="posts-list">
          <div
            v-for="post in postsStore.items"
            :key="post.id"
            class="post-item card"
          >
            <div class="post-thumb">
              <img v-if="post.thumbnail" :src="post.thumbnail" :alt="post.title" class="thumb-img" />
              <div v-else class="thumb-placeholder">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              </div>
            </div>
            <div class="post-content">
              <div class="post-meta">
                <span class="badge" :class="post.visible ? 'badge-green' : 'badge-gray'">
                  {{ post.visible ? 'Publicado' : 'Oculto' }}
                </span>
                <span v-if="post.categories?.length" class="badge badge-brand">{{ post.categories[0]?.name ?? post.categories[0] }}</span>
              </div>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-date">{{ formatDate(post.publishedAt) }}</div>
            </div>
            <div class="post-actions">
              <button v-if="hasPermission('posts.edit')" class="btn-ghost btn-icon" title="Editar" @click="openEdit(post)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <NuxtLink :to="`/page-builder?postId=${post.id}`" class="btn-ghost btn-icon" title="Page Builder" v-if="hasPermission('pagebuilder.edit')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              </NuxtLink>
              <button v-if="hasPermission('posts.publish')" class="btn-ghost btn-icon" :title="post.visible ? 'Ocultar' : 'Publicar'" @click="toggleVisibility(post)">
                <svg v-if="post.visible" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
              <button v-if="hasPermission('posts.delete')" class="btn-ghost btn-icon text-red-500" title="Eliminar" @click="deletePost(post)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="postsStore.totalPages > 1" class="pagination">
          <button class="btn-secondary btn-sm" :disabled="postsStore.page === 1" @click="changePage(postsStore.page - 1)">← Anterior</button>
          <div class="page-nums">
            <button
              v-for="p in visiblePages"
              :key="p"
              class="page-btn"
              :class="{ active: p === postsStore.page }"
              @click="changePage(p)"
            >{{ p }}</button>
          </div>
          <button class="btn-secondary btn-sm" :disabled="postsStore.page >= postsStore.totalPages" @click="changePage(postsStore.page + 1)">Siguiente →</button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="sidebar-col">
        <div class="card">
          <div class="card-body">
            <h4 class="sidebar-title">Estado de publicaciones</h4>
            <div class="chart-placeholder">
              <div class="donut-chart">
                <div class="donut-center">
                  <span class="donut-num">{{ postsStore.overview.total }}</span>
                  <span class="donut-sub">Total</span>
                </div>
              </div>
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="legend-dot" style="background:#16a34a" />
                  <span>Publicadas: {{ postsStore.overview.published }}</span>
                </div>
                <div class="legend-item">
                  <span class="legend-dot" style="background:#94a3b8" />
                  <span>Ocultas: {{ postsStore.overview.hidden }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <PostModal
      v-if="showModal"
      :post="editingPost"
      :company-id="companyStore.activeId"
      @close="closeModal"
      @saved="onSaved"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { notify } from '~/services/notifications'
import { formatDate } from '~/utils/normalizers'

definePageMeta({ middleware: ['auth', 'company'] })

const companyStore = useCompanyStore()
const postsStore = usePostsStore()
const { hasPermission } = usePermissions()

const showModal = ref(false)
const editingPost = ref(null)

async function load() {
  if (companyStore.activeId) await postsStore.fetch(companyStore.activeId)
}

onMounted(() => {
  load()
  window.addEventListener('company:changed', load)
})
onUnmounted(() => window.removeEventListener('company:changed', load))

function openCreate() { editingPost.value = null; showModal.value = true }
function openEdit(post) { editingPost.value = post; showModal.value = true }
function closeModal() { showModal.value = false; editingPost.value = null }

async function onSaved() {
  closeModal()
  await load()
}

async function toggleVisibility(post) {
  try {
    await postsStore.toggleVisibility(post.id)
    await load()
    notify.success(post.visible ? 'Publicación ocultada' : 'Publicación publicada')
  } catch {
    notify.error('Error al cambiar visibilidad')
  }
}

async function deletePost(post) {
  const ok = await import('~/services/notifications').then((m) =>
    m.notify.confirm('¿Eliminar publicación?', `"${post.title}" será eliminada permanentemente.`, 'Eliminar', true)
  )
  if (!ok) return
  try {
    await postsStore.remove(post.id)
    notify.success('Publicación eliminada')
  } catch {
    notify.error('Error al eliminar')
  }
}

function onFilter(filters) {
  Object.entries(filters).forEach(([k, v]) => postsStore.setFilter(k, v))
  load()
}

const visiblePages = computed(() => {
  const p = postsStore.page
  const t = postsStore.totalPages
  const pages = []
  for (let i = Math.max(1, p - 2); i <= Math.min(t, p + 2); i++) pages.push(i)
  return pages
})

function changePage(p) {
  postsStore.setPage(p)
  load()
}
</script>

<style scoped>
.posts-page { max-width: 1200px; }
.header-actions { display: flex; gap: 8px; }

.stats-row { display: flex; gap: 12px; margin-bottom: 1.25rem; }
.stat-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-full);
  background: white;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}
.stat-pill.green { border-color: #bbf7d0; background: #f0fdf4; }
.stat-pill.gray { border-color: #e2e8f0; }
.stat-num { font-weight: 700; font-size: var(--text-sm); color: var(--color-text-primary); }
.stat-lbl { font-size: var(--text-xs); color: var(--color-text-muted); }

.content-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 900px) { .content-grid { grid-template-columns: 1fr; } }

.posts-list { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem; }

.post-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  transition: box-shadow var(--transition-fast);
}
.post-item:hover { box-shadow: var(--shadow-card-hover); }

.post-thumb { flex-shrink: 0; width: 72px; height: 72px; border-radius: var(--radius-md); overflow: hidden; }
.thumb-img { width: 100%; height: 100%; object-fit: cover; }
.thumb-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
  background: var(--color-bg);
  color: var(--color-text-muted);
}

.post-content { flex: 1; min-width: 0; }
.post-meta { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 4px; }
.post-title {
  font-weight: 600;
  font-size: var(--text-sm);
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-primary);
}
.post-excerpt {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0 0 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-date { font-size: 0.7rem; color: var(--color-text-muted); }

.post-actions { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }
.text-red-500 { color: #ef4444; }

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1.5rem;
}
.page-nums { display: flex; gap: 4px; }
.page-btn {
  width: 32px; height: 32px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: white;
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}
.page-btn:hover { border-color: var(--color-brand-300); }
.page-btn.active { background: var(--color-primary); color: white; border-color: var(--color-primary); }

.sidebar-col { }
.sidebar-title { font-weight: 600; font-size: var(--text-sm); color: var(--color-text-primary); margin: 0 0 1rem; }

.chart-placeholder { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
.donut-chart {
  width: 120px; height: 120px;
  border-radius: 50%;
  background: conic-gradient(
    #16a34a 0deg,
    #16a34a calc(var(--published-pct, 70) * 3.6deg),
    #94a3b8 calc(var(--published-pct, 70) * 3.6deg),
    #94a3b8 360deg
  );
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.donut-chart::before {
  content: '';
  position: absolute;
  width: 80px; height: 80px;
  border-radius: 50%;
  background: white;
}
.donut-center {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center;
}
.donut-num { font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); }
.donut-sub { font-size: 0.65rem; color: var(--color-text-muted); }

.chart-legend { display: flex; flex-direction: column; gap: 6px; width: 100%; }
.legend-item { display: flex; align-items: center; gap: 8px; font-size: var(--text-xs); color: var(--color-text-secondary); }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

.mt-4 { margin-top: 1rem; }
</style>
