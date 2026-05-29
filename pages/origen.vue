<template>
  <div class="origen-page">
    <!-- HERO -->
    <section class="hero-section " :style="heroStyle">
      <div class="hero-overlay"></div>

      <div class="container position-relative hero-container">
        <div class="row align-items-center">
          <div class="col-lg-7 mb-4 mb-lg-0">
            <p class="eyebrow mb-3">Agua con origen</p>
            <h1 class="hero-title mb-3">
              El origen de Bambito en el Volcán Barú
            </h1>
            <p class="hero-copy mb-4">
              Bambito nace en un entorno
              volcánico protegido, donde la geología, la altitud y la filtración natural
              dan forma a una composición única.
            </p>

            <div class="d-flex flex-wrap gap-2">
              <span class="chip">1,510 m s. n. m.</span>
              <span class="chip">~65 mg/L sílice natural</span>
              <span class="chip">~160 mg/L TDS</span>
              <span class="chip">pH 7.2 - 7.8</span>
            </div>
          </div>

          <div class="col-lg-5">
            <div class="hero-card">
              <p class="card-kicker mb-2">Agua con origen</p>
              <h2 class="card-title mb-3">Nacida en el Volcán Barú, Panamá</h2>
              <p class="card-text mb-4">
                Dentro del Parque Nacional Volcán Barú, el agua recorre un proceso natural
                de filtración durante años antes de emerger en el manantial.
              </p>

              <div class="mini-grid">
                <div class="mini-item">
                  <span class="mini-label">Entorno</span>
                  <strong>Bosque nuboso</strong>
                </div>
                <div class="mini-item">
                  <span class="mini-label">Protección</span>
                  <strong>Parque Nacional</strong>
                </div>
                <div class="mini-item">
                  <span class="mini-label">Origen</span>
                  <strong>Roca volcánica</strong>
                </div>
                <div class="mini-item">
                  <span class="mini-label">Perfil</span>
                  <strong>Mineral balanceado</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- INTRO -->
    <section class="section-shell section-shell-tight" style="margin-top: 4rem;">
      <div class="container">
        <div class="soft-banner text-center shadow">
          <p class="section-kicker mb-3">Agua con origen</p>
          <h2 class="fs-4 text-dark">No toda el agua es igual. El origen lo cambia todo.</h2>
          <p class="soft-banner-text mb-0">
            Bebemos agua todos los días, pero rara vez nos preguntamos de dónde viene.
            Y sin embargo, esa es la pregunta más importante.
            El agua no es solo H₂O. Es el medio en el que funciona tu cuerpo, el vehículo que transporta nutrientes,
            regula tu temperatura y sostiene tu energía diaria. Y lo que esa agua contiene — o no contiene — depende
            completamente de su origen.
            Bambito es agua con origen.
          </p>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 1 -->
    <section class="section-shell" id="la-fuente">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6">
            <p class="section-kicker">Agua con origen</p>
            <h2 class="section-title">Nacida en el Volcán Barú</h2>
            <p class="section-copy">
              En las tierras altas de Chiriquí, a más de 1,500 metros sobre el nivel del mar,
              se encuentra el manantial de Bambito. Ubicado dentro del Parque Nacional Volcán Barú, este entorno natural
              protegido ofrece condiciones únicas:
            </p>

            <div class="info-pills">
              <span class="info-pill">Lluvia constante</span>
              <span class="info-pill">Rica en minerales</span>
              <span class="info-pill">Bosque nuboso</span>
              <span class="info-pill">Alta altitud</span>
            </div>

            <p class="section-copy my-4">
              El Parque Nacional Volcán Barú actúa como guardián natural de la fuente,
              preservando la pureza original del agua.
            </p>
          </div>

          <div class="col-lg-6">
            <div class="border-1 border-gray rounded-5 overflow-hidden" style="aspect-ratio: 16/9;">
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

    <!-- SECCIÓN 2 -->
    <section class="section-shell section-shell-alt" id="geologia">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6 order-lg-2">
            <p class="section-kicker">Agua con origen</p>
            <h2 class="section-title">Un proceso natural que toma años</h2>
            <p class="section-copy">
              El agua de Bambito no se produce. Se forma. Todo comienza con la lluvia que cae
              sobre el volcán. Esa agua inicia un viaje silencioso hacia el subsuelo,
              filtrándose lentamente a través de capas de tierra, sedimentos y roca volcánica.
            </p>
            <p class="section-copy">
              Durante ese recorrido ocurren los siguientes procesos clave:
            </p>

            <div class="info-pills">
              <span class="info-pill">Se eliminan impurezas de forma natural</span>
              <span class="info-pill">Se absorben minerales esenciales</span>
              <span class="info-pill">Se construye una composición única</span>
            </div>
            <p class="section-copy my-4">
              Cuando finalmente emerge en el manantial, el agua ya está naturalmente filtrada y mineralizada.
            </p>
          </div>

          <div class="col-lg-6 order-lg-1">
            <div class="image-panel image-panel-tall image-source-2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 3 -->
    <section class="section-shell" id="perfil-mineral">
      <div class="container">
        <div class="row g-4 g-lg-5">
          <div class="col-lg-5">
            <p class="section-kicker">Filtrado natural</p>
            <h2 class="section-title">Filtrada por roca volcánica</h2>
            <p class="section-copy">
              La roca volcánica actúa como un filtro natural de alta precisión. A diferencia de
              los procesos industriales, no elimina los minerales ni modifica la estructura del
              agua, por lo que no requiere intervención química. En su lugar, aporta calcio, magnesio, sílice y otros
              minerales traza.
            </p>

            <div class="callout-box mb-4">
              <p class="callout-title mb-1">Composición mineral equilibrada</p>
              <p class="callout-text mb-0">
                Bambito tiene una minrealización media de ~160 mg/L TDS — es decir que el agua es ligera, fácil de
                tomar, proporcionando una hidratación eficiente y un perfil balanceado.
              </p>
            </div>

            <div class="callout-box">
              <p class="callout-title mb-1">No es un agua pesada ni vacia. Es un equilibrio natural</p>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="soft-card">
              <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">
                <div>
                  <p class="card-kicker mb-1">Perfil mineral</p>
                  <h3 class="card-title mb-0">Una composición clara y natural</h3>
                </div>
                <span class="chip chip-dark">Origen volcánico</span>
              </div>

              <div class="row g-3">
                <div class="col-md-6" v-for="item in mineralProfile" :key="item.label">
                  <div class="mineral-card">
                    <div class="d-flex justify-content-between align-items-start gap-3">
                      <div>
                        <p class="mineral-label mb-1">{{ item.label }}</p>
                        <p class="mineral-note mb-0">{{ item.note }}</p>
                      </div>
                      <strong class="mineral-value">{{ item.value }}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-responsive mt-4">
                <table class="table table-mineral mb-0">
                  <thead>
                    <tr>
                      <th>Elemento</th>
                      <th class="text-end">Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in mineralTable" :key="row.label">
                      <td>{{ row.label }}</td>
                      <td class="text-end fw-semibold">{{ row.value }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4 -->
    <section class="section-shell section-shell-alt" id="silice">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6">
            <div class="soft-card accent-card">
              <p class="section-kicker mb-2">Agua con origen</p>
              <h2 class="section-title mb-3">El diferencial: sílice natural</h2>
              <p class="section-copy mb-4">
                Uno de los atributos más distintivos de Bambito es su contenido de sílice:
                aproximadamente 65 mg/L. Esto tiene dos impactos clave.
              </p>

              <div class="row g-3 mb-3">
                <div class="col-sm-12">
                  <div class="soft-point">
                    <strong>En el cuerpo</strong>
                    <span>Apoya articulaciones, contribuye al colágeno y beneficia piel y tejido conectivo.</span>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="soft-point">
                    <strong>En la experiencia</strong>
                    <span>Sensación suave en boca, textura sedosa, perfil limpio y agradable.</span>
                  </div>
                </div>
              </div>
              <p class="section-copy mb-4">
                Es lo que hace que Bambito se sienta diferente desde el primer sorbo.
              </p>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="image-panel image-panel-large" style="background-image: url('img/images/natural.jpg');"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 5 -->

    <!-- SECCIÓN 6 -->
    <section class="section-shell" id="comparacion">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Comparación</p>
          <h2 class="section-title section-title-center">
            Agua con minerales vs. agua procesada
          </h2>
          <p class="section-copy section-copy-center">
            El origen determina la composición. Y la composición determina lo que recibes.
          </p>
        </div>

        <div class="comparison-wrapper">

          <!-- Agua de manantial -->
          <div class="comparison-card comparison-good">
            <div class="comparison-header">
              <div class="comparison-icon good">✔</div>
              <h3>Agua de manantial</h3>
            </div>

            <ul class="comparison-list">
              <li>Conserva su <strong>composición natural</strong></li>
              <li>Rica en <strong>minerales esenciales</strong></li>
              <li>No requiere <strong>procesos químicos</strong></li>
            </ul>

            <div class="comparison-footer">
              <span>Origen natural</span>
            </div>
          </div>

          <!-- VS divider -->
          <div class="comparison-divider">
            <span>VS</span>
          </div>

          <!-- Agua purificada -->
          <div class="comparison-card comparison-bad">
            <div class="comparison-header">
              <div class="comparison-icon bad text-danger">✕</div>
              <h3>Agua purificada</h3>
            </div>

            <ul class="comparison-list">
              <li>Pierde minerales en el <strong>proceso industrial</strong></li>
              <li>Es funcional, pero <strong>sin valor nutricional</strong></li>
              <li>Composición <strong>modificada artificialmente</strong></li>
            </ul>

            <div class="comparison-footer">
              <span>Procesada</span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- SECCIÓN 7 -->
    <section class="section-shell" id="conviccion">
      <div class="container">
        <div class="row align-items-center g-4 g-lg-5">
          <div class="col-lg-6">
            <p class="section-kicker">Agua con origen</p>
            <h2 class="section-title">Nada se agrega. Nada se modifica.</h2>
            <p class="section-copy">
              Bambito respeta el proceso natural. No se agregan minerales, no se aplican
              procesos agresivos y no se altera su composición. Solo microfiltración para
              asegurar pureza. El agua se embotella en origen, tal como la naturaleza la creó.
            </p>

            <p class="section-kicker text-dark my-2">El origen no es un detalle. Es todo</p>
            <p class="section-copy">
              Cada botella de Bambito es el resultado de años de filtración natural, una geología volcánica única y un
              entorno protegido; no es agua genérica, es agua con historia, es agua con identidad y es agua con origen.
            </p>
            <p class="section-copy mb-0 fst-italic">
              “Protegemos la fuente que nos define.”
            </p>
          </div>

          <div class="col-lg-6">
            <div class="image-panel image-panel-large image-source-5"></div>
          </div>
        </div>
      </div>
    </section>


    <!-- <section class="section-shell section-shell-alt" id="preguntas-origen">
      <div class="container">
        <div class="text-center mb-4 mb-lg-5">
          <p class="section-kicker mx-auto">Preguntas frecuentes</p>
          <h2 class="section-title section-title-center">Dudas clave sobre el origen de Bambito</h2>
          <p class="section-copy section-copy-center">
            Respuestas directas para entender de dÃ³nde viene nuestra agua y quÃ© aporta el filtrado volcÃ¡nico.
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

    <!-- CTA FINAL -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <div class="row align-items-center g-3">
            <div class="col-lg-8">
              <p class="section-kicker mb-2 text-white-50">Descubre la diferencia</p>
              <h2 class="cta-title mb-2">La próxima vez que tomes agua, pregúntate: ¿de dónde viene?</h2>
              <p class="cta-copy mb-0">
                Si es Bambito, la respuesta es clara: viene del Volcán Barú.
              </p>
            </div>

            <div class="col-lg-4 text-lg-end">
              <router-link to="/nosotros" class="btn btn-light px-4 cta-btn">Conoce más de nosotros</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeo } from '~/composables/useSeo'

