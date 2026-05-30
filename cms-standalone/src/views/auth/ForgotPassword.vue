<template>
  <div class="reset-view">
    <div class="reset-shell">
      <!-- Columna izquierda decorativa -->
      <aside class="reset-visual" aria-hidden="true">
        <div class="visual-badge">
          <span class="visual-badge__dot"></span>
          <span class="visual-badge__text">Recuperación de acceso</span>
        </div>

        <div class="visual-card visual-card--one">
          <div class="visual-card__icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2.2a4.8 4.8 0 0 0-4.8 4.8v1.3c0 .3-.1.6-.3.8L2.5 10.4c-.5.5-.8 1.1-.8 1.8v1.2c0 .9.7 1.6 1.6 1.6h11.4c.9 0 1.6-.7 1.6-1.6v-1.2c0-.7-.3-1.3-.8-1.8l-1.4-1.4c-.2-.2-.3-.5-.3-.8V7A4.8 4.8 0 0 0 9 2.2Z"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="visual-card__title">Correo seguro</div>
          <div class="visual-line visual-line--lg"></div>
          <div class="visual-line"></div>
          <div class="visual-input"></div>
          <div class="visual-button"></div>
        </div>

        <div class="visual-card visual-card--two">
          <div class="visual-card__icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6 9l2 2 4-4"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect x="2.2" y="2.2" width="13.6" height="13.6" rx="3" stroke="currentColor" stroke-width="1.2" />
            </svg>
          </div>
          <div class="visual-card__title">Código verificado</div>
          <div class="visual-code">
            <span>2</span>
            <span>8</span>
            <span>1</span>
            <span>4</span>
          </div>
          <div class="visual-button visual-button--wide"></div>
        </div>

        <div class="visual-card visual-card--three">
          <div class="visual-card__icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2.2a4.8 4.8 0 0 0-4.8 4.8v1.3c0 .3-.1.6-.3.8L2.5 10.4c-.5.5-.8 1.1-.8 1.8v1.2c0 .9.7 1.6 1.6 1.6h11.4c.9 0 1.6-.7 1.6-1.6v-1.2c0-.7-.3-1.3-.8-1.8l-1.4-1.4c-.2-.2-.3-.5-.3-.8V7A4.8 4.8 0 0 0 9 2.2Z"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="visual-card__title">Nueva contraseña</div>
          <div class="visual-line visual-line--md"></div>
          <div class="visual-input"></div>
          <div class="visual-line visual-line--md"></div>
          <div class="visual-input"></div>
          <div class="visual-button visual-button--wide"></div>
        </div>
      </aside>

      <!-- Tarjeta principal -->
      <main class="reset-card">
        <transition name="fade-slide" mode="out-in">
          <section :key="currentStep" class="step-panel">
            <!-- Paso 1 -->
            <div v-if="currentStep === 1" class="step-content">
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3a5 5 0 0 0-5 5v1.6c0 .4-.1.8-.4 1.1l-1.3 1.3A3.4 3.4 0 0 0 4 14.4V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.6c0-.9-.4-1.7-1-2.3l-1.3-1.3a1.6 1.6 0 0 1-.4-1.1V8a5 5 0 0 0-5-5Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.6 12.2a2.4 2.4 0 1 1 4.8 0c0 1.2-.9 2-1.8 2.5v1.4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>

              <h1 class="step-title">¿Olvidaste tu contraseña?</h1>
              <p class="step-desc">
                No te preocupes, te enviaremos las instrucciones para restablecer tu acceso.
              </p>

              <form class="form-block" @submit.prevent="requestResetCode">
                <div class="field">
                  <label class="field-label">Correo electrónico</label>
                  <input
                    v-model.trim="email"
                    type="email"
                    class="field-input"
                    placeholder="Ingresa tu correo"
                    autocomplete="email"
                    :disabled="loading"
                  >
                </div>

                <div v-if="errorMessage" class="alert alert--error">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                    <path d="M7.5 4.5v3.5M7.5 10h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                  </svg>
                  {{ errorMessage }}
                </div>

                <div v-if="successMessage" class="alert alert--success">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                    <path
                      d="M4.5 7.5l2 2 4-4"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ successMessage }}
                </div>

                <button class="btn-primary btn-full" type="submit" :disabled="loading || !email">
                  <svg v-if="loading" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                  <span v-else>Enviar enlace de recuperación</span>
                </button>
              </form>
            </div>

            <!-- Paso 2 -->
            <div v-else-if="currentStep === 2" class="step-content">
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12a7 7 0 1 1 7 7"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5 12h4M5 12l2.4 2.4M5 12l2.4-2.4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <h1 class="step-title">Verificación de código</h1>
              <p class="step-desc">
                Enviamos un código a <strong>{{ email }}</strong>
              </p>

              <form class="form-block" @submit.prevent="verifyCode">
                <div class="otp-inputs">
                  <input
                    v-for="(digit, index) in otpDigits"
                    :key="index"
                    :ref="el => setOtpRef(el, index)"
                    v-model="otpDigits[index]"
                    type="text"
                    inputmode="numeric"
                    maxlength="1"
                    class="otp-box"
                    :disabled="loading"
                    @input="onOtpInput(index, $event)"
                    @keydown="onOtpKeydown(index, $event)"
                    @paste="onOtpPaste"
                  >
                </div>

                <div v-if="errorMessage" class="alert alert--error">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                    <path d="M7.5 4.5v3.5M7.5 10h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                  </svg>
                  {{ errorMessage }}
                </div>

                <button class="btn-primary btn-full" type="submit" :disabled="loading || !otpComplete">
                  <svg v-if="loading" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                  <span v-else>Continuar</span>
                </button>

                <p class="helper-text">
                  ¿No recibiste el correo?
                  <button type="button" class="text-link-inline" @click="resendCode" :disabled="loading">
                    Reenviar
                  </button>
                </p>
              </form>
            </div>

            <!-- Paso 3 -->
            <div v-else class="step-content">
              <div class="step-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3a5 5 0 0 0-5 5v1.6c0 .4-.1.8-.4 1.1l-1.3 1.3A3.4 3.4 0 0 0 4 14.4V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2.6c0-.9-.4-1.7-1-2.3l-1.3-1.3a1.6 1.6 0 0 1-.4-1.1V8a5 5 0 0 0-5-5Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <h1 class="step-title">Crear nueva contraseña</h1>
              <p class="step-desc">
                La contraseña debe tener al menos 8 caracteres.
              </p>

              <form class="form-block" @submit.prevent="setNewPassword">
                <div class="field">
                  <label class="field-label">Nueva contraseña</label>
                  <div class="password-row">
                    <input
                      v-model="newPassword"
                      :type="showNewPassword ? 'text' : 'password'"
                      class="field-input"
                      placeholder="Ingresa tu nueva contraseña"
                      autocomplete="new-password"
                      :disabled="loading"
                    >
                    <button type="button" class="toggle-btn" @click="showNewPassword = !showNewPassword">
                      {{ showNewPassword ? 'Ocultar' : 'Ver' }}
                    </button>
                  </div>
                </div>

                <div class="strength-bars">
                  <span :class="{ ok: passwordScore >= 1 }"></span>
                  <span :class="{ ok: passwordScore >= 2 }"></span>
                  <span :class="{ ok: passwordScore >= 3 }"></span>
                </div>

                <div class="field">
                  <label class="field-label">Confirmar contraseña</label>
                  <div class="password-row">
                    <input
                      v-model="confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      class="field-input"
                      placeholder="Repite la nueva contraseña"
                      autocomplete="new-password"
                      :disabled="loading"
                    >
                    <button type="button" class="toggle-btn" @click="showConfirmPassword = !showConfirmPassword">
                      {{ showConfirmPassword ? 'Ocultar' : 'Ver' }}
                    </button>
                  </div>
                </div>

                <div class="rules-card">
                  <p class="rules-title">Tu contraseña debe incluir:</p>
                  <ul class="rules-list">
                    <li :class="{ ok: newPassword.length >= 8 }">Mínimo 8 caracteres</li>
                    <li :class="{ ok: hasUppercase }">Al menos una mayúscula</li>
                    <li :class="{ ok: hasNumber }">Al menos un número</li>
                    <li :class="{ ok: hasSpecialChar }">Al menos un carácter especial</li>
                  </ul>
                </div>

                <div v-if="errorMessage" class="alert alert--error">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                    <path d="M7.5 4.5v3.5M7.5 10h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
                  </svg>
                  {{ errorMessage }}
                </div>

                <div v-if="successMessage" class="alert alert--success">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" stroke-width="1.4" />
                    <path
                      d="M4.5 7.5l2 2 4-4"
                      stroke="currentColor"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {{ successMessage }}
                </div>

                <button class="btn-primary btn-full" type="submit" :disabled="loading">
                  <svg v-if="loading" class="spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M12 7A5 5 0 1 1 7 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                  <span v-else>Restablecer contraseña</span>
                </button>
              </form>
            </div>
          </section>
        </transition>

        <div class="progress-dots" aria-hidden="true">
          <span :class="{ active: currentStep >= 1 }"></span>
          <span :class="{ active: currentStep >= 2 }"></span>
          <span :class="{ active: currentStep >= 3 }"></span>
        </div>

        <button class="back-link" type="button" @click="goToLogin">
          ← Volver al inicio de sesión
        </button>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { notify } from '@/services/notifications.js'
