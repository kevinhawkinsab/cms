<template>
  <section
    class="timeline-block"
    :data-testid="`timeline-block-${block.id}`"
    :style="block.styles"
  >
    <div v-if="content.title || editing" class="timeline-header">
      <p v-if="content.eyebrow || editing" class="tl-eyebrow">
        {{ content.eyebrow || (editing ? 'NUESTRA HISTORIA' : '') }}
      </p>
      <h2 class="tl-title">{{ content.title || (editing ? 'Línea de tiempo' : '') }}</h2>
    </div>

    <div class="tl-list">
      <div
        v-for="(item, i) in (content.items || [])"
        :key="i"
        class="tl-item"
        :class="i % 2 === 0 ? 'tl-item--left' : 'tl-item--right'"
      >
        <div class="tl-marker">
          <div class="tl-dot"></div>
        </div>
        <div class="tl-card">
          <span v-if="item.year" class="tl-year">{{ item.year }}</span>
          <h4 class="tl-event-title">{{ item.title || (editing ? 'Evento' : '') }}</h4>
          <p v-if="item.description" class="tl-description">{{ item.description }}</p>
        </div>
      </div>

      <div v-if="editing && (!content.items || content.items.length === 0)" class="tl-empty">
        <i class="fas fa-history"></i>
        <p>Agrega eventos a la línea de tiempo desde el panel de propiedades</p>
      </div>
    </div>
  </section>
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
.timeline-block { padding: 56px 0; }
.timeline-header { text-align: center; margin-bottom: 48px; }
.tl-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; margin: 0 0 10px; }
.tl-title { font-size: 2rem; font-weight: 800; color: #1e2022; margin: 0; }

.tl-list {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tl-list::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #e2e8f0 10%, #e2e8f0 90%, transparent);
  transform: translateX(-50%);
}

.tl-item {
  display: grid;
  grid-template-columns: 1fr 40px 1fr;
  gap: 16px;
  align-items: center;
  margin-bottom: 32px;
}
.tl-item--left .tl-card { grid-column: 1; text-align: right; }
.tl-item--left .tl-marker { grid-column: 2; }
.tl-item--left::after { content: ''; grid-column: 3; }
.tl-item--right::before { content: ''; grid-column: 1; }
.tl-item--right .tl-marker { grid-column: 2; }
.tl-item--right .tl-card { grid-column: 3; text-align: left; }

.tl-marker { display: flex; justify-content: center; z-index: 1; }
.tl-dot {
  width: 16px; height: 16px; border-radius: 50%;
  background: #3f6458; border: 3px solid #fff;
  box-shadow: 0 0 0 2px #3f6458;
}

.tl-card {
  background: #fff; border: 1px solid rgba(0,0,0,0.08);
  border-radius: 14px; padding: 20px 24px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);
}
.tl-year {
  display: inline-block; font-size: 0.72rem; font-weight: 800;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: #3f6458; margin-bottom: 6px;
  background: rgba(63,100,88,0.08); padding: 2px 10px; border-radius: 20px;
}
.tl-event-title { font-size: 1rem; font-weight: 700; color: #1e2022; margin: 4px 0; }
.tl-description { font-size: 0.85rem; color: #64748b; line-height: 1.6; margin: 0; }

.tl-empty {
  text-align: center; padding: 40px; color: #94a3b8;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.tl-empty i { font-size: 2rem; }
.tl-empty p { font-size: 0.85rem; max-width: 300px; margin: 0; }

@media (max-width: 640px) {
  .tl-list::before { left: 20px; }
  .tl-item { grid-template-columns: 40px 1fr; gap: 12px; }
  .tl-item--left .tl-card,
  .tl-item--right .tl-card { grid-column: 2; text-align: left; grid-row: 1; }
  .tl-item--left .tl-marker,
  .tl-item--right .tl-marker { grid-column: 1; grid-row: 1; }
  .tl-item--left::after,
  .tl-item--right::before { display: none; }
}
</style>
