<template>
  <div class="analytics-view">
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Analytics</h1>
        <p class="page-header__desc">Resumen de actividad y rendimiento del contenido</p>
      </div>
      <div class="page-header__actions">
        <select v-model="period" class="field-input" style="width:140px">
          <option value="7">Últimos 7 días</option>
          <option value="30">Últimos 30 días</option>
          <option value="90">Últimos 90 días</option>
        </select>
      </div>
    </div>

    <!-- KPI row -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue"><i class="fas fa-eye"></i></div>
        <div>
          <div class="stat-chip__value">{{ kpis.views.toLocaleString() }}</div>
          <div class="stat-chip__label">Vistas totales</div>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon green"><i class="fas fa-file-alt"></i></div>
        <div>
          <div class="stat-chip__value">{{ kpis.published }}</div>
          <div class="stat-chip__label">Publicados</div>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon" style="background:rgba(139,92,246,.12);color:#7c3aed"><i class="fas fa-users"></i></div>
        <div>
          <div class="stat-chip__value">{{ kpis.authors }}</div>
          <div class="stat-chip__label">Autores activos</div>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon" style="background:rgba(245,158,11,.12);color:#d97706"><i class="fas fa-clock"></i></div>
        <div>
          <div class="stat-chip__value">{{ kpis.avgReadTime }}m</div>
          <div class="stat-chip__label">Tiempo lectura avg</div>
        </div>
      </div>
    </div>

    <div class="analytics-grid">
      <!-- Bar chart: views over time -->
      <div class="analytics-card">
        <div class="analytics-card__header">
          <h3 class="analytics-card__title">Vistas por día</h3>
        </div>
        <div class="bar-chart">
          <div
            v-for="(day, i) in chartData"
            :key="i"
            class="bar-chart__col"
          >
            <div class="bar-chart__bar-wrap">
              <div
                class="bar-chart__bar"
                :style="{ height: (day.views / maxViews * 100) + '%' }"
                :title="day.views + ' vistas'"
              ></div>
            </div>
            <div class="bar-chart__label">{{ day.label }}</div>
          </div>
        </div>
      </div>

      <!-- Posts by category donut (CSS) -->
      <div class="analytics-card">
        <div class="analytics-card__header">
          <h3 class="analytics-card__title">Por categoría</h3>
        </div>
        <div class="donut-section">
          <div class="donut-visual">
            <svg viewBox="0 0 80 80" width="140" height="140">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#e2e8f0" stroke-width="12"/>
              <circle
                v-for="(seg, i) in donutSegments"
                :key="i"
                cx="40" cy="40" r="30"
                fill="none"
                :stroke="seg.color"
                stroke-width="12"
                :stroke-dasharray="`${seg.dash} ${188.5 - seg.dash}`"
                :stroke-dashoffset="seg.offset"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <div class="donut-center">
              <span class="donut-total">{{ categoryData.reduce((a,c)=>a+c.count,0) }}</span>
              <span class="donut-sublabel">posts</span>
            </div>
          </div>
          <ul class="donut-legend">
            <li v-for="(cat, i) in categoryData" :key="i" class="donut-legend__item">
              <span class="donut-legend__dot" :style="{ background: cat.color }"></span>
              <span class="donut-legend__name">{{ cat.name }}</span>
              <span class="donut-legend__count">{{ cat.count }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Top posts -->
      <div class="analytics-card">
        <div class="analytics-card__header">
          <h3 class="analytics-card__title">Top publicaciones</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Vistas</th>
              <th>Tiempo avg</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, i) in topPosts" :key="post.id" class="data-table__row">
              <td class="rank-cell">{{ i + 1 }}</td>
              <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{{ post.title }}</td>
              <td><strong>{{ post.views.toLocaleString() }}</strong></td>
              <td>{{ post.readTime }}m</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Team activity -->
      <div class="analytics-card">
        <div class="analytics-card__header">
          <h3 class="analytics-card__title">Actividad del equipo</h3>
        </div>
        <div class="team-activity">
          <div v-for="member in teamActivity" :key="member.name" class="team-activity__row">
            <div class="team-activity__avatar">{{ member.name.charAt(0) }}</div>
            <div class="team-activity__info">
              <div class="team-activity__name">{{ member.name }}</div>
              <div class="team-activity__sub">{{ member.role }}</div>
            </div>
            <div class="team-activity__stats">
              <span class="team-activity__badge">{{ member.posts }} posts</span>
              <span class="team-activity__badge gray">{{ member.edits }} ediciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const period = ref('30')

const kpis = computed(() => ({
  views: period.value === '7' ? 4821 : period.value === '30' ? 18340 : 52100,
  published: period.value === '7' ? 3 : period.value === '30' ? 14 : 41,
  authors: 5,
  avgReadTime: 4
}))

const days7 = [
  { label: 'Lu', views: 420 }, { label: 'Ma', views: 680 }, { label: 'Mi', views: 510 },
  { label: 'Ju', views: 890 }, { label: 'Vi', views: 1020 }, { label: 'Sá', views: 740 }, { label: 'Do', views: 561 }
]
const days30 = Array.from({ length: 10 }, (_, i) => ({ label: `S${i+1}`, views: 300 + Math.round(Math.random() * 1500) }))
const days90 = Array.from({ length: 9 }, (_, i) => ({ label: `M${i+1}`, views: 1200 + Math.round(Math.random() * 5000) }))

