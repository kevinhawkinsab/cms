export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return

  const token = localStorage.getItem('cms_token')

  if (!token && to.path !== '/') {
    return navigateTo(`/?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  if (token && to.path === '/') {
    return navigateTo('/dashboard')
  }
})
