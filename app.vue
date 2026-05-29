<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
      <client-only>
        <chat-widget id="widget" class="d-none d-md-block"></chat-widget>
      </client-only>
    </NuxtLayout>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = (config.public.siteUrl || 'https://www.bambitospringwater.com').replace(/\/$/, '')

const currentPath = computed(() => {
  const path = String(route.path || '/').replace(/\/$/, '') || '/'
  return path === '/' ? '/' : path
})

const currentUrl = computed(() => `${siteUrl}${currentPath.value}`)

useSeoMeta({
  twitterCard: 'summary_large_image',
  twitterSite: '@AguaBambito'
})

useHead(() => ({
  link: [
    { rel: 'alternate', hreflang: 'es', href: currentUrl.value },
    { rel: 'alternate', hreflang: 'x-default', href: currentUrl.value }
  ]
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${siteUrl}/#organization`,
            name: 'Bambito Spring Water',
            url: siteUrl,
            logo: `${siteUrl}/img/images/bambito-logo.png`,
            sameAs: [
              'https://www.instagram.com/bambitoaguademanantial/',
              'https://www.facebook.com/BambitoAguadeManantial',
              'https://x.com/AguaBambito'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            url: siteUrl,
            name: 'Bambito Spring Water',
            inLanguage: 'es-PA',
            publisher: {
              '@id': `${siteUrl}/#organization`
            }
          }
        ]
      })
    }
  ]
})
</script>
