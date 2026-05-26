export function usePermissions() {
  const authStore = useAuthStore()

  function hasPermission(permission: string): boolean {
    return authStore.permissions.includes(permission)
  }

  function hasAnyPermission(permissions: string[]): boolean {
    return permissions.some((p) => authStore.permissions.includes(p))
  }

  function hasAllPermissions(permissions: string[]): boolean {
    return permissions.every((p) => authStore.permissions.includes(p))
  }

  function isSuperAdmin(): boolean {
    return authStore.role === 'superadmin'
  }

  function isAdmin(): boolean {
    return authStore.role === 'admin' || authStore.role === 'superadmin'
  }

  function canPublish(): boolean {
    return hasPermission('posts.publish')
  }

  function canSwitchCompany(): boolean {
    return hasPermission('companies.switch')
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isSuperAdmin,
    isAdmin,
    canPublish,
    canSwitchCompany,
  }
}