const siteUrl = 'https://www.bambitospringwater.com'
const pageUrl = `${siteUrl}/origen`

const contextualFaqs = [
  {
    question: '¿De dónde proviene el agua Bambito?',
    answer:
      'El agua Bambito proviene de un manantial natural ubicado en las faldas del Volcán Barú, dentro de las tierras altas de Chiriquí, Panamá. Nace a 1,510 metros sobre el nivel del mar y se embotella en su origen.'
  },
  {
    question: '¿Qué minerales absorbe el agua al filtrarse por el Volcán Barú?',
    answer:
      'Durante su filtración natural por roca volcánica, Bambito incorpora sílice natural, calcio, magnesio y minerales traza. Su perfil incluye aproximadamente ~65 mg/L de sílice, pH 7.2 - 7.8 y una mineralización balanceada.'
  }
]

useSeo({
  title: 'Origen | Agua de Manantial Volcánica del Volcán Barú - Bambito',
  description:
    'Conoce el origen de Bambito: agua de manantial filtrada por décadas a través del Volcán Barú, en las tierras altas de Chiriquí, Panamá.',
  keywords: [
    'origen',
    'volcán barú',
    'manantial',
    'chiriquí',
    'agua volcánica',
    'agua volcánica volcán barú panamá'
  ],
  type: 'website',
  image: `${siteUrl}/img/images/volcan-2.jpg`,
  url: pageUrl,
  canonical: pageUrl,
  twitterImageAlt: 'Origen del Agua Bambito — Manantial volcánico del Volcán Barú, Chiriquí, Panamá'
})


