<template>
  <div class="roles-view">

    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Roles y Permisos</h1>
        <p class="page-header__desc">Administra los roles del sistema y configura sus permisos por módulo.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="openPanel()">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5v11M1.5 7h11" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
          </svg>
          Nuevo rol
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="2" width="11" height="10" rx="2" stroke="currentColor" stroke-width="1.3"/>
            <path d="M4 6h6M4 8.5h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ roles.length }}</span>
          <span class="stat-chip__label">Roles totales</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon green">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <circle cx="11" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/>
            <path d="M10.3 10l.5.5.8-.8" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ totalPermissions }}</span>
          <span class="stat-chip__label">Permisos definidos</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon gray">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="5" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M1 12c0-2.209 1.791-4 4-4s4 1.791 4 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <path d="M10 7.5h3M11.5 6v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ totalUsersWithRoles }}</span>
          <span class="stat-chip__label">Usuarios con rol</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon dark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5L8.5 5h3.5l-2.8 2 1 3.5L7 8.5l-3.2 2 1-3.5L2 5h3.5L7 1.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ mostPermissiveRole }}</span>
          <span class="stat-chip__label">Rol más completo</span>
        </div>
      </div>
    </div>

    <!-- Main grid -->
    <div class="roles-grid" :class="{ 'roles-grid--split': showPanel }">

      <!-- Roles table -->
      <div class="table-card">
        <div class="table-card__header">
          <h2 class="table-card__title">Roles del sistema</h2>
          <button class="btn-primary" @click="openPanel()">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            </svg>
            Nuevo rol
          </button>
        </div>

        <div class="table-wrap">
          <table class="roles-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th class="th-center">Permisos</th>
                <th class="th-center">Usuarios</th>
                <th class="th-actions">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles" :key="role.id">
                <td>
                  <div class="role-name-cell">
                    <div class="role-icon" :class="roleIconClass(role.name)">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1L7.5 4.5H11l-2.8 2 1 3.5L6 8l-3.2 3 1-3.5L1 4.5h3.5L6 1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span class="role-name">{{ role.name }}</span>
                  </div>
                </td>
                <td class="td-desc">{{ role.description }}</td>
                <td class="td-center">
                  <span class="perm-count">{{ role.permissions.length }}</span>
                </td>
                <td class="td-center">
                  <span class="user-count">{{ role.usersCount }}</span>
                </td>
                <td class="td-actions">
                  <div class="actions-group">
                    <button class="action-btn action-btn--edit" @click="openPanel(role)">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M8.5 1.5L10.5 3.5 3.5 10.5l-2 .5.5-2 7-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Editar
                    </button>
                    <button class="action-btn action-btn--danger" @click="deleteRole(role)">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 3h8M4.5 3V2h3v1M5 5.5v3.5M7 5.5v3.5M2.5 3l.5 6.5a1 1 0 0 0 1 .9h4a1 1 0 0 0 1-.9L9.5 3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Side panel -->
      <Transition name="slide-right">
        <div v-if="showPanel" class="role-panel">
          <div class="role-panel__header">
            <h2 class="role-panel__title">{{ editingRole ? 'Editar rol' : 'Nuevo rol' }}</h2>
            <button class="panel-close" @click="closePanel" aria-label="Cerrar">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="role-panel__body">
            <!-- Name -->
            <div class="form-group">
              <label class="field-label">Nombre del rol <span class="field-required">*</span></label>
              <input v-model.trim="panelForm.name" type="text" class="field-input" placeholder="Ej: Editor, Moderador…">
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="field-label">Descripción</label>
              <textarea v-model.trim="panelForm.description" class="field-input field-textarea" rows="2" placeholder="Describe brevemente este rol…"></textarea>
            </div>

            <!-- Permissions matrix -->
            <div class="perms-section">
              <div class="perms-section__header">
                <p class="perms-section__title">Matriz de permisos</p>
                <button class="link-btn" @click="toggleAllPermissions">
                  {{ allSelected ? 'Deseleccionar todo' : 'Seleccionar todo' }}
                </button>
              </div>

              <div class="module-list">
                <div v-for="module in permissionsMatrix" :key="module.key" class="module-block">
                  <div class="module-block__header">
                    <span class="module-block__name">{{ module.label }}</span>
                    <button class="link-btn link-btn--sm" @click="toggleModule(module)">
                      {{ isModuleAllSelected(module) ? 'Ninguno' : 'Todos' }}
                    </button>
                  </div>
                  <div class="perm-grid">
                    <label
                      v-for="perm in module.permissions"
                      :key="perm"
                      class="perm-checkbox"
                      :class="{ checked: panelForm.permissions.includes(perm) }"
                    >
                      <input
                        type="checkbox"
                        :value="perm"
                        v-model="panelForm.permissions"
                        class="perm-checkbox__input"
                      >
                      <span class="perm-checkbox__box">
                        <svg v-if="panelForm.permissions.includes(perm)" width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </span>
                      <span class="perm-checkbox__label">{{ perm.split('.')[1] }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="role-panel__footer">
            <button class="btn-ghost" @click="closePanel">Cancelar</button>
            <button class="btn-primary" @click="saveRole" :disabled="!panelForm.name.trim()">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ editingRole ? 'Actualizar rol' : 'Crear rol' }}
            </button>
          </div>
        </div>
      </Transition>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Permissions matrix definition ---
