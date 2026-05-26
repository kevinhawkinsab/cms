<template>
  <div class="filters-bar card">
    <div class="filters-left">
      <!-- Search -->
      <div class="search-wrapper">
        <span class="search-icon">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input v-model="search" class="form-input search-input" placeholder="Buscar publicaciones…" @input="emitChange" />
      </div>

      <!-- Category -->
      <select v-model="category" class="form-input filter-select" @change="emitChange">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categoriesStore.items" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>

      <!-- Status pills -->
      <div class="pill-group">
        <button
          v-for="s in statuses"
          :key="s.value"
          class="pill-tab"
          :class="{ active: status === s.value }"
          @click="setStatus(s.value)"
        >{{ s.label }}</button>
      </div>
    </div>

    <div class="filters-right">
      <label class="per-page-label">Por página:</label>
      <select v-model="perPage" class="form-input filter-select-sm" @change="emitChange">
        <option value="6">6</option>
        <option value="12">12</option>
        <option value="24">24</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['change'])
const companyStore = useCompanyStore()
const categoriesStore = useCategoriesStore()

const search = ref('')
const category = ref('')
const status = ref('all')
const perPage = ref('12')

const statuses = [
  { value: 'all', label: 'Todas' },
  { value: 'published', label: 'Publicadas' },
  { value: 'hidden', label: 'Ocultas' },
]

onMounted(() => {
  if (companyStore.activeId) categoriesStore.fetch(companyStore.activeId)
})

function setStatus(val) { status.value = val; emitChange() }

function emitChange() {
  emit('change', {
    search: search.value,
    category: category.value,
    status: status.value,
    perPage: Number(perPage.value),
  })
}
</script>

<style scoped>
.filters-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0.75rem 1rem;
  flex-wrap: wrap;
}
.filters-left { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; flex: 1; }
.filters-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.search-wrapper { position: relative; }
.search-icon { position: absolute; left: 0.65rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted); display: flex; align-items: center; pointer-events: none; }
.search-input { padding-left: 2.2rem; width: 220px; }

.filter-select { width: auto; min-width: 150px; }
.filter-select-sm { width: auto; min-width: 70px; font-size: var(--text-xs); padding: 0.35rem 0.65rem; }

.pill-group { display: flex; gap: 4px; }

.per-page-label { font-size: var(--text-xs); color: var(--color-text-muted); white-space: nowrap; }
</style>
