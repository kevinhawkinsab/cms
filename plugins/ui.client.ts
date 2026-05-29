import ToastPlugin from 'vue-toast-notification'
// @ts-ignore
import { QuillEditor } from '@vueup/vue-quill'

/**
 * Plugins de UI que dependen de window/DOM — sólo cliente.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ToastPlugin, {
    position: 'top-right',
    duration: 3500,
    dismissible: true
  })
  nuxtApp.vueApp.component('QuillEditor', QuillEditor)
})
