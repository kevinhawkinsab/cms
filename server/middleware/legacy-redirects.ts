import { defineEventHandler, getRequestURL, sendRedirect } from 'h3'
import { findBestMatchingPost, isPublicBlogPost } from '~/utils/blog'
import { normalizePostList } from '~/utils/normalizers'

const legacyHtmlRoutes: Record<string, string> = {
  '/index.html': '/',
  '/nosotros.html': '/nosotros',
  '/origen.html': '/origen',
  '/sostenibilidad.html': '/sostenibilidad',
  '/contacto.html': '/contacto',
  '/catalogo.html': '/catalogo',
  '/faq.html': '/faq',
  '/blog.html': '/blog'
}

const validRoutes = new Set([
  '/',
  '/nosotros',
  '/origen',
  '/sostenibilidad',
  '/contacto',
  '/catalogo',
  '/faq',
  '/blog'
])

let blogSlugCache: { expiresAt: number, posts: any[] } = { expiresAt: 0, posts: [] }

async function getPublishedBlogPosts() {
  const now = Date.now()
  if (blogSlugCache.expiresAt > now) return blogSlugCache.posts

  const config = useRuntimeConfig()
  const apiBase = (config.apiBaseInternal as string) || (config.public.apiBase as string)
  const response = await $fetch('/GetPosts_CMS/posts', { baseURL: apiBase })
  const posts = normalizePostList(response).filter(isPublicBlogPost)
  blogSlugCache = { expiresAt: now + 5 * 60 * 1000, posts }
  return posts
}

export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event)
  const normalizedPath = pathname.replace(/\/+$/, '') || '/'

  if (legacyHtmlRoutes[normalizedPath]) {
    return sendRedirect(event, legacyHtmlRoutes[normalizedPath], 301)
  }

  if (normalizedPath === '/index.php') {
    return sendRedirect(event, '/', 301)
  }

  if (normalizedPath.startsWith('/index.php/')) {
    const cleanedPath = normalizedPath.replace(/^\/index\.php/, '') || '/'

    if (validRoutes.has(cleanedPath) || cleanedPath.startsWith('/blog/')) {
      return sendRedirect(event, cleanedPath, 301)
    }

    return sendRedirect(event, '/', 301)
  }

  if (normalizedPath.startsWith('/blog/') && normalizedPath !== '/blog') {
    const requestedSlug = normalizedPath.replace('/blog/', '')
    try {
      const posts = await getPublishedBlogPosts()
      const exactMatch = posts.some((post) => post.slug === requestedSlug)
      if (!exactMatch) {
        const matchedPost = findBestMatchingPost(requestedSlug, posts)
        if (matchedPost?.slug && matchedPost.slug !== requestedSlug) {
          return sendRedirect(event, `/blog/${matchedPost.slug}`, 301)
        }
      }
    } catch (error) {
      console.warn('[legacy-redirects] No se pudo resolver slug dinamico del blog:', error)
    }
  }
})
