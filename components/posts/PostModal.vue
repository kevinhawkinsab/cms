<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container post-modal">
        <div class="modal-header">
          <h2 class="modal-title">{{ isEdit ? 'Editar publicación' : 'Nueva publicación' }}</h2>
          <button class="btn-ghost btn-icon" @click="$emit('close')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="modal-body post-modal-body">
          <!-- Main column -->
          <div class="main-col">
            <div class="form-group">
              <label class="form-label">Título *</label>
              <input v-model="form.title" class="form-input" :class="{ 'is-error': errors.title }" placeholder="Título de la publicación" />
              <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
            </div>

            <div class="form-group">
              <label class="form-label">Resumen / Excerpt *</label>
              <textarea v-model="form.excerpt" class="form-input" rows="3" placeholder="Breve descripción…" :class="{ 'is-error': errors.excerpt }" />
              <p v-if="errors.excerpt" class="form-error">{{ errors.excerpt }}</p>
            </div>

            <div class="form-group">
              <label class="form-label">Contenido *</label>
              <ClientOnly>
                <QuillEditor
                  v-model:content="form.content"
                  content-type="html"
                  :options="quillOptions"
                  style="min-height:220px"
                />
              </ClientOnly>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">URL de video</label>
                <input v-model="form.videoUrl" type="url" class="form-input" placeholder="https://youtube.com/..." />
              </div>
              <div class="form-group">
                <label class="form-label">URL canónica</label>
                <input v-model="form.canonicalUrl" type="url" class="form-input" placeholder="https://..." />
              </div>
            </div>

            <div class="section-divider">SEO</div>

            <div class="form-group">
              <label class="form-label">Meta título <small class="char-count">{{ form.metaTitle.length }}/60</small></label>
              <input v-model="form.metaTitle" class="form-input" maxlength="60" placeholder="Título para buscadores" />
            </div>
            <div class="form-group">
              <label class="form-label">Meta descripción <small class="char-count">{{ form.metaDescription.length }}/160</small></label>
              <textarea v-model="form.metaDescription" class="form-input" rows="2" maxlength="160" placeholder="Descripción para buscadores" />
            </div>
            <div class="form-group">
              <label class="form-label">Meta keywords</label>
              <input v-model="form.metaKeywords" class="form-input" placeholder="keyword1, keyword2, keyword3" />
            </div>
          </div>

          <!-- Sidebar -->
          <div class="sidebar-col">
            <!-- Featured image -->
            <div class="card sidebar-card">
              <div class="card-body">
                <label class="form-label">Imagen destacada</label>
                <div class="featured-preview" v-if="form.thumbnail">
                  <img :src="form.thumbnail" class="featured-img" />
                  <button class="remove-thumb" @click="form.thumbnail = ''">✕</button>
                </div>
                <div v-else class="featured-placeholder" @click="triggerImageInput">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span>Subir imagen</span>
                </div>
                <input ref="imageInput" type="file" accept="image/*" style="display:none" @change="onImageUpload" />
                <input v-model="form.thumbnail" class="form-input mt-2" placeholder="O pegar URL de imagen" style="font-size:0.75rem" />
              </div>
            </div>

            <!-- Settings -->
            <div class="card sidebar-card">
              <div class="card-body">
                <div class="toggle-row">
                  <label class="form-label" style="margin:0">Visible en la web</label>
                  <div class="toggle" :class="{ on: form.visible }" @click="form.visible = !form.visible">
                    <div class="toggle-thumb" />
                  </div>
                </div>

                <div class="form-group mt-3">
                  <label class="form-label">Fecha de publicación</label>
                  <input v-model="form.publishedAt" type="datetime-local" class="form-input" />
                </div>
              </div>
            </div>

            <!-- Categories -->
            <div class="card sidebar-card">
              <div class="card-body">
                <label class="form-label">Categorías</label>
                <div class="categories-list">
                  <label
                    v-for="cat in categoriesStore.items"
                    :key="cat.id"
                    class="cat-item"
                  >
                    <input
                      type="checkbox"
                      :value="cat.id"
                      v-model="form.categories"
                      class="checkbox"
                    />
                    <span :style="{ borderLeft: `3px solid ${cat.color}`, paddingLeft: '6px' }">{{ cat.name }}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="card sidebar-card">
              <div class="card-body">
                <label class="form-label">Etiquetas</label>
                <input v-model="tagsInput" class="form-input" placeholder="etiqueta1, etiqueta2" style="font-size:var(--text-sm)" />
                <p class="form-error" style="color:var(--color-text-muted)">Separadas por comas</p>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn-secondary" @click="$emit('close')">Cancelar</button>
          <button class="btn-primary" :disabled="saving" @click="save">
            <svg v-if="saving" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {{ saving ? 'Guardando…' : (isEdit ? 'Actualizar' : 'Crear publicación') }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { notify } from '~/services/notifications'

const props = defineProps({ post: Object, companyId: [String, Number] })
const emit = defineEmits(['close', 'saved'])

const postsStore = usePostsStore()
const categoriesStore = useCategoriesStore()

const isEdit = computed(() => !!props.post?.id)
const saving = ref(false)
const imageInput = ref(null)
const tagsInput = ref('')

const form = ref({
  title: '',
  excerpt: '',
  content: '',
  thumbnail: '',
  visible: true,
  publishedAt: new Date().toISOString().slice(0, 16),
  categories: [],
  tags: [],
  videoUrl: '',
  canonicalUrl: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
})

const errors = ref({ title: '', excerpt: '' })

const quillOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  },
}

