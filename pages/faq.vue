<template>
  <div class="faq-page">
    <section class="faq-hero">
      <div class="hero-bg-elements">
        <div class="hero-gradient-orb hero-gradient-orb--1"></div>
        <div class="hero-gradient-orb hero-gradient-orb--2"></div>
        <div class="hero-pattern"></div>
      </div>

      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9">
            <nav class="hero-breadcrumb" aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item">
                  <NuxtLink to="/">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    Inicio
                  </NuxtLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Preguntas Frecuentes</li>
              </ol>
            </nav>

            <div class="hero-content text-center">
              <div class="hero-badge-group">
                <span class="hero-badge">
                  <span class="hero-badge-dot"></span>
                  Centro de ayuda
                </span>
                <span class="hero-badge hero-badge--stats">
                  {{ faqs.length }} preguntas
                </span>
              </div>

              <h1 class="hero-title">
                Todo lo que necesitas saber
                <span class="hero-title-accent">sobre Bambito</span>
              </h1>

              <p class="hero-description">
El agua que bebes no es solo agua. Tiene un origen, un recorrido y una historia. Bambito nace en las tierras altas de Chiriquí, a los pies del Volcán Barú, y se filtra de forma natural durante décadas a través de roca volcánica, absorbiendo minerales únicos como la sílice, el calcio y el magnesio. Sin aditivos. Sin tratamientos químicos. Solo la naturaleza haciendo su trabajo.

