<template>
  <div :data-testid="`youtube-block-${block.id}`" class="container" :style="computedStyles">
    <div v-if="embedUrl" class="ratio" :style="{ aspectRatio: content.aspectRatio || '16/9' }">
      <iframe
        :src="embedUrl"
        title="Video YouTube"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        style="border-radius: inherit;"
      />
    </div>
    <div v-else-if="editing" class="youtube-placeholder" @click="promptUrl">
      <i class="fab fa-youtube"></i>
      <span>Click para agregar URL de YouTube</span>
    </div>
    <div v-else class="youtube-placeholder">
      <i class="fab fa-youtube"></i>
      <span>Video no configurado</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const emit = defineEmits(['update'])

const content = computed(() => props.block.content || {})

const computedStyles = computed(() => ({
  overflow: 'hidden',
  ...props.block.styles
}))

const embedUrl = computed(() => {
  const url = content.value.url
  if (!url) return null
  const match = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
})

function promptUrl() {
  const url = prompt('URL de YouTube:')
  if (url) emit('update', { url })
}
</script>

<style scoped>
.youtube-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 200px;
  background: rgba(255, 0, 0, 0.04);
  border: 2px dashed rgba(255, 0, 0, 0.2);
  border-radius: 16px;
  color: #dc3545;
  cursor: pointer;
}
.youtube-placeholder i {
  font-size: 2.5rem;
}
</style>
