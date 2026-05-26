<template>
  <div
    class="block-wrapper"
    :class="{ selected: isSelected, hidden: !block.visible }"
    @click.stop="$emit('select', block.id)"
  >
    <!-- Edit controls -->
    <div v-if="editMode" class="block-controls">
      <div class="control-handle" title="Arrastrar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="17" r="1"/><circle cx="15" cy="7" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="17" r="1"/></svg>
      </div>
      <span class="block-type-label">{{ block.type }}</span>
      <div class="control-spacer" />
      <button class="ctrl-btn" title="Seleccionar / Editar" @click.stop="$emit('select', block.id)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="ctrl-btn" title="Duplicar" @click.stop="$emit('duplicate', block.id)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
      </button>
      <button class="ctrl-btn" :title="block.visible ? 'Ocultar' : 'Mostrar'" @click.stop="$emit('toggle-visibility', block.id)">
        <svg v-if="block.visible" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      </button>
      <button class="ctrl-btn danger" title="Eliminar" @click.stop="$emit('remove', block.id)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
    </div>

    <!-- Block content -->
    <div class="block-content" :class="{ invisible: !block.visible && editMode }">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  block: Object,
  editMode: Boolean,
  isSelected: Boolean,
})
defineEmits(['select', 'remove', 'duplicate', 'toggle-visibility'])
</script>

<style scoped>
.block-wrapper {
  position: relative;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  transition: border-color var(--transition-fast);
  margin-bottom: 0.5rem;
}
.block-wrapper:hover { border-color: var(--color-brand-200); }
.block-wrapper.selected { border-color: var(--color-primary); }
.block-wrapper.hidden { opacity: 0.4; }

.block-controls {
  display: flex;
  align-items: center;
  gap: 4px;
  position: absolute;
  top: -28px;
  left: 0;
  right: 0;
  height: 26px;
  background: var(--color-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  padding: 0 6px;
  z-index: 10;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.block-wrapper:hover .block-controls,
.block-wrapper.selected .block-controls { opacity: 1; }

.control-handle {
  cursor: grab;
  color: rgba(255,255,255,0.7);
  display: flex;
  align-items: center;
  padding: 2px;
}
.block-type-label { font-size: 0.65rem; font-weight: 600; color: rgba(255,255,255,0.7); letter-spacing: 0.05em; text-transform: uppercase; }
.control-spacer { flex: 1; }

.ctrl-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px; height: 22px;
  border: none;
  background: rgba(255,255,255,0.15);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.ctrl-btn:hover { background: rgba(255,255,255,0.3); }
.ctrl-btn.danger:hover { background: rgba(239,68,68,0.8); }

.invisible { opacity: 0.3; }
.block-content { min-height: 20px; }
</style>
