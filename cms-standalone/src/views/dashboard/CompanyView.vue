<template>
  <div class="companies-view">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Empresas</h1>
        <p class="page-header__desc">
          Gestiona las empresas del sistema, crea nuevas y actualiza su información.
        </p>
      </div>

      <div class="page-header__actions">
        <button class="btn-ghost" @click="loadCompanies" :disabled="loadingCompanies">
          <svg
            class="spin-on-load"
            :class="{ spin: loadingCompanies }"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
          >
            <path
              d="M13.5 7.5A6 6 0 1 1 7.5 1.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <path
              d="M13.5 1.5v6h-6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Actualizar
        </button>

        <button class="btn-primary" @click="openCreatePanel">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 1.5v11M1.5 7h11"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
            />
          </svg>
          Nueva empresa
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 12V4.5L7 2l5 2.5V12"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M4.2 6.2h1.6M8.2 6.2h1.6M4.2 8.7h1.6M8.2 8.7h1.6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ companies.length }}</span>
          <span class="stat-chip__label">Empresas registradas</span>
        </div>
      </div>
    </div>

    <!-- Main grid -->
    <div class="companies-grid" :class="{ 'companies-grid--split': showFormPanel }">
      <!-- Table -->
      <div class="table-card">
        <div class="table-card__header">
          <div class="search-bar">
            <svg class="search-bar__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4" />
              <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>

            <input
              v-model.trim="searchQuery"
              type="text"
              class="search-bar__input"
              placeholder="Buscar por nombre, código o descripción..."
            >

            <button v-if="searchQuery" class="search-bar__clear" @click="searchQuery = ''">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loadingCompanies" class="skeleton-list">
          <div v-for="i in 5" :key="i" class="skeleton-row-item">
            <div class="skeleton skeleton--logo"></div>
            <div class="skeleton-row-item__body">
              <div class="skeleton skeleton--line skeleton--line-lg"></div>
              <div class="skeleton skeleton--line skeleton--line-md"></div>
            </div>
            <div class="skeleton skeleton--badge"></div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!filteredCompanies.length" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="var(--gray-200)" stroke-width="2" />
            <path d="M11 28V15.5L20 11l9 4.5V28" stroke="var(--gray-300)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 20h3M22 20h3M15 24h3M22 24h3" stroke="var(--gray-300)" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <p class="empty-state__title">{{ searchQuery ? 'Sin resultados' : 'No hay empresas' }}</p>
          <p class="empty-state__desc">
            {{ searchQuery ? 'Prueba con otro término de búsqueda.' : 'Crea la primera empresa con el botón superior.' }}
          </p>
        </div>

        <!-- Table -->
        <div v-else class="table-wrap">
          <table class="companies-table">
            <thead>
              <tr>
                <th>Empresa</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Logo</th>
                <th>Actualizado</th>
                <th class="th-actions">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="company in filteredCompanies" :key="company.id || company.Id">
                <td>
                  <div class="company-cell">
                    <div class="company-cell__logo">
                      <img
                        v-if="getLogoUrl(company)"
                        :src="getLogoUrl(company)"
                        :alt="getCompanyName(company)"
                      >
                      <span v-else>{{ initials(getCompanyName(company)) }}</span>
                    </div>
                    <span class="company-cell__name">{{ getCompanyName(company) || '—' }}</span>
                  </div>
                </td>

                <td class="td-code">{{ company.code || company.Code || '—' }}</td>
                <td class="td-desc">{{ company.description || company.Description || '—' }}</td>

                <td>
                  <span class="logo-badge">
                    {{ getLogoUrl(company) ? 'Sí' : 'No' }}
                  </span>
                </td>

                <td class="td-date">{{ formatDate(company.updatedAt || company.UpdatedAt || company.createdAt || company.CreatedAt) }}</td>

                <td class="td-actions">
                  <button class="action-btn action-btn--primary" @click="editCompany(company)">
                    Editar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Form panel -->
      <Transition name="slide-right">
        <div v-if="showFormPanel" class="form-panel">
          <div class="form-panel__header">
            <h2 class="form-panel__title">
              {{ isEditing ? 'Actualizar empresa' : 'Nueva empresa' }}
            </h2>

            <button class="form-panel__close" @click="closeFormPanel" aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <form class="company-form" @submit.prevent="saveCompany">
            <div class="field">
              <label class="field-label">Nombre de empresa</label>
              <input
                v-model.trim="form.name"
                type="text"
                class="field-input"
                placeholder="Ej. Bambito Spring Water"
                autocomplete="organization"
              >
            </div>

            <div class="field">
              <label class="field-label">Código de empresa</label>
              <input
                v-model.trim="form.code"
                type="text"
                class="field-input"
                placeholder="Ej. BAM001"
                autocomplete="off"
              >
            </div>

            <div class="field">
              <label class="field-label">Descripción</label>
              <textarea
                v-model.trim="form.description"
                class="field-textarea"
                rows="4"
                placeholder="Describe brevemente la empresa..."
              ></textarea>
            </div>

            <div class="field">
              <label class="field-label">Logo</label>

              <div class="upload-box">
                <input
                  ref="logoInput"
                  type="file"
                  accept="image/*"
                  class="upload-box__input"
                  @change="onLogoChange"
                >

                <div class="upload-box__preview" v-if="logoPreview">
                  <img :src="logoPreview" alt="Vista previa del logo">
                </div>

                <div v-else class="upload-box__empty">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <rect x="3" y="5" width="16" height="12" rx="2.5" stroke="currentColor" stroke-width="1.4" />
                    <path d="M6.5 12.5l2.6-2.6a1 1 0 0 1 1.4 0l1.3 1.3a1 1 0 0 0 1.4 0l1.3-1.3 2.1 2.1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="8" cy="8.2" r="1" stroke="currentColor" stroke-width="1.2" />
                  </svg>
                  <p>Sube una imagen para el logo</p>
                </div>
              </div>

              <div class="upload-actions">
                <button type="button" class="btn-secondary" @click="triggerLogoPicker">
                  Elegir archivo
                </button>

                <button
                  v-if="logoPreview"
                  type="button"
                  class="btn-ghost"
                  @click="removeLogo"
                >
                  Quitar logo
                </button>
              </div>
            </div>

            <div v-if="formError" class="alert alert--error">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                <path d="M7.5 4.5v3.5M7.5 10h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
              {{ formError }}
            </div>

            <div v-if="formSuccess" class="alert alert--success">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                <path
                  d="M4.5 7.5l2 2 4-4"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              {{ formSuccess }}
            </div>

            <div class="step-actions">
              <button type="button" class="btn-ghost" @click="closeFormPanel" :disabled="saving">
                Cancelar
              </button>

              <button type="submit" class="btn-primary" :disabled="saving">
                <svg v-if="saving" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                {{ saving ? 'Guardando...' : isEditing ? 'Actualizar empresa' : 'Crear empresa' }}
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { companiesService } from '@/services/api.js'
import { notify } from '@/services/notifications.js'

