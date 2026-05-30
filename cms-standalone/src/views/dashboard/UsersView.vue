<template>
  <div class="users-view">
    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Usuarios con Acceso</h1>
        <p class="page-header__desc">
          Gestiona los usuarios que pueden acceder al CMS y asigna roles.
        </p>
      </div>

      <div class="page-header__actions">
        <button class="btn-ghost" @click="loadUsers" :disabled="loadingUsers">
          <svg class="spin-on-load" :class="{ spin: loadingUsers }" width="15" height="15" viewBox="0 0 15 15"
            fill="none">
            <path d="M13.5 7.5A6 6 0 1 1 7.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M13.5 1.5v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          Actualizar
        </button>

        <button class="btn-primary" @click="showCreatePanel = !showCreatePanel">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
          </svg>
          Nuevo usuario
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5.5" cy="4" r="2.5" stroke="currentColor" stroke-width="1.3" />
            <path d="M1 12c0-2.485 2.015-4.5 4.5-4.5S10 9.515 10 12" stroke="currentColor" stroke-width="1.3"
              stroke-linecap="round" />
            <path d="M10.5 6.5h3M12 5v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ users.length }}</span>
          <span class="stat-chip__label">Usuarios totales</span>
        </div>
      </div>

      <div class="stat-chip" v-for="role in roleSummary" :key="role.name">
        <div class="stat-chip__icon" :class="role.color">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3" />
            <path d="M2 12c0-2.485 2.24-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" stroke-width="1.3"
              stroke-linecap="round" />
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ role.count }}</span>
          <span class="stat-chip__label">{{ role.name }}</span>
        </div>
      </div>
    </div>

    <!-- Main grid: table + create panel -->
    <div class="users-grid" :class="{ 'users-grid--split': showCreatePanel }">
      <!-- Users table -->
      <div class="table-card">
        <div class="table-card__header">
          <div class="search-bar">
            <svg class="search-bar__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4" />
              <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>

            <input v-model.trim="searchQuery" type="text" class="search-bar__input"
              placeholder="Buscar por nombre, correo o rol...">

            <button v-if="searchQuery" class="search-bar__clear" @click="searchQuery = ''">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Loading skeleton -->
        <div v-if="loadingUsers" class="skeleton-list">
          <div v-for="i in 5" :key="i" class="skeleton-row-item">
            <div class="skeleton skeleton--avatar"></div>
            <div class="skeleton-row-item__body">
              <div class="skeleton skeleton--line skeleton--line-lg"></div>
              <div class="skeleton skeleton--line skeleton--line-md"></div>
            </div>
            <div class="skeleton skeleton--badge"></div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!filteredUsers.length" class="empty-state">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="18" stroke="var(--gray-200)" stroke-width="2" />
            <circle cx="20" cy="15" r="6" stroke="var(--gray-300)" stroke-width="1.8" />
            <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="var(--gray-300)" stroke-width="1.8"
              stroke-linecap="round" />
          </svg>
          <p class="empty-state__title">{{ searchQuery ? 'Sin resultados' : 'No hay usuarios' }}</p>
          <p class="empty-state__desc">
            {{ searchQuery ? 'Prueba con otro término de búsqueda.' : 'Crea el primer usuario con el botón superior.' }}
          </p>
        </div>

        <!-- Table -->
        <div v-else class="table-wrap">
          <table class="users-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Empresa</th>
                <th>Rol</th>
                <th>Fecha de acceso</th>
                <th class="th-actions">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="u in filteredUsers" :key="u.id || u.Id">
                <td>
                  <div class="user-cell">
                    <div class="user-cell__avatar" :style="{ background: avatarColor(getFullName(u)) }">
                      {{ initials(getFullName(u)) }}
                    </div>
                    <span class="user-cell__name">{{ getFullName(u) || '—' }}</span>
                  </div>
                </td>

                <td class="td-email">{{ u.email || u.Email || '—' }}</td>
                <td>{{ u.company || u.Company || '—' }}</td>

                <td>
                  <span class="role-badge" :class="roleBadgeClass(u.role?.name || u.Role?.Name || u.roleName)">
                    {{ u.role?.name || u.Role?.Name || u.roleName || '—' }}
                  </span>
                </td>

                <td class="td-date">{{ formatDate(u.createdAt || u.CreatedAt) }}</td>

                <td class="td-actions">
                  <button class="action-btn action-btn--danger" title="Remover acceso" @click="confirmRemove(u)">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path
                        d="M2 3.5h9M4.5 3.5V2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5 6v3.5M8 6v3.5M3 3.5l.5 7a1 1 0 0 0 1 .93h4a1 1 0 0 0 1-.93l.5-7"
                        stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Create panel -->
      <Transition name="slide-right">
        <div v-if="showCreatePanel" class="assign-panel">
          <div class="assign-panel__header">
            <h2 class="assign-panel__title">Nuevo usuario</h2>
            <button class="assign-panel__close" @click="closeCreatePanel" aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <form class="create-form" @submit.prevent="createUser">
            <div class="form-grid">
              <div class="field">
                <label class="field-label">Nombre</label>
                <input v-model.trim="form.firstName" type="text" class="field-input" placeholder="Ej. Juan"
                  autocomplete="given-name">
              </div>

              <div class="field">
                <label class="field-label">Apellido</label>
                <input v-model.trim="form.lastName" type="text" class="field-input" placeholder="Ej. Pérez"
                  autocomplete="family-name">
              </div>

              <div class="field field--full">
                <label class="field-label">Empresa</label>
                <select v-model="form.companyId" class="field-select" :disabled="loadingCompanies">
                  <option value="" disabled>
                    {{ loadingCompanies ? 'Cargando empresas...' : 'Selecciona una empresa' }}
                  </option>
                  <option v-for="company in companies" :key="company.Id ?? company.id"
                    :value="company.Id ?? company.id">
                    {{ company.Name ?? company.name }}
                  </option>
                </select>
              </div>

              <div class="field field--full">
                <label class="field-label">Email</label>
                <input v-model.trim="form.email" type="email" class="field-input" placeholder="usuario@empresa.com"
                  autocomplete="email">
              </div>

              <div class="field field--full">
                <label class="field-label">Contraseña</label>
                <input v-model="form.password" type="password" class="field-input" placeholder="••••••••"
                  autocomplete="new-password">
              </div>

              <div class="field field--full">
                <label class="field-label">Rol a asignar</label>
                <select v-model="form.roleId" class="field-select" :disabled="loadingRoles">
                  <option value="" disabled>
                    {{ loadingRoles ? 'Cargando roles...' : 'Selecciona un rol' }}
                  </option>
                  <option v-for="role in roles" :key="role.Id ?? role.id" :value="role.Id ?? role.id">
                    {{ role.Name ?? role.name }}
                  </option>
                </select>
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
                <path d="M4.5 7.5l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              Usuario creado correctamente.
            </div>

            <div class="step-actions">
              <button type="button" class="btn-ghost" @click="closeCreatePanel" :disabled="saving">
                Cancelar
              </button>
              <button type="submit" class="btn-primary" :disabled="saving">
                <svg v-if="saving" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                {{ saving ? 'Guardando...' : 'Crear usuario' }}
              </button>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usersService } from '@/services/api.js'
