<template>
  <div
    class="cta-banner"
    :data-testid="`cta-banner-${block.id}`"
    :style="bannerStyles"
  >
    <div class="cta-inner">
      <h2 class="cta-heading" :style="{ color: content.textColor || '#ffffff' }">
        {{ content.heading || (editing ? 'Llamada a la accion principal' : '') }}
      </h2>
      <p v-if="content.subtext || editing" class="cta-subtext" :style="{ color: content.textColor || '#ffffff' }">
        {{ content.subtext || (editing ? 'Subtexto o descripcion del CTA.' : '') }}
      </p>
      <div class="cta-buttons">
        <a
          v-if="content.primaryBtn?.text || editing"
          :href="editing ? undefined : (content.primaryBtn?.url || '#')"
          class="cta-btn cta-btn-primary"
        >
          {{ content.primaryBtn?.text || 'Boton primario' }}
        </a>
        <a
          v-if="content.secondaryBtn?.text"
          :href="editing ? undefined : (content.secondaryBtn?.url || '#')"
          class="cta-btn cta-btn-secondary"
          :style="{ borderColor: content.textColor || '#fff', color: content.textColor || '#fff' }"
        >
          {{ content.secondaryBtn.text }}
        </a>
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

const bannerStyles = computed(() => {
  const s = {
    backgroundColor: content.value.bgColor || '#1e3a2f',
    ...props.block.styles
  }
  if (content.value.bgImage) {
    s.backgroundImage = `url(${content.value.bgImage})`
    s.backgroundSize = 'cover'
    s.backgroundPosition = 'center'
  }
  return s
})
</script>

<style scoped>
.cta-banner {
  border-radius: 20px;
  padding: 64px 40px;
  text-align: center;
  overflow: hidden;
  position: relative;
}
.cta-inner {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}
.cta-heading {
  font-size: 2.2rem;
  font-weight: 900;
  margin-bottom: 16px;
  line-height: 1.2;
}
.cta-subtext {
  font-size: 1.05rem;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 32px;
}
.cta-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.cta-btn {
  display: inline-flex;
  align-items: center;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.cta-btn:hover { transform: translateY(-2px); }
.cta-btn-primary {
  background: #80ba49;
  color: #fff;
  box-shadow: 0 8px 20px rgba(128,186,73,0.3);
}
.cta-btn-secondary {
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
}
@media (max-width: 640px) {
  .cta-banner { padding: 40px 20px; }
  .cta-heading { font-size: 1.7rem; }
}
</style>