import { usersService } from '@/services/api.js'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const currentStep = ref(1)

const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const otpDigits = ref(['', '', '', ''])
const otpRefs = ref([])

const resetToken = ref('')

const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const otpComplete = computed(() => otpDigits.value.every(d => d && d.trim().length === 1))

const hasUppercase = computed(() => /[A-Z]/.test(newPassword.value))
const hasNumber = computed(() => /\d/.test(newPassword.value))
const hasSpecialChar = computed(() => /[^A-Za-z0-9]/.test(newPassword.value))
const passwordScore = computed(() => {
  let score = 0
  if (newPassword.value.length >= 8) score += 1
  if (hasUppercase.value) score += 1
  if (hasNumber.value || hasSpecialChar.value) score += 1
  return score
})

const isTokenMode = computed(() => Boolean(route.query.token || route.query.resetToken))

const goToLogin = () => {
  router.push({ name: 'login' }).catch(() => router.push('/login'))
}

const setOtpRef = (el, index) => {
  if (el) otpRefs.value[index] = el
}

const validateEmail = () => {
  if (!email.value) return 'El correo electrónico es obligatorio.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) return 'Ingresa un correo válido.'
  return ''
}

const validatePassword = () => {
  if (!newPassword.value) return 'La nueva contraseña es obligatoria.'
  if (newPassword.value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
  if (!hasUppercase.value) return 'La contraseña debe incluir una mayúscula.'
  if (!hasNumber.value) return 'La contraseña debe incluir un número.'
  if (!hasSpecialChar.value) return 'La contraseña debe incluir un carácter especial.'
  if (newPassword.value !== confirmPassword.value) return 'Las contraseñas no coinciden.'
  return ''
}

const requestResetCode = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const validationError = validateEmail()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  loading.value = true
  try {
    const res = await usersService.forgotPassword({
      email: email.value
    })

    const data = res?.data?.data ?? res?.data ?? {}
    if (data?.token) {
      resetToken.value = data.token
    }

    successMessage.value = 'Se envió un código de recuperación a tu correo.'
    notify.success('Código enviado correctamente.')

    otpDigits.value = ['', '', '', '']
    currentStep.value = 2
    await nextTick()
    otpRefs.value[0]?.focus?.()
  } catch (e) {
    errorMessage.value = e.response?.data?.message || 'No se pudo enviar el código de recuperación.'
  } finally {
    loading.value = false
  }
}

