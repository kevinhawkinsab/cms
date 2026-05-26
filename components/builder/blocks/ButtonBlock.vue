<template>
  <div class="button-block" :style="{ textAlign: block.content.align || 'center' }">
    <a
      :href="block.content.url || '#'"
      :class="['btn-block', `variant-${block.content.variant || 'primary'}`]"
      @click.prevent
    >{{ block.content.text || 'Botón' }}</a>
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.button-block { padding: 0.75rem; }
.btn-block {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.5rem;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--text-sm);
  text-decoration: none;
  cursor: default;
  transition: none;
}
.variant-primary { background: var(--color-primary); color: white; }
.variant-secondary { background: var(--color-bg); color: var(--color-text-primary); border: 1px solid var(--color-border); }
.variant-outline { background: transparent; color: var(--color-primary); border: 2px solid var(--color-primary); }
</style>
