<template>
  <div class="cms-dashboard">

    <!-- Mobile overlay -->
    <Transition name="overlay-fade">
      <div v-if="!sidebarCollapsed && isMobile" class="mobile-overlay" @click="sidebarCollapsed = true"></div>
    </Transition>

    <!-- ── Sidebar ── -->
    <aside class="cms-sidebar" :class="{ collapsed: sidebarCollapsed }">

      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="sidebar-logo__icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
            <rect x="12" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="2" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <div class="sidebar-logo__text">
          <span class="sidebar-logo__name">CMS Panel</span>
          <span class="sidebar-logo__version">Gestión de contenido</span>
        </div>
      </div>

      <!-- Company indicator -->
      <div v-if="selectedCompany" class="sidebar-company" @click="$router.push('/select-company')">
        <div class="sidebar-company__dot" :style="{ background: selectedCompany.color || '#2563eb' }"></div>
        <div class="sidebar-company__info">
          <span class="sidebar-company__name">{{ selectedCompany.name }}</span>
          <span class="sidebar-company__sub">Cambiar empresa</span>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" class="sidebar-company__arrow">
          <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav" aria-label="Navegación principal">

        <div class="sidebar-section-label">Contenido</div>
        <router-link
          v-if="canReadCategories"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard') }"
          to="/dashboard"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4.5h12M2 8h9M2 11.5h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="13" cy="11.5" r="2" stroke="currentColor" stroke-width="1.2"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Inicio</span>
        </router-link>
        <router-link
          v-if="canReadPosts"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/posts') }"
          to="/dashboard/posts"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M5 6h6M5 8.5h6M5 11h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Publicaciones</span>
        </router-link>

        <router-link
          v-if="canReadCategories"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/categories') }"
          to="/dashboard/categories"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4.5h12M2 8h9M2 11.5h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="13" cy="11.5" r="2" stroke="currentColor" stroke-width="1.2"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Categorías</span>
        </router-link>

        <router-link
          v-if="canReadMedia"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/media') }"
          to="/dashboard/media"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="6" cy="6.5" r="1.25" stroke="currentColor" stroke-width="1.2"/>
              <path d="M2 11l3.5-3.5 3 3 2-2 3.5 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Multimedia</span>
        </router-link>

        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">Usuarios y acceso</div>
        <router-link
          v-if="canManageUsers"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/users') }"
          to="/dashboard/users"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M1.5 13.5c0-2.485 2.015-4.5 4.5-4.5s4.5 2.015 4.5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M11 7.5h3M12.5 6v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Usuarios</span>
        </router-link>

        <router-link
          v-if="canManageUsers"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/roles') }"
          to="/dashboard/roles"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M5.5 8l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Roles y permisos</span>
        </router-link>

        <router-link
          v-if="canManageUsers"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/companies') }"
          to="/dashboard/companies"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="5" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.3"/>
              <path d="M5 5V4a3 3 0 0 1 6 0v1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M6 9h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Empresas</span>
        </router-link>

        <div class="sidebar-section-label">Herramientas</div>

        <router-link
          v-if="canEditPageBuilder"
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/page-builder') }"
          to="/dashboard/page-builder"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
              <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
              <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M11.75 9v5.5M9 11.75h5.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Page Builder</span>
          <span class="sidebar-link__badge">Pro</span>
        </router-link>

        <router-link
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/seo') }"
          to="/dashboard/seo"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M10.5 10.5l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">SEO</span>
        </router-link>

        <router-link
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/analytics') }"
          to="/dashboard/analytics"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 13l3-4 3 2 3-5 3 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Analytics</span>
        </router-link>

        <router-link
          class="sidebar-link"
          :class="{ active: isActive('/dashboard/audit-log') }"
          to="/dashboard/audit-log"
          @click="onNavClick"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M5 6h6M5 8.5h4M5 11h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Auditoría</span>
        </router-link>

      </nav>

      <!-- User footer -->
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user__avatar">{{ userInitials }}</div>
          <div class="sidebar-user__info">
            <span class="sidebar-user__name">{{ user?.fullName || user?.firstName || 'Admin' }}</span>
            <span class="sidebar-user__role">{{ role || '—' }}</span>
          </div>
          <button class="sidebar-user__logout" @click="handleLogout" aria-label="Cerrar sesión" title="Cerrar sesión">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M10 10.5l3-3-3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13 7.5H6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M6 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

    </aside>

    <!-- ── Main ── -->
    <main class="cms-main">

      <!-- Topbar -->
      <header class="cms-topbar">
        <div class="cms-topbar__left">
          <button class="topbar-menu-btn" @click="sidebarCollapsed = !sidebarCollapsed" aria-label="Menú">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <div class="cms-topbar__breadcrumb">
            <span class="cms-topbar__breadcrumb-root">CMS</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6l-3 3.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="cms-topbar__breadcrumb-current">{{ currentPageTitle }}</span>
          </div>
        </div>
        <div class="cms-topbar__right">
          <NotificationBell />
          <div class="topbar-user-pill">
            <div class="topbar-user-pill__avatar">{{ userInitials }}</div>
            <span class="topbar-user-pill__name">{{ user?.firstName || 'Admin' }}</span>
          </div>
          <button class="topbar-logout-btn" @click="handleLogout">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9.5 9.5l3-2.5-3-2.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 7H5.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
              <path d="M5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
            </svg>
            Salir
          </button>
        </div>
      </header>

      <!-- Access denied banner -->
      <Transition name="banner-slide">
        <div v-if="accessDenied" class="access-denied-banner" role="alert">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/>
            <path d="M7 4.5v3M7 9.5h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
          <span>No tienes permisos para acceder a <strong>{{ accessDenied }}</strong>.</span>
          <button class="access-denied-banner__close" @click="accessDenied = null" aria-label="Cerrar">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          </button>
        </div>
      </Transition>

      <!-- Page content -->
      <div class="cms-content">
        <router-view />
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useCmsStore } from '@/stores/cms.js'
import { confirmAction, notify } from '@/services/notifications.js'
import NotificationBell from '@/components/NotificationBell.vue'

