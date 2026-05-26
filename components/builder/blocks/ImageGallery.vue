<template>
  <div class="gallery-block" :style="{ '--cols': block.content.columns || 3 }">
    <div v-if="images.length" class="gallery-grid">
      <div v-for="(img, i) in images" :key="i" class="gallery-item">
        <img :src="img.url || img" :alt="img.alt || ''" class="gallery-img" />
      </div>
    </div>
    <div v-else class="gallery-placeholder">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      <span>Galería vacía — agrega imágenes desde las propiedades</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ block: Object, editMode: Boolean })
const images = computed(() => props.block.content.images ?? [])
</script>

<style scoped>
.gallery-block { padding: 0.75rem; }
.gallery-grid { display: grid; grid-template-columns: repeat(var(--cols), 1fr); gap: 8px; }
.gallery-item { aspect-ratio: 1; border-radius: var(--radius-md); overflow: hidden; }
.gallery-img { width: 100%; height: 100%; object-fit: cover; }
.gallery-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 2.5rem; background: var(--color-bg); border-radius: var(--radius-md); color: var(--color-text-muted); font-size: var(--text-xs); border: 2px dashed var(--color-border); text-align: center; }
</style>
