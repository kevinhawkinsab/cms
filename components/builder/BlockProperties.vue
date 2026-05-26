<template>
  <div class="properties-panel">
    <div class="panel-header">
      <h3 class="panel-title">Propiedades</h3>
      <span v-if="builderStore.selectedBlock" class="block-type-badge">{{ builderStore.selectedBlock.type }}</span>
    </div>

    <div v-if="!builderStore.selectedBlock" class="panel-empty">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      <p>Selecciona un bloque para editar sus propiedades</p>
    </div>

    <div v-else class="panel-content">
      <!-- Heading -->
      <template v-if="block.type === 'heading'">
        <div class="prop-group">
          <label class="prop-label">Texto</label>
          <input v-model="content.text" class="form-input" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Nivel</label>
          <select v-model="content.level" class="form-input" @change="update">
            <option v-for="l in ['h1','h2','h3','h4','h5','h6']" :key="l" :value="l">{{ l.toUpperCase() }}</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Alineación</label>
          <div class="align-btns">
            <button v-for="a in ['left','center','right']" :key="a" class="align-btn" :class="{ active: content.align === a }" @click="content.align = a; update()">{{ a }}</button>
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Color</label>
          <div class="color-input-row">
            <input type="color" v-model="content.color" @input="update" class="mini-color-picker" />
            <input v-model="content.color" class="form-input mono" @input="update" />
          </div>
        </div>
      </template>

      <!-- Paragraph -->
      <template v-else-if="block.type === 'paragraph'">
        <div class="prop-group">
          <label class="prop-label">Contenido (HTML)</label>
          <textarea v-model="content.html" class="form-input code-textarea" rows="8" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Color</label>
          <div class="color-input-row">
            <input type="color" v-model="content.color" @input="update" class="mini-color-picker" />
            <input v-model="content.color" class="form-input mono" @input="update" />
          </div>
        </div>
      </template>

      <!-- Quote -->
      <template v-else-if="block.type === 'quote'">
        <div class="prop-group">
          <label class="prop-label">Cita</label>
          <textarea v-model="content.text" class="form-input" rows="4" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Autor</label>
          <input v-model="content.author" class="form-input" @input="update" />
        </div>
      </template>

      <!-- Image -->
      <template v-else-if="block.type === 'image'">
        <div class="prop-group">
          <label class="prop-label">URL de imagen</label>
          <input v-model="content.url" class="form-input" placeholder="https://…" @input="update" />
          <div v-if="content.url" class="img-preview-sm"><img :src="content.url" /></div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Alt text</label>
          <input v-model="content.alt" class="form-input" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Caption</label>
          <input v-model="content.caption" class="form-input" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Alineación</label>
          <div class="align-btns">
            <button v-for="a in ['left','center','right']" :key="a" class="align-btn" :class="{ active: content.align === a }" @click="content.align = a; update()">{{ a }}</button>
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Ancho</label>
          <input v-model="content.width" class="form-input" placeholder="100%" @input="update" />
        </div>
      </template>

      <!-- YouTube -->
      <template v-else-if="block.type === 'youtube'">
        <div class="prop-group">
          <label class="prop-label">URL del video</label>
          <input v-model="content.url" class="form-input" placeholder="https://youtube.com/watch?v=…" @input="update" />
        </div>
      </template>

      <!-- Separator -->
      <template v-else-if="block.type === 'separator'">
        <div class="prop-group">
          <label class="prop-label">Estilo</label>
          <select v-model="content.style" class="form-input" @change="update">
            <option value="solid">Sólido</option>
            <option value="dashed">Punteado</option>
            <option value="dotted">Puntitos</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Color</label>
          <div class="color-input-row">
            <input type="color" v-model="content.color" @input="update" class="mini-color-picker" />
            <input v-model="content.color" class="form-input mono" @input="update" />
          </div>
        </div>
        <div class="prop-group">
          <label class="prop-label">Grosor (px)</label>
          <input v-model.number="content.thickness" type="number" min="1" max="10" class="form-input" @input="update" />
        </div>
      </template>

      <!-- Spacer -->
      <template v-else-if="block.type === 'spacer'">
        <div class="prop-group">
          <label class="prop-label">Altura (px)</label>
          <input v-model.number="content.height" type="number" min="4" max="400" class="form-input" @input="update" />
          <input v-model.number="content.height" type="range" min="4" max="400" class="range-input" @input="update" />
        </div>
      </template>

      <!-- HTML -->
      <template v-else-if="block.type === 'html'">
        <div class="prop-group">
          <label class="prop-label">Código HTML</label>
          <textarea v-model="content.code" class="form-input code-textarea" rows="12" spellcheck="false" @input="update" />
        </div>
      </template>

      <!-- Button -->
      <template v-else-if="block.type === 'button'">
        <div class="prop-group">
          <label class="prop-label">Texto del botón</label>
          <input v-model="content.text" class="form-input" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">URL de destino</label>
          <input v-model="content.url" class="form-input" placeholder="https://…" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Variante</label>
          <select v-model="content.variant" class="form-input" @change="update">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
          </select>
        </div>
        <div class="prop-group">
          <label class="prop-label">Alineación</label>
          <div class="align-btns">
            <button v-for="a in ['left','center','right']" :key="a" class="align-btn" :class="{ active: content.align === a }" @click="content.align = a; update()">{{ a }}</button>
          </div>
        </div>
      </template>

      <!-- Article list -->
      <template v-else-if="block.type === 'article-list'">
        <div class="prop-group">
          <label class="prop-label">Número de artículos</label>
          <input v-model.number="content.count" type="number" min="1" max="24" class="form-input" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Categoría (opcional)</label>
          <input v-model="content.category" class="form-input" placeholder="ID de categoría" @input="update" />
        </div>
      </template>

      <!-- Front page -->
      <template v-else-if="block.type === 'front-page'">
        <div class="prop-group">
          <label class="prop-label">Imagen de fondo</label>
          <input v-model="content.backgroundUrl" class="form-input" placeholder="https://…" @input="update" />
        </div>
        <div class="prop-group">
          <label class="prop-label">Título</label>
          <input v-model="content.title" class="form-input" @input="update" />
        </div>
        <label class="checkbox-label">
          <input type="checkbox" v-model="content.showBreadcrumbs" @change="update" class="checkbox" />
          <span>Mostrar breadcrumbs</span>
        </label>
      </template>

      <!-- Generic fallback -->
      <div v-else class="prop-fallback">
        <p>No hay propiedades configurables para este tipo de bloque.</p>
      </div>

      <!-- Visibility toggle (always shown) -->
      <div class="prop-divider" />
      <div class="prop-group toggle-row">
        <label class="prop-label" style="margin:0">Visible</label>
        <div class="toggle" :class="{ on: block.visible }" @click="builderStore.toggleBlockVisibility(block.id)">
          <div class="toggle-thumb" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const builderStore = usePageBuilderStore()