Aquí encontrarás respuestas claras sobre el agua de manantial volcánica, su origen, sus minerales, la diferencia con el agua purificada y cómo pedirla.
              </p>

              <div class="hero-stats">
                <div class="hero-stat">
                  <div class="hero-stat-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div class="hero-stat-content">
                    <span class="hero-stat-value">ISO 9001</span>
                    <span class="hero-stat-label">Certificación</span>
                  </div>
                </div>
                <div class="hero-stat">
                  <div class="hero-stat-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                    </svg>
                  </div>
                  <div class="hero-stat-content">
                    <span class="hero-stat-value">~65 mg/L</span>
                    <span class="hero-stat-label">Sílice natural</span>
                  </div>
                </div>
                <div class="hero-stat">
                  <div class="hero-stat-icon">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div class="hero-stat-content">
                    <span class="hero-stat-value">1,510m</span>
                    <span class="hero-stat-label">Altitud</span>
                  </div>
                </div>
              </div>

              <a href="#faq-list" class="hero-scroll-btn">
                <span>Explorar preguntas</span>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq-list" class="faq-content">
      <div class="container">
        <div class="row g-4 g-xl-5">
          <div class="col-lg-4 col-xl-3">
            <aside class="faq-sidebar">
              <div class="sidebar-search">
                <div class="search-input-wrapper">
                  <svg class="search-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input 
                    v-model="searchTerm" 
                    type="search" 
                    class="search-input"
                    placeholder="Buscar pregunta..."
                    aria-label="Buscar preguntas frecuentes"
                  >
                </div>
              </div>


              <div class="sidebar-categories">
                <h3 class="sidebar-title">Categorías</h3>
                <ul class="category-list">
                  <li v-for="category in categories" :key="category.key">
                    <button 
                      type="button" 
                      class="category-btn"
                      :class="{ active: activeCategory === category.key }"
                      @click="activeCategory = category.key"
                    >
                      <span class="category-icon">
                        <template v-if="category.key === 'all'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'origen'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'minerales'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'comparacion'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'volcanica'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'marca'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'servicio'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/>
                          </svg>
                        </template>
                        <template v-else>
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                          </svg>
                        </template>
                      </span>
                      <span class="category-label">{{ category.label }}</span>
                      <span class="category-count">
                        {{ category.key === 'all' ? faqs.length : faqs.filter(f => f.category === category.key).length }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>

              <!-- <div class="sidebar-help-card">
                <div class="help-card-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h4 class="help-card-title">No encuentras tu respuesta?</h4>
                <p class="help-card-text">Nuestro equipo está listo para ayudarte con cualquier consulta.</p>
                <NuxtLink to="/contacto" class="help-card-btn">
                  Contactar soporte
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </NuxtLink>
              </div> -->
            </aside>
          </div>

          <div class="col-lg-8 col-xl-9">
            <div class="faq-results-header">
              <div class="results-info">
                <h2 class="results-title">
                  {{ activeCategory === 'all' ? 'Todas las preguntas' : categoryLabel(activeCategory) }}
                </h2>
                <p class="results-count">
                  {{ filteredFaqs.length }} {{ filteredFaqs.length === 1 ? 'resultado' : 'resultados' }}
                  <span v-if="searchTerm"> para "{{ searchTerm }}"</span>
                </p>
              </div>
              <button 
                v-if="searchTerm || activeCategory !== 'all'" 
                type="button" 
                class="reset-btn"
                @click="resetFilters"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Limpiar filtros
              </button>
            </div>

            <div v-if="filteredFaqs.length" class="faq-list">
              <article 
                v-for="(faq, index) in filteredFaqs" 
                :key="faq.id" 
                class="faq-item"
                :class="{ 'is-open': isOpen(faq.id) }"
              >
                <button 
                  type="button" 
                  class="faq-header"
                  :aria-expanded="isOpen(faq.id) ? 'true' : 'false'"
                  :aria-controls="`faq-panel-${faq.id}`"
                  @click="toggleFaq(faq.id)"
                >
                  <div class="faq-number">{{ String(index + 1).padStart(2, '0') }}</div>
                  
                  <div class="faq-header-content">
                    <span class="faq-category-tag">{{ categoryLabel(faq.category) }}</span>
                    <h3 class="faq-question">{{ faq.question }}</h3>
                  </div>

                  <div class="faq-toggle">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                </button>

                <transition name="faq-expand">
                  <div 
                    v-show="isOpen(faq.id)" 
                    :id="`faq-panel-${faq.id}`" 
                    class="faq-body"
                    role="region"
                    :aria-labelledby="`faq-heading-${faq.id}`"
                  >
                    <div class="faq-body-inner">
                      <template v-for="(block, blockIndex) in faq.blocks" :key="`${faq.id}-block-${blockIndex}`">
                        <p v-if="block.type === 'paragraph'" class="faq-text">
                          {{ block.text }}
                        </p>

                        <ul v-else-if="block.type === 'bullets'" class="faq-bullets">
                          <li v-for="(item, itemIndex) in block.items" :key="`${faq.id}-bullet-${itemIndex}`">
                            <span v-if="item.label" class="bullet-label">{{ item.label }}</span>
                            <span>{{ item.text }}</span>
                          </li>
                        </ul>

                        <div v-else-if="block.type === 'table'" class="faq-table-container">
                          <div class="table-responsive">
                            <table class="faq-table">
                              <thead>
                                <tr>
                                  <th v-for="(header, headerIndex) in block.headers" :key="`${faq.id}-h-${headerIndex}`">
                                    {{ header }}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(row, rowIndex) in block.rows" :key="`${faq.id}-row-${rowIndex}`">
                                  <td v-for="(cell, cellIndex) in row" :key="`${faq.id}-cell-${rowIndex}-${cellIndex}`">
                                    {{ cell }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        <div v-else-if="block.type === 'note'" class="faq-note">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span>{{ block.text }}</span>
                        </div>
                      </template>
                    </div>
                  </div>
                </transition>
              </article>
            </div>

            <div v-else class="faq-empty">
              <div class="empty-illustration">
                <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 class="empty-title">No encontramos coincidencias</h3>
              <p class="empty-text">Intenta con otra palabra clave o selecciona una categoría diferente.</p>
              <button type="button" class="empty-btn" @click="resetFilters">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Reiniciar filtros
              </button>
            </div>
          </div>
        </div>

        <div class="faq-bottom-cta">
          <div class="cta-card">
            <div class="cta-content">
              <div class="cta-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="cta-text">
                <span class="cta-kicker">Todavia tienes dudas?</span>
                <h3 class="cta-title">Consulta mas detalles en nuestra seccion de ayuda</h3>
                <p class="cta-description">
                  Explora mas preguntas o contactanos si necesitas informacion para hogar, empresas, hoteles o restaurantes.
                </p>
              </div>
            </div>
            <div class="cta-actions">
              <!-- <NuxtLink to="/contacto" class="cta-btn cta-btn--primary">
                Contactar equipo
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </NuxtLink> -->
              <NuxtLink to="/origen" class="cta-btn cta-btn--secondary">
                Conocer la marca
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useSeo } from '~/composables/useSeo'

const searchTerm = ref('')
const activeCategory = ref('all')
const openId = ref('faq-1')
const { public: { siteUrl } } = useRuntimeConfig()

const categories = [
    { key: 'all', label: 'Todo' },
    { key: 'origen', label: 'Origen natural' },
    { key: 'minerales', label: 'Minerales' },
    { key: 'comparacion', label: 'Comparativas' },
    { key: 'volcanica', label: 'Agua volcánica' },
    { key: 'marca', label: 'Bambito' },
    { key: 'servicio', label: 'Servicio' },
    { key: 'sostenibilidad', label: 'Sostenibilidad' }
]

const faqs = ref([
    {
        id: 'faq-1',
        category: 'origen',
        emoji: '🌋',
        question: '¿Qué es el agua de manantial?',
        blocks: [
            {
                type: 'paragraph',
                text: 'El agua de manantial es agua que proviene de una fuente natural subterránea, donde el agua emerge de forma natural a la superficie después de haberse filtrado durante años a través de capas de roca.'
            },
            {
                type: 'paragraph',
                text: 'A diferencia del agua purificada o tratada, el agua de manantial conserva su composición mineral original, sin intervención química. Bambito es 100% agua de manantial natural, embotellada directamente en su origen en las tierras altas de Chiriquí, Panamá.'
            }
        ]
    },
    {
        id: 'faq-2',
        category: 'origen',
        emoji: '🗺️',
        question: '¿De dónde proviene el agua de manantial Bambito?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Bambito nace en el corazón del Parque Nacional Volcán Barú, en las tierras altas de Chiriquí, Panamá, a 1.510 metros sobre el nivel del mar.'
            },
            {
                type: 'paragraph',
                text: 'Las lluvias se filtran naturalmente durante décadas a través de la roca volcánica del Volcán Barú antes de emerger como manantial, absorbiendo en ese trayecto los minerales únicos que hacen de Bambito un agua verdaderamente especial.'
            }
        ]
    },
    {
        id: 'faq-3',
        category: 'marca',
        emoji: '🛡️',
        question: '¿Es el agua de manantial segura para beber?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí, completamente. El agua de manantial Bambito cumple con todos los estándares internacionales y panameños de calidad alimentaria.'
            },
            {
                type: 'paragraph',
                text: 'Contamos con certificación ISO 9001 y embotellamos directamente en el origen bajo estrictos controles de calidad, sin aditivos ni tratamientos químicos. Lo que proviene del volcán es lo que llega a tu mesa.'
            }
        ]
    },
    {
        id: 'faq-4',
        category: 'minerales',
        emoji: '💧',
        question: '¿Es bueno tomar agua de manantial?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí. El agua de manantial natural como Bambito ofrece hidratación limpia con minerales que tu cuerpo reconoce y aprovecha de forma natural.'
            },
            {
                type: 'paragraph',
                text: 'Bambito contiene aproximadamente 65 mg/L de sílice volcánica natural, además de calcio (15–25 mg/L) y magnesio (8–15 mg/L). No es simplemente agua: es hidratación con propósito.'
            }
        ]
    },
    {
        id: 'faq-5',
        category: 'minerales',
        emoji: '⚗️',
        question: '¿El agua de manantial tiene minerales?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí. Durante su recorrido natural a través de la roca volcánica, el agua absorbe minerales de forma completamente natural. Bambito contiene:'
            },
            {
                type: 'bullets',
                items: [
                    { label: 'Sílice:', text: '~65 mg/L' },
                    { label: 'Calcio:', text: '15–25 mg/L' },
                    { label: 'Magnesio:', text: '8–15 mg/L' },
                    { label: 'TDS (sólidos disueltos totales):', text: '~160 mg/L' },
                    { label: 'pH:', text: '7.2–7.8 (ligeramente alcalino)' }
                ]
            },
            {
                type: 'note',
                text: 'Todo esto, sin ningún aditivo. La naturaleza hace el trabajo.'
            }
        ]
    },
    {
        id: 'faq-6',
        category: 'comparacion',
        emoji: '🧪',
        question: '¿El agua de manantial es agua destilada?',
        blocks: [
            {
                type: 'paragraph',
                text: 'No. Son completamente distintas. El agua destilada se produce hirviendo agua y capturando el vapor, eliminando todos los minerales en el proceso.'
            },
            {
                type: 'paragraph',
                text: 'El agua de manantial proviene directamente de una fuente natural y conserva su perfil mineral original. Bambito nunca es destilada: sus minerales son naturales, y son parte de lo que la hace única.'
            }
        ]
    },
    {
        id: 'faq-7',
        category: 'comparacion',
        emoji: '⚖️',
        question: '¿Cuál es la diferencia entre agua de manantial y agua purificada?',
        blocks: [
            {
                type: 'paragraph',
                text: 'El agua de manantial proviene de una fuente subterránea natural y conserva los minerales que absorbió durante su filtración por la tierra.'
            },
            {
                type: 'paragraph',
                text: 'El agua purificada generalmente es agua de grifo o superficial que ha sido tratada para eliminar impurezas, pero ese proceso también elimina los minerales beneficiosos. Bambito es agua de manantial: sin alteraciones, sin tratamientos, con todo su perfil mineral intacto.'
            }
        ]
    },
    {
        id: 'faq-8',
        category: 'comparacion',
        emoji: '✨',
        question: '¿El agua de manantial es mejor que el agua purificada?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Para quienes valoran el origen natural y los minerales genuinos, sí.'
            },
            {
                type: 'paragraph',
                text: 'El agua purificada es funcional, pero está vacía de minerales por naturaleza de su procesamiento. Bambito conserva sílice, calcio y magnesio de forma natural, ofrece un sabor más suave y equilibrado, y aporta un valor nutricional real que el agua purificada simplemente no puede replicar.'
            }
        ]
    },
    {
        id: 'faq-9',
        category: 'volcanica',
        emoji: '🌋',
        question: '¿Qué es el agua volcánica?',
        blocks: [
            {
                type: 'paragraph',
                text: 'El agua volcánica es agua de manantial que se ha filtrado a través de formaciones de roca volcánica.'
            },
            {
                type: 'paragraph',
                text: 'Durante ese proceso, absorbe minerales únicos de la geología volcánica, especialmente sílice (SiO₂). Bambito es agua volcánica del Volcán Barú en Chiriquí, Panamá, naturalmente enriquecida con aproximadamente 65 mg/L de sílice.'
            }
        ]
    },
    {
        id: 'faq-10',
        category: 'volcanica',
        emoji: '🧬',
        question: '¿Qué es el agua de sílice?',
        blocks: [
            {
                type: 'paragraph',
                text: 'El agua de sílice es agua natural que contiene niveles significativos de dióxido de silicio (SiO₂), un mineral presente de forma natural en la roca volcánica.'
            },
            {
                type: 'paragraph',
                text: 'Cuando el agua se filtra a través de estas formaciones, absorbe sílice de manera natural. Bambito contiene aproximadamente 65 mg/L de sílice natural, una de las concentraciones más altas entre las aguas de manantial disponibles en Panamá.'
            }
        ]
    },
    {
        id: 'faq-11',
        category: 'volcanica',
        emoji: '🧫',
        question: '¿La sílice en el agua es mala para la salud?',
        blocks: [
            {
                type: 'paragraph',
                text: 'No. La sílice que se encuentra de forma natural en el agua potable no es dañina; al contrario, se considera beneficiosa.'
            },
            {
                type: 'paragraph',
                text: 'La sílice presente en Bambito (~65 mg/L) es un mineral natural absorbido durante el recorrido del agua por la roca volcánica. Es completamente distinta del polvo de sílice industrial. La sílice dietética natural proveniente del agua es segura y está respaldada por investigaciones científicas como beneficiosa para la salud del tejido conectivo, la piel y los huesos.'
            }
        ]
    },
    {
        id: 'faq-12',
        category: 'volcanica',
        emoji: '✅',
        question: '¿Cuáles son los beneficios del agua con sílice?',
        blocks: [
            {
                type: 'paragraph',
                text: 'La sílice natural en el agua ha sido asociada con:'
            },
            {
                type: 'bullets',
                items: [
                    { text: 'Salud de articulaciones y cartílagos' },
                    { text: 'Producción de colágeno para la elasticidad de la piel' },
                    { text: 'Fortalecimiento del cabello y las uñas' },
                    { text: 'Apoyo a la densidad ósea' },
                    { text: 'Textura suave y equilibrada en el paladar' }
                ]
            },
            {
                type: 'paragraph',
                text: 'El contenido de ~65 mg/L de sílice en Bambito es una de las razones clave por las que tiene un sabor suave y distintivo, y es reconocida por expertos internacionales en la categoría de aguas finas (fine water).'
            }
        ]
    },
    {
        id: 'faq-13',
        category: 'volcanica',
        emoji: '💙',
        question: '¿Es buena el agua volcánica para la salud?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí. El agua de manantial volcánica como Bambito está naturalmente enriquecida con minerales como la sílice, que puede apoyar la hidratación de la piel, la producción de colágeno, la fortaleza del cabello y las uñas, y el equilibrio mineral general del organismo.'
            },
            {
                type: 'paragraph',
                text: 'Además, su origen volcánico le confiere un sabor naturalmente suave y equilibrado que el agua ordinaria simplemente no puede replicar.'
            }
        ]
    },
    {
        id: 'faq-14',
        category: 'marca',
        emoji: '🏆',
        question: '¿Bambito está certificada con ISO 9001?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí. Bambito Spring Water cuenta con certificación ISO 9001, un estándar internacional de gestión de calidad que valida nuestro control de calidad consistente desde el manantial hasta la botella.'
            }
        ]
    },
    {
        id: 'faq-15',
        category: 'marca',
        emoji: '🥇',
        question: '¿Cuántos premios internacionales ha ganado Bambito?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Bambito ha sido reconocida 6 veces en los Fine Waters Taste Awards entre 2019 y 2025:'
            },
            {
                type: 'bullets',
                items: [
                    { text: 'Medalla de Oro — Estocolmo, Suecia (2019)' },
                    { text: 'Medalla de Bronce — Guangzhou, China (2019)' },
                    { text: 'Medalla de Oro — Bled, Eslovenia (2021)' },
                    { text: 'Medalla de Bronce — Los Ángeles, EE. UU. (2022)' },
                    { text: 'Medalla de Oro — Atenas, Grecia (2023)' },
                    { text: 'Medalla de Bronce — Atlanta, EE. UU. (2025)' }
                ]
            }
        ]
    },
    {
        id: 'faq-16',
        category: 'marca',
        emoji: '🚫',
        question: '¿El agua Bambito contiene aditivos o ingredientes artificiales?',
        blocks: [
            {
                type: 'paragraph',
                text: 'No. Bambito es 100% agua de manantial natural: cero aditivos, cero ingredientes artificiales, cero procesamiento químico.'
            },
            {
                type: 'paragraph',
                text: 'Solo se aplica microfiltración para garantizar la pureza. Lo que proviene del manantial volcánico es lo que llega a tu botella.'
            }
        ]
    },
    {
        id: 'faq-17',
        category: 'marca',
        emoji: '🧴',
        question: '¿En qué presentaciones está disponible Bambito?',
        blocks: [
            {
                type: 'table',
                headers: ['Presentación', 'Descripción', 'Precio'],
                rows: [
                    ['300 ml', 'Caja de 24 unidades', '$11.50'],
                    ['600 ml', 'Caja de 24 unidades', '$15.00'],
                    ['1.5 L', 'Caja de 12 unidades', '$13.25'],
                    ['Garrafa 18.9 L', 'Para hogar y oficina', '$6.25']
                ]
            }
        ]
    },
    {
        id: 'faq-18',
        category: 'servicio',
        emoji: '🚚',
        question: '¿Hacen entregas a domicilio en Panamá?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí. Bambito ofrece entrega a domicilio en Panamá: garrafones de 18.9L, botellas PET y vidrio retornable para hogar, oficina y empresa.'
            },
            {
                type: 'paragraph',
                text: 'Visita portal.bambitospringwater.com para hacer tu pedido o contáctanos directamente.'
            }
        ]
    },
    {
        id: 'faq-19',
        category: 'servicio',
        emoji: '🏨',
        question: '¿Suministran agua a hoteles y restaurantes?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Sí. Bambito está disponible para el sector HORECA (hoteles, restaurantes y cafés).'
            },
            {
                type: 'paragraph',
                text: 'Ofrecemos presentaciones premium ideales para gastronomía de alto nivel y experiencias de hospitalidad. Contáctanos en experiencia@bambitospringwater.com para conocer precios y condiciones B2B.'
            }
        ]
    },
    {
        id: 'faq-20',
        category: 'sostenibilidad',
        emoji: '♻️',
        question: '¿Cuál es el programa de reciclaje de Bambito?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Desde 2018, Bambito ha recuperado más de 175,000 botellas de PET y vidrio retornable a través de su programa activo de reciclaje, en alianza con la Fundación TRENCO.'
            },
            {
                type: 'paragraph',
                text: 'Esto forma parte de nuestro compromiso con la economía circular y la responsabilidad ambiental. Porque cuidar el agua también significa cuidar el planeta.'
            }
        ]
    },
    {
        id: 'faq-21',
        category: 'marca',
        emoji: '👶',
        question: '¿Puedo usar el agua Bambito para preparar fórmula infantil?',
        blocks: [
            {
                type: 'paragraph',
                text: 'Bambito es agua de manantial 100% natural con minerales de origen volcánico (TDS ~160 mg/L, sílice ~65 mg/L).'
            },
            {
                type: 'paragraph',
                text: 'Para la preparación de fórmula infantil, recomendamos consultar con tu pediatra, ya que algunos especialistas indican niveles específicos de minerales recomendados para bebés.'
            }
        ]
    }
])

