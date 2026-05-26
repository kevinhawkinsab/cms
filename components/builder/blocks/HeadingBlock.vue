<template>
  <component
    :is="block.content.level || 'h2'"
    class="heading-block"
    :style="{
      textAlign: block.content.align || 'left',
      color: block.content.color || 'inherit',
    }"
  >{{ block.content.text || 'Título' }}</component>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.heading-block { margin: 0; padding: 0.5rem 0.75rem; line-height: 1.3; font-weight: 700; }
</style>
