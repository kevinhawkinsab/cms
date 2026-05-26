<template>
  <div class="users-page">
    <div class="page-header">
      <div>
        <div class="breadcrumb">
          <NuxtLink to="/dashboard" class="breadcrumb-link">Dashboard</NuxtLink>
          <span class="breadcrumb-sep">/</span>
          <span class="breadcrumb-current">Usuarios</span>
        </div>
        <h1 class="page-title">Usuarios</h1>
        <p class="page-description">Gestiona el acceso al CMS de {{ companyStore.activeName }}</p>
      </div>
      <button v-if="hasPermission('users.assign')" class="btn-primary" @click="showAssign = true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        Asignar acceso
      </button>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-pill">
        <span class="stat-num">{{ usersStore.items.length }}</span>
        <span class="stat-lbl">Total</span>
      </div>
      <div v-for="(count, role) in usersStore.roleSummary" :key="role" class="stat-pill" :class="roleClass(role)">
        <span class="stat-num">{{ count }}</span>
        <span class="stat-lbl">{{ roleLabels[role] ?? role }}</span>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters-bar card">
      <div class="search-wrapper">
        <span class="search-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
        <input v-model="search" @input="usersStore.setFilter('search', search)" class="form-input search-input" placeholder="Buscar por nombre, email o ID…" />
      </div>
      <div class="pill-group">
        <button v-for="r in roleFilters" :key="r.val" class="pill-tab" :class="{ active: usersStore.filters.role === r.val }" @click="usersStore.setFilter('role', r.val)">{{ r.label }}</button>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <div v-if="usersStore.loading" class="p-6 space-y-3">
        <div v-for="i in 5" :key="i" class="skeleton" style="height:56px;border-radius:8px" />
      </div>
      <div v-else-if="!usersStore.filtered.length" class="empty-state">
        <div class="empty-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
        <p style="color:var(--color-text-muted);font-size:var(--text-sm)">No hay usuarios con acceso</p>
      </div>
      <div v-else class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Colaborador</th>
              <th>Internal ID</th>
              <th>Empresa</th>
              <th>Rol</th>
              <th>Asignado por</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersStore.filtered" :key="user.id">
              <td>
                <div class="user-cell">
                  <div class="user-avatar">{{ initials(user.name) }}</div>
                  <div>
                    <div class="user-name">{{ user.name }}</div>
                    <div class="user-email">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td><code class="mono">{{ user.internalId }}</code></td>
              <td>{{ user.companyName }}</td>
              <td>
                <span class="badge" :class="roleBadgeClass(user.role)">{{ roleLabels[user.role] ?? user.role }}</span>
              </td>
              <td style="color:var(--color-text-muted);font-size:var(--text-xs)">{{ user.assignedBy || '—' }}</td>
              <td style="color:var(--color-text-muted);font-size:var(--text-xs)">{{ formatDate(user.assignedAt) }}</td>
              <td>
                <div class="action-btns">
                  <button v-if="hasPermission('users.assign')" class="btn-ghost btn-icon-sm" title="Cambiar rol" @click="openEditRole(user)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  </button>
                  <button v-if="hasPermission('users.revoke')" class="btn-ghost btn-icon-sm" style="color:#ef4444" title="Revocar" @click="revokeAccess(user)">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Assign modal -->
    <AssignRoleModal
      v-if="showAssign"
      :editing-user="editingUser"
      :company-id="companyStore.activeId"
      @close="closeAssign"
      @saved="onSaved"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { notify } from '~/services/notifications'
import { formatDate } from '~/utils/normalizers'

definePageMeta({ middleware: ['auth', 'company'] })

const companyStore = useCompanyStore()
const usersStore = useUsersStore()
const { hasPermission } = usePermissions()

const showAssign = ref(false)
const editingUser = ref(null)
const search = ref('')

const roleLabels = { superadmin: 'Superadmin', admin: 'Admin', editor: 'Editor', contributor: 'Colaborador', viewer: 'Visualizador' }
const roleFilters = [
  { val: 'all', label: 'Todos' },
  { val: 'admin', label: 'Admin' },
  { val: 'editor', label: 'Editor' },
  { val: 'contributor', label: 'Colaborador' },
  { val: 'viewer', label: 'Visualizador' },
]

function initials(name) {
  return name?.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') ?? '?'
}
function roleClass(role) { return { admin: 'green', editor: 'blue', contributor: 'purple', viewer: 'gray' }[role] ?? '' }
function roleBadgeClass(role) { return { superadmin: 'badge-brand', admin: 'badge-green', editor: 'badge-blue', contributor: 'badge-purple', viewer: 'badge-gray' }[role] ?? 'badge-gray' }

async function load() {
  if (companyStore.activeId) await usersStore.fetch(companyStore.activeId)
}

onMounted(() => { load(); window.addEventListener('company:changed', load) })
onUnmounted(() => window.removeEventListener('company:changed', load))

function openEditRole(user) { editingUser.value = user; showAssign.value = true }
function closeAssign() { showAssign.value = false; editingUser.value = null; usersStore.resetLookup() }
async function onSaved() { closeAssign(); await load() }

async function revokeAccess(user) {
  const ok = await import('~/services/notifications').then((m) =>
    m.notify.confirm('¿Revocar acceso?', `${user.name} perderá acceso al CMS.`, 'Revocar', true)
  )
  if (!ok) return
  try { await usersStore.revokeAccess(user.id); notify.success('Acceso revocado') }
  catch { notify.error('Error al revocar') }
}
</script>

<style scoped>
.users-page { max-width: 1200px; }
.stats-row { display: flex; gap: 12px; margin-bottom: 1rem; flex-wrap: wrap; }
.stat-pill { display: flex; align-items: center; gap: 8px; padding: 0.4rem 0.85rem; border-radius: var(--radius-full); background: white; border: 1px solid var(--color-border); }
.stat-pill.green { border-color: #bbf7d0; background: #f0fdf4; }
.stat-pill.blue { border-color: #bfdbfe; background: #eff6ff; }
.stat-pill.purple { border-color: #e9d5ff; background: #faf5ff; }
.stat-num { font-weight: 700; font-size: var(--text-sm); }
.stat-lbl { font-size: var(--text-xs); color: var(--color-text-muted); }

.filters-bar { display: flex; align-items: center; gap: 12px; padding: 0.75rem 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.search-wrapper { position: relative; }
.search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); display: flex; align-items: center; pointer-events: none; }
.search-input { padding-left: 2.2rem; width: 260px; }

.table-wrap { overflow-x: auto; }
.user-cell { display: flex; align-items: center; gap: 10px; }
.user-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 700; flex-shrink: 0;
}
.user-name { font-weight: 500; font-size: var(--text-sm); color: var(--color-text-primary); }
.user-email { font-size: var(--text-xs); color: var(--color-text-muted); }

.action-btns { display: flex; gap: 4px; }
.p-6 { padding: 1.5rem; }
.space-y-3 > * + * { margin-top: 0.75rem; }
.pill-group { display: flex; gap: 4px; flex-wrap: wrap; }
</style>
