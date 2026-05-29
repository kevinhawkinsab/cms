import { unref } from 'vue'

const SITE_NAME = 'Bambito Spring Water'
const DEFAULT_SITE_URL = 'https://www.bambitospringwater.com'
const DEFAULT_IMAGE = '/img/images/bsw1.jpg'
const DEFAULT_DESCRIPTION =
  'Bambito Spring Water: agua de manantial volcanica del Volcan Baru, Chiriqui, Panama.'

function normalizeKeywords(keywords) {
  if (!keywords) return ''
  if (Array.isArray(keywords)) return keywords.filter(Boolean).join(', ')
  return String(keywords)
}

function absoluteUrl(value, siteUrl) {
  if (!value) return undefined
  const url = String(value)
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('//')) return `https:${url}`
  return `${siteUrl}${url.startsWith('/') ? url : `/${url}`}`
}

function normalizePath(path = '/') {
  const cleanPath = String(path).split('#')[0].split('?')[0] || '/'
  if (cleanPath === '/') return '/'
  return cleanPath.replace(/\/$/, '')
}

export function useSeo(options = {}) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const siteUrl = (config?.public?.siteUrl || DEFAULT_SITE_URL).replace(/\/$/, '')

  const resolveUrl = () =>
    unref(options.url) || `${siteUrl}${normalizePath(route.path)}`

  const resolveImage = () =>
    absoluteUrl(unref(options.image) || DEFAULT_IMAGE, siteUrl)

  useSeoMeta({
    title: () => unref(options.title) || SITE_NAME,
    description: () => unref(options.description) || DEFAULT_DESCRIPTION,
    keywords: () => normalizeKeywords(unref(options.keywords)) || undefined,

    ogTitle: () => unref(options.title) || SITE_NAME,
    ogDescription: () => unref(options.description) || DEFAULT_DESCRIPTION,
    ogType: () => unref(options.type) || 'website',
    ogSiteName: SITE_NAME,
    ogLocale: 'es_PA',
    ogUrl: resolveUrl,
    ogImage: resolveImage,

    twitterCard: 'summary_large_image',
    twitterTitle: () => unref(options.title) || SITE_NAME,
    twitterDescription: () => unref(options.description) || DEFAULT_DESCRIPTION,
    twitterSite: '@AguaBambito',
    twitterCreator: '@AguaBambito',
    twitterImage: resolveImage,
    twitterImageAlt: () => unref(options.twitterImageAlt) || unref(options.title) || SITE_NAME
  })

  useHead(() => {
    const canonical =
      unref(options.canonical) ||
      unref(options.url) ||
      `${siteUrl}${normalizePath(route.path)}`

    const link = [
      { rel: 'canonical', href: canonical },
      { rel: 'alternate', hreflang: 'es', href: canonical },
      { rel: 'alternate', hreflang: 'es-PA', href: canonical },
      { rel: 'alternate', hreflang: 'x-default', href: canonical }
    ]

    const script = []
    const jsonLd = unref(options.jsonLd)
    if (jsonLd) {
      script.push({
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd)
      })
    }

    return { link, script }
  })
}

export default useSeo
