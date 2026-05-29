<template>
  <div class="container">
      <blockquote
    :data-testid="`quote-block-${block.id}`"
    class="quote-block container"
    :style="computedStyles"
  >
    <p
      :contenteditable="editing"
      @blur="onBlurText"
      class="quote-text"
    >{{ content.text }}</p>
    <footer v-if="content.author || editing" class="quote-author">
      <span
        :contenteditable="editing"
        @blur="onBlurAuthor"
      >{{ content.author || (editing ? 'Autor' : '') }}</span>
    </footer>
  </blockquote>
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

const computedStyles = computed(() => ({
  borderLeft: `4px solid ${props.block.styles?.borderLeftColor || '#80ba49'}`,
  backgroundColor: props.block.styles?.backgroundColor || 'rgba(128,186,73,0.06)',
  padding: '20px 24px',
  borderRadius: '0 12px 12px 0',
  margin: 0,
  ...props.block.styles,
  borderLeftColor: undefined
}))

function onBlurText(e) {
  if (props.editing) emit('update', { text: e.target.innerText })
}
function onBlurAuthor(e) {
  if (props.editing) emit('update', { author: e.target.innerText })
}
</script>

<style scoped>
.quote-text {
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #334155;
  margin-bottom: 8px;
  outline: none;
}
.quote-author {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 600;
}
.quote-author span {
  outline: none;
}
</style>