const permissionsMatrix = [
  {
    key: 'posts',
    label: 'Publicaciones',
    permissions: ['posts.read', 'posts.create', 'posts.edit', 'posts.delete', 'posts.publish']
  },
  {
    key: 'categories',
    label: 'Categorías',
    permissions: ['categories.read', 'categories.create', 'categories.edit', 'categories.delete']
  },
  {
    key: 'media',
    label: 'Multimedia',
    permissions: ['media.read', 'media.upload', 'media.delete']
  },
  {
    key: 'users',
    label: 'Usuarios',
    permissions: ['users.read', 'users.manage']
  },
  {
    key: 'pagebuilder',
    label: 'Page Builder',
    permissions: ['pagebuilder.edit']
  },
  {
    key: 'audit',
    label: 'Auditoría',
    permissions: ['audit.read']
  },
  {
    key: 'analytics',
    label: 'Analíticas',
    permissions: ['analytics.read']
  },
  {
    key: 'companies',
    label: 'Empresas',
    permissions: ['companies.read', 'companies.manage']
  }
]

const allPermissions = permissionsMatrix.flatMap(m => m.permissions)

// --- Mock data ---
const roles = ref([
  {
    id: 1,
    name: 'SuperAdmin',
    description: 'Acceso total al sistema. Puede gestionar todos los módulos y configuraciones.',
    permissions: [...allPermissions],
    usersCount: 2
  },
  {
    id: 2,
    name: 'Editor',
    description: 'Puede crear, editar y publicar contenido. Acceso a multimedia y categorías.',
    permissions: ['posts.read', 'posts.create', 'posts.edit', 'posts.publish', 'categories.read', 'media.read', 'media.upload', 'media.delete'],
    usersCount: 5
  },
  {
    id: 3,
    name: 'Viewer',
    description: 'Solo puede leer publicaciones y categorías. Sin capacidad de edición.',
    permissions: ['posts.read', 'categories.read'],
    usersCount: 8
  }
])

// --- Stats computed ---
const totalPermissions = computed(() => allPermissions.length)

const totalUsersWithRoles = computed(() => roles.value.reduce((sum, r) => sum + r.usersCount, 0))

const mostPermissiveRole = computed(() => {
  if (!roles.value.length) return '—'
  return roles.value.reduce((max, r) => r.permissions.length > max.permissions.length ? r : max).name
})

// --- Panel state ---
const showPanel = ref(false)
const editingRole = ref(null)

const defaultForm = () => ({ name: '', description: '', permissions: [] })
const panelForm = ref(defaultForm())

const openPanel = (role = null) => {
  editingRole.value = role
  panelForm.value = role
    ? { name: role.name, description: role.description, permissions: [...role.permissions] }
    : defaultForm()
  showPanel.value = true
}

const closePanel = () => {
  showPanel.value = false
  editingRole.value = null
  panelForm.value = defaultForm()
}

