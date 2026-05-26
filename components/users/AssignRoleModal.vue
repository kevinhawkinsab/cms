<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container" style="max-width:520px">
        <div class="modal-header">
          <h2 class="modal-title">{{ editingUser ? 'Cambiar rol' : 'Asignar acceso' }}</h2>
          <button class="btn-ghost btn-icon" @click="$emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <!-- Edit role mode -->
          <div v-if="editingUser">
            <div class="user-confirm-card">
              <div class="confirm-avatar">{{ initials(editingUser.name) }}</div>
              <div>
                <div class="confirm-name">{{ editingUser.name }}</div>
                <div class="confirm-email">{{ editingUser.email }}</div>
                <code class="mono" style="font-size:0.7rem;color:var(--color-text-muted)">{{ editingUser.internalId }}</code>
              </div>
            </div>
          </div>

          <!-- Assign new user mode -->
          <template v-else>
            <!-- Internal ID lookup -->
            <div class="form-group">
              <label class="form-label">Internal ID *</label>
              <div class="lookup-row">
                <input
                  v-model="internalId"
                  class="form-input"
                  placeholder="ID interno del colaborador"
                  :disabled="usersStore.lookupState === 'found'"
                />
                <button
                  class="btn-secondary btn-sm"
                  :disabled="!internalId || usersStore.lookupState === 'loading'"
                  @click="lookup"
                >
                  <svg v-if="usersStore.lookupState === 'loading'" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  {{ usersStore.lookupState === 'loading' ? 'Buscando…' : 'Verificar' }}
                </button>
              </div>
            </div>

            <!-- States -->
            <Transition name="fade">
              <div v-if="usersStore.lookupState === 'not_found'" class="alert alert-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                No se encontró un colaborador con ese ID.
              </div>
              <div v-else-if="usersStore.lookupState === 'already_has_access'" class="alert alert-warning">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Este colaborador ya tiene acceso al CMS.
              </div>
            </Transition>

            <!-- Found user card -->
            <Transition name="slide-up">
              <div v-if="usersStore.lookupState === 'found' && usersStore.lookedUpUser" class="user-confirm-card">
                <div class="confirm-avatar">{{ initials(usersStore.lookedUpUser.name) }}</div>
                <div>
                  <div class="confirm-name">{{ usersStore.lookedUpUser.name }}</div>
                  <div class="confirm-email">{{ usersStore.lookedUpUser.email }}</div>
                  <div v-if="usersStore.lookedUpUser.department" class="confirm-dept">{{ usersStore.lookedUpUser.department }}</div>
                </div>
                <button class="btn-ghost btn-icon-sm" @click="usersStore.resetLookup(); internalId = ''">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </Transition>
          </template>

          <!-- Role selection -->
          <div v-if="canSelectRole" class="form-group mt-4">
            <label class="form-label">Rol a asignar *</label>
            <div class="role-options">
              <label v-for="r in roles" :key="r.val" class="role-option" :class="{ selected: selectedRole === r.val }">
                <input type="radio" v-model="selectedRole" :value="r.val" style="display:none" />
                <div class="role-option-icon" v-html="r.icon" />
                <div>
                  <div class="role-option-name">{{ r.label }}</div>
                  <div class="role-option-desc">{{ r.desc }}</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Note -->
          <div v-if="canSelectRole" class="form-group">
            <label class="form-label">Nota opcional</label>
            <textarea v-model="note" class="form-input" rows="2" placeholder="Razón del acceso (para auditoría)…" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button
            class="btn-primary"
            :disabled="!canSubmit || saving"
            @click="submit"
          >
            <svg v-if="saving" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ saving ? 'Guardando…' : (editingUser ? 'Cambiar rol' : 'Asignar acceso') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { notify } from '~/services/notifications'

const props = defineProps({ editingUser: Object, companyId: [String, Number] })
const emit = defineEmits(['close', 'saved'])

const usersStore = useUsersStore()
const internalId = ref('')
const selectedRole = ref('editor')
const note = ref('')
const saving = ref(false)

const roles = [
  { val: 'admin', label: 'Administrador', desc: 'Acceso total dentro de la empresa', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
  { val: 'editor', label: 'Editor', desc: 'Crear, editar y publicar contenido', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>' },
  { val: 'contributor', label: 'Colaborador', desc: 'Solo crear borradores', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
  { val: 'viewer', label: 'Visualizador', desc: 'Solo lectura', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>' },
]

const canSelectRole = computed(() =>
  !!props.editingUser || usersStore.lookupState === 'found'
)

const canSubmit = computed(() =>
  canSelectRole.value && !!selectedRole.value
)

function initials(name) {
  return name?.split(' ').slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') ?? '?'
}

async function lookup() {
  if (!internalId.value.trim()) return
  await usersStore.lookupCollaborator(internalId.value.trim())
}

async function submit() {
  saving.value = true
  try {
    if (props.editingUser) {
      await usersStore.updateRole(props.editingUser.id, selectedRole.value)
      notify.success('Rol actualizado')
    } else {
      await usersStore.assignRole({
        internalId: usersStore.lookedUpUser?.internalId ?? internalId.value,
        role: selectedRole.value,
        note: note.value,
        companyId: props.companyId,
      })
      notify.success('Acceso asignado')
    }
    emit('saved')
  } catch { notify.error('Error al guardar') }
  finally { saving.value = false }
}
</script>

<style scoped>
.modal-title { font-size: var(--text-xl); font-weight: 700; margin: 0; }

.lookup-row { display: flex; gap: 8px; }
.lookup-row .form-input { flex: 1; }

.alert { display: flex; align-items: center; gap: 8px; padding: 0.65rem 1rem; border-radius: var(--radius-md); font-size: var(--text-sm); margin-bottom: 0.75rem; }
.alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; }
.alert-warning { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }

.user-confirm-card {
  display: flex; align-items: center; gap: 12px;
  padding: 1rem;
  border-radius: var(--radius-lg);
  background: var(--color-primary-light);
  border: 1px solid var(--color-brand-200);
  margin-bottom: 0.75rem;
}
.confirm-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: var(--color-primary); color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; font-weight: 700; flex-shrink: 0;
}
.confirm-name { font-weight: 600; font-size: var(--text-sm); color: var(--color-text-primary); }
.confirm-email { font-size: var(--text-xs); color: var(--color-text-muted); }
.confirm-dept { font-size: var(--text-xs); color: var(--color-text-muted); }

.role-options { display: flex; flex-direction: column; gap: 6px; }
.role-option {
  display: flex; align-items: center; gap: 12px;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-border);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.role-option:hover { border-color: var(--color-brand-300); background: var(--color-primary-light); }
.role-option.selected { border-color: var(--color-primary); background: var(--color-primary-light); }
.role-option-icon { color: var(--color-primary); display: flex; align-items: center; flex-shrink: 0; }
.role-option-name { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); }
.role-option-desc { font-size: var(--text-xs); color: var(--color-text-muted); }

.mt-4 { margin-top: 1rem; }
</style>
