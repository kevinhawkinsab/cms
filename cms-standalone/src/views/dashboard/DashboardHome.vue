<template>
  <div class="dashboard-home">

    <div class="page-header">
      <div>
        <h1 class="page-header__title">Dashboard</h1>
        <p class="page-header__desc">Resumen general del sistema de contenido.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="refresh" :disabled="refreshing">
          <svg class="spin-on-load" :class="{ spin: refreshing }" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13.5 7.5A6 6 0 1 1 7.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 1.5v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Actualizar
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ overview.total }}</span>
          <span class="stat-chip__label">Publicaciones totales</span>
          {{ console.log(overview) }}
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon green">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ overview.published }}</span>
          <span class="stat-chip__label">Publicadas</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon gray">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.4"/><circle cx="7" cy="7" r="1.75" stroke="currentColor" stroke-width="1.4"/><path d="M2 2l10 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ overview.hidden }}</span>
          <span class="stat-chip__label">Ocultas</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon dark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="11" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ overview.categories }}</span>
          <span class="stat-chip__label">Categorías</span>
        </div>
      </div>
    </div>

    <!-- Quick access grid -->
    <div class="quick-grid">

      <router-link to="/dashboard/posts" class="quick-card" v-if="canReadPosts">
        <div class="quick-card__icon" style="background:#eff6ff;color:#2563eb">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M6 8h8M6 11h8M6 14h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </div>
        <div class="quick-card__info">
          <span class="quick-card__title">Publicaciones</span>
          <span class="quick-card__desc">Gestiona noticias y artículos</span>
        </div>
        <svg class="quick-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>

      <router-link to="/dashboard/categories" class="quick-card" v-if="canReadCategories">
        <div class="quick-card__icon" style="background:#f0fdf4;color:#16a34a">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h10M3 14h7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="16" cy="14" r="2.5" stroke="currentColor" stroke-width="1.3"/></svg>
        </div>
        <div class="quick-card__info">
          <span class="quick-card__title">Categorías</span>
          <span class="quick-card__desc">Organiza el contenido</span>
        </div>
        <svg class="quick-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>

      <router-link to="/dashboard/media" class="quick-card" v-if="canReadMedia">
        <div class="quick-card__icon" style="background:#faf5ff;color:#9333ea">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.4"/><circle cx="7.5" cy="7.5" r="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M3 13l4.5-4.5 3.5 3.5 2.5-2.5L17 13" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="quick-card__info">
          <span class="quick-card__title">Multimedia</span>
          <span class="quick-card__desc">Imágenes y documentos</span>
        </div>
        <svg class="quick-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>

      <router-link to="/dashboard/page-builder" class="quick-card" v-if="canEditPageBuilder">
        <div class="quick-card__icon" style="background:#fff7ed;color:#ea580c">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M14.5 11.5v6M11.5 14.5h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <div class="quick-card__info">
          <span class="quick-card__title">Page Builder</span>
          <span class="quick-card__desc">Constructor visual de páginas</span>
        </div>
        <svg class="quick-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>

      <router-link to="/dashboard/users" class="quick-card" v-if="canManageUsers">
        <div class="quick-card__icon" style="background:#f0f9ff;color:#0284c7">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3" stroke="currentColor" stroke-width="1.4"/><path d="M2 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M14 9.5h4M16 7.5v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <div class="quick-card__info">
          <span class="quick-card__title">Usuarios</span>
          <span class="quick-card__desc">Gestión de acceso al CMS</span>
        </div>
        <svg class="quick-card__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </router-link>

    </div>

    <!-- Company + User info -->
    <div class="info-row">
      <div class="info-card" v-if="selectedCompany">
        <div class="info-card__header">
          <div class="info-card__dot" :style="{ background: selectedCompany.color || '#2563eb' }"></div>
          <span class="info-card__title">Empresa activa</span>
        </div>
        <p class="info-card__value">{{ selectedCompany.name }}</p>
        <p class="info-card__sub">{{ selectedCompany.description }}</p>
        <router-link to="/select-company" class="info-card__link">Cambiar empresa →</router-link>
      </div>

      <div class="info-card" v-if="user">
        <div class="info-card__header">
          <div class="info-card__avatar">{{ userInitials }}</div>
          <span class="info-card__title">Usuario activo</span>
        </div>
        <p class="info-card__value">{{ user.fullName || user.firstName || user.email }}</p>
        <p class="info-card__sub">{{ user.role?.name || 'Sin rol asignado' }}</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useCmsStore } from '@/stores/cms.js'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const cmsStore = useCmsStore()

const { overview } = storeToRefs(cmsStore)
const user = computed(() => authStore.user)
const selectedCompany = computed(() => authStore.selectedCompany)
const refreshing = ref(false)

const userInitials = computed(() => {
  const name = user.value?.fullName || user.value?.firstName || 'A'
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
})

const canReadPosts = computed(() => authStore.hasAnyPermission(['posts.read','posts.create','posts.edit']))
const canReadCategories = computed(() => authStore.hasAnyPermission(['categories.read','categories.create','categories.edit']))
const canReadMedia = computed(() => authStore.hasAnyPermission(['media.read','media.upload']))
const canEditPageBuilder = computed(() => authStore.hasPermission('pagebuilder.edit'))
const canManageUsers = computed(() => authStore.hasAnyPermission(['users.manage','users.read']))

const refresh = async () => {
  refreshing.value = true
  try {
    await cmsStore.fetchOverview()
  } catch (e) {
    console.error(e)
  } finally {
    refreshing.value = false
  }
}

onMounted(() => {
  cmsStore.fetchOverview().catch(() => {})
})
</script>

<style scoped>
.dashboard-home {
  padding: 32px 28px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.quick-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  text-decoration: none;
  color: inherit;
  transition: all 0.15s;
}
.quick-card:hover {
  border-color: var(--primary-300);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.quick-card__icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.quick-card__info { flex: 1; min-width: 0; }
.quick-card__title { display: block; font-size: 14px; font-weight: 600; color: var(--gray-900); margin-bottom: 2px; }
.quick-card__desc { display: block; font-size: 12px; color: var(--gray-500); }
.quick-card__arrow { color: var(--gray-300); flex-shrink: 0; transition: transform 0.13s; }
.quick-card:hover .quick-card__arrow { transform: translateX(3px); color: var(--primary-700); }

.info-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}

.info-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 18px;
}
.info-card__header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.info-card__dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.info-card__avatar { width: 24px; height: 24px; border-radius: 50%; background: var(--primary-700); color: #fff; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.info-card__title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--gray-400); }
.info-card__value { font-size: 15px; font-weight: 650; color: var(--gray-900); margin: 0 0 4px; }
.info-card__sub { font-size: 12.5px; color: var(--gray-500); margin: 0 0 12px; }
.info-card__link { font-size: 12.5px; color: var(--primary-700); font-weight: 500; text-decoration: none; transition: color 0.13s; }
.info-card__link:hover { color: var(--primary-800); }
</style>
