<template>
  <div class="catalog-page">
    <section class="catalog-hero">
      <div class="hero-bg-elements">
        <div class="hero-gradient-orb hero-gradient-orb--1"></div>
        <div class="hero-gradient-orb hero-gradient-orb--2"></div>
        <div class="hero-pattern"></div>
      </div>

      <div class="container position-relative">
        <div class="row justify-content-center">
          <div class="col-lg-12">
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
                <li class="breadcrumb-item active" aria-current="page">Catalogo</li>
              </ol>
            </nav>

            <section class="catalog-banner">
              <div class="container">
                <div class="banner-card">
                  <h1 class="fs-1 text-white">
                    Catálogo de Productos — Garrafones y Agua Embotellada de Manantial en Panamá
                  </h1>
                  <p class="text-white">
                      ¿Buscas agua embotellada de manantial en Panamá? Bambito Spring Water 
                      ofrece garrafones de agua a domicilio, botellas PET y vidrio retornable, 
                      directamente desde el Volcán Barú hasta tu hogar u oficina.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>

    <section id="catalog-products" class="catalog-content">
      <div class="container">
        <div class="row g-4 g-xl-5">
          <div class="col-lg-3">
            <aside class="catalog-sidebar">
              <div class="sidebar-search">
                <div class="search-input-wrapper">
                  <svg class="search-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input 
                    v-model="searchTerm" 
                    type="search" 
                    class="search-input"
                    placeholder="Buscar producto..."
                    aria-label="Buscar productos"
                  >
                </div>
              </div>

              <div class="sidebar-categories">
                <h3 class="sidebar-title">Lista de Categorias</h3>
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
                        <template v-else-if="category.key === 'Botellas'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'Garrafas'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                          </svg>
                        </template>
                        <template v-else-if="category.key === 'Vidrio'">
                          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                          </svg>
                        </template>
                      </span>
                      <span class="category-label">{{ category.label }}</span>
                      <span class="category-count">
                        {{ getCategoryCount(category.key) }}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>

              <div class="sidebar-help-card">
                <div class="help-card-icon">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                 <h4 class="help-card-title">Precios por región</h4>
                 <p style="font-size: 0.85rem; color: #6b766f;">"Los precios mostrados en este catálogo son referenciales y pueden variar según la región de entrega.
                    Para obtener información actualizada sobre precios, disponibilidad y promociones vigentes en tu zona añade
                    un producto a tu carrito y selecciona tu dirección de entrega."</p>
                <!-- <h4 class="help-card-title">Necesitas ayuda con tu pedido?</h4>
                <p class="help-card-text">Nuestro equipo esta listo para ayudarte con cualquier consulta.</p>
                <NuxtLink to="/contacto" class="help-card-btn">
                  Contactar soporte
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </NuxtLink> -->
              </div>
            </aside>
          </div>

          <!-- Products Grid -->
          <div class="col-lg-9">
            <!-- Results Header -->
            <div class="products-results-header">
              <div class="results-info">
                <h2 class="results-title">
                  {{ activeCategory === 'all' ? 'Todos los productos' : getCategoryLabel(activeCategory) }}
                </h2>
                <p class="results-count">
                  {{ filteredProducts.length }} {{ filteredProducts.length === 1 ? 'producto' : 'productos' }}
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

            <!-- Loading State -->
            <div v-if="pending" class="state-card text-center">
              <div class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
              <h3 class="state-title">Cargando productos</h3>
              <p class="state-text">Estamos obteniendo el catalogo desde el servidor.</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="state-card text-center">
              <div class="state-icon state-icon--error">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <h3 class="state-title">No fue posible cargar el catalogo</h3>
              <p class="state-text">Ocurrio un error al consultar los productos.</p>
              <button type="button" class="state-btn" @click="refreshProducts">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
                Reintentar
              </button>
            </div>

            <!-- Products Grid -->
            <div v-else>
              <div v-if="filteredProducts.length" class="products-grid">
                <a 
                  v-for="(product, index) in filteredProducts" 
                  :key="product.grupo || product.articulo"
                  href="https://portal.bambitospringwater.com/" 
                  class="product-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div class="product-card__image-wrapper">
                    <span class="product-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
                    <span class="product-card__badge">
                      {{ getCategoryLabel(product.categoria).toUpperCase() }}
                    </span>
                    <img
                      :src="product.articuloWeb"
                      :alt="product.descripcion1"
                      class="product-card__image"
                      loading="lazy"
                    >
                    <div class="product-card__overlay">
                      <span class="product-card__cta">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        Ver producto
                      </span>
                    </div>
                  </div>
                  <div class="product-card__body">
                    <h3 class="product-card__name">{{ cleanText(product.descripcion1) }}</h3>
                    <div class="product-card__footer">
                      <div class="product-card__price-wrapper">
                        <span class="product-card__price-label">Precio</span>
                        <span class="product-card__price">${{ formatPrice(product.precioConDescuento ?? product.precioLista) }}</span>
                      </div>
                      <span class="product-card__arrow">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              <!-- Empty State -->
              <div v-else class="state-card text-center">
                <div class="state-icon state-icon--search">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 class="state-title">No encontramos coincidencias</h3>
                <p class="state-text">Prueba con otro termino de busqueda o cambia la categoria seleccionada.</p>
                <button type="button" class="state-btn" @click="resetFilters">
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Reiniciar filtros
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="catalog-bottom-cta">
          <div class="cta-card">
            <div class="cta-content">
              <div class="cta-icon">
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="cta-text">
                <span class="cta-kicker">Bambito Spring Water</span>
                <h3 class="cta-title">Hidratacion premium para hogar, oficina y negocio</h3>
                <p class="cta-description">
                  Si deseas consultar disponibilidad, entregas o informacion comercial, visita nuestra pagina de contacto.
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
              <NuxtLink to="/faq" class="cta-btn cta-btn--secondary">
                Preguntas frecuentes
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const runtimeConfig = useRuntimeConfig()
const apiBase = 'https://trencoapp.tropigas.com.pa/fortshield/api/PBambito';
const { public: { siteUrl } } = useRuntimeConfig()


