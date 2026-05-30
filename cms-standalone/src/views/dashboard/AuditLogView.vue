<template>
  <div class="audit-view">

    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Auditoría</h1>
        <p class="page-header__desc">Registro completo de actividad del sistema. Monitorea acciones de usuarios en tiempo real.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="exportCSV">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v7M4.5 6.5L7 9l2.5-2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 10v1.5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          Exportar CSV
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/>
            <path d="M7 4.5v3l2 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ eventsToday }}</span>
          <span class="stat-chip__label">Eventos hoy</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon green">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 3h10M2 7h10M2 11h6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ eventsThisMonth }}</span>
          <span class="stat-chip__label">Eventos este mes</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon gray">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M2 12c0-2.485 2.015-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mostActiveUser }}</span>
          <span class="stat-chip__label">Usuario más activo</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon dark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5L8.5 5h3.5l-2.8 2 1 3.5L7 8.5l-3.2 2 1-3.5L2 5h3.5L7 1.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mostCommonAction }}</span>
          <span class="stat-chip__label">Acción más frecuente</span>
        </div>
      </div>
    </div>

    <!-- Filter bar -->
    <div class="filter-bar">
      <div class="search-bar">
        <svg class="search-bar__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4"/>
          <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        </svg>
        <input v-model.trim="filters.search" type="text" class="search-bar__input" placeholder="Buscar por usuario o descripción…">
        <button v-if="filters.search" class="search-bar__clear" @click="filters.search = ''">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </button>
      </div>

      <select v-model="filters.action" class="filter-select">
        <option value="">Todas las acciones</option>
        <option v-for="a in actionTypes" :key="a" :value="a">{{ a }}</option>
      </select>

      <select v-model="filters.entity" class="filter-select">
        <option value="">Todas las entidades</option>
        <option v-for="e in entityTypes" :key="e" :value="e">{{ e }}</option>
      </select>

      <div class="date-range">
        <input v-model="filters.dateFrom" type="date" class="filter-input-date" title="Desde">
        <span class="date-sep">→</span>
        <input v-model="filters.dateTo" type="date" class="filter-input-date" title="Hasta">
      </div>

      <button v-if="hasActiveFilters" class="btn-ghost btn-ghost--sm" @click="clearFilters">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        Limpiar
      </button>
    </div>

    <!-- Table card -->
    <div class="table-card">
      <div class="table-card__info">
        <span class="table-card__count">{{ filteredLogs.length }} registros</span>
      </div>

      <div class="table-wrap">
        <table class="audit-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Entidad</th>
              <th>Descripción</th>
              <th>Endpoint</th>
              <th class="th-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="log in paginatedLogs" :key="log.id">
              <tr class="audit-row" :class="{ 'audit-row--expanded': expandedRow === log.id }" @click="toggleRow(log.id)">
                <td class="td-ts">{{ formatTs(log.timestamp) }}</td>
                <td>
                  <div class="user-cell">
                    <div class="user-cell__avatar" :style="{ background: avatarColor(log.user) }">
                      {{ initials(log.user) }}
                    </div>
                    <span class="user-cell__name">{{ log.user }}</span>
                  </div>
                </td>
                <td>
                  <span class="action-badge" :class="`action-badge--${log.action.toLowerCase()}`">
                    {{ log.action }}
                  </span>
                </td>
                <td class="td-entity">{{ log.entity }}</td>
                <td class="td-desc">{{ log.description }}</td>
                <td class="td-endpoint">
                  <code class="endpoint-code">{{ log.endpoint }}</code>
                </td>
                <td class="td-center">
                  <span class="status-pill" :class="statusClass(log.status)">{{ log.status }}</span>
                </td>
              </tr>
              <tr v-if="expandedRow === log.id" class="detail-row">
                <td colspan="7">
                  <div class="detail-panel">
                    <div class="detail-grid">
                      <div class="detail-item">
                        <span class="detail-label">IP Address</span>
                        <code class="detail-value">{{ log.ip }}</code>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">User Agent</span>
                        <span class="detail-value detail-value--muted">{{ log.userAgent }}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Tiempo de respuesta</span>
                        <span class="detail-value">{{ log.responseTime }}ms</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Timestamp completo</span>
                        <span class="detail-value">{{ log.timestamp }}</span>
                      </div>
                    </div>
                    <div class="detail-payload">
                      <span class="detail-label">Payload</span>
                      <pre class="payload-pre">{{ JSON.stringify(log.payload, null, 2) }}</pre>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredLogs.length === 0" class="empty-state">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="19" r="17" stroke="var(--gray-200)" stroke-width="2"/>
          <path d="M12 19h14M12 13h14M12 25h8" stroke="var(--gray-300)" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        <p class="empty-state__title">Sin registros</p>
        <p class="empty-state__desc">No hay eventos que coincidan con los filtros aplicados.</p>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 2L4 6.5 8 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 2l4 4.5L5 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const actionTypes = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PUBLISH', 'VIEW']
