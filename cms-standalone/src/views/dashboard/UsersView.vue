<template>
  <div class="users-view">

    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Usuarios con Acceso</h1>
        <p class="page-header__desc">Gestiona los usuarios que pueden acceder al CMS y asigna roles.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="loadUsers" :disabled="loadingUsers">
          <svg class="spin-on-load" :class="{ spin: loadingUsers }" width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path d="M13.5 7.5A6 6 0 1 1 7.5 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M13.5 1.5v6h-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Actualizar
        </button>
        <button class="btn-primary" @click="showAssignPanel = !showAssignPanel">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
          </svg>
          Asignar acceso
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5.5" cy="4" r="2.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M1 12c0-2.485 2.015-4.5 4.5-4.5S10 9.515 10 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M10.5 6.5h3M12 5v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
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
            <circle cx="7" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M2 12c0-2.485 2.24-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ role.count }}</span>
          <span class="stat-chip__label">{{ role.name }}</span>
        </div>
      </div>
    </div>

    <!-- Main grid: table + assign panel -->
    <div class="users-grid" :class="{ 'users-grid--split': showAssignPanel }">

      <!-- Users table -->
      <div class="table-card">
        <div class="table-card__header">
          <div class="search-bar">
            <svg class="search-bar__icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" stroke-width="1.4"/>
              <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <input v-model.trim="searchQuery" type="text" class="search-bar__input" placeholder="Buscar por nombre, correo o rol...">
            <button v-if="searchQuery" class="search-bar__clear" @click="searchQuery = ''">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
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
            <circle cx="20" cy="20" r="18" stroke="var(--gray-200)" stroke-width="2"/>
            <circle cx="20" cy="15" r="6" stroke="var(--gray-300)" stroke-width="1.8"/>
            <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="var(--gray-300)" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <p class="empty-state__title">{{ searchQuery ? 'Sin resultados' : 'No hay usuarios' }}</p>
          <p class="empty-state__desc">{{ searchQuery ? 'Prueba con otro término de búsqueda.' : 'Asigna acceso al primer usuario con el botón superior.' }}</p>
        </div>

        <!-- Table -->
        <div v-else class="table-wrap">
          <table class="users-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Fecha de acceso</th>
                <th class="th-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="u in filteredUsers" :key="u.id || u.Id">
                <td>
                  <div class="user-cell">
                    <div class="user-cell__avatar" :style="{ background: avatarColor(u.fullName || u.Fullname) }">
                      {{ initials(u.fullName || u.Fullname) }}
                    </div>
                    <span class="user-cell__name">{{ u.fullName || u.Fullname || '—' }}</span>
                  </div>
                </td>
                <td class="td-email">{{ u.email || u.Email || '—' }}</td>
                <td>
                  <span class="role-badge" :class="roleBadgeClass(u.role?.name || u.Role?.Name || u.roleName)">
                    {{ u.role?.name || u.Role?.Name || u.roleName || '—' }}
                  </span>
                </td>
                <td class="td-date">{{ formatDate(u.createdAt || u.CreatedAt) }}</td>
                <td class="td-actions">
                  <button class="action-btn action-btn--danger" title="Remover acceso" @click="confirmRemove(u)">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 3.5h9M4.5 3.5V2.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M5 6v3.5M8 6v3.5M3 3.5l.5 7a1 1 0 0 0 1 .93h4a1 1 0 0 0 1-.93l.5-7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Assign panel -->
      <Transition name="slide-right">
        <div v-if="showAssignPanel" class="assign-panel">
          <div class="assign-panel__header">
            <h2 class="assign-panel__title">Asignar acceso</h2>
            <button class="assign-panel__close" @click="closeAssignPanel" aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>

          <!-- Steps indicator -->
          <div class="steps-bar">
            <div class="step" :class="{ active: assignStep >= 1, done: assignStep > 1 }">
              <div class="step__dot">
                <svg v-if="assignStep > 1" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span v-else>1</span>
              </div>
              <span class="step__label">Validar empleado</span>
            </div>
            <div class="step__line" :class="{ done: assignStep > 1 }"></div>
            <div class="step" :class="{ active: assignStep >= 2, done: assignStep > 2 }">
              <div class="step__dot">
                <svg v-if="assignStep > 2" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span v-else>2</span>
              </div>
              <span class="step__label">Seleccionar rol</span>
            </div>
            <div class="step__line" :class="{ done: assignStep > 2 }"></div>
            <div class="step" :class="{ active: assignStep >= 3 }">
              <div class="step__dot"><span>3</span></div>
              <span class="step__label">Confirmar</span>
            </div>
          </div>

          <!-- Step 1: Validate employee -->
          <div class="panel-step" v-if="assignStep === 1">
            <label class="field-label">Código de Empleado (InternalId)</label>
            <div class="input-action-row">
              <input
                v-model.trim="internalId"
                type="text"
                class="field-input"
                placeholder="Ej. EMP-00123"
                @keydown.enter="validateEmployee"
                :disabled="validating"
              >
              <button class="btn-primary" @click="validateEmployee" :disabled="!internalId || validating">
                <svg v-if="validating" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                <span v-else>Validar</span>
              </button>
            </div>

            <!-- Validation error -->
            <div v-if="validationError" class="alert alert--error">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M7.5 4.5v3.5M7.5 10h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              {{ validationError }}
            </div>

            <!-- Valid user card -->
            <Transition name="fade">
              <div v-if="validatedEmployee" class="employee-card">
                <div class="employee-card__badge">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M4 6.5l2 2 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Usuario válido
                </div>
                <div class="employee-card__avatar" :style="{ background: avatarColor(validatedEmployee.Fullname) }">
                  {{ initials(validatedEmployee.Fullname) }}
                </div>
                <div class="employee-card__info">
                  <p class="employee-card__name">{{ validatedEmployee.Fullname }}</p>
                  <p class="employee-card__email">{{ validatedEmployee.Email }}</p>
                  <p class="employee-card__id">ID: {{ validatedEmployee.Id }}</p>
                </div>
                <button class="btn-primary btn--full" @click="assignStep = 2">
                  Continuar →
                </button>
              </div>
            </Transition>
          </div>

          <!-- Step 2: Select role -->
          <div class="panel-step" v-if="assignStep === 2">
            <div class="employee-summary">
              <div class="employee-summary__avatar" :style="{ background: avatarColor(validatedEmployee?.Fullname) }">
                {{ initials(validatedEmployee?.Fullname) }}
              </div>
              <div>
                <p class="employee-summary__name">{{ validatedEmployee?.Fullname }}</p>
                <p class="employee-summary__email">{{ validatedEmployee?.Email }}</p>
              </div>
            </div>

            <label class="field-label">Seleccionar rol</label>

            <div v-if="loadingRoles" class="roles-loading">
              <div v-for="i in 3" :key="i" class="skeleton skeleton--role"></div>
            </div>

            <div v-else class="role-options">
              <label
                v-for="role in roles"
                :key="role.Id"
                class="role-option"
                :class="{ selected: selectedRoleId === role.Id }"
              >
                <input type="radio" :value="role.Id" v-model="selectedRoleId" class="role-option__radio">
                <div class="role-option__content">
                  <div class="role-option__header">
                    <span class="role-option__name">{{ role.Name }}</span>
                    <span class="role-badge" :class="roleBadgeClass(role.Name)">{{ role.Name }}</span>
                  </div>
                  <p class="role-option__desc">{{ role.Description }}</p>
                </div>
                <div class="role-option__check" v-if="selectedRoleId === role.Id">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </label>
            </div>

            <div class="step-actions">
              <button class="btn-ghost" @click="assignStep = 1">← Volver</button>
              <button class="btn-primary" @click="assignStep = 3" :disabled="!selectedRoleId">
                Continuar →
              </button>
            </div>
          </div>

          <!-- Step 3: Confirm -->
          <div class="panel-step" v-if="assignStep === 3">
            <div class="confirm-card">
              <h3 class="confirm-card__title">Resumen de asignación</h3>

              <div class="confirm-row">
                <span class="confirm-row__label">Empleado</span>
                <div class="confirm-row__value">
                  <div class="user-cell">
                    <div class="user-cell__avatar" :style="{ background: avatarColor(validatedEmployee?.Fullname) }">
                      {{ initials(validatedEmployee?.Fullname) }}
                    </div>
                    <div>
                      <p style="font-size:13px;font-weight:600;margin:0">{{ validatedEmployee?.Fullname }}</p>
                      <p style="font-size:12px;color:var(--gray-500);margin:0">{{ validatedEmployee?.Email }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="confirm-row">
                <span class="confirm-row__label">Rol asignado</span>
                <div class="confirm-row__value">
                  <span class="role-badge" :class="roleBadgeClass(selectedRole?.Name)">{{ selectedRole?.Name }}</span>
                  <p style="font-size:12px;color:var(--gray-500);margin:4px 0 0">{{ selectedRole?.Description }}</p>
                </div>
              </div>

              <div v-if="assignError" class="alert alert--error" style="margin-top:12px">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M7.5 4.5v3.5M7.5 10h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                {{ assignError }}
              </div>

              <div v-if="assignSuccess" class="alert alert--success" style="margin-top:12px">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7.5l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Acceso asignado correctamente.
              </div>
            </div>

            <div class="step-actions">
              <button class="btn-ghost" @click="assignStep = 2" :disabled="saving">← Volver</button>
              <button class="btn-primary" @click="saveAccess" :disabled="saving || assignSuccess">
                <svg v-if="saving" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                {{ saving ? 'Guardando...' : 'Asignar acceso' }}
              </button>
            </div>
          </div>

        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usersService } from '@/services/api.js'
