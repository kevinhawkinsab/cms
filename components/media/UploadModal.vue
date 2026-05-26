<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container" style="max-width:560px">
        <div class="modal-header">
          <h2 class="modal-title">Subir archivos</h2>
          <button class="btn-ghost btn-icon" @click="$emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <!-- Drop zone -->
          <div
            class="drop-zone"
            :class="{ dragging: isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="onDrop"
            @click="fileInput?.click()"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>
            <p class="drop-text">Arrastra archivos aquí o <span class="drop-link">selecciona</span></p>
            <p class="drop-sub">PNG, JPG, GIF, PDF, DOC — Max 20 MB</p>
            <input ref="fileInput" type="file" multiple accept="image/*,.pdf,.doc,.docx,.xls,.xlsx" style="display:none" @change="onFileSelect" />
          </div>

          <!-- Queue -->
          <div v-if="queue.length" class="queue">
            <div v-for="(f, i) in queue" :key="i" class="queue-item">
              <div class="queue-thumb">
                <img v-if="f.preview" :src="f.preview" class="queue-img" />
                <div v-else class="queue-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
              </div>
              <div class="queue-info">
                <div class="queue-name">{{ f.file.name }}</div>
                <div class="queue-size">{{ formatFileSize(f.file.size) }}</div>
              </div>
              <button class="btn-ghost btn-icon-sm" @click="removeFromQueue(i)">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>

          <!-- Global meta -->
          <div class="meta-section" v-if="queue.length">
            <h4 class="meta-title">Metadatos globales</h4>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Categoría</label>
                <input v-model="meta.category" class="form-input" placeholder="Categoría" />
              </div>
              <div class="form-group">
                <label class="form-label">Alt por defecto</label>
                <input v-model="meta.alt" class="form-input" placeholder="Texto alternativo" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Caption por defecto</label>
              <input v-model="meta.caption" class="form-input" placeholder="Descripción del archivo" />
            </div>
            <label class="checkbox-label">
              <input type="checkbox" v-model="meta.downloadable" class="checkbox" />
              <span>Marcar como descargable</span>
            </label>
          </div>

          <!-- Progress -->
          <div v-if="uploading" class="progress-bar-wrap">
            <div class="progress-bar" :style="{ width: progress + '%' }" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="$emit('close')" :disabled="uploading">Cancelar</button>
          <button class="btn-primary" :disabled="!queue.length || uploading" @click="upload">
            <svg v-if="uploading" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ uploading ? `Subiendo ${progress}%…` : `Subir ${queue.length} archivo(s)` }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { notify } from '~/services/notifications'
import { formatFileSize } from '~/utils/normalizers'

const props = defineProps({ companyId: [String, Number] })
const emit = defineEmits(['close', 'uploaded'])

const mediaStore = useMediaStore()
const fileInput = ref(null)
const isDragging = ref(false)
const uploading = ref(false)
const progress = ref(0)
const queue = ref([])
const meta = ref({ category: '', alt: '', caption: '', downloadable: false })

function addFiles(files) {
  for (const file of files) {
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    queue.value.push({ file, preview })
  }
}

function onFileSelect(e) { addFiles(Array.from(e.target.files ?? [])) }
function onDrop(e) { isDragging.value = false; addFiles(Array.from(e.dataTransfer.files)) }
function removeFromQueue(i) { queue.value.splice(i, 1) }

async function upload() {
  uploading.value = true
  progress.value = 0
  try {
    const files = queue.value.map((q) => q.file)
    await mediaStore.upload(files, meta.value, props.companyId)
    notify.success(`${files.length} archivo(s) subido(s)`)
    emit('uploaded')
  } catch { notify.error('Error al subir archivos') }
  finally { uploading.value = false; progress.value = 0 }
}
</script>

<style scoped>
.modal-title { font-size: var(--text-xl); font-weight: 700; margin: 0; }
.drop-zone {
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; transition: all var(--transition-fast);
  color: var(--color-text-muted);
}
.drop-zone:hover, .drop-zone.dragging { border-color: var(--color-brand-400); background: var(--color-primary-light); color: var(--color-primary); }
.drop-text { font-size: var(--text-sm); font-weight: 500; }
.drop-link { color: var(--color-primary); text-decoration: underline; }
.drop-sub { font-size: var(--text-xs); color: var(--color-text-muted); }

.queue { margin-top: 1rem; display: flex; flex-direction: column; gap: 6px; }
.queue-item { display: flex; align-items: center; gap: 10px; padding: 0.5rem; border-radius: var(--radius-md); background: var(--color-bg); border: 1px solid var(--color-border); }
.queue-thumb { width: 40px; height: 40px; border-radius: var(--radius-md); overflow: hidden; flex-shrink: 0; background: var(--color-border); display: flex; align-items: center; justify-content: center; }
.queue-img { width: 100%; height: 100%; object-fit: cover; }
.queue-icon { color: var(--color-text-muted); }
.queue-info { flex: 1; min-width: 0; }
.queue-name { font-size: var(--text-xs); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.queue-size { font-size: 0.7rem; color: var(--color-text-muted); }

.meta-section { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--color-border); }
.meta-title { font-size: var(--text-sm); font-weight: 600; margin: 0 0 0.75rem; color: var(--color-text-primary); }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); cursor: pointer; }
.checkbox { width: 15px; height: 15px; accent-color: var(--color-primary); }

.progress-bar-wrap { margin-top: 1rem; height: 6px; background: var(--color-border); border-radius: var(--radius-full); overflow: hidden; }
.progress-bar { height: 100%; background: var(--color-primary); transition: width 0.3s ease; border-radius: var(--radius-full); }
</style>