const categoriesMap = Object.fromEntries(
    categories.map((category) => [category.key, category.label])
)

const normalizeText = (value = '') =>
    value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

const blockToText = (block) => {
    if (block.type === 'paragraph' || block.type === 'note') {
        return block.text
    }

    if (block.type === 'bullets') {
        return block.items
            .map((item) => `${item.label ? `${item.label} ` : ''}${item.text}`)
            .join(' ')
    }

    if (block.type === 'table') {
        return [
            ...(block.headers || []),
            ...(block.rows || []).flat()
        ].join(' ')
    }

    return ''
}

const categoryLabel = (key) => categoriesMap[key] || 'General'

const faqMatches = (faq, term, category) => {
    const haystack = normalizeText(
        [
            faq.question,
            faq.category,
            categoryLabel(faq.category),
            ...faq.blocks.map(blockToText)
        ].join(' ')
    )

    const searchOk = !term || haystack.includes(normalizeText(term))
    const categoryOk = category === 'all' || faq.category === category

    return searchOk && categoryOk
}

const filteredFaqs = computed(() =>
    faqs.value.filter((faq) => faqMatches(faq, searchTerm.value, activeCategory.value))
)

const toggleFaq = (id) => {
    openId.value = openId.value === id ? null : id
}

const isOpen = (id) => openId.value === id

