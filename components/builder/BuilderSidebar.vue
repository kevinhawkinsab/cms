<template>
  <div class="builder-sidebar">
    <div class="sidebar-header">
      <h3 class="sidebar-title">Bloques</h3>
    </div>

    <div class="block-groups">
      <div v-for="group in blockGroups" :key="group.label" class="block-group">
        <div class="group-label">{{ group.label }}</div>
        <div class="block-chips">
          <div
            v-for="block in group.blocks"
            :key="block.type"
            class="block-chip"
            draggable="true"
            @dragstart="onDragStart(block.type)"
            @click="addBlock(block.type)"
          >
            <span class="chip-icon" v-html="block.icon" />
            <span class="chip-label">{{ block.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const builderStore = usePageBuilderStore()

const blockGroups = [
  {
    label: 'Texto',
    blocks: [
      { type: 'heading', label: 'Título', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h8M4 18V6M12 18V6M17 12l3-3-3-3M20 12H14"/></svg>' },
      { type: 'paragraph', label: 'Párrafo', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>' },
      { type: 'quote', label: 'Cita', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>' },
    ],
  },
  {
    label: 'Multimedia',
    blocks: [
      { type: 'image', label: 'Imagen', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
      { type: 'youtube', label: 'YouTube', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>' },
      { type: 'image-gallery', label: 'Galería', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
    ],
  },
  {
    label: 'Estructura',
    blocks: [
      { type: 'separator', label: 'Separador', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/></svg>' },
      { type: 'spacer', label: 'Espaciado', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>' },
      { type: 'html', label: 'HTML libre', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
    ],
  },
  {
    label: 'Interacción',
    blocks: [
      { type: 'button', label: 'Botón', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="5"/></svg>' },
      { type: 'article-list', label: 'Artículos', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
      { type: 'post-sidebar', label: 'Sidebar', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/></svg>' },
      { type: 'post-tags', label: 'Tags', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' },
      { type: 'front-page', label: 'Hero', icon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>' },
    ],
  },
]

function addBlock(type) { builderStore.addBlock(type) }
function onDragStart(type) {
  window.__builderDragType = type
}
</script>

<style scoped>
.builder-sidebar {
  height: 100%;
  overflow-y: auto;
  background: white;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}
.sidebar-title { font-weight: 700; font-size: var(--text-sm); margin: 0; color: var(--color-text-primary); }

.block-groups { padding: 0.5rem 0; overflow-y: auto; flex: 1; }

.block-group { margin-bottom: 0.25rem; }
.group-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  padding: 0.65rem 1rem 0.35rem;
}

.block-chips { padding: 0 0.5rem; display: flex; flex-direction: column; gap: 2px; }

.block-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 0.65rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
  border: 1px solid transparent;
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}
.block-chip:hover {
  background: var(--color-primary-light);
  border-color: var(--color-brand-200);
  color: var(--color-primary);
}
.block-chip:active { transform: scale(0.97); }

.chip-icon { display: flex; align-items: center; flex-shrink: 0; }
.chip-label { font-weight: 500; }
</style>