import { notify, confirmDelete } from '@/services/notifications.js'

const users = ref([])
const loadingUsers = ref(false)
const searchQuery = ref('')

const showCreatePanel = ref(false)
const saving = ref(false)

const companies = ref([])
const loadingCompanies = ref(false)

const roles = ref([])
const loadingRoles = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  companyId: '',
  email: '',
  password: '',
  roleId: ''
})

const formError = ref('')
const formSuccess = ref(false)

const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return users.value

  return users.value.filter(u => {
    const name = getFullName(u).toLowerCase()
    const email = (u.email || u.Email || '').toLowerCase()
    const role = (u.role?.name || u.Role?.Name || u.roleName || '').toLowerCase()
    const company = (u.company || u.Company || '').toLowerCase()

    return name.includes(q) || email.includes(q) || role.includes(q) || company.includes(q)
  })
})

const roleSummary = computed(() => {
  const map = {}

  users.value.forEach(u => {
    const name = u.role?.name || u.Role?.Name || u.roleName || 'Sin rol'
    map[name] = (map[name] || 0) + 1
  })

  const colors = ['green', 'blue', 'gray', 'dark']

  return Object.entries(map).map(([name, count], i) => ({
    name,
    count,
    color: colors[i % colors.length]
  }))
})

const loadUsers = async () => {
  loadingUsers.value = true
  try {
    const res = await usersService.getAll()
    const data = res.data?.data ?? res.data ?? []
    users.value = Array.isArray(data) ? data : []
  } catch (e) {
    notify.error('No se pudieron cargar los usuarios.')
  } finally {
    loadingUsers.value = false
  }
}

const loadCompanies = async () => {
  loadingCompanies.value = true
  try {
    const res = await usersService.getCompanies()
    const data = res.data?.data ?? res.data ?? []
    companies.value = Array.isArray(data) ? data : []
  } catch (e) {
    notify.error('No se pudieron cargar las empresas.')
  } finally {
    loadingCompanies.value = false
  }
}

const loadRoles = async () => {
  loadingRoles.value = true
  try {
    const res = await usersService.getRoles()
    const data = res.data?.data ?? res.data ?? []
    roles.value = Array.isArray(data) ? data : []
  } catch (e) {
    notify.error('No se pudieron cargar los roles.')
  } finally {
    loadingRoles.value = false
  }
}

const closeCreatePanel = () => {
  showCreatePanel.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    companyId: '',
    email: '',
    password: '',
    roleId: ''
  }
  formError.value = ''
  formSuccess.value = false
}

