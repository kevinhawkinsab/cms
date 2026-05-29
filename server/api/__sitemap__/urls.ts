import { defineSitemapEventHandler } from '#imports'
import { isPublicBlogPost } from '~/utils/blog'
import { normalizePostList } from '~/utils/normalizers'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiBase = (config.apiBaseInternal as string) || (config.public.apiBase as string)

  const staticRoutes = [
    { loc: '/',               priority: 1.0, changefreq: 'weekly'  },
    { loc: '/origen',         priority: 0.8, changefreq: 'monthly' },
    { loc: '/nosotros',       priority: 0.8, changefreq: 'monthly' },
    { loc: '/sostenibilidad', priority: 0.8, changefreq: 'monthly' },
    { loc: '/faq',            priority: 0.85, changefreq: 'monthly' },
    { loc: '/catalogo',       priority: 0.75, changefreq: 'weekly'  },
    { loc: '/contacto',       priority: 0.6, changefreq: 'monthly' },
    { loc: '/blog',           priority: 0.9, changefreq: 'daily'   },
  ]

  try {
    const resp: any = await $fetch('/GetPosts_CMS/posts', { baseURL: apiBase })

    const items = normalizePostList(resp).filter(isPublicBlogPost)

    const apiArticleRoutes = items
      .filter((p: any) => p.slug)
      .map((p: any) => {
        const slug = p.slug
        return {
          loc: `/blog/${slug}`,
          lastmod: p.updatedAt || p.publishedAt || undefined,
          changefreq: 'weekly',
          priority: 0.75,
        }
      })

    return [...staticRoutes, ...apiArticleRoutes]
  } catch (e) {
    console.error('[Sitemap] Error fetching posts, using static routes only:', e)
    return staticRoutes
  }
})