const onOtpInput = (index, event) => {
  const value = String(event.target.value || '').replace(/\D/g, '')
  otpDigits.value[index] = value.slice(-1)

  if (value && index < otpRefs.value.length - 1) {
    otpRefs.value[index + 1]?.focus?.()
  }
}

const onOtpKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus?.()
  }
}

const onOtpPaste = (event) => {
  const pasted = String(event.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 4)
  if (!pasted) return

  event.preventDefault()
  const digits = pasted.split('')
  for (let i = 0; i < 4; i++) {
    otpDigits.value[i] = digits[i] || ''
  }

  if (digits.length === 4) {
    otpRefs.value[3]?.focus?.()
  }
}

const verifyCode = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!otpComplete.value) {
    errorMessage.value = 'Ingresa el código completo.'
    return
  }

  loading.value = true
  try {
    const code = otpDigits.value.join('')

    const res = await usersService.verifyResetCode({
      email: email.value,
      code
    })

    const data = res?.data?.data ?? res?.data ?? {}
    resetToken.value = data.token || data.resetToken || resetToken.value

    successMessage.value = 'Código verificado correctamente.'
    notify.success('Código validado.')

    currentStep.value = 3
  } catch (e) {
    errorMessage.value = e.response?.data?.message || 'El código no es válido o ha expirado.'
  } finally {
    loading.value = false
  }
}

