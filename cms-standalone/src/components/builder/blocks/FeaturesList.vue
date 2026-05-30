<template>
  <div
    class="features-list container"
    :data-testid="`features-list-${block.id}`"
    :style="block.styles"
  >
    <div v-if="content.title || content.subtitle || editing" class="features-header">
      <h3 v-if="content.title || editing" class="features-title">
        {{ content.title || (editing ? 'Titulo de la seccion' : '') }}
      </h3>
      <p v-if="content.subtitle || editing" class="features-subtitle">
        {{ content.subtitle || (editing ? 'Subtitulo o descripcion de la seccion.' : '') }}
      </p>
    </div>
    <div class="features-grid">
      <div
        v-for="(item, i) in (content.items || [])"
        :key="i"
        class="feature-item"
      >
        <div class="feature-icon-wrap">
          <i :class="item.icon || 'fas fa-check'"></i>
        </div>
        <div class="feature-body">
          <h4 class="feature-item-title">{{ item.title || (editing ? 'Caracteristica' : '') }}</h4>
          <p class="feature-item-desc">{{ item.description || (editing ? 'Descripcion de la caracteristica.' : '') }}</p>
        </div>
      </div>
      <div v-if="editing && (!content.items || content.items.length === 0)" class="feature-item feature-item-placeholder">
        <div class="feature-icon-wrap"><i class="fas fa-check"></i></div>
        <div class="feature-body">
          <h4 class="feature-item-title">Caracteristica de ejemplo</h4>
          <p class="feature-item-desc">Agrega items desde el panel de propiedades.</p>
        </div>
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
.features-list {
  padding: 16px 0;
}
.features-header {
  text-align: center;
  margin-bottom: 40px;
}
.features-title {
  font-size: 1.9rem;
  font-weight: 900;
  color: #1e2022;
  margin-bottom: 10px;
}
.features-subtitle {
  font-size: 1rem;
  color: #64748b;
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.feature-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: #fff;
  border: 1px solid rgba(63,100,88,0.08);
  border-radius: 16px;
  transition: box-shadow 0.2s;
}
.feature-item:hover {
  box-shadow: 0 8px 24px rgba(63,100,88,0.08);
}
.feature-item-placeholder {
  opacity: 0.5;
  border-style: dashed;
}
.feature-icon-wrap {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: rgba(128,186,73,0.1);
  color: #80ba49;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
}
.feature-body { flex: 1; }
.feature-item-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e2022;
  margin-bottom: 6px;
}
.feature-item-desc {
  font-size: 0.88rem;
  line-height: 1.65;
  color: #64748b;
  margin: 0;
}
</style>
