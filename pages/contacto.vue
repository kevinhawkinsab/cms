<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section text-white position-relative overflow-hidden">
      <div class="hero-bg-effects">
        <div class="bg-circle bg-circle-1"></div>
        <div class="bg-circle bg-circle-2"></div>
      </div>

      <div class="container position-relative py-5">
        <div class="row">
          <div class="col-lg-8">
            <div class="availability-badge d-inline-flex align-items-center gap-2 mb-4">
              <span class="pulse-dot"></span>
              <span class="small fw-medium">Disponibles para ti</span>
            </div>

            <h1 class="display-3 fw-bold mb-4">
              Conecta con
              <span class="text-accent">Bambito</span>
            </h1>

            <p class="lead text-white-50 mb-0" style="max-width: 600px;">
              Estamos aquí para atenderte. Desde las montañas del Volcán Barú hasta tu hogar,
              queremos escucharte.
            </p>
          </div>
        </div>
      </div>

      <div class="hero-fade"></div>
    </section>

    <!-- Main Content -->
    <section class="py-5">
      <div class="container">
        <div class="row g-5">

          <!-- Contact Info Column -->
          <div class="col-lg-6 order-2 order-lg-1">
            <div class="mb-4">
              <h2 class="h3 fw-bold text-dark mb-3">Canales de contacto</h2>
              <p class="text-muted">
                Elige el método que prefieras. Respondemos en menos de 24 horas.
              </p>
            </div>

            <!-- Contact Cards -->
            <div class="d-flex flex-column gap-3 mb-4">
              <!-- Phone Card -->
              <a href="tel:+5076175000" class="contact-card text-decoration-none">
                <div class="contact-card-icon contact-card-icon-primary">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div class="flex-grow-1">
                  <p class="small fw-medium text-muted mb-1">Teléfono principal</p>
                  <p class="h6 fw-semibold text-dark mb-0">+507 617-5000</p>
                </div>
                <svg class="contact-card-arrow" width="20" height="20" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <!-- WhatsApp Card -->
              <a href="https://wa.me/50766778000" target="_blank" rel="noopener noreferrer"
                class="contact-card contact-card-whatsapp text-decoration-none">
                <div class="contact-card-icon contact-card-icon-whatsapp">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div class="flex-grow-1">
                  <p class="small fw-medium text-muted mb-1">WhatsApp</p>
                  <p class="h6 fw-semibold text-dark mb-0">+507 6677-8000</p>
                </div>
                <svg class="contact-card-arrow" width="20" height="20" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>

              <!-- Email Card -->
              <a href="mailto:info@bambitospringwater.com" class="contact-card text-decoration-none">
                <div class="contact-card-icon contact-card-icon-primary">
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="flex-grow-1 min-width-0">
                  <p class="small fw-medium text-muted mb-1">Correo electrónico</p>
                  <p class="h6 fw-semibold text-dark mb-0 text-truncate">info@bambitospringwater.com</p>
                </div>
                <svg class="contact-card-arrow" width="20" height="20" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <!-- Location Card -->
            <div class="card border rounded-4 overflow-hidden mb-4">
              <div class="card-body p-4">
                <div class="d-flex align-items-start gap-3">
                  <div class="contact-card-icon contact-card-icon-primary flex-shrink-0">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p class="small fw-medium text-muted mb-1">Nuestra ubicación</p>
                    <p class="h6 fw-semibold text-dark mb-1">Bambito, Volcán</p>
                    <p class="text-muted mb-0">Provincia de Chiriquí, Panamá</p>
                  </div>
                </div>
              </div>

              <!-- Map Embed -->
              <div class="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15746.123456789!2d-82.6234!3d8.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa61234567890ab%3A0x1234567890abcdef!2sBambito%2C%20Volc%C3%A1n%2C%20Panam%C3%A1!5e0!3m2!1ses!2spa!4v1234567890"
                  width="100%" height="100%" style="border: 0" allowfullscreen loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade" title="Ubicación de Bambito Spring Water"></iframe>
              </div>
            </div>

            <!-- Social Links -->
            <div>
              <p class="small fw-medium text-muted mb-3">Síguenos en redes</p>
              <div class="d-flex gap-2">
                <a href="https://facebook.com/bambitospringwater" target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook" class="social-link">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://instagram.com/bambitospringwater" target="_blank" rel="noopener noreferrer"
                  aria-label="Instagram" class="social-link">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form Column -->
          <div class="col-lg-6 order-1 order-lg-2">
            <div class="form-card card border-0 rounded-4 p-4 p-md-5">
              <div class="mb-4">
                <h2 class="h3 fw-bold text-dark mb-2">Envíanos un mensaje</h2>
                <p class="text-muted mb-0">Completa el formulario y te responderemos pronto.</p>
              </div>

              <!-- Success Message -->
              <div v-if="isSubmitted" class="text-center py-5">
                <div class="success-icon mx-auto mb-4">
                  <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="h5 fw-bold text-dark mb-2">Mensaje enviado</h3>
                <p class="text-muted mb-0">Gracias por contactarnos. Te responderemos pronto.</p>
              </div>

              <!-- Form -->
              <form v-else @submit.prevent="handleSubmit">
                <!-- Name Field -->
                <div class="form-floating mb-3">
                  <input id="name" v-model="form.name" type="text" class="form-control" placeholder="Nombre completo"
                    required />
                  <label for="name">Nombre completo</label>
                </div>

                <!-- Email Field -->
                <div class="form-floating mb-3">
                  <input id="email" v-model="form.email" type="email" class="form-control"
                    placeholder="Correo electrónico" required />
                  <label for="email">Correo electrónico</label>
                </div>

                <!-- Phone Field -->
                <div class="form-floating mb-3">
                  <input id="phone" v-model="form.phone" type="tel" class="form-control"
                    placeholder="Teléfono (opcional)" />
                  <label for="phone">Teléfono (opcional)</label>
                </div>

                <!-- Subject Field -->
                <div class="form-floating mb-3">
                  <select id="subject" v-model="form.subject" class="form-select" required>
                    <option value="" disabled>Selecciona un asunto</option>
                    <option value="ventas">Ventas y distribución</option>
                    <option value="servicio">Servicio al cliente</option>
                    <option value="empresarial">Cuenta empresarial</option>
                    <option value="otro">Otro</option>
                  </select>
                  <label for="subject">Asunto</label>
                </div>

                <!-- Message Field -->
                <div class="form-floating mb-4">
                  <textarea id="message" v-model="form.message" class="form-control" placeholder="Tu mensaje"
                    style="height: 120px" required></textarea>
                  <label for="message">Tu mensaje</label>
                </div>

                <!-- Submit Button -->
                <button type="submit" :disabled="isLoading"
                  class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center gap-2">
                  <template v-if="isLoading">
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Enviando...</span>
                  </template>
                  <template v-else>
                    <span>Enviar mensaje</span>
                    <svg class="btn-arrow" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </template>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="border-top bg-white py-5">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-sm-4">
            <div class="trust-icon mx-auto mb-3">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="h6 fw-semibold text-dark mb-1">Respuesta rápida</h3>
            <p class="small text-muted mb-0">Menos de 24 horas</p>
          </div>
          <div class="col-sm-4">
            <div class="trust-icon mx-auto mb-3">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="h6 fw-semibold text-dark mb-1">100% seguro</h3>
            <p class="small text-muted mb-0">Tus datos protegidos</p>
          </div>
          <div class="col-sm-4">
            <div class="trust-icon mx-auto mb-3">
              <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="h6 fw-semibold text-dark mb-1">Hecho en Panamá</h3>
            <p class="small text-muted mb-0">Volcán Barú, Chiriquí</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSeo } from '~/composables/useSeo'

