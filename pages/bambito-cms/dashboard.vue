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
        <img src="/img/images/bambito-logo.png" alt="Bambito CMS" class="sidebar-logo__img">
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav" aria-label="Navegación principal">

        <div class="sidebar-section-label">Contenido</div>

        <a
          v-if="canReadPosts"
          class="sidebar-link"
          :class="{ active: activeTab === 'posts' }"
          href="#posts"
          @click.prevent="setTab('posts')"
          data-testid="nav-posts"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M5 6h6M5 8.5h6M5 11h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Publicaciones</span>
        </a>

        <a
          v-if="canReadCategories"
          class="sidebar-link"
          :class="{ active: activeTab === 'categories' }"
          href="#categories"
          @click.prevent="setTab('categories')"
          data-testid="nav-categories"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4.5h12M2 8h9M2 11.5h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="13" cy="11.5" r="2" stroke="currentColor" stroke-width="1.2"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Categorías</span>
        </a>

        <a
          v-if="canReadMedia"
          class="sidebar-link"
          :class="{ active: activeTab === 'media' }"
          href="#media"
          @click.prevent="setTab('media')"
          data-testid="nav-media"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="6" cy="6.5" r="1.25" stroke="currentColor" stroke-width="1.2"/>
              <path d="M2 11l3.5-3.5 3 3 2-2 3.5 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Multimedia</span>
        </a>

        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">Herramientas</div>

        <router-link
          v-if="canEditPageBuilder"
          class="sidebar-link"
          to="/bambito-cms/page-builder"
          data-testid="nav-page-builder"
        >
          <span class="sidebar-link__icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L10 5l4 .5-3 2.5.5 4L8 10l-3.5 2 .5-4L2 5.5 6 5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="sidebar-link__label">Page Builder</span>
          <span class="sidebar-link__badge">Nuevo</span>
        </router-link>

      </nav>

      <!-- User footer -->
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="sidebar-user__avatar">
            {{ userInitials }}
          </div>
          <div class="sidebar-user__info">
            <span class="sidebar-user__name">{{ user?.fullName || user?.firstName || 'Admin' }}</span>
            <span class="sidebar-user__role">{{ role || '—' }}</span>
          </div>
          <button class="sidebar-user__logout" @click="handleLogout" data-testid="sidebar-logout" aria-label="Cerrar sesión" title="Cerrar sesión">
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
            <span class="cms-topbar__breadcrumb-current">{{ headerTitle }}</span>
          </div>
        </div>
        <div class="cms-topbar__right">
          <button class="topbar-logout-btn" @click="handleLogout" data-testid="header-logout">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9.5 9.5l3-2.5-3-2.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.5 7H5.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
              <path d="M5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
            </svg>
            Cerrar sesión
          </button>
        </div>
      </header>

      <!-- Content -->
      <div class="cms-content">

        <!-- Access denied banner -->
        <Transition name="banner-slide">
          <div v-if="accessDenied" class="access-denied-banner" role="alert">
            <span class="access-denied-banner__icon">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/>
                <path d="M7 4.5v3M7 9.5h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              </svg>
            </span>
            <span>No tienes permisos para acceder a <strong>{{ accessDenied }}</strong>. Contacta a un administrador.</span>
            <button class="access-denied-banner__close" @click="accessDenied = null" aria-label="Cerrar">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
          </div>
        </Transition>

        <!-- Tab views -->
        <div v-if="activeTab === 'posts' && canReadPosts">
          <PostsManager />
        </div>
        <div v-if="activeTab === 'categories' && canReadCategories">
          <CategoriesManager />
        </div>
        <div v-if="activeTab === 'media' && canReadMedia">
          <MediaManager />
        </div>

      </div>
    </main>

  </div>
</template>

<script setup>
definePageMeta({ layout: 'cms', middleware: 'auth' })