const searchTerm = ref('')
const activeCategory = ref('all')

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'Botellas', label: 'Botellas' },
  { key: 'Garrafas', label: 'Garrafas' },
  { key: 'Vidrio', label: 'Vidrio' }
]

const cleanText = (value = '') => String(value).trim()

const normalizeText = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const formatPrice = (value) => {
  const num = Number(value || 0)
  return num.toFixed(2)
}

const getCategoryLabel = (value) => {
  const found = categories.find(
    (c) => c.key.toLowerCase() === String(value || '').toLowerCase()
  )
  return found?.label || cleanText(value) || 'Producto'
}

const getCategoryCount = (key) => {
  if (key === 'all') return products.value.length
  return products.value.filter((p) => normalizeText(p.categoria) === normalizeText(key)).length
}

const getPresentationHint = (product) => {
  const text = normalizeText(
    `${product.descripcion1 || ''} ${product.descripcion2 || ''} ${product.grupo || ''}`
  )

  if (text.includes('18.9')) return '18.9 L'
  if (text.includes('750')) return '750 ml'
  if (text.includes('600')) return '600 ml'
  if (text.includes('330')) return '330 ml'
  if (text.includes('300')) return '300 ml'
  if (text.includes('24')) return 'Caja x 24'
  if (text.includes('12')) return 'Caja x 12'
  if (text.includes('4')) return 'Caja x 4'

  return 'Presentación disponible'
}

const normalizeProductResponse = (response) => {
  if (Array.isArray(response)) return response
  if (Array.isArray(response?.value)) return response.value
  if (Array.isArray(response?.Value)) return response.Value
  if (Array.isArray(response?.data)) return response.data
  if (Array.isArray(response?.products)) return response.products
  return []
}

const { data, pending, error, refresh } = await useAsyncData(
  'bambito-products',
  async () => {
    const response = await $fetch('/GetProducts/Products/all/undefined', {
      baseURL: apiBase
    })

    const normalizedProducts = normalizeProductResponse(response)

    if (import.meta.dev) {
      console.info('[Catalogo] GetProducts response', {
        baseURL: apiBase,
        count: response?.Count ?? response?.count ?? normalizedProducts.length,
        products: normalizedProducts.length
      })
    }

    return normalizedProducts
  },
  {
    server: true,
    default: () => []
  }
)

const products = computed(() => normalizeProductResponse(data.value))