const companies = ref([])
const loadingCompanies = ref(false)
const searchQuery = ref('')

const showFormPanel = ref(false)
const isEditing = ref(false)
const saving = ref(false)

const logoInput = ref(null)
const logoFile = ref(null)
const logoPreview = ref('')

const form = ref({
  id: null,
  name: '',
  code: '',
  description: '',
  logoUrl: ''
})

const formError = ref('')
const formSuccess = ref('')

const filteredCompanies = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return companies.value

  return companies.value.filter(item => {
    const name = (item.name || item.Name || '').toLowerCase()
    const code = (item.code || item.Code || '').toLowerCase()
    const description = (item.description || item.Description || '').toLowerCase()
    return name.includes(q) || code.includes(q) || description.includes(q)
  })
})

const loadCompanies = async () => {
  loadingCompanies.value = true
  try {
    const res = await companiesService.getAll()
    const data = res.data?.data ?? res.data ?? []
    companies.value = Array.isArray(data) ? data : []
  } catch (e) {
    notify.error('No se pudieron cargar las empresas.')
  } finally {
    loadingCompanies.value = false
  }
}

const openCreatePanel = () => {
  resetForm()
  isEditing.value = false
  showFormPanel.value = true
}

const editCompany = (company) => {
  isEditing.value = true
  form.value = {
    id: company.id ?? company.Id ?? null,
    name: company.name ?? company.Name ?? '',
    code: company.code ?? company.Code ?? '',
    description: company.description ?? company.Description ?? '',
    logoUrl: company.logoUrl ?? company.LogoUrl ?? ''
  }

  logoFile.value = null
  logoPreview.value = getLogoUrl(company) || ''
  showFormPanel.value = true
}

