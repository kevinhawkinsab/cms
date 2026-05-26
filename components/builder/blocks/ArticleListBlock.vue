<template>
  <div class="article-list-block">
    <div class="articles-preview-grid">
      <div v-for="i in (block.content.count || 6)" :key="i" class="article-card-preview">
        <div class="article-thumb skeleton" />
        <div class="article-meta">
          <div class="skeleton" style="height:12px;width:60%;border-radius:4px;margin-bottom:6px" />
          <div class="skeleton" style="height:10px;width:90%;border-radius:4px;margin-bottom:4px" />
          <div class="skeleton" style="height:10px;width:75%;border-radius:4px" />
        </div>
      </div>
    </div>
    <div class="block-label">Lista de artículos · {{ block.content.count || 6 }} items{{ block.content.category ? ` · Categoría: ${block.content.category}` : '' }}</div>
  </div>
</template>

<script setup>
defineProps({ block: Object, editMode: Boolean })
</script>

<style scoped>
.article-list-block { padding: 0.75rem; }
.articles-preview-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.article-card-preview { border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
.article-thumb { height: 80px; background: var(--color-border); }
.article-meta { padding: 0.5rem; }
.block-label { margin-top: 8px; text-align: center; font-size: var(--text-xs); color: var(--color-text-muted); }
</style>
