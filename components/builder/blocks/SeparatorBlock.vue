<template>
  <div class="separator-block">
    <hr :style="{
      borderStyle: block.content.style || 'solid',
      borderColor: block.content.color || '#e2e8f0',
      borderWidth: `${block.content.thickness || 1}px 0 0`,
      width: block.content.width || '100%',
    }" />
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.separator-block { padding: 0.75rem; display: flex; justify-content: center; }
hr { margin: 0; border-left: 0; border-right: 0; border-bottom: 0; }
</style>
