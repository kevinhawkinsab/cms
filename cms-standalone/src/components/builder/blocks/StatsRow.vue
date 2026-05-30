<template>
  <div
    class="stats-row container"
    :data-testid="`stats-row-${block.id}`"
    :style="block.styles"
  >
    <div class="stats-grid">
      <div
        v-for="(item, i) in (content.items || [])"
        :key="i"
        class="stat-item"
      >
        <span class="stat-value">{{ item.value }}<span v-if="item.suffix" class="stat-suffix">{{ item.suffix }}</span></span>
        <span class="stat-label">{{ item.label }}</span>
      </div>
      <div v-if="editing && (!content.items || content.items.length === 0)" class="stat-item stat-placeholder">
        <span class="stat-value">99<span class="stat-suffix">+</span></span>
        <span class="stat-label">Agrega estadisticas</span>
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
</script>

<style scoped>
.stats-row {
  padding: 40px 0;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px 20px;
  background: #fff;
  border: 1px solid rgba(63,100,88,0.10);
  border-radius: 16px;
}
.stat-placeholder { opacity: 0.4; border-style: dashed; }
.stat-value {
  font-size: 2.6rem;
  font-weight: 900;
  color: #3f6458;
  line-height: 1;
  margin-bottom: 8px;
}
.stat-suffix {
  font-size: 1.6rem;
  font-weight: 700;
  color: #80ba49;
}
.stat-label {
  font-size: 0.88rem;
  color: #64748b;
  font-weight: 500;
  line-height: 1.4;
  max-width: 120px;
}
</style>
