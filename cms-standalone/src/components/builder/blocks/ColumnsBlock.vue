<template>
  <div
    class="columns-block container"
    :data-testid="`columns-block-${block.id}`"
    :style="block.styles"
  >
    <div class="columns-grid" :class="`cols-${content.count || 2}`" :style="{ gap: gapValue }">
      <div
        v-for="(col, i) in visibleColumns"
        :key="i"
        class="column-item"
      >
        <h4 v-if="col.title || editing" class="column-title">
          {{ col.title || (editing ? `Columna ${i + 1}` : '') }}
        </h4>
        <p class="column-text">
          {{ col.text || (editing ? 'Escribe el contenido de esta columna aqui.' : '') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const content = computed(() => props.block.content || {})

const visibleColumns = computed(() => {
  const cols = content.value.columns || []
  const count = content.value.count || 2
  const result = [...cols]
  while (result.length < count) result.push({ title: '', text: '' })
  return result.slice(0, count)
})

const gapValue = computed(() => {
  const g = content.value.gap || 'normal'
  const map = { compact: '16px', normal: '32px', wide: '56px' }
  return map[g] || '32px'
})
</script>

<style scoped>
.columns-block {
  padding: 16px 0;
}
.columns-grid {
  display: grid;
}
.cols-2 { grid-template-columns: repeat(2, 1fr); }
.cols-3 { grid-template-columns: repeat(3, 1fr); }
.column-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #3f6458;
  margin-bottom: 10px;
}
.column-text {
  font-size: 0.95rem;
  line-height: 1.75;
  color: #475569;
  margin: 0;
}
@media (max-width: 640px) {
  .cols-2, .cols-3 { grid-template-columns: 1fr; }
}
</style>
