<template>
  <div class="companies-view">

    <!-- Page header -->
    <div class="page-header">
      <div class="page-header__left">
        <h1 class="page-header__title">Empresas</h1>
        <p class="page-header__desc">Gestiona las empresas y sus configuraciones de acceso, planes y almacenamiento.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="refreshCompanies">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13.5 7.5A6 6 0 1 1 7.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 1.5v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Actualizar
        </button>
        <button class="btn-primary" @click="openPanel()">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 2v11M2 7.5h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>
          Nueva empresa
        </button>
      </div>
    </div>

    <!-- Stats row -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M4 5h6M4 7.5h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ companies.length }}</span>
          <span class="stat-chip__label">Total empresas</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon green">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ activeCount }}</span>
          <span class="stat-chip__label">Activas</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon dark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="5" cy="4" r="2" stroke="currentColor" stroke-width="1.3"/><path d="M1 11c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M10 6l2 2M12 6l-2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ totalUsers }}</span>
          <span class="stat-chip__label">Usuarios totales</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon gray">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 4V3a2 2 0 0 1 4 0v1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ totalStorage }} GB</span>
          <span class="stat-chip__label">Almacenamiento usado</span>
        </div>
      </div>
    </div>

    <!-- Companies grid -->
    <div class="companies-grid" :class="{ 'companies-grid--split': showPanel }">

      <!-- Cards container -->
      <div>
        <div v-if="companies.length === 0" class="empty-state">
          <div class="empty-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M9 10h10M9 14h10M9 18h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <p class="empty-title">No hay empresas registradas</p>
          <p class="empty-desc">Crea la primera empresa para comenzar a gestionar accesos.</p>
          <button class="btn-primary btn-primary--sm" @click="openPanel()">Crear empresa</button>
        </div>

        <div v-else class="cards-grid">
          <div v-for="company in companies" :key="company.id" class="company-card">

            <!-- Card header -->
            <div class="company-card__header">
              <div class="company-card__identity">
                <span class="company-color-dot" :style="{ background: company.color }"></span>
                <div class="company-card__logo-wrap">
                  <img v-if="company.logoUrl" :src="company.logoUrl" :alt="company.name" class="company-card__logo">
                  <div v-else class="company-card__logo-fallback" :style="{ background: company.color + '22', color: company.color }">
                    {{ company.name.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div class="company-card__title-area">
                  <h3 class="company-card__name">{{ company.name }}</h3>
                  <span v-if="company.domain" class="company-card__domain">{{ company.domain }}</span>
                </div>
              </div>
              <div class="company-card__badges">
                <span class="plan-badge" :class="`plan-badge--${company.plan.toLowerCase()}`">{{ company.plan }}</span>
                <div class="bsw-toggle" @click.stop>
                  <input :id="`toggle-${company.id}`" v-model="company.active" type="checkbox" class="bsw-toggle__input" @change="onToggleActive(company)">
                  <span class="bsw-toggle__track"><span class="bsw-toggle__thumb"></span></span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <p class="company-card__desc">{{ company.description || 'Sin descripción.' }}</p>

            <!-- Stats -->
            <div class="company-card__stats">
              <div class="company-stat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M2 10c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                <span>{{ company.usersCount }} usuarios</span>
              </div>
              <div class="company-stat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M3 4.5h6M3 6.5h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                <span>{{ company.postsCount }} publicaciones</span>
              </div>
              <div class="company-stat">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="3" width="8" height="7" rx="1.2" stroke="currentColor" stroke-width="1.2"/><path d="M4 3V2a2 2 0 0 1 4 0v1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                <span>{{ company.storageMb }} MB</span>
              </div>
            </div>

            <!-- Status row -->
            <div class="company-card__status-row">
              <span class="status-badge" :class="company.active ? 'status-badge--published' : 'status-badge--hidden'">
                <span class="status-badge__dot"></span>
                {{ company.active ? 'Activa' : 'Inactiva' }}
              </span>
              <span class="company-card__limits">
                Max {{ company.maxUsers }} usuarios · {{ company.maxStorage }} GB
              </span>
            </div>

            <!-- Delete confirmation overlay -->
            <Transition name="fade">
              <div v-if="confirmingDeleteId === company.id" class="delete-confirm-overlay">
                <div class="delete-confirm-box">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.5" stroke="#dc2626" stroke-width="1.5"/><path d="M10 6v4.5M10 13h.01" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"/></svg>
                  <p class="delete-confirm-text">¿Seguro? Esto eliminará todos los datos de la empresa.</p>
                  <div class="delete-confirm-actions">
                    <button class="btn-ghost btn-ghost--sm" @click="confirmingDeleteId = null">Cancelar</button>
                    <button class="btn-danger-sm" @click="deleteCompany(company.id)">Sí, eliminar</button>
                  </div>
                </div>
              </div>
            </Transition>

            <!-- Card actions -->
            <div class="company-card__actions">
              <button class="action-btn action-btn--edit" @click="openPanel(company)">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M9.5 2L11 3.5 4 10.5l-2 .5.5-2 7-7z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Editar
              </button>
              <button class="action-btn action-btn--builder" @click="manageUsers(company)">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="4.5" cy="4" r="2" stroke="currentColor" stroke-width="1.2"/><path d="M1 11c0-1.93 1.57-3.5 3.5-3.5S8 9.07 8 11" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M10 6.5l1.5 1.5M11.5 6.5L10 8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                Gestionar usuarios
              </button>
              <button class="action-btn action-btn--delete" @click="requestDelete(company.id)">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M3 3.5l.75 7h5.5L10 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Eliminar
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- Side panel -->
      <Transition name="slide-right">
        <div v-if="showPanel" class="assign-panel">
          <div class="assign-panel__header">
            <h2 class="assign-panel__title">{{ editingCompany ? 'Editar empresa' : 'Nueva empresa' }}</h2>
            <button class="assign-panel__close" @click="closePanel" aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>

          <div class="panel-body">

            <!-- Name -->
            <div class="form-group">
              <label class="field-label">Nombre <span class="field-required">*</span></label>
              <input v-model.trim="form.name" type="text" class="field-input" placeholder="Nombre de la empresa" required>
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="field-label">Descripción</label>
              <textarea v-model.trim="form.description" class="field-input field-textarea" rows="3" placeholder="Breve descripción de la empresa..."></textarea>
            </div>

            <!-- Color -->
            <div class="form-group">
              <label class="field-label">Color de marca</label>
              <div class="color-row">
                <input type="color" v-model="form.color" class="color-swatch-input" :style="{ background: form.color }">
                <input v-model="form.color" type="text" class="field-input" placeholder="#2563eb" style="flex:1">
                <span class="color-preview" :style="{ background: form.color }"></span>
              </div>
            </div>

            <!-- Logo URL -->
            <div class="form-group">
              <label class="field-label">Logo URL</label>
              <input v-model.trim="form.logoUrl" type="url" class="field-input" placeholder="https://...">
              <div v-if="form.logoUrl" class="logo-preview-wrap">
                <img :src="form.logoUrl" alt="Logo preview" class="logo-preview-img" @error="form.logoUrl = ''">
              </div>
            </div>

            <!-- Plan -->
            <div class="form-group">
              <label class="field-label">Plan</label>
              <div class="plan-options">
                <label v-for="plan in plans" :key="plan.id" class="plan-option" :class="{ selected: form.plan === plan.id }">
                  <input type="radio" :value="plan.id" v-model="form.plan" class="plan-option__radio">
                  <div class="plan-option__content">
                    <div class="plan-option__header">
                      <span class="plan-option__name">{{ plan.label }}</span>
                      <span class="plan-badge" :class="`plan-badge--${plan.id.toLowerCase()}`">{{ plan.label }}</span>
                    </div>
                    <ul class="plan-features">
                      <li v-for="feat in plan.features" :key="feat">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        {{ feat }}
                      </li>
                    </ul>
                  </div>
                  <div class="plan-option__check" v-if="form.plan === plan.id">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                </label>
              </div>
            </div>

            <!-- Max users -->
            <div class="form-row">
              <div class="form-group">
                <label class="field-label">Máx. usuarios</label>
                <input v-model.number="form.maxUsers" type="number" min="1" class="field-input" placeholder="10">
              </div>
              <div class="form-group">
                <label class="field-label">Almacenamiento (GB)</label>
                <input v-model.number="form.maxStorage" type="number" min="1" class="field-input" placeholder="5">
              </div>
            </div>

            <!-- Domain -->
            <div class="form-group">
              <label class="field-label">Dominio <span class="field-optional">Opcional</span></label>
              <input v-model.trim="form.domain" type="text" class="field-input" placeholder="empresa.com">
            </div>

            <!-- Active toggle -->
            <div class="toggle-row" style="margin-top: 4px;">
              <label class="toggle-row__label" :for="`panel-active`">Empresa activa</label>
              <div class="bsw-toggle">
                <input id="panel-active" v-model="form.active" type="checkbox" class="bsw-toggle__input">
                <span class="bsw-toggle__track"><span class="bsw-toggle__thumb"></span></span>
              </div>
            </div>

          </div>

          <div class="panel-footer">
            <button class="btn-ghost" @click="closePanel">Cancelar</button>
            <button class="btn-primary" @click="saveCompany" :disabled="!form.name.trim()">
              {{ editingCompany ? 'Guardar cambios' : 'Crear empresa' }}
            </button>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { notify } from '@/services/notifications.js'

// ----- Mock data -----
const companies = ref([
  {
    id: '1',
    name: 'Grupo Innovatech',
    description: 'Empresa tecnológica líder en soluciones digitales para PYMES en Latinoamérica.',
    color: '#2563eb',
    logoUrl: '',
    plan: 'Enterprise',
    maxUsers: 100,
    maxStorage: 50,
    domain: 'innovatech.com',
    active: true,
    usersCount: 48,
    postsCount: 312,
    storageMb: 18240,
  },
  {
    id: '2',
    name: 'Constructora Aries',
    description: 'Firma dedicada a proyectos de infraestructura y construcción civil en Panamá.',
    color: '#ea580c',
    logoUrl: '',
    plan: 'Pro',
    maxUsers: 25,
    maxStorage: 15,
    domain: 'aries.pa',
    active: true,
    usersCount: 14,
    postsCount: 87,
    storageMb: 4320,
  },
  {
    id: '3',
    name: 'Salud Integral S.A.',
    description: 'Red de clínicas y centros de salud con presencia en tres provincias.',
    color: '#16a34a',
    logoUrl: '',
    plan: 'Pro',
    maxUsers: 40,
    maxStorage: 20,
    domain: 'saludintegral.com',
    active: false,
    usersCount: 22,
    postsCount: 145,
    storageMb: 8900,
  },
  {
    id: '4',
    name: 'Agencia Creativa Pixel',
    description: 'Estudio de diseño y comunicación visual especializado en branding digital.',
    color: '#7c3aed',
    logoUrl: '',
    plan: 'Free',
    maxUsers: 5,
    maxStorage: 2,
    domain: '',
    active: true,
    usersCount: 3,
    postsCount: 21,
    storageMb: 680,
  },
])

const plans = [
  {
    id: 'Free',
    label: 'Free',
    features: ['Hasta 5 usuarios', '2 GB almacenamiento', 'Soporte por email'],
  },
  {
    id: 'Pro',
    label: 'Pro',
    features: ['Hasta 40 usuarios', '20 GB almacenamiento', 'Soporte prioritario', 'Analytics avanzados'],
  },
  {
    id: 'Enterprise',
    label: 'Enterprise',
    features: ['Usuarios ilimitados', 'Almacenamiento custom', 'SLA garantizado', 'Onboarding dedicado', 'SSO / SAML'],
  },
]

// ----- Stats -----
const activeCount = computed(() => companies.value.filter(c => c.active).length)
const totalUsers = computed(() => companies.value.reduce((acc, c) => acc + c.usersCount, 0))
const totalStorage = computed(() => {
  const mb = companies.value.reduce((acc, c) => acc + c.storageMb, 0)
  return (mb / 1024).toFixed(1)
})

// ----- Panel -----
const showPanel = ref(false)
const editingCompany = ref(null)
const confirmingDeleteId = ref(null)

const defaultForm = () => ({
  name: '',
  description: '',
  color: '#2563eb',
  logoUrl: '',
  plan: 'Free',
  maxUsers: 10,
  maxStorage: 5,
  domain: '',
  active: true,
})

const form = ref(defaultForm())

const openPanel = (company = null) => {
  editingCompany.value = company
  if (company) {
    form.value = {
      name: company.name,
      description: company.description,
      color: company.color,
      logoUrl: company.logoUrl,
      plan: company.plan,
      maxUsers: company.maxUsers,
      maxStorage: company.maxStorage,
      domain: company.domain,
      active: company.active,
    }
  } else {
    form.value = defaultForm()
  }
  showPanel.value = true
}

const closePanel = () => {
  showPanel.value = false
  editingCompany.value = null
}

const saveCompany = () => {
  if (!form.value.name.trim()) return

  if (editingCompany.value) {
    const idx = companies.value.findIndex(c => c.id === editingCompany.value.id)
    if (idx !== -1) {
      companies.value[idx] = { ...companies.value[idx], ...form.value }
    }
    notify.success('Empresa actualizada correctamente.')
  } else {
    const newCompany = {
      ...form.value,
      id: Date.now().toString(),
      usersCount: 0,
      postsCount: 0,
      storageMb: 0,
    }
    companies.value.push(newCompany)
    notify.success('Empresa creada correctamente.')
  }
  closePanel()
}

const requestDelete = (id) => {
  confirmingDeleteId.value = id
}

const deleteCompany = (id) => {
  companies.value = companies.value.filter(c => c.id !== id)
  confirmingDeleteId.value = null
  notify.success('Empresa eliminada.')
}

const onToggleActive = (company) => {
  notify.success(company.active ? `${company.name} activada.` : `${company.name} desactivada.`)
}

const manageUsers = (company) => {
  notify.info(`Gestión de usuarios de "${company.name}" próximamente.`)
}

const refreshCompanies = () => {
  notify.success('Datos actualizados.')
}
</script>

<style scoped>
.companies-view {
  padding: 32px 28px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

/* Grid layout */
.companies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  transition: grid-template-columns 0.3s ease;
  align-items: start;
}
.companies-grid--split {
  grid-template-columns: 1fr 420px;
}

/* Cards grid */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

/* Company card */
.company-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color 0.15s, box-shadow 0.15s;
  position: relative;
  overflow: hidden;
}
.company-card:hover {
  border-color: var(--gray-300);
  box-shadow: var(--shadow-sm);
}

/* Card header */
.company-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.company-card__identity {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.company-color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.company-card__logo-wrap {
  flex-shrink: 0;
}
.company-card__logo {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-xs);
  object-fit: contain;
  background: var(--gray-50);
  border: 1px solid var(--gray-100);
}
.company-card__logo-fallback {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 700;
  flex-shrink: 0;
}
.company-card__title-area {
  min-width: 0;
}
.company-card__name {
  font-size: 14px;
  font-weight: 650;
  color: var(--gray-900);
  margin: 0;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.company-card__domain {
  font-size: 11.5px;
  color: var(--gray-400);
}
.company-card__badges {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

/* Plan badge */
.plan-badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 9px;
  border-radius: 99px;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.plan-badge--free       { background: var(--gray-100); color: var(--gray-600); }
.plan-badge--pro        { background: #eff6ff; color: var(--primary-700); }
.plan-badge--enterprise { background: #f5f3ff; color: #7c3aed; }

/* Description */
.company-card__desc {
  font-size: 12.5px;
  color: var(--gray-500);
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Stats row inside card */
.company-card__stats {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}
.company-stat {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: var(--gray-500);
}
.company-stat svg { color: var(--gray-400); flex-shrink: 0; }

/* Status + limits row */
.company-card__status-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}
.company-card__limits {
  font-size: 11px;
  color: var(--gray-400);
}

/* Card actions */
.company-card__actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding-top: 4px;
  border-top: 1px solid var(--gray-100);
}

/* Delete confirm overlay */
.delete-confirm-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  z-index: 10;
}
.delete-confirm-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  text-align: center;
}
.delete-confirm-text {
  font-size: 13px;
  font-weight: 500;
  color: var(--gray-700);
  max-width: 220px;
  line-height: 1.45;
  margin: 0;
}
.delete-confirm-actions {
  display: flex;
  gap: 8px;
}
.btn-danger-sm {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: #dc2626;
  color: #fff;
  border: none;
  border-radius: var(--radius-xs);
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: background 0.13s;
}
.btn-danger-sm:hover { background: #b91c1c; }

/* Side panel */
.assign-panel {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  align-self: start;
  position: sticky;
  top: 16px;
  max-height: calc(100vh - 80px);
  overflow: hidden;
}
.assign-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--gray-100);
  flex-shrink: 0;
}
.assign-panel__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
}
.assign-panel__close {
  width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--gray-200);
  background: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--gray-400); transition: all 0.13s; flex-shrink: 0;
}
.assign-panel__close:hover { background: var(--gray-50); color: var(--gray-700); }

