<template>
  <div class="youtube-block">
    <div v-if="embedId" class="video-wrapper">
      <iframe
        :src="`https://www.youtube.com/embed/${embedId}`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="video-iframe"
      />
    </div>
    <div v-else class="video-placeholder">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
      <span>Agrega la URL del video en el panel de propiedades</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ block: Object, editMode: Boolean })

const embedId = computed(() => {
  const url = props.block.content.url ?? ''
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
  return match?.[1] ?? null
})
</script>

<style scoped>
.youtube-block { padding: 0.5rem 0.75rem; }
.video-wrapper { position: relative; padding-top: 56.25%; border-radius: var(--radius-md); overflow: hidden; }
.video-iframe { position: absolute; inset: 0; width: 100%; height: 100%; }
.video-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 3rem; background: var(--color-bg); border-radius: var(--radius-md); color: var(--color-text-muted); font-size: var(--text-xs); border: 2px dashed var(--color-border); }
</style>
