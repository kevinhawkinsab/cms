<template>
  <section
    class="blog-preview"
    :data-testid="`blog-preview-${block.id}`"
    :style="block.styles"
  >
    <div class="bp-header">
      <div class="bp-header-text">
        <p v-if="content.eyebrow || editing" class="bp-eyebrow">
          {{ content.eyebrow || (editing ? 'NUESTRO BLOG' : '') }}
        </p>
        <h2 class="bp-title">{{ content.title || (editing ? 'Últimas publicaciones' : '') }}</h2>
        <p v-if="content.subtitle || editing" class="bp-subtitle">
          {{ content.subtitle || (editing ? 'Subtítulo opcional de la sección' : '') }}
        </p>
      </div>
      <a v-if="content.ctaUrl && content.ctaText" :href="content.ctaUrl" class="bp-cta">
        {{ content.ctaText }} →
      </a>
    </div>

    <div class="bp-grid" :class="`bp-grid--${content.columns || 3}`">
      <div
        v-for="(post, i) in (content.posts || [])"
        :key="i"
        class="bp-card"
      >
        <div class="bp-card-img-wrap">
          <img
            v-if="post.image"
            :src="post.image"
            :alt="post.imageAlt || post.title"
            class="bp-card-img"
            loading="lazy"
          />
          <div v-else class="bp-card-img-placeholder">
            <i class="fas fa-image"></i>
          </div>
          <span v-if="post.category" class="bp-card-category">{{ post.category }}</span>
        </div>
        <div class="bp-card-body">
          <p v-if="post.date" class="bp-card-date">{{ post.date }}</p>
          <h3 class="bp-card-title">{{ post.title || (editing ? 'Título del artículo' : '') }}</h3>
          <p v-if="post.excerpt" class="bp-card-excerpt">{{ post.excerpt }}</p>
          <a v-if="post.url || editing" :href="post.url || '#'" class="bp-card-link">
            Leer más →
          </a>
        </div>
      </div>

      <!-- Placeholder cards in edit mode -->
      <template v-if="editing && (!content.posts || content.posts.length === 0)">
        <div v-for="i in (content.columns || 3)" :key="`ph-${i}`" class="bp-card bp-card--placeholder">
          <div class="bp-card-img-placeholder"><i class="fas fa-image"></i></div>
          <div class="bp-card-body">
            <p class="bp-card-date">01 Ene 2025</p>
            <h3 class="bp-card-title">Título del artículo {{ i }}</h3>
            <p class="bp-card-excerpt">Resumen breve del contenido del artículo...</p>
            <span class="bp-card-link">Leer más →</span>
          </div>
        </div>
      </template>
    </div>
  </section>
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
.blog-preview { padding: 56px 0; }
.bp-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}
.bp-eyebrow {
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; color: #64748b; margin: 0 0 8px;
}
.bp-title { font-size: 1.9rem; font-weight: 800; color: #1e2022; margin: 0 0 8px; }
.bp-subtitle { font-size: 0.95rem; color: #64748b; margin: 0; max-width: 520px; }
.bp-cta {
  white-space: nowrap; font-size: 0.875rem; font-weight: 600;
  color: #3f6458; text-decoration: none; padding: 8px 18px;
  border: 1.5px solid #3f6458; border-radius: 8px; transition: all 0.15s;
}
.bp-cta:hover { background: #3f6458; color: #fff; }

.bp-grid { display: grid; gap: 24px; }
.bp-grid--2 { grid-template-columns: repeat(2, 1fr); }
.bp-grid--3 { grid-template-columns: repeat(3, 1fr); }
.bp-grid--4 { grid-template-columns: repeat(4, 1fr); }

.bp-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.07); transition: box-shadow 0.2s; }
.bp-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.10); }
.bp-card--placeholder { opacity: 0.4; }
.bp-card-img-wrap { position: relative; overflow: hidden; aspect-ratio: 16/9; }
.bp-card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bp-card-img-placeholder {
  width: 100%; height: 100%; background: #f1f5f9;
  display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 2rem;
}
.bp-card-category {
  position: absolute; top: 12px; left: 12px;
  background: #3f6458; color: #fff;
  font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em;
  text-transform: uppercase; padding: 3px 10px; border-radius: 20px;
}
.bp-card-body { padding: 20px; display: flex; flex-direction: column; gap: 6px; }
.bp-card-date { font-size: 0.75rem; color: #94a3b8; margin: 0; }
.bp-card-title { font-size: 1rem; font-weight: 700; color: #1e2022; margin: 0; line-height: 1.35; }
.bp-card-excerpt { font-size: 0.85rem; color: #64748b; line-height: 1.6; margin: 4px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.bp-card-link { font-size: 0.82rem; font-weight: 600; color: #3f6458; text-decoration: none; margin-top: 4px; }

@media (max-width: 900px) { .bp-grid--3, .bp-grid--4 { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .bp-grid { grid-template-columns: 1fr; } }
</style>
