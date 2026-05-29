import { fileURLToPath } from 'node:url'
import { defineNuxtConfig } from 'nuxt/config'

const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://www.bambitospringwater.com'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  ssr: true,

  modules: [
    '@pinia/nuxt',
    'nuxt-simple-sitemap',
    '@nuxtjs/robots'
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@vueup/vue-quill/dist/vue-quill.snow.css',
    'vue-toast-notification/dist/theme-sugar.css',
    '~/assets/css/main.css',
    '~/assets/css/style.css'
  ],

  app: {
    baseURL: '/',
    head: {
      htmlAttrs: { lang: 'es' },

      // ── Título base (cada vista lo sobreescribe con useHead/useSeoMeta) ──
      title: 'Bambito | Agua de Manantial Volcánica del Volcán Barú, Chiriquí, Panamá',
      titleTemplate: '%s',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },

        // ── Open Graph defaults globales ─────────────────────────────────
        { property: 'og:site_name', content: 'Bambito Spring Water' },
        { property: 'og:locale', content: 'es_PA' },
        { property: 'og:type', content: 'website' },

        // ── Twitter Card defaults globales ───────────────────────────────
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@AguaBambito' },
        { name: 'twitter:creator', content: '@AguaBambito' },
      ],

      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logos/favicon.png' },
        { rel: 'apple-touch-icon', href: '/img/logos/favicon.png' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },

        // ── Hreflang global (auto-referencial español) ───────────────────
        // Cada vista lo sobreescribe con su URL específica
        { rel: 'alternate', hreflang: 'es', href: SITE_URL },
        { rel: 'alternate', hreflang: 'es-PA', href: SITE_URL },
        { rel: 'alternate', hreflang: 'x-default', href: SITE_URL },
      ],

      // ── Schema JSON-LD globales (Organization + WebSite) ────────────────
      // Solo van en el <head> global — cada vista añade sus propios schemas
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            'name': 'Bambito Spring Water',
            'alternateName': 'Bambito Agua de Manantial Volcánica',
            'url': SITE_URL,
            'logo': {
              '@type': 'ImageObject',
              'url': `${SITE_URL}/img/images/bambito-logo.png`,
              'width': 200,
              'height': 60
            },
            'description': 'Bambito Spring Water es agua de manantial volcánica 100% natural, nacida en las faldas del Volcán Barú, Chiriquí, Panamá, a 1.510 metros sobre el nivel del mar. ~65 mg/L de sílice natural. Certificada ISO 9001. Galardonada 6 veces en los Fine Waters Taste Awards.',
            'slogan': '#MuéveteALoNatural',
            'address': {
              '@type': 'PostalAddress',
              'addressCountry': 'PA',
              'addressRegion': 'Chiriquí',
              'addressLocality': 'Volcán Barú',
              'streetAddress': 'República de Panamá, Chiriquí, Volcán Barú'
            },
            'contactPoint': [
              {
                '@type': 'ContactPoint',
                'telephone': '+507-206-0019',
                'contactType': 'customer service',
                'availableLanguage': ['Spanish']
              },
              {
                '@type': 'ContactPoint',
                'telephone': '+507-6942-2262',
                'contactType': 'sales',
                'contactOption': 'WhatsApp',
                'availableLanguage': ['Spanish']
              }
            ],
            'email': 'info@bambitospringwater.com',
            'sameAs': [
              'https://www.instagram.com/bambitoaguademanantial/',
              'https://www.facebook.com/BambitoAguadeManantial',
              'https://x.com/AguaBambito'
            ],
            'award': [
              'Fine Waters Taste Awards — Oro, Estocolmo, Suecia (2019)',
              'Fine Waters Taste Awards — Bronce, Guangzhou, China (2019)',
              'Fine Waters Taste Awards — Oro, Bled, Eslovenia (2021)',
              'Fine Waters Taste Awards — Bronce, Los Ángeles, EE.UU. (2022)',
              'Fine Waters Taste Awards — Oro, Atenas, Grecia (2023)',
              'Fine Waters Taste Awards — Bronce, Atlanta, EE.UU. (2025)'
            ],
            'foundingLocation': {
              '@type': 'Place',
              'name': 'Volcán Barú, Chiriquí, Panamá'
            }
          })
        },
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            'name': 'Bambito Spring Water',
            'url': SITE_URL,
            'description': 'Agua de manantial volcánica del Volcán Barú, Chiriquí, Panamá. ~65 mg/L de sílice natural. ISO 9001.',
            'inLanguage': 'es-PA',
            'publisher': {
              '@id': `${SITE_URL}/#organization`
            },
            'potentialAction': {
              '@type': 'SearchAction',
              'target': {
                '@type': 'EntryPoint',
                'urlTemplate': `${SITE_URL}/blog?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          })
        }
      ]
    }
  },

  runtimeConfig: {
    apiBaseInternal: process.env.NUXT_API_BASE_INTERNAL || process.env.NUXT_PUBLIC_API_BASE || 'https://trencoapp.tropigas.com.pa/fortshielddev/api/PBambito',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://trencoapp.tropigas.com.pa/fortshielddev/api/PBambito',
      siteUrl: SITE_URL  // ← Ahora usa la constante central
    }
  },

  site: {
    url: 'https://www.bambitospringwater.com'
  },

  sitemap: {
    dynamicUrlsApiEndpoint: '/api/__sitemap__/urls',
    exclude: ['/bambito-cms/**', '/bambito-cms']
  },

  robots: {
    groups: [
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/bambito-cms', '/bambito-cms/']
      }
    ],
    sitemap: ['https://www.bambitospringwater.com/sitemap.xml']
  },

  components: [
    { path: '~/components', pathPrefix: false }
  ],

  vite: {
    resolve: {
      alias: {
        vuedraggable: resolvePath('./node_modules/vuedraggable/src/vuedraggable.js')
      }
    },
    build: { sourcemap: false }
  },

  nitro: {
    compressPublicAssets: true,

    routeRules: {
      '/': { ssr: true },
      '/origen': { ssr: true },
      '/nosotros': { ssr: true },
      '/sostenibilidad': { ssr: true },
      '/blog/**': { ssr: true },
      '/catalogo': { ssr: true },
      '/faq': { ssr: true },
      // '/contacto': { ssr: true },
      // CMS SIN SSR
      // '/bambito-cms': { ssr: false },
      // '/bambito-cms/**': { ssr: false }
    },

    devProxy: {
      '/api': {
        target: process.env.NUXT_API_BASE_INTERNAL || 'https://localhost:6001/api/Bambito',
        changeOrigin: true,
        secure: false
      }
    },

    serveStatic: true
  },

  experimental: {
    externalVue: false
  }
})