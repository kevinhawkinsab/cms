<template>
  <div
    :style="computedStyles"
    :data-testid="`paragraph-block-${block.id}`"
    class="paragraph-block container"
  >
    <div
      v-if="editing"
      contenteditable="true"
      @blur="onBlur"
      v-html="resolvedHtml"
      class="paragraph-editable"
    />
    <div v-else v-html="resolvedHtml" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { sanitizeBlogBlocks } from '@/utils/blog.js'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false },
  post: { type: Object, default: null }
})

const emit = defineEmits(['update'])

const content = computed(() => props.block.content || {})
const resolvedBlock = computed(() => sanitizeBlogBlocks([{ ...props.block, content: content.value }], props.post || null)[0] || { content: { html: content.value.html || '' } })
const resolvedHtml = computed(() => resolvedBlock.value.content?.html || '')

const computedStyles = computed(() => ({
  ...props.block.styles
}))

function onBlur(e) {
  if (props.editing) {
    emit('update', { html: e.target.innerHTML })
  }
}
</script>

<style scoped>
.paragraph-editable {
  outline: none;
  min-height: 24px;
}
.paragraph-block :deep(p) {
  margin-bottom: 0.75rem;
}
.paragraph-block :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
