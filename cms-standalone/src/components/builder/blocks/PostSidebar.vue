<template>
  <div :data-testid="`post-sidebar-block-${block.id}`" :style="computedStyles" class="post-sidebar-block">
    <!-- Search -->
    <div v-if="content.showSearch" class="psb-section">
      <h6 class="psb-heading">Buscar</h6>
      <div class="psb-search">
        <i class="fas fa-search"></i>
        <input type="text" placeholder="Buscar articulos..." disabled />
      </div>
    </div>

    <!-- Categories -->
    <div v-if="content.showCategories" class="psb-section">
      <h6 class="psb-heading">Categorias</h6>
      <ul class="psb-cat-list">
        <li v-for="cat in displayCategories" :key="cat._id || cat">
          <span class="psb-cat-dot" :style="{ backgroundColor: cat.color || '#80ba49' }"></span>
          <span>{{ cat.name || cat }}</span>
        </li>
        <li v-if="!displayCategories.length" class="psb-empty">Sin categorias</li>
      </ul>
    </div>

    <!-- Recent Posts -->
    <div v-if="content.showRecentPosts" class="psb-section">
      <h6 class="psb-heading">Recientes</h6>
      <ul class="psb-recent">
        <li v-for="post in recentPosts" :key="post._id || post.id">
          <router-link v-if="!editing" :to="`/blog/${post.slug}`" class="psb-recent-link">
            <img v-if="post.featuredImage" :src="post.featuredImage" :alt="post.title" class="psb-recent-img" />
            <div>
              <span class="psb-recent-title">{{ post.title }}</span>
              <small class="psb-recent-date">{{ formatDate(post.publishedAt) }}</small>
            </div>
          </router-link>
          <div v-else class="psb-recent-link">
            <img v-if="post.featuredImage" :src="post.featuredImage" :alt="post.title" class="psb-recent-img" />
            <div>
              <span class="psb-recent-title">{{ post.title }}</span>
              <small class="psb-recent-date">{{ formatDate(post.publishedAt) }}</small>
            </div>
          </div>
        </li>
        <li v-if="!recentPosts.length" class="psb-empty">Sin publicaciones</li>
      </ul>
    </div>

    <!-- Tags -->
    <div v-if="content.showTags" class="psb-section">
      <h6 class="psb-heading">Etiquetas</h6>
      <div class="psb-tags">
        <span v-for="tag in displayTags" :key="tag" class="psb-tag">{{ tag }}</span>
        <span v-if="!displayTags.length" class="psb-empty">Sin etiquetas</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useCmsStore } from '@/stores/cms.js'

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const cmsStore = useCmsStore()
const content = computed(() => props.block.content || {})
const computedStyles = computed(() => ({ ...props.block.styles }))

const displayCategories = computed(() => {
  if (content.value.categories?.length) return content.value.categories
  return cmsStore.categories || []
})

const displayTags = computed(() => {
  if (content.value.tags?.length) return content.value.tags
  const all = (cmsStore.posts || []).flatMap(p => p.tags || [])
  return [...new Set(all)].slice(0, 15)
})

const recentPosts = computed(() => {
  const limit = content.value.recentPostsLimit || 5
  return (cmsStore.posts || []).slice(0, limit)
})

function formatDate(d) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('es-PA', { year: 'numeric', month: 'short', day: 'numeric' })
}

onMounted(async () => {
  if (!cmsStore.posts?.length) await cmsStore.fetchPosts({ visible: true })
  if (!cmsStore.categories?.length) await cmsStore.fetchCategories()
})
</script>

<style scoped>
.post-sidebar-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.psb-section {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(63,100,88,0.06);
  border-radius: 18px;
  padding: 18px;
  box-shadow: 0 6px 24px rgba(15,23,42,0.04);
}
.psb-heading {
  font-size: 0.82rem;
  font-weight: 800;
  color: #3f6458;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid rgba(128,186,73,0.18);
}
.psb-search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f1f2f7;
  border-radius: 12px;
  padding: 10px 14px;
  color: #94a3b8;
}
.psb-search input {
  border: none;
  background: none;
  outline: none;
  flex: 1;
  font-size: 0.88rem;
  color: #334155;
}
.psb-cat-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.psb-cat-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.88rem;
  color: #334155;
}
.psb-cat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.psb-recent {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.psb-recent-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
}
.psb-recent-img {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}
.psb-recent-title {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}
.psb-recent-date {
  display: block;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 2px;
}
.psb-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.psb-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(128,186,73,0.10);
  color: #3f6458;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid rgba(128,186,73,0.15);
}
.psb-empty {
  font-size: 0.82rem;
  color: #94a3b8;
  font-style: italic;
}
</style>
