<template>
  <div class="login-root">

    <!-- ── Left panel (decorative) ── -->
    <div class="login-panel login-panel--left">

      <!-- Background image + overlay -->
      <div class="panel-bg"></div>
      <div class="panel-overlay"></div>

      <!-- Content -->
      <div class="panel-content">

        <!-- Logo -->
        <div class="panel-logo">
          <div class="panel-logo__img-wrap">
            <img src="/img/images/bambito-logo.png" alt="Bambito" class="panel-logo__img">
          </div>
          <div>
            <p class="panel-logo__brand">Bambito Spring Water</p>
            <p class="panel-logo__sub">Panel de administración</p>
          </div>
        </div>

        <!-- Hero text -->
        <div class="panel-hero">
          <span class="panel-hero__eyebrow">Panel privado</span>
          <h2 class="panel-hero__title">Gestiona tu contenido con claridad y velocidad.</h2>
          <p class="panel-hero__desc">Publicaciones, multimedia, categorías y páginas corporativas desde un espacio moderno, eficiente y fácil de usar.</p>
        </div>

        <!-- Feature chips -->
        <div class="panel-chips">
          <div class="panel-chip">
            <span class="panel-chip__icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5l1.5 3 3.5.5-2.5 2.5.5 3.5L7.5 9.5 4 11l.5-3.5L2 5l3.5-.5z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <div>
              <p class="panel-chip__title">Acceso seguro</p>
              <p class="panel-chip__sub">Sesión protegida con JWT</p>
            </div>
          </div>
          <div class="panel-chip">
            <span class="panel-chip__icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.3"/><rect x="8.5" y="1.5" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.3"/><rect x="1.5" y="8.5" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.3"/><rect x="8.5" y="8.5" width="5" height="5" rx="1.2" stroke="currentColor" stroke-width="1.3"/></svg>
            </span>
            <div>
              <p class="panel-chip__title">Control central</p>
              <p class="panel-chip__sub">Todo en un solo lugar</p>
            </div>
          </div>
          <div class="panel-chip">
            <span class="panel-chip__icon">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1v13M1 7.5h13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M4 4l7 7M11 4l-7 7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" opacity=".4"/></svg>
            </span>
            <div>
              <p class="panel-chip__title">Flujo ágil</p>
              <p class="panel-chip__sub">Menos clics, más resultados</p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- ── Right panel (form) ── -->
    <div class="login-panel login-panel--right">

      <!-- Mobile logo -->
      <div class="mobile-logo">
        <img src="/img/images/bambito-logo.png" alt="Bambito" class="mobile-logo__img">
        <span class="mobile-logo__label">Bambito Spring Water CMS</span>
      </div>

      <!-- Form card -->
      <div class="form-card">

        <div class="form-card__header">
          <div class="form-card__header-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="9" cy="8" r="2.5" stroke="currentColor" stroke-width="1.4"/>
              <path d="M4 16c0-2.761 2.239-4 5-4s5 1.239 5 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <h1 class="form-card__title">Iniciar sesión</h1>
            <p class="form-card__sub">Ingresa tus credenciales para acceder al panel.</p>
          </div>
        </div>

        <!-- Error alert -->
        <Transition name="alert-slide">
          <div v-if="error" class="form-alert form-alert--error" role="alert" data-testid="login-error">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="form-alert__icon"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M7.5 4.5v3.5M7.5 10.5h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            <span class="form-alert__text">{{ error }}</span>
            <button class="form-alert__close" @click="error = ''" aria-label="Cerrar">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
          </div>
        </Transition>

        <!-- Success alert -->
        <Transition name="alert-slide">
          <div v-if="success" class="form-alert form-alert--success" role="alert">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="form-alert__icon"><circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M4.5 7.5l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="form-alert__text">{{ success }}</span>
            <button class="form-alert__close" @click="success = ''" aria-label="Cerrar">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1l9 9M10 1L1 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleLogin" novalidate>

          <!-- Email -->
          <div class="field-group">
            <label for="email" class="field-label">Correo electrónico</label>
            <div class="field-wrap" :class="{ 'field-wrap--error': emailError, 'field-wrap--focus': emailFocused }">
              <span class="field-icon">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.35"/><path d="M1.5 5.5l6 4 6-4" stroke="currentColor" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              <input
                id="email"
                v-model.trim="email"
                type="email"
                class="field-input"
                placeholder="admin@bambitospringwater.com"
                autocomplete="email"
                required
                :disabled="loading"
                data-testid="login-email"
                @focus="emailFocused = true"
                @blur="emailFocused = false; validateEmail()"
              >
            </div>
            <Transition name="field-err">
              <p v-if="emailError" class="field-error">{{ emailError }}</p>
            </Transition>
          </div>

          <!-- Password -->
          <div class="field-group">
            <div class="field-label-row">
              <label for="password" class="field-label">Contraseña</label>
              <a href="#" class="field-forgot" @click.prevent tabindex="-1">¿Olvidaste tu contraseña?</a>
            </div>
            <div class="field-wrap" :class="{ 'field-wrap--error': passwordError, 'field-wrap--focus': passwordFocused }">
              <span class="field-icon">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="2.5" y="6.5" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.35"/><path d="M5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/></svg>
              </span>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="field-input"
                placeholder="••••••••"
                autocomplete="current-password"
                required
                :disabled="loading"
                data-testid="login-password"
                @focus="passwordFocused = true"
                @blur="passwordFocused = false; validatePassword()"
              >
              <button
                type="button"
                class="field-eye"
                @click="showPassword = !showPassword"
                :disabled="loading"
                :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              >
                <svg v-if="!showPassword" width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 7.5s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5z" stroke="currentColor" stroke-width="1.35"/><circle cx="7.5" cy="7.5" r="1.75" stroke="currentColor" stroke-width="1.35"/></svg>
                <svg v-else width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M1 7.5s2.5-5 6.5-5 6.5 5 6.5 5-2.5 5-6.5 5-6.5-5-6.5-5z" stroke="currentColor" stroke-width="1.35"/><circle cx="7.5" cy="7.5" r="1.75" stroke="currentColor" stroke-width="1.35"/><path d="M2 2l11 11" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/></svg>
              </button>
            </div>
            <Transition name="field-err">
              <p v-if="passwordError" class="field-error">{{ passwordError }}</p>
            </Transition>
          </div>

          <!-- Remember me -->
          <div class="remember-row">
            <label class="remember-check" for="rememberMe">
              <input id="rememberMe" v-model="rememberMe" type="checkbox" class="remember-check__input">
              <span class="remember-check__box"></span>
              <span class="remember-check__label">Recordarme en este dispositivo</span>
            </label>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            class="submit-btn"
            :class="{ 'submit-btn--loading': loading }"
            :disabled="loading"
            data-testid="login-submit"
          >
            <span v-if="loading" class="submit-btn__loading">
              <svg class="spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.75" stroke-dasharray="24 14"/></svg>
              Iniciando sesión…
            </span>
            <span v-else class="submit-btn__label">
              Ingresar al panel
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M9 4.5l3 3-3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </button>

        </form>

        <!-- Back link -->
        <div class="back-link">
          <router-link to="/" class="back-link__a">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 2.5L4.5 6.5 8 10.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Volver al sitio web
          </router-link>
        </div>

      </div>

      <!-- Footer -->
      <p class="login-footer">© {{ new Date().getFullYear() }} Bambito Spring Water. Todos los derechos reservados.</p>

    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'cms' })

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useCmsStore } from '~/stores/cms'
import { notify } from '~/services/notifications'