const filteredProducts = computed(() => {
  const term = normalizeText(searchTerm.value)

  return products.value.filter((product) => {
    const categoryOk =
      activeCategory.value === 'all' ||
      normalizeText(product.categoria) === normalizeText(activeCategory.value)

    const haystack = normalizeText(
      [
        product.articulo,
        product.descripcion1,
        product.descripcion2,
        product.nombreCorto,
        product.grupo,
        product.categoria
      ].join(' ')
    )

    const searchOk = !term || haystack.includes(term)

    return categoryOk && searchOk
  })
})

const bottleCount = computed(() =>
  products.value.filter((p) => normalizeText(p.categoria) === 'botellas').length
)

const garrafaCount = computed(() =>
  products.value.filter((p) => normalizeText(p.categoria) === 'garrafas').length
)

const vidrioCount = computed(() =>
  products.value.filter((p) => normalizeText(p.categoria) === 'vidrio').length
)

const formattedMinPrice = computed(() => {
  const prices = products.value
    .map((p) => Number(p.precioConDescuento ?? p.precioLista))
    .filter((n) => !Number.isNaN(n))

  if (!prices.length) return '$0.00'

  return `$${Math.min(...prices).toFixed(2)}`
})

const refreshProducts = async () => {
  await refresh()
}

const resetFilters = () => {
  searchTerm.value = ''
  activeCategory.value = 'all'
}

const jsonLdSchemas = computed(() => [
  {
    '@context':      'https://schema.org',
    '@type':         'ItemList',
    'name':          'Catálogo de Productos — Bambito Spring Water',
    'description':   'Garrafones 18.9L, botellas 300ml, 600ml, 1.5L y vidrio retornable de agua de manantial volcánica del Volcán Barú, Panamá.',
    'url':           `${siteUrl}/catalogo`,
    'numberOfItems':  products.value.length,
    'itemListElement': products.value.map((product, index) => {
      const price       = Number(product.precioConDescuento ?? product.precioLista ?? 0)
      const productName = cleanText(product.descripcion1 || product.nombreCorto || product.articulo || 'Producto Bambito')
      const productImage = product.imagen ? `${siteUrl}${product.imagen}` : `${siteUrl}/img/images/botella-presentacion.jpg`
      return {
        '@type':    'ListItem',
        'position': index + 1,
        'item': {
          '@type':       'Product',
          '@id':         `${siteUrl}/catalogo#producto-${product.articulo ?? index + 1}`,
          'name':        productName,
          'description': cleanText(product.descripcion2 || product.descripcion1 || ''),
          'image':       productImage,
          'brand': { '@type': 'Brand', 'name': 'Bambito Spring Water' },
          'offers': {
            '@type':         'Offer',
            'price':         price.toFixed(2),
            'priceCurrency': 'USD',
            'availability':  'https://schema.org/InStock',
            'url':           `${siteUrl}/catalogo`,
            'seller': { '@type': 'Organization', 'name': 'Bambito Spring Water' }
          }
        }
      }
    })
  },
  {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Inicio',   'item': `${siteUrl}/`         },
      { '@type': 'ListItem', 'position': 2, 'name': 'Catálogo', 'item': `${siteUrl}/catalogo` }
    ]
  }
])

useSeo({
  title:       'Garrafones de Agua a Domicilio en Panamá | Bambito Spring Water',
  description: 'Garrafones 18.9L, botellas 300ml, 600ml, 1.5L y vidrio retornable de agua de manantial volcánica. Entrega a hogar y oficina en Panamá.',
  keywords: [
    'catálogo Bambito', 'botellas de agua', 'garrafas 18.9L',
    'garrafón agua domicilio Panamá', 'vidrio retornable',
    'agua de manantial', 'agua volcánica', 'productos Bambito',
    'agua de manantial embotellada precios panamá',
    'agua manantial caja 24 botellas', 'agua con gas vidrio Panamá'
  ],
  type:            'website',
  image:           `${siteUrl}/img/images/botella-presentacion.jpg`,
  twitterImageAlt: 'Catálogo de productos Bambito Spring Water — Garrafones y botellas de agua de manantial',
  url:             `${siteUrl}/catalogo`,
  jsonLd:          jsonLdSchemas
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/catalogo`  },
    { rel: 'alternate', hreflang: 'es',        href: `${siteUrl}/catalogo` },
    { rel: 'alternate', hreflang: 'es-PA',     href: `${siteUrl}/catalogo` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/catalogo` }
  ]
})

