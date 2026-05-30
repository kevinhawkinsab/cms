<template>
  <div class="analytics-view">

    <!-- Page header -->
    <div class="page-header">
      <div>
        <h1 class="page-header__title">Analíticas</h1>
        <p class="page-header__desc">Métricas de publicación, actividad del equipo y rendimiento del contenido.</p>
      </div>
      <div class="page-header__actions">
        <!-- Date range selector -->
        <div class="range-tabs">
          <button
            v-for="r in ranges"
            :key="r.value"
            class="range-tab"
            :class="{ active: selectedRange === r.value }"
            @click="selectRange(r.value)"
          >{{ r.label }}</button>
          <button class="range-tab" :class="{ active: selectedRange === 'custom' }" @click="selectedRange = 'custom'">
            Personalizado
          </button>
        </div>
        <template v-if="selectedRange === 'custom'">
          <input v-model="customFrom" type="date" class="filter-date">
          <span class="date-sep">→</span>
          <input v-model="customTo" type="date" class="filter-date">
        </template>
      </div>
    </div>

    <!-- Stats row -->
    <div class="stats-row">
      <div class="stat-chip">
        <div class="stat-chip__icon blue">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.3"/>
            <path d="M4 7h6M4 4.5h6M4 9.5h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ currentStats.totalPublished }}</span>
          <span class="stat-chip__label">Posts publicados</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon green">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 10V5l5-3 5 3v5l-5 3-5-3z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ currentStats.avgPerWeek }}</span>
          <span class="stat-chip__label">Promedio por semana</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon gray">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="5" r="2.5" stroke="currentColor" stroke-width="1.3"/>
            <path d="M2 12c0-2.485 2.015-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ currentStats.topUser }}</span>
          <span class="stat-chip__label">Colaborador más activo</span>
        </div>
      </div>
      <div class="stat-chip">
        <div class="stat-chip__icon dark">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M2 7h7M2 10h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            <circle cx="11" cy="10" r="2" stroke="currentColor" stroke-width="1.2"/>
          </svg>
        </div>
        <div class="stat-chip__info">
          <span class="stat-chip__value">{{ currentStats.topCategory }}</span>
          <span class="stat-chip__label">Categoría líder</span>
        </div>
      </div>
    </div>

    <!-- Charts row 1: Bar chart + Category bars -->
    <div class="charts-row">

      <!-- Chart 1: Publications over time (CSS bar chart) -->
      <div class="chart-card chart-card--wide">
        <div class="chart-card__header">
          <h3 class="chart-card__title">Publicaciones por día</h3>
          <span class="chart-card__sub">Últimos {{ selectedRange === '7' ? 7 : selectedRange === '30' ? 30 : 90 }} días</span>
        </div>
        <div class="bar-chart">
          <div class="bar-chart__bars">
            <div
              v-for="(day, i) in currentBarData"
              :key="i"
              class="bar-col"
              :title="`${day.label}: ${day.count} publicaciones`"
            >
              <div class="bar-col__count" v-if="day.count > 0">{{ day.count }}</div>
              <div class="bar-wrap">
                <div
                  class="bar-fill"
                  :style="{ height: barHeight(day.count) + '%' }"
                  :class="day.count > 0 ? 'bar-fill--active' : 'bar-fill--empty'"
                ></div>
              </div>
              <div class="bar-col__label">{{ day.label }}</div>
            </div>
          </div>
          <div class="bar-chart__axis">
            <span>{{ maxBarVal }}</span>
            <span>{{ Math.floor(maxBarVal / 2) }}</span>
            <span>0</span>
          </div>
        </div>
      </div>

      <!-- Chart 2: Posts by category (horizontal bars) -->
      <div class="chart-card">
        <div class="chart-card__header">
          <h3 class="chart-card__title">Posts por categoría</h3>
        </div>
        <div class="h-bars">
          <div v-for="cat in categoryData" :key="cat.name" class="h-bar-row">
            <div class="h-bar-row__label">{{ cat.name }}</div>
            <div class="h-bar-row__track">
              <div class="h-bar-row__fill" :style="{ width: hBarWidth(cat.count) + '%', background: cat.color }"></div>
            </div>
            <div class="h-bar-row__count">{{ cat.count }}</div>
          </div>
        </div>
      </div>

    </div>

    <!-- Chart 3: Content status breakdown -->
    <div class="chart-card chart-card--full">
      <div class="chart-card__header">
        <h3 class="chart-card__title">Desglose de contenido por estado</h3>
        <div class="status-legend">
          <div v-for="s in statusBreakdown" :key="s.label" class="legend-item">
            <div class="legend-dot" :style="{ background: s.color }"></div>
            <span>{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div class="status-bar">
        <div
          v-for="s in statusBreakdown"
          :key="s.label"
          class="status-bar__seg"
          :style="{ width: s.pct + '%', background: s.color }"
          :title="`${s.label}: ${s.count} (${s.pct}%)`"
        >
          <span v-if="s.pct > 8" class="status-bar__seg-label">{{ s.pct }}%</span>
        </div>
      </div>
      <div class="status-breakdown-nums">
        <div v-for="s in statusBreakdown" :key="s.label" class="breakdown-num">
          <div class="breakdown-num__dot" :style="{ background: s.color }"></div>
          <div>
            <div class="breakdown-num__val">{{ s.count }}</div>
            <div class="breakdown-num__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom tables -->
    <div class="tables-row">

      <!-- Team activity -->
      <div class="table-card">
        <div class="table-card__header">
          <h3 class="table-card__title">Actividad del equipo</h3>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th class="th-center">Creados</th>
                <th class="th-center">Publicados</th>
                <th>Última actividad</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in teamActivity" :key="member.name">
                <td>
                  <div class="user-cell">
                    <div class="user-cell__avatar" :style="{ background: avatarColor(member.name) }">
                      {{ initials(member.name) }}
                    </div>
                    <span class="user-cell__name">{{ member.name }}</span>
                  </div>
                </td>
                <td class="td-center">
                  <span class="num-badge num-badge--blue">{{ member.created }}</span>
                </td>
                <td class="td-center">
                  <span class="num-badge num-badge--green">{{ member.published }}</span>
                </td>
                <td class="td-date">{{ member.lastActivity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Top posts -->
      <div class="table-card">
        <div class="table-card__header">
          <h3 class="table-card__title">Top publicaciones</h3>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Categoría</th>
                <th class="th-center">Estado</th>
                <th class="th-center">Vistas</th>
                <th>Publicado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="post in topPosts" :key="post.id">
                <td class="td-title">
                  <span class="post-title" :title="post.title">{{ post.title }}</span>
                </td>
                <td>
                  <span class="cat-badge" :style="{ background: post.catColor + '18', color: post.catColor }">{{ post.category }}</span>
                </td>
                <td class="td-center">
                  <span class="status-pill" :class="statusClass(post.status)">{{ post.status }}</span>
                </td>
                <td class="td-center">
                  <span class="views-val">{{ post.views.toLocaleString('es') }}</span>
                </td>
                <td class="td-date">{{ post.publishedAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- Date range ---
const ranges = [
  { value: '7', label: '7 días' },
  { value: '30', label: '30 días' },
  { value: '90', label: '90 días' }
]
const selectedRange = ref('30')
const customFrom = ref('')
const customTo = ref('')

const selectRange = (val) => { selectedRange.value = val }

// --- Mock daily data sets ---
const dailyData7 = [
  { label: 'Lun', count: 2 },
  { label: 'Mar', count: 0 },
  { label: 'Mié', count: 3 },
  { label: 'Jue', count: 1 },
  { label: 'Vie', count: 4 },
  { label: 'Sáb', count: 1 },
  { label: 'Dom', count: 0 }
]

const dailyData30 = [
  { label: '1', count: 1 }, { label: '2', count: 0 }, { label: '3', count: 3 }, { label: '4', count: 2 },
  { label: '5', count: 4 }, { label: '6', count: 0 }, { label: '7', count: 2 }, { label: '8', count: 1 },
  { label: '9', count: 3 }, { label: '10', count: 5 }, { label: '11', count: 2 }, { label: '12', count: 0 },
  { label: '13', count: 1 }, { label: '14', count: 4 }, { label: '15', count: 2 }, { label: '16', count: 3 },
  { label: '17', count: 6 }, { label: '18', count: 1 }, { label: '19', count: 0 }, { label: '20', count: 3 },
  { label: '21', count: 2 }, { label: '22', count: 4 }, { label: '23', count: 1 }, { label: '24', count: 5 },
  { label: '25', count: 3 }, { label: '26', count: 2 }, { label: '27', count: 0 }, { label: '28', count: 1 },
  { label: '29', count: 4 }, { label: '30', count: 2 }
]

const dailyData90 = Array.from({ length: 90 }, (_, i) => ({
  label: `${i + 1}`,
  count: Math.floor(Math.random() * 5)
}))
// Deterministic seed for stable rendering
const seededData90 = [
  1,0,2,3,1,4,2,0,3,5,1,2,0,4,3,2,1,5,3,0,2,4,1,3,2,0,4,5,2,1,
  3,2,4,0,1,5,3,2,0,4,2,1,3,5,4,0,2,3,1,4,2,5,0,3,2,1,4,3,0,5,
  2,1,4,3,5,0,2,4,1,3,2,0,5,3,4,2,1,0,3,5,2,4,1,3,0,2,5,4,3,1
].map((count, i) => ({ label: `${i + 1}`, count }))

const currentBarData = computed(() => {
  if (selectedRange.value === '7') return dailyData7
  if (selectedRange.value === '90') return seededData90
  return dailyData30
})

const maxBarVal = computed(() => Math.max(...currentBarData.value.map(d => d.count), 1))

const barHeight = (count) => {
  if (!maxBarVal.value) return 0
  return Math.round((count / maxBarVal.value) * 100)
}

// --- Stats per range ---
const statsMap = {
  '7':  { totalPublished: 11, avgPerWeek: 11, topUser: 'Ana G.', topCategory: 'Tecnología' },
  '30': { totalPublished: 68, avgPerWeek: 17, topUser: 'Ana G.', topCategory: 'Noticias' },
  '90': { totalPublished: 192, avgPerWeek: 15, topUser: 'Lucía T.', topCategory: 'Tecnología' }
}
const currentStats = computed(() => statsMap[selectedRange.value] || statsMap['30'])

// --- Category data ---
const categoryData = [
  { name: 'Tecnología',     count: 38, color: '#2563eb' },
  { name: 'Noticias',       count: 31, color: '#0891b2' },
  { name: 'Sostenibilidad', count: 24, color: '#16a34a' },
  { name: 'Finanzas',       count: 19, color: '#7c3aed' },
  { name: 'Estrategia',     count: 14, color: '#ea580c' },
  { name: 'Productos',      count: 10, color: '#db2777' },
]

const maxCatCount = computed(() => Math.max(...categoryData.map(c => c.count)))
const hBarWidth = (count) => Math.round((count / maxCatCount.value) * 100)

// --- Status breakdown ---
const statusBreakdown = computed(() => {
  const total = 136
  const items = [
    { label: 'Publicados',      count: 82, color: '#16a34a' },
    { label: 'Borradores',      count: 28, color: '#6b7280' },
    { label: 'En revisión',     count: 17, color: '#d97706' },
    { label: 'Archivados',      count: 9,  color: '#dc2626' }
  ]
  return items.map(i => ({ ...i, pct: Math.round((i.count / total) * 100) }))
})

// --- Team activity ---
const teamActivity = [
  { name: 'Ana García',    created: 28, published: 24, lastActivity: '30 may 2026' },
  { name: 'Lucía Torres',  created: 22, published: 19, lastActivity: '30 may 2026' },
  { name: 'Carlos Méndez', created: 18, published: 14, lastActivity: '29 may 2026' },
  { name: 'Roberto Silva', created: 11, published: 8,  lastActivity: '29 may 2026' },
  { name: 'Mario Reyes',   created: 7,  published: 3,  lastActivity: '28 may 2026' },
]

// --- Top posts ---
const topPosts = [
  { id: 1, title: 'Innovación y sostenibilidad: claves para el futuro',  category: 'Tecnología',     catColor: '#2563eb', status: 'Publicado', views: 4820, publishedAt: '15 may 2026' },
  { id: 2, title: 'Resultados Q1 2026: crecimiento en todos los mercados', category: 'Finanzas',     catColor: '#7c3aed', status: 'Publicado', views: 3610, publishedAt: '10 may 2026' },
  { id: 3, title: 'Lanzamiento de nuestro nuevo producto estrella',        category: 'Productos',    catColor: '#db2777', status: 'Publicado', views: 2940, publishedAt: '8 may 2026' },
  { id: 4, title: 'Informe de sostenibilidad 2025',                        category: 'Sostenibilidad', catColor: '#16a34a', status: 'Publicado', views: 2110, publishedAt: '2 may 2026' },
  { id: 5, title: 'Estrategia digital para empresas en 2026',              category: 'Estrategia',  catColor: '#ea580c', status: 'Publicado', views: 1780, publishedAt: '28 abr 2026' },
  { id: 6, title: 'Premios excelencia 2025: reconocimientos del sector',   category: 'Noticias',    catColor: '#0891b2', status: 'Publicado', views: 1420, publishedAt: '20 abr 2026' },
]

// --- Helpers ---
const AVATAR_COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2', '#65a30d']
const avatarColor = (name = '') => {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}
const initials = (name = '') => name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() || '?'

const statusClass = (status) => {
  if (status === 'Publicado') return 'status-pill--ok'
  if (status === 'Revisión') return 'status-pill--review'
  return 'status-pill--draft'
}
</script>

<style scoped>
.analytics-view {
  padding: 32px 28px;
  max-width: 1500px;
  margin: 0 auto;
  font-family: var(--font-sans);
}

/* Page header */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 20px; margin-bottom: 28px; flex-wrap: wrap; }
.page-header__title { font-size: 22px; font-weight: 650; letter-spacing: -0.4px; color: var(--gray-900); margin: 0 0 5px; }
.page-header__desc { font-size: 13.5px; color: var(--gray-400); margin: 0; }
.page-header__actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

/* Range tabs */
.range-tabs { display: flex; background: var(--gray-100); border-radius: 8px; padding: 3px; gap: 2px; }
.range-tab {
  padding: 5px 13px; border-radius: 6px; border: none;
  background: transparent; color: var(--gray-600);
  font-size: 13px; font-weight: 500; cursor: pointer;
  font-family: var(--font-sans); transition: all 0.15s;
}
.range-tab.active { background: #fff; color: #2563eb; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,.08); }
.range-tab:hover:not(.active) { color: var(--gray-900); }

.filter-date {
  height: 34px; padding: 0 10px; border: 1px solid var(--gray-200); border-radius: 8px;
  font-size: 12.5px; font-family: var(--font-sans); color: var(--gray-700);
  background: var(--gray-50); outline: none;
}
.date-sep { font-size: 12px; color: var(--gray-400); }

/* Stats */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
.stat-chip { display: flex; align-items: center; gap: 12px; padding: 14px 16px; background: #fff; border: 1px solid var(--gray-200); border-radius: var(--radius-md); }
.stat-chip__icon { width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-chip__icon.blue  { background: #eff6ff; color: #2563eb; }
.stat-chip__icon.green { background: #f0fdf4; color: #16a34a; }
.stat-chip__icon.gray  { background: var(--gray-100); color: var(--gray-600); }
.stat-chip__icon.dark  { background: var(--gray-900); color: #fff; }
.stat-chip__info { display: flex; flex-direction: column; gap: 1px; }
.stat-chip__value { font-size: 18px; font-weight: 700; line-height: 1.1; color: var(--gray-900); letter-spacing: -0.4px; }
.stat-chip__label { font-size: 11.5px; color: var(--gray-400); font-weight: 500; }

/* Charts row */
.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; margin-bottom: 16px; }

/* Chart card */
.chart-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.chart-card--wide { }
.chart-card--full { margin-bottom: 16px; }
.chart-card__header {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--gray-100);
}
.chart-card__title { font-size: 13.5px; font-weight: 650; color: var(--gray-900); margin: 0; }
.chart-card__sub { font-size: 12px; color: var(--gray-400); }

/* ── Chart 1: CSS Bar chart ── */
.bar-chart { padding: 16px 18px 10px; display: flex; gap: 10px; }
.bar-chart__bars {
  flex: 1;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 140px;
  position: relative;
}
.bar-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
}
.bar-col__count {
  font-size: 9px;
  font-weight: 700;
  color: #2563eb;
  margin-bottom: 2px;
  min-height: 12px;
}
.bar-wrap {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
}
.bar-fill {
  width: 100%;
  border-radius: 3px 3px 0 0;
  transition: height 0.4s ease;
  min-height: 2px;
}
.bar-fill--active { background: linear-gradient(to top, #1d4ed8, #3b82f6); }
.bar-fill--empty { background: var(--gray-100); min-height: 3px; }
.bar-col__label {
  font-size: 9px;
  font-weight: 500;
  color: var(--gray-400);
  margin-top: 4px;
  white-space: nowrap;
}

.bar-chart__axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 10px;
  color: var(--gray-400);
  font-weight: 500;
  padding-bottom: 20px;
  text-align: right;
  width: 20px;
}

/* ── Chart 2: Horizontal bars ── */
.h-bars { padding: 16px 18px; display: flex; flex-direction: column; gap: 12px; }
.h-bar-row { display: flex; align-items: center; gap: 10px; }
.h-bar-row__label { font-size: 12px; font-weight: 500; color: var(--gray-700); width: 90px; flex-shrink: 0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
.h-bar-row__track { flex: 1; height: 8px; background: var(--gray-100); border-radius: 99px; overflow: hidden; }
.h-bar-row__fill { height: 100%; border-radius: 99px; transition: width 0.4s ease; }
.h-bar-row__count { font-size: 12px; font-weight: 700; color: var(--gray-700); width: 24px; text-align: right; flex-shrink: 0; }

/* ── Chart 3: Status breakdown ── */
.status-legend { display: flex; gap: 14px; flex-wrap: wrap; }
.legend-item { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--gray-600); font-weight: 500; }
.legend-dot { width: 8px; height: 8px; border-radius: 50%; }

.status-bar {
  display: flex;
  height: 24px;
  border-radius: 6px;
  overflow: hidden;
  margin: 14px 18px 0;
}
.status-bar__seg {
  display: flex; align-items: center; justify-content: center;
  transition: width 0.4s ease;
  position: relative;
}
.status-bar__seg-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.9); }

.status-breakdown-nums {
  display: flex; gap: 24px; padding: 14px 18px 16px;
  flex-wrap: wrap;
}
.breakdown-num { display: flex; align-items: center; gap: 10px; }
.breakdown-num__dot { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
.breakdown-num__val { font-size: 18px; font-weight: 700; color: var(--gray-900); line-height: 1; }
.breakdown-num__label { font-size: 11.5px; color: var(--gray-400); margin-top: 1px; }

/* Tables row */
.tables-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

/* Table card */
.table-card {
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.table-card__header {
  padding: 14px 18px;
  border-bottom: 1px solid var(--gray-100);
}
.table-card__title { font-size: 13.5px; font-weight: 650; color: var(--gray-900); margin: 0; }

.table-wrap { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th {
  padding: 9px 14px;
  text-align: left;
  font-size: 11px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.07em;
  color: var(--gray-500); background: var(--gray-50);
  border-bottom: 1px solid var(--gray-100); white-space: nowrap;
}
.data-table td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--gray-50);
  vertical-align: middle;
}
.data-table tbody tr:hover td { background: var(--gray-50); }
.data-table tbody tr:last-child td { border-bottom: none; }
.th-center, .td-center { text-align: center; }

/* User cell */
.user-cell { display: flex; align-items: center; gap: 9px; }
.user-cell__avatar {
  width: 28px; height: 28px; border-radius: 50%; color: #fff;
  font-size: 10px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.user-cell__name { font-weight: 500; font-size: 13px; color: var(--gray-900); }

/* Number badges */
.num-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 28px; padding: 2px 8px; border-radius: 20px;
  font-size: 12px; font-weight: 700;
}
.num-badge--blue { background: #eff6ff; color: #2563eb; }
.num-badge--green { background: #f0fdf4; color: #15803d; }

.td-date { font-size: 12px; color: var(--gray-500); white-space: nowrap; }
.td-title { max-width: 200px; }
.post-title { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500; color: var(--gray-900); }

.cat-badge { display: inline-flex; padding: 2px 8px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
.views-val { font-size: 13px; font-weight: 600; color: var(--gray-800); }

/* Status pills */
.status-pill { display: inline-flex; padding: 2px 8px; border-radius: 20px; font-size: 11.5px; font-weight: 600; }
.status-pill--ok     { background: #dcfce7; color: #15803d; }
.status-pill--review { background: #fef3c7; color: #92400e; }
.status-pill--draft  { background: var(--gray-100); color: var(--gray-600); }

@media (max-width: 1024px) {
  .stats-row { grid-template-columns: repeat(2, 1fr); }
  .charts-row { grid-template-columns: 1fr; }
  .tables-row { grid-template-columns: 1fr; }
}
</style>