import { notify, confirmDelete } from '@/services/notifications.js'

// --- Users list ---
const users = ref([])
const loadingUsers = ref(false)
const searchQuery = ref('')

const filteredUsers = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return users.value
  return users.value.filter(u => {
    const name = (u.fullName || u.Fullname || '').toLowerCase()
    const email = (u.email || u.Email || '').toLowerCase()
    const role = (u.role?.name || u.Role?.Name || u.roleName || '').toLowerCase()
    return name.includes(q) || email.includes(q) || role.includes(q)
  })
})

const roleSummary = computed(() => {
  const map = {}
  users.value.forEach(u => {
    const name = u.role?.name || u.Role?.Name || u.roleName || 'Sin rol'
    map[name] = (map[name] || 0) + 1
  })
  const colors = ['green', 'blue', 'gray', 'dark']
  return Object.entries(map).map(([name, count], i) => ({ name, count, color: colors[i % colors.length] }))
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

// --- Assign panel ---
const showAssignPanel = ref(false)
const assignStep = ref(1)

const internalId = ref('')
const validating = ref(false)
const validationError = ref('')
const validatedEmployee = ref(null)

const roles = ref([])
const loadingRoles = ref(false)
const selectedRoleId = ref(null)
const selectedRole = computed(() => roles.value.find(r => r.Id === selectedRoleId.value))

const saving = ref(false)
const assignError = ref('')
const assignSuccess = ref(false)

const closeAssignPanel = () => {
  showAssignPanel.value = false
  resetAssignForm()
}

const resetAssignForm = () => {
  assignStep.value = 1
  internalId.value = ''
  validationError.value = ''
  validatedEmployee.value = null
  selectedRoleId.value = null
  assignError.value = ''
  assignSuccess.value = false
}

const validateEmployee = async () => {
  if (!internalId.value) return
  validating.value = true
  validationError.value = ''
  validatedEmployee.value = null
  try {
    const res = await usersService.validateByInternalId(internalId.value)
    const data = res.data?.data ?? res.data
    if (!data || !data.Id) throw new Error('Empleado no encontrado')
    validatedEmployee.value = data
  } catch (e) {
    validationError.value = e.response?.data?.message || 'No se encontró ningún colaborador con ese código. Verifica el InternalId e intenta nuevamente.'
  } finally {
    validating.value = false
  }
}

const loadRoles = async () => {
  if (roles.value.length) return
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

const saveAccess = async () => {
  if (!validatedEmployee.value || !selectedRoleId.value) return
  saving.value = true
  assignError.value = ''
  try {
    await usersService.assignAccess(validatedEmployee.value.Id, selectedRoleId.value)
    assignSuccess.value = true
    notify.success(`Acceso asignado a ${validatedEmployee.value.Fullname}`)
    await loadUsers()
    setTimeout(closeAssignPanel, 1500)
  } catch (e) {
    assignError.value = e.response?.data?.message || 'Error al guardar el acceso. Intenta nuevamente.'
  } finally {
    saving.value = false
  }
}

const confirmRemove = async (user) => {
  const name = user.fullName || user.Fullname || 'este usuario'
  const confirmed = await confirmDelete(`¿Remover acceso de ${name}?`, 'Esta acción revocará el acceso al CMS para este usuario.')
  if (!confirmed) return
  try {
    await usersService.removeAccess(user.id || user.Id)
    notify.success(`Acceso removido a ${name}`)
    await loadUsers()
  } catch (e) {
    notify.error('No se pudo remover el acceso.')
  }
}

// Load roles when step 2 is entered
import { watch } from 'vue'
watch(assignStep, (step) => { if (step === 2) loadRoles() })

// --- Helpers ---
const initials = (name = '') => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?'

const AVATAR_COLORS = ['#2563eb','#7c3aed','#db2777','#ea580c','#16a34a','#0891b2','#65a30d']
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

const formatDate = (val) => {
  if (!val) return '—'
  try { return new Date(val).toLocaleDateString('es-PA', { day: '2-digit', month: 'short', year: 'numeric' }) }
  catch { return '—' }
}

onMounted(loadUsers)
</script>

<style scoped>
.users-view {
  padding: 32px 28px;
  max-width: 1400px;
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
.search-bar__icon { color: var(--gray-400); flex-shrink: 0; }
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
  border: none; background: none; cursor: pointer; color: var(--gray-400); display: flex; padding: 0;
}
.search-bar__clear:hover { color: var(--gray-600); }

/* Skeleton */
.skeleton-list { padding: 12px 20px; display: flex; flex-direction: column; gap: 12px; }
.skeleton-row-item { display: flex; align-items: center; gap: 12px; }
.skeleton-row-item__body { flex: 1; display: flex; flex-direction: column; gap: 6px; }
.skeleton { background: var(--gray-100); border-radius: 6px; animation: shimmer 1.4s infinite; }
.skeleton--avatar { width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0; }
.skeleton--line { height: 12px; }
.skeleton--line-lg { width: 60%; }
.skeleton--line-md { width: 40%; }
.skeleton--badge { width: 70px; height: 22px; border-radius: 20px; }
.skeleton--role { height: 60px; border-radius: 10px; }
@keyframes shimmer { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

/* Empty state */
.empty-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 60px 20px; gap: 8px;
}
.empty-state__title { font-size: 14px; font-weight: 600; color: var(--gray-700); margin: 8px 0 0; }
.empty-state__desc { font-size: 13px; color: var(--gray-500); margin: 0; text-align: center; }

/* Table */
.table-wrap { overflow-x: auto; }
.users-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.users-table th {
  padding: 10px 16px; text-align: left; font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em; color: var(--gray-500);
  background: var(--gray-50); border-bottom: 1px solid var(--gray-100);
  white-space: nowrap;
}
.users-table td {
  padding: 12px 16px; border-bottom: 1px solid var(--gray-50);
  vertical-align: middle; color: var(--gray-800);
}
.users-table tbody tr:hover td { background: var(--gray-50); }
.users-table tbody tr:last-child td { border-bottom: none; }
.th-actions, .td-actions { text-align: right; }
.td-email { color: var(--gray-500); font-size: 12.5px; }
.td-date { color: var(--gray-500); font-size: 12.5px; white-space: nowrap; }

/* User cell */
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-cell__avatar {
  width: 32px; height: 32px; border-radius: 50%; color: #fff;
  font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.user-cell__name { font-weight: 500; color: var(--gray-900); font-size: 13px; }

/* Role badge */
.role-badge {
  display: inline-flex; align-items: center;
  padding: 3px 9px; border-radius: 20px; font-size: 11.5px; font-weight: 600;
}
.role-badge--admin { background: #eff6ff; color: #2563eb; }
.role-badge--editor { background: #f0fdf4; color: #16a34a; }
.role-badge--viewer { background: var(--gray-100); color: var(--gray-600); }

/* Action buttons */
.action-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 6px; border: 1px solid transparent;
  font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.13s;
  font-family: var(--font-sans);
}
.action-btn--danger { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.action-btn--danger:hover { background: #fee2e2; }

/* Assign panel */
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
.assign-panel__header { display: flex; align-items: center; justify-content: space-between; }
.assign-panel__title { font-size: 15px; font-weight: 700; color: var(--gray-900); margin: 0; }
.assign-panel__close {
  width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--gray-200);
  background: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--gray-400); transition: all 0.13s;
}
.assign-panel__close:hover { background: var(--gray-50); color: var(--gray-700); }

/* Steps bar */
.steps-bar { display: flex; align-items: center; gap: 0; }
.step { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
.step__dot {
  width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--gray-200);
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: var(--gray-400);
  background: #fff; transition: all 0.2s;
}
.step.active .step__dot { border-color: var(--primary-700); color: var(--primary-700); }
.step.done .step__dot { border-color: var(--primary-700); background: var(--primary-700); color: #fff; }
.step__label { font-size: 10px; font-weight: 600; color: var(--gray-400); white-space: nowrap; }
.step.active .step__label { color: var(--primary-700); }
.step.done .step__label { color: var(--gray-600); }
.step__line { flex: 1; height: 2px; background: var(--gray-200); margin: 0 4px; margin-bottom: 14px; transition: background 0.2s; }
.step__line.done { background: var(--primary-700); }

/* Panel step */
.panel-step { display: flex; flex-direction: column; gap: 12px; }

/* Input action row */
.input-action-row { display: flex; gap: 8px; }
.input-action-row .field-input { flex: 1; }

/* Alert */
.alert {
  display: flex; align-items: flex-start; gap: 8px;
  padding: 10px 14px; border-radius: 8px; font-size: 13px; line-height: 1.4;
}
.alert--error { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
.alert--success { background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; }
.alert svg { flex-shrink: 0; margin-top: 1px; }

/* Employee card */
.employee-card {
  border: 1.5px solid #bbf7d0; border-radius: 12px; background: #f0fdf4;
  padding: 16px; display: flex; flex-direction: column; align-items: center; gap: 10px;
}
.employee-card__badge {
  display: inline-flex; align-items: center; gap: 5px;
  background: #dcfce7; color: #16a34a; padding: 3px 10px; border-radius: 20px;
  font-size: 11.5px; font-weight: 700;
}
.employee-card__avatar {
  width: 52px; height: 52px; border-radius: 50%; color: #fff;
  font-size: 18px; font-weight: 700; display: flex; align-items: center; justify-content: center;
}
.employee-card__info { text-align: center; }
.employee-card__name { font-size: 15px; font-weight: 700; color: var(--gray-900); margin: 0 0 2px; }
.employee-card__email { font-size: 12.5px; color: var(--gray-500); margin: 0 0 2px; }
.employee-card__id { font-size: 11.5px; color: var(--gray-400); margin: 0; }
.btn--full { width: 100%; justify-content: center; }

/* Employee summary (step 2) */
.employee-summary {
  display: flex; align-items: center; gap: 10px;
  background: var(--gray-50); border: 1px solid var(--gray-200);
  border-radius: 10px; padding: 12px;
}
.employee-summary__avatar {
  width: 36px; height: 36px; border-radius: 50%; color: #fff;
  font-size: 13px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.employee-summary__name { font-size: 13px; font-weight: 600; color: var(--gray-900); margin: 0 0 2px; }
.employee-summary__email { font-size: 12px; color: var(--gray-500); margin: 0; }

/* Role options */
.roles-loading { display: flex; flex-direction: column; gap: 8px; }
.role-options { display: flex; flex-direction: column; gap: 8px; }
.role-option {
  display: flex; align-items: center; gap: 12px;
  border: 1.5px solid var(--gray-200); border-radius: 10px; padding: 12px 14px;
  cursor: pointer; transition: all 0.15s; background: #fff;
}
.role-option:hover { border-color: var(--primary-300); background: var(--primary-50); }
.role-option.selected { border-color: var(--primary-700); background: var(--primary-50); box-shadow: 0 0 0 3px rgba(37,99,235,.07); }
.role-option__radio { display: none; }
.role-option__content { flex: 1; }
.role-option__header { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
.role-option__name { font-size: 13px; font-weight: 600; color: var(--gray-900); }
.role-option__desc { font-size: 12px; color: var(--gray-500); margin: 0; }
.role-option__check { color: var(--primary-700); }

/* Confirm card */
.confirm-card {
  background: var(--gray-50); border: 1px solid var(--gray-200);
  border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px;
}
.confirm-card__title { font-size: 13px; font-weight: 700; color: var(--gray-700); margin: 0; }
.confirm-row { display: flex; flex-direction: column; gap: 4px; padding-bottom: 12px; border-bottom: 1px solid var(--gray-200); }
.confirm-row:last-of-type { border-bottom: none; padding-bottom: 0; }
.confirm-row__label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--gray-400); }

/* Step actions */
.step-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px; }

/* Animations */
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.3s ease; }
.slide-right-enter-from { opacity: 0; transform: translateX(20px); }
.slide-right-leave-to { opacity: 0; transform: translateX(20px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.spin { animation: spin 0.8s linear infinite; }
.spin-on-load.spin { animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
