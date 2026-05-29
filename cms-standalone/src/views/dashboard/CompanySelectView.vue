<template>
  <div class="company-select">

    <div class="company-select__card">

      <div class="company-select__header">
        <div class="company-select__logo">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.9"/>
            <rect x="12" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="2" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="12" y="12" width="8" height="8" rx="2" fill="currentColor" opacity="0.3"/>
          </svg>
        </div>
        <div>
          <h1 class="company-select__title">Seleccionar empresa</h1>
          <p class="company-select__sub">Elige la empresa que deseas administrar en esta sesión.</p>
        </div>
      </div>

      <div class="company-grid">
        <button
          v-for="company in companies"
          :key="company.id"
          class="company-card"
          :class="{ selected: selectedId === company.id }"
          @click="selectAndContinue(company)"
        >
          <div class="company-card__icon" :style="{ background: company.color + '18', color: company.color }">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="6" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/>
              <path d="M6 6V5a4 4 0 0 1 8 0v1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M8 10h4M10 10v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="company-card__info">
            <span class="company-card__name">{{ company.name }}</span>
            <span class="company-card__desc">{{ company.description }}</span>
          </div>
          <div class="company-card__check" :class="{ visible: selectedId === company.id }">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" fill="currentColor" opacity="0.15"/>
              <path d="M4 7l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      <div class="company-select__actions">
        <button class="company-select__logout" @click="handleLogout">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9.5 9.5l3-2.5-3-2.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 7H5.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
            <path d="M5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/>
          </svg>
          Cerrar sesión
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { notify } from '@/services/notifications.js'

const router = useRouter()
const authStore = useAuthStore()

const selectedId = ref(authStore.selectedCompany?.id || null)

// Mock companies — replace with API call when multi-company backend is ready
const companies = ref([
  {
    id: 'bambito',
    name: 'Bambito Spring Water',
    description: 'Agua de manantial volcánica — Chiriquí, Panamá',
    color: '#2563eb'
  },
  {
    id: 'demo-corp',
    name: 'Demo Corporation',
    description: 'Empresa de demostración del sistema',
    color: '#16a34a'
  },
  {
    id: 'test-org',
    name: 'Test Organization',
    description: 'Organización de pruebas y desarrollo',
    color: '#9333ea'
  }
])

const selectAndContinue = (company) => {
  selectedId.value = company.id
  authStore.selectCompany(company)
  notify.success(`Empresa seleccionada: ${company.name}`)
  const redirect = router.currentRoute.value.query?.redirect
  router.push(redirect || '/dashboard/posts')
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.company-select {
  min-height: 100vh;
  background: var(--secondary-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: var(--font-sans);
}

.company-select__card {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 20px;
  padding: 36px;
  box-shadow: var(--shadow-lg);
}

.company-select__header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
}

.company-select__logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--primary-50);
  color: var(--primary-700);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(37,99,235,.15);
}

.company-select__title {
  font-size: 19px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0 0 4px;
  letter-spacing: -0.3px;
}
.company-select__sub {
  font-size: 13px;
  color: var(--gray-500);
  margin: 0;
  line-height: 1.4;
}

.company-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.company-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1.5px solid var(--gray-200);
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  font-family: var(--font-sans);
  width: 100%;
}
.company-card:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
}
.company-card.selected {
  border-color: var(--primary-700);
  background: var(--primary-50);
  box-shadow: 0 0 0 3px rgba(37,99,235,.08);
}

.company-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.company-card__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.company-card__name {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.company-card__desc {
  font-size: 12.5px;
  color: var(--gray-500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company-card__check {
  color: var(--primary-700);
  opacity: 0;
  transition: opacity 0.15s;
  flex-shrink: 0;
}
.company-card__check.visible { opacity: 1; }

.company-select__actions {
  display: flex;
  justify-content: center;
}

.company-select__logout {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: transparent;
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-500);
  cursor: pointer;
  transition: all 0.13s;
  font-family: var(--font-sans);
}
.company-select__logout:hover {
  background: var(--gray-50);
  border-color: var(--gray-300);
  color: var(--gray-700);
}
</style>
