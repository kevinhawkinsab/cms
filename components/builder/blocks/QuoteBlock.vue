<template>
  <blockquote class="quote-block">
    <p class="quote-text">"{{ block.content.text || 'Escribe tu cita aquí' }}"</p>
    <cite v-if="block.content.author" class="quote-author">— {{ block.content.author }}</cite>
  </blockquote>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.quote-block { margin: 0.5rem 0.75rem; padding: 1.25rem 1.5rem; border-left: 4px solid var(--color-primary); background: var(--color-primary-light); border-radius: 0 var(--radius-md) var(--radius-md) 0; }
.quote-text { margin: 0 0 0.5rem; font-size: var(--text-lg); font-style: italic; color: var(--color-text-primary); line-height: 1.6; }
.quote-author { display: block; font-size: var(--text-sm); color: var(--color-text-muted); }
</style>
