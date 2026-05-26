<template>
  <div class="login-page">
    <!-- Left panel -->
    <div class="login-panel-left">
      <div class="panel-overlay" />
      <div class="panel-content">
        <div class="brand-logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h1 class="brand-title">Valhalla CMS</h1>
        <p class="brand-sub">Panel de administración multiempresa</p>
        <div class="info-chips">
          <span class="info-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Acceso seguro
          </span>
          <span class="info-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Multiempresa
          </span>
          <span class="info-chip">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Tiempo real
          </span>
        </div>
      </div>
    </div>

    <!-- Right panel / form -->
    <div class="login-panel-right">
      <div class="login-form-card">
        <div class="form-logo-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
        </div>
        <h2 class="form-title">Bienvenido de vuelta</h2>
        <p class="form-sub">Ingresa tus credenciales para continuar</p>

        <form @submit.prevent="handleLogin" class="form">
          <!-- Email -->
          <div class="form-group">
            <label class="form-label" for="email">Correo electrónico</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input has-icon"
                :class="{ 'is-error': errors.email }"
                placeholder="admin@empresa.com"
                autocomplete="email"
                @blur="validateEmail"
              />
            </div>
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="form-group">
            <label class="form-label" for="password">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input
                id="password"
                v-model="form.password"
                :type="showPwd ? 'text' : 'password'"
                class="form-input has-icon has-icon-right"
                :class="{ 'is-error': errors.password }"
                placeholder="••••••••"
                autocomplete="current-password"
                @blur="validatePassword"
              />
              <button type="button" class="input-icon-right" @click="showPwd = !showPwd" tabindex="-1">
                <svg v-if="!showPwd" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
            <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
          </div>

          <!-- Remember me -->
          <div class="remember-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.remember" class="checkbox" />
              <span>Recordarme</span>
            </label>
            <button type="button" class="forgot-link">¿Olvidaste tu contraseña?</button>
          </div>

          <!-- API error -->
          <Transition name="fade">
            <div v-if="apiError" class="alert-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {{ apiError }}
            </div>
          </Transition>

          <button type="submit" class="btn-primary btn-lg w-full mt-2" :disabled="loading">
            <svg v-if="loading" class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            <span>{{ loading ? 'Ingresando…' : 'Ingresar al CMS' }}</span>
          </button>
        </form>

        <div class="form-footer">
          <a href="/" class="portal-link">← Volver al portal</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({ layout: 'auth' })

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const companyStore = useCompanyStore()

const form = ref({ email: '', password: '', remember: false })
const errors = ref({ email: '', password: '' })
const showPwd = ref(false)
const loading = ref(false)
const apiError = ref('')

onMounted(() => {
  const saved = localStorage.getItem('cms_login_email')
  if (saved) { form.value.email = saved; form.value.remember = true }
})

function validateEmail() {
  if (!form.value.email) { errors.value.email = 'El correo es requerido'; return false }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) { errors.value.email = 'Formato inválido'; return false }
  errors.value.email = ''; return true
}

function validatePassword() {
  if (!form.value.password) { errors.value.password = 'La contraseña es requerida'; return false }
  if (form.value.password.length < 6) { errors.value.password = 'Mínimo 6 caracteres'; return false }
  errors.value.password = ''; return true
}

async function handleLogin() {
  const valid = validateEmail() && validatePassword()
  if (!valid) return

  if (form.value.remember) {
    localStorage.setItem('cms_login_email', form.value.email)
  } else {
    localStorage.removeItem('cms_login_email')
  }

  loading.value = true
  apiError.value = ''

  const result = await authStore.login(form.value.email, form.value.password)

  if (result.success) {
    companyStore.initFromAuth(result.companies ?? authStore.companies)
    const redirect = route.query.redirect as string
    router.push(redirect || '/dashboard')
  } else {
    apiError.value = result.error ?? 'Error al iniciar sesión'
    loading.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}

/* Left panel */
.login-panel-left {
  flex: 0 0 55%;
  position: relative;
  background: linear-gradient(135deg, #0c2a1f 0%, #1A4F3A 40%, #2E8B57 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.login-panel-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 30% 60%, rgba(45, 212, 122, 0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(26, 79, 58, 0.3) 0%, transparent 50%);
}
.panel-overlay {
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.panel-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 2rem;
}
.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 20px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  margin: 0 auto 1.5rem;
}
.brand-title { font-size: 2.5rem; font-weight: 800; margin: 0 0 0.5rem; letter-spacing: -0.03em; }
.brand-sub { font-size: 1.05rem; opacity: 0.7; margin: 0 0 2.5rem; }

.info-chips { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.info-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  font-size: 0.8rem;
  font-weight: 500;
  backdrop-filter: blur(8px);
}

/* Right panel */
.login-panel-right {
  flex: 0 0 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: #f8fafc;
}

.login-form-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: var(--radius-xl);
  padding: 2.5rem;
  box-shadow: var(--shadow-xl);
}

.form-logo-sm {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  margin-bottom: 1.25rem;
}

.form-title { font-size: 1.5rem; font-weight: 700; color: var(--color-text-primary); margin: 0 0 0.35rem; }
.form-sub { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0 0 1.75rem; }

.form { display: flex; flex-direction: column; }

.input-wrapper { position: relative; }
.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  pointer-events: none;
}
.input-icon-right {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
  padding: 0;
  transition: color var(--transition-fast);
}
.input-icon-right:hover { color: var(--color-text-primary); }

.form-input.has-icon { padding-left: 2.5rem; }
.form-input.has-icon-right { padding-right: 2.5rem; }

.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
}
.checkbox { width: 15px; height: 15px; accent-color: var(--color-primary); }
.forgot-link {
  font-size: var(--text-sm);
  color: var(--color-primary);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.alert-error {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: var(--text-sm);
  margin-bottom: 1rem;
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--color-border);
}
.portal-link {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
}
.portal-link:hover { color: var(--color-primary); }

.w-full { width: 100%; }
.mt-2 { margin-top: 0.5rem; }
</style>
