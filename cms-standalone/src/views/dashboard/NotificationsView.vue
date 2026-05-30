<template>
  <div class="notifications-view">
    <!-- Page header -->
    <div class="page-header">
      <div class="page-header-left">
        <h1 class="page-title">Centro de notificaciones</h1>
        <div class="page-stats">
          <span class="stat-chip unread-chip">
            <span class="stat-dot" />
            {{ notifStore.unreadCount }} sin leer
          </span>
          <span class="stat-chip total-chip">
            {{ notifStore.notifications.length }} en total
          </span>
        </div>
      </div>
      <div class="page-header-right">
        <button class="btn-outline" @click="notifStore.markAllAsRead()" :disabled="notifStore.unreadCount === 0">
          Marcar todas como leídas
        </button>
        <button class="btn-danger-outline" @click="confirmClearAll">
          Limpiar todo
        </button>
      </div>
    </div>

    <!-- Filter tabs -->
    <div class="filter-tabs">
      <button
        v-for="tab in TABS"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key; selectedIds.clear(); page = 1"
      >
        {{ tab.label }}
        <span v-if="tab.count > 0" class="tab-count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- Bulk action bar -->
    <Transition name="bulk-bar">
      <div v-if="selectedIds.size > 0" class="bulk-bar">
        <label class="check-wrap">
          <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" />
          <span>{{ selectedIds.size }} seleccionadas</span>
        </label>
        <div class="bulk-actions">
          <button class="btn-sm-outline" @click="bulkMarkRead">Marcar como leídas</button>
          <button class="btn-sm-danger" @click="bulkDelete">Eliminar selección</button>
        </div>
      </div>
    </Transition>

    <!-- Notification cards -->
    <div v-if="paginated.length > 0" class="notif-cards">
      <div
        v-for="notif in paginated"
        :key="notif.id"
        class="notif-card"
        :class="{ unread: !notif.read, selected: selectedIds.has(notif.id) }"
      >
        <label class="card-checkbox">
          <input
            type="checkbox"
            :checked="selectedIds.has(notif.id)"
            @change="toggleSelect(notif.id)"
          />
        </label>

        <div class="card-avatar" :class="`cat-${notif.category}`">
          <svg v-if="notif.category === 'post'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          <svg v-else-if="notif.category === 'user'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <svg v-else-if="notif.category === 'review'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <svg v-else-if="notif.category === 'comment'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>

        <div class="card-body">
          <div class="card-top">
            <span class="card-title">{{ notif.title }}</span>
            <span class="card-type-badge" :class="`type-${notif.type}`">{{ typeLabel(notif.type) }}</span>
          </div>
          <p class="card-message">{{ notif.message }}</p>
          <div class="card-meta">
            <span class="card-actor" v-if="notif.actor">{{ notif.actor.name }} &middot; </span>
            <span class="card-time" :title="formatAbsolute(notif.createdAt)">{{ relativeTime(notif.createdAt) }}</span>
          </div>
        </div>

        <div class="card-actions">
          <button
            v-if="!notif.read"
            class="action-btn read-btn"
            title="Marcar como leída"
            @click="notifStore.markAsRead(notif.id)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </button>
          <button
            class="action-btn delete-btn"
            title="Eliminar"
            @click="notifStore.removeNotification(notif.id)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Empty filtered state -->
    <div v-else class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <p>No hay notificaciones en esta sección</p>
    </div>

    <!-- Load more -->
    <div v-if="filtered.length > page * PAGE_SIZE" class="load-more">
      <button class="btn-outline" @click="page++">Cargar más</button>
    </div>

    <!-- Confirm dialog -->
    <Transition name="fade">
      <div v-if="showConfirm" class="confirm-overlay" @click.self="showConfirm = false">
        <div class="confirm-dialog">
          <h3>Limpiar todas las notificaciones</h3>
          <p>Esta acción eliminará permanentemente todas las notificaciones. ¿Deseas continuar?</p>
          <div class="confirm-actions">
            <button class="btn-outline" @click="showConfirm = false">Cancelar</button>
            <button class="btn-danger" @click="doClearAll">Sí, limpiar todo</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useNotificationsStore } from '@/stores/notifications.js'

