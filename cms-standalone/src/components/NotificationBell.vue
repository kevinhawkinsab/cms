<template>
  <div class="notif-bell-wrap" ref="wrapRef">
    <!-- Bell button -->
    <button class="bell-btn" @click="togglePanel" :aria-label="`Notificaciones, ${notifStore.unreadCount} sin leer`">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
      <span v-if="notifStore.unreadCount > 0" class="badge">
        {{ notifStore.unreadCount > 99 ? '99+' : notifStore.unreadCount }}
      </span>
    </button>

    <!-- Dropdown panel -->
    <Transition name="panel-slide">
      <div v-if="isOpen" class="notif-panel" role="dialog" aria-label="Panel de notificaciones">
        <!-- Header -->
        <div class="panel-header">
          <span class="panel-title">Notificaciones</span>
          <button
            v-if="notifStore.unreadCount > 0"
            class="mark-all-btn"
            @click="notifStore.markAllAsRead()"
          >
            Marcar todas como leídas
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="notifStore.notifications.length === 0" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <p>Sin notificaciones nuevas</p>
        </div>

        <!-- Grouped list -->
        <div v-else class="notif-list">
          <template v-for="(group, label) in notifStore.groupedByDate" :key="label">
            <template v-if="group.length > 0">
              <div class="group-label">{{ label }}</div>
              <div
                v-for="notif in group"
                :key="notif.id"
                class="notif-item"
                :class="{ unread: !notif.read }"
                @click="handleItemClick(notif)"
              >
                <div class="notif-avatar" :class="`cat-${notif.category}`">
                  <component :is="categoryIcon(notif.category)" />
                </div>
                <div class="notif-body">
                  <p class="notif-title">{{ notif.title }}</p>
                  <p class="notif-message">{{ notif.message }}</p>
                  <span class="notif-time">{{ relativeTime(notif.createdAt) }}</span>
                </div>
                <span v-if="!notif.read" class="unread-dot" />
              </div>
            </template>
          </template>
        </div>

        <!-- Footer -->
        <div class="panel-footer">
          <button class="see-all-btn" @click="goToAll">Ver todas las notificaciones</button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, h } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationsStore } from '@/stores/notifications.js'

const notifStore = useNotificationsStore()
const router = useRouter()
const isOpen = ref(false)
const wrapRef = ref(null)

function togglePanel() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(e) {
  if (wrapRef.value && !wrapRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside, true))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside, true))

function handleItemClick(notif) {
  notifStore.markAsRead(notif.id)
  if (notif.link) {
    router.push(notif.link)
    isOpen.value = false
  }
}

function goToAll() {
  router.push('/dashboard/notifications')
  isOpen.value = false
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

// Inline SVG icon components per category
const PostIcon = () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
  h('polyline', { points: '14 2 14 8 20 8' }),
  h('line', { x1: 16, y1: 13, x2: 8, y2: 13 }),
  h('line', { x1: 16, y1: 17, x2: 8, y2: 17 }),
  h('polyline', { points: '10 9 9 9 8 9' })
])

const UserIcon = () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: 12, cy: 7, r: 4 })
])

const SystemIcon = () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: 12, cy: 12, r: 10 }),
  h('line', { x1: 12, y1: 8, x2: 12, y2: 12 }),
  h('line', { x1: 12, y1: 16, x2: '12.01', y2: 16 })
])

const ReviewIcon = () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('polyline', { points: '9 11 12 14 22 4' }),
  h('path', { d: 'M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' })
])

const CommentIcon = () => h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
])

const ICON_MAP = { post: PostIcon, user: UserIcon, system: SystemIcon, review: ReviewIcon, comment: CommentIcon }

function categoryIcon(cat) {
  return ICON_MAP[cat] || SystemIcon
}
</script>

<style scoped>
.notif-bell-wrap {
  position: relative;
  display: inline-flex;
}

.bell-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: var(--radius-md, 8px);
  color: var(--gray-600, #4b5563);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.bell-btn:hover {
  background: var(--gray-200, #e5e7eb);
  color: var(--gray-900, #111827);
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: #ef4444;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 2px solid #fff;
}

/* Panel */
.notif-panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 380px;
  max-height: 520px;
  background: #fff;
  border: 1px solid var(--gray-200, #e5e7eb);
  border-radius: var(--radius-md, 8px);
  box-shadow: var(--shadow-md, 0 4px 16px rgba(0,0,0,0.12));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  flex-shrink: 0;
}

.panel-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--gray-900, #111827);
  font-family: var(--font-sans, sans-serif);
}

.mark-all-btn {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--primary-700, #2563eb);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s;
}
.mark-all-btn:hover { opacity: 0.7; }

/* Empty state */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px 24px;
  color: var(--gray-400, #9ca3af);
  text-align: center;
}
.empty-state p {
  font-size: 0.875rem;
  margin: 0;
  color: var(--gray-500, #6b7280);
}

/* List */
.notif-list {
  overflow-y: auto;
  flex: 1;
}

.group-label {
  padding: 8px 16px 4px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--gray-400, #9ca3af);
  background: var(--gray-200, #e5e7eb);
  position: sticky;
  top: 0;
  z-index: 1;
}

.notif-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.12s;
  border-bottom: 1px solid var(--gray-200, #e5e7eb);
  position: relative;
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover { background: var(--gray-200, #e5e7eb); }
.notif-item.unread { background: #eff6ff; }
.notif-item.unread:hover { background: #dbeafe; }

.notif-avatar {
  width: 34px;
  height: 34px;
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

.notif-body {
  flex: 1;
  min-width: 0;
}

.notif-title {
  margin: 0 0 2px;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--gray-900, #111827);
  line-height: 1.3;
}

.notif-message {
  margin: 0 0 4px;
  font-size: 0.78rem;
  color: var(--gray-600, #4b5563);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notif-time {
  font-size: 0.7rem;
  color: var(--gray-400, #9ca3af);
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-700, #2563eb);
  flex-shrink: 0;
  margin-top: 6px;
}

/* Footer */
.panel-footer {
  border-top: 1px solid var(--gray-200, #e5e7eb);
  padding: 10px 16px;
  flex-shrink: 0;
  background: #fff;
}

.see-all-btn {
  width: 100%;
  padding: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-700, #2563eb);
  background: none;
  border: 1px solid var(--primary-700, #2563eb);
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.see-all-btn:hover {
  background: var(--primary-700, #2563eb);
  color: #fff;
}

/* Transition */
.panel-slide-enter-active {
  animation: panel-in 0.18s ease-out;
}
.panel-slide-leave-active {
  animation: panel-in 0.14s ease-in reverse;
}
@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