useHead({
  meta: [
    { property: 'og:image', content: `${siteUrl}/img/images/volcan-2.jpg` },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Volcán Barú, Chiriquí — Origen del Agua Bambito Spring Water' }, // FIX #3a
    { name: 'twitter:image', content: `${siteUrl}/img/images/volcan-2.jpg` }
  ],
  script: [
    ({
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            'name': 'Origen del Agua Bambito | Agua de Manantial del Volcán Barú',
            'url': pageUrl,
            'description':
              'Descubre el origen del agua Bambito, extraída de manantiales naturales en el Volcán Barú, Panamá.',
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
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Inicio',
                'item': `${siteUrl}/`
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Origen',
                'item': pageUrl
              }
            ]
          }
        ]
      })
    } as any)
  ]
})

const heroStyle = computed(() => ({
  backgroundImage:
    "linear-gradient(180deg, rgba(58, 88, 255, 0.2) 0%, rgba(70, 98, 255, 0.2) 100%), url('/img/images/2.jpg')"
}))

const mineralProfile = [
  { label: 'Sílice (SiO₂)', value: '~65 mg/L', note: 'El atributo más distintivo de Bambito' },
  { label: 'pH', value: '7.2 - 7.8', note: 'Ligero y agradable para consumo diario' },
  { label: 'Calcio', value: '15 - 25 mg/L', note: 'Parte del perfil mineral natural' },
  { label: 'Magnesio', value: '8 - 15 mg/L', note: 'Equilibrio dentro de la composición' }
]