const resendCode = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    await usersService.forgotPassword({ email: email.value })
    successMessage.value = 'Se reenvi ó el código de recuperación.'
    notify.success('Código reenviado.')
  } catch (e) {
    errorMessage.value = e.response?.data?.message || 'No se pudo reenviar el código.'
  } finally {
    loading.value = false
  }
}

const setNewPassword = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  const validationError = validatePassword()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  loading.value = true
  try {
    await usersService.resetPassword({
      token: resetToken.value,
      password: newPassword.value,
      confirmPassword: confirmPassword.value
    })

    successMessage.value = 'Tu contraseña fue actualizada correctamente.'
    notify.success('Contraseña restablecida.')

    setTimeout(() => {
      goToLogin()
    }, 1400)
  } catch (e) {
    errorMessage.value = e.response?.data?.message || 'No se pudo actualizar la contraseña.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (isTokenMode.value) {
    resetToken.value = String(route.query.token || route.query.resetToken || '')
    currentStep.value = 3
  }
})
</script>

<style scoped>
.reset-view {
  min-height: 100vh;
  padding: 24px;
  background: #eef1f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reset-shell {
  width: 100%;
  max-width: 1720px;
  min-height: 860px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 28px;
  align-items: center;
}

.reset-visual {
  min-height: 760px;
  border-radius: 26px;
  background:
    radial-gradient(circle at 20% 20%, rgba(47, 111, 237, 0.10), transparent 18%),
    radial-gradient(circle at 80% 50%, rgba(15, 23, 42, 0.05), transparent 22%),
    radial-gradient(circle at 50% 90%, rgba(47, 111, 237, 0.05), transparent 16%),
    linear-gradient(180deg, #f3f5f8 0%, #e9edf3 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.08);
}

.visual-badge {
  position: absolute;
  top: 28px;
  left: 28px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  color: #111827;
  font-size: 12px;
  font-weight: 700;
  z-index: 1;
}

.visual-badge__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2f6fed;
}

.visual-card {
  position: absolute;
  width: 280px;
  min-height: 420px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.10);
  padding: 18px;
}

.visual-card__icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.visual-card__title {
  margin-top: 12px;
  font-size: 13px;
  font-weight: 800;
  color: #111827;
}

.visual-line {
  margin-top: 18px;
  width: 72%;
  height: 10px;
  border-radius: 999px;
  background: #e5e7eb;
}
.visual-line--lg {
  width: 84%;
}
.visual-line--md {
  width: 62%;
}

.visual-input {
  margin-top: 12px;
  width: 100%;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #fff;
}

.visual-button {
  margin-top: 12px;
  width: 100%;
  height: 42px;
  border-radius: 10px;
  background: #2f6fed;
}
.visual-button--wide {
  width: 100%;
}

.visual-code {
  margin-top: 54px;
  display: flex;
  justify-content: center;
  gap: 10px;
}
.visual-code span {
  width: 56px;
  height: 66px;
  border-radius: 10px;
  border: 2px solid #dbe3f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  font-weight: 700;
  color: #111827;
}

.visual-card--one {
  transform: translateX(-205px) scale(0.95);
  opacity: 0.72;
}
.visual-card--two {
  transform: translateX(-110px) scale(0.99);
  opacity: 0.88;
}
.visual-card--three {
  width: 340px;
  min-height: 520px;
  transform: translateX(70px) scale(1);
}

.reset-card {
  min-height: 760px;
  border-radius: 26px;
  background: #fff;
  padding: 30px 34px 24px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.10);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.step-panel {
  width: 100%;
  max-width: 430px;
  text-align: center;
}