const authStore = useAuthStore()
const authCms   = useCmsStore()
const router    = useRouter()

const email        = ref('')
const password     = ref('')
const showPassword = ref(false)
const rememberMe   = ref(false)
const loading      = ref(false)
const error        = ref('')
const success      = ref('')
const emailFocused    = ref(false)
const passwordFocused = ref(false)
const emailError      = ref('')
const passwordError   = ref('')

onMounted(() => {
  const saved = localStorage.getItem('bambito_login_email')
  if (saved) { email.value = saved; rememberMe.value = true }
})

const validateEmail = () => {
  if (!email.value) { emailError.value = 'El correo electrónico es obligatorio.'; return false }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!re.test(email.value)) { emailError.value = 'Ingresa un correo electrónico válido.'; return false }
  emailError.value = ''
  return true
}

const validatePassword = () => {
  if (!password.value) { passwordError.value = 'La contraseña es obligatoria.'; return false }
  if (password.value.length < 6) { passwordError.value = 'La contraseña debe tener al menos 6 caracteres.'; return false }
  passwordError.value = ''
  return true
}

const handleLogin = async () => {
  const okEmail = validateEmail()
  const okPass  = validatePassword()
  if (!okEmail || !okPass) return

  error.value   = ''
  success.value = ''
  loading.value = true

  try {
    if (rememberMe.value) localStorage.setItem('bambito_login_email', email.value)
    else localStorage.removeItem('bambito_login_email')

    const result = await authStore.login(email.value, password.value)

    if (result?.success === false) {
      const msg = result?.error || result?.message || 'Credenciales inválidas.'
      error.value = msg
      try { notify.error(msg) } catch {}
      return
    }

    success.value = result?.message || 'Sesión iniciada correctamente.'
    try { notify.success(`Bienvenido${result?.user?.firstName ? ', ' + result.user.firstName : ''}.`) } catch {}
    password.value = ''

    const redirect = router.currentRoute.value.query?.redirect
    await router.push(redirect || '/bambito-cms/dashboard')
  } catch (err) {
    const msg = err?.message || err?.error || err?.response?.data?.message || 'Error al conectar con el servidor.'
    error.value = msg
    try { notify.error(msg) } catch {}
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ─── Tokens ─── */
.login-root {
  --green-800: #1A4F3A;
  --green-700: #1f6347;
  --green-600: #2E8B57;
  --green-100: #e1f0e8;
  --green-50:  #f0faf4;
  --gray-900:  #111827;
  --gray-800:  #1f2937;
  --gray-700:  #374151;
  --gray-600:  #4b5563;
  --gray-500:  #6b7280;
  --gray-400:  #9ca3af;
  --gray-300:  #d1d5db;
  --gray-200:  #e5e7eb;
  --gray-100:  #f3f4f6;
  --gray-50:   #f9fafb;
  --red-600:   #dc2626;
  --red-50:    #fef2f2;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: flex;
  min-height: 100vh;
  font-family: var(--font-sans);
}

/* ─── Panels ─── */
.login-panel { display: flex; flex-direction: column; }
.login-panel--left { flex: 0 0 55%; position: relative; overflow: hidden; }
.login-panel--right { flex: 1; background: var(--gray-50); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; gap: 24px; }
@media (max-width: 991px) { .login-panel--left { display: none; } .login-panel--right { flex: 1; } }

/* ─── Left panel ─── */
.panel-bg {
  position: absolute; inset: 0;
  background: url('/img/images/recicla.jpg') center/cover no-repeat;
}
.panel-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(145deg, rgba(10,24,20,0.82) 0%, rgba(26,79,58,0.75) 55%, rgba(10,24,34,0.88) 100%);
}
.panel-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  justify-content: space-between;
  height: 100%; padding: 40px 48px;
}