const notifStore = useNotificationsStore()
const activeTab = ref('all')
const page = ref(1)
const PAGE_SIZE = 10
const selectedIds = reactive(new Set())
const showConfirm = ref(false)

const TABS = computed(() => [
  { key: 'all', label: 'Todas', count: 0 },
  { key: 'unread', label: 'No leídas', count: notifStore.unreadCount },
  { key: 'post', label: 'Posts', count: notifStore.notifications.filter(n => n.category === 'post').length },
  { key: 'user', label: 'Usuarios', count: notifStore.notifications.filter(n => n.category === 'user').length },
  { key: 'system', label: 'Sistema', count: notifStore.notifications.filter(n => n.category === 'system').length }
])

const filtered = computed(() => {
  const all = notifStore.notifications
  if (activeTab.value === 'all') return all
  if (activeTab.value === 'unread') return all.filter(n => !n.read)
  return all.filter(n => n.category === activeTab.value)
})

const paginated = computed(() => filtered.value.slice(0, page.value * PAGE_SIZE))

const isAllSelected = computed(() =>
  paginated.value.length > 0 && paginated.value.every(n => selectedIds.has(n.id))
)

function toggleSelect(id) {
  if (selectedIds.has(id)) selectedIds.delete(id)
  else selectedIds.add(id)
}

function toggleSelectAll() {
  if (isAllSelected.value) {
    paginated.value.forEach(n => selectedIds.delete(n.id))
  } else {
    paginated.value.forEach(n => selectedIds.add(n.id))
  }
}

function bulkMarkRead() {
  selectedIds.forEach(id => notifStore.markAsRead(id))
  selectedIds.clear()
}

function bulkDelete() {
  selectedIds.forEach(id => notifStore.removeNotification(id))
  selectedIds.clear()
}

function confirmClearAll() {
  showConfirm.value = true
}

function doClearAll() {
  notifStore.clearAll()
  selectedIds.clear()
  showConfirm.value = false
}

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'ahora mismo'
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `hace ${hrs} h`
  const days = Math.floor(hrs / 24)
  return `hace ${days} días`
}