const router = useRouter()
const route  = useRoute()
const authStore = useAuthStore()
const cmsStore  = useCmsStore()

const sidebarCollapsed = ref(false)
const isMobile = ref(false)
const accessDenied = ref(null)

const user = computed(() => authStore.user)
const role = computed(() => authStore.role)
const selectedCompany = computed(() => authStore.selectedCompany)

const userInitials = computed(() => {
  const name = user.value?.fullName || user.value?.firstName || 'A'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})

const canReadPosts       = computed(() => authStore.hasAnyPermission(['posts.read','posts.create','posts.edit','posts.delete','posts.publish']))
const canReadCategories  = computed(() => authStore.hasAnyPermission(['categories.read','categories.create','categories.edit','categories.delete']))
const canReadMedia       = computed(() => authStore.hasAnyPermission(['media.read','media.upload','media.delete']))
const canEditPageBuilder = computed(() => authStore.hasPermission('pagebuilder.edit'))
const canManageUsers     = computed(() => authStore.hasAnyPermission(['users.manage','users.read']))

const currentPageTitle = computed(() => {
  const map = {
    'Posts': 'Publicaciones',
    'Categories': 'Categorías',
    'Media': 'Multimedia',
    'PageBuilder': 'Page Builder',
    'Users': 'Usuarios',
    'Roles': 'Roles y Permisos',
    'Companies': 'Empresas',
    'AuditLog': 'Auditoría',
    'Seo': 'SEO Manager',
    'Analytics': 'Analytics',
    'Notifications': 'Notificaciones',
    'Dashboard': 'Dashboard'
  }
  return map[route.name] || 'Panel'
})

const isActive = (path) => route.path.startsWith(path)

const onNavClick = () => {
  if (isMobile.value) sidebarCollapsed.value = true
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 992
  sidebarCollapsed.value = isMobile.value
}

watch(
  () => route.query.denied,
  (denied) => {
    if (denied) {
      accessDenied.value = denied
      notify.warning(`Acceso denegado al permiso "${denied}"`)
      const { denied: _d, ...rest } = route.query
      router.replace({ query: rest })
    }
  },
  { immediate: true }
)