useSeoMeta({
  ogTitle:            'Garrafones de Agua a Domicilio en Panamá | Bambito Spring Water',
  ogDescription:      'Garrafones 18.9L, botellas 300ml, 600ml, 1.5L y vidrio retornable de agua de manantial volcánica. Entrega a hogar y oficina en Panamá.',
  ogUrl:              `${siteUrl}/catalogo`,
  ogType:             'website',
  ogImage:            `${siteUrl}/img/images/botella-presentacion.jpg`,
  ogImageAlt:         'Catálogo de productos Bambito Spring Water — Garrafones y botellas de agua de manantial',
  ogImageWidth:       '1200',
  ogImageHeight:      '630',
  twitterTitle:       'Garrafones de Agua a Domicilio en Panamá | Bambito Spring Water',
  twitterDescription: 'Garrafones 18.9L, botellas 300ml, 600ml, 1.5L y vidrio retornable de agua de manantial volcánica. Entrega a hogar y oficina en Panamá.',
  twitterImage:       `${siteUrl}/img/images/botella-presentacion.jpg`,
  twitterImageAlt:    'Catálogo de productos Bambito Spring Water — Garrafones y botellas de agua de manantial'
})
</script>

<style scoped>

.catalog-page {
  background: #f8faf9;
  min-height: 100vh;
}

.catalog-hero {
  position: relative;
  background: linear-gradient(160deg, #1a2e23 0%, #2d4a3e 50%, #3f6458 100%);
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
  justify-content: start;
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
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.75;
  max-width: 640px;
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
  font-size: 1.25rem;
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

.catalog-content {
  padding: 60px 0 80px;
}

.catalog-sidebar {
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

.products-results-header {
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 1199.98px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 575.98px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #e8ebe9;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s ease;
}

.product-card:hover {
  border-color: #80ba49;
  box-shadow: 0 16px 48px rgba(63, 100, 88, 0.12);
  transform: translateY(-4px);
}

.product-card__image-wrapper {
  position: relative;
  background: linear-gradient(180deg, #f8faf9 0%, #f0f2f1 100%);
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  overflow: hidden;
}

.product-card__number {
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 0.75rem;
  font-weight: 800;
  color: #80ba49;
  background: rgba(128, 186, 73, 0.1);
  padding: 6px 10px;
  border-radius: 8px;
}

.product-card__badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #3f6458;
  color: #fff;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 6px 12px;
  border-radius: 6px;
}

.product-card__image {
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
  transition: transform 0.4s ease;
}

.product-card:hover .product-card__image {
  transform: scale(1.08);
}

.product-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 46, 35, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-card__overlay {
  opacity: 1;
}

.product-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #80ba49;
  color: #1a2e23;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 12px 20px;
  border-radius: 100px;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.product-card:hover .product-card__cta {
  transform: translateY(0);
}

.product-card__body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-top: 1px solid #f0f2f1;
}

.product-card__name {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #1a2e23;
  line-height: 1.4;
  margin: 0 0 16px;
  flex: 1;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.product-card__price-wrapper {
  display: flex;
  flex-direction: column;
}

.product-card__price-label {
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7c74;
  margin-bottom: 2px;
}

.product-card__price {
  font-size: 1.375rem;
  font-weight: 800;
  color: #80ba49;
}

.product-card__arrow {
  width: 36px;
  height: 36px;
  background: #f4f6f5;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3f6458;
  transition: all 0.2s ease;
}

.product-card:hover .product-card__arrow {
  background: #3f6458;
  color: #fff;
  transform: translateX(4px);
}

.state-card {
  background: #fff;
  border: 1px solid #e8ebe9;
  border-radius: 24px;
  padding: 60px 40px;
}

.state-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.state-icon--error {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
}

.state-icon--search {
  background: #f4f6f5;
  color: #9ca3a0;
}

.state-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1a2e23;
  margin-bottom: 8px;
}

.state-text {
  font-size: 1rem;
  color: #6b7c74;
  margin-bottom: 24px;
}

.state-btn {
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

.state-btn:hover {
  background: #6fa33d;
}

.catalog-bottom-cta {
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

@media (max-width: 991.98px) {
  .catalog-hero {
    padding: 80px 0 60px;
  }

  .catalog-sidebar {
    position: static;
  }

  .sidebar-categories {
    display: none;
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
  .catalog-hero {
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

  .product-card__body {
    padding: 16px;
  }

  .state-card {
    padding: 40px 24px;
  }
}
</style>