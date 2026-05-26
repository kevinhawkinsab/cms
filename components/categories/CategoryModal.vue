<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container" style="max-width:480px">
        <div class="modal-header">
          <h2 class="modal-title">{{ isEdit ? 'Editar categoría' : 'Nueva categoría' }}</h2>
          <button class="btn-ghost btn-icon" @click="$emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Nombre *</label>
            <input v-model="form.name" class="form-input" :class="{ 'is-error': errors.name }" placeholder="Nombre de la categoría" />
            <p v-if="errors.name" class="form-error">{{ errors.name }}</p>
          </div>
          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea v-model="form.description" class="form-input" rows="3" placeholder="Descripción opcional…" />
          </div>
          <div class="form-group">
            <label class="form-label">Color</label>
            <div class="color-row">
              <input type="color" v-model="form.color" class="color-picker" />
              <input v-model="form.color" class="form-input mono" placeholder="#1A4F3A" style="flex:1" />
            </div>
            <div class="color-presets">
              <button
                v-for="preset in colorPresets"
                :key="preset"
                class="color-preset"
                :style="{ background: preset, outline: form.color === preset ? '2px solid #0f172a' : 'none' }"
                @click="form.color = preset"
              />
            </div>
          </div>
          <!-- Preview -->
          <div class="preview-card" :style="{ borderLeft: `4px solid ${form.color}` }">
            <strong style="font-size:var(--text-sm)">{{ form.name || 'Nombre de la categoría' }}</strong>
            <span style="font-size:var(--text-xs);color:var(--color-text-muted)">{{ form.description || 'Descripción…' }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button class="btn-primary" :disabled="saving" @click="save">
            <svg v-if="saving" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ saving ? 'Guardando…' : (isEdit ? 'Actualizar' : 'Crear') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { notify } from '~/services/notifications'

const props = defineProps({ category: Object, companyId: [String, Number] })
const emit = defineEmits(['close', 'saved'])

const categoriesStore = useCategoriesStore()
const isEdit = computed(() => !!props.category?.id)
const saving = ref(false)

const colorPresets = ['#1A4F3A','#2E8B57','#8fd9b6','#1E88C6','#c6e8f7','#e67e22','#e74c3c','#9b59b6','#34495e','#f1c40f']

const form = ref({ name: '', description: '', color: '#1A4F3A' })
const errors = ref({ name: '' })

onMounted(() => {
  if (props.category) Object.assign(form.value, props.category)
})

function validate() {
  errors.value.name = form.value.name.trim() ? '' : 'El nombre es requerido'
  return !errors.value.name
}

async function save() {
  if (!validate()) return
  saving.value = true
  try {
    const payload = { ...form.value, companyId: props.companyId }
    if (isEdit.value) {
      await categoriesStore.update(props.category.id, payload)
      notify.success('Categoría actualizada')
    } else {
      await categoriesStore.create(payload)
      notify.success('Categoría creada')
    }
    emit('saved')
  } catch { notify.error('Error al guardar') }
  finally { saving.value = false }
}
</script>

<style scoped>
.modal-title { font-size: var(--text-xl); font-weight: 700; margin: 0; }
.color-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.color-picker { width: 44px; height: 38px; border: 1px solid var(--color-border); border-radius: var(--radius-md); cursor: pointer; padding: 2px; background: white; }
.color-presets { display: flex; gap: 6px; flex-wrap: wrap; }
.color-preset { width: 26px; height: 26px; border-radius: 50%; border: 2px solid white; cursor: pointer; transition: transform var(--transition-fast); box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.color-preset:hover { transform: scale(1.15); }
.preview-card {
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
}
</style>