const saveRole = () => {
  if (!panelForm.value.name.trim()) return
  if (editingRole.value) {
    const idx = roles.value.findIndex(r => r.id === editingRole.value.id)
    if (idx !== -1) {
      roles.value[idx] = {
        ...roles.value[idx],
        name: panelForm.value.name,
        description: panelForm.value.description,
        permissions: [...panelForm.value.permissions]
      }
    }
  } else {
    roles.value.push({
      id: Date.now(),
      name: panelForm.value.name,
      description: panelForm.value.description,
      permissions: [...panelForm.value.permissions],
      usersCount: 0
    })
  }
  closePanel()
}

const deleteRole = (role) => {
  const confirmed = window.confirm(`¿Eliminar el rol "${role.name}"?\n\nEsta acción no se puede deshacer. Los usuarios con este rol perderán sus permisos.`)
  if (!confirmed) return
  roles.value = roles.value.filter(r => r.id !== role.id)
}

// --- Permission helpers ---
const isModuleAllSelected = (module) => module.permissions.every(p => panelForm.value.permissions.includes(p))

const toggleModule = (module) => {
  if (isModuleAllSelected(module)) {
    panelForm.value.permissions = panelForm.value.permissions.filter(p => !module.permissions.includes(p))
  } else {
    const toAdd = module.permissions.filter(p => !panelForm.value.permissions.includes(p))
    panelForm.value.permissions = [...panelForm.value.permissions, ...toAdd]
  }
}

const allSelected = computed(() => allPermissions.every(p => panelForm.value.permissions.includes(p)))

const toggleAllPermissions = () => {
  if (allSelected.value) {
    panelForm.value.permissions = []
  } else {
    panelForm.value.permissions = [...allPermissions]
  }
}

// --- Helpers ---
const roleIconClass = (name = '') => {
  const n = name.toLowerCase()
  if (n.includes('super') || n.includes('admin')) return 'role-icon--admin'
  if (n.includes('editor')) return 'role-icon--editor'
  return 'role-icon--viewer'
}
</script>

<style scoped>
.roles-view {
  padding: 32px 28px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

/* Grid layout */
.roles-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  transition: grid-template-columns 0.3s ease;
}
.roles-grid--split {
  grid-template-columns: 1fr 400px;
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
  justify-content: space-between;
}
.table-card__title {
  font-size: 14px;
  font-weight: 650;
  color: var(--gray-900);
  margin: 0;
}

/* Table */
.table-wrap { overflow-x: auto; }
.roles-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.roles-table th {
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
.roles-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--gray-50);
  vertical-align: middle;
  color: var(--gray-800);
}
.roles-table tbody tr:hover td { background: var(--gray-50); }
.roles-table tbody tr:last-child td { border-bottom: none; }
.th-center, .td-center { text-align: center; }
.th-actions, .td-actions { text-align: right; }
.td-desc { color: var(--gray-500); font-size: 12.5px; max-width: 260px; }

