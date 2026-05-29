<template>
  <aside class="builder-sidebar" data-testid="builder-sidebar">
    <div class="sidebar-header">
      <h6 class="sidebar-title">
        <i class="fas fa-puzzle-piece me-2"></i>Bloques
      </h6>
    </div>

    <div class="sidebar-body">
      <div class="block-grid">
        <button
          v-for="(info, type) in blockTypes"
          :key="type"
          class="block-tile"
          :data-testid="`add-block-${type}`"
          @click="$emit('add-block', type)"
          draggable="true"
          @dragstart="onDragStart($event, type)"
        >
          <div class="block-tile__icon">
            <i :class="info.icon"></i>
          </div>
          <span class="block-tile__label">{{ info.label }}</span>
        </button>
      </div>
    </div>

    <div class="sidebar-footer">
      <p class="sidebar-hint">
        <i class="fas fa-info-circle me-1"></i>
        Arrastra o haz click para agregar
      </p>
    </div>
  </aside>
</template>

<script setup>
import { usePageBuilderStore } from '@/stores/pageBuilder.js'
import { computed } from 'vue'

const store = usePageBuilderStore()
const blockTypes = computed(() => store.blockTypes)

defineEmits(['add-block'])

function onDragStart(e, type) {
  e.dataTransfer.setData('block-type', type)
  e.dataTransfer.effectAllowed = 'copy'
}
</script>

<style scoped>
.builder-sidebar {
  width: 250px;
  min-width: 220px;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(63,100,88,0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
}
.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid rgba(63,100,88,0.08);
}
.sidebar-title {
  margin: 0;
  font-weight: 800;
  font-size: 0.88rem;
  color: #3f6458;
  letter-spacing: -0.02em;
}
.sidebar-body {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
}
.block-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}
.block-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  border: 1px solid rgba(63,100,88,0.08);
  border-radius: 14px;
  background: rgba(255,255,255,0.8);
  cursor: grab;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;
}
.block-tile:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(63,100,88,0.10);
  border-color: rgba(128,186,73,0.3);
}
.block-tile:active { cursor: grabbing; }
.block-tile__icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(128,186,73,0.10);
  color: #3f6458;
  font-size: 0.9rem;
}
.block-tile__label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #334155;
  text-align: center;
  line-height: 1.2;
}
.sidebar-footer {
  padding: 12px 16px;
  border-top: 1px solid rgba(63,100,88,0.08);
}
.sidebar-hint {
  font-size: 0.72rem;
  color: #94a3b8;
  margin: 0;
}
</style>
