<template>
  <div :data-testid="`spacer-block-${block.id}`" :style="{ height: content.height || '40px' }" class="spacer-block container">
    <div v-if="editing" class="spacer-indicator">
      <span>{{ content.height || '40px' }}</span>
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
.spacer-block {
  position: relative;
}
.spacer-indicator {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed rgba(128,186,73,0.3);
  border-radius: 8px;
  background: rgba(128,186,73,0.03);
}
.spacer-indicator span {
  font-size: 0.75rem;
  color: #80ba49;
  font-weight: 600;
}
</style>
