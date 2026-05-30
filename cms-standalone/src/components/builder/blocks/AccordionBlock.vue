<template>
  <div
    class="accordion-block container"
    :data-testid="`accordion-block-${block.id}`"
    :style="block.styles"
  >
    <h3 v-if="content.title || editing" class="accordion-title">
      {{ content.title || (editing ? 'Preguntas Frecuentes' : '') }}
    </h3>
    <div class="accordion-list">
      <div
        v-for="(item, i) in (content.items || [])"
        :key="i"
        class="accordion-item"
        :class="{ open: openIndex === i }"
      >
        <button class="accordion-question" @click="toggle(i)">
          <span>{{ item.question || (editing ? `Pregunta ${i + 1}` : '') }}</span>
          <i class="fas" :class="openIndex === i ? 'fa-minus' : 'fa-plus'"></i>
        </button>
        <div class="accordion-answer" :style="{ maxHeight: openIndex === i ? '600px' : '0' }">
          <p>{{ item.answer || (editing ? 'Respuesta a la pregunta.' : '') }}</p>
        </div>
      </div>
      <div v-if="editing && (!content.items || content.items.length === 0)" class="accordion-item open">
        <button class="accordion-question">
          <span>Pregunta de ejemplo</span>
          <i class="fas fa-minus"></i>
        </button>
        <div class="accordion-answer" style="max-height: 600px;">
          <p>Agrega preguntas y respuestas desde el panel de propiedades.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const content = computed(() => props.block.content || {})
const openIndex = ref(null)

function toggle(i) {
  openIndex.value = openIndex.value === i ? null : i
}
</script>

<style scoped>
.accordion-block {
  padding: 16px 0;
}
.accordion-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: #1e2022;
  margin-bottom: 28px;
  text-align: center;
}
.accordion-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 800px;
  margin: 0 auto;
}
.accordion-item {
  border: 1px solid rgba(63,100,88,0.1);
  border-radius: 14px;
  overflow: hidden;
  background: #fff;
  transition: box-shadow 0.2s;
}
.accordion-item.open {
  box-shadow: 0 4px 16px rgba(63,100,88,0.08);
}
.accordion-question {
  width: 100%;
  background: none;
  border: none;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e2022;
  text-align: left;
  gap: 12px;
}
.accordion-question i {
  flex-shrink: 0;
  font-size: 0.8rem;
  color: #80ba49;
  transition: transform 0.2s;
}
.accordion-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}
.accordion-answer p {
  padding: 0 20px 18px;
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.75;
  color: #475569;
}
</style>