/* Logo */
.panel-logo { display: flex; align-items: center; gap: 14px; }
.panel-logo__img-wrap { width: 52px; height: 52px; border-radius: 12px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.2); }
.panel-logo__img { width: 36px; height: 36px; object-fit: contain; filter: brightness(0) invert(1); }
.panel-logo__brand { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin: 0 0 2px; }
.panel-logo__sub { font-size: 11px; color: rgba(255,255,255,0.45); margin: 0; letter-spacing: 0.04em; }

/* Hero */
.panel-hero { max-width: 520px; }
.panel-hero__eyebrow {
  display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15); border-radius: 99px;
  padding: 4px 12px; margin-bottom: 20px;
}
.panel-hero__title { font-size: clamp(1.6rem, 2.5vw, 2.4rem); font-weight: 700; line-height: 1.15; color: #fff; margin: 0 0 16px; letter-spacing: -0.02em; }
.panel-hero__desc { font-size: 15px; color: rgba(255,255,255,0.62); line-height: 1.65; margin: 0; }

/* Chips */
.panel-chips { display: flex; flex-direction: column; gap: 10px; }
.panel-chip { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: var(--radius-md); backdrop-filter: blur(6px); }
.panel-chip__icon { width: 36px; height: 36px; border-radius: 9px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.85); flex-shrink: 0; }
.panel-chip__title { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); margin: 0 0 2px; }
.panel-chip__sub { font-size: 11.5px; color: rgba(255,255,255,0.45); margin: 0; }

/* ─── Right panel ─── */
.mobile-logo { display: none; flex-direction: column; align-items: center; gap: 8px; }
@media (max-width: 991px) { .mobile-logo { display: flex; } }
.mobile-logo__img { width: 64px; height: 64px; object-fit: contain; }
.mobile-logo__label { font-size: 12px; font-weight: 600; color: var(--gray-500); letter-spacing: 0.04em; }

/* ─── Form card ─── */
.form-card {
  width: 100%; max-width: 420px;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 20px;
  padding: 32px;
  display: flex; flex-direction: column; gap: 22px;
}

.form-card__header { display: flex; align-items: flex-start; gap: 14px; }
.form-card__header-icon { width: 42px; height: 42px; border-radius: var(--radius-md); background: var(--green-50); color: var(--green-800); display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(26,79,58,0.12); }
.form-card__title { font-size: 19px; font-weight: 700; color: var(--gray-900); margin: 0 0 4px; letter-spacing: -0.3px; }
.form-card__sub { font-size: 13px; color: var(--gray-500); margin: 0; line-height: 1.4; }

