<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="sidebar-logo-mark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      </div>
      <div>
        <div class="sidebar-app-name">Valhalla CMS</div>
        <div class="sidebar-app-sub">Panel de administración</div>
      </div>
    </div>

    <!-- Nav -->
    <nav class="sidebar-nav">
      <div v-for="group in navGroups" :key="group.label" class="nav-group">
        <div class="nav-group-label">{{ group.label }}</div>
        <NuxtLink
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          class="nav-item"
          :class="{ active: isActive(item.to) }"
          v-show="!item.permission || hasPermission(item.permission)"
        >
          <span class="nav-icon" v-html="item.icon" />
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- User footer -->
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="user-avatar">{{ initials }}</div>
        <div class="user-info">
          <div class="user-name">{{ authStore.userName }}</div>
          <div class="user-role">{{ roleLabel }}</div>
        </div>
        <button class="logout-btn" @click="logout" title="Cerrar sesión">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { hasPermission } = usePermissions()

const initials = computed(() => {
  const name = authStore.userName
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
})

const roleLabels = {
  superadmin: 'Superadministrador',
  admin: 'Administrador',
  editor: 'Editor',
  contributor: 'Colaborador',
  viewer: 'Visualizador',
}
const roleLabel = computed(() => roleLabels[authStore.role] ?? authStore.role ?? '')

const navGroups = [
  {
    label: 'Contenido',
    items: [
      {
        to: '/dashboard',
        label: 'Dashboard',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
      },
      {
        to: '/posts',
        label: 'Publicaciones',
        permission: 'posts.read',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      },
      {
        to: '/categories',
        label: 'Categorías',
        permission: 'categories.read',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>',
      },
      {
        to: '/media',
        label: 'Multimedia',
        permission: 'media.read',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
      },
    ],
  },
  {
    label: 'Páginas',
    items: [
      {
        to: '/pages',
        label: 'Páginas públicas',
        permission: 'pages.read',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      },
      {
        to: '/page-builder',
        label: 'Page Builder',
        permission: 'pagebuilder.edit',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      },
    ],
  },
  {
    label: 'Administración',
    items: [
      {
        to: '/users',
        label: 'Usuarios',
        permission: 'users.read',
        icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      },
    ],
  },
]

function isActive(to) {
  if (to === '/dashboard') return route.path === '/dashboard'
  return route.path.startsWith(to)
}

async function logout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-sidebar);
  z-index: var(--z-sidebar);
  overflow: hidden;
}

.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 1.25rem 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}
.sidebar-logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--color-primary);
  color: white;
  flex-shrink: 0;
}
.sidebar-app-name {
  font-weight: 700;
  font-size: 0.875rem;
  color: #f1f5f9;
  line-height: 1.2;
}
.sidebar-app-sub {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.35);
  margin-top: 1px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem 0;
}
.nav-group { margin-bottom: 0.25rem; }
.nav-group-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.25);
  padding: 0.75rem 1rem 0.35rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.55rem 1rem;
  margin: 0 0.5rem;
  border-radius: var(--radius-md);
  color: rgba(255,255,255,0.55);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}
.nav-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.85); }
.nav-item.active { background: var(--color-primary); color: white; }
.nav-item.active .nav-icon { color: white; }

.nav-icon { display: flex; align-items: center; flex-shrink: 0; }
.nav-label { flex: 1; }
.nav-badge {
  background: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.7);
  border-radius: var(--radius-full);
  font-size: 0.7rem;
  padding: 0.1rem 0.5rem;
  font-weight: 600;
}

.sidebar-footer {
  border-top: 1px solid rgba(255,255,255,0.08);
  padding: 0.75rem;
  flex-shrink: 0;
}
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.5rem;
  border-radius: var(--radius-md);
  background: rgba(255,255,255,0.05);
}
.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}
.user-info { flex: 1; min-width: 0; }
.user-name { font-size: 0.8rem; font-weight: 600; color: #f1f5f9; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-role { font-size: 0.7rem; color: rgba(255,255,255,0.35); }

.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-md);
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  transition: all var(--transition-fast);
  flex-shrink: 0;
}
.logout-btn:hover { background: rgba(220,38,38,0.2); color: #f87171; }
</style>