function formatAbsolute(iso) {
  return new Date(iso).toLocaleString('es-ES', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function typeLabel(type) {
  return { info: 'Info', success: 'Éxito', warning: 'Aviso', error: 'Error' }[type] || type
}
</script>

<style scoped>
.notifications-view {
  padding: 32px;
  max-width: 900px;
  margin: 0 auto;
  font-family: var(--font-sans, sans-serif);
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--gray-900, #111827);
  margin: 0 0 10px;
}

.page-stats {
  display: flex;
  gap: 8px;
}

.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 600;
}
.unread-chip { background: #dbeafe; color: var(--primary-700, #2563eb); }
.total-chip { background: var(--gray-200, #e5e7eb); color: var(--gray-700, #374151); }
.stat-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary-700, #2563eb); }

.page-header-right {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.btn-outline {
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--primary-700, #2563eb);
  background: #fff;
  border: 1.5px solid var(--primary-700, #2563eb);
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
}
.btn-outline:hover { background: var(--primary-700, #2563eb); color: #fff; }
.btn-outline:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-danger-outline {
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #dc2626;
  background: #fff;
  border: 1.5px solid #dc2626;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
}
.btn-danger-outline:hover { background: #dc2626; color: #fff; }

.btn-danger {
  padding: 8px 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background: #dc2626;
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: opacity 0.14s;
}
.btn-danger:hover { opacity: 0.85; }

/* Tabs */
.filter-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  margin-bottom: 20px;
}

.tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gray-600, #4b5563);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: color 0.14s, border-color 0.14s;
  margin-bottom: -1px;
}
.tab-btn:hover { color: var(--gray-900, #111827); }
.tab-btn.active {
  color: var(--primary-700, #2563eb);
  border-bottom-color: var(--primary-700, #2563eb);
}

.tab-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 0.68rem;
  font-weight: 700;
  background: var(--gray-200, #e5e7eb);
  border-radius: 999px;
  color: var(--gray-700, #374151);
}
.tab-btn.active .tab-count {
  background: #dbeafe;
  color: var(--primary-700, #2563eb);
}

/* Bulk bar */
.bulk-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: var(--radius-md, 8px);
  margin-bottom: 12px;
}

.check-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--primary-700, #2563eb);
  cursor: pointer;
}

.bulk-actions { display: flex; gap: 8px; }

.btn-sm-outline {
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--primary-700, #2563eb);
  background: #fff;
  border: 1.5px solid var(--primary-700, #2563eb);
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
}
.btn-sm-outline:hover { background: var(--primary-700, #2563eb); color: #fff; }

.btn-sm-danger {
  padding: 5px 12px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #fff;
  background: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.14s;
}
.btn-sm-danger:hover { opacity: 0.85; }

/* Cards */
.notif-cards { display: flex; flex-direction: column; gap: 0; }

.notif-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: #fff;
  border: 1px solid var(--gray-200, #e5e7eb);
  border-left: 4px solid transparent;
  margin-bottom: 8px;
  border-radius: var(--radius-md, 8px);
  transition: box-shadow 0.14s, border-color 0.14s;
}
.notif-card:hover { box-shadow: var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08)); }
.notif-card.unread {
  border-left-color: var(--primary-700, #2563eb);
  background: #f8faff;
}
.notif-card.selected { background: #eff6ff; border-color: #bfdbfe; }

.card-checkbox {
  margin-top: 2px;
  cursor: pointer;
}

.card-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #fff;
}
.cat-post { background: var(--primary-700, #2563eb); }
.cat-user { background: #7c3aed; }
.cat-system { background: var(--gray-500, #6b7280); }
.cat-review { background: #d97706; }
.cat-comment { background: #059669; }

.card-body { flex: 1; min-width: 0; }

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--gray-900, #111827);
}

.card-type-badge {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.type-info { background: #dbeafe; color: var(--primary-700, #2563eb); }
.type-success { background: #d1fae5; color: #065f46; }
.type-warning { background: #fef3c7; color: #92400e; }
.type-error { background: #fee2e2; color: #991b1b; }

.card-message {
  margin: 0 0 6px;
  font-size: 0.84rem;
  color: var(--gray-600, #4b5563);
  line-height: 1.5;
}

.card-meta {
  font-size: 0.75rem;
  color: var(--gray-400, #9ca3af);
}
.card-actor { font-weight: 500; color: var(--gray-500, #6b7280); }

.card-actions {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.read-btn { background: #d1fae5; color: #065f46; }
.read-btn:hover { background: #059669; color: #fff; }
.delete-btn { background: var(--gray-200, #e5e7eb); color: var(--gray-600, #4b5563); }
.delete-btn:hover { background: #fee2e2; color: #dc2626; }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 64px 24px;
  color: var(--gray-400, #9ca3af);
  text-align: center;
}
.empty-state p { margin: 0; font-size: 0.95rem; color: var(--gray-500, #6b7280); }

/* Load more */
.load-more {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Confirm dialog */
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.confirm-dialog {
  background: #fff;
  border-radius: var(--radius-md, 8px);
  padding: 28px 32px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.confirm-dialog h3 {
  margin: 0 0 10px;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--gray-900, #111827);
}
.confirm-dialog p {
  margin: 0 0 20px;
  font-size: 0.875rem;
  color: var(--gray-600, #4b5563);
  line-height: 1.5;
}
.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Transitions */
.bulk-bar-enter-active, .bulk-bar-leave-active { transition: all 0.2s ease; }
.bulk-bar-enter-from, .bulk-bar-leave-to { opacity: 0; transform: translateY(-8px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
