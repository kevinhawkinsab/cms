<template>
  <div class="image-block" :style="{ textAlign: block.content.align || 'center' }">
    <img
      v-if="block.content.url"
      :src="block.content.url"
      :alt="block.content.alt || ''"
      :style="{ width: block.content.width || '100%' }"
      class="block-img"
    />
    <div v-else class="img-placeholder">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
      <span>Sin imagen</span>
    </div>
    <div v-if="block.content.caption" class="img-caption">{{ block.content.caption }}</div>
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.image-block { padding: 0.5rem 0.75rem; }
.block-img { max-width: 100%; display: inline-block; border-radius: var(--radius-md); }
.img-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 2rem; background: var(--color-bg); border-radius: var(--radius-md); color: var(--color-text-muted); font-size: var(--text-xs); border: 2px dashed var(--color-border); }
.img-caption { font-size: var(--text-xs); color: var(--color-text-muted); margin-top: 6px; font-style: italic; }
</style>
