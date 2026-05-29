<template>
  <div class="container">
      <figure
    :style="computedStyles"
    :data-testid="`image-block-${block.id}`"
    class="image-block"
  >
    <img
      v-if="content.src"
      :src="content.src"
      :alt="resolvedAlt"
      :style="{ width: content.width || '100%', borderRadius: block.styles?.borderRadius || '16px' }"
      class="img-fluid"
      loading="lazy"
    />
    <div v-else-if="editing" class="image-placeholder" @click="$emit('update', { src: prompt('URL de la imagen:') || '' })">
      <i class="fas fa-image"></i>
      <span>Click para agregar imagen</span>
    </div>
    <figcaption v-if="content.caption" class="image-caption">
      {{ content.caption }}
    </figcaption>
  </figure>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { buildDynamicImageAlt, isGenericImageAlt } from '~/utils/blog'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false },
  post: { type: Object, default: null }
})

defineEmits(['update'])

const content = computed(() => props.block.content || {})
const resolvedAlt = computed(() =>
  isGenericImageAlt(content.value.alt)
    ? buildDynamicImageAlt(props.post, 'Imagen del artículo')
    : content.value.alt
)

const computedStyles = computed(() => {
  const { borderRadius, ...rest } = props.block.styles || {}
  return { ...rest, textAlign: 'center' }
})
</script>

<style scoped>
.image-block {
  margin: 0;
}
.image-block img {
  display: block;
  max-width: 100%;
  height: auto;
}
.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 200px;
  background: rgba(128, 186, 73, 0.06);
  border: 2px dashed rgba(128, 186, 73, 0.3);
  border-radius: 16px;
  color: #80ba49;
  cursor: pointer;
  font-size: 1rem;
}
.image-placeholder i {
  font-size: 2rem;
}
.image-caption {
  margin-top: 8px;
  font-size: 0.88rem;
  color: #64748b;
  text-align: center;
}
</style>
