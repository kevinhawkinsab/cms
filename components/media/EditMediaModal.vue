<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container" style="max-width:480px">
        <div class="modal-header">
          <h2 class="modal-title">Editar archivo</h2>
          <button class="btn-ghost btn-icon" @click="$emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="preview-wrap">
            <img v-if="isImage" :src="item.url" :alt="item.alt" class="edit-preview-img" />
            <div v-else class="edit-preview-icon">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>{{ item.filename }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Texto alternativo (alt)</label>
            <input v-model="form.alt" class="form-input" placeholder="Describe la imagen…" />
          </div>
          <div class="form-group">
            <label class="form-label">Caption</label>
            <input v-model="form.caption" class="form-input" placeholder="Pie de foto o descripción" />
          </div>
          <div class="form-group">
            <label class="form-label">Categoría</label>
            <input v-model="form.category" class="form-input" placeholder="Categoría del archivo" />
          </div>
          <label class="checkbox-label">
            <input type="checkbox" v-model="form.downloadable" class="checkbox" />
            <span>Marcar como descargable</span>
          </label>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button class="btn-primary" :disabled="saving" @click="save">{{ saving ? 'Guardando…' : 'Guardar cambios' }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { notify } from '~/services/notifications'

const props = defineProps({ item: Object })
const emit = defineEmits(['close', 'saved'])

const mediaStore = useMediaStore()
const saving = ref(false)
const isImage = computed(() => props.item?.mimeType?.startsWith('image/'))

const form = ref({ alt: '', caption: '', category: '', downloadable: false })

onMounted(() => { Object.assign(form.value, props.item) })

async function save() {
  saving.value = true
  try {
    await mediaStore.updateMeta(props.item.id, form.value)
    notify.success('Metadatos actualizados')
    emit('saved')
  } catch { notify.error('Error al guardar') }
  finally { saving.value = false }
}
</script>

<style scoped>
.modal-title { font-size: var(--text-xl); font-weight: 700; margin: 0; }
.preview-wrap { margin-bottom: 1.25rem; border-radius: var(--radius-md); overflow: hidden; background: var(--color-bg); }
.edit-preview-img { width: 100%; max-height: 220px; object-fit: contain; display: block; }
.edit-preview-icon { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 2rem; color: var(--color-text-muted); font-size: var(--text-xs); }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); cursor: pointer; }
.checkbox { width: 15px; height: 15px; accent-color: var(--color-primary); }
</style>