const chartData = computed(() => period.value === '7' ? days7 : period.value === '30' ? days30 : days90)
const maxViews = computed(() => Math.max(...chartData.value.map(d => d.views)) || 1)

const categoryData = [
  { name: 'Tecnología', count: 18, color: '#2563eb' },
  { name: 'Tutoriales', count: 12, color: '#16a34a' },
  { name: 'Noticias', count: 7, color: '#d97706' },
  { name: 'Otros', count: 4, color: '#94a3b8' },
]

const donutSegments = computed(() => {
  const total = categoryData.reduce((a, c) => a + c.count, 0)
  const circ = 188.5
  let offset = 0
  return categoryData.map(cat => {
    const dash = (cat.count / total) * circ
    const seg = { dash, offset: -offset, color: cat.color }
    offset += dash
    return seg
  })
})

const topPosts = [
  { id: 1, title: 'Guía completa de Vue 3', views: 4821, readTime: 7 },
  { id: 2, title: 'Primeros pasos con Pinia', views: 3210, readTime: 5 },
  { id: 3, title: 'Vite vs Webpack en 2025', views: 2890, readTime: 6 },
  { id: 4, title: 'CSS Custom Properties avanzado', views: 1943, readTime: 4 },
  { id: 5, title: 'Accesibilidad web: guía práctica', views: 1542, readTime: 8 },
]

const teamActivity = [
  { name: 'Ana García', role: 'Editora', posts: 6, edits: 14 },
  { name: 'Carlos López', role: 'Redactor', posts: 4, edits: 8 },
  { name: 'María Torres', role: 'Administradora', posts: 2, edits: 21 },
  { name: 'Javier Ruiz', role: 'Colaborador', posts: 2, edits: 3 },
]
</script>

<style scoped>
.analytics-view { padding: 0; }
.stats-row { display: flex; gap: 14px; flex-wrap: wrap; margin: 20px 0 24px; }

.analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 900px) { .analytics-grid { grid-template-columns: 1fr; } }

.analytics-card { background: #fff; border-radius: var(--radius-md); border: 1px solid var(--gray-200); padding: 20px; }
.analytics-card__header { margin-bottom: 16px; }
.analytics-card__title { font-size: .9rem; font-weight: 700; color: var(--gray-900); margin: 0; }

/* Bar chart */
.bar-chart { display: flex; align-items: flex-end; gap: 6px; height: 160px; padding-bottom: 24px; position: relative; }
.bar-chart__col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; }
.bar-chart__bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
.bar-chart__bar { width: 100%; background: linear-gradient(180deg, #2563eb, #60a5fa); border-radius: 4px 4px 0 0; min-height: 4px; transition: height .4s ease; }
.bar-chart__bar:hover { background: linear-gradient(180deg, #1d4ed8, #3b82f6); cursor: default; }
.bar-chart__label { font-size: .68rem; color: var(--gray-400); margin-top: 6px; }

/* Donut */
.donut-section { display: flex; align-items: center; gap: 20px; }
.donut-visual { position: relative; }
.donut-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.donut-total { font-size: 1.5rem; font-weight: 800; color: var(--gray-900); line-height: 1; }
.donut-sublabel { font-size: .7rem; color: var(--gray-400); }
.donut-legend { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.donut-legend__item { display: flex; align-items: center; gap: 8px; font-size: .82rem; }
.donut-legend__dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.donut-legend__name { flex: 1; color: var(--gray-700); }
.donut-legend__count { font-weight: 700; color: var(--gray-900); }

/* Table */
.data-table { width: 100%; border-collapse: collapse; font-size: .85rem; }
.data-table th { padding: 8px 12px; text-align: left; font-size: .72rem; font-weight: 600; color: var(--gray-500); text-transform: uppercase; letter-spacing: .04em; border-bottom: 1px solid var(--gray-200); }
.data-table td { padding: 10px 12px; border-bottom: 1px solid var(--gray-100); color: var(--gray-700); }
.data-table__row:last-child td { border-bottom: none; }
.rank-cell { font-weight: 700; color: var(--gray-400); width: 30px; }

/* Team activity */
.team-activity { display: flex; flex-direction: column; gap: 12px; }
.team-activity__row { display: flex; align-items: center; gap: 12px; }
.team-activity__avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--primary-700); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .9rem; flex-shrink: 0; }
.team-activity__info { flex: 1; }
.team-activity__name { font-weight: 600; font-size: .85rem; color: var(--gray-800); }
.team-activity__sub { font-size: .75rem; color: var(--gray-400); }
.team-activity__stats { display: flex; gap: 6px; }
.team-activity__badge { font-size: .72rem; padding: 2px 8px; border-radius: 20px; background: rgba(37,99,235,.1); color: var(--primary-700); font-weight: 600; }
.team-activity__badge.gray { background: var(--gray-100); color: var(--gray-500); }
</style>