/* ─── Alerts ─── */
.form-alert { display: flex; align-items: flex-start; gap: 10px; padding: 11px 14px; border-radius: var(--radius-sm); font-size: 13.5px; line-height: 1.45; }
.form-alert--error { background: var(--red-50); border: 1px solid rgba(220,38,38,0.2); color: #991b1b; }
.form-alert--error .form-alert__icon { color: var(--red-600); flex-shrink: 0; margin-top: 1px; }
.form-alert--success { background: var(--green-50); border: 1px solid rgba(26,79,58,0.18); color: var(--green-800); }
.form-alert--success .form-alert__icon { color: var(--green-600); flex-shrink: 0; margin-top: 1px; }
.form-alert__text { flex: 1; }
.form-alert__close { background: none; border: none; cursor: pointer; color: currentColor; opacity: 0.5; display: flex; align-items: center; padding: 2px; border-radius: 4px; margin-left: auto; transition: opacity .13s; }
.form-alert__close:hover { opacity: 1; }
.alert-slide-enter-active, .alert-slide-leave-active { transition: all .22s cubic-bezier(.4,0,.2,1); }
.alert-slide-enter-from, .alert-slide-leave-to { opacity: 0; transform: translateY(-6px); }

/* ─── Fields ─── */
form { display: flex; flex-direction: column; gap: 16px; }

.field-group { display: flex; flex-direction: column; gap: 6px; }
.field-label { font-size: 12px; font-weight: 650; color: var(--gray-700); letter-spacing: 0.01em; }
.field-label-row { display: flex; align-items: center; justify-content: space-between; }
.field-forgot { font-size: 12px; color: var(--green-700); text-decoration: none; font-weight: 500; transition: color .13s; }
.field-forgot:hover { color: var(--green-800); }

.field-wrap {
  display: flex; align-items: center;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  background: var(--gray-50);
  transition: border-color .15s, box-shadow .15s;
  overflow: hidden;
}
.field-wrap--focus { border-color: var(--green-700); box-shadow: 0 0 0 3px rgba(26,79,58,0.08); background: #fff; }
.field-wrap--error { border-color: var(--red-600); }
.field-wrap--error.field-wrap--focus { box-shadow: 0 0 0 3px rgba(220,38,38,0.08); }

.field-icon { display: flex; align-items: center; justify-content: center; width: 38px; flex-shrink: 0; color: var(--gray-400); }
.field-input { flex: 1; border: none; background: transparent; padding: 10px 4px 10px 0; font-size: 13.5px; color: var(--gray-900); font-family: var(--font-sans); outline: none; min-width: 0; }
.field-input::placeholder { color: var(--gray-400); }
.field-input:disabled { opacity: 0.55; cursor: not-allowed; }

.field-eye { background: none; border: none; cursor: pointer; color: var(--gray-400); padding: 0 12px; display: flex; align-items: center; height: 100%; transition: color .13s; }
.field-eye:hover { color: var(--gray-700); }
.field-eye:disabled { cursor: not-allowed; }

.field-error { font-size: 12px; color: var(--red-600); margin: 0; }
.field-err-enter-active, .field-err-leave-active { transition: all .18s; }
.field-err-enter-from, .field-err-leave-to { opacity: 0; transform: translateY(-4px); }

/* ─── Remember me ─── */
.remember-row { margin-top: -4px; }
.remember-check { display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
.remember-check__input { display: none; }
.remember-check__box {
  width: 17px; height: 17px; border-radius: 5px; border: 1.5px solid var(--gray-300);
  background: #fff; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  transition: all .14s; position: relative;
}
.remember-check__input:checked + .remember-check__box { background: var(--green-800); border-color: var(--green-800); }
.remember-check__input:checked + .remember-check__box::after { content: ''; position: absolute; top: 2px; left: 4.5px; width: 5px; height: 8px; border: 1.5px solid #fff; border-top: none; border-left: none; transform: rotate(45deg); }
.remember-check__label { font-size: 13px; color: var(--gray-600); }

/* ─── Submit button ─── */
.submit-btn {
  width: 100%; padding: 12px 20px;
  background: var(--green-800); color: #fff;
  border: none; border-radius: var(--radius-sm);
  font-size: 14px; font-weight: 600; font-family: var(--font-sans);
  cursor: pointer; transition: background .15s, transform .1s, opacity .15s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  letter-spacing: 0.01em;
}
.submit-btn:hover:not(:disabled) { background: var(--green-700); }
.submit-btn:active:not(:disabled) { transform: scale(0.99); }
.submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.submit-btn__label { display: flex; align-items: center; gap: 8px; }
.submit-btn__loading { display: flex; align-items: center; gap: 8px; }
.spin { animation: spin 0.85s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* ─── Back link ─── */
.back-link { text-align: center; }
.back-link__a { display: inline-flex; align-items: center; gap: 5px; font-size: 13px; color: var(--gray-500); text-decoration: none; font-weight: 500; transition: color .13s; }
.back-link__a:hover { color: var(--green-800); }

/* ─── Footer ─── */
.login-footer { font-size: 11.5px; color: var(--gray-400); text-align: center; margin: 0; }
</style>