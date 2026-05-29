<template>
  <div :data-testid="`image-gallery-block-${block.id}`" :style="computedStyles" class="image-gallery-block container">
    <div v-if="content.images?.length" :class="layoutClass" :style="gridStyle">
      <div v-for="(img, i) in content.images" :key="i" class="ig-item" :style="itemStyle">
        <img :src="img.src" :alt="img.alt || `Bambito Spring Water y sus beneficios`" loading="lazy" />
        <button v-if="editing" class="ig-remove" @click.stop="removeImage(i)" title="Eliminar imagen">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div v-else class="ig-empty">
      <i class="fas fa-images"></i>
      <p>Sin imagenes en la galeria</p>
    </div>

    <div v-if="editing" class="ig-add-row">
      <input
        type="text"
        class="form-control ig-url-input"
        v-model="newImageUrl"
        placeholder="URL de la imagen..."
        @keydown.enter.prevent="addImage"
      />
      <button class="btn btn-sm ig-add-btn" @click="addImage" :disabled="!newImageUrl.trim()">
        <i class="fas fa-plus me-1"></i>Agregar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const emit = defineEmits(['update'])

const content = computed(() => props.block.content || {})
const computedStyles = computed(() => ({ ...props.block.styles }))

const newImageUrl = ref('')

const layoutClass = computed(() =>
  content.value.layout === 'masonry' ? 'ig-masonry' : 'ig-grid'
)

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${content.value.columns || 3}, 1fr)`,
  gap: content.value.gap || '12px'
}))

const itemStyle = computed(() => ({
  aspectRatio: content.value.aspectRatio || '1/1',
  borderRadius: props.block.styles?.borderRadius || '14px'
}))

function addImage() {
  const url = newImageUrl.value.trim()
  if (!url) return
  const images = [...(content.value.images || []), { src: url, alt: '' }]
  emit('update', { images })
  newImageUrl.value = ''
}

function removeImage(index) {
  const images = [...(content.value.images || [])]
  images.splice(index, 1)
  emit('update', { images })
}
</script>

<style scoped>
.ig-grid {
  display: grid;
}
.ig-masonry {
  columns: 3;
  column-gap: 12px;
}
.ig-masonry .ig-item {
  break-inside: avoid;
  margin-bottom: 12px;
}
.ig-item {
  position: relative;
  overflow: hidden;
  background: #e2e8f0;
}
.ig-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s;
}
.ig-item:hover img {
  transform: scale(1.03);
}
.ig-remove {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: rgba(239,68,68,0.9);
  color: #fff;
  font-size: 0.7rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}
.ig-item:hover .ig-remove {
  opacity: 1;
}
.ig-empty {
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
  background: rgba(128,186,73,0.04);
  border: 2px dashed rgba(128,186,73,0.2);
  border-radius: 16px;
}
.ig-empty i {
  font-size: 2rem;
  margin-bottom: 8px;
  display: block;
}
.ig-add-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}
.ig-url-input {
  border-radius: 10px;
  border: 1px solid rgba(63,100,88,0.12);
  font-size: 0.85rem;
  padding: 8px 12px;
}
.ig-url-input:focus {
  border-color: #80ba49;
  box-shadow: 0 0 0 3px rgba(128,186,73,0.12);
}
.ig-add-btn {
  white-space: nowrap;
  border-radius: 10px;
  background: #80ba49;
  color: #fff;
  font-weight: 700;
  font-size: 0.82rem;
  padding: 8px 14px;
  border: none;
}
.ig-add-btn:disabled {
  opacity: 0.4;
}
</style>
