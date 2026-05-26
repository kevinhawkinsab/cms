<template>
  <div class="builder-page">
    <!-- Builder topbar -->
    <div class="builder-topbar">
      <div class="builder-topbar-left">
        <button class="btn-ghost btn-sm back-btn" @click="goBack">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Volver
        </button>
        <div class="builder-context">
          <span class="context-company">{{ companyStore.activeName }}</span>
          <span class="context-sep">·</span>
          <input
            class="context-name-input"
            v-model="builderName"
            @blur="builderStore.setName(builderName)"
            placeholder="Nombre del layout…"
          />
          <span v-if="builderStore.dirty" class="dirty-dot" title="Cambios sin guardar" />
        </div>
      </div>
      <div class="builder-topbar-right">
        <button class="btn-secondary btn-sm" @click="builderStore.setPreview(!builderStore.previewMode)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <template v-if="!builderStore.previewMode"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></template>
            <template v-else><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></template>
          </svg>
          {{ builderStore.previewMode ? 'Editar' : 'Vista previa' }}
        </button>
        <button class="btn-primary btn-sm" :disabled="builderStore.saving" @click="save">
          <svg v-if="builderStore.saving" class="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          {{ builderStore.saving ? 'Guardando…' : 'Guardar' }}
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="builderStore.loading" class="builder-loading">
      <div class="loading-spinner" />
      <p>Cargando layout…</p>
    </div>

    <!-- Builder panels -->
    <div v-else class="builder-panels">
      <!-- Left: block palette -->
      <BuilderSidebar v-if="!builderStore.previewMode" />

      <!-- Center: canvas -->
      <div class="builder-canvas" @click.self="builderStore.deselectBlock()">
        <div v-if="builderStore.previewMode" class="preview-banner">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          Vista previa — los controles de edición están ocultos
        </div>

        <div v-if="!builderStore.blocks.length" class="canvas-empty">
          <div class="canvas-empty-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <p>Arrastra bloques desde el panel izquierdo o haz clic en uno para agregarlo</p>
        </div>

        <PageRenderer
          :blocks="builderStore.orderedBlocks"
          :edit-mode="!builderStore.previewMode"
          :selected-id="builderStore.selectedBlockId"
          @select="builderStore.selectBlock"
          @remove="builderStore.removeBlock"
          @duplicate="builderStore.duplicateBlock"
          @toggle-visibility="builderStore.toggleBlockVisibility"
          @reorder="onReorder"
        />
      </div>

      <!-- Right: properties -->
      <BlockProperties v-if="!builderStore.previewMode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '~/services/notifications'

definePageMeta({ middleware: ['auth'], layout: 'default' })

const route = useRoute()
const router = useRouter()
const companyStore = useCompanyStore()
const builderStore = usePageBuilderStore()

const builderName = ref('')

onMounted(async () => {
  const routeKey = route.query.routeKey as string | undefined
  const postId = route.query.postId as string | undefined

  builderStore.reset()
  await builderStore.load(companyStore.activeId, routeKey, postId)
  builderName.value = builderStore.context.name
})

onBeforeUnmount(() => {
  if (builderStore.dirty) {
    // warn user — already handled by browser beforeunload
  }
})

function goBack() {
  const { routeKey, postId } = builderStore.context
  if (postId) router.push('/posts')
  else router.push('/pages')
}

async function save() {
  if (!companyStore.activeId && builderStore.context.routeKey) {
    notify.error('Selecciona una empresa primero')
    return
  }
  try {
    await builderStore.save(companyStore.activeId)
    notify.success('Layout guardado')
  } catch {
    notify.error('Error al guardar')
  }
}

function onReorder(newBlocks) {
  builderStore.setBlocks(newBlocks)
}
</script>

<style scoped>
.builder-page {
  position: fixed;
  inset: 0;
  left: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  z-index: 10;
}

.builder-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 1rem;
  height: 52px;
  background: white;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
  z-index: 50;
}

.builder-topbar-left { display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1; }
.builder-topbar-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.back-btn { gap: 4px; }
.builder-context { display: flex; align-items: center; gap: 8px; min-width: 0; }
.context-company { font-size: var(--text-xs); color: var(--color-text-muted); white-space: nowrap; }
.context-sep { color: var(--color-border); }
.context-name-input {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  outline: none;
  min-width: 0;
  flex: 1;
  max-width: 300px;
}
.context-name-input:focus { text-decoration: underline; text-underline-offset: 3px; }
.dirty-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #f59e0b;
  flex-shrink: 0;
}

.builder-panels {
  flex: 1;
  display: grid;
  grid-template-columns: 220px 1fr 280px;
  overflow: hidden;
}

.builder-canvas {
  overflow-y: auto;
  padding: 1.5rem;
  background: #f0f4f8;
  position: relative;
}

.preview-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  color: #92400e;
  margin-bottom: 1rem;
}

.canvas-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 400px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
.canvas-empty-icon { color: var(--color-border); }

.builder-loading {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--color-text-muted);
}
.loading-spinner {
  width: 36px; height: 36px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