.panel-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.panel-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 14px 24px;
  border-top: 1px solid var(--gray-100);
  flex-shrink: 0;
}

/* Color row */
.color-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.color-swatch-input {
  width: 38px;
  height: 36px;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xs);
  padding: 2px;
  cursor: pointer;
  flex-shrink: 0;
  background: none;
}
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  border: 1px solid rgba(0,0,0,0.1);
}

/* Logo preview */
.logo-preview-wrap {
  margin-top: 8px;
  width: 64px;
  height: 64px;
  border-radius: var(--radius-xs);
  border: 1px solid var(--gray-200);
  overflow: hidden;
  background: var(--gray-50);
}
.logo-preview-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Plan options */
.plan-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.plan-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1.5px solid var(--gray-200);
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: all 0.15s;
  background: #fff;
}
.plan-option:hover { border-color: var(--primary-300); background: var(--primary-50); }
.plan-option.selected { border-color: var(--primary-700); background: var(--primary-50); box-shadow: 0 0 0 3px rgba(37,99,235,.07); }
.plan-option__radio { display: none; }
.plan-option__content { flex: 1; }
.plan-option__header { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.plan-option__name { font-size: 13px; font-weight: 600; color: var(--gray-900); }
.plan-option__check { color: var(--primary-700); margin-top: 2px; }
.plan-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 0;
  margin: 0;
}
.plan-features li {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--gray-500);
}
.plan-features li svg { color: var(--success-600); flex-shrink: 0; }

/* Toggle row */
.toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.toggle-row__label { font-size: 13px; font-weight: 500; color: var(--gray-700); }

/* Optional label */
.field-optional {
  font-size: 10.5px;
  font-weight: 500;
  color: var(--gray-400);
  margin-left: 4px;
  text-transform: none;
  letter-spacing: 0;
}

/* Animations */
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.3s ease; }
.slide-right-enter-from { opacity: 0; transform: translateX(20px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(20px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.18s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 900px) {
  .companies-grid--split { grid-template-columns: 1fr; }
  .cards-grid { grid-template-columns: 1fr; }
}
</style>