const handleLogout = async () => {
  const ok = await confirmAction({
    title: '¿Cerrar sesión?',
    text: 'Terminarás tu sesión en el CMS.',
    icon: 'question',
    confirmButtonText: 'Cerrar sesión',
    confirmButtonColor: '#dc3545'
  })
  if (!ok) return
  await authStore.logout()
  notify.success('Sesión cerrada correctamente.')
  router.push('/login')
}

onMounted(async () => {
  checkMobile()
  window.addEventListener('resize', checkMobile)

  try {
    const settle = (p) => p.then(v => ({ status: 'fulfilled', v })).catch(r => ({ status: 'rejected', r }))
    const tasks = []
    if (canReadPosts.value)      tasks.push(cmsStore.fetchPosts({ page: 1, limit: 12 }))
    if (canReadCategories.value) tasks.push(cmsStore.fetchCategories())
    if (canReadMedia.value)      tasks.push(cmsStore.fetchMedia())
    await Promise.all(tasks.map(settle))
  } catch (e) { console.error('Error loading CMS data:', e) }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.cms-dashboard {
  display: flex;
  min-height: 100vh;
  font-family: var(--font-sans);
  background: var(--secondary-100);
}

/* Mobile overlay */
.mobile-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.38); z-index: 99;
}
.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity .25s; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }

/* Sidebar */
.cms-sidebar {
  width: var(--sidebar-w);
  background: #0f172a;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: transform .28s cubic-bezier(.4,0,.2,1), width .28s cubic-bezier(.4,0,.2,1);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}
@media (max-width: 991px) {
  .cms-sidebar { position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; }
  .cms-sidebar.collapsed { transform: translateX(-100%); }
}
@media (min-width: 992px) {
  .cms-sidebar.collapsed { width: 0; }
}

/* Logo */
.sidebar-logo {
  display: flex; align-items: center; gap: 11px;
  padding: 18px 18px 16px;
  border-bottom: 1px solid rgba(255,255,255,.07);
}
.sidebar-logo__icon {
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--primary-700);
  display: flex; align-items: center; justify-content: center;
  color: #fff; flex-shrink: 0;
}
.sidebar-logo__text { display: flex; flex-direction: column; gap: 1px; }
.sidebar-logo__name { font-size: 13.5px; font-weight: 700; color: rgba(255,255,255,.92); white-space: nowrap; }
.sidebar-logo__version { font-size: 10px; color: rgba(255,255,255,.3); font-weight: 500; }

