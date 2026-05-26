<template>
  <div
    class="front-page-block"
    :style="block.content.backgroundUrl ? { backgroundImage: `url(${block.content.backgroundUrl})` } : {}"
  >
    <div class="front-page-overlay" />
    <div class="front-page-content">
      <div v-if="block.content.showBreadcrumbs" class="front-breadcrumb">Inicio / Página</div>
      <h1 class="front-title">{{ block.content.title || 'Título del hero' }}</h1>
    </div>
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.front-page-block {
  min-height: 280px;
  background: linear-gradient(135deg, #0c2a1f 0%, #1A4F3A 100%);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 0.5rem 0.75rem;
}
.front-page-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); }
.front-page-content { position: relative; z-index: 1; text-align: center; color: white; padding: 2rem; }
.front-breadcrumb { font-size: var(--text-xs); opacity: 0.7; margin-bottom: 0.75rem; }
.front-title { font-size: 2rem; font-weight: 800; margin: 0; line-height: 1.2; }
</style>
