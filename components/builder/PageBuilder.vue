<template>
  <div class="page-builder" data-testid="page-builder">
    <!-- Top Toolbar -->
    <header class="pb-toolbar">
      <div class="pb-toolbar__left">
        <button class="pb-icon-btn" @click="$emit('close')" title="Volver" data-testid="builder-close">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="pb-toolbar__info">
          <span class="pb-toolbar__route">{{ currentLayout?.route }}</span>
          <h6 class="pb-toolbar__name">{{ currentLayout?.name || 'Sin nombre' }}</h6>
        </div>
      </div>

      <div class="pb-toolbar__center">
        <span class="pb-toolbar__status">
          <i class="fas fa-circle text-success me-1" style="font-size:0.5rem"></i>
          {{ currentLayout?.blocks?.length || 0 }} bloques
        </span>
      </div>

      <div class="pb-toolbar__right">
        <router-link class="pb-btn pb-btn--ghost" to="/bambito-cms/dashboard">Panel</router-link>
        <button class="pb-btn pb-btn--ghost" @click="handlePreview" data-testid="builder-preview">
          <i class="fas fa-eye me-1"></i>Vista previa
        </button>
        <button
          class="pb-btn pb-btn--outline"
          @click="handleReset"
          data-testid="builder-reset"
          :disabled="!canEdit"
        >
          <i class="fas fa-rotate-left me-1"></i>Resetear
        </button>
        <button
          class="pb-btn pb-btn--primary"
          @click="handleSave"
          data-testid="builder-save"
          :disabled="!canEdit || store.saving"
        >
          <span v-if="store.saving" class="spinner-border spinner-border-sm me-2"></span>
          <i v-else class="fas fa-save me-1"></i>
          {{ store.saving ? 'Guardando...' : 'Guardar' }}
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <div class="pb-workspace">
      <!-- Sidebar -->
      <BuilderSidebar @add-block="handleAddBlock" />

      <!-- Canvas -->
      <main
        class="pb-canvas"
        @click="store.clearSelection"
        @dragover.prevent
        @drop="handleCanvasDrop"
      >
        <div class="pb-canvas__inner" :class="{ 'is-preview': previewMode }">
          <!-- Preview Mode -->
          <template v-if="previewMode">
            <div class="pb-preview-bar">
              <span><i class="fas fa-eye me-1"></i>Modo Vista Previa</span>
              <button class="pb-btn pb-btn--sm" @click="previewMode = false">Cerrar</button>
            </div>
            <PageRenderer :layout="currentLayout" :post="currentLayout?.postData || null" />
          </template>

          <!-- Edit Mode -->
          <template v-else>
            <div v-if="!validBlocks.length" class="pb-empty">
              <div class="pb-empty__icon">
                <i class="fas fa-layer-group"></i>
              </div>
              <h5>Comienza a construir</h5>
              <p>Arrastra bloques desde el panel izquierdo o haz click para agregar</p>
            </div>

            <draggable
              v-else
              :model-value="validBlocks"
              @update:model-value="onDragUpdate"
              item-key="id"
              handle=".drag-handle"
              ghost-class="drag-ghost"
              chosen-class="drag-chosen"
              animation="200"
              @start="store.isDragging = true"
              @end="store.isDragging = false"
            >
              <template #item="{ element, index }">
                <BlockWrapper
                  v-if="element && element.type"
                  :block="element"
                  :index="index"
                  :total-blocks="validBlocks.length"
                  @move-up="store.moveBlock(index, index - 1)"
                  @move-down="store.moveBlock(index, index + 1)"
                />
              </template>
            </draggable>
          </template>
        </div>
      </main>

      <!-- Properties Panel -->
      <BlockProperties v-if="store.selectedBlock && !previewMode" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { usePageBuilderStore } from '~/stores/pageBuilder'
import { useAuthStore } from '~/stores/auth'
import { notify, confirmAction, alertPermissionDenied } from '~/services/notifications'
import BuilderSidebar from './BuilderSidebar.vue'
import BlockWrapper from './BlockWrapper.vue'
import BlockProperties from './BlockProperties.vue'
import PageRenderer from './PageRenderer.vue'

const props = defineProps({
  route: { type: String, required: true },
  postId: { type: [String, Number], default: null }
})

defineEmits(['close'])

const store = usePageBuilderStore()
const authStore = useAuthStore()
const previewMode = ref(false)

const currentLayout = computed(() => store.currentLayout)

const validBlocks = computed(() => {
  if (!currentLayout.value?.blocks) return []
  return currentLayout.value.blocks.filter((b) => b && b.id && b.type)
})

const canEdit = computed(() => authStore.hasPermission('pagebuilder.edit'))
const canPublish = computed(() => authStore.hasPermission('pagebuilder.publish'))

function handleAddBlock(type) {
  if (!canEdit.value) {
    alertPermissionDenied('pagebuilder.edit')
    return
  }
  store.addBlock(type)
}

function handleCanvasDrop(e) {
  const type = e.dataTransfer.getData('block-type')
  if (!type) return
  if (!canEdit.value) {
    alertPermissionDenied('pagebuilder.edit')
    return
  }
  store.addBlock(type)
}

function onDragUpdate(newList) {
  if (currentLayout.value) store.reorderBlocks(newList)
}

async function handleSave() {
  if (!canEdit.value) {
    alertPermissionDenied('pagebuilder.edit')
    return
  }
  try {
    const result = await store.saveLayout()

    if (!result?.success) {
      notify.error(result?.error || 'No fue posible guardar el layout.')
      return
    }
    if (result.persisted === 'api') {
      notify.success('Layout guardado en el servidor correctamente.')
    } else if (result.persisted === 'local') {
      notify.warning('Layout guardado localmente (la API no respondió).')
    } else {
      notify.success('Layout guardado.')
    }
  } catch (error) {
    notify.error(error)
  }
}