const resetFilters = () => {
    searchTerm.value = ''
    activeCategory.value = 'all'
}

watch(
    filteredFaqs,
    (items) => {
        if (!items.length) {
            openId.value = null
            return
        }

        if (!items.some((item) => item.id === openId.value)) {
            openId.value = items[0].id
        }
    },
    { immediate: true }
)

useSeo({
  title: 'Preguntas Frecuentes | Bambito Spring Water',
  description: 'Conoce más sobre el agua de manantial Bambito: origen volcánico, minerales naturales, sílice, entregas y beneficios para tu salud.',
  keywords: ['preguntas frecuentes Bambito', 'agua de manantial', 'agua volcánica', 'Volcán Barú', 'sílice natural', 'minerales del agua', 'ISO 9001', 'entrega de agua en Panamá'],
  type: 'website',
  image: `${siteUrl}/img/images/beneficios.png`,
  url: `${siteUrl}/faq`,
  jsonLd: computed(() => [
    { '@context': 'https://schema.org', '@type': 'FAQPage', name: 'Preguntas Frecuentes — Bambito Spring Water', url: `${siteUrl}/faq`, mainEntity: faqs.value.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.blocks.map(blockToText).filter(Boolean).join(' ') } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Preguntas Frecuentes', item: `${siteUrl}/faq` }] }
  ])
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/faq` },
    { rel: 'alternate', hreflang: 'es', href: `${siteUrl}/faq` },
    { rel: 'alternate', hreflang: 'es-PA', href: `${siteUrl}/faq` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/faq` }
  ]
})