const entityTypes = ['Post', 'Category', 'Media', 'User', 'Role']

// --- Mock data ---
const rawLogs = ref([
  { id: 1,  timestamp: '2026-05-30T09:14:32Z', user: 'Ana García',     action: 'PUBLISH', entity: 'Post',     description: 'Publicó "Novedades de mayo 2026"',                endpoint: 'PUT /api/posts/142/publish',      status: 200, ip: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/124', responseTime: 245, payload: { postId: 142, title: 'Novedades de mayo 2026', status: 'published' } },
  { id: 2,  timestamp: '2026-05-30T08:55:10Z', user: 'Carlos Méndez',  action: 'CREATE',  entity: 'Post',     description: 'Creó borrador "Tendencias Q2"',                   endpoint: 'POST /api/posts',                status: 201, ip: '10.0.0.5',    userAgent: 'Mozilla/5.0 Firefox/125',    responseTime: 134, payload: { title: 'Tendencias Q2', status: 'draft' } },
  { id: 3,  timestamp: '2026-05-30T08:42:05Z', user: 'Lucía Torres',   action: 'LOGIN',   entity: 'User',     description: 'Inicio de sesión exitoso',                        endpoint: 'POST /api/auth/login',           status: 200, ip: '172.16.0.3',  userAgent: 'Mozilla/5.0 Safari/17',      responseTime: 89,  payload: { method: 'password', mfa: false } },
  { id: 4,  timestamp: '2026-05-30T08:30:00Z', user: 'Roberto Silva',  action: 'DELETE',  entity: 'Media',    description: 'Eliminó imagen "banner-hero.jpg"',                endpoint: 'DELETE /api/media/88',           status: 200, ip: '10.0.0.12',   userAgent: 'Mozilla/5.0 Chrome/124',     responseTime: 178, payload: { mediaId: 88, filename: 'banner-hero.jpg' } },
  { id: 5,  timestamp: '2026-05-30T08:12:44Z', user: 'Ana García',     action: 'UPDATE',  entity: 'Category', description: 'Actualizó categoría "Tecnología"',                endpoint: 'PUT /api/categories/5',          status: 200, ip: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/124',    responseTime: 112, payload: { categoryId: 5, name: 'Tecnología', color: '#2563eb' } },
  { id: 6,  timestamp: '2026-05-30T07:58:19Z', user: 'Mario Reyes',    action: 'VIEW',    entity: 'Post',     description: 'Visualizó lista de publicaciones',                endpoint: 'GET /api/posts',                 status: 200, ip: '10.0.0.8',    userAgent: 'Mozilla/5.0 Edge/124',       responseTime: 67,  payload: { page: 1, limit: 20 } },
  { id: 7,  timestamp: '2026-05-29T17:45:33Z', user: 'Lucía Torres',   action: 'CREATE',  entity: 'Category', description: 'Creó categoría "Sostenibilidad"',                  endpoint: 'POST /api/categories',           status: 201, ip: '172.16.0.3',  userAgent: 'Mozilla/5.0 Safari/17',      responseTime: 155, payload: { name: 'Sostenibilidad', color: '#16a34a' } },
  { id: 8,  timestamp: '2026-05-29T16:30:12Z', user: 'Carlos Méndez',  action: 'UPDATE',  entity: 'Post',     description: 'Editó "Informe de sostenibilidad 2025"',          endpoint: 'PUT /api/posts/139',             status: 200, ip: '10.0.0.5',    userAgent: 'Mozilla/5.0 Firefox/125',    responseTime: 203, payload: { postId: 139, changes: ['content', 'seo_title'] } },
  { id: 9,  timestamp: '2026-05-29T15:10:05Z', user: 'Ana García',     action: 'CREATE',  entity: 'Media',    description: 'Subió 3 imágenes al media library',               endpoint: 'POST /api/media/upload',         status: 201, ip: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/124',    responseTime: 1240, payload: { count: 3, totalSize: '4.2MB' } },
  { id: 10, timestamp: '2026-05-29T14:55:20Z', user: 'Roberto Silva',  action: 'LOGOUT',  entity: 'User',     description: 'Cerró sesión',                                    endpoint: 'POST /api/auth/logout',          status: 200, ip: '10.0.0.12',   userAgent: 'Mozilla/5.0 Chrome/124',     responseTime: 42,  payload: {} },
  { id: 11, timestamp: '2026-05-29T14:20:00Z', user: 'Mario Reyes',    action: 'UPDATE',  entity: 'Role',     description: 'Actualizó permisos del rol "Editor"',             endpoint: 'PUT /api/roles/2',               status: 200, ip: '10.0.0.8',    userAgent: 'Mozilla/5.0 Edge/124',       responseTime: 198, payload: { roleId: 2, addedPerms: ['media.upload'], removedPerms: [] } },
  { id: 12, timestamp: '2026-05-29T13:40:15Z', user: 'Lucía Torres',   action: 'PUBLISH', entity: 'Post',     description: 'Publicó "Resultados Q1 2026"',                    endpoint: 'PUT /api/posts/140/publish',     status: 200, ip: '172.16.0.3',  userAgent: 'Mozilla/5.0 Safari/17',      responseTime: 267, payload: { postId: 140, publishedAt: '2026-05-29T13:40:00Z' } },
  { id: 13, timestamp: '2026-05-29T12:15:44Z', user: 'Ana García',     action: 'DELETE',  entity: 'Post',     description: 'Eliminó borrador "Test borrador"',                endpoint: 'DELETE /api/posts/137',          status: 200, ip: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/124',    responseTime: 145, payload: { postId: 137, title: 'Test borrador', status: 'draft' } },
  { id: 14, timestamp: '2026-05-29T11:05:30Z', user: 'Carlos Méndez',  action: 'LOGIN',   entity: 'User',     description: 'Inicio de sesión exitoso',                        endpoint: 'POST /api/auth/login',           status: 200, ip: '10.0.0.5',    userAgent: 'Mozilla/5.0 Firefox/125',    responseTime: 78,  payload: { method: 'password', mfa: true } },
  { id: 15, timestamp: '2026-05-29T10:33:00Z', user: 'Roberto Silva',  action: 'CREATE',  entity: 'User',     description: 'Asignó acceso a "Pedro Castillo"',                endpoint: 'POST /api/users/access',         status: 201, ip: '10.0.0.12',   userAgent: 'Mozilla/5.0 Chrome/124',     responseTime: 220, payload: { userId: 55, roleId: 3 } },
  { id: 16, timestamp: '2026-05-28T18:50:10Z', user: 'Mario Reyes',    action: 'VIEW',    entity: 'User',     description: 'Visualizó listado de usuarios',                   endpoint: 'GET /api/users',                 status: 200, ip: '10.0.0.8',    userAgent: 'Mozilla/5.0 Edge/124',       responseTime: 55,  payload: { page: 1 } },
  { id: 17, timestamp: '2026-05-28T17:20:40Z', user: 'Lucía Torres',   action: 'UPDATE',  entity: 'Post',     description: 'Actualizó SEO de "Premios excelencia 2025"',      endpoint: 'PUT /api/posts/133/seo',         status: 200, ip: '172.16.0.3',  userAgent: 'Mozilla/5.0 Safari/17',      responseTime: 185, payload: { postId: 133, seoTitle: 'Premios Excelencia 2025', metaDesc: '…' } },
  { id: 18, timestamp: '2026-05-28T16:00:00Z', user: 'Ana García',     action: 'PUBLISH', entity: 'Post',     description: 'Publicó "Lanzamiento producto estrella"',         endpoint: 'PUT /api/posts/141/publish',     status: 200, ip: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/124',    responseTime: 289, payload: { postId: 141 } },
  { id: 19, timestamp: '2026-05-28T14:35:55Z', user: 'Carlos Méndez',  action: 'DELETE',  entity: 'Category', description: 'Eliminó categoría "Archivados"',                  endpoint: 'DELETE /api/categories/9',       status: 200, ip: '10.0.0.5',    userAgent: 'Mozilla/5.0 Firefox/125',    responseTime: 133, payload: { categoryId: 9, name: 'Archivados' } },
  { id: 20, timestamp: '2026-05-28T13:10:22Z', user: 'Roberto Silva',  action: 'LOGIN',   entity: 'User',     description: 'Inicio de sesión fallido — contraseña incorrecta', endpoint: 'POST /api/auth/login',          status: 401, ip: '10.0.0.12',   userAgent: 'Mozilla/5.0 Chrome/124',     responseTime: 210, payload: { reason: 'invalid_password', attempts: 2 } },
  { id: 21, timestamp: '2026-05-28T11:22:10Z', user: 'Ana García',     action: 'CREATE',  entity: 'Post',     description: 'Creó borrador "Resumen mensual mayo"',            endpoint: 'POST /api/posts',                status: 201, ip: '192.168.1.10', userAgent: 'Mozilla/5.0 Chrome/124',    responseTime: 167, payload: { title: 'Resumen mensual mayo', status: 'draft' } },
  { id: 22, timestamp: '2026-05-27T16:44:00Z', user: 'Lucía Torres',   action: 'UPDATE',  entity: 'Media',    description: 'Renombró "img_001.jpg" a "portada-mayo.jpg"',     endpoint: 'PUT /api/media/90',              status: 200, ip: '172.16.0.3',  userAgent: 'Mozilla/5.0 Safari/17',      responseTime: 95,  payload: { mediaId: 90, oldName: 'img_001.jpg', newName: 'portada-mayo.jpg' } },
  { id: 23, timestamp: '2026-05-27T10:05:33Z', user: 'Mario Reyes',    action: 'CREATE',  entity: 'Role',     description: 'Creó nuevo rol "Community Manager"',              endpoint: 'POST /api/roles',                status: 201, ip: '10.0.0.8',    userAgent: 'Mozilla/5.0 Edge/124',       responseTime: 178, payload: { name: 'Community Manager', permissions: ['posts.read', 'media.upload'] } },
  { id: 24, timestamp: '2026-05-26T15:30:00Z', user: 'Carlos Méndez',  action: 'PUBLISH', entity: 'Post',     description: 'Publicó "Estrategia digital 2026"',               endpoint: 'PUT /api/posts/138/publish',     status: 500, ip: '10.0.0.5',    userAgent: 'Mozilla/5.0 Firefox/125',    responseTime: 3000, payload: { error: 'internal_server_error', postId: 138 } },
])

// --- Filters ---
const filters = ref({ search: '', action: '', entity: '', dateFrom: '', dateTo: '' })
const hasActiveFilters = computed(() => Object.values(filters.value).some(v => v !== ''))
const clearFilters = () => { filters.value = { search: '', action: '', entity: '', dateFrom: '', dateTo: '' } }

const filteredLogs = computed(() => {
  return rawLogs.value.filter(log => {
    const q = filters.value.search.toLowerCase()
    if (q && !log.user.toLowerCase().includes(q) && !log.description.toLowerCase().includes(q)) return false
    if (filters.value.action && log.action !== filters.value.action) return false
    if (filters.value.entity && log.entity !== filters.value.entity) return false
    if (filters.value.dateFrom && log.timestamp < filters.value.dateFrom) return false
    if (filters.value.dateTo && log.timestamp.slice(0, 10) > filters.value.dateTo) return false
    return true
  })
})

// --- Pagination ---
const PAGE_SIZE = 10
const currentPage = ref(1)
const totalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / PAGE_SIZE)))
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredLogs.value.slice(start, start + PAGE_SIZE)
})

