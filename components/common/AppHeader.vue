<template>
  <header class="app-header" :class="{ 'is-scrolled': scrolled || !isHome }">
    <div class="header-shell">
      <div class="header-bar">
        <router-link to="/" class="brand-link" aria-label="Ir al inicio" @click="closeMobileMenu">
          <img src="/img/images/bambito-logo.png" class="brand-logo" alt="Bambito Agua de Manantial Volcánica" />
        </router-link>

        <div class="header-actions d-lg-none">
          <a href="https://portal.bambitospringwater.com/#/agua-de-manantial-embotellada"
            class="btn btn-sm btn-outline-brand rounded-pill px-3" target="_blank" rel="noopener noreferrer">
            Productos
          </a>

          <button type="button" class="menu-btn" :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
            aria-label="Abrir menú" @click="toggleMobileMenu">
            <span class="menu-icon"></span>
          </button>
        </div>

        <div class="desktop-nav d-none d-lg-flex">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.label" class="nav-item">
              <NuxtLink v-if="!item.external" :to="item.to" class="nav-link modern-link"
                :class="{ active: isActive(item) }">
                {{ item.label }}
              </NuxtLink>
              <a v-else :href="item.href" target="_blank" rel="noopener noreferrer" class="nav-link modern-link">
                {{ item.label }}
              </a>
            </li>

            <li class="nav-item ms-2">
              <a href="https://portal.bambitospringwater.com/#/login" class="btn btn-brand btn-sm rounded-pill px-4"
                target="_blank" rel="noopener noreferrer">
                Iniciar sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="mobileMenuOpen" class="drawer-overlay" @click="closeMobileMenu"></div>
    </transition>

    <transition name="slide">
      <aside v-if="mobileMenuOpen" class="mobile-drawer" role="dialog" aria-modal="true" aria-label="Menú móvil">
        <div class="drawer-top">
          <div class="drawer-brand">
            <img src="/img/images/bambito-logo.png" class="drawer-brand-logo" alt="Bambito" />
            <div class="drawer-brand-text">
              <strong>Bambito</strong>
              <span>Agua con origen</span>
            </div>
          </div>

          <button type="button" class="drawer-close" aria-label="Cerrar menú" @click="closeMobileMenu">
            ×
          </button>
        </div>

        <div class="drawer-card">
          <p class="drawer-kicker mb-1">Origen volcánico</p>
          <h6 class="drawer-title mb-2">Volcán Barú · Chiriquí</h6>
          <p class="drawer-copy mb-0">
            Agua de manantial con composición natural, perfil mineral equilibrado y origen protegido.
          </p>
        </div>

        <nav class="drawer-nav">
          <template v-for="item in navItems" :key="item.label">
            <NuxtLink v-if="!item.external" :to="item.to" class="drawer-link" :class="{ active: isActive(item) }"
              @click="closeMobileMenu">
              <span>{{ item.label }}</span>
              <small v-if="item.helper">{{ item.helper }}</small>
            </NuxtLink>
            <a v-else :href="item.href" target="_blank" rel="noopener noreferrer" class="drawer-link"
              @click="closeMobileMenu">
              <span>{{ item.label }}</span>
              <small v-if="item.helper">{{ item.helper }}</small>
            </a>
          </template>
        </nav>

        <div class="drawer-actions">
          <a href="https://portal.bambitospringwater.com/#/agua-de-manantial-embotellada"
            class="btn btn-brand w-100 rounded-pill py-2" target="_blank" rel="noopener noreferrer"
            @click="closeMobileMenu">
            Ver productos
          </a>

          <a href="https://portal.bambitospringwater.com/#/login"
            class="btn btn-outline-brand w-100 rounded-pill py-2 mt-2" target="_blank" rel="noopener noreferrer"
            @click="closeMobileMenu">
            Iniciar sesión
          </a>
        </div>
      </aside>
    </transition>
  </header>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const isHome = computed(() => route.path === '/')

const navItems = [
  { label: 'Inicio', to: '/', helper: 'Portada', external: false },
  { label: 'Origen', to: '/origen', helper: 'Agua con origen', external: false },
  { label: 'Nosotros', to: '/nosotros', helper: 'La marca', external: false },
  // {
  //   label: 'Productos',
  //   href: 'https://portal.bambitospringwater.com/#/agua-de-manantial-embotellada',
  //   helper: 'Catálogo',
  //   external: true
  // },
  { label: 'Catálogo', to: '/catalogo', helper: 'Noticias y media kit', external: false },
  { label: 'Reciclaje', to: '/sostenibilidad', helper: 'Compromiso', external: false },
  { label: 'Blog', to: '/blog', helper: 'Noticias y media kit', external: false },
  { label: 'Preguntas', to: '/faq', helper: 'Preguntas frecuentes', external: false },
  // { label: 'Contácto', to: '/contacto', helper: 'Contáctanos', external: false },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 24
}

const isActive = (item) => {
  if (item.external) return false
  if (item.to === '/') return route.path === '/'
  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu()
    handleScroll()
  }
)
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1050;
  width: 100%;
  overflow-x: clip;
  background: transparent;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.app-header.is-scrolled,
.app-header:not(.is-home) {
  /* background: rgba(255, 255, 255, 0.9); */
  backdrop-filter: blur(18px);
  box-shadow: 0 10px 30px rgba(18, 31, 22, 0.08);
}

