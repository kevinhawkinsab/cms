<template>
  <section
    class="ci-section"
    :data-testid="`content-image-${block.id}`"
    :style="{ backgroundColor: content.bgColor || '#f5f0eb', ...block.styles }"
  >
    <div class="ci-inner" :class="content.imagePosition === 'left' ? 'ci-inner--img-left' : ''">

      <!-- Left: text content -->
      <div class="ci-text">
        <p v-if="content.eyebrow || editing" class="ci-eyebrow">
          {{ content.eyebrow || (editing ? 'EYEBROW LABEL' : '') }}
        </p>
        <h2 class="ci-heading">
          {{ content.heading || (editing ? 'Título principal de la sección' : '') }}
        </h2>
        <p v-if="content.bodyTop || editing" class="ci-body">
          {{ content.bodyTop || (editing ? 'Párrafo superior. Escribe aquí el contenido descriptivo de esta sección.' : '') }}
        </p>

        <!-- Mini-stats / feature chips -->
        <div v-if="content.stats && content.stats.length" class="ci-stats">
          <div v-for="(stat, i) in content.stats" :key="i" class="ci-stat-chip">
            <span class="ci-stat-value">{{ stat.value }}</span>
            <span class="ci-stat-label">{{ stat.label }}</span>
          </div>
        </div>
        <div v-else-if="editing" class="ci-stats">
          <div class="ci-stat-chip">
            <span class="ci-stat-value">175,000+</span>
            <span class="ci-stat-label">unidades vendidas</span>
          </div>
          <div class="ci-stat-chip">
            <span class="ci-stat-value">2018</span>
            <span class="ci-stat-label">año de fundación</span>
          </div>
        </div>

        <p v-if="content.bodyBottom || editing" class="ci-body">
          {{ content.bodyBottom || (editing ? 'Párrafo inferior adicional con más detalle o contexto.' : '') }}
        </p>
      </div>

      <!-- Right: image -->
      <div class="ci-image-wrap">
        <img
          v-if="content.image"
          :src="content.image"
          :alt="content.imageAlt || ''"
          class="ci-img"
          loading="lazy"
        />
        <div v-else-if="editing" class="ci-img-placeholder">
          <i class="fas fa-image"></i>
          <span>URL de imagen</span>
        </div>
        <div v-if="content.badgeLabel || content.badgeText" class="ci-badge">
          <span class="ci-badge-label">{{ content.badgeLabel }}</span>
          <strong class="ci-badge-text">{{ content.badgeText }}</strong>
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
.ci-section {
  padding: 64px 40px;
  border-radius: 20px;
  overflow: hidden;
}
.ci-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.ci-inner--img-left { direction: rtl; }
.ci-inner--img-left > * { direction: ltr; }

/* Text */
.ci-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #64748b;
  margin: 0 0 12px;
}
.ci-heading {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 800;
  color: #1e2022;
  margin: 0 0 20px;
  line-height: 1.2;
}
.ci-body {
  font-size: 1rem;
  color: #475569;
  line-height: 1.75;
  margin: 0 0 24px;
}

/* Stats chips */
.ci-stats {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 0 0 24px;
}
.ci-stat-chip {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 110px;
}
.ci-stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1e2022;
  line-height: 1;
}
.ci-stat-label {
  font-size: 0.78rem;
  color: #64748b;
  line-height: 1.3;
}

/* Image */
.ci-image-wrap {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
}
.ci-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}
.ci-img-placeholder {
  width: 100%;
  min-height: 320px;
  background: rgba(0,0,0,0.06);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #94a3b8;
  font-size: 0.85rem;
}
.ci-img-placeholder i { font-size: 2rem; }

/* Badge overlay */
.ci-badge {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.ci-badge-label {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
}
.ci-badge-text {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e2022;
}

@media (max-width: 768px) {
  .ci-inner { grid-template-columns: 1fr; gap: 32px; }
  .ci-inner--img-left { direction: ltr; }
  .ci-section { padding: 40px 20px; }
}
</style>
