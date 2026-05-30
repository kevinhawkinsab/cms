<template>
  <div
    v-if="block && block.type"
    class="block-wrapper"
    :class="{ 'is-selected': isSelected, 'is-hidden': !block.visible }"
    @click.stop="store.selectBlock(block.id)"
    :data-testid="`block-wrapper-${block.id}`"
  >
    <div class="block-toolbar" v-if="isSelected">
      <span class="block-label">
        <i :class="typeInfo.icon" class="me-1"></i>
        {{ typeInfo.label }}
      </span>
      <div class="block-actions">
        <button
          class="bw-btn"
          title="Mover arriba"
          :disabled="index === 0"
          @click.stop="$emit('move-up')"
          data-testid="block-move-up"
        >
          <i class="fas fa-chevron-up"></i>
        </button>
        <button
          class="bw-btn"
          title="Mover abajo"
          :disabled="index === totalBlocks - 1"
          @click.stop="$emit('move-down')"
          data-testid="block-move-down"
        >
          <i class="fas fa-chevron-down"></i>
        </button>
        <button
          class="bw-btn"
          :title="block.visible ? 'Ocultar' : 'Mostrar'"
          @click.stop="store.toggleBlockVisibility(block.id)"
          data-testid="block-toggle-visibility"
        >
          <i :class="block.visible ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </button>
        <button
          class="bw-btn"
          title="Duplicar"
          @click.stop="store.duplicateBlock(block.id)"
          data-testid="block-duplicate"
        >
          <i class="fas fa-clone"></i>
        </button>
        <button
          class="bw-btn bw-btn--danger"
          title="Eliminar"
          @click.stop="store.removeBlock(block.id)"
          data-testid="block-delete"
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>

    <div class="drag-handle" title="Arrastrar para reordenar">
      <i class="fas fa-grip-vertical"></i>
    </div>

    <div class="block-content" :style="{ opacity: block.visible ? 1 : 0.4 }">
      <component
        :is="getBlockComponent(resolvedBlock.type)"
        :block="resolvedBlock"
        :post="postData"
        :editing="true"
        @update="onBlockUpdate"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePageBuilderStore } from '@/stores/pageBuilder.js'
import HeadingBlock from './blocks/HeadingBlock.vue'
import ParagraphBlock from './blocks/ParagraphBlock.vue'
import ImageBlock from './blocks/ImageBlock.vue'
import SeparatorBlock from './blocks/SeparatorBlock.vue'
import YoutubeBlock from './blocks/YoutubeBlock.vue'
import QuoteBlock from './blocks/QuoteBlock.vue'
import ButtonBlock from './blocks/ButtonBlock.vue'
import HtmlBlock from './blocks/HtmlBlock.vue'
import ArticleListBlock from './blocks/ArticleListBlock.vue'
import SpacerBlock from './blocks/SpacerBlock.vue'
import PostSidebar from './blocks/PostSidebar.vue'
import ImageGallery from './blocks/ImageGallery.vue'
import PostTags from './blocks/PostTags.vue'
import FrontPage from './blocks/FrontPage.vue'
import HeroSection from './blocks/HeroSection.vue'
import ColumnsBlock from './blocks/ColumnsBlock.vue'
import FeaturesList from './blocks/FeaturesList.vue'
import StatsRow from './blocks/StatsRow.vue'
import CtaBanner from './blocks/CtaBanner.vue'
import AccordionBlock from './blocks/AccordionBlock.vue'
import TableBlock from './blocks/TableBlock.vue'
import TestimonialBlock from './blocks/TestimonialBlock.vue'
import ContentImageBlock from './blocks/ContentImageBlock.vue'
import BlogPreviewBlock from './blocks/BlogPreviewBlock.vue'
import TeamBlock from './blocks/TeamBlock.vue'
import TimelineBlock from './blocks/TimelineBlock.vue'
import FormBuilderBlock from './blocks/FormBuilderBlock.vue'

const props = defineProps({
  block: { type: Object, required: true },
  index: { type: Number, required: true },
  totalBlocks: { type: Number, required: true }
})

defineEmits(['move-up', 'move-down'])

const store = usePageBuilderStore()

const isSelected = computed(() => store.selectedBlockId === props.block.id)
const postData = computed(() => store.currentLayout?.postData || null)

const typeInfo = computed(() => store.blockTypes[props.block.type] || { label: props.block.type, icon: 'fas fa-cube' })

const blockComponentMap = {
  heading: HeadingBlock,
  paragraph: ParagraphBlock,
  image: ImageBlock,
  separator: SeparatorBlock,
  youtube: YoutubeBlock,
  quote: QuoteBlock,
  button: ButtonBlock,
  html: HtmlBlock,
  'article-list': ArticleListBlock,
  spacer: SpacerBlock,
  'post-sidebar': PostSidebar,
  'image-gallery': ImageGallery,
  'post-tags': PostTags,
  'front-page': FrontPage,
  'hero-section': HeroSection,
  columns: ColumnsBlock,
  'features-list': FeaturesList,
  'stats-row': StatsRow,
  'cta-banner': CtaBanner,
  accordion: AccordionBlock,
  table: TableBlock,
  testimonial: TestimonialBlock,
  'content-image': ContentImageBlock,
  'blog-preview': BlogPreviewBlock,
  team: TeamBlock,
  timeline: TimelineBlock,
  form: FormBuilderBlock
}

function getBlockComponent(type) {
  return blockComponentMap[type] || HtmlBlock
}

const resolvedBlock = computed(() => {
  if (!postData.value) return props.block

  const cloned = JSON.parse(JSON.stringify(props.block))
  cloned.content = resolveValue(cloned.content, postData.value)
  return cloned
})

function resolveValue(value, source) {
  if (typeof value === 'string') {
    return value.replace(/\{\{\s*post\.([\w.]+)\s*\}\}/g, (match, path) => {
      const resolved = getNestedValue(source, path)
      return resolved == null ? match : String(resolved)
    })
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveValue(item, source))
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveValue(item, source)])
    )
  }

  return value
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function onBlockUpdate(content) {
  store.updateBlockContent(props.block.id, content)
}
</script>

<style scoped>
.block-wrapper {
  position: relative;
  border: 2px solid transparent;
  border-radius: 14px;
  padding: 4px 4px 4px 28px;
  margin-bottom: 6px;
  transition: border-color 0.2s, background 0.2s;
  cursor: pointer;
}
.block-wrapper:hover {
  border-color: rgba(128,186,73,0.25);
  background: rgba(128,186,73,0.02);
}
.block-wrapper.is-selected {
  border-color: #80ba49;
  background: rgba(128,186,73,0.04);
}
.block-wrapper.is-hidden {
  border-style: dashed;
}
.block-toolbar {
  position: absolute;
  top: -36px;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  background: rgba(63,100,88,0.95);
  backdrop-filter: blur(10px);
  border-radius: 10px 10px 0 0;
  z-index: 5;
}
.block-label {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}
.block-actions {
  display: flex;
  gap: 2px;
}
.bw-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  background: rgba(255,255,255,0.12);
  color: #fff;
  font-size: 0.72rem;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.15s;
}
.bw-btn:hover { background: rgba(255,255,255,0.25); }
.bw-btn:disabled { opacity: 0.3; cursor: not-allowed; }
.bw-btn--danger:hover { background: rgba(239,68,68,0.7); }
.drag-handle {
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  cursor: grab;
  font-size: 0.8rem;
}
.drag-handle:active { cursor: grabbing; }
.block-content {
  transition: opacity 0.2s;
}
</style>
