<template>
  <div class="seo-view">

    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">SEO Manager</h1>
        <p class="page-header__desc">Optimiza la visibilidad del sitio en buscadores y redes sociales.</p>
      </div>
      <div class="page-header__actions">
        <button class="btn-ghost" @click="resetForm">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12.5 7A5.5 5.5 0 1 1 7 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12.5 1.5v5.5h-5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Restablecer
        </button>
        <button class="btn-primary" @click="saveSeo">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 6.5l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Guardar SEO
        </button>
      </div>
    </div>

    <!-- Main two-column layout -->
    <div class="seo-grid">

      <!-- LEFT: Form -->
      <div class="seo-form-col">

        <!-- Meta section -->
        <div class="form-card">
          <div class="form-card__header">
            <div class="form-card__icon blue">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/>
                <path d="M5 7h4M7 5v4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              </svg>
            </div>
            <h2 class="form-card__title">Meta Tags</h2>
          </div>

          <div class="form-body">
            <!-- Meta Title -->
            <div class="form-group">
              <div class="field-label-row">
                <label class="field-label">Meta Title</label>
                <span class="char-counter" :class="titleCounterClass">{{ form.metaTitle.length }}/70</span>
              </div>
              <input v-model="form.metaTitle" type="text" class="field-input" placeholder="Título en buscadores…" maxlength="100">
              <div class="char-bar">
                <div class="char-bar__fill" :class="titleCounterClass" :style="{ width: Math.min(100, (form.metaTitle.length / 70) * 100) + '%' }"></div>
              </div>
              <p class="field-hint">Óptimo: 50–60 caracteres. <span :class="titleCounterClass">{{ titleHint }}</span></p>
            </div>

            <!-- Meta Description -->
            <div class="form-group">
              <div class="field-label-row">
                <label class="field-label">Meta Description</label>
                <span class="char-counter" :class="descCounterClass">{{ form.metaDesc.length }}/200</span>
              </div>
              <textarea v-model="form.metaDesc" class="field-input field-textarea" rows="3" placeholder="Descripción que aparece en los resultados de búsqueda…" maxlength="250"></textarea>
              <div class="char-bar">
                <div class="char-bar__fill" :class="descCounterClass" :style="{ width: Math.min(100, (form.metaDesc.length / 200) * 100) + '%' }"></div>
              </div>
              <p class="field-hint">Óptimo: 120–160 caracteres. <span :class="descCounterClass">{{ descHint }}</span></p>
            </div>

            <!-- Focus keyword -->
            <div class="form-group">
              <label class="field-label">Palabra clave principal</label>
              <input v-model="form.focusKeyword" type="text" class="field-input" placeholder="Ej: sostenibilidad empresarial">
            </div>

            <!-- Canonical URL -->
            <div class="form-group">
              <label class="field-label">URL Canónica</label>
              <input v-model="form.canonicalUrl" type="url" class="field-input" placeholder="https://ejemplo.com/ruta">
            </div>
          </div>
        </div>

        <!-- Open Graph section -->
        <div class="form-card">
          <div class="form-card__header">
            <div class="form-card__icon purple">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1.5" y="2.5" width="11" height="9" rx="2" stroke="currentColor" stroke-width="1.3"/>
                <path d="M1.5 5.5h11" stroke="currentColor" stroke-width="1.2"/>
                <circle cx="4.5" cy="4" r="0.8" fill="currentColor"/>
              </svg>
            </div>
            <h2 class="form-card__title">Open Graph / Redes Sociales</h2>
          </div>

          <div class="form-body">
            <div class="form-group">
              <label class="field-label">OG Title</label>
              <input v-model="form.ogTitle" type="text" class="field-input" placeholder="Título para redes sociales…">
            </div>
            <div class="form-group">
              <label class="field-label">OG Description</label>
              <textarea v-model="form.ogDesc" class="field-input field-textarea" rows="2" placeholder="Descripción para redes sociales…"></textarea>
            </div>
            <div class="form-group">
              <label class="field-label">OG Image URL</label>
              <input v-model="form.ogImage" type="url" class="field-input" placeholder="https://ejemplo.com/imagen.jpg">
            </div>
          </div>
        </div>

        <!-- Technical section -->
        <div class="form-card">
          <div class="form-card__header">
            <div class="form-card__icon gray">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3.5L2.5 7 5 10.5M9 3.5L11.5 7 9 10.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h2 class="form-card__title">Configuración técnica</h2>
          </div>

          <div class="form-body">
            <div class="form-row-2">
              <div class="form-group">
                <label class="field-label">Robots</label>
                <select v-model="form.robots" class="field-input field-select">
                  <option value="index,follow">index / follow</option>
                  <option value="noindex,follow">noindex / follow</option>
                  <option value="index,nofollow">index / nofollow</option>
                  <option value="noindex,nofollow">noindex / nofollow</option>
                </select>
              </div>
              <div class="form-group">
                <label class="field-label">Schema Type</label>
                <select v-model="form.schemaType" class="field-input field-select">
                  <option value="Article">Article</option>
                  <option value="WebPage">WebPage</option>
                  <option value="Product">Product</option>
                  <option value="FAQ">FAQ</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="field-label">Prioridad Sitemap</label>
              <select v-model="form.sitemapPriority" class="field-input field-select">
                <option value="1.0">1.0 – Máxima</option>
                <option value="0.8">0.8 – Alta</option>
                <option value="0.5">0.5 – Media</option>
                <option value="0.3">0.3 – Baja</option>
                <option value="0.1">0.1 – Mínima</option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <!-- RIGHT: Previews + Score -->
      <div class="seo-preview-col">

        <!-- SEO Score -->
        <div class="preview-card">
          <h3 class="preview-card__title">Puntuación SEO</h3>
          <div class="score-row">
            <div class="score-circle">
              <svg viewBox="0 0 80 80" class="score-svg">
                <circle cx="40" cy="40" r="32" fill="none" stroke="var(--gray-100)" stroke-width="7"/>
                <circle
                  cx="40" cy="40" r="32" fill="none"
                  :stroke="scoreColor" stroke-width="7"
                  stroke-linecap="round"
                  :stroke-dasharray="`${seoScore * 2.01} 201`"
                  stroke-dashoffset="50"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div class="score-number">{{ seoScore }}</div>
            </div>
            <div class="score-checklist">
              <div v-for="check in seoChecklist" :key="check.label" class="check-item" :class="check.ok ? 'check-item--ok' : 'check-item--fail'">
                <div class="check-item__dot">
                  <svg v-if="check.ok" width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg v-else width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </div>
                <span class="check-item__label">{{ check.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Google SERP preview -->
        <div class="preview-card">
          <h3 class="preview-card__title">Vista previa Google</h3>
          <div class="serp-preview">
            <div class="serp-breadcrumb">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="vertical-align:middle"><circle cx="7" cy="7" r="5.5" stroke="#34a853" stroke-width="1.2"/><path d="M5 7h4M7 5v4" stroke="#34a853" stroke-width="1" stroke-linecap="round"/></svg>
              ejemplo.com &rsaquo; blog &rsaquo; articulo
            </div>
            <div class="serp-title">{{ form.metaTitle || 'Título del artículo en el buscador' }}</div>
            <div class="serp-desc">{{ form.metaDesc || 'La descripción del artículo aparecerá aquí. Añade una meta descripción para mejorar el CTR en los resultados de búsqueda.' }}</div>
          </div>
        </div>

        <!-- Facebook OG preview -->
        <div class="preview-card">
          <h3 class="preview-card__title">Vista previa Facebook</h3>
          <div class="og-preview">
            <div class="og-preview__image" :style="form.ogImage ? `background-image:url(${form.ogImage})` : ''">
              <svg v-if="!form.ogImage" width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="1" y="1" width="26" height="26" rx="3" stroke="#d1d5db" stroke-width="1.5"/>
                <circle cx="10" cy="10" r="3" stroke="#d1d5db" stroke-width="1.5"/>
                <path d="M1 19l7-6 5 5 4-4 10 9" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="og-preview__body">
              <div class="og-preview__domain">EJEMPLO.COM</div>
              <div class="og-preview__title">{{ form.ogTitle || form.metaTitle || 'Título del artículo' }}</div>
              <div class="og-preview__desc">{{ form.ogDesc || form.metaDesc || 'Descripción de la publicación para redes sociales.' }}</div>
            </div>
          </div>
        </div>

        <!-- Twitter card preview -->
        <div class="preview-card">
          <h3 class="preview-card__title">Vista previa Twitter / X</h3>
          <div class="twitter-preview">
            <div class="twitter-preview__image" :style="form.ogImage ? `background-image:url(${form.ogImage})` : ''">
              <svg v-if="!form.ogImage" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="1" y="1" width="22" height="22" rx="3" stroke="#d1d5db" stroke-width="1.5"/>
                <circle cx="9" cy="9" r="3" stroke="#d1d5db" stroke-width="1.5"/>
                <path d="M1 17l6-5 4 4 4-4 8 7" stroke="#d1d5db" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="twitter-preview__body">
              <div class="twitter-preview__title">{{ form.ogTitle || form.metaTitle || 'Título del artículo' }}</div>
              <div class="twitter-preview__desc">{{ form.ogDesc || form.metaDesc || 'Descripción para Twitter.' }}</div>
              <div class="twitter-preview__domain">ejemplo.com</div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Posts SEO table -->
    <div class="table-card">
      <div class="table-card__header">
        <h2 class="table-card__title">Publicaciones — Completitud SEO</h2>
        <span class="table-card__sub">{{ posts.length }} publicaciones</span>
      </div>
      <div class="table-wrap">
        <table class="posts-seo-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th class="th-center">Estado</th>
              <th>Completitud SEO</th>
              <th class="th-actions">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td class="td-title">
                <span class="post-title" :title="post.title">{{ post.title }}</span>
              </td>
              <td class="td-cat">
                <span class="cat-badge">{{ post.category }}</span>
              </td>
              <td class="td-center">
                <span class="status-pill" :class="postStatusClass(post.status)">{{ post.status }}</span>
              </td>
              <td>
                <div class="seo-progress-wrap">
                  <div class="seo-progress">
                    <div class="seo-progress__fill" :class="progressClass(post.seoScore)" :style="{ width: post.seoScore + '%' }"></div>
                  </div>
                  <span class="seo-progress__pct" :class="progressClass(post.seoScore)">{{ post.seoScore }}%</span>
                </div>
              </td>
              <td class="td-actions">
                <button class="action-btn action-btn--edit" @click="editPostSeo(post)">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8.5 1.5L10.5 3.5 3.5 10.5l-2 .5.5-2 7-7z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Editar SEO
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Form state ---
const form = ref({
  metaTitle: 'Innovación y sostenibilidad: claves para el futuro empresarial',
  metaDesc: 'Descubre cómo las empresas líderes están adoptando prácticas sostenibles e innovadoras para prosperar en el mercado global de 2026.',
  focusKeyword: 'sostenibilidad empresarial',
  canonicalUrl: 'https://ejemplo.com/blog/innovacion-sostenibilidad',
  ogTitle: 'Innovación y sostenibilidad empresarial 2026',
  ogDesc: 'Las empresas más exitosas combinan tecnología e impacto social. Conoce las estrategias que marcan la diferencia.',
  ogImage: '',
  robots: 'index,follow',
  schemaType: 'Article',
  sitemapPriority: '0.8'
})

const resetForm = () => {
  form.value = {
    metaTitle: '', metaDesc: '', focusKeyword: '',
    canonicalUrl: '', ogTitle: '', ogDesc: '', ogImage: '',
    robots: 'index,follow', schemaType: 'Article', sitemapPriority: '0.8'
  }
}

const saveSeo = () => {
  alert('Configuración SEO guardada correctamente.')
}

// --- Character counters ---
const titleCounterClass = computed(() => {
  const n = form.value.metaTitle.length
  if (n === 0) return 'counter--neutral'
  if (n >= 50 && n <= 60) return 'counter--good'
  if (n > 60 && n <= 70) return 'counter--warn'
  return 'counter--bad'
})

const descCounterClass = computed(() => {
  const n = form.value.metaDesc.length
  if (n === 0) return 'counter--neutral'
  if (n >= 120 && n <= 160) return 'counter--good'
  if (n > 160 && n <= 200) return 'counter--warn'
  return 'counter--bad'
})

const titleHint = computed(() => {
  const n = form.value.metaTitle.length
  if (n === 0) return 'Sin título'
  if (n < 50) return `${50 - n} caracteres más recomendados`
  if (n <= 60) return 'Longitud óptima'
  if (n <= 70) return 'Aceptable, puede truncarse'
  return 'Demasiado largo, se truncará'
})

const descHint = computed(() => {
  const n = form.value.metaDesc.length
  if (n === 0) return 'Sin descripción'
  if (n < 120) return `${120 - n} caracteres más recomendados`
  if (n <= 160) return 'Longitud óptima'
  if (n <= 200) return 'Aceptable, puede truncarse'
  return 'Demasiado larga'
})

// --- SEO Score ---
const seoChecklist = computed(() => [
  { label: 'Meta title configurado',              ok: form.value.metaTitle.length > 0 },
  { label: 'Longitud de title óptima (50–60)',    ok: form.value.metaTitle.length >= 50 && form.value.metaTitle.length <= 60 },
  { label: 'Meta description configurada',        ok: form.value.metaDesc.length > 0 },
  { label: 'Descripción en rango óptimo',         ok: form.value.metaDesc.length >= 120 && form.value.metaDesc.length <= 160 },
  { label: 'Palabra clave definida',              ok: form.value.focusKeyword.length > 0 },
  { label: 'Keyword presente en title',           ok: form.value.focusKeyword.length > 0 && form.value.metaTitle.toLowerCase().includes(form.value.focusKeyword.toLowerCase()) },
  { label: 'URL canónica establecida',            ok: form.value.canonicalUrl.length > 0 },
  { label: 'OG Image configurada',                ok: form.value.ogImage.length > 0 },
  { label: 'Robots: index/follow',                ok: form.value.robots === 'index,follow' },
  { label: 'Schema Type definido',                ok: !!form.value.schemaType }
])

const seoScore = computed(() => {
  const ok = seoChecklist.value.filter(c => c.ok).length
  return Math.round((ok / seoChecklist.value.length) * 100)
})

const scoreColor = computed(() => {
  if (seoScore.value >= 80) return '#16a34a'
  if (seoScore.value >= 50) return '#d97706'
  return '#dc2626'
})

// --- Mock posts ---
const posts = ref([
  { id: 1,  title: 'Innovación y sostenibilidad: claves para el futuro empresarial', category: 'Tecnología',     status: 'Publicado', seoScore: 92 },
  { id: 2,  title: 'Resultados Q1 2026: crecimiento sostenido en todos los mercados', category: 'Finanzas',       status: 'Publicado', seoScore: 78 },
  { id: 3,  title: 'Lanzamiento de nuestro nuevo producto estrella',                  category: 'Productos',      status: 'Publicado', seoScore: 65 },
  { id: 4,  title: 'Premios excelencia 2025: reconocimientos del sector',             category: 'Noticias',       status: 'Publicado', seoScore: 55 },
  { id: 5,  title: 'Estrategia digital para pymes en 2026',                          category: 'Estrategia',     status: 'Borrador',  seoScore: 40 },
  { id: 6,  title: 'Tendencias Q2: lo que viene en tecnología',                      category: 'Tecnología',     status: 'Borrador',  seoScore: 30 },
  { id: 7,  title: 'Resumen mensual mayo 2026',                                      category: 'Noticias',       status: 'Revisión',  seoScore: 15 },
  { id: 8,  title: 'Informe de sostenibilidad 2025',                                 category: 'Sostenibilidad', status: 'Publicado', seoScore: 88 },
])

const editPostSeo = (post) => {
  form.value.metaTitle = post.title
  form.value.metaDesc = `Conoce los detalles sobre: ${post.title}. Artículo completo en nuestro blog.`
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// --- Helpers ---
const progressClass = (score) => {
  if (score >= 80) return 'progress--good'
  if (score >= 50) return 'progress--warn'
  return 'progress--bad'
}

const postStatusClass = (status) => {
  if (status === 'Publicado') return 'status-pill--ok'
  if (status === 'Revisión') return 'status-pill--review'
  return 'status-pill--draft'
}
</script>

<style scoped>
.seo-view {
  padding: 32px 28px;
  max-width: 1400px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

/* Page header */
.page-header { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.page-header__title { font-size: 22px; font-weight: 650; letter-spacing: -0.4px; color: var(--gray-900); margin: 0 0 5px; }
.page-header__desc { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; }

/* SEO grid */
.seo-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 20px;
  align-items: start;
  margin-bottom: 24px;
}

/* Form column */
.seo-form-col { display: flex; flex-direction: column; gap: 16px; }

/* Form card */
.form-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.form-card__header {
  display: flex; align-items: center; gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--gray-100);
  background: var(--gray-50);
}
.form-card__icon {
  width: 30px; height: 30px; border-radius: 7px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.form-card__icon.blue   { background: #eff6ff; color: #2563eb; }
.form-card__icon.purple { background: #f5f3ff; color: #7c3aed; }
.form-card__icon.gray   { background: var(--gray-100); color: var(--gray-600); }
.form-card__title { font-size: 13.5px; font-weight: 650; color: var(--gray-900); margin: 0; }

.form-body { padding: 18px; display: flex; flex-direction: column; gap: 16px; }

/* Form elements */
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.field-label-row { display: flex; align-items: center; justify-content: space-between; }
.field-label { font-size: 12px; font-weight: 600; color: var(--gray-700); }
.field-textarea { resize: vertical; min-height: 72px; }
.field-select { cursor: pointer; }

.char-counter { font-size: 11.5px; font-weight: 600; }
.counter--neutral { color: var(--gray-400); }
.counter--good    { color: #16a34a; }
.counter--warn    { color: #d97706; }
.counter--bad     { color: #dc2626; }

.char-bar {
  height: 3px; background: var(--gray-100); border-radius: 99px; overflow: hidden;
}
.char-bar__fill { height: 100%; border-radius: 99px; transition: width 0.2s; }
.char-bar__fill.counter--good { background: #16a34a; }
.char-bar__fill.counter--warn { background: #d97706; }
.char-bar__fill.counter--bad  { background: #dc2626; }
.char-bar__fill.counter--neutral { background: var(--gray-300); }

.field-hint { font-size: 11.5px; color: var(--gray-400); margin: 0; }

/* Preview column */
.seo-preview-col { display: flex; flex-direction: column; gap: 16px; position: sticky; top: 16px; }

/* Preview card */
.preview-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  padding: 16px;
}
.preview-card__title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: var(--gray-500); margin: 0 0 12px; }

/* Google SERP */
.serp-preview { padding: 12px; background: #fff; font-family: Arial, sans-serif; }
.serp-breadcrumb { font-size: 12px; color: #0f9d58; margin-bottom: 3px; }
.serp-title { font-size: 17px; color: #1a0dab; margin-bottom: 3px; font-weight: 400; line-height: 1.35; cursor: pointer; }
.serp-title:hover { text-decoration: underline; }
.serp-desc { font-size: 13px; color: #4d5156; line-height: 1.55; }

/* OG preview */
.og-preview { border: 1px solid var(--gray-200); border-radius: 8px; overflow: hidden; }
.og-preview__image {
  height: 140px; background: var(--gray-100);
  display: flex; align-items: center; justify-content: center;
  background-size: cover; background-position: center;
}
.og-preview__body { padding: 12px 14px; background: #f0f2f5; }
.og-preview__domain { font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--gray-500); margin-bottom: 3px; }
.og-preview__title { font-size: 14px; font-weight: 700; color: var(--gray-900); margin-bottom: 4px; line-height: 1.3; }
.og-preview__desc { font-size: 12.5px; color: var(--gray-600); line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

/* Twitter preview */
.twitter-preview { border: 1px solid var(--gray-200); border-radius: 12px; overflow: hidden; }
.twitter-preview__image {
  height: 120px; background: var(--gray-100);
  display: flex; align-items: center; justify-content: center;
  background-size: cover; background-position: center;
}
.twitter-preview__body { padding: 10px 14px; }
.twitter-preview__title { font-size: 13.5px; font-weight: 700; color: var(--gray-900); margin-bottom: 3px; }
.twitter-preview__desc { font-size: 12.5px; color: var(--gray-600); margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.twitter-preview__domain { font-size: 12px; color: var(--gray-400); }

/* SEO Score */
.score-row { display: flex; align-items: flex-start; gap: 16px; }
.score-circle { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
.score-svg { width: 80px; height: 80px; }
.score-number {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  font-size: 18px; font-weight: 800; color: var(--gray-900);
}

.score-checklist { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.check-item { display: flex; align-items: center; gap: 7px; }
.check-item__dot {
  width: 16px; height: 16px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.check-item--ok .check-item__dot { background: #dcfce7; color: #16a34a; }
.check-item--fail .check-item__dot { background: #fee2e2; color: #dc2626; }
.check-item__label { font-size: 12px; color: var(--gray-700); }
.check-item--fail .check-item__label { color: var(--gray-400); }

/* Posts SEO table */
.table-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.table-card__header {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-100);
}
.table-card__title { font-size: 14px; font-weight: 650; color: var(--gray-900); margin: 0; }
.table-card__sub { font-size: 12px; color: var(--gray-400); font-weight: 500; }

.table-wrap { overflow-x: auto; }
.posts-seo-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.posts-seo-table th {
  padding: 10px 16px;
  text-align: left;
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em;
  color: var(--gray-500); background: var(--gray-50);
  border-bottom: 1px solid var(--gray-100); white-space: nowrap;
}
.posts-seo-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--gray-50);
  vertical-align: middle;
}
.posts-seo-table tbody tr:hover td { background: var(--gray-50); }
.posts-seo-table tbody tr:last-child td { border-bottom: none; }
.th-center, .td-center { text-align: center; }
.th-actions, .td-actions { text-align: right; }

.td-title { max-width: 280px; }
.post-title { font-weight: 500; color: var(--gray-900); display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.cat-badge {
  display: inline-flex; padding: 2px 8px; border-radius: 20px;
  background: #eff6ff; color: #2563eb;
  font-size: 11.5px; font-weight: 600;
}

/* Progress bar */
.seo-progress-wrap { display: flex; align-items: center; gap: 10px; }
.seo-progress { flex: 1; height: 6px; background: var(--gray-100); border-radius: 99px; overflow: hidden; }
.seo-progress__fill { height: 100%; border-radius: 99px; transition: width 0.3s; }
.seo-progress__fill.progress--good { background: #16a34a; }
.seo-progress__fill.progress--warn { background: #d97706; }
.seo-progress__fill.progress--bad  { background: #dc2626; }
.seo-progress__pct { font-size: 12px; font-weight: 700; min-width: 34px; text-align: right; }
.seo-progress__pct.progress--good { color: #16a34a; }
.seo-progress__pct.progress--warn { color: #d97706; }
.seo-progress__pct.progress--bad  { color: #dc2626; }

/* Status pills */
.status-pill {
  display: inline-flex; padding: 2px 8px; border-radius: 20px;
  font-size: 11.5px; font-weight: 600;
}
.status-pill--ok     { background: #dcfce7; color: #15803d; }
.status-pill--review { background: #fef3c7; color: #92400e; }
.status-pill--draft  { background: var(--gray-100); color: var(--gray-600); }

/* Action buttons */
.action-btn {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 10px; border-radius: 6px; border: 1px solid transparent;
  font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.13s;
  font-family: var(--font-sans);
}
.action-btn--edit { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
.action-btn--edit:hover { background: #dbeafe; }

/* Buttons */
.btn-primary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 15px; background: #2563eb; color: #fff;
  border: none; border-radius: 8px; font-size: 13px;
  font-weight: 550; cursor: pointer; transition: background 0.15s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-primary:hover { background: #1d4ed8; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; background: transparent; color: var(--gray-600);
  border: 1px solid var(--gray-200); border-radius: 8px;
  font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.15s;
  font-family: var(--font-sans); white-space: nowrap;
}
.btn-ghost:hover { background: var(--gray-50); border-color: var(--gray-300); color: var(--gray-900); }

@media (max-width: 1100px) {
  .seo-grid { grid-template-columns: 1fr; }
  .seo-preview-col { position: static; }
}
</style>