const closeFormPanel = () => {
  showFormPanel.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    id: null,
    name: '',
    code: '',
    description: '',
    logoUrl: ''
  }

  formError.value = ''
  formSuccess.value = ''

  logoFile.value = null
  if (logoPreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(logoPreview.value)
  }
  logoPreview.value = ''

  if (logoInput.value) {
    logoInput.value.value = ''
  }
}

const validateForm = () => {
  if (!form.value.name) return 'El nombre de la empresa es obligatorio.'
  if (!form.value.code) return 'El código de la empresa es obligatorio.'
  if (!form.value.description) return 'La descripción es obligatoria.'
  return ''
}

const saveCompany = async () => {
  formError.value = ''
  formSuccess.value = ''

  const validationMessage = validateForm()
  if (validationMessage) {
    formError.value = validationMessage
    return
  }

  saving.value = true
  try {
    const payload = new FormData()
    payload.append('Name', form.value.name)
    payload.append('Code', form.value.code)
    payload.append('Description', form.value.description)

    if (form.value.id) {
      payload.append('Id', form.value.id)
    }

    if (logoFile.value) {
      payload.append('Logo', logoFile.value)
    }

    if (isEditing.value) {
      await companiesService.update(payload)
      formSuccess.value = 'Empresa actualizada correctamente.'
      notify.success('Empresa actualizada correctamente.')
    } else {
      await companiesService.create(payload)
      formSuccess.value = 'Empresa creada correctamente.'
      notify.success('Empresa creada correctamente.')
    }

    await loadCompanies()

    setTimeout(() => {
      closeFormPanel()
    }, 1200)
  } catch (e) {
    formError.value = e.response?.data?.message || 'No se pudo guardar la empresa.'
  } finally {
    saving.value = false
  }
}

const triggerLogoPicker = () => {
  logoInput.value?.click()
}

const onLogoChange = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (logoPreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(logoPreview.value)
  }

  logoFile.value = file
  logoPreview.value = URL.createObjectURL(file)
}

const removeLogo = () => {
  if (logoPreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(logoPreview.value)
  }

  logoFile.value = null
  logoPreview.value = ''
  form.value.logoUrl = ''

  if (logoInput.value) {
    logoInput.value.value = ''
  }
}

const getCompanyName = (company = {}) => company.name || company.Name || ''
const getLogoUrl = (company = {}) => company.logoUrl || company.LogoUrl || ''

const initials = (name = '') => {
  const clean = String(name || '').trim()
  if (!clean) return '?'

  return clean
    .split(/\s+/)
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const formatDate = (value) => {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString('es-PA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return '—'
  }
}

onMounted(() => {
  loadCompanies()
})

onBeforeUnmount(() => {
  if (logoPreview.value?.startsWith('blob:')) {
    URL.revokeObjectURL(logoPreview.value)
  }
})
</script>

<style scoped>
.companies-view {
  padding: 32px 28px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

.companies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  transition: grid-template-columns 0.3s ease;
}
.companies-grid--split {
  grid-template-columns: 1fr 420px;
}

/* Table card */
.table-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.table-card__header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-100);
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Search */
.search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 0 12px;
  background: var(--gray-50);
  min-height: 36px;
}
.search-bar__icon {
  color: var(--gray-400);
  flex-shrink: 0;
}
.search-bar__input {
  flex: 1;
  border: none;
  background: none;
  outline: none;
  font-size: 13px;
  color: var(--gray-800);
  font-family: var(--font-sans);
}
.search-bar__clear {
  border: none;
  background: none;
  cursor: pointer;
  color: var(--gray-400);
  display: flex;
  padding: 0;
}
.search-bar__clear:hover {
  color: var(--gray-600);
}

/* Skeleton */
.skeleton-list {
  padding: 12px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.skeleton-row-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.skeleton-row-item__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.skeleton {
  background: var(--gray-100);
  border-radius: 6px;
  animation: shimmer 1.4s infinite;
}
.skeleton--logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
}
.skeleton--line {
  height: 12px;
}
.skeleton--line-lg {
  width: 60%;
}
.skeleton--line-md {
  width: 40%;
}
.skeleton--badge {
  width: 70px;
  height: 22px;
  border-radius: 20px;
}
@keyframes shimmer {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}