async function handleReset() {
  const ok = await confirmAction({
    title: '¿Restaurar layout?',
    text: 'Esta acción devolverá el layout a su estado original. Los cambios no guardados se perderán.',
    icon: 'warning',
    confirmButtonText: 'Sí, restaurar',
    confirmButtonColor: '#f59e0b'
  })
  if (!ok) return
  store.resetLayout()
  notify.info('Layout restaurado al estado original.')
}

function handlePreview() {
  store.clearSelection()
  previewMode.value = !previewMode.value
}

onMounted(async () => {
  try {
    // Si viene con postId, el parent ya invocó initPostLayout() con el post completo.
    // initLayout solo aplica para rutas de layout especial (/prensa o /prensa/:slug)
    if (!props.postId) {
      await store.initLayout(props.route)
    }
    store.isEditing = true
  } catch (error) {
    notify.error(error)
  }
})
</script>

<style scoped>
.page-builder {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f1f2f7;
  overflow: hidden;
}

/* Toolbar */
.pb-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(63,100,88,0.08);
  z-index: 10;
}
.pb-toolbar__left,
.pb-toolbar__right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pb-toolbar__info {
  display: flex;
  flex-direction: column;
}
.pb-toolbar__route {
  font-size: 0.7rem;
  color: #80ba49;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.pb-toolbar__name {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 800;
  color: #3f6458;
}
.pb-toolbar__status {
  font-size: 0.82rem;
  color: #64748b;
  font-weight: 600;
}

.pb-icon-btn {
  width: 38px;
  height: 38px;
  border: 1px solid rgba(63,100,88,0.10);
  border-radius: 12px;
  background: #fff;
  color: #3f6458;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;
}
.pb-icon-btn:hover {
  background: rgba(128,186,73,0.08);
  border-color: #80ba49;
}

.pb-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.82rem;
  border: none;
  cursor: pointer;
  transition: all 0.15s;
}
.pb-btn--primary {
  background: linear-gradient(135deg, #80ba49, #3f6458);
  color: #fff;
  box-shadow: 0 6px 16px rgba(128,186,73,0.3);
}
.pb-btn--primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(128,186,73,0.35); }
.pb-btn--outline {
  background: #fff;
  border: 1px solid rgba(63,100,88,0.15);
  color: #3f6458;
}
.pb-btn--outline:hover { background: rgba(128,186,73,0.06); }
.pb-btn--ghost {
  background: transparent;
  color: #64748b;
}
.pb-btn--ghost:hover { background: rgba(63,100,88,0.06); color: #3f6458; }
.pb-btn--sm {
  padding: 4px 12px;
  font-size: 0.78rem;
  background: #fff;
  border: 1px solid rgba(63,100,88,0.12);
  color: #3f6458;
  border-radius: 8px;
}

/* Workspace */
.pb-workspace {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Canvas */
.pb-canvas {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background:
    radial-gradient(circle at 20% 20%, rgba(128,186,73,0.04), transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(13,167,213,0.03), transparent 40%),
    #f1f2f7;
}
.pb-canvas__inner {
  min-width: 900px;
  margin: 0 auto;
  background: rgba(255,255,255,0.70);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(63,100,88,0.06);
  border-radius: 24px;
  padding: 32px;
  min-height: 400px;
  box-shadow: 0 20px 60px rgba(15,23,42,0.06);
}
.pb-canvas__inner.is-preview {
  background: #fff;
  backdrop-filter: none;
}

.pb-preview-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  margin: -32px -32px 24px;
  background: rgba(13,167,213,0.08);
  border-bottom: 1px solid rgba(13,167,213,0.15);
  border-radius: 24px 24px 0 0;
  color: #0da7d5;
  font-size: 0.85rem;
  font-weight: 700;
}

.pb-empty {
  text-align: center;
  padding: 80px 20px;
  color: #94a3b8;
}
.pb-empty__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 16px;
  border-radius: 24px;
  display: grid;
  place-items: center;
  font-size: 2rem;
  background: rgba(128,186,73,0.08);
  color: #80ba49;
}
.pb-empty h5 { color: #475569; font-weight: 800; }
.pb-empty p { max-width: 320px; margin: 0 auto; }

/* Drag styles */
:deep(.drag-ghost) {
  opacity: 0.4;
  border: 2px dashed #80ba49;
  border-radius: 14px;
}
:deep(.drag-chosen) {
  box-shadow: 0 12px 30px rgba(128,186,73,0.2);
}

/* Toast */
.pb-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background: rgba(63,100,88,0.95);
  backdrop-filter: blur(10px);
  color: #fff;
  border-radius: 14px;
  font-size: 0.88rem;
  font-weight: 700;
  box-shadow: 0 12px 30px rgba(63,100,88,0.3);
  z-index: 100;
}
.toast-enter-active, .toast-leave-active { transition: all 0.3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(20px); }

@media (max-width: 991px) {
  .pb-toolbar {
    flex-wrap: wrap;
    gap: 8px;
  }
  .pb-toolbar__center { display: none; }
  .pb-workspace { flex-direction: column; }
  .pb-canvas { padding: 12px; }
  .pb-canvas__inner { padding: 16px; border-radius: 16px; }
  :deep(.builder-sidebar) { width: 100%; min-width: 100%; max-height: 200px; }
  :deep(.block-properties) { width: 100%; min-width: 100%; max-height: 300px; }
}
</style>
