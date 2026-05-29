<template>
  <div class="sostenibilidad-page">
    <section class="hero-section" :style="heroStyle">
      <div class="hero-overlay"></div>

      <div class="container position-relative hero-container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <p class="eyebrow mb-3">Compromiso ambiental</p>
            <h1 class="hero-title mb-3">Sostenibilidad</h1>
            <p class="hero-copy mb-4">
              Nuestro compromiso con el medio ambiente se refleja en acciones concretas que promueven el reciclaje,
              la eficiencia y la protección de nuestra fuente natural.
            </p>

            <div class="d-flex flex-wrap gap-2">
              <span class="chip">175,000+ botellas recuperadas</span>
              <span class="chip">Desde 2018</span>
              <span class="chip">Economía circular</span>
              <span class="chip">Protección del manantial</span>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="hero-card">
              <p class="card-kicker mb-2">Bambito y el planeta</p>
              <h2 class="card-title mb-3">Acciones que generan impacto real</h2>
              <p class="card-text mb-4">
                Desarrollamos iniciativas que reducen nuestro impacto ambiental y refuerzan nuestro compromiso con
                una operación más responsable y sostenible.
              </p>

              <div class="mini-grid">
                <div class="mini-item">
                  <span class="mini-label">Programa</span>
                  <strong>Reciclaje activo</strong>
                </div>
                <div class="mini-item">
                  <span class="mini-label">Meta</span>
                  <strong>Menor huella ambiental</strong>
                </div>
                <div class="mini-item">
                  <span class="mini-label">Enfoque</span>
                  <strong>Economía circular</strong>
                </div>
                <div class="mini-item">
                  <span class="mini-label">Alianza</span>
                  <strong>Fundación TRENCO</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell" id="reciclaje">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6">
            <p class="section-kicker">Impacto medible</p>
            <h2 class="section-title">Un programa que transforma residuos en valor</h2>
            <p class="section-copy">
              Trabajamos activamente en la recuperación y reciclaje de envases PET y vidrio retornable, reduciendo
              nuestro impacto ambiental y promoviendo una economía circular que beneficie tanto al entorno como a la comunidad.
            </p>

            <div class="stat-row">
              <div class="stat-card">
                <span class="stat-number">175,000+</span>
                <span class="stat-label">botellas recuperadas</span>
              </div>
              <div class="stat-card">
                <span class="stat-number">2018</span>
                <span class="stat-label">inicio del programa</span>
              </div>
            </div>

            <p class="section-copy mb-0">
              Este esfuerzo forma parte de una visión de largo plazo orientada a minimizar desperdicios, optimizar procesos
              y contribuir activamente al cuidado del planeta.
            </p>
          </div>

          <div class="col-lg-6">
            <div class="image-panel image-panel-large image-source-recycle">
              <div class="image-panel-caption">
                <span>Reciclaje activo</span>
                <strong>Envases PET y vidrio retornable</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell section-shell-alt" id="iniciativas">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Nuestras iniciativas</p>
          <h2 class="section-title section-title-center">Acciones que sostienen nuestra operación</h2>
          <p class="section-copy section-copy-center">
            Cada iniciativa aporta a una operación más eficiente, responsable y alineada con el entorno natural que nos inspira.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-recycle"></i>
              </div>
              <h4 class="value-title">Reciclaje activo</h4>
              <p class="value-text mb-0">
                Programa de recuperación de envases PET y vidrio retornable.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-bolt"></i>
              </div>
              <h4 class="value-title">Eficiencia energética</h4>
              <p class="value-text mb-0">
                Optimización de procesos para reducir el consumo energético.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-tint"></i>
              </div>
              <h4 class="value-title">Protección del manantial</h4>
              <p class="value-text mb-0">
                Preservación activa de nuestra fuente de agua natural.
              </p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-hands-helping"></i>
              </div>
              <h4 class="value-title">Apoyo comunitario</h4>
              <p class="value-text mb-0">
                Alianza con Fundación TRENCO para comunidades sin acceso a agua.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6">
            <p class="section-kicker">Responsabilidad social</p>
            <h2 class="section-title">Más allá del producto, un compromiso con las personas</h2>
            <p class="section-copy">
              El compromiso ambiental también se traduce en acciones de impacto social. A través de alianzas estratégicas,
              contribuimos con iniciativas que buscan mejorar el acceso al agua y fortalecer comunidades que lo necesitan.
            </p>

            <div class="soft-card p-4">
              <p class="card-kicker mb-2">Alianza destacada</p>
              <h3 class="card-title mb-3">Fundación TRENCO</h3>
              <p class="section-copy mb-0">
                Trabajamos en conjunto para apoyar comunidades sin acceso a agua potable, fortaleciendo una visión
                de sostenibilidad con enfoque humano.
              </p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="image-panel image-panel-large" style="background-image: url('img/images/recicla-2.jpg');">
              <div class="image-panel-caption">
                <span>Impacto social</span>
                <strong>Compromiso con las comunidades</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="section-shell section-shell-alt" id="preguntas-sostenibilidad">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Preguntas frecuentes</p>
          <h2 class="section-title section-title-center">Sostenibilidad en acciones concretas</h2>
          <p class="section-copy section-copy-center">
            Respuestas sobre nuestro programa de reciclaje y las alianzas que amplifican el impacto.
          </p>
        </div>

        <div class="context-faq-grid">
          <article v-for="faq in contextualFaqs" :key="faq.question" class="context-faq-card">
            <h3>{{ faq.question }}</h3>
            <p>{{ faq.answer }}</p>
          </article>
        </div>
      </div>
    </section> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSeo } from '~/composables/useSeo'