const validateForm = () => {
  if (!form.value.firstName) return 'El nombre es obligatorio.'
  if (!form.value.lastName) return 'El apellido es obligatorio.'
  if (!form.value.companyId) return 'Debes seleccionar una empresa.'
  if (!form.value.email) return 'El email es obligatorio.'
  if (!form.value.password) return 'La contraseña es obligatoria.'
  if (!form.value.roleId) return 'Debes seleccionar un rol.'
  return ''
}

const createUser = async () => {
  formError.value = ''
  formSuccess.value = false

  const validationMessage = validateForm()
  if (validationMessage) {
    formError.value = validationMessage
    return
  }

  saving.value = true
  try {
    const payload = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      companyId: form.value.companyId,
      email: form.value.email,
      password: form.value.password,
      roleId: form.value.roleId
    }

    await usersService.createUser(payload)

    formSuccess.value = true
    notify.success('Usuario creado correctamente.')

    await loadUsers()
    resetForm()

    setTimeout(() => {
      closeCreatePanel()
    }, 1200)
  } catch (e) {
    formError.value = e.response?.data?.message || 'No se pudo crear el usuario.'
  } finally {
    saving.value = false
  }
}

const confirmRemove = async user => {
  const name = getFullName(user) || 'este usuario'
  const confirmed = await confirmDelete(
    `¿Remover acceso de ${name}?`,
    'Esta acción revocará el acceso al CMS para este usuario.'
  )

  if (!confirmed) return

  try {
    await usersService.removeAccess(user.id || user.Id)
    notify.success(`Acceso removido a ${name}`)
    await loadUsers()
  } catch (e) {
    notify.error('No se pudo remover el acceso.')
  }
}

/* Helpers */
const getFullName = (u = {}) => {
  const firstName = u.firstName || u.FirstName || ''
  const lastName = u.lastName || u.LastName || ''
  const fullName = u.fullName || u.Fullname || u.fullName || ''

  if (fullName) return fullName.trim()
  return `${firstName} ${lastName}`.trim()
}

const initials = (name = '') => {
  const clean = name.trim()
  if (!clean) return '?'

  return clean
    .split(/\s+/)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2', '#65a30d']

const avatarColor = (name = '') => {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const roleBadgeClass = (name = '') => {
  const n = (name || '').toLowerCase()
  if (n.includes('super') || n.includes('admin')) return 'role-badge--admin'
  if (n.includes('editor')) return 'role-badge--editor'
  return 'role-badge--viewer'
}

const formatDate = val => {
  if (!val) return '—'
  try {
    return new Date(val).toLocaleDateString('es-PA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return '—'
  }
}

onMounted(async () => {
  await Promise.all([loadUsers(), loadCompanies(), loadRoles()])
})
</script>

<style scoped>
.users-view {
  padding: 32px 28px;
  max-width: 1600px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

/* Grid */
.users-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  transition: grid-template-columns 0.3s ease;
}

.users-grid--split {
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

/* Search bar */
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

.skeleton--avatar {
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

/* Empty state */
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

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.users-table th {
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

.users-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-50);
  vertical-align: middle;
  color: var(--gray-800);
}

.users-table tbody tr:hover td {
  background: var(--gray-50);
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.th-actions,
.td-actions {
  text-align: right;
}

.td-email {
  color: var(--gray-500);
  font-size: 12.5px;
}

.td-date {
  color: var(--gray-500);
  font-size: 12.5px;
  white-space: nowrap;
}

/* User cell */
.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-cell__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-cell__name {
  font-weight: 500;
  color: var(--gray-900);
  font-size: 13px;
}

/* Role badge */
.role-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 600;
}

.role-badge--admin {
  background: #eff6ff;
  color: #2563eb;
}

.role-badge--editor {
  background: #f0fdf4;
  color: #16a34a;
}

.role-badge--viewer {
  background: var(--gray-100);
  color: var(--gray-600);
}

/* Action buttons */
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

.action-btn--danger {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.action-btn--danger:hover {
  background: #fee2e2;
}

/* Panel */
.assign-panel {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-self: start;
  position: sticky;
  top: 16px;
}

.assign-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.assign-panel__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--gray-900);
  margin: 0;
}

.assign-panel__close {
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

.assign-panel__close:hover {
  background: var(--gray-50);
  color: var(--gray-700);
}

/* Form */
.create-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field--full {
  grid-column: 1 / -1;
}

.field-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--gray-700);
}

.field-input,
.field-select {
  width: 100%;
  min-height: 40px;
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  background: #fff;
  padding: 0 12px;
  outline: none;
  font-size: 13px;
  color: var(--gray-800);
  font-family: var(--font-sans);
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.field-input:focus,
.field-select:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
}

.field-select:disabled {
  background: var(--gray-50);
  color: var(--gray-500);
}

/* Alert */
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

.btn--full {
  width: 100%;
  justify-content: center;
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
  .users-grid--split {
    grid-template-columns: 1fr;
  }

  .assign-panel {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .users-view {
    padding: 20px 16px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .table-card__header {
    padding: 14px;
  }

  .users-table th,
  .users-table td {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>