import Swal from 'sweetalert2'
import { useToast } from 'vue-toast-notification'
import { getApiErrorMessage } from '~/services/api'

/**
 * =====================================================
 * SISTEMA DE NOTIFICACIONES (Legacy)
 * =====================================================
 * - Toasts: vue-toast-notification (sólo cliente)
 * - Alertas/Confirmaciones: SweetAlert2
 *
 * useToast() se invoca lazy dentro de cada función para evitar
 * ejecutarlo en SSR (sólo se llama cuando notify.* es invocado,
 * que siempre ocurre desde cliente — eventos de UI).
 */

const DEFAULT_TOAST_OPTIONS = {
  position: 'top-right',
  duration: 3500,
  dismissible: true,
  pauseOnHover: true
}

let _toast = null

const getToast = () => {
  if (typeof window === 'undefined') return null
  if (!_toast) _toast = useToast()
  return _toast
}

export const notify = {
  success(message, options = {}) {
    const t = getToast(); if (!t) return
    t.success(message, { ...DEFAULT_TOAST_OPTIONS, ...options })
  },
  error(messageOrError, options = {}) {
    const t = getToast(); if (!t) return
    const message = typeof messageOrError === 'string'
      ? messageOrError
      : getApiErrorMessage(messageOrError)
    t.error(message, { ...DEFAULT_TOAST_OPTIONS, duration: 5000, ...options })
  },
  warning(message, options = {}) {
    const t = getToast(); if (!t) return
    t.warning(message, { ...DEFAULT_TOAST_OPTIONS, ...options })
  },
  info(message, options = {}) {
    const t = getToast(); if (!t) return
    t.info(message, { ...DEFAULT_TOAST_OPTIONS, ...options })
  }
}

export async function confirmAction({
  title = '¿Estás seguro?',
  text = 'Esta acción no se puede deshacer.',
  icon = 'warning',
  confirmButtonText = 'Sí, continuar',
  cancelButtonText = 'Cancelar',
  confirmButtonColor = '#86bc42',
  cancelButtonColor = '#64748b'
} = {}) {
  if (typeof window === 'undefined') return false
  const result = await Swal.fire({
    title, text, icon,
    showCancelButton: true,
    confirmButtonText, cancelButtonText,
    confirmButtonColor, cancelButtonColor,
    reverseButtons: true,
    focusCancel: true
  })
  return !!result.isConfirmed
}

export async function confirmDelete({
  title = '¿Eliminar este elemento?',
  text = 'Esta acción no se puede deshacer.',
  confirmButtonText = 'Sí, eliminar'
} = {}) {
  return confirmAction({
    title, text,
    icon: 'warning',
    confirmButtonText,
    confirmButtonColor: '#dc3545'
  })
}

export function alertSuccess(title, text = '') {
  if (typeof window === 'undefined') return
  return Swal.fire({
    title, text,
    icon: 'success',
    confirmButtonColor: '#86bc42',
    confirmButtonText: 'Aceptar'
  })
}

export function alertError(errorOrMessage, title = 'Ocurrió un error') {
  if (typeof window === 'undefined') return
  const message = typeof errorOrMessage === 'string'
    ? errorOrMessage
    : getApiErrorMessage(errorOrMessage)
  return Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonColor: '#dc3545',
    confirmButtonText: 'Aceptar'
  })
}

export function alertPermissionDenied(permission = null) {
  if (typeof window === 'undefined') return
  return Swal.fire({
    title: 'Permiso denegado',
    text: permission
      ? `Tu rol no tiene el permiso requerido: ${permission}`
      : 'No tienes permisos para realizar esta acción.',
    icon: 'warning',
    confirmButtonColor: '#f59e0b',
    confirmButtonText: 'Entendido'
  })
}

export default notify
