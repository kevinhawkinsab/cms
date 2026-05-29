<template>
  <div :data-testid="`front-page-block-${block.id}`" class="front-page-block " :style="containerStyle">
    <!-- Overlay -->
    <div v-if="content.overlay" class="fp-overlay"></div>

    <div class="fp-content" :style="{ textAlign: content.align || 'center' }">
      <!-- Breadcrumbs -->
      <nav v-if="content.breadcrumbs?.length" class="fp-breadcrumbs" aria-label="breadcrumb">
        <ol>
          <li v-for="(bc, i) in content.breadcrumbs" :key="i" :class="{ active: i === content.breadcrumbs.length - 1 }">
            <router-link v-if="bc.url && !editing" :to="bc.url">{{ bc.label }}</router-link>
            <span v-else>{{ bc.label }}</span>
            <i v-if="i < content.breadcrumbs.length - 1" class="fas fa-chevron-right fp-bc-sep"></i>
          </li>
        </ol>
      </nav>

      <!-- Tags -->
      <div v-if="content.tags?.length" class="fp-tags">
        <span
          v-for="(tag, i) in content.tags"
          :key="i"
          class="fp-tag"
          :style="{ backgroundColor: tag.color || '#80ba49' }"
        >{{ tag.text }}</span>
      </div>

      <!-- Title -->
      <h1
        v-if="content.title"
        class="fp-title"
        :contenteditable="editing"
        @blur="editing && $emit('update', { title: $event.target.innerText })"
      >{{ content.title }}</h1>

      <!-- Meta -->
      <div v-if="content.date || content.author" class="fp-meta">
        <span v-if="content.date"><i class="far fa-calendar me-2"></i>
        {{ publishedDate?.toLocaleDateString('es-PA', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) }}
        </span>
        <span v-if="content.author"><i class="far fa-user me-2"></i>{{ content.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false },
  post: { type: Object, default: null }
})

defineEmits(['update'])

const content = computed(() => props.block.content || {});
const publishedDate = computed(() => props.post?.createdAt ? new Date(props.post.createdAt) : null)
console.log('FrontPage content:', props)

const containerStyle = computed(() => {
  const s = props.block.styles || {}
  return {
    backgroundImage: content.value.backgroundImage
      ? `url(${content.value.backgroundImage})`
      : undefined,
    backgroundPosition: content.value.backgroundPosition || 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    paddingTop: s.paddingTop || '60px',
    paddingBottom: s.paddingBottom || '60px',
    textAlign: s.textAlign || 'center',
    borderRadius: s.borderRadius || '0',
    minHeight: s.minHeight || 'auto'
  }
})
</script>

<style scoped>
.front-page-block {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.fp-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(3,11,21,0.15) 0%, rgba(3,11,21,0.72) 100%),
    linear-gradient(135deg, rgba(0,0,0,0.15), rgba(17,24,39,0.15));
  z-index: 0;
}
.fp-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  padding: 0 24px;
}

/* Breadcrumbs */
.fp-breadcrumbs ol {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  flex-wrap: wrap;
}
.fp-breadcrumbs li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.6);
}
.fp-breadcrumbs li.active {
  color: #fff;
  font-weight: 700;
}
.fp-breadcrumbs a {
  color: rgba(255,255,255,0.6);
  text-decoration: none;
}
.fp-breadcrumbs a:hover { color: #fff; }
.fp-bc-sep {
  font-size: 0.55rem;
  color: rgba(255,255,255,0.35);
  margin: 0 4px;
}

/* Tags */
.fp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-bottom: 18px;
}
.fp-tag {
  padding: 4px 14px;
  border-radius: 999px;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

/* Title */
.fp-title {
  font-size: clamp(2rem, 5vw, 3.8rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.08;
  letter-spacing: -0.03em;
  margin-bottom: 18px;
  outline: none;
  text-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

/* Meta */
.fp-meta {
  display: flex;
  gap: 20px;
  justify-content: center;
  color: rgba(255,255,255,0.75);
  font-size: 0.92rem;
}
</style>
