import Swal from 'sweetalert2'

export const notify = {
  success(title, text = '') {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
    })
  },

  error(title, text = '') {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      toast: true,
      position: 'top-end',
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
    })
  },

  warning(title, text = '') {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      toast: true,
      position: 'top-end',
      timer: 3500,
      showConfirmButton: false,
    })
  },

  async confirm(title, text = '', confirmText = 'Confirmar', danger = false) {
    const result = await Swal.fire({
      title,
      text,
      icon: danger ? 'warning' : 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: danger ? '#dc2626' : '#1A4F3A',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
    })
    return result.isConfirmed
  },
}