useSeoMeta({
  ogTitle: 'Preguntas Frecuentes | Bambito Spring Water',
  ogDescription: 'Conoce más sobre el agua de manantial Bambito...',
  ogUrl: `${siteUrl}/faq`,
  ogType: 'website',
  ogImage: `${siteUrl}/img/images/beneficios.png`,
  ogImageAlt: 'Preguntas frecuentes sobre Bambito Spring Water',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  twitterTitle: 'Preguntas Frecuentes | Bambito Spring Water',
  twitterDescription: 'Conoce más sobre el agua de manantial Bambito...',
  twitterImage: `${siteUrl}/img/images/beneficios.png`,
  twitterImageAlt: 'Preguntas frecuentes sobre Bambito Spring Water, agua de manantial volcánica del Volcán Barú'
})

</script>

<style scoped>
.faq-page {
  background: #f8faf9;
  min-height: 100vh;
}

.faq-hero {
  position: relative;

  background-image:
    linear-gradient(
      160deg,
      rgba(12, 24, 18, 0.75) 0%,
      rgba(22, 42, 34, 0.75) 50%,
      rgba(35, 58, 49, 0.75) 100%
    ),
    url('/img/images/green-1.jpg');

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 100px 0 80px;
  overflow: hidden;
}

.hero-bg-elements {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
}