/* Role name cell */
.role-name-cell { display: flex; align-items: center; gap: 10px; }
.role-icon {
  width: 28px; height: 28px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.role-icon--admin  { background: #eff6ff; color: #2563eb; }
.role-icon--editor { background: #f0fdf4; color: #16a34a; }
.role-icon--viewer { background: var(--gray-100); color: var(--gray-600); }
.role-name { font-weight: 600; color: var(--gray-900); font-size: 13px; }

/* Perm / user count badges */
.perm-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 30px; padding: 2px 8px;
  background: #eff6ff; color: #2563eb;
  border-radius: 20px; font-size: 12px; font-weight: 700;
}
.user-count {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 30px; padding: 2px 8px;
  background: var(--gray-100); color: var(--gray-700);
  border-radius: 20px; font-size: 12px; font-weight: 700;
}

/* Action buttons */
.actions-group { display: flex; align-items: center; gap: 4px; justify-content: flex-end; }
.action-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 6px; border: 1px solid transparent;
  font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.13s;
  font-family: var(--font-sans);
}
.action-btn--edit { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
.action-btn--edit:hover { background: #dbeafe; }
.action-btn--danger { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.action-btn--danger:hover { background: #fee2e2; }

/* Side panel */
.role-panel {
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
.role-panel__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid var(--gray-100);
  flex-shrink: 0;
}
.role-panel__title { font-size: 15px; font-weight: 700; color: var(--gray-900); margin: 0; }
.panel-close {
  width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--gray-200);
  background: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--gray-400); transition: all 0.13s;
}
.panel-close:hover { background: var(--gray-50); color: var(--gray-700); }

.role-panel__body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.role-panel__footer {
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  padding: 14px 20px;
  border-top: 1px solid var(--gray-100);
  flex-shrink: 0;
  background: var(--gray-50);
}

/* Form */
.form-group { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; font-weight: 600; color: var(--gray-700); }
.field-required { color: #dc2626; }
.field-textarea { resize: vertical; min-height: 60px; }

/* Permissions section */
.perms-section { display: flex; flex-direction: column; gap: 12px; }
.perms-section__header { display: flex; align-items: center; justify-content: space-between; }
.perms-section__title { font-size: 12px; font-weight: 700; color: var(--gray-700); margin: 0; text-transform: uppercase; letter-spacing: 0.06em; }

/* Module block */
.module-list { display: flex; flex-direction: column; gap: 10px; }
.module-block {
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  overflow: hidden;
}
.module-block__header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 12px;
  background: var(--gray-50);
  border-bottom: 1px solid var(--gray-100);
}
.module-block__name { font-size: 12px; font-weight: 600; color: var(--gray-800); }

/* Permission checkboxes */
.perm-grid { display: flex; flex-wrap: wrap; gap: 6px; padding: 10px 12px; }
.perm-checkbox {
  display: flex; align-items: center; gap: 6px;
  padding: 4px 8px; border-radius: 6px;
  border: 1px solid var(--gray-200);
  cursor: pointer; transition: all 0.12s;
  background: #fff;
}
.perm-checkbox:hover { border-color: #93c5fd; background: #eff6ff; }
.perm-checkbox.checked { border-color: #3b82f6; background: #eff6ff; }
.perm-checkbox__input { display: none; }
.perm-checkbox__box {
  width: 14px; height: 14px; border-radius: 3px;
  border: 1.5px solid var(--gray-300);
  display: flex; align-items: center; justify-content: center;
  background: #fff; flex-shrink: 0; transition: all 0.12s;
}
.perm-checkbox.checked .perm-checkbox__box { border-color: #2563eb; background: #2563eb; color: #fff; }
.perm-checkbox__label { font-size: 11.5px; font-weight: 500; color: var(--gray-700); white-space: nowrap; }
.perm-checkbox.checked .perm-checkbox__label { color: #1d4ed8; }

/* Link buttons */
.link-btn {
  font-size: 12px; font-weight: 600; color: #2563eb; background: none; border: none;
  cursor: pointer; padding: 0; font-family: var(--font-sans); transition: color 0.13s;
}
.link-btn:hover { color: #1d4ed8; text-decoration: underline; }
.link-btn--sm { font-size: 11px; }

/* Buttons */
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 15px; background: #2563eb; color: #fff;
  border: none; border-radius: 8px; font-size: 13px;
  font-weight: 550; cursor: pointer; transition: background 0.15s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-primary:hover { background: #1d4ed8; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; background: transparent; color: var(--gray-600);
  border: 1px solid var(--gray-200); border-radius: 8px;
  font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
.stat-chip { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); }
.stat-chip__icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-chip__icon.blue  { background: #eff6ff; color: #2563eb; }
.stat-chip__icon.green { background: #f0fdf4; color: #16a34a; }
.stat-chip__icon.gray  { background: var(--gray-100); color: var(--gray-600); }
.stat-chip__icon.dark  { background: var(--gray-900); color: #fff; }
.stat-chip__info { display: flex; flex-direction: column; gap: 1px; }
.stat-chip__value { font-size: 20px; font-weight: 700; line-height: 1; color: var(--gray-900); letter-spacing: -0.5px; }
.stat-chip__label { font-size: 11.5px; color: var(--gray-400); font-weight: 500; }

/* Page header */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.page-header__title { font-size: 22px; font-weight: 650; letter-spacing: -0.4px; color: var(--gray-900); margin: 0 0 5px; }
.page-header__desc { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; }

/* Transition */
.slide-right-enter-active, .slide-right-leave-active { transition: all 0.3s ease; }
.slide-right-enter-from { opacity: 0; transform: translateX(20px); }
.slide-right-leave-to { opacity: 0; transform: translateX(20px); }

@media (max-width: 768px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .roles-grid--split { grid-template-columns: 1fr; }
}
</style>