const { public: { siteUrl } } = useRuntimeConfig()

const contextualFaqs = [
  {
    question: '¿Cuál es el programa de reciclaje de Bambito?',
    answer:
      'Bambito mantiene un programa activo de recuperación de envases PET y vidrio retornable desde 2018. A través de esta iniciativa se han recuperado más de 175,000 botellas, promoviendo economía circular y menor impacto ambiental.'
  },
  {
    question: '¿Con quién trabajan en materia de sostenibilidad?',
    answer:
      'Bambito trabaja junto a Fundación TRENCO en iniciativas ambientales y sociales, incluyendo reciclaje, apoyo comunitario y acciones para comunidades sin acceso a agua potable.'
  }
]

useSeo({
  title:       'Sostenibilidad | Bambito Spring Water',
  description: 'El compromiso de Bambito con la sostenibilidad: reciclaje, reducción de plásticos, eficiencia energética y apoyo a comunidades en Panamá.',

  keywords: [
    'sostenibilidad Bambito',
    'reciclaje agua Panamá',
    'medio ambiente',
    'agua embotellada sostenible panamá',
    'reciclaje botellas PET',
    'vidrio retornable Panamá',
    'Fundación TRENCO',
    'economía circular agua',
    'reducción plásticos Panamá',
    'compromiso ambiental Bambito'
  ],
  type:            'website',

  image:           `${siteUrl}/img/images/recicla.jpg`,
  twitterImageAlt: 'Sostenibilidad — Bambito Spring Water, compromiso ambiental con el agua de manantial volcánica',
  url:             `${siteUrl}/sostenibilidad`,

  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type':    'WebPage',
      '@id':      `${siteUrl}/sostenibilidad#webpage`,
      'name':     'Sostenibilidad | Bambito Spring Water',
      'url':      `${siteUrl}/sostenibilidad`,
      'description': 'Conoce cómo Bambito protege el medio ambiente con prácticas sostenibles, reciclaje y conservación del agua del Volcán Barú.',
      'inLanguage': 'es-PA',
      'isPartOf': { '@id': `${siteUrl}/#website` },
      'about':    { '@id': `${siteUrl}/#organization` }
    },
    {
      '@context': 'https://schema.org',
      '@type':    'FAQPage',
      'mainEntity': contextualFaqs.map((faq) => ({
        '@type': 'Question',
        'name':  faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text':  faq.answer
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type':    'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Inicio',         'item': `${siteUrl}/`               },
        { '@type': 'ListItem', 'position': 2, 'name': 'Sostenibilidad', 'item': `${siteUrl}/sostenibilidad` }
      ]
    }
  ]
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/sostenibilidad`  },
    { rel: 'alternate', hreflang: 'es',        href: `${siteUrl}/sostenibilidad` },
    { rel: 'alternate', hreflang: 'es-PA',     href: `${siteUrl}/sostenibilidad` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/sostenibilidad` }
  ]
})

useSeoMeta({
  ogTitle:       'Sostenibilidad | Bambito Spring Water',
  ogDescription: 'El compromiso de Bambito con la sostenibilidad: reciclaje, reducción de plásticos, eficiencia energética y apoyo a comunidades en Panamá.',
  ogUrl:         `${siteUrl}/sostenibilidad`,
  ogType:        'website',
  ogImage:       `${siteUrl}/img/images/recicla.jpg`,
  ogImageAlt:    'Sostenibilidad — Bambito Spring Water, compromiso ambiental con el agua de manantial volcánica',
  ogImageWidth:  '1200',
  ogImageHeight: '630',

  twitterTitle:       'Sostenibilidad | Bambito Spring Water',
  twitterDescription: 'El compromiso de Bambito con la sostenibilidad: reciclaje, reducción de plásticos, eficiencia energética y apoyo a comunidades en Panamá.',
  twitterImage:       `${siteUrl}/img/images/recicla.jpg`,
  twitterImageAlt:    'Sostenibilidad — Bambito Spring Water, compromiso ambiental con el agua de manantial volcánica'
})

const heroStyle = computed(() => ({
  backgroundImage:
    "linear-gradient(180deg, rgba(58, 88, 255, 0.18) 0%, rgba(70, 98, 255, 0.2) 100%), url('/img/images/envasado.jpg')"
}))
</script>

<style scoped>
.sostenibilidad-page {
  background: #f6f3ee;
  color: #18211b;
}

.hero-section {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: center;
  padding: 96px 0 72px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 35%),
    linear-gradient(180deg, rgba(8, 16, 11, 0.22) 0%, rgba(8, 16, 11, 0.72) 100%);
  backdrop-filter: blur(1px);
}

