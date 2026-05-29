<template>
  <div :data-testid="`article-list-block-${block.id}`" :style="computedStyles" class="article-list-block container">
    <!-- GRID Layout -->
    <div v-if="filteredPosts.length > 0 && isGrid" class="row" :class="gridClass">
      <div v-for="post in limitedPosts" :key="post._id || post.id" class="col">
        <router-link v-if="!editing" :to="`/blog/${post.slug}`" class="text-decoration-none d-block h-100">
          <article class="al-card al-card--grid h-100" :style="cardContainerStyle">
            <div v-if="content.showImage !== false && post.featuredImage" class="al-card__img" :style="imageWrapStyle">
              <img :src="post.featuredImage" :alt="post.title" loading="lazy" />
              <span v-if="content.showCategory !== false && post.categories?.[0]"
                class="al-card__tag" :class="tagClass"
                :style="{ backgroundColor: post.categories[0].color || cs.buttonColor }">
                {{ post.categories[0].name }}
              </span>
            </div>
            <div class="al-card__body">
              <small v-if="content.showDate !== false" class="al-card__date" :style="{ color: cs.dateColor }">
                {{ formatDate(post.publishedAt) }}
              </small>
              <h5 class="al-card__title" :style="{ color: cs.titleColor, fontSize: cs.titleSize }">{{ post.title }}</h5>
              <p v-if="content.showExcerpt !== false" class="al-card__excerpt" :style="{ color: cs.excerptColor }">{{ post.excerpt }}</p>
              <span v-if="content.showButton !== false" class="al-card__link" :style="{ color: cs.buttonColor }">
                {{ content.buttonText || 'Leer mas' }} <i class="fas fa-arrow-right ms-1"></i>
              </span>
            </div>
          </article>
        </router-link>
        <article v-else class="al-card al-card--grid h-100" :style="cardContainerStyle">
          <div v-if="content.showImage !== false && post.featuredImage" class="al-card__img" :style="imageWrapStyle">
            <img :src="post.featuredImage" :alt="post.title" loading="lazy" />
            <span v-if="content.showCategory !== false && post.categories?.[0]"
              class="al-card__tag" :class="tagClass"
              :style="{ backgroundColor: post.categories[0].color || cs.buttonColor }">
              {{ post.categories[0].name }}
            </span>
          </div>
          <div class="al-card__body">
            <small v-if="content.showDate !== false" class="al-card__date" :style="{ color: cs.dateColor }">
              {{ formatDate(post.publishedAt) }}
            </small>
            <h5 class="al-card__title" :style="{ color: cs.titleColor, fontSize: cs.titleSize }">{{ post.title }}</h5>
            <p v-if="content.showExcerpt !== false" class="al-card__excerpt" :style="{ color: cs.excerptColor }">{{ post.excerpt }}</p>
            <span v-if="content.showButton !== false" class="al-card__link" :style="{ color: cs.buttonColor }">
              {{ content.buttonText || 'Leer mas' }} <i class="fas fa-arrow-right ms-1"></i>2
            </span>
          </div>
        </article>
      </div>
    </div>

    <!-- LIST Layout -->
    <div v-else-if="filteredPosts.length > 0 && !isGrid" class="al-list-stack">
      <template v-for="post in limitedPosts" :key="post._id || post.id">
        <router-link v-if="!editing" :to="`/blog/${post.slug}`" class="text-decoration-none d-block">
          <article class="al-card al-card--list" :style="cardContainerStyle">
            <div v-if="content.showImage !== false && post.featuredImage" class="al-card--list__img" :style="listImageStyle">
              <img :src="post.featuredImage" :alt="post.title" loading="lazy" />
              <span v-if="content.showCategory !== false && post.categories?.[0]"
                class="al-card__tag" :class="tagClass"
                :style="{ backgroundColor: post.categories[0].color || cs.buttonColor }">
                {{ post.categories[0].name }}
              </span>
            </div>
            <div class="al-card--list__body">
              <small v-if="content.showDate !== false" class="al-card__date" :style="{ color: cs.dateColor }">
                {{ formatDate(post.publishedAt) }}
              </small>
              <h5 class="al-card__title" :style="{ color: cs.titleColor, fontSize: cs.titleSize }">{{ post.title }}</h5>
              <p v-if="content.showExcerpt !== false" class="al-card__excerpt al-card__excerpt--list" :style="{ color: cs.excerptColor }">{{ post.excerpt }}</p>
              <span v-if="content.showButton !== false" class="al-card__link" :style="{ color: cs.buttonColor }">
                {{ content.buttonText || 'Leer mas' }} <i class="fas fa-arrow-right ms-1"></i>
              </span>
            </div>
          </article>
        </router-link>
        <article v-else class="al-card al-card--list" :style="cardContainerStyle">
          <div v-if="content.showImage !== false && post.featuredImage" class="al-card--list__img" :style="listImageStyle">
            <img :src="post.featuredImage" :alt="post.title" loading="lazy" />
            <span v-if="content.showCategory !== false && post.categories?.[0]"
              class="al-card__tag" :class="tagClass"
              :style="{ backgroundColor: post.categories[0].color || cs.buttonColor }">
              {{ post.categories[0].name }}
            </span>
          </div>
          <div class="al-card--list__body">
            <small v-if="content.showDate !== false" class="al-card__date" :style="{ color: cs.dateColor }">
              {{ formatDate(post.publishedAt) }}
            </small>
            <h5 class="al-card__title" :style="{ color: cs.titleColor, fontSize: cs.titleSize }">{{ post.title }}</h5>
            <p v-if="content.showExcerpt !== false" class="al-card__excerpt al-card__excerpt--list" :style="{ color: cs.excerptColor }">{{ post.excerpt }}</p>
            <span v-if="content.showButton !== false" class="al-card__link" :style="{ color: cs.buttonColor }">
              {{ content.buttonText || 'Leer mas' }} <i class="fas fa-arrow-right ms-1"></i>
            </span>
          </div>
        </article>
      </template>
    </div>

    <div v-else class="empty-articles">
      <i class="fas fa-newspaper"></i>
      <p>No hay articulos disponibles</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useCmsStore } from '@/stores/cms.js'
