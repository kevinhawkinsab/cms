import { defineNuxtPlugin } from 'nuxt/app'

const CHAT_WIDGET_SRC = 'https://casebots2.s3.us-east-1.amazonaws.com/chat-widgetBambito.js';

export default defineNuxtPlugin(() => {
  const loadChatWidget = () => {
    if (document.querySelector(`script[src="${CHAT_WIDGET_SRC}"]`)) return

    const script = document.createElement('script')
    script.src = CHAT_WIDGET_SRC
    script.defer = true
    script.dataset.chatWidget = 'bambito'

    script.onerror = () => {
      console.warn('No se pudo cargar el widget de chat de Bambito.')
    }

    document.body.appendChild(script)
  }

  // 👇 Tipado correcto
  const win = window as Window & typeof globalThis

  if ('requestIdleCallback' in win) {
    win.requestIdleCallback(loadChatWidget)
  } else {
    setTimeout(loadChatWidget, 1)
  }
})