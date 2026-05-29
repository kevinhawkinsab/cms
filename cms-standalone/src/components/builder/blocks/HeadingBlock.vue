<template>
  <component
    v-if="hasVisibleText || editing"
    :is="headingTag"
    :style="computedStyles"
    :contenteditable="editing"
    :data-testid="`heading-block-${block.id}`"
    @blur="onBlur"
    @keydown.enter.prevent="onBlur"
    v-text="normalizedText"
    class="container"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false },
  post: { type: Object, default: null }
})

const emit = defineEmits(['update'])

function normalizeHeadingText(value = '') {
  return String(value || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

const rawContent = computed(() => props.block.content || {})

const normalizedText = computed(() => {
  return normalizeHeadingText(rawContent.value.text)
})

const normalizedLevel = computed(() => {
  const level = Number(rawContent.value.level || 2)
  if (level >= 5) return 3
  return level
})

const hasVisibleText = computed(() => {
  return normalizedText.value.length > 0
})

const headingTag = computed(() => `h${normalizedLevel.value}`)

const computedStyles = computed(() => ({
  outline: 'none',
  cursor: props.editing ? 'text' : 'default',
  ...props.block.styles
}))

function onBlur(e) {
  if (props.editing) {
    emit('update', { text: normalizeHeadingText(e.target.innerText) })
  }
}
</script>
