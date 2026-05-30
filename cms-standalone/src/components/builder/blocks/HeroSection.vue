<template>
  <section
    class="hero-section"
    :data-testid="`hero-section-${block.id}`"
    :style="{ backgroundColor: content.bgColor || '#f5f0eb', ...block.styles }"
  >
    <div class="hero-inner" :class="content.imagePosition === 'left' ? 'image-left' : 'image-right'">
      <div class="hero-text">
        <p v-if="content.eyebrow || editing" class="hero-eyebrow">
          {{ content.eyebrow || (editing ? 'Texto superior' : '') }}
        </p>
        <h2 class="hero-heading">
          {{ content.heading || (editing ? 'Titulo principal del hero' : '') }}
        </h2>
        <p class="hero-body">
          {{ content.body || (editing ? 'Descripcion o subtitulo del hero. Escribe el contenido aqui.' : '') }}
        </p>
      </div>
      <div class="hero-image-wrap">
        <img
          v-if="content.image"
          :src="content.image"
          :alt="content.imageAlt || ''"
          class="hero-img"
          loading="lazy"
        />
        <div v-else-if="editing" class="hero-img-placeholder">
          <i class="fas fa-image"></i>
          <span>Imagen del hero</span>
        </div>
        <div v-if="content.badgeLabel || content.badgeText" class="hero-badge">
          <span class="hero-badge-label">{{ content.badgeLabel }}</span>
          <span class="hero-badge-text">{{ content.badgeText }}</span>
        </div>
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
.hero-section {
  padding: 60px 40px;
  border-radius: 20px;
  overflow: hidden;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}
.hero-inner.image-left {
  direction: rtl;
}
.hero-inner.image-left > * {
  direction: ltr;
}
.hero-eyebrow {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #80ba49;
  margin-bottom: 12px;
}
.hero-heading {
  font-size: 2.4rem;
  font-weight: 900;
  line-height: 1.15;
  color: #1e2022;
  margin-bottom: 20px;
}
.hero-body {
  font-size: 1.05rem;
  line-height: 1.75;
  color: #475569;
  margin: 0;
}
.hero-image-wrap {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}
.hero-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
  object-fit: cover;
}
.hero-img-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 300px;
  background: rgba(128,186,73,0.06);
  border: 2px dashed rgba(128,186,73,0.3);
  border-radius: 16px;
  color: #80ba49;
  font-size: 1rem;
}
.hero-img-placeholder i { font-size: 2rem; }
.hero-badge {
  position: absolute;
  bottom: 16px;
  left: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}
.hero-badge-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #80ba49;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.hero-badge-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1e2022;
}
@media (max-width: 768px) {
  .hero-inner {
    grid-template-columns: 1fr;
    direction: ltr !important;
  }
  .hero-inner > * { direction: ltr !important; }
  .hero-heading { font-size: 1.8rem; }
  .hero-section { padding: 40px 20px; }
}
</style>
