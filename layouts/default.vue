<template>
  <div class="layout-default">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
    <FloatingButtons />
  </div>
</template>

<script setup>
const route = useRoute()
const baseUrl = 'https://www.bambitospringwater.com'

const canonical = computed(() => {
  let path = route.path

  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1)
  }

  return baseUrl + path
})

useHead({
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/img/logos/favicon.png' },
    { rel: 'apple-touch-icon', href: '/img/logos/favicon.png' },
    { rel: 'shortcut icon', type: 'image/x-icon', href: '/img/logos/favicon.png' },
    { rel: 'canonical', href: canonical }
  ],
  meta: [
    // Imagen por defecto para el sitio (debe ser grande)
    { property: 'og:image', content: 'https://www.bambitospringwater.com/img/images/gota.jpg' },
    { property: 'og:image:type', content: 'image/jpeg' },
    { name: 'twitter:image', content: 'https://www.bambitospringwater.com/img/images/gota.jpg' }
  ]
})
</script>

<style>
.layout-default {
  width: 100%;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}
.layout-default > main {
  flex: 1 1 auto;
}
</style>