onMounted(() => {
  if (props.companyId) categoriesStore.fetch(props.companyId)
  if (props.post) {
    Object.assign(form.value, props.post)
    form.value.categories = props.post.categories?.map((c) => c.id ?? c) ?? []
    form.value.publishedAt = props.post.publishedAt?.slice(0, 16) ?? new Date().toISOString().slice(0, 16)
    tagsInput.value = Array.isArray(props.post.tags) ? props.post.tags.join(', ') : (props.post.tags ?? '')
  }
})

function validate() {
  errors.value.title = form.value.title.trim() ? '' : 'El título es requerido'
  errors.value.excerpt = form.value.excerpt.trim() ? '' : 'El resumen es requerido'
  return !errors.value.title && !errors.value.excerpt
}

async function save() {
  if (!validate()) return
  saving.value = true
  try {
    const payload = {
      ...form.value,
      tags: tagsInput.value.split(',').map((t) => t.trim()).filter(Boolean),
      companyId: props.companyId,
    }
    if (isEdit.value) {
      await postsStore.update(props.post.id, payload)
      notify.success('Publicación actualizada')
    } else {
      await postsStore.create(payload)
      notify.success('Publicación creada')
    }
    emit('saved')
  } catch {
    notify.error('Error al guardar')
  } finally {
    saving.value = false
  }
}

function triggerImageInput() { imageInput.value?.click() }

async function onImageUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { form.value.thumbnail = ev.target.result }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
.post-modal { max-width: 900px; }
.modal-title { font-size: var(--text-xl); font-weight: 700; color: var(--color-text-primary); margin: 0; }

.post-modal-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 1.5rem;
}
@media (max-width: 700px) { .post-modal-body { grid-template-columns: 1fr; } }

.main-col { display: flex; flex-direction: column; }
.sidebar-col { display: flex; flex-direction: column; gap: 1rem; }

.sidebar-card { }
.sidebar-card .card-body { padding: 1rem; }

.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

.section-divider {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin: 1rem 0 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.char-count { color: var(--color-text-muted); font-size: 0.7rem; font-weight: 400; margin-left: 6px; }

.featured-preview { position: relative; border-radius: var(--radius-md); overflow: hidden; aspect-ratio: 16/9; margin-bottom: 8px; }
.featured-img { width: 100%; height: 100%; object-fit: cover; }
.remove-thumb {
  position: absolute; top: 6px; right: 6px;
  width: 24px; height: 24px;
  background: rgba(0,0,0,0.5); color: white;
  border: none; border-radius: 50%; cursor: pointer;
  font-size: 12px; display: flex; align-items: center; justify-content: center;
}

.featured-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 16/9;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.featured-placeholder:hover { border-color: var(--color-brand-300); color: var(--color-primary); background: var(--color-primary-light); }

.toggle-row { display: flex; align-items: center; justify-content: space-between; }
.toggle {
  width: 42px; height: 24px;
  border-radius: 12px;
  background: var(--color-border);
  position: relative;
  cursor: pointer;
  transition: background var(--transition-fast);
  flex-shrink: 0;
}
.toggle.on { background: var(--color-primary); }
.toggle-thumb {
  position: absolute;
  width: 18px; height: 18px;
  background: white;
  border-radius: 50%;
  top: 3px; left: 3px;
  transition: transform var(--transition-fast);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle.on .toggle-thumb { transform: translateX(18px); }

.mt-3 { margin-top: 0.75rem; }
.mt-2 { margin-top: 0.5rem; }

.categories-list { display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; }
.cat-item { display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); cursor: pointer; padding: 4px 0; }

.checkbox { width: 15px; height: 15px; accent-color: var(--color-primary); }
</style>
