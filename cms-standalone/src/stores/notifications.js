import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function isoAgo(minutesAgo) {
  return new Date(Date.now() - minutesAgo * 60 * 1000).toISOString()
}

const MOCK_NOTIFICATIONS = [
  {
    id: uuid(),
    type: 'info',
    category: 'post',
    title: 'Nuevo post creado',
    message: 'Ana García creó el artículo "Tendencias de marketing digital 2026".',
    read: false,
    createdAt: isoAgo(3),
    link: '/dashboard/posts',
    actor: { name: 'Ana García', avatar: null }
  },
  {
    id: uuid(),
    type: 'success',
    category: 'post',
    title: 'Post publicado',
    message: 'El artículo "Guía de SEO avanzado" fue publicado exitosamente.',
    read: false,
    createdAt: isoAgo(18),
    link: '/dashboard/posts',
    actor: { name: 'Carlos López', avatar: null }
  },
  {
    id: uuid(),
    type: 'warning',
    category: 'review',
    title: 'Post en revisión',
    message: 'El artículo "Estrategias de redes sociales" está pendiente de aprobación.',
    read: false,
    createdAt: isoAgo(45),
    link: '/dashboard/posts',
    actor: { name: 'María Torres', avatar: null }
  },
  {
    id: uuid(),
    type: 'info',
    category: 'user',
    title: 'Nuevo usuario registrado',
    message: 'Pedro Sánchez se unió como Editor.',
    read: false,
    createdAt: isoAgo(90),
    link: '/dashboard/users',
    actor: { name: 'Sistema', avatar: null }
  },
  {
    id: uuid(),
    type: 'success',
    category: 'comment',
    title: 'Comentario aprobado',
    message: 'Tu comentario en "Tendencias 2026" fue aprobado por el moderador.',
    read: true,
    createdAt: isoAgo(60 * 6),
    link: null,
    actor: { name: 'Moderador', avatar: null }
  },
  {
    id: uuid(),
    type: 'error',
    category: 'system',
    title: 'Error en sincronización',
    message: 'No se pudo sincronizar el caché del servidor. Por favor, intenta de nuevo.',
    read: true,
    createdAt: isoAgo(60 * 8),
    link: null,
    actor: null
  },
  {
    id: uuid(),
    type: 'info',
    category: 'post',
    title: 'Post programado',
    message: 'El artículo "Novedades de junio" está programado para publicarse mañana.',
    read: true,
    createdAt: isoAgo(60 * 25),
    link: '/dashboard/posts',
    actor: { name: 'Laura Martínez', avatar: null }
  },
  {
    id: uuid(),
    type: 'warning',
    category: 'system',
    title: 'Espacio de almacenamiento',
    message: 'Has utilizado el 80% del espacio de almacenamiento disponible.',
    read: true,
    createdAt: isoAgo(60 * 26),
    link: '/dashboard/media',
    actor: null
  },
  {
    id: uuid(),
    type: 'success',
    category: 'user',
    title: 'Rol actualizado',
    message: 'El rol de Lucía Fernández fue actualizado a Administrador.',
    read: true,
    createdAt: isoAgo(60 * 48),
    link: '/dashboard/users',
    actor: { name: 'Admin Principal', avatar: null }
  },
  {
    id: uuid(),
    type: 'info',
    category: 'review',
    title: 'Revisión completada',
    message: 'El artículo "Introducción a Vue 3" ha sido revisado y aprobado.',
    read: true,
    createdAt: isoAgo(60 * 50),
    link: '/dashboard/posts',
    actor: { name: 'Revisor Senior', avatar: null }
  },
  {
    id: uuid(),
    type: 'success',
    category: 'post',
    title: 'Categoría creada',
    message: 'La categoría "Tecnología" fue creada con 0 artículos.',
    read: true,
    createdAt: isoAgo(60 * 72),
    link: '/dashboard/categories',
    actor: { name: 'Carlos López', avatar: null }
  },
  {
    id: uuid(),
    type: 'info',
    category: 'system',
    title: 'Actualización del sistema',
    message: 'El CMS fue actualizado a la versión 2.4.1 con mejoras de rendimiento.',
    read: true,
    createdAt: isoAgo(60 * 120),
    link: null,
    actor: null
  }
]

function getDateGroup(isoStr) {
  const now = new Date()
  const date = new Date(isoStr)
  const diffMs = now - date
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterdayStart = new Date(todayStart - 86400000)

  if (date >= todayStart) return 'Hoy'
  if (date >= yesterdayStart) return 'Ayer'
  if (diffDays < 7) return 'Esta semana'
  return 'Anteriores'
}

export const useNotificationsStore = defineStore('notifications', () => {
  const notifications = ref([...MOCK_NOTIFICATIONS])

  const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

  const groupedByDate = computed(() => {
    const groups = { Hoy: [], Ayer: [], 'Esta semana': [], Anteriores: [] }
    for (const n of notifications.value) {
      const group = getDateGroup(n.createdAt)
      groups[group].push(n)
    }
    return groups
  })

  function addNotification(notif) {
    const entry = {
      id: uuid(),
      read: false,
      createdAt: new Date().toISOString(),
      link: null,
      actor: null,
      ...notif
    }
    notifications.value.unshift(entry)
    if (notifications.value.length > 100) {
      notifications.value = notifications.value.slice(0, 100)
    }
  }

  function markAsRead(id) {
    const notif = notifications.value.find((n) => n.id === id)
    if (notif) notif.read = true
  }

  function markAllAsRead() {
    notifications.value.forEach((n) => { n.read = true })
  }

  function removeNotification(id) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  function clearAll() {
    notifications.value = []
  }

  function fetchNotifications() {
    notifications.value = [...MOCK_NOTIFICATIONS]
  }

  return {
    notifications,
    unreadCount,
    groupedByDate,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    fetchNotifications
  }
})
