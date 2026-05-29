import { useToast } from 'vue-toast-notification'
import { getApiErrorMessage } from '~/services/api'

/**
 * Plugin de notificaciones para el cliente.
 * Proporciona acceso global a funciones de toast.
 */

const DEFAULT_TOAST_OPTIONS = {
  position: 'top-right',
  duration: 3500,
  dismissible: true,
  pauseOnHover: true
}

export default defineNuxtPlugin(() => {
  const toast = useToast()

  const notify = {
    success(message: string, options = {}) {
      toast.success(message, { ...DEFAULT_TOAST_OPTIONS, ...options })
    },
    error(messageOrError: string | Error, options = {}) {
      const message = typeof messageOrError === 'string'
        ? messageOrError
        : getApiErrorMessage(messageOrError)
      toast.error(message, { ...DEFAULT_TOAST_OPTIONS, duration: 5000, ...options })
    },
    warning(message: string, options = {}) {
      toast.warning(message, { ...DEFAULT_TOAST_OPTIONS, ...options })
    },
    info(message: string, options = {}) {
      toast.info(message, { ...DEFAULT_TOAST_OPTIONS, ...options })
    }
  }

  // Hacer disponible globalmente
  return {
    provide: {
      notify
    }
  }
})
