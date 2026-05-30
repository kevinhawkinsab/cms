import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { public: true }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
    meta: { public: true }
  },
  {
    path: '/select-company',
    name: 'SelectCompany',
    component: () => import('@/views/dashboard/CompanySelectView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/DashboardLayout.vue'),
    meta: { requiresAuth: true, requiresCompany: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardHome.vue')
      },
      {
        path: 'posts',
        name: 'Posts',
        component: () => import('@/views/dashboard/PostsView.vue'),
        meta: { permission: 'posts.read' }
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@/views/dashboard/CategoriesView.vue'),
        meta: { permission: 'categories.read' }
      },
      {
        path: 'media',
        name: 'Media',
        component: () => import('@/views/dashboard/MediaView.vue'),
        meta: { permission: 'media.read' }
      },
      {
        path: 'page-builder',
        name: 'PageBuilder',
        component: () => import('@/views/dashboard/PageBuilderView.vue'),
        meta: { permission: 'pagebuilder.edit' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/dashboard/UsersView.vue'),
        meta: { permission: 'users.manage' }
      },
      {
        path: 'companies',
        name: 'Companies',
        component: () => import('@/views/dashboard/CompaniesView.vue'),
        meta: { permission: 'users.manage' }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/dashboard/RolesView.vue'),
        meta: { permission: 'users.manage' }
      },
      {
        path: 'audit-log',
        name: 'AuditLog',
        component: () => import('@/views/dashboard/AuditLogView.vue'),
        meta: { permission: 'audit.read' }
      },
      {
        path: 'seo',
        name: 'Seo',
        component: () => import('@/views/dashboard/SeoView.vue'),
        meta: { permission: 'posts.edit' }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: () => import('@/views/dashboard/AnalyticsView.vue'),
        meta: { permission: 'analytics.read' }
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/views/dashboard/NotificationsView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  // Public routes pass through
  if (to.meta.public) return true

  // Ensure session is valid
  const hasSession = await authStore.ensureSession()

  if (!hasSession || !authStore.isAuthenticated) {
    return {
      name: 'Login',
      query: { redirect: to.fullPath }
    }
  }

  // Authenticated but needs company selection
  if (to.meta.requiresCompany && !authStore.selectedCompany) {
    if (to.name !== 'SelectCompany') {
      return { name: 'SelectCompany' }
    }
  }

  // Permission check
  const requiredPermission = to.meta.permission
  if (requiredPermission) {
    const perms = requiredPermission.includes('.')
      ? [requiredPermission, requiredPermission.replace(/\.\w+$/, '.read'), requiredPermission.replace(/\.\w+$/, '.create'), requiredPermission.replace(/\.\w+$/, '.edit')]
      : [requiredPermission]
    const user = authStore.user
    const isAdmin = user?.roles?.some(r => r === 'admin' || r?.name === 'admin')
    const hasPermAny = isAdmin || authStore.hasAnyPermission(perms)
    if (!hasPermAny) {
      return {
        name: 'Dashboard',
        query: { denied: requiredPermission }
      }
    }
  }

  return true
})

export default router
