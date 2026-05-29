<template>
  <div class="page-renderer" data-testid="page-renderer">
    <template v-for="block in visibleBlocks" :key="block.id">
      <component
        :is="getBlockComponent(block.type)"
        :block="block"
        :post="post"
        :editing="false"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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

const props = defineProps({
  layout: { type: Object, default: null },
  post: { type: Object, default: null }
})

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
  'front-page': FrontPage
}

function getBlockComponent(type) {
  return blockComponentMap[type] || HtmlBlock
}

const visibleBlocks = computed(() => {
  if (!props.layout?.blocks) return []
  return props.layout.blocks
    .filter(b => b.visible !== false)
    .map(b => resolvePostData(b))
})

function resolvePostData(block) {
  if (!props.post) return block
  const resolved = JSON.parse(JSON.stringify(block))
  if (resolved.content) {
    for (const key of Object.keys(resolved.content)) {
      const val = resolved.content[key]
      if (typeof val === 'string' && val.startsWith('{{') && val.endsWith('}}')) {
        const path = val.slice(2, -2).trim()
        resolved.content[key] = getNestedValue(props.post, path.replace('post.', '')) || val
      }
    }
  }
  return resolved
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}
</script>
