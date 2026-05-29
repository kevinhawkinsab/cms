<template>
  <div :data-testid="`post-tags-block-${block.id}`" :style="computedStyles" class="post-tags-block container"
    :class="`pt-align-${content.align || 'left'}`">
    <div class="mb-3">
      <h5 class="mb-1 fw-bold">Etiquetas</h5>
      <p class="text-muted mb-0">Temas relacionados con esta publicación</p>
    </div>

    <div class="pt-tags-wrap">
      <span v-for="(tag, i) in content.tags" :key="i" class="pt-tag" :class="tagClass">
        <i class="fas fa-hashtag me-1"></i>{{ tag }}
      </span>

      <span v-if="!content.tags?.length" class="pt-empty">Sin etiquetas</span>
    </div>

    <div class="share-card mt-5">
      <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
        <div>
          <h6 class="mb-1">Compartir artículo</h6>
          <p class="text-muted mb-0">Lleva esta publicación a tus canales favoritos</p>
        </div>

        <div class="d-flex flex-wrap gap-2">
          <a :href="facebookShareUrl" target="_blank" rel="noopener noreferrer" class="btn btn-share btn-facebook"
            aria-label="Compartir en Facebook">
            <i class="fab fa-facebook-f me-2"></i>Facebook
          </a>
          <a :href="twitterShareUrl" target="_blank" rel="noopener noreferrer" class="btn btn-share btn-twitter"
            aria-label="Compartir en Twitter">
            <i class="fab fa-twitter me-2"></i>X / Twitter
          </a>
          <a :href="whatsappShareUrl" target="_blank" rel="noopener noreferrer" class="btn btn-share btn-whatsapp"
            aria-label="Compartir en WhatsApp">
            <i class="fab fa-whatsapp me-2"></i>WhatsApp
          </a>
          <a :href="emailShareUrl" class="btn btn-share btn-mail"
            aria-label="Compartir por email">
            <i class="far fa-envelope me-2"></i>Email
          </a>
        </div>
      </div>
    </div>

    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mt-4">
      <router-link to="/blog" class="btn btn-bsw-outline article-back-btn">
        <i class="fas fa-arrow-left me-2"></i>Volver al Blog
      </router-link>
    </div>

    <div v-if="editing" class="pt-editor">
      <div class="d-flex gap-2 mt-3">
        <input type="text" class="form-control pt-input" v-model="newTag" placeholder="Nueva etiqueta..."
          @keydown.enter.prevent="addTag" />
        <button class="btn btn-sm pt-add-btn" @click="addTag" :disabled="!newTag.trim()">
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div v-if="content.tags?.length" class="pt-tag-list mt-2">
        <div v-for="(tag, i) in content.tags" :key="i" class="pt-tag-item">
          <span>{{ tag }}</span>
          <button class="pt-tag-remove" @click.stop="removeTag(i)">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  block: { type: Object, required: true },
  post: { type: Object, default: null },
  editing: { type: Boolean, default: false }
})

const emit = defineEmits(['update'])

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://www.bambitospringwater.com').replace(/\/$/, '')
const content = computed(() => props.block.content || {})
const computedStyles = computed(() => ({ ...props.block.styles }))
const newTag = ref('')

const tagClass = computed(() => {
  return content.value.style === 'square' ? 'pt-tag--square' : 'pt-tag--pill'
})

const postTitle = computed(() => props.post?.title || content.value?.post?.title || 'Artículo')
const postId = computed(() => props.post?.id || content.value?.post?.id || '')
const postSlug = computed(() => props.post?.slug || content.value?.post?.slug || '')

const shareUrl = computed(() => {
  const path = postSlug.value
    ? `/blog/${postSlug.value}`
    : postId.value
      ? `/blog/${postId.value}`
      : '/blog'

  return `${siteUrl}${path}`
})

const encodedShareUrl = computed(() => encodeURIComponent(shareUrl.value))
const encodedTitle = computed(() => encodeURIComponent(postTitle.value))

const facebookShareUrl = computed(
  () => `https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl.value}`
)

const twitterShareUrl = computed(
  () => `https://twitter.com/intent/tweet?url=${encodedShareUrl.value}&text=${encodedTitle.value}`
)

const whatsappShareUrl = computed(
  () => `https://wa.me/?text=${encodedShareUrl.value}`
)

const emailShareUrl = computed(
  () => `mailto:?subject=${encodedTitle.value}&body=${encodedShareUrl.value}`
)

function addTag() {
  const val = newTag.value.trim()
  if (!val) return

  const tags = [...(content.value.tags || []), val]
  emit('update', { tags })
  newTag.value = ''
}

function removeTag(index) {
  const tags = [...(content.value.tags || [])]
  tags.splice(index, 1)
  emit('update', { tags })
}
</script>

<style scoped>
.post-tags-block {
  width: 100%;
}

.pt-tags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pt-align-left .pt-tags-wrap {
  justify-content: flex-start;
}

.pt-align-center .pt-tags-wrap {
  justify-content: center;
}

.pt-align-right .pt-tags-wrap {
  justify-content: flex-end;
}

.pt-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  background: rgba(128, 186, 73, 0.1);
  color: #334155;
  font-size: 0.82rem;
  font-weight: 700;
  border: 1px solid rgba(128, 186, 73, 0.18);
  transition: background 0.2s, transform 0.15s;
}

.pt-tag:hover {
  background: rgba(128, 186, 73, 0.18);
  transform: translateY(-1px);
}

.pt-tag--pill {
  border-radius: 999px;
}

.pt-tag--square {
  border-radius: 8px;
}

.pt-empty {
  font-size: 0.85rem;
  color: #94a3b8;
  font-style: italic;
}

.share-card {
  padding: 18px;
  border-radius: 20px;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.share-card h6 {
  font-weight: 800;
  color: #0f172a;
}

.share-card p {
  font-size: 0.92rem;
}

.btn-share {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 10px 16px;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  white-space: nowrap;
}

.btn-share:hover {
  transform: translateY(-2px);
  color: #fff;
}

.btn-facebook {
  background: #1877f2;
}

.btn-twitter {
  background: #111827;
}

.btn-whatsapp {
  background: #25d366;
}

.btn-mail {
  background: #64748b;
}

.article-back-btn {
  border-radius: 999px;
  padding: 10px 18px;
  font-weight: 700;
}

.pt-editor {
  border-top: 1px dashed rgba(128, 186, 73, 0.2);
  padding-top: 8px;
  margin-top: 12px;
}

.pt-input {
  border-radius: 10px;
  border: 1px solid rgba(63, 100, 88, 0.12);
  font-size: 0.85rem;
  padding: 8px 12px;
}

.pt-input:focus {
  border-color: #80ba49;
  box-shadow: 0 0 0 3px rgba(128, 186, 73, 0.12);
}

.pt-add-btn {
  border-radius: 10px;
  background: #80ba49;
  color: #fff;
  border: none;
  width: 38px;
  flex-shrink: 0;
}

.pt-add-btn:disabled {
  opacity: 0.4;
}

.pt-tag-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.pt-tag-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  background: #f8fafc;
  border-radius: 8px;
  font-size: 0.82rem;
  color: #334155;
}

.pt-tag-remove {
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  font-size: 0.65rem;
  display: grid;
  place-items: center;
  cursor: pointer;
}

.pt-tag-remove:hover {
  background: rgba(239, 68, 68, 0.18);
}

@media (max-width: 768px) {
  .share-card {
    padding: 16px;
  }

  .btn-share {
    width: 100%;
  }
}
</style>
