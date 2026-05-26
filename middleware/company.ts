const COMPANY_EXEMPT_ROUTES = ['/', '/dashboard']

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return
  if (COMPANY_EXEMPT_ROUTES.includes(to.path)) return

  const companyId = localStorage.getItem('cms_company_id')
  if (!companyId) {
    return navigateTo('/dashboard')
  }
})