import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCmsStore } from '~/stores/cms'
import { confirmAction, notify } from '~/services/notifications'
import PostsManager from '~/components/cms/PostsManager.vue'
import CategoriesManager from '~/components/cms/CategoriesManager.vue'
import MediaManager from '~/components/cms/MediaManager.vue'

const router = useRouter()
const route  = useRoute()
const authStore = useAuthStore()
const cmsStore  = useCmsStore()

const sidebarCollapsed = ref(false)
const activeTab  = ref('posts')
const isMobile   = ref(false)
const accessDenied = ref(null)

const user = computed(() => authStore.user)
const role = computed(() => authStore.role)

const userInitials = computed(() => {
  const name = user.value?.fullName || user.value?.firstName || 'A'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})

const canReadPosts       = computed(() => authStore.hasAnyPermission(['posts.read','posts.create','posts.edit','posts.delete','posts.publish']))
const canReadCategories  = computed(() => authStore.hasAnyPermission(['categories.read','categories.create','categories.edit','categories.delete']))
const canReadMedia       = computed(() => authStore.hasAnyPermission(['media.read','media.upload','media.delete']))
const canEditPageBuilder = computed(() => authStore.hasPermission('pagebuilder.edit'))

const headerTitle = computed(() => ({
  posts:      'Publicaciones',
  categories: 'Categorías',
  media:      'Multimedia'
}[activeTab.value] || 'Panel CMS'))

const setTab = (tab) => {
  activeTab.value = tab
  if (isMobile.value) sidebarCollapsed.value = true
}

const selectDefaultTab = () => {
  if (canReadPosts.value)       activeTab.value = 'posts'
  else if (canReadCategories.value) activeTab.value = 'categories'
  else if (canReadMedia.value)  activeTab.value = 'media'
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 992
  if (isMobile.value) sidebarCollapsed.value = true
  else sidebarCollapsed.value = false
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
  router.push('/bambito-cms')
}

onMounted(async () => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  selectDefaultTab()

  try {
    const settle = (p) => p.then(v => ({ status:'fulfilled', v })).catch(r => ({ status:'rejected', r }))
    const tasks = []
    if (canReadPosts.value)      tasks.push(cmsStore.fetchPosts({ page:1, limit:12 }))
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
/* ─── Tokens ─── */
.cms-dashboard {
  --green-800: #1A4F3A;
  --green-700: #1f6347;
  --green-600: #2E8B57;
  --green-100: #e1f0e8;
  --green-50:  #f0faf4;
  --sidebar-w: 232px;
  --topbar-h:  54px;
  --gray-900: #111827;
  --gray-800: #1f2937;
  --gray-600: #4b5563;
  --gray-400: #9ca3af;
  --gray-300: #d1d5db;
  --gray-200: #e5e7eb;
  --gray-100: #f3f4f6;
  --gray-50:  #f9fafb;
  --red-500:  #ef4444;
  --amber-400: #fbbf24;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  min-height: 100vh;
  font-family: var(--font-sans);
  background: var(--gray-100);
}

/* ─── Mobile overlay ─── */
.mobile-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,.38); z-index: 99;
}
.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity .25s; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }

/* ─── Sidebar ─── */
.cms-sidebar {
  width: var(--sidebar-w);
  background: var(--green-800);
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
  .cms-sidebar {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
  }
  .cms-sidebar.collapsed { transform: translateX(-100%); }
}
@media (min-width: 992px) {
  .cms-sidebar.collapsed { width: 0; }
}

/* Logo */
.sidebar-logo {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 18px 14px;
  border-bottom: 1px solid rgba(255,255,255,.1);
}
.sidebar-logo__img { height: 36px; width: auto; object-fit: contain; filter: brightness(0) invert(1); }
.sidebar-logo__label {
  font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
  color: rgba(255,255,255,.4); padding: 2px 7px; border: 1px solid rgba(255,255,255,.15);
  border-radius: 99px;
}

/* Nav */
.sidebar-nav { flex: 1; padding: 14px 10px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
.sidebar-nav::-webkit-scrollbar { width: 4px; }
.sidebar-nav::-webkit-scrollbar-track { background: transparent; }
.sidebar-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,.15); border-radius: 2px; }