.step-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.04);
}

.step-title {
  margin: 26px 0 0;
  font-size: 36px;
  line-height: 1.08;
  letter-spacing: -0.05em;
  color: #111827;
}

.step-desc {
  margin: 10px 0 0;
  font-size: 18px;
  line-height: 1.55;
  color: #6b7280;
  max-width: 30ch;
}

.form-block {
  width: 100%;
  margin-top: 28px;
  text-align: left;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.field-input {
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 0 14px;
  outline: none;
  font-size: 14px;
  color: #111827;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field-input:focus {
  border-color: #2f6fed;
  box-shadow: 0 0 0 3px rgba(47, 111, 237, 0.10);
}
.field-input:disabled {
  background: #f9fafb;
  color: #6b7280;
}

.password-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.toggle-btn {
  height: 46px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #374151;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.toggle-btn:hover {
  background: #f3f4f6;
}

.otp-inputs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 8px 0 2px;
}
.otp-box {
  width: 64px;
  height: 72px;
  border-radius: 12px;
  border: 2px solid #d7e0ef;
  background: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.otp-box:focus {
  border-color: #2f6fed;
  box-shadow: 0 0 0 3px rgba(47, 111, 237, 0.10);
}

.strength-bars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 12px 0 8px;
}
.strength-bars span {
  height: 6px;
  border-radius: 999px;
  background: #e5e7eb;
}
.strength-bars span.ok {
  background: #2f6fed;
}

.rules-card {
  margin-top: 10px;
  padding: 14px;
  border-radius: 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
}
.rules-title {
  margin: 0 0 8px;
  font-size: 13px;
  font-weight: 800;
  color: #111827;
}
.rules-list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  font-size: 13px;
  color: #6b7280;
}
.rules-list li.ok {
  color: #15803d;
  font-weight: 700;
}

.alert {
  margin-top: 14px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 11px 14px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.5;
}
.alert svg {
  flex-shrink: 0;
  margin-top: 1px;
}
.alert--error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}
.alert--success {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.btn-primary {
  min-height: 46px;
  border: none;
  border-radius: 10px;
  background: #2f6fed;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease, opacity 0.15s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
}
.btn-primary:hover {
  background: #245ed0;
  transform: translateY(-1px);
}
.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.btn-full {
  width: 100%;
  margin-top: 18px;
}

.helper-text {
  margin: 16px 0 0;
  text-align: center;
  font-size: 13px;
  color: #6b7280;
}
.text-link-inline {
  border: none;
  background: none;
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}
.text-link-inline:hover {
  text-decoration: underline;
}

.progress-dots {
  display: flex;
  gap: 10px;
  margin-top: 28px;
}
.progress-dots span {
  width: 54px;
  height: 6px;
  border-radius: 999px;
  background: #e5e7eb;
}
.progress-dots span.active {
  background: #2f6fed;
}

.back-link {
  margin-top: 18px;
  border: none;
  background: none;
  color: #6b7280;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.back-link:hover {
  color: #111827;
}

.spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.22s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 1360px) {
  .reset-shell {
    grid-template-columns: 1fr;
    max-width: 860px;
  }

  .reset-visual {
    min-height: 360px;
  }

  .visual-card--one {
    transform: translateX(-170px) scale(0.92);
  }

  .visual-card--two {
    transform: translateX(-70px) scale(0.97);
  }

  .visual-card--three {
    transform: translateX(110px) scale(1);
  }
}

@media (max-width: 900px) {
  .reset-view {
    padding: 14px;
  }

  .reset-shell {
    min-height: auto;
  }

  .reset-card {
    min-height: auto;
    padding-top: 40px;
  }

  .reset-visual {
    min-height: 260px;
  }

  .visual-card {
    display: none;
  }
}

@media (max-width: 640px) {
  .reset-card {
    border-radius: 20px;
    padding: 22px 18px;
  }

  .step-title {
    font-size: 28px;
  }

  .step-desc {
    font-size: 15px;
  }

  .otp-inputs {
    gap: 8px;
  }

  .otp-box {
    width: 52px;
    height: 62px;
    font-size: 26px;
  }

  .progress-dots span {
    width: 44px;
  }
}
</style>