.hero-gradient-orb--1 {
  width: 500px;
  height: 500px;
  top: -200px;
  right: -100px;
  background: rgba(128, 186, 73, 0.15);
}

.hero-gradient-orb--2 {
  width: 400px;
  height: 400px;
  bottom: -150px;
  left: -100px;
  background: rgba(75, 110, 115, 0.2);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}

.hero-breadcrumb {
  margin-bottom: 32px;
}

.hero-breadcrumb .breadcrumb {
  background: none;
  padding: 0;
  margin: 0;
  justify-content: center;
}

.hero-breadcrumb .breadcrumb-item a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
}

.hero-breadcrumb .breadcrumb-item a:hover {
  color: #80ba49;
}

.hero-breadcrumb .breadcrumb-item.active {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.hero-breadcrumb .breadcrumb-item + .breadcrumb-item::before {
  color: rgba(255, 255, 255, 0.3);
  content: "/";
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  padding: 10px 18px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.hero-badge--stats {
  background: rgba(128, 186, 73, 0.15);
  border-color: rgba(128, 186, 73, 0.25);
  color: #a8d86a;
}

.hero-badge-dot {
  width: 8px;
  height: 8px;
  background: #80ba49;
  border-radius: 50%;
  animation: pulse-badge 2s ease-in-out infinite;
}

@keyframes pulse-badge {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.15); }
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.hero-title-accent {
  display: block;
  color: #80ba49;
}

.hero-description {
  font-size: 1.0625rem;
  color: rgb(255, 255, 255);
  line-height: 1.75;
  max-width: 1200px;
  margin: 0 auto 32px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 36px;
}

.hero-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 14px 20px;
  backdrop-filter: blur(10px);
}

