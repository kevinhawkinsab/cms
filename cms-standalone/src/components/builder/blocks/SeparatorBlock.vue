<template>
  <div :data-testid="`separator-block-${block.id}`" class="container" :style="wrapperStyles">
    <hr :style="hrStyles" />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const content = computed(() => props.block.content || {})

const wrapperStyles = computed(() => ({
  marginTop: props.block.styles?.marginTop || '24px',
  marginBottom: props.block.styles?.marginBottom || '24px'
}))

const hrStyles = computed(() => {
  const style = content.value.style || 'solid'
  const color = props.block.styles?.color || '#dfe0d6'
  const thickness = content.value.thickness || '1px'

  if (style === 'gradient') {
    return {
      border: 'none',
      height: thickness,
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`
    }
  }
  return {
    border: 'none',
    borderTop: `${thickness} ${style} ${color}`,
    margin: 0
  }
})
</script>