.sidebar-section-label {
  font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(255,255,255,.35); padding: 6px 10px 4px; margin-top: 2px;
}
.sidebar-divider { height: 1px; background: rgba(255,255,255,.1); margin: 8px 10px; }

.sidebar-link {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px;
  color: rgba(255,255,255,.65); font-size: 13.5px; font-weight: 500;
  text-decoration: none; transition: all .15s; cursor: pointer;
  position: relative;
}
.sidebar-link:hover { background: rgba(255,255,255,.08); color: rgba(255,255,255,.9); }
.sidebar-link.active {
  background: rgba(255,255,255,.13);
  color: #fff;
  font-weight: 600;
}
.sidebar-link.active::before {
  content: ''; position: absolute; left: 0; top: 20%; bottom: 20%;
  width: 3px; border-radius: 0 3px 3px 0; background: #fff;
}
.sidebar-link__icon { width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; opacity: .8; }
.sidebar-link.active .sidebar-link__icon { opacity: 1; }
.sidebar-link__label { flex: 1; white-space: nowrap; overflow: hidden; }
.sidebar-link__badge {
  font-size: 9.5px; font-weight: 700; letter-spacing: .04em;
  padding: 2px 7px; border-radius: 99px;
  background: rgba(143,217,182,.2); color: #8fd9b6;
  border: 1px solid rgba(143,217,182,.25);
}

/* User footer */
.sidebar-footer {
  border-top: 1px solid rgba(255,255,255,.1);
  padding: 12px 10px;
}
.sidebar-user { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px; transition: background .15s; }
.sidebar-user:hover { background: rgba(255,255,255,.06); }
.sidebar-user__avatar {
  width: 32px; height: 32px; border-radius: 50%;
  background: rgba(255,255,255,.15);
  color: rgba(255,255,255,.9); font-size: 12px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  letter-spacing: .02em;
}
.sidebar-user__info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
.sidebar-user__name { font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-user__role { font-size: 11px; color: rgba(255,255,255,.4); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sidebar-user__logout {
  width: 28px; height: 28px; border-radius: 6px; border: none;
  background: transparent; cursor: pointer;
  color: rgba(255,255,255,.4); display: flex; align-items: center; justify-content: center;
  transition: all .13s; flex-shrink: 0;
}
.sidebar-user__logout:hover { background: rgba(239,68,68,.2); color: #fca5a5; }

/* ─── Main ─── */
.cms-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }

/* Topbar */
.cms-topbar {
  height: var(--topbar-h);
  background: #fff;
  border-bottom: 1px solid var(--gray-200);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px 0 12px;
  position: sticky; top: 0; z-index: 50;
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

.topbar-logout-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 13px; border-radius: 8px;
  border: 1px solid var(--gray-200); background: transparent;
  font-size: 12.5px; font-weight: 500; color: var(--gray-600);
  cursor: pointer; transition: all .13s; font-family: var(--font-sans);
}
.topbar-logout-btn:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }

/* Content */
.cms-content { flex: 1; overflow-x: hidden; }

/* Access denied banner */
.access-denied-banner {
  display: flex; align-items: center; gap: 10px;
  margin: 20px 20px 0;
  padding: 12px 16px;
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 10px;
  font-size: 13.5px;
  color: #92400e;
}
.access-denied-banner__icon { color: var(--amber-400); display: flex; align-items: center; flex-shrink: 0; }
.access-denied-banner strong { font-weight: 650; }
.access-denied-banner__close {
  margin-left: auto; background: none; border: none; cursor: pointer;
  color: #b45309; display: flex; align-items: center; padding: 2px; border-radius: 4px; transition: color .13s;
}
.access-denied-banner__close:hover { color: #92400e; }

.banner-slide-enter-active, .banner-slide-leave-active { transition: all .22s cubic-bezier(.4,0,.2,1); }
.banner-slide-enter-from, .banner-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>