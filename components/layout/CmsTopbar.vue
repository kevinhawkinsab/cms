<template>
  <header class="topbar">
    <div class="topbar-left">
      <nav class="breadcrumb" aria-label="breadcrumb">
        <NuxtLink to="/dashboard" class="breadcrumb-link">Inicio</NuxtLink>
        <span class="breadcrumb-sep">/</span>
        <span
          v-for="(crumb, i) in breadcrumbs"
          :key="crumb.path"
          class="breadcrumb-item"
        >
          <NuxtLink v-if="i < breadcrumbs.length - 1" :to="crumb.path" class="breadcrumb-link">{{ crumb.label }}</NuxtLink>
          <span v-else class="breadcrumb-current">{{ crumb.label }}</span>
          <span v-if="i < breadcrumbs.length - 1" class="breadcrumb-sep">/</span>
        </span>
      </nav>
    </div>

    <div class="topbar-right">
      <CompanySwitcher />

      <div class="topbar-divider" />

      <div class="user-menu">
        <div class="user-avatar-sm">{{ initials }}</div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const initials = computed(() => {
  const name = authStore.userName
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
})

const routeLabels = {
  dashboard: 'Dashboard',
  posts: 'Publicaciones',
  categories: 'Categorías',
  media: 'Multimedia',
  pages: 'Páginas públicas',
  'page-builder': 'Page Builder',
  users: 'Usuarios',
}

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.map((seg, i) => ({
    label: routeLabels[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    path: '/' + segments.slice(0, i + 1).join('/'),
  }))
})
</script>

<style scoped>
.topbar {
  position: fixed;
  top: 0;
  left: var(--sidebar-width);
  right: 0;
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: var(--color-bg-topbar);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-topbar);
}

.topbar-left { display: flex; align-items: center; }

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-xs);
}
.breadcrumb-link { color: var(--color-text-muted); text-decoration: none; transition: color var(--transition-fast); }
.breadcrumb-link:hover { color: var(--color-primary); }
.breadcrumb-item { display: flex; align-items: center; gap: 6px; }
.breadcrumb-current { color: var(--color-text-primary); font-weight: 500; }
.breadcrumb-sep { color: var(--color-border); font-size: 0.9em; }

.topbar-right { display: flex; align-items: center; gap: 12px; }
.topbar-divider { width: 1px; height: 24px; background: var(--color-border); }

.user-avatar-sm {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}
</style>
