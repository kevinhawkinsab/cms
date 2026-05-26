<template>
  <div
    class="paragraph-block"
    :style="{ color: block.content.color || 'inherit' }"
    v-html="block.content.html || '<p>Párrafo de texto...</p>'"
  />
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.paragraph-block { padding: 0.5rem 0.75rem; line-height: 1.7; }
.paragraph-block :deep(p) { margin: 0 0 0.75em; }
.paragraph-block :deep(p:last-child) { margin-bottom: 0; }
</style>