const { public: { siteUrl } } = useRuntimeConfig()

useSeo({
  title:       'Contacto | Bambito Spring Water',
  description: 'Contáctanos para pedidos, distribución, eventos o consultas sobre nuestro agua de manantial volcánica del Volcán Barú, Chiriquí, Panamá.',
  keywords: [
    'contacto Bambito',
    'contactar Bambito Spring Water',
    'pedidos agua manantial Panamá',
    'distribución agua Bambito',
    'información Bambito Spring Water',
    'WhatsApp Bambito',
    'teléfono Bambito',
    'correo Bambito Spring Water'
  ],
  type:            'website',
  image:           `${siteUrl}/img/images/gota.jpg`,
  twitterImageAlt: 'Contáctanos — Bambito Spring Water',
  url:             `${siteUrl}/contacto`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type':    'ContactPage',
      '@id':      `${siteUrl}/contacto#contactpage`,
      'name':     'Contacto — Bambito Spring Water',
      'url':      `${siteUrl}/contacto`,
      'inLanguage': 'es-PA',
      'isPartOf': { '@id': `${siteUrl}/#website` },
      'about':    { '@id': `${siteUrl}/#organization` }
    },
    {
      '@context': 'https://schema.org',
      '@type':    'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Inicio',   'item': `${siteUrl}/` },
        { '@type': 'ListItem', 'position': 2, 'name': 'Contacto', 'item': `${siteUrl}/contacto` }
      ]
    }
  ]
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/contacto` },
    { rel: 'alternate', hreflang: 'es',        href: `${siteUrl}/contacto` },
    { rel: 'alternate', hreflang: 'es-PA',     href: `${siteUrl}/contacto` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/contacto` }
  ]
})