.header-shell {
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  padding: 0.8rem 0.85rem;
}

.header-bar {
  min-height: 72px;
  padding: 0.65rem 0.9rem;
  border-radius: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: red;
  /* border: 1px solid rgba(24, 33, 27, 0.06);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 26px rgba(24, 33, 27, 0.05); */
}

.app-header.is-scrolled .header-bar,
.app-header:not(.is-home) .header-bar {
  background: rgba(255, 255, 255, 0.94);
}

.brand-link {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  text-decoration: none;
}

.brand-logo {
  display: block;
  width: 124px;
  height: auto;
  max-width: 100%;
  object-fit: contain;
}

.header-actions {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.menu-btn {
  width: 42px;
  height: 42px;
  border: 1px solid rgba(24, 33, 27, 0.08);
  border-radius: 50%;
  background: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 8px 18px rgba(24, 33, 27, 0.06);
  padding: 0;
}

.menu-icon {
  position: relative;
  width: 18px;
  height: 14px;
  display: inline-block;
}

.menu-icon::before,
.menu-icon::after,
.menu-icon {
  background: transparent;
}

.menu-icon::before,
.menu-icon::after {
  content: "";
  position: absolute;
  left: 0;
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: #18211b;
}

.menu-icon::before {
  top: 2px;
  box-shadow: 0 5px 0 #18211b;
}

.menu-icon::after {
  top: 12px;
}

.desktop-nav {
  margin-left: auto;
}

.nav-list {
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  display: flex;
}

.modern-link {
  padding: 0.78rem 1rem !important;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #18211b !important;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.modern-link:hover {
  background: rgba(134, 188, 66, 0.08);
  color: #4f7f1f !important;
}

.modern-link.active {
  background: rgba(134, 188, 66, 0.14);
  color: #365d14 !important;
  font-weight: 600;
}

.btn-brand,
.btn-outline-brand {
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.92rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.btn-brand {
  background: linear-gradient(135deg, #86bc42 0%, #709c39 100%);
  color: #fff;
  border: 0;
  box-shadow: 0 12px 24px rgba(112, 156, 57, 0.24);
}

.btn-brand:hover {
  transform: translateY(-1px);
  color: #fff;
  box-shadow: 0 16px 28px rgba(112, 156, 57, 0.3);
}

.btn-outline-brand {
  border: 1px solid rgba(134, 188, 66, 0.35);
  color: #365d14;
  background: rgba(255, 255, 255, 0.72);
}

.btn-outline-brand:hover {
  background: rgba(134, 188, 66, 0.12);
  color: #365d14;
}

.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 1060;
  background: rgba(9, 14, 11, 0.42);
  backdrop-filter: blur(4px);
}

.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1070;
  width: min(92vw, 390px);
  height: 100dvh;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.96);
  border-left: 1px solid rgba(24, 33, 27, 0.08);
  box-shadow: -18px 0 50px rgba(24, 33, 27, 0.14);
  backdrop-filter: blur(18px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.drawer-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.25rem;
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.drawer-brand-logo {
  width: 46px;
  height: 46px;
  object-fit: contain;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(24, 33, 27, 0.08);
  box-shadow: 0 8px 18px rgba(24, 33, 27, 0.06);
  padding: 5px;
}

.drawer-brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.drawer-brand-text strong {
  color: #18211b;
  font-size: 1rem;
}

.drawer-brand-text span {
  color: #6c766f;
  font-size: 0.8rem;
}

.drawer-close {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(24, 33, 27, 0.08);
  background: #fff;
  color: #18211b;
  font-size: 1.8rem;
  line-height: 1;
  display: grid;
  place-items: center;
}

.drawer-card {
  padding: 1rem;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(134, 188, 66, 0.12), rgba(134, 188, 66, 0.04));
  border: 1px solid rgba(134, 188, 66, 0.12);
}

.drawer-kicker {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: #6b766f;
}

.drawer-title {
  color: #18211b;
  font-weight: 600;
  font-size: 1rem;
}

.drawer-copy {
  color: #5b645d;
  line-height: 1.7;
  font-size: 0.94rem;
}

.drawer-nav {
  display: grid;
  gap: 0.7rem;
}

.drawer-link {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.95rem 1rem;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(24, 33, 27, 0.08);
  text-decoration: none;
  color: #18211b;
}

.drawer-link span {
  font-weight: 600;
  font-size: 0.98rem;
}

.drawer-link small {
  color: #6b766f;
  font-size: 0.82rem;
}

.drawer-link.active {
  background: rgba(134, 188, 66, 0.12);
  border-color: rgba(134, 188, 66, 0.22);
}

.drawer-actions {
  margin-top: auto;
  padding-top: 0.5rem;
  padding-bottom: 0.25rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.24s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(102%);
}

@media (max-width: 991.98px) {
  .header-shell {
    padding: 0.7rem 0.7rem;
  }

  .header-bar {
    min-height: 68px;
    padding: 0.6rem 0.75rem;
  }

  .brand-logo {
    width: 116px;
  }
}

@media (max-width: 575.98px) {
  .header-shell {
    padding-left: 0.55rem;
    padding-right: 0.55rem;
  }

  .header-bar {
    border-radius: 18px;
  }

  .brand-logo {
    width: 104px;
  }

  .mobile-drawer {
    width: 100vw;
    border-left: 0;
    padding-left: 0.9rem;
    padding-right: 0.9rem;
  }
}
</style>