import { normalizePostList } from '@/utils/normalizers.js'
import { isPublicBlogPost } from '@/utils/blog.js'

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('es-PA', { year: 'numeric', month: 'long', day: 'numeric' })
}

const props = defineProps({
  block: { type: Object, required: true },
  editing: { type: Boolean, default: false }
})

const cmsStore = useCmsStore()
const content = computed(() => props.block.content || {})
const computedStyles = computed(() => ({ ...props.block.styles }))

const postsData = ref([])

const cs = computed(() => ({
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  shadow: 'medium',
  titleColor: '#0f172a',
  titleSize: '1.05rem',
  excerptColor: '#475569',
  dateColor: '#64748b',
  buttonColor: '#80ba49',
  tagStyle: 'pill',
  imageHeight: 'auto',
  cardBorder: 'rgba(15,23,42,0.06)',
  ...content.value.cardStyle
}))

const isGrid = computed(() => content.value.layout !== 'list')

const gridClass = computed(() => {
  const cols = content.value.columns || 3
  return `row-cols-1 row-cols-md-2 row-cols-lg-${cols} g-4`
})

const shadowMap = {
  none: 'none',
  light: '0 4px 15px rgba(15,23,42,0.04)',
  medium: '0 8px 30px rgba(15,23,42,0.06)',
  strong: '0 16px 50px rgba(15,23,42,0.12)'
}

const cardContainerStyle = computed(() => ({
  background: cs.value.backgroundColor,
  borderRadius: cs.value.borderRadius,
  border: `1px solid ${cs.value.cardBorder}`,
  boxShadow: shadowMap[cs.value.shadow] || shadowMap.medium
}))

const imageWrapStyle = computed(() => ({
  aspectRatio: content.value.imageAspectRatio || '16/10'
}))

const listImageStyle = computed(() => ({
  aspectRatio: content.value.imageAspectRatio || '16/10'
}))

const tagClass = computed(() => {
  return cs.value.tagStyle === 'square' ? 'al-card__tag--square' : ''
})

const availablePosts = computed(() => {
  if (props.editing && cmsStore.posts?.length) return cmsStore.posts
  if (postsData.value?.length) return postsData.value
  return cmsStore.posts || []
})

const filteredPosts = computed(() => {
  let posts = availablePosts.value || []
  if (content.value.categoryFilter) {
    posts = posts.filter(p =>
      p.categories?.some(c =>
        (typeof c === 'object' ? c._id : c) === content.value.categoryFilter
      )
    )
  }
  return posts.filter(isPublicBlogPost)
})

const limitedPosts = computed(() => {
  const limit = content.value.limit || 6
  return filteredPosts.value.slice(0, limit)
})

onMounted(async () => {
  if (!availablePosts.value.length) {
    await cmsStore.fetchPosts()
  }
})
</script>

<style scoped>
/* ===== SHARED ===== */
.al-card {
  overflow: hidden;
  transition: transform 0.25s, box-shadow 0.25s;
}
.al-card:hover {
  transform: translateY(-4px);
}
.al-card__tag {
  position: absolute;
  top: 12px;
  left: 12px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
  z-index: 1;
}
.al-card__tag--square {
  border-radius: 6px;
}
.al-card__date {
  display: block;
  font-size: 0.82rem;
  margin-bottom: 6px;
}
.al-card__title {
  font-weight: 800;
  line-height: 1.35;
  margin-bottom: 8px;
}
.al-card__excerpt {
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.al-card__link {
  font-weight: 700;
  font-size: 0.88rem;
  display: inline-flex;
  align-items: center;
}

/* ===== GRID CARD ===== */
.al-card--grid .al-card__img {
  position: relative;
  overflow: hidden;
}
.al-card--grid .al-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.al-card--grid:hover .al-card__img img {
  transform: scale(1.03);
}
.al-card--grid .al-card__body {
  padding: 18px;
}

/* ===== LIST CARD ===== */
.al-list-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.al-card--list {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.al-card--list__img {
  position: relative;
  width: 280px;
  min-width: 280px;
  overflow: hidden;
  flex-shrink: 0;
}
.al-card--list__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.al-card--list:hover .al-card--list__img img {
  transform: scale(1.03);
}
.al-card--list__body {
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
}
.al-card__excerpt--list {
  -webkit-line-clamp: 3;
}

/* ===== EMPTY ===== */
.empty-articles {
  text-align: center;
  padding: 40px 20px;
  color: #94a3b8;
}
.empty-articles i {
  font-size: 2rem;
  margin-bottom: 12px;
  display: block;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 767.98px) {
  .al-card--list {
    flex-direction: column;
  }
  .al-card--list__img {
    width: 100%;
    min-width: 100%;
    aspect-ratio: 16/10;
  }
}
</style>