/* Company */
.sidebar-company {
  display: flex; align-items: center; gap: 9px;
  margin: 10px 10px 2px;
  padding: 9px 12px;
  border-radius: 8px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.08);
  cursor: pointer;
  transition: background .15s;
}
.sidebar-company:hover { background: rgba(255,255,255,.08); }
.sidebar-company__dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.sidebar-company__info { flex: 1; min-width: 0; }
.sidebar-company__name { display: block; font-size: 12px; font-weight: 600; color: rgba(255,255,255,.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-company__sub { display: block; font-size: 10.5px; color: rgba(255,255,255,.35); }
.sidebar-company__arrow { color: rgba(255,255,255,.3); flex-shrink: 0; }

/* Nav */
.sidebar-nav { flex: 1; padding: 12px 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
.sidebar-nav::-webkit-scrollbar { width: 3px; }
.sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 2px; }

.sidebar-section-label {
  font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.28); padding: 5px 10px 3px; margin-top: 4px;
}
.sidebar-divider { height: 1px; background: rgba(255,255,255,.07); margin: 6px 10px; }

.sidebar-link {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px;
  color: rgba(255,255,255,.55); font-size: 13.5px; font-weight: 500;
  text-decoration: none; transition: all .15s; cursor: pointer;
  position: relative;
}
.sidebar-link:hover { background: rgba(255,255,255,.07); color: rgba(255,255,255,.85); }
.sidebar-link.active {
  background: rgba(37,99,235,.25);
  color: #93c5fd;
  font-weight: 600;
}
.sidebar-link.active::before {
  content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
  width: 3px; border-radius: 0 3px 3px 0; background: var(--primary-600);
}
.sidebar-link__icon { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; opacity: .75; }
.sidebar-link.active .sidebar-link__icon { opacity: 1; }
.sidebar-link__label { flex: 1; white-space: nowrap; overflow: hidden; }
.sidebar-link__badge {
  font-size: 9.5px; font-weight: 700; letter-spacing: .04em;
  padding: 2px 7px; border-radius: 99px;
  background: rgba(37,99,235,.2); color: #93c5fd;
  border: 1px solid rgba(37,99,235,.25);
}

/* User footer */
.sidebar-footer { border-top: 1px solid rgba(255,255,255,.07); padding: 10px; }
.sidebar-user { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; transition: background .15s; }
.sidebar-user:hover { background: rgba(255,255,255,.05); }
.sidebar-user__avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--primary-700); color: #fff;
  font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sidebar-user__info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.sidebar-user__name { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,.88); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-user__role { font-size: 11px; color: rgba(255,255,255,.35); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-user__logout {
  width: 28px; height: 28px; border-radius: 6px; border: none;
  background: transparent; cursor: pointer;
  color: rgba(255,255,255,.35); display: flex; align-items: center; justify-content: center;
  transition: all .13s; flex-shrink: 0;
}
.sidebar-user__logout:hover { background: rgba(239,68,68,.2); color: #fca5a5; }

/* Main */
.cms-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }

/* Topbar */
.cms-topbar {
  height: var(--topbar-h);
  background: #fff;
  border-bottom: 1px solid var(--gray-200);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px 0 12px;
  position: sticky; top: 0; z-index: 50;
  box-shadow: var(--shadow-sm);
}
.cms-topbar__left { display: flex; align-items: center; gap: 12px; }

.topbar-menu-btn {
  width: 34px; height: 34px; border-radius: 8px; border: none;
  background: transparent; cursor: pointer; color: var(--gray-600);
  display: flex; align-items: center; justify-content: center; transition: all .13s;
}
.topbar-menu-btn:hover { background: var(--gray-100); color: var(--gray-900); }

.cms-topbar__breadcrumb { display: flex; align-items: center; gap: 6px; }
.cms-topbar__breadcrumb-root { font-size: 12.5px; color: var(--gray-400); font-weight: 500; }
.cms-topbar__breadcrumb svg { color: var(--gray-300); }
.cms-topbar__breadcrumb-current { font-size: 14px; font-weight: 650; color: var(--gray-900); }

.cms-topbar__right { display: flex; align-items: center; gap: 10px; }

.topbar-user-pill {
  display: flex; align-items: center; gap: 8px;
  padding: 5px 12px 5px 6px;
  border: 1px solid var(--gray-200);
  border-radius: 99px;
  font-size: 12.5px; color: var(--gray-700);
}
.topbar-user-pill__avatar {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--primary-700); color: #fff;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.topbar-user-pill__name { font-weight: 500; }

.topbar-logout-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 13px; border-radius: 8px;
  border: 1px solid var(--gray-200); background: transparent;
  font-size: 12.5px; font-weight: 500; color: var(--gray-600);
  cursor: pointer; transition: all .13s; font-family: var(--font-sans);
}
.topbar-logout-btn:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }

/* Access denied */
.access-denied-banner {
  display: flex; align-items: center; gap: 10px;
  margin: 16px 20px 0;
  padding: 11px 16px;
  background: var(--warning-50); border: 1px solid #fcd34d;
  border-radius: 10px; font-size: 13.5px; color: #92400e;
}
.access-denied-banner__close {
  margin-left: auto; background: none; border: none; cursor: pointer;
  color: #b45309; display: flex; align-items: center; padding: 2px; border-radius: 4px;
}
.banner-slide-enter-active, .banner-slide-leave-active { transition: all .22s cubic-bezier(.4,0,.2,1); }
.banner-slide-enter-from, .banner-slide-leave-to { opacity: 0; transform: translateY(-8px); }

/* Content */
.cms-content { flex: 1; overflow-x: hidden; }
</style>