useSeoMeta({
  ogTitle:            'Contacto | Bambito Spring Water',
  ogDescription:      'Contáctanos para pedidos, distribución, eventos o consultas sobre nuestro agua de manantial volcánica del Volcán Barú, Chiriquí, Panamá.',
  ogUrl:              `${siteUrl}/contacto`,
  ogType:             'website',
  ogImage:            `${siteUrl}/img/images/gota.jpg`,
  ogImageAlt:         'Contáctanos — Bambito Spring Water',
  ogImageWidth:       '1200',
  ogImageHeight:      '630',
  twitterTitle:       'Contacto | Bambito Spring Water',
  twitterDescription: 'Contáctanos para pedidos, distribución, eventos o consultas sobre nuestro agua de manantial volcánica del Volcán Barú, Chiriquí, Panamá.',
  twitterImage:       `${siteUrl}/img/images/gota.jpg`,
  twitterImageAlt:    'Contáctanos — Bambito Spring Water'
})

const form = reactive({
  name: '', email: '', phone: '', subject: '', message: ''
})

const isLoading   = ref(false)
const isSubmitted = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  console.log('Form submitted:', form)
  isLoading.value   = false
  isSubmitted.value = true
}
</script>

<style scoped>
/* Variables */
:root {
  --color-primary: #14b8a6;
  --color-primary-dark: #0d9488;
  --color-primary-light: rgba(20, 184, 166, 0.1);
  --color-success: #22c55e;
  --color-success-light: rgba(34, 197, 94, 0.1);
  --color-dark: #0f172a;
  --color-bg: #f8fafa;
}

.contact-page {
  background-color: #f8fafa;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #0d4a4a 0%, #0a3d3d 50%, #082e2e 100%);
  padding: 5rem 0 7rem;
}

.hero-bg-effects {
  position: absolute;
  inset: 0;
  opacity: 0.1;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
}

.bg-circle-1 {
  top: 20px;
  left: 10px;
  width: 288px;
  height: 288px;
  background: rgba(255, 255, 255, 0.2);
}

.bg-circle-2 {
  bottom: 10px;
  right: 20px;
  width: 384px;
  height: 384px;
  background: rgba(20, 184, 166, 0.3);
}

