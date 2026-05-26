<template>
  <div class="spacer-block" :style="{ height: `${block.content.height || 40}px` }">
    <div v-if="editMode" class="spacer-label">Espaciado · {{ block.content.height || 40 }}px</div>
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.spacer-block { position: relative; display: flex; align-items: center; justify-content: center; }
.spacer-label { font-size: 0.65rem; color: var(--color-text-muted); background: var(--color-bg); padding: 2px 8px; border-radius: var(--radius-full); border: 1px dashed var(--color-border); }
</style>
