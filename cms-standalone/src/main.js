import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import './assets/css/variables.css'
import './assets/css/main.css'

// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Vue Quill
import { QuillEditor } from '@vueup/vue-quill'

// Vue Toast
import ToastPlugin from 'vue-toast-notification'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin, { position: 'top-right' })

app.component('QuillEditor', QuillEditor)

app.mount('#app')