// --- Expanded row ---
const expandedRow = ref(null)
const toggleRow = (id) => { expandedRow.value = expandedRow.value === id ? null : id }

// --- Stats ---
const eventsToday = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return rawLogs.value.filter(l => l.timestamp.startsWith(today)).length
})
const eventsThisMonth = computed(() => {
  const month = new Date().toISOString().slice(0, 7)
  return rawLogs.value.filter(l => l.timestamp.startsWith(month)).length
})
const mostActiveUser = computed(() => {
  const counts = {}
  rawLogs.value.forEach(l => { counts[l.user] = (counts[l.user] || 0) + 1 })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]?.split(' ')[0] || '—'
})
const mostCommonAction = computed(() => {
  const counts = {}
  rawLogs.value.forEach(l => { counts[l.action] = (counts[l.action] || 0) + 1 })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
})

// --- CSV export ---
const exportCSV = () => {
  const headers = ['Timestamp', 'Usuario', 'Acción', 'Entidad', 'Descripción', 'Endpoint', 'Estado', 'IP']
  const rows = filteredLogs.value.map(l => [
    l.timestamp, l.user, l.action, l.entity, `"${l.description}"`, l.endpoint, l.status, l.ip
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `audit-log-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// --- Helpers ---
const formatTs = (ts) => {
  try {
    const d = new Date(ts)
    return d.toLocaleString('es-PA', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
  } catch { return ts }
}

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2', '#65a30d']
const avatarColor = (name = '') => {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}
const initials = (name = '') => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?'

const statusClass = (code) => {
  if (code >= 200 && code < 300) return 'status-pill--ok'
  if (code >= 400 && code < 500) return 'status-pill--warn'
  return 'status-pill--err'
}
</script>

<style scoped>
.audit-view {
  padding: 32px 28px;
  max-width: 1500px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

/* Page header */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.page-header__title { font-size: 22px; font-weight: 650; letter-spacing: -0.4px; color: var(--gray-900); margin: 0 0 5px; }
.page-header__desc { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.stat-chip { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); }
.stat-chip__icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-chip__icon.blue  { background: #eff6ff; color: #2563eb; }
.stat-chip__icon.green { background: #f0fdf4; color: #16a34a; }
.stat-chip__icon.gray  { background: var(--gray-100); color: var(--gray-600); }
.stat-chip__icon.dark  { background: var(--gray-900); color: #fff; }
.stat-chip__info { display: flex; flex-direction: column; gap: 1px; }
.stat-chip__value { font-size: 18px; font-weight: 700; line-height: 1; color: var(--gray-900); letter-spacing: -0.4px; }
.stat-chip__label { font-size: 11.5px; color: var(--gray-400); font-weight: 500; }

/* Filter bar */
.filter-bar {
  display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  padding: 14px 16px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.search-bar {
  display: flex; align-items: center; gap: 8px;
  border: 1px solid var(--gray-200); border-radius: 8px;
  padding: 0 12px; background: var(--gray-50); height: 36px;
  flex: 1; min-width: 200px;
}
.search-bar__icon { color: var(--gray-400); flex-shrink: 0; }
.search-bar__input { flex: 1; border: none; background: none; outline: none; font-size: 13px; color: var(--gray-800); font-family: var(--font-sans); }
.search-bar__clear { border: none; background: none; cursor: pointer; color: var(--gray-400); display: flex; padding: 0; }
.search-bar__clear:hover { color: var(--gray-600); }

.filter-select {
  height: 36px; padding: 0 10px; border: 1px solid var(--gray-200); border-radius: 8px;
  background: var(--gray-50); color: var(--gray-700); font-size: 13px; font-family: var(--font-sans);
  outline: none; cursor: pointer;
}
.filter-select:focus { border-color: #93c5fd; }

.date-range { display: flex; align-items: center; gap: 6px; }
.filter-input-date {
  height: 36px; padding: 0 10px; border: 1px solid var(--gray-200); border-radius: 8px;
  background: var(--gray-50); color: var(--gray-700); font-size: 12.5px; font-family: var(--font-sans);
  outline: none;
}
.filter-input-date:focus { border-color: #93c5fd; }
.date-sep { font-size: 12px; color: var(--gray-400); }

/* Table card */
.table-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.table-card__info {
  padding: 12px 20px;
  border-bottom: 1px solid var(--gray-100);
}
.table-card__count { font-size: 12px; font-weight: 600; color: var(--gray-500); }

.table-wrap { overflow-x: auto; }
.audit-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.audit-table th {
  padding: 10px 14px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--gray-500);
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-100);
  white-space: nowrap;
}
.audit-table td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--gray-50);
  vertical-align: middle;
  color: var(--gray-800);
}
.audit-row { cursor: pointer; transition: background 0.1s; }
.audit-row:hover td { background: #f8faff; }
.audit-row--expanded td { background: #eff6ff; }
.th-center, .td-center { text-align: center; }

.td-ts { font-size: 12px; color: var(--gray-500); white-space: nowrap; }
.td-entity { font-size: 12.5px; color: var(--gray-600); font-weight: 500; }
.td-desc { font-size: 12.5px; color: var(--gray-600); max-width: 240px; }
.td-endpoint { max-width: 180px; }

.endpoint-code {
  font-size: 11px; font-family: 'SFMono-Regular', 'Fira Mono', monospace;
  background: var(--gray-100); color: var(--gray-700);
  padding: 2px 6px; border-radius: 4px;
  display: inline-block; overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; max-width: 170px;
}

/* User cell */
.user-cell { display: flex; align-items: center; gap: 8px; }
.user-cell__avatar {
  width: 28px; height: 28px; border-radius: 50%; color: #fff;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.user-cell__name { font-weight: 500; font-size: 13px; color: var(--gray-900); white-space: nowrap; }

/* Action badge */
.action-badge {
  display: inline-flex; align-items: center;
  padding: 2px 8px; border-radius: 20px;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.04em;
  text-transform: uppercase;
}
.action-badge--create  { background: #dcfce7; color: #15803d; }
.action-badge--update  { background: #dbeafe; color: #1d4ed8; }
.action-badge--delete  { background: #fee2e2; color: #dc2626; }
.action-badge--login   { background: var(--gray-100); color: var(--gray-600); }
.action-badge--logout  { background: var(--gray-100); color: var(--gray-500); }
.action-badge--publish { background: #f3e8ff; color: #7c3aed; }
.action-badge--view    { background: var(--gray-50); color: var(--gray-400); border: 1px solid var(--gray-200); }

/* Status pill */
.status-pill {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 38px; padding: 2px 7px; border-radius: 6px;
  font-size: 11.5px; font-weight: 700; font-family: 'SFMono-Regular', monospace;
}
.status-pill--ok   { background: #dcfce7; color: #15803d; }
.status-pill--warn { background: #fef3c7; color: #92400e; }
.status-pill--err  { background: #fee2e2; color: #dc2626; }

/* Detail row */
.detail-row td { padding: 0; border-bottom: 1px solid #bfdbfe; background: #f0f7ff; }
.detail-panel { padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; }
.detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }
.detail-item { display: flex; flex-direction: column; gap: 3px; }
.detail-label { font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #3b82f6; }
.detail-value { font-size: 12.5px; color: var(--gray-800); font-family: 'SFMono-Regular', monospace; }
.detail-value--muted { font-family: var(--font-sans); color: var(--gray-500); font-size: 12px; }

.detail-payload { display: flex; flex-direction: column; gap: 6px; }
.payload-pre {
  background: #1e293b; color: #93c5fd;
  padding: 12px 16px; border-radius: 8px;
  font-size: 12px; font-family: 'SFMono-Regular', 'Fira Mono', monospace;
  overflow-x: auto; margin: 0; line-height: 1.6;
  max-height: 200px; overflow-y: auto;
}

/* Empty state */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 56px 20px; gap: 8px;
}
.empty-state__title { font-size: 14px; font-weight: 600; color: var(--gray-700); margin: 8px 0 0; }
.empty-state__desc { font-size: 13px; color: var(--gray-500); margin: 0; }

/* Pagination */
.pagination {
  display: flex; align-items: center; justify-content: center; gap: 12px;
  padding: 16px;
  border-top: 1px solid var(--gray-100);
}
.page-btn {
  width: 32px; height: 32px; border-radius: 8px;
  border: 1px solid var(--gray-200); background: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: var(--gray-600); transition: all 0.13s;
}
.page-btn:hover:not(:disabled) { border-color: #93c5fd; color: #2563eb; background: #eff6ff; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.page-info { font-size: 13px; font-weight: 500; color: var(--gray-600); }

/* Buttons */
.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; background: transparent; color: var(--gray-600);
  border: 1px solid var(--gray-200); border-radius: 8px;
  font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }
.btn-ghost--sm { padding: 6px 12px; font-size: 12px; }

@media (max-width: 768px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
}
</style>