const mineralTable = [
  { label: 'TDS', value: '~160 mg/L' },
  { label: 'Origen', value: 'Volcán Barú, Chiriquí' },
  { label: 'Altitud', value: '1,510 m s. n. m.' },
  { label: 'Proceso', value: 'Microfiltración' }
]
</script>

<style scoped>
.origen-page {
  background: #f6f3ee;
  color: #18211b;
}

.hero-section {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: flex-center;
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

.comparison-wrapper {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: stretch;
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

.comparison-card {
  background: #fff;
  border-radius: 20px;
  padding: 2rem 1.6rem;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.25s ease;
}

.comparison-card:hover {
  transform: translateY(-4px);
}

/* GOOD */
.comparison-good {
  border-top: 4px solid #86bc42;
}

/* BAD */
.comparison-bad {
  border-top: 4px solid #dcdcdc;
  opacity: 0.9;
}

/* HEADER */
.comparison-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.comparison-header h3 {
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
}

/* ICON */
.comparison-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 14px;
  font-weight: bold;
}

.comparison-icon.good {
  background: rgba(134, 188, 66, 0.12);
  color: #4f7f1f;
}

.comparison-icon.bad {
  background: rgba(0, 0, 0, 0.05);
  color: #888;
}

/* LIST */
.comparison-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comparison-list li {
  position: relative;
  padding-left: 1.4rem;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  color: #444;
}

.comparison-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #86bc42;
}

