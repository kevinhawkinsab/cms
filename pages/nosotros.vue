<template>
  <div class="nosotros-page">
    <section class="hero-section" :style="heroStyle">
      <div class="hero-overlay"></div>

      <div class="container position-relative hero-container">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <p class="eyebrow mb-3">Nuestra historia</p>
            <h1 class="hero-title mb-3">Conoce la historia detrás de Bambito Spring Water</h1>
            <p class="hero-copy mb-4">
              Nacemos del Volcán Barú, en las tierras altas de Chiriquí, donde el agua recorre un viaje natural
              enriquecido por la geología volcánica antes de llegar a tus manos.
            </p>

            <div class="d-flex flex-wrap gap-2">
              <span class="chip">Origen volcánico</span>
              <span class="chip">ISO 9001</span>
              <span class="chip">Premios internacionales</span>
              <span class="chip">Compromiso sostenible</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell section-shell-tight" style="margin-top: 4rem;">
      <div class="container">
        <div class="soft-banner text-center shadow">
          <p class="section-kicker mb-3">Quiénes somos</p>
          <h2 class="fs-4 mb-3 text-dark">Agua con identidad, pureza y propósito</h2>
          <p class="soft-banner-text mb-0">
            Bambito Spring Water nace de un manantial ubicado en las faldas del majestuoso Volcán Barú, en las tierras altas
            de Chiriquí, Panamá. Nuestro compromiso es llevar al consumidor un producto natural, auténtico, saludable
            y responsable.
          </p>
        </div>
      </div>
    </section>

    <section class="section-shell" id="historia">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6">
            <p class="section-kicker">Nuestra historia</p>
            <h2 class="section-title">Un origen que define la calidad</h2>
            <p class="section-copy">
              Bambito Spring Water nace de un manantial ubicado en las faldas del majestuoso Volcán Barú,
              en las tierras altas de Chiriquí, Panamá. Nuestra agua realiza un viaje milenario a través de
              formaciones rocosas volcánicas, enriqueciéndose naturalmente con minerales esenciales.
            </p>
            <p class="section-copy mb-0">
              Desde nuestros inicios, nos comprometimos a llevar al consumidor un producto natural, auténtico,
              saludable y responsable. Cada botella de Bambito preserva la pureza y el equilibrio mineral que
              solo la naturaleza puede otorgar.
            </p>
          </div>

          <div class="col-lg-6">
            <div class="image-panel image-panel-large" style="background-image: url('/img/images/volcan-3.jpg');">
              <div class="image-panel-caption">
                <span>Origen natural</span>
                <strong>Volcán Barú, Chiriquí</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell section-shell-alt" id="mision-vision">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6 order-lg-2">
            <p class="section-kicker">Propósito</p>
            <h2 class="section-title">Nuestra misión y visión</h2>

            <div class="mission-vision-stack">
              <div class="soft-card p-3">
                <p class="card-kicker mb-2">Misión</p>
                <p class="section-copy mb-0">
                  Ofrecer agua de manantial de la más alta calidad, preservando su pureza natural desde el origen
                  hasta el consumidor final, mientras promovemos prácticas sostenibles que protejan nuestro medio ambiente.
                </p>
              </div>

              <div class="soft-card p-3">
                <p class="card-kicker mb-2">Visión</p>
                <p class="section-copy mb-0">
                  Ser la marca de agua premium líder en Centroamérica, reconocida por la excelencia de nuestro producto
                  y nuestro compromiso con la sostenibilidad y el bienestar de las comunidades.
                </p>
              </div>
            </div>
          </div>

          <div class="col-lg-6 order-lg-1">
            <div class="image-panel image-panel-tall image-source-purpose"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-shell" id="valores">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Nuestros valores</p>
          <h2 class="section-title section-title-center">Lo que define nuestra forma de trabajar</h2>
          <p class="section-copy section-copy-center">
            Naturalidad, excelencia y sostenibilidad son los principios que guían cada paso de Bambito Spring Water.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-leaf"></i>
              </div>
              <h4 class="value-title">Naturalidad</h4>
              <p class="value-text mb-0">
                Preservamos la esencia natural de nuestra agua, sin aditivos ni alteraciones.
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-award"></i>
              </div>
              <h4 class="value-title">Excelencia</h4>
              <p class="value-text mb-0">
                Certificación ISO 9001 y múltiples premios internacionales respaldan nuestra calidad.
              </p>
            </div>
          </div>

          <div class="col-md-4">
            <div class="value-card h-100">
              <div class="value-icon">
                <i class="fas fa-recycle"></i>
              </div>
              <h4 class="value-title">Sostenibilidad</h4>
              <p class="value-text mb-0">
                Programa de reciclaje activo con más de 175,000 botellas recuperadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
        <section class="video-story-section position-relative overflow-hidden">
      <!-- Background decor -->
      <div class="video-bg-decoration"></div>

      <div class="container position-relative z-2">
        <div class="row align-items-center g-5">

          <!-- Content -->
          <div class="col-lg-5">
            <div class="pe-lg-4">

              <span class="badge rounded-pill bg-light text-bsw-secondary border px-3 py-2 mb-3">
                Desde el manantial
              </span>

              <h2 class="video-title mt-3">
                Descubre el origen de Bambito
              </h2>

              <p class="video-text mt-4">
                Nacida en las tierras altas del Volcán Barú, Bambito Spring Water
                fluye desde un entorno protegido que preserva su pureza y riqueza mineral.
                Conoce el paisaje, la historia y el origen que hacen única cada gota.
              </p>

              <div class="d-flex flex-wrap gap-3 mt-4">
                <span class="video-chip">
                  <i class="bi bi-droplet-fill"></i>
                  Agua de Manantial
                </span>

                <span class="video-chip">
                  <i class="bi bi-geo-alt-fill"></i>
                  Chiriquí · Panamá
                </span>
              </div>
            </div>
          </div>

          <!-- Video -->
          <div class="col-lg-7">
            <div class="video-card">
              <div class="video-frame">
                <iframe
                  src="https://www.youtube.com/embed/x6BgcYBvc0k?autoplay=1&mute=1&playsinline=1&rel=0"
                  title="Bambito Spring Water"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  loading="eager"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="section-shell section-shell-alt" id="reconocimiento">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Reconocimiento</p>
          <h2 class="section-title section-title-center">Reconocida por el mundo. Nacida en Chiriquí.</h2>
          <p class="section-copy section-copy-center">
            Una línea de tiempo para comunicar premios, trazabilidad y consistencia.
          </p>
        </div>

        <div class="row g-4">
          <div class="col-lg-7">
            <div class="soft-card bg-white p-4 h-100">
              <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
                <div>
                  <p class="card-kicker mb-1">Premios</p>
                  <h3 class="card-title mb-0">Fine Waters Taste Awards</h3>
                </div>
                <span class="chip chip-dark">Reconocimiento internacional</span>
              </div>

              <div class="timeline-card">
                <div class="timeline-item" v-for="award in awards" :key="award.year + award.location + award.type">
                  <div class="timeline-dot" :class="award.type"></div>
                  <div class="timeline-content">
                    <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                      <div>
                        <h3 class="timeline-title mb-1">{{ award.year }} · {{ award.location }}</h3>
                        <p class="timeline-subtitle mb-0">{{ award.description }}</p>
                      </div>
                      <span class="timeline-tag">{{ award.label }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="soft-card h-100 d-flex flex-column justify-content-between p-4">
              <div>
                <p class="card-kicker mb-2">Certificación</p>
                <h3 class="card-title mb-3">ISO 9001</h3>
                <p class="section-copy mb-0">
                  Un sello que garantiza confianza y calidad internacional. Respaldamos pureza, trazabilidad
                  y consistencia desde el manantial hasta el embotellado.
                </p>
              </div>

              <div class="iso-box mt-4">
                <img
                  src="/img/images/Certificado.png"
                  alt="Certificación ISO 9001 Bambito"
                  class="img-fluid iso-image"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <section class="section-shell" id="preguntas-nosotros">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Preguntas frecuentes</p>
          <h2 class="section-title section-title-center">Confianza, calidad y reconocimientos</h2>
          <p class="section-copy section-copy-center">
            Respuestas breves sobre los respaldos que forman parte de la historia de Bambito.
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

const siteUrl = 'https://www.bambitospringwater.com'
const pageUrl = `${siteUrl}/nosotros`

const contextualFaqs = [
  {
    question: '¿Bambito tiene certificación ISO 9001?',
    answer: 'Sí. Bambito cuenta con certificación ISO 9001, un estándar internacional de gestión de calidad que respalda la consistencia de sus procesos y controles desde el origen hasta el embotellado.'
  },
  {
    question: '¿Cuántos premios internacionales ha ganado Bambito?',
    answer: 'Bambito ha ganado 6 premios internacionales Fine Waters Taste Awards entre 2019 y 2025, incluyendo medallas de oro y bronce en competencias celebradas en Estocolmo, Guangzhou, Bled, Los Ángeles, Atenas y Atlanta.'
  }
]

useSeo({
  title: 'Nosotros | Bambito Spring Water',
  description: 'Conoce a Bambito Spring Water: la marca panameña de agua de manantial volcánica del Volcán Barú con reconocimientos internacionales.',
  keywords: ['nosotros', 'historia', 'bambito', 'marca'],
  type: 'website',
  image: `${siteUrl}/img/images/bsw1.jpg`,
  url: pageUrl,                 
  canonical: pageUrl,          
  twitterImageAlt: 'Nosotros — Bambito Spring Water, agua de manantial volcánica del Volcán Barú' 
})

useHead({
  meta: [
    { property: 'og:image', content: `${siteUrl}/img/images/bsw1.jpg` },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },    
    { property: 'og:image:height', content: '630' },  
    { property: 'og:image:alt', content: 'Bambito Spring Water — Agua de Manantial Volcánica del Volcán Barú' }, 
    { name: 'twitter:image', content: `${siteUrl}/img/images/bsw1.jpg` }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            '@id': `${pageUrl}#about`,     
            'name': 'Nosotros | Bambito Spring Water',
            'url': pageUrl,
            'description': 'Conoce a Bambito Spring Water, comprometidos con agua de manantial pura y de alta calidad en Panamá.',
            'inLanguage': 'es-PA',           
            'mainEntityOfPage': {             
              '@type': 'WebPage',
              '@id': pageUrl
            },
            'publisher': {               
              '@type': 'Organization',
              '@id': `${siteUrl}/#organization`
            }
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,         
            'mainEntity': contextualFaqs.map((faq) => ({
              '@type': 'Question',
              'name': faq.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': faq.answer
              }
            }))
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`, 
            'inLanguage': 'es-PA',           
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'name': 'Inicio', 'item': `${siteUrl}/` },
              { '@type': 'ListItem', 'position': 2, 'name': 'Nosotros', 'item': pageUrl }
            ]
          }
        ]
      })
    }
  ]
})

const heroStyle = computed(() => ({
  backgroundImage: "linear-gradient(180deg, rgba(58, 88, 255, 0.18) 0%, rgba(70, 98, 255, 0.2) 100%), url('/img/images/9.jpg')"
}))

const awards = [
  { year: '2019', location: 'Stockholm, Suecia', type: 'gold', label: 'Oro', description: 'Fine Waters Taste Awards · Categoría Still Water' },
  { year: '2019', location: 'Guangzhou, China', type: 'bronze', label: 'Bronce', description: 'Fine Waters Taste Awards · Categoría Still Water' },
  { year: '2021', location: 'Bled, Eslovenia', type: 'gold', label: 'Oro', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' },
  { year: '2022', location: 'Los Ángeles, California', type: 'bronze', label: 'Bronce', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' },
  { year: '2023', location: 'Atenas, Grecia', type: 'gold', label: 'Oro', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' },
  { year: '2025', location: 'Atlanta, Georgia', type: 'bronze', label: 'Bronce', description: 'Fine Waters Taste Awards · Categoría Still Water' }
]
</script>

<style scoped>
.nosotros-page {
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
    linear-gradient(180deg, rgba(8, 16, 11, 0.22) 0%, rgba(8, 16, 11, 0.7) 100%);
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

.chip-dark {
  background: #18211b;
  color: #fff;
  border-color: transparent;
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
.timeline-card,
.soft-banner,
.value-card {
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
.timeline-subtitle,
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

.image-panel-tall {
  min-height: 560px;
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

.image-source-history {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.28)),
    url('/img/images/bsw1.jpg');
}

.image-source-purpose {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.28)),
    url('/img/images/IMG_8569.PNG');
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

.info-pills,
.soft-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.info-pill,
.soft-list-item {
  border-radius: 999px;
  padding: 0.8rem 1rem;
  background: #fff;
  border: 1px solid rgba(24, 33, 27, 0.08);
  color: #33433a;
  font-size: 0.92rem;
}

.mission-vision-stack {
  display: grid;
  gap: 1rem;
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

.timeline-card {
  padding: 1.2rem;
  background: #fff;
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 1rem;
  padding: 1rem 0;
}

.timeline-item + .timeline-item {
  border-top: 1px solid rgba(24, 33, 27, 0.08);
}

.timeline-dot {
  width: 14px;
  height: 14px;
  margin-top: 0.32rem;
  border-radius: 50%;
  background: #d2d7d1;
  box-shadow: 0 0 0 6px rgba(210, 215, 209, 0.2);
}

.timeline-dot.gold {
  background: #9c7c2b;
  box-shadow: 0 0 0 6px rgba(156, 124, 43, 0.16);
}

.timeline-dot.bronze {
  background: #8b5a3c;
  box-shadow: 0 0 0 6px rgba(139, 90, 60, 0.16);
}

.timeline-content {
  width: 100%;
}

.timeline-title {
  font-size: 1.02rem;
  font-weight: 600;
  color: #18211b;
}

.timeline-subtitle {
  font-size: 0.95rem;
}

.timeline-tag {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #6b766f;
  background: #f4f7f4;
  border: 1px solid rgba(24, 33, 27, 0.06);
  padding: 0.5rem 0.7rem;
  border-radius: 999px;
}

.iso-box {
  border-radius: 22px;
  background: #f8faf8;
  padding: 1rem;
  border: 1px solid rgba(24, 33, 27, 0.06);
}

.iso-image {
  display: block;
  margin: 0 auto;
  max-width: 360px;
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

  .image-panel-large,
  .image-panel-tall {
    min-height: 360px;
  }

  .mini-grid {
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
  .timeline-card,
  .value-card,
  .soft-banner {
    border-radius: 22px;
  }
}
</style>