.hero-container {
  position: relative;
  z-index: 1;
}

.eyebrow,
.section-kicker,
.card-kicker {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
}

.section-kicker,
.card-kicker {
  color: #6b766f;
}

.hero-title {
  max-width: 18ch;
  color: #fff;
  font-weight: 600;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.04;
  letter-spacing: -0.04em;
}

.hero-copy {
  max-width: 58ch;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.8;
}

.chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.65rem 1rem;
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-size: 0.92rem;
  line-height: 1;
}

.context-faq-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.context-faq-card {
  height: 100%;
  padding: 1.35rem;
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(24, 33, 27, 0.08);
  box-shadow: 0 14px 36px rgba(24, 33, 27, 0.05);
}

.context-faq-card h3 {
  font-size: 1.08rem;
  font-weight: 700;
  color: #18211b;
  margin-bottom: 0.75rem;
}

.context-faq-card p {
  color: #5c665f;
  line-height: 1.75;
  margin-bottom: 0;
}

.hero-card,
.soft-card,
.soft-banner,
.value-card,
.stat-card {
  border: 1px solid rgba(24, 33, 27, 0.08);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 18px 50px rgba(24, 33, 27, 0.06);
}

.hero-card {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(12px);
}

.card-title,
.section-title,
.cta-title {
  font-weight: 600;
  letter-spacing: -0.03em;
}

.card-title {
  font-size: 1.3rem;
  line-height: 1.25;
  color: #18211b;
}

.card-text,
.section-copy,
.cta-copy,
.value-text {
  color: #5c665f;
  line-height: 1.85;
}

.section-shell {
  padding: 5.5rem 0;
}

.section-shell-tight {
  padding-top: 0;
  padding-bottom: 0;
}

.section-shell-alt {
  background: rgba(255, 255, 255, 0.46);
}

.section-title {
  font-size: clamp(1.7rem, 3vw, 2.6rem);
  line-height: 1.12;
  color: #18211b;
  margin-bottom: 1rem;
}

.section-title-center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.section-copy {
  max-width: 62ch;
  font-size: 1rem;
}

.section-copy-center {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.soft-banner {
  padding: 1.25rem 1.35rem;
  background: #fff;
}

.soft-banner-text {
  color: #405047;
  line-height: 1.75;
}

.image-panel {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
  box-shadow: 0 22px 60px rgba(24, 33, 27, 0.14);
  border: 1px solid rgba(24, 33, 27, 0.06);
}

.image-panel-large {
  min-height: 480px;
}

.image-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 19, 14, 0.05), rgba(11, 19, 14, 0.22));
}

.image-panel-caption {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 20px;
  z-index: 1;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.84);
  color: #18211b;
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.image-panel-caption span {
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #66716a;
}

.image-panel-caption strong {
  font-size: 0.95rem;
  font-weight: 600;
}

.image-source-recycle {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.28)),
    url('/img/images/recicla.jpg');
}

.image-source-social {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.28)),
    url('/img/images/planeta.jpg');
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.stat-card {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  line-height: 1.1;
  font-weight: 700;
  color: #18211b;
  letter-spacing: -0.03em;
}

.stat-label {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.92rem;
  color: #5c665f;
}

.mini-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.mini-item {
  padding: 0.9rem;
  border-radius: 18px;
  background: #f8faf8;
  border: 1px solid rgba(24, 33, 27, 0.06);
}

.mini-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #6f7a73;
}

.value-card {
  padding: 1.4rem;
  background: rgba(255, 255, 255, 0.84);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.value-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 50px rgba(24, 33, 27, 0.1);
}

.value-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  display: grid;
  place-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #0f6d3b;
  background: rgba(134, 188, 66, 0.12);
}

.value-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.6rem;
  color: #18211b;
}

.cta-section {
  padding: 0 0 5rem;
}

.cta-card {
  padding: 1.6rem;
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(20, 42, 28, 0.98), rgba(23, 69, 39, 0.92));
  color: #fff;
  box-shadow: 0 22px 60px rgba(24, 33, 27, 0.18);
}

.cta-title {
  color: #fff;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  line-height: 1.15;
}

.cta-copy {
  color: rgba(255, 255, 255, 0.82);
}

.cta-btn {
  border-radius: 999px;
  font-weight: 600;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

@media (max-width: 991.98px) {
  .hero-section {
    min-height: auto;
    padding: 88px 0 56px;
  }

  .hero-title {
    max-width: 100%;
  }

  .image-panel-large {
    min-height: 360px;
  }

  .mini-grid,
  .stat-row {
    grid-template-columns: 1fr;
  }

  .context-faq-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575.98px) {
  .section-shell {
    padding: 4rem 0;
  }

  .hero-title {
    font-size: 1.9rem;
  }

  .hero-copy,
  .section-copy,
  .soft-banner-text {
    font-size: 0.98rem;
  }

  .soft-card,
  .hero-card,
  .soft-banner,
  .value-card {
    border-radius: 22px;
  }
}
</style>