/* FOOTER */
.comparison-footer {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
}

/* DIVIDER */
.comparison-divider {
  display: flex;
  align-items: center;
  justify-content: center;
}

.comparison-divider span {
  background: #f5f5f5;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #777;
}

/* RESPONSIVE */
@media (max-width: 991px) {
  .comparison-wrapper {
    grid-template-columns: 1fr;
  }

  .context-faq-grid {
    grid-template-columns: 1fr;
  }

  .comparison-divider {
    display: none;
  }
}

.chip-dark {
  background: #18211b;
  color: #fff;
  border-color: transparent;
}

.hero-card,
.soft-card,
.timeline-card,
.callout-box,
.soft-banner,
.comparison-card {
  border: 1px solid rgba(24, 33, 27, 0.08);
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.76);
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
.mineral-note,
.stat-label,
.callout-text {
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

.image-source-1 {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.28)),
    url('/img/images/239A0054.jpeg');
}

.image-source-2 {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.26)),
    url('/img/images/2.jpg');
}

.image-source-3 {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.05), rgba(8, 16, 11, 0.2)),
    url('/img/images/239A9878.jpg');
}

.image-source-4 {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.04), rgba(8, 16, 11, 0.25)),
    url('/img/images/239A0054.jpeg');
}

.image-source-5 {
  background-image:
    linear-gradient(180deg, rgba(8, 16, 11, 0.05), rgba(8, 16, 11, 0.28)),
    url('/img/images/planeta.jpg');
}

.stat-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.stat-card {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(24, 33, 27, 0.08);
  border-radius: 22px;
  padding: 1rem;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  line-height: 1.1;
  font-weight: 700;
  color: #18211b;
  letter-spacing: -0.03em;
}

.stat-number-options {
  display: block;
  font-size: 1rem;
  line-height: 1.1;
  font-weight: 700;
  color: #18211b;
  letter-spacing: -0.03em;
}

.stat-label {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.92rem;
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

.section-title-center,
.section-copy-center {
  text-align: center;
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

.soft-card {
  padding: 1.4rem;
  background: rgba(255, 255, 255, 0.84);
}

.accent-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 251, 248, 0.86));
}

.callout-box {
  padding: 1rem 1.1rem;
  background: #fff;
}

.callout-title {
  font-weight: 700;
  color: #18211b;
}

.callout-text {
  font-size: 0.96rem;
}

.mineral-card {
  padding: 1rem;
  border-radius: 20px;
  background: #f9fbf9;
  border: 1px solid rgba(24, 33, 27, 0.06);
}

.mineral-label {
  font-weight: 600;
  color: #18211b;
}

.mineral-note {
  font-size: 0.9rem;
}

.mineral-value {
  white-space: nowrap;
  color: #0f6d3b;
}

.table-mineral {
  border-color: rgba(24, 33, 27, 0.08);
}

.table-mineral thead th {
  background: transparent;
  color: #6d766f;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border-bottom: 1px solid rgba(24, 33, 27, 0.08);
}

.table-mineral td,
.table-mineral th {
  padding: 0.95rem 0.65rem;
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.comparison-card {
  padding: 1.35rem;
}

.comparison-card h3 {
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.9rem;
}

.comparison-card ul {
  margin: 0;
  padding-left: 1.15rem;
  color: #4f5a54;
  line-height: 1.9;
}

.comparison-card-left {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(245, 250, 245, 0.8));
}

.comparison-card-right {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(250, 247, 245, 0.82));
}

.soft-point {
  padding: 1rem;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(24, 33, 27, 0.06);
  display: grid;
  gap: 0.25rem;
}

.soft-point strong {
  color: #18211b;
}

.soft-point span {
  color: #5c665f;
  line-height: 1.7;
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

  .stat-row,
  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .mini-grid {
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
  .callout-box,
  .comparison-card {
    border-radius: 22px;
  }
}
</style>