.hero-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 96px;
  background: linear-gradient(to top, #f8fafa, transparent);
}

.availability-badge {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 50px;
  padding: 0.5rem 1rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #14b8a6;
  border-radius: 50%;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.text-accent {
  color: #14b8a6;
}

/* Contact Cards */
.contact-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: rgba(20, 184, 166, 0.5);
  box-shadow: 0 10px 40px rgba(20, 184, 166, 0.08);
  transform: translateY(-2px);
}

.contact-card:hover .contact-card-icon-primary {
  background-color: #14b8a6;
  color: #fff;
}

.contact-card:hover .contact-card-icon-primary svg {
  stroke: #fff;
}

.contact-card:hover .h6 {
  color: #14b8a6 !important;
}

.contact-card:hover .contact-card-arrow {
  color: #14b8a6;
  transform: translateX(4px);
}

.contact-card-whatsapp:hover {
  border-color: rgba(34, 197, 94, 0.5);
  box-shadow: 0 10px 40px rgba(34, 197, 94, 0.08);
}

.contact-card-whatsapp:hover .contact-card-icon-whatsapp {
  background-color: #22c55e;
  color: #fff;
}

.contact-card-whatsapp:hover .h6 {
  color: #22c55e !important;
}

.contact-card-whatsapp:hover .contact-card-arrow {
  color: #22c55e;
}

.contact-card-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.contact-card-icon-primary {
  background-color: rgba(20, 184, 166, 0.1);
  color: #14b8a6;
}

.contact-card-icon-primary svg {
  stroke: #14b8a6;
  transition: stroke 0.3s ease;
}

.contact-card-icon-whatsapp {
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.contact-card-arrow {
  color: #cbd5e1;
  transition: all 0.3s ease;
  flex-shrink: 0;
  align-self: center;
}

.min-width-0 {
  min-width: 0;
}

/* Map */
.map-container {
  height: 256px;
  background-color: #e2e8f0;
}

.map-container iframe {
  filter: grayscale(100%);
  transition: filter 0.5s ease;
}

.map-container:hover iframe {
  filter: grayscale(0%);
}

/* Social Links */
.social-link {
  width: 44px;
  height: 44px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: #14b8a6;
  border-color: #14b8a6;
  color: #fff;
}

/* Form Card */
.form-card {
  background: #fff;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.08);
}

@media (min-width: 992px) {
  .form-card {
    position: sticky;
    top: 2rem;
  }
}

/* Form Styles */
.form-control,
.form-select {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background-color: #f8fafa;
  padding: 1rem;
  transition: all 0.3s ease;
}

.form-control:focus,
.form-select:focus {
  background-color: #fff;
  border-color: #14b8a6;
  box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.15);
}

.form-floating>label {
  color: #64748b;
}

.form-floating>.form-control:focus~label,
.form-floating>.form-control:not(:placeholder-shown)~label,
.form-floating>.form-select~label {
  color: #14b8a6;
}

/* Primary Button */
.btn-primary {
  background-color: #14b8a6;
  border-color: #14b8a6;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0d9488;
  border-color: #0d9488;
}

.btn-primary:focus {
  box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.25);
}

.btn-primary:disabled {
  background-color: rgba(20, 184, 166, 0.5);
  border-color: rgba(20, 184, 166, 0.5);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

/* Success Icon */
.success-icon {
  width: 64px;
  height: 64px;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  animation: bounce 1s infinite;
}

/* Trust Icons */
.trust-icon {
  width: 56px;
  height: 56px;
  background-color: rgba(20, 184, 166, 0.1);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #14b8a6;
}

.trust-icon svg {
  stroke: #14b8a6;
}

/* Animations */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

/* Responsive */
@media (max-width: 991.98px) {
  .hero-section {
    padding: 3rem 0 5rem;
  }

  .display-3 {
    font-size: 2.5rem;
  }
}
</style>