/* Empty */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 8px;
}
.empty-state__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-700);
  margin: 8px 0 0;
}
.empty-state__desc {
  font-size: 13px;
  color: var(--gray-500);
  margin: 0;
  text-align: center;
}

/* Table */
.table-wrap {
  overflow-x: auto;
}
.companies-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.companies-table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--gray-500);
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-100);
  white-space: nowrap;
}
.companies-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-50);
  vertical-align: middle;
  color: var(--gray-800);
}
.companies-table tbody tr:hover td {
  background: var(--gray-50);
}
.companies-table tbody tr:last-child td {
  border-bottom: none;
}
.th-actions,
.td-actions {
  text-align: right;
}
.td-code {
  color: var(--gray-700);
  font-weight: 600;
}
.td-desc {
  color: var(--gray-500);
  max-width: 360px;
}
.td-date {
  color: var(--gray-500);
  font-size: 12.5px;
  white-space: nowrap;
}

/* Company cell */
.company-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}
.company-cell__logo {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--gray-600);
  font-size: 11px;
  font-weight: 700;
}
.company-cell__logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.company-cell__name {
  font-weight: 500;
  color: var(--gray-900);
  font-size: 13px;
}

/* Badge */
.logo-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 600;
  background: var(--gray-100);
  color: var(--gray-600);
}

/* Actions */
.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.13s;
  font-family: var(--font-sans);
}
.action-btn--primary {
  background: #eff6ff;
  color: #2563eb;
  border-color: #bfdbfe;
}
.action-btn--primary:hover {
  background: #dbeafe;
}

/* Form panel */
.form-panel {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-self: start;
  position: sticky;
  top: 16px;
}
.form-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-panel__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
}
.form-panel__close {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--gray-200);
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  transition: all 0.13s;
}
.form-panel__close:hover {
  background: var(--gray-50);
  color: var(--gray-700);
}

/* Form */
.company-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-700);
}
.field-input,
.field-textarea {
  width: 100%;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: #fff;
  padding: 10px 12px;
  outline: none;
  font-size: 13px;
  color: var(--gray-800);
  font-family: var(--font-sans);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field-input {
  min-height: 40px;
}
.field-textarea {
  resize: vertical;
  min-height: 100px;
}
.field-input:focus,
.field-textarea:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
}

/* Upload */
.upload-box {
  border: 1px dashed var(--gray-300);
  border-radius: 12px;
  background: var(--gray-50);
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.upload-box__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}
.upload-box__preview {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-box__preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.upload-box__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--gray-500);
  text-align: center;
  pointer-events: none;
}
.upload-box__empty p {
  margin: 0;
  font-size: 13px;
}
.upload-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Alerts */
.alert {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.4;
}
.alert--error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.alert--success {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}
.alert svg {
  flex-shrink: 0;
  margin-top: 1px;
}

/* Buttons */
.step-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 4px;
}

.btn-secondary,
.btn-ghost,
.btn-primary {
  min-height: 38px;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: var(--font-sans);
}

.btn-primary {
  border: none;
  background: var(--primary-700);
  color: #fff;
}
.btn-primary:hover {
  background: var(--primary-800);
}
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-secondary {
  border: 1px solid var(--gray-200);
  background: #fff;
  color: var(--gray-700);
}
.btn-secondary:hover {
  background: var(--gray-50);
}

.btn-ghost {
  border: 1px solid var(--gray-200);
  background: #fff;
  color: var(--gray-700);
}
.btn-ghost:hover {
  background: var(--gray-50);
}

.btn-ghost:disabled,
.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Animations */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.spin {
  animation: spin 0.8s linear infinite;
}
.spin-on-load.spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive */
@media (max-width: 1100px) {
  .companies-grid--split {
    grid-template-columns: 1fr;
  }

  .form-panel {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .companies-view {
    padding: 20px 16px;
  }

  .table-card__header {
    padding: 14px;
  }

  .companies-table th,
  .companies-table td {
    padding-left: 12px;
    padding-right: 12px;
  }

  .upload-actions {
    flex-direction: column;
  }

  .upload-actions .btn-secondary,
  .upload-actions .btn-ghost {
    width: 100%;
  }
}
</style>