import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const LS_KEY = 'cms_audit_log'

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function isoAgo(hoursAgo) {
  return new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString()
}

const SAMPLE_USERS = [
  { userId: 'u1', userName: 'Ana García', userAvatar: null },
  { userId: 'u2', userName: 'Carlos López', userAvatar: null },
  { userId: 'u3', userName: 'María Torres', userAvatar: null },
  { userId: 'u4', userName: 'Pedro Sánchez', userAvatar: null },
  { userId: 'u5', userName: 'Sistema', userAvatar: null }
]

const SAMPLE_IPS = ['192.168.1.10', '192.168.1.22', '10.0.0.5', '172.16.0.8', '192.168.0.100']
const SAMPLE_UA = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) Firefox/125.0'
]

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function makeMockEntries() {
  const entries = [
    { action: 'LOGIN', entity: 'Session', entityId: null, description: 'Inicio de sesión exitoso', endpoint: '/api/auth/login', method: 'POST', statusCode: 200, hoursAgo: 0.5 },
    { action: 'CREATE', entity: 'Post', entityId: 'post-101', description: 'Creó el artículo "Tendencias 2026"', endpoint: '/api/posts', method: 'POST', statusCode: 201, hoursAgo: 1 },
    { action: 'PUBLISH', entity: 'Post', entityId: 'post-101', description: 'Publicó el artículo "Tendencias 2026"', endpoint: '/api/posts/post-101/publish', method: 'POST', statusCode: 200, hoursAgo: 2 },
    { action: 'UPDATE', entity: 'Post', entityId: 'post-99', description: 'Actualizó el artículo "SEO avanzado"', endpoint: '/api/posts/post-99', method: 'PUT', statusCode: 200, hoursAgo: 3 },
    { action: 'CREATE', entity: 'Category', entityId: 'cat-12', description: 'Creó la categoría "Tecnología"', endpoint: '/api/categories', method: 'POST', statusCode: 201, hoursAgo: 4 },
    { action: 'VIEW', entity: 'Media', entityId: null, description: 'Accedió a la galería de medios', endpoint: '/api/media', method: 'GET', statusCode: 200, hoursAgo: 5 },
    { action: 'DELETE', entity: 'Post', entityId: 'post-88', description: 'Eliminó el artículo "Borrador antiguo"', endpoint: '/api/posts/post-88', method: 'DELETE', statusCode: 200, hoursAgo: 8 },
    { action: 'CREATE', entity: 'User', entityId: 'u-new', description: 'Creó el usuario "Lucía Fernández"', endpoint: '/api/users', method: 'POST', statusCode: 201, hoursAgo: 10 },
    { action: 'UPDATE', entity: 'Role', entityId: 'role-3', description: 'Actualizó permisos del rol "Editor"', endpoint: '/api/roles/role-3', method: 'PATCH', statusCode: 200, hoursAgo: 12 },
    { action: 'UNPUBLISH', entity: 'Post', entityId: 'post-77', description: 'Despublicó el artículo "Noticias mayo"', endpoint: '/api/posts/post-77/unpublish', method: 'POST', statusCode: 200, hoursAgo: 18 },
    { action: 'LOGIN', entity: 'Session', entityId: null, description: 'Inicio de sesión exitoso', endpoint: '/api/auth/login', method: 'POST', statusCode: 200, hoursAgo: 20 },
    { action: 'VIEW', entity: 'Post', entityId: 'post-101', description: 'Visualizó detalles del artículo', endpoint: '/api/posts/post-101', method: 'GET', statusCode: 200, hoursAgo: 22 },
    { action: 'CREATE', entity: 'Media', entityId: 'media-45', description: 'Subió imagen "banner-junio.png"', endpoint: '/api/media', method: 'POST', statusCode: 201, hoursAgo: 26 },
    { action: 'UPDATE', entity: 'User', entityId: 'u1', description: 'Actualizó perfil de Ana García', endpoint: '/api/users/u1', method: 'PATCH', statusCode: 200, hoursAgo: 30 },
    { action: 'DELETE', entity: 'Media', entityId: 'media-30', description: 'Eliminó imagen "viejo-banner.jpg"', endpoint: '/api/media/media-30', method: 'DELETE', statusCode: 200, hoursAgo: 36 },
    { action: 'PUBLISH', entity: 'Post', entityId: 'post-95', description: 'Publicó el artículo "Vue 3 tutorial"', endpoint: '/api/posts/post-95/publish', method: 'POST', statusCode: 200, hoursAgo: 48 },
    { action: 'CREATE', entity: 'PageLayout', entityId: 'layout-7', description: 'Creó diseño de página "Inicio v2"', endpoint: '/api/layouts', method: 'POST', statusCode: 201, hoursAgo: 55 },
    { action: 'LOGOUT', entity: 'Session', entityId: null, description: 'Cierre de sesión', endpoint: '/api/auth/logout', method: 'POST', statusCode: 200, hoursAgo: 60 },
    { action: 'UPDATE', entity: 'PageLayout', entityId: 'layout-7', description: 'Actualizó bloques del diseño "Inicio v2"', endpoint: '/api/layouts/layout-7', method: 'PUT', statusCode: 200, hoursAgo: 65 },
    { action: 'VIEW', entity: 'User', entityId: null, description: 'Listó todos los usuarios del sistema', endpoint: '/api/users', method: 'GET', statusCode: 200, hoursAgo: 72 },
    { action: 'DELETE', entity: 'Category', entityId: 'cat-5', description: 'Eliminó la categoría "Sin usar"', endpoint: '/api/categories/cat-5', method: 'DELETE', statusCode: 200, hoursAgo: 96 },
    { action: 'CREATE', entity: 'Post', entityId: 'post-105', description: 'Creó el artículo "Guía de Pinia"', endpoint: '/api/posts', method: 'POST', statusCode: 201, hoursAgo: 120 },
    { action: 'UPDATE', entity: 'Post', entityId: 'post-105', description: 'Guardó borrador de "Guía de Pinia"', endpoint: '/api/posts/post-105', method: 'PATCH', statusCode: 200, hoursAgo: 130 },
    { action: 'LOGIN', entity: 'Session', entityId: null, description: 'Inicio de sesión desde nueva IP', endpoint: '/api/auth/login', method: 'POST', statusCode: 200, hoursAgo: 144 },
    { action: 'VIEW', entity: 'Role', entityId: null, description: 'Accedió a lista de roles', endpoint: '/api/roles', method: 'GET', statusCode: 200, hoursAgo: 168 }
  ]

  return entries.map((e) => {
    const user = randomItem(SAMPLE_USERS)
    return {
      id: uuid(),
      timestamp: isoAgo(e.hoursAgo),
      userId: user.userId,
      userName: user.userName,
      userAvatar: user.userAvatar,
      action: e.action,
      entity: e.entity,
      entityId: e.entityId,
      description: e.description,
      endpoint: e.endpoint,
      method: e.method,
      statusCode: e.statusCode,
      responseTimeMs: Math.floor(Math.random() * 450) + 50,
      payload: null,
      ipAddress: randomItem(SAMPLE_IPS),
      userAgent: randomItem(SAMPLE_UA),
      companyId: 'company-1'
    }
  })
}

function todayStart() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
}

function monthStart() {
  const d = new Date()
  return new Date(d.getFullYear(), d.getMonth(), 1).getTime()
}

export const useAuditLogStore = defineStore('auditLog', () => {
  const logs = ref([])

  const todayCount = computed(() => {
    const start = todayStart()
    return logs.value.filter((l) => new Date(l.timestamp).getTime() >= start).length
  })

  const thisMonthCount = computed(() => {
    const start = monthStart()
    return logs.value.filter((l) => new Date(l.timestamp).getTime() >= start).length
  })

  function byAction(action) {
    return logs.value.filter((l) => l.action === action)
  }

  function recentEntries(n = 10) {
    return logs.value.slice(0, n)
  }

  function addEntry(entry) {
    const full = {
      id: uuid(),
      timestamp: new Date().toISOString(),
      payload: null,
      companyId: null,
      ...entry
    }
    logs.value.unshift(full)
    if (logs.value.length > 500) {
      logs.value = logs.value.slice(0, 500)
    }
    _saveToStorage()
  }

  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        logs.value = JSON.parse(raw)
      } else {
        logs.value = makeMockEntries()
        _saveToStorage()
      }
    } catch {
      logs.value = makeMockEntries()
    }
  }

  function clearLog() {
    logs.value = []
    localStorage.removeItem(LS_KEY)
  }

  function exportCSV() {
    const headers = [
      'id', 'timestamp', 'userId', 'userName', 'action', 'entity', 'entityId',
      'description', 'endpoint', 'method', 'statusCode', 'responseTimeMs',
      'ipAddress', 'userAgent', 'companyId'
    ]
    const escape = (v) => {
      if (v == null) return ''
      const str = String(v)
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }
    const rows = logs.value.map((l) => headers.map((h) => escape(l[h])).join(','))
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit_log_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function _saveToStorage() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(logs.value))
    } catch {
      // storage quota exceeded — silently ignore
    }
  }

  // Auto-load on store creation
  loadFromStorage()

  return {
    logs,
    todayCount,
    thisMonthCount,
    byAction,
    recentEntries,
    addEntry,
    loadFromStorage,
    clearLog,
    exportCSV
  }
})
