<template>
  <div class="html-block">
    <div v-if="editMode" class="html-edit-preview">
      <div class="html-label">HTML libre</div>
      <div class="html-code-preview">{{ block.content.code || '<div></div>' }}</div>
    </div>
    <div v-else v-html="block.content.code || ''" />
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.html-block { padding: 0.5rem 0.75rem; }
.html-edit-preview { border: 1px dashed var(--color-border); border-radius: var(--radius-md); padding: 0.75rem; background: var(--color-bg); }
.html-label { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-muted); margin-bottom: 6px; }
.html-code-preview { font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-text-secondary); max-height: 80px; overflow: hidden; text-overflow: ellipsis; white-space: pre; }
</style>