const block = computed(() => builderStore.selectedBlock)
const content = ref({})

watch(block, (b) => {
  if (b) content.value = { ...b.content }
}, { immediate: true, deep: true })

function update() {
  if (!block.value) return
  builderStore.updateBlockContent(block.value.id, content.value)
}
</script>

<style scoped>
.properties-panel {
  height: 100%;
  overflow-y: auto;
  background: white;
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.panel-title { font-weight: 700; font-size: var(--text-sm); margin: 0; }
.block-type-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
}

.panel-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 2rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--text-xs);
}

.panel-content { padding: 1rem; display: flex; flex-direction: column; gap: 0; }

.prop-group { margin-bottom: 1rem; }
.prop-label { display: block; font-size: var(--text-xs); font-weight: 600; color: var(--color-text-secondary); margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.04em; }

.align-btns { display: flex; gap: 4px; }
.align-btn {
  flex: 1;
  padding: 0.3rem;
  font-size: var(--text-xs);
  border: 1px solid var(--color-border);
  background: white;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-transform: capitalize;
}
.align-btn:hover { border-color: var(--color-brand-300); }
.align-btn.active { background: var(--color-primary); color: white; border-color: var(--color-primary); }

.color-input-row { display: flex; align-items: center; gap: 8px; }
.mini-color-picker { width: 38px; height: 34px; border: 1px solid var(--color-border); border-radius: var(--radius-md); cursor: pointer; padding: 2px; flex-shrink: 0; }

.code-textarea { font-family: var(--font-mono); font-size: 0.75rem; resize: vertical; }

.range-input { width: 100%; margin-top: 6px; accent-color: var(--color-primary); }

.img-preview-sm { margin-top: 8px; border-radius: var(--radius-md); overflow: hidden; max-height: 100px; }
.img-preview-sm img { width: 100%; height: 100%; object-fit: contain; background: var(--color-bg); }

.prop-divider { border-top: 1px solid var(--color-border); margin: 0.5rem 0 1rem; }
.toggle-row { display: flex; align-items: center; justify-content: space-between; }
.toggle {
  width: 38px; height: 22px;
  border-radius: 11px;
  background: var(--color-border);
  position: relative; cursor: pointer;
  transition: background var(--transition-fast); flex-shrink: 0;
}
.toggle.on { background: var(--color-primary); }
.toggle-thumb {
  position: absolute; width: 16px; height: 16px;
  background: white; border-radius: 50%;
  top: 3px; left: 3px;
  transition: transform var(--transition-fast);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.toggle.on .toggle-thumb { transform: translateX(16px); }

.checkbox-label { display: flex; align-items: center; gap: 8px; font-size: var(--text-sm); cursor: pointer; }
.checkbox { width: 15px; height: 15px; accent-color: var(--color-primary); }

.prop-fallback { font-size: var(--text-xs); color: var(--color-text-muted); padding: 1rem 0; }
</style>
