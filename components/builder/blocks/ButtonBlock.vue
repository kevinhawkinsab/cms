<template>
  <div :data-testid="`button-block-${block.id}`" :style="{ textAlign: block.styles?.textAlign || 'left', marginBottom: block.styles?.marginBottom || '16px' }" class="container">
    <a
      v-if="!editing"
      :href="content.url || '#'"
      :target="content.target || '_self'"
      class="btn builder-btn"
      :class="btnClass"
    >
      {{ content.text || 'Boton' }}
    </a>
    <span
      v-else
      class="btn builder-btn"
      :class="btnClass"
      contenteditable="true"
      @blur="onBlur"
    >{{ content.text || 'Boton' }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const emit = defineEmits(['update'])

const content = computed(() => props.block.content || {})

const btnClass = computed(() => {
  const v = content.value.variant || 'primary'
  const map = {
    primary: 'btn-builder-primary',
    secondary: 'btn-builder-secondary',
    outline: 'btn-builder-outline',
    dark: 'btn-builder-dark'
  }
  return map[v] || map.primary
})

function onBlur(e) {
  if (props.editing) emit('update', { text: e.target.innerText })
}
</script>

<style scoped>
.builder-btn {
  display: inline-flex;
  align-items: center;
  padding: 12px 28px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
  outline: none;
  cursor: pointer;
}
.builder-btn:hover { transform: translateY(-1px); }
.btn-builder-primary {
  background: linear-gradient(135deg, #80ba49, #3f6458);
  color: #fff;
  border: none;
  box-shadow: 0 8px 20px rgba(128,186,73,0.25);
}
.btn-builder-secondary {
  background: #0da7d5;
  color: #fff;
  border: none;
  box-shadow: 0 8px 20px rgba(13,167,213,0.25);
}
.btn-builder-outline {
  background: transparent;
  color: #3f6458;
  border: 2px solid #80ba49;
}
.btn-builder-dark {
  background: #1e2022;
  color: #fff;
  border: none;
}
</style>
