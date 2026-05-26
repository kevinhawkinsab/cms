<template>
  <div
    class="page-renderer"
    @dragover.prevent
    @drop.prevent="onDrop"
  >
    <draggable
      v-model="localBlocks"
      item-key="id"
      handle=".control-handle"
      animation="200"
      ghost-class="ghost-block"
      @end="onReorderEnd"
    >
      <template #item="{ element: block }">
        <BlockWrapper
          :block="block"
          :edit-mode="editMode"
          :is-selected="selectedId === block.id"
          @select="$emit('select', $event)"
          @remove="$emit('remove', $event)"
          @duplicate="$emit('duplicate', $event)"
          @toggle-visibility="$emit('toggle-visibility', $event)"
        >
          <component
            :is="blockComponent(block.type)"
            :block="block"
            :edit-mode="editMode"
          />
        </BlockWrapper>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import draggable from 'vuedraggable'
import BlockWrapper from './BlockWrapper.vue'
import HeadingBlock from './blocks/HeadingBlock.vue'
import ParagraphBlock from './blocks/ParagraphBlock.vue'
import ImageBlock from './blocks/ImageBlock.vue'
import YoutubeBlock from './blocks/YoutubeBlock.vue'
import QuoteBlock from './blocks/QuoteBlock.vue'
import SeparatorBlock from './blocks/SeparatorBlock.vue'
import SpacerBlock from './blocks/SpacerBlock.vue'
import HtmlBlock from './blocks/HtmlBlock.vue'
import ButtonBlock from './blocks/ButtonBlock.vue'
import ImageGallery from './blocks/ImageGallery.vue'
import ArticleListBlock from './blocks/ArticleListBlock.vue'
import FrontPage from './blocks/FrontPage.vue'

const props = defineProps({
  blocks: Array,
  editMode: Boolean,
  selectedId: String,
})

const emit = defineEmits(['select', 'remove', 'duplicate', 'toggle-visibility', 'reorder'])

const localBlocks = ref([...props.blocks])

watch(() => props.blocks, (val) => { localBlocks.value = [...val] }, { deep: true })

const blockMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  image: ImageBlock,
  youtube: YoutubeBlock,
  quote: QuoteBlock,
  separator: SeparatorBlock,
  spacer: SpacerBlock,
  html: HtmlBlock,
  button: ButtonBlock,
  'image-gallery': ImageGallery,
  'article-list': ArticleListBlock,
  'front-page': FrontPage,
}

function blockComponent(type) {
  return blockMap[type] ?? ParagraphBlock
}

function onReorderEnd() {
  emit('reorder', localBlocks.value)
}

function onDrop(e) {
  const type = window.__builderDragType
  if (type) {
    const builderStore = usePageBuilderStore()
    builderStore.addBlock(type)
    window.__builderDragType = null
  }
}
</script>

<style scoped>
.page-renderer { min-height: 200px; }
.ghost-block { opacity: 0.4; border: 2px dashed var(--color-brand-300); }
</style>
