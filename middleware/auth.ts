/**
 * Auth middleware: protege rutas del CMS.
 * Sólo se evalúa en el cliente (las rutas /bambito-cms/** son SPA).
 */
import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return

  const authStore = useAuthStore()
  const hasSession = await authStore.ensureSession()

  if (!hasSession || !authStore.isAuthenticated) {
    return navigateTo({
      path: '/bambito-cms',
      query: { redirect: to.fullPath }
    })
  }

  // Permiso requerido (definido vía definePageMeta)
  const requiredPermission = to.meta.permission
  if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
    return navigateTo({
      path: '/bambito-cms/dashboard',
      query: { denied: String(requiredPermission) }
    })
  }
})
