export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: false },

  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ['/'],
    },
    viteNode: {
      socketPath: process.env.NUXT_VITE_NODE_SOCKET_PATH || 'nuxt-vite-node.sock',
    },
  },

  vite: {
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],

  css: ['~/assets/css/tokens.css', '~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.example.com',
    },
  },

  app: {
    head: {
      title: 'Valhalla CMS',
      meta: [
        { name: 'robots', content: 'noindex, nofollow' },
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  tailwindcss: {
    configPath: '~/tailwind.config.js',
  },

  imports: {
    dirs: ['stores', 'composables', 'utils'],
  },

  compatibilityDate: '2024-11-01',
})