.hero-stat-icon {
  width: 40px;
  height: 40px;
  background: rgba(128, 186, 73, 0.15);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a8d86a;
}

.hero-stat-content {
  text-align: left;
}

.hero-stat-value {
  display: block;
  font-size: 1rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.hero-stat-label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.hero-scroll-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #80ba49;
  color: #1a2e23;
  font-weight: 700;
  font-size: 0.9375rem;
  padding: 16px 28px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 16px 40px rgba(128, 186, 73, 0.3);
}

.hero-scroll-btn:hover {
  background: #6fa33d;
  transform: translateY(-2px);
  box-shadow: 0 20px 50px rgba(128, 186, 73, 0.4);
}

.faq-content {
  padding: 60px 0 80px;
}

.faq-sidebar {
  position: sticky;
  top: 24px;
}

.sidebar-search {
  margin-bottom: 24px;
}

.search-input-wrapper {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #80ba49;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid #e8ebe9;
  border-radius: 14px;
  background: #fff;
  font-size: 0.9375rem;
  color: #1a2e23;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #80ba49;
  box-shadow: 0 0 0 4px rgba(128, 186, 73, 0.1);
}

.search-input::placeholder {
  color: #9ca3a0;
}

.sidebar-categories {
  background: #fff;
  border: 1px solid #e8ebe9;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
}

.sidebar-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #6b7c74;
  margin-bottom: 16px;
}

.category-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin-bottom: 4px;
}

.category-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.category-btn:hover {
  background: #f4f6f5;
}

.category-btn.active {
  background: linear-gradient(135deg, #3f6458, #4b6e73);
}

.category-icon {
  width: 36px;
  height: 36px;
  background: #f4f6f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3f6458;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.category-btn.active .category-icon {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.category-label {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1a2e23;
  transition: color 0.2s ease;
}

.category-btn.active .category-label {
  color: #fff;
}

.category-count {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #9ca3a0;
  background: #f4f6f5;
  padding: 4px 10px;
  border-radius: 100px;
  transition: all 0.2s ease;
}

.category-btn.active .category-count {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.sidebar-help-card {
  background: linear-gradient(135deg, #f0f7ed 0%, #e8f4e5 100%);
  border: 1px solid rgba(128, 186, 73, 0.2);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
}

.help-card-icon {
  width: 56px;
  height: 56px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #80ba49;
  margin: 0 auto 16px;
  box-shadow: 0 8px 24px rgba(128, 186, 73, 0.15);
}

.help-card-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a2e23;
  margin-bottom: 8px;
}

.help-card-text {
  font-size: 0.875rem;
  color: #5a6b61;
  line-height: 1.6;
  margin-bottom: 16px;
}

.help-card-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #3f6458;
  color: #fff;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 12px 20px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.help-card-btn:hover {
  background: #2d4a3e;
  color: #fff;
}

.faq-results-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.results-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a2e23;
  margin-bottom: 4px;
}

.results-count {
  font-size: 0.9375rem;
  color: #6b7c74;
}

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: 1px solid #e8ebe9;
  color: #5a6b61;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 10px 16px;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: #fff;
  border: 1px solid #e8ebe9;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #d1d8d4;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.faq-item.is-open {
  border-color: #80ba49;
  box-shadow: 0 12px 40px rgba(128, 186, 73, 0.12);
}

.faq-header {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.faq-number {
  font-size: 0.8125rem;
  font-weight: 800;
  color: #80ba49;
  background: rgba(128, 186, 73, 0.1);
  padding: 8px 12px;
  border-radius: 10px;
  flex-shrink: 0;
}

.faq-header-content {
  flex: 1;
  min-width: 0;
}

.faq-category-tag {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7c74;
  margin-bottom: 8px;
}

.faq-question {
  font-size: 1.0625rem;
  font-weight: 700;
  color: #1a2e23;
  line-height: 1.4;
  margin: 0;
}

.faq-toggle {
  width: 40px;
  height: 40px;
  background: #f4f6f5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3f6458;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.faq-item.is-open .faq-toggle {
  background: #3f6458;
  color: #fff;
  transform: rotate(45deg);
}

.faq-body {
  border-top: 1px solid #e8ebe9;
  background: #fafbfa;
}

.faq-body-inner {
  padding: 24px;
  padding-left: 80px;
}

.faq-text {
  font-size: 1rem;
  color: #5a6b61;
  line-height: 1.8;
  margin-bottom: 16px;
}

.faq-text:last-child {
  margin-bottom: 0;
}

.faq-bullets {
  margin: 0 0 16px;
  padding-left: 20px;
}

.faq-bullets li {
  font-size: 1rem;
  color: #5a6b61;
  line-height: 1.7;
  margin-bottom: 10px;
}

.bullet-label {
  font-weight: 700;
  color: #1a2e23;
}

.faq-note {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(128, 186, 73, 0.08);
  border: 1px solid rgba(128, 186, 73, 0.15);
  border-radius: 14px;
  padding: 16px;
  color: #3f6458;
  font-weight: 600;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.faq-note svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.faq-table-container {
  background: #fff;
  border: 1px solid #e8ebe9;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 16px;
}

.faq-table {
  width: 100%;
  margin: 0;
}

.faq-table thead th {
  background: #f4f6f5;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #1a2e23;
  padding: 14px 16px;
  border-bottom: 1px solid #e8ebe9;
}

.faq-table tbody td {
  padding: 14px 16px;
  font-size: 0.9375rem;
  color: #5a6b61;
  border-bottom: 1px solid #f0f2f1;
}

.faq-table tbody tr:last-child td {
  border-bottom: none;
}

.faq-empty {
  background: #fff;
  border: 1px solid #e8ebe9;
  border-radius: 24px;
  padding: 60px 40px;
  text-align: center;
}

.empty-illustration {
  width: 100px;
  height: 100px;
  background: #f4f6f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #9ca3a0;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a2e23;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 1rem;
  color: #6b7c74;
  margin-bottom: 24px;
}

.empty-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #80ba49;
  color: #fff;
  font-weight: 600;
  font-size: 0.9375rem;
  padding: 14px 24px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.empty-btn:hover {
  background: #6fa33d;
}

.faq-bottom-cta {
  margin-top: 60px;
}

.cta-card {
  background: linear-gradient(135deg, #3f6458 0%, #4b6e73 50%, #537173 100%);
  border-radius: 28px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  position: relative;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(128, 186, 73, 0.12);
  border-radius: 50%;
  filter: blur(80px);
}

.cta-content {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex: 1;
  position: relative;
  z-index: 1;
}

.cta-icon {
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a8d86a;
  flex-shrink: 0;
}

.cta-kicker {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a8d86a;
  margin-bottom: 8px;
}

.cta-title {
  font-size: 1.375rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.3;
}

.cta-description {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  margin: 0;
}

.cta-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 0.9375rem;
  padding: 16px 24px;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.cta-btn--primary {
  background: #80ba49;
  color: #1a2e23;
  box-shadow: 0 12px 32px rgba(128, 186, 73, 0.35);
}

.cta-btn--primary:hover {
  background: #6fa33d;
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(128, 186, 73, 0.45);
}

.cta-btn--secondary {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.cta-btn--secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.faq-expand-enter-active,
.faq-expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.faq-expand-enter-from,
.faq-expand-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 991.98px) {
  .faq-hero {
    padding: 80px 0 60px;
  }

  .faq-sidebar {
    position: static;
  }

  .sidebar-categories {
    display: none;
  }

  .faq-body-inner {
    padding-left: 24px;
  }

  .cta-card {
    flex-direction: column;
    text-align: center;
  }

  .cta-content {
    flex-direction: column;
    align-items: center;
  }

  .cta-actions {
    flex-direction: column;
    width: 100%;
  }

  .cta-btn {
    justify-content: center;
  }
}

@media (max-width: 767.98px) {
  .faq-hero {
    padding: 70px 0 50px;
  }

  .hero-stats {
    flex-direction: column;
    align-items: center;
  }

  .hero-stat {
    width: 100%;
    max-width: 280px;
  }

  .faq-header {
    padding: 20px;
  }

  .faq-number {
    display: none;
  }

  .faq-body-inner {
    padding: 20px;
  }

  .cta-card {
    padding: 28px;
  }

  .cta-icon {
    width: 52px;
    height: 52px;
  }
}

@media (max-width: 575.98px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .hero-description {
    font-size: 0.9375rem;
  }

  .faq-question {
    font-size: 1rem;
  }
}
</style>