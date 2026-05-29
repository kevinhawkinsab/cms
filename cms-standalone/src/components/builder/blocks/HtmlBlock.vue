<template>
  <div
    :data-testid="`html-block-${block.id}`"
    :style="computedStyles"
    class="html-block container"
  >
    <div v-if="editing" class="html-editor-wrap">
      <textarea
        class="form-control html-textarea"
        :value="resolvedCode"
        @input="$emit('update', { code: $event.target.value })"
        rows="6"
        placeholder="Escribe HTML aqui..."
      />
      <div class="html-preview mt-2" v-html="resolvedCode" />
    </div>
    <div v-else v-html="resolvedCode" />
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

defineEmits(['update'])

const content = computed(() => props.block.content || {})
const resolvedBlock = computed(() => sanitizeBlogBlocks([{ ...props.block, content: content.value }], props.post || null)[0] || { content: { code: content.value.code || '' } })
const resolvedCode = computed(() => resolvedBlock.value.content?.code || '')
const computedStyles = computed(() => ({ ...props.block.styles }))
</script>

<style scoped>
.html-textarea {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.85rem;
  background: #1e2022;
  color: #e2e8f0;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 16px;
}
.html-preview {
  padding: 12px;
  border: 1px dashed rgba(128,186,73,0.3);
  border-radius: 12px;
  font-size: 0.85rem;
  color: #64748b;
}
</style>
