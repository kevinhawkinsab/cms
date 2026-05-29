<template>
  <div class="home-page">
    <!-- Hero Slider -->
    <section class="hero-slider">
      <div id="heroCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="7000">
        <div class="carousel-indicators">
          <button v-for="(slide, index) in slides" :key="index" type="button" data-bs-target="#heroCarousel"
            :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : 'false'"
            :aria-label="`Slide ${index + 1}`"></button>
        </div>

        <div class="carousel-inner">
          <div v-for="(slide, index) in slides" :key="slide.id" class="carousel-item" :class="{ active: index === 0 }">
            <div class="row g-0 min-vh-100 align-items-stretch">
              <div class="col-lg-5 d-flex align-items-center">
                <div class="slide-content px-4 px-l-6 w-100">
                  <div class="text-muted display-4 fw-bold opacity-25 mb-2">{{ slide.step }}</div>

                  <h1 v-if="index === 0" v-html="slide.title"></h1>
                  <h2 v-else class="fw-bold mb-3 text-dark display-5 lh-sm" v-html="slide.title"></h2>

                  <div class="w-100 text-muted mb-4 fs-5" v-html="slide.description"></div>

                  <div class="d-flex flex-wrap gap-3 align-items-center">
                    <a :href="slide.btnLink" class="btn btn-bsw btn-lg px-4">
                      {{ slide.btnText }}
                    </a>
                  </div>
                </div>
              </div>

              <div class="col-lg-7 slide-image position-relative" :style="{ backgroundImage: `url(${slide.image})` }">
                <div class="slide-overlay"></div>

                <div class="position-absolute bottom-0 start-0 w-100 d-none d-sm-block"
                  style="padding-bottom: 6rem; background: rgba(0, 0, 0, 0.5);">
                  <div class="row g-3">
                    <div class="col-md-4">
                      <div class="glass-card text-white p-3 rounded-4 h-100">
                        <div class="small text-uppercase opacity-75 mb-1">Origen</div>
                        <div class="fw-semibold">Volcán Barú, Chiriquí</div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="glass-card text-white p-3 rounded-4 h-100">
                        <div class="small text-uppercase opacity-75 mb-1">Perfil</div>
                        <div class="fw-semibold">Sílice natural ~65 mg/L</div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="glass-card text-white p-3 rounded-4 h-100">
                        <div class="small text-uppercase opacity-75 mb-1">Marca</div>
                        <div class="fw-semibold">Agua de manantial premium</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Siguiente</span>
        </button>
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
    <section class="py-5 bg-light-gray" id="faq-preview">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 col-xl-9">
            <div class="text-center mb-5">
              <span class="badge rounded-pill bg-light text-bsw-secondary border px-3 py-2 mb-3">
                Preguntas frecuentes
              </span>
              <h2 class="section-title mb-3">Todo lo que necesitas saber sobre Bambito</h2>
              <p class="text-muted mx-auto mb-0" style="max-width: 760px;">
                Conoce todo sobre el agua de manantial volcánica que nace en el Volcán Barú, Chiriquí.
              </p>
            </div>

            <div class="accordion faq-accordion" id="faqAccordion">
              <div v-for="(faq, index) in faqs" :key="faq.id" class="accordion-item faq-item mb-3">
                <h3 class="accordion-header" :id="`faq-heading-${faq.id}`">
                  <button class="accordion-button" :class="{ collapsed: index !== 0 }" type="button"
                    data-bs-toggle="collapse" :data-bs-target="`#faq-collapse-${faq.id}`"
                    :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="`faq-collapse-${faq.id}`">
                    {{ faq.question }}
                  </button>
                </h3>

                <div :id="`faq-collapse-${faq.id}`" class="accordion-collapse collapse" :class="{ show: index === 0 }"
                  :aria-labelledby="`faq-heading-${faq.id}`" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    <p v-for="(paragraph, pIndex) in faq.paragraphs" :key="`${faq.id}-p-${pIndex}`" class="mb-3">
                      {{ paragraph }}
                    </p>

                    <ul v-if="faq.bullets?.length" class="mb-3 ps-3">
                      <li v-for="(bullet, bIndex) in faq.bullets" :key="`${faq.id}-b-${bIndex}`" class="mb-2">
                        <strong>{{ bullet.label }}</strong> {{ bullet.text }}
                      </li>
                    </ul>

                    <p v-if="faq.closing" class="mb-0 fw-semibold">
                      {{ faq.closing }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-5">
              <p class="mb-3 fw-semibold text-muted">¿Tienes más preguntas?</p>
              <router-link to="/faq" class="btn btn-bsw btn-lg px-4">
                Ver preguntas frecuentes <span class="ms-2">→</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 bg-white" id="mineralidad">
      <div class="container">
        <div class="text-center mb-5">
          <span class="badge rounded-pill bg-light text-bsw-secondary border px-3 py-2 mb-3">
            Mineralidad natural
          </span>
          <h2 class="section-title mb-3">Sílice Natural y Perfil Mineral</h2>
          <p class="text-muted mx-auto mb-0" style="max-width: 760px;">
            Un agua de manantial con carácter volcánico, balance mineral y una composición pensada por la naturaleza.
          </p>
        </div>

        <div class="row g-4 align-items-stretch">
          <div class="col-lg-6">
            <div class="h-100 p-4 p-lg-5">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div>
                  <h3 class="h4 fw-bold mb-1 text-bsw">~65 mg/L de Sílice Natural</h3>
                </div>
              </div>

              <p class="mb-3">
                El sílice es un mineral esencial que contribuye a la salud del cabello, piel, uñas y huesos.
                Bambito contiene aproximadamente <strong>65 mg/L de sílice natural</strong>, uno de los niveles más
                altos
                entre las aguas de manantial disponibles en Panamá.
              </p>

              <p class="mb-4">
                Este mineral se incorpora de forma natural mientras el agua atraviesa las formaciones rocosas volcánicas
                del Volcán Barú durante décadas, un proceso que no puede ser replicado artificialmente.
              </p>

              <router-link to="/origen" class="btn btn-bsw">
                Conoce nuestro origen
              </router-link>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="h-100 p-4 p-lg-5 rounded-4 bg-white border shadow-sm">
              <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <h4 class="h5 fw-bold mb-0 text-bsw-secondary">Perfil Mineral de Bambito</h4>
                <span class="badge bg-light text-dark border rounded-pill px-3 py-2">
                  Balance natural
                </span>
              </div>

              <div class="table-responsive">
                <table class="table table-borderless align-middle mb-0">
                  <tbody>
                    <tr class="border-bottom">
                      <td class="fw-semibold ps-0">Sílice (SiO₂)</td>
                      <td class="text-end pe-0"><strong class="text-bsw">~65 mg/L</strong></td>
                    </tr>
                    <tr class="border-bottom">
                      <td class="fw-semibold ps-0">pH</td>
                      <td class="text-end pe-0">7.2 - 7.8 (Ligeramente Alcalino)</td>
                    </tr>
                    <tr class="border-bottom">
                      <td class="fw-semibold ps-0">Calcio (Ca)</td>
                      <td class="text-end pe-0">15-25 mg/L</td>
                    </tr>
                    <tr class="border-bottom">
                      <td class="fw-semibold ps-0">Magnesio (Mg)</td>
                      <td class="text-end pe-0">8-15 mg/L</td>
                    </tr>
                    <tr class="border-bottom">
                      <td class="fw-semibold ps-0">TDS (Sólidos Disueltos)</td>
                      <td class="text-end pe-0">&lt;250 mg/L (Baja mineralidad)</td>
                    </tr>
                    <tr>
                      <td class="fw-semibold ps-0">Origen</td>
                      <td class="text-end pe-0">Volcán Barú, 1,510 m</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-5 bg-light-gray">
      <div class="container">
        <div class="text-center mb-5">
          <span class="badge rounded-pill bg-white text-bsw-secondary border px-3 py-2 mb-3">
            Estilo de vida saludable
          </span>
          <h2 class="section-title mb-3">Muévete a lo natural</h2>
          <p class="text-muted mx-auto mb-0" style="max-width: 760px;">
            Si buscas una marca de agua en Panamá, reconocida internacionalmente por su gran sabor, ¡prueba Bambito!
          </p>
        </div>

        <div class="row g-4 align-items-stretch">
          <div class="col-lg-5">
            <div class="h-100 p-4 p-lg-5 rounded-4 bg-white shadow-sm border position-relative overflow-hidden">
              <div class="position-absolute top-0 end-0 m-4">
                <span class="badge rounded-pill bg-bsw-secondary px-3 py-2 mb-2 text-uppercase">
                  Bambito
                </span>
              </div>

              <div class="d-flex align-items-center gap-3 mb-4">
                <div>
                  <h4 class="h4 fw-bold my-1 pt-4">¿El bienestar es tu prioridad?</h4>
                  <p class="text-muted fw-semibold mb-0">Tu marca de agua en Panamá es Bambito.</p>
                </div>
              </div>

              <p class="my-4">
                Elegir Bambito es elegir un agua de manantial con perfil mineral balanceado, procedente de las tierras
                altas
                de Chiriquí, con una trayectoria que la enriquece naturalmente.
              </p>

              <router-link to="/origen" class="btn btn-bsw">
                Descubrir nuestra historia
              </router-link>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="row g-4 h-100">
              <div class="col-md-6" v-for="service in services" :key="service.id">
                <div class="card h-100 border-0 shadow-sm rounded-4">
                  <div class="card-body py-4 px-3">
                    <div class="d-flex align-items-center gap-3">
                      <div class="flex-shrink-0">
                        <div
                          class="rounded-circle bg-white d-flex align-items-center justify-content-center border shadow"
                          style="width:65px; height:65px;">
                          <img :src="service.icon" :alt="service.title" width="42" height="42">
                        </div>
                      </div>
                      <div>
                        <h4 class="h6 fw-bold mb-2">{{ service.title }}</h4>
                        <p class="small text-muted my-2">{{ service.description }}</p>
                      </div>
                    </div>
                    <span class="badge rounded-pill bg-light text-dark border px-3 py-2">{{ service.tag }}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="card h-100 border-0 shadow-sm rounded-4">
                  <div class="card-body py-4 px-3">
                    <div class="d-flex align-items-center gap-3">
                      <div class="flex-shrink-0">
                        <div
                          class="rounded-circle bg-white d-flex align-items-center justify-content-center border shadow"
                          style="width:65px; height:65px;">
                          <img src="/img/images/garrafa.png" alt="Sabor premium" width="42" height="42">
                        </div>
                      </div>
                      <div>
                        <h4 class="h6 fw-bold mb-2">Embotellado en el Origen</h4>
                        <p class="small text-muted my-2">Sin alteraciones. Cada botella preserva el perfil mineral
                          exacto que la naturaleza volcánica le otorgó.</p>
                      </div>
                    </div>
                    <span class="badge rounded-pill bg-light text-dark border px-3 py-2">Sabor premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-5">
      <div class="container">
        <div class="row g-4 align-items-center">
          <div class="col-lg-6">
            <div class="rounded-4 overflow-hidden shadow-sm"
              style="min-height: 500px; background-image: url('/img/images/239A9878.jpg'); background-size: cover; background-position: center;">
            </div>
          </div>

          <div class="col-lg-6">
            <span class="badge rounded-pill bg-light text-bsw-secondary border px-3 py-2 mb-3">
              Nuestra esencia
            </span>
            <h2 class="section-title mb-3">Bambito Agua de Manantial</h2>
            <p class="mb-3">
              En las tierras altas de Chiriquí, Panamá, Bambito Spring Water nace de un manantial
              en las faldas del majestuoso Volcán Barú. Su recorrido entre rocas sedimentarias y
              volcánicas la enriquece con minerales naturales, otorgándole un carácter puro y distintivo.
            </p>
            <p class="mb-3">
              Nuestra historia es también una historia de compromiso. Desde nuestros inicios, nos propusimos
              llevar al consumidor un producto natural, auténtico, saludable y responsable.
            </p>
            <p class="mb-4">
              En 2019, Bambito fue reconocida con el Premio Gold en la competencia internacional
              Fine Waters Tasting Competition celebrada en Estocolmo, Suecia.
            </p>

            <a href="https://www.instagram.com/bambitoaguademanantial/"
              class="text-bsw text-gloss fs-4 text-decoration-none fw-semibold" target="_blank"
              rel="noopener noreferrer">
              #MuévetealoNatural
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="py-5 bg-light-gray" id="productos">
      <div class="container">
        <div class="text-center mb-5">
          <span class="badge rounded-pill bg-white text-bsw-secondary border px-3 py-2 mb-3">
            Catálogo
          </span>
          <h2 class="section-title">Hidratación a tu manera</h2>
          <p class="text-muted mx-auto mb-0" style="max-width: 760px;">
            Quienes eligen vivir saludable confían en la mineralización natural y
            balanceada de Bambito Agua Manantial en sus diferentes presentaciones:
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-6 col-xl-3" v-for="product in products" :key="product.id">
            <a :href="product.link" class="text-decoration-none">
              <div class="product-card card h-100 bg-white border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="position-absolute top-0 start-0 m-3">
                  <span class="badge text-white rounded-pill px-3 py-2 text-uppercase small bg-bsw-secondary">
                    {{ product.category }}
                  </span>
                </div>
                <div class="d-flex justify-content-center align-items-center p-4 bg-light" style="min-height: 240px;">
                  <img :src="product.image" :alt="product.name" style="max-height: 180px;" class="img-fluid">
                </div>
                <div class="card-body p-4">
                  <h5 class="card-title h6 text-dark mb-2">{{ product.name }}</h5>
                  <p class="small text-muted mb-3">{{ product.description }}</p>
                  <strong class="text-bsw fs-5">${{ product.price }}</strong>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div class="text-center mt-5">
          <a href="https://portal.bambitospringwater.com/#/agua-de-manantial-embotellada"
            class="btn btn-bsw btn-lg px-5" target="_blank" rel="noopener noreferrer">
            Explorar catálogo
          </a>
        </div>
      </div>
    </section>

    <!-- Awards Timeline -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <span class="badge rounded-pill bg-light text-bsw-secondary border px-3 py-2 mb-3">
            Reconocimientos
          </span>
          <h2 class="section-title">Premios Taste Awards</h2>
          <p class="text-muted mx-auto mb-0" style="max-width: 760px;">
            Reconocida por el mundo. Nacida en Chiriquí.
          </p>
        </div>

        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="soft-card bg-white h-100">
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
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="row g-0 align-items-stretch rounded-5 overflow-hidden shadow-lg border">
          <div class="col-lg-7 bg-bsw text-white p-4 p-lg-5 position-relative overflow-hidden">
            <div class="position-absolute top-0 end-0 w-100 h-100 opacity-10">
            </div>

            <div class="position-relative">
              <span class="badge rounded-pill bg-white text-dark px-3 py-2 mb-4">
                Servicio a domicilio
              </span>
              <h2 class="display-6 fw-bold mb-3 text-white">Pide tu agua a domicilio</h2>
              <p class="lead mb-4">
                Contamos con la venta de garrafones de agua, galones de agua y agua
                embotellada a domicilio en plástico o en vidrio retornable.
              </p>

              <div class="row g-3 mb-4">
                <div class="col-md-4">
                  <div class="bg-white rounded-4 p-3 h-100 shadow">
                    <div class="fw-semibold mb-1 text-dark">Garrafones</div>
                    <div class="small opacity-75 text-muted">Ideal para hogar y oficina</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="bg-white shadow rounded-4 p-3 h-100">
                    <div class="fw-semibold mb-1 text-dark">Vidrio retornable</div>
                    <div class="small text-muted">Presentación premium</div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="bg-white shadow rounded-4 p-3 h-100">
                    <div class="fw-semibold mb-1 text-dark">Entrega directa</div>
                    <div class="small text-muted">Servicio cómodo y confiable</div>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-wrap gap-3">
                <a href="https://portal.bambitospringwater.com/#/agua-de-manantial-embotellada"
                  class="btn btn-light btn-lg px-4" target="_blank" rel="noopener noreferrer">
                  Hacer pedido
                </a>

                <a href="#productos" class="btn btn-outline-light btn-lg px-4">
                  Ver presentaciones
                </a>
              </div>
            </div>
          </div>

          <div class="col-lg-5 bg-white p-4 d-flex align-items-center">
            <div class="w-100">
              <div class="text-center text-lg-start mb-4">
                <span class="badge rounded-pill bg-light text-bsw-secondary border px-3 py-2 mb-3">
                  ¿Qué recibes?
                </span>
                <h3 class="h4 fw-bold mb-2 text-dark">Hidratación lista para tu día a día</h3>
                <p class="text-muted mb-0">
                  Ordena de forma rápida y recibe una opción pensada para tu rutina.
                </p>
              </div>

              <ul class="list-unstyled mb-0">
                <li class="d-flex align-items-start gap-3 mb-4">
                  <div
                    class="rounded-circle bg-light border d-flex align-items-center justify-content-center flex-shrink-0"
                    style="width:44px; height:44px;">
                    1
                  </div>
                  <div>
                    <h4 class="h6 fw-bold mb-1">Elige tu presentación</h4>
                    <p class="text-muted mb-0">Selecciona el formato que mejor se adapte a tu consumo.</p>
                  </div>
                </li>

                <li class="d-flex align-items-start gap-3 mb-4">
                  <div
                    class="rounded-circle bg-light border d-flex align-items-center justify-content-center flex-shrink-0"
                    style="width:44px; height:44px;">
                    2
                  </div>
                  <div>
                    <h4 class="h6 fw-bold mb-1">Confirma tu pedido</h4>
                    <p class="text-muted mb-0">Completa la solicitud en pocos pasos desde tu navegador.</p>
                  </div>
                </li>

                <li class="d-flex align-items-start gap-3">
                  <div
                    class="rounded-circle bg-light border d-flex align-items-center justify-content-center flex-shrink-0"
                    style="width:44px; height:44px;">
                    3
                  </div>
                  <div>
                    <h4 class="h6 fw-bold mb-1">Recibe en tu puerta</h4>
                    <p class="text-muted mb-0">Lleva Bambito a casa, oficina o negocio con comodidad.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSeo } from '~/composables/useSeo'

const { public: { siteUrl } } = useRuntimeConfig()

useSeo({
  title: 'Bambito | Agua de Manantial Volcánica del Volcán Barú, Chiriquí, Panamá',
  description: 'Agua de manantial con origen volcánico, filtrada naturalmente a través del Volcán Barú. Galardonada 6 veces internacionalmente. ~65 mg/L de sílice natural.',
  keywords: [
    'agua de manantial',
    'agua volcánica',
    'Volcán Barú',
    'Chiriquí',
    'sílice natural',
    'agua premium Panamá',
    'agua de manantial volcánica panamá',
    'garrafón agua Panamá',
    'agua ISO 9001 Panamá'
  ],
  type: 'website',
  image: `${siteUrl}/img/images/gota.jpg`,
  twitterImageAlt: 'Bambito Spring Water — Agua de Manantial Volcánica del Volcán Barú, Panamá',
  url: `${siteUrl}/`,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Inicio',
          'item': `${siteUrl}/`
        }
      ]
    }
  ]
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'alternate', hreflang: 'es', href: `${siteUrl}/` },
    { rel: 'alternate', hreflang: 'es-PA', href: `${siteUrl}/` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}/` }
  ]
})

useSeoMeta({
  ogTitle: 'Bambito | Agua de Manantial Volcánica del Volcán Barú, Chiriquí, Panamá',
  ogDescription: 'Agua de manantial con origen volcánico, filtrada naturalmente a través del Volcán Barú. Galardonada 6 veces internacionalmente. ~65 mg/L de sílice natural.',
  ogUrl: `${siteUrl}/`,
  ogType: 'website',
  ogImage: `${siteUrl}/img/images/gota.jpg`,
  ogImageAlt: 'Bambito Spring Water — Agua de Manantial Volcánica del Volcán Barú, Panamá',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  twitterTitle: 'Bambito | Agua de Manantial Volcánica del Volcán Barú, Chiriquí, Panamá',
  twitterDescription: 'Agua de manantial con origen volcánico, filtrada naturalmente a través del Volcán Barú. Galardonada 6 veces internacionalmente. ~65 mg/L de sílice natural.',
  twitterImage: `${siteUrl}/img/images/gota.jpg`,
  twitterImageAlt: 'Bambito Spring Water — Agua de Manantial Volcánica del Volcán Barú, Panamá'
})

const slides = ref([
  {
    id: 1,
    step: '01',
    image: '/img/images/239A0054.jpeg',
    title: `
      <div>
        <h1 class="text-dark fs-1 fw-bold">Agua de Manantial Volcánica en Panamá</h1>
        <p class="text-bsw text-gloss" style="font-size: 25px">#Muévete A Lo Natural</p>
      </div>
    `,
    description: `
      <ul class="list-unstyled">
        <li class="mb-2">• Agua 100% de manantial, nacida en las faldas del Volcán Barú.</li>
        <li class="mb-2">• Envasada en su origen, sin aditivos y bajo los más altos estándares de calidad.</li>
        <li>• Contiene minerales naturales que contribuyen al bienestar de tu organismo.</li>
      </ul>
    `,
    btnText: 'Preguntas Frecuentes',
    btnLink: '/faq'
  },
  {
    id: 2,
    step: '02',
    image: '/img/images/IMG_0290.jpg',
    title: 'Para un estilo de vida activo y saludable',
    description: '<strong class="text-bsw">Tu cuerpo merece lo mejor.</strong> Quienes eligen vivir saludable confían en la mineralización natural y balanceada de Bambito Agua de Manantial.',
    btnText: 'Nuestros productos',
    btnLink: 'https://portal.bambitospringwater.com/#/agua-de-manantial-embotellada'
  },
  {
    id: 3,
    step: '03',
    image: '/img/images/2.jpg',
    title: 'De origen volcánico',
    description: 'Cada gota de Bambito recorre un viaje milenario a través de roca volcánica, lo que la convierte en un agua naturalmente mineralizada, ideal para apoyar tu bienestar diario.',
    btnText: 'Conoce más',
    btnLink: '/origen'
  },
  {
    id: 4,
    step: '04',
    image: '/img/images/planeta.png',
    title: 'Cuidamos el agua, cuidamos el planeta',
    description: 'Bambito promueve la sostenibilidad a través del reciclaje, la reducción de plásticos, la eficiencia energética y el apoyo a comunidades sin acceso a agua potable.',
    btnText: 'Recicla con Bambito',
    btnLink: '/sostenibilidad'
  }
])

const services = ref([
  {
    id: 1,
    icon: '/img/images/mountain.png',
    title: 'Agua de Manantial',
    description: 'De Tierras Altas y de origen volcánico.',
    tag: 'Volcán Barú'
  },
  {
    id: 2,
    icon: '/img/images/gota.png',
    title: '100% Natural',
    description: 'Envasada en su origen. Sin aditivos. Con sus minerales naturales.',
    tag: 'Sílice natural'
  }
])


const products = ref([
  {
    id: 1,
    name: 'Caja de 24 Botellas de 300ml',
    description: '~65 mg/L de sílice natural | pH ligeramente alcalino | Origen: Volcán Barú, 1,510 m',
    price: '11.50',
    category: 'BOTELLAS',
    image: '/img/images/300ml.png',
    link: 'https://portal.bambitospringwater.com/#/shop-product-detail/agua-manantial-300ml-caja24'
  },
  {
    id: 2,
    name: 'Caja de 24 Botellas de 600ml',
    description: '~65 mg/L de sílice natural | pH ligeramente alcalino | Origen: Volcán Barú, 1,510 m',
    price: '15.00',
    category: 'BOTELLAS',
    image: '/img/images/600ml.png',
    link: 'https://portal.bambitospringwater.com/#/shop-product-detail/agua-manantial-600ml-caja24'
  },
  {
    id: 3,
    name: 'Caja de 12 Botellas de 1.5 litros',
    description: '~65 mg/L de sílice natural | pH ligeramente alcalino | Origen: Volcán Barú, 1,510 m',
    price: '13.25',
    category: 'BOTELLAS',
    image: '/img/images/1500ml.png',
    link: 'https://portal.bambitospringwater.com/#/shop-product-detail/agua-manantial-1-5L-caja12'
  },
  {
    id: 4,
    name: 'Garrafa de 18.9 litros',
    description: '~65 mg/L de sílice natural | pH ligeramente alcalino | Origen: Volcán Barú, 1,510 m',
    price: '6.25',
    category: 'GARRAFAS',
    image: '/img/images/garrafa-2.png',
    link: 'https://portal.bambitospringwater.com/#/shop-product-detail/garrafon-agua-18-9L-servicio'
  }
])


const faqs = ref([
  {
    id: 1,
    question: '¿Qué es el agua de manantial volcánica?',
    paragraphs: [
      'Es agua que se filtra de forma natural durante décadas a través de roca volcánica antes de emerger como manantial.',
      'En ese recorrido, absorbe minerales únicos como la sílice. Bambito nace a 1.510 m s.n.m. en el Volcán Barú, Chiriquí — sin aditivos, sin tratamientos químicos, con todo su perfil mineral intacto.'
    ]
  },
  {
    id: 2,
    question: '¿Qué minerales contiene Bambito?',
    paragraphs: [
      'Bambito contiene minerales naturales absorbidos de la roca volcánica durante su filtración:'
    ],
    bullets: [
      { label: 'Sílice:', text: '~65 mg/L — apoya la piel, articulaciones, cabello y uñas' },
      { label: 'Calcio:', text: '15–25 mg/L — esencial para huesos y músculos' },
      { label: 'Magnesio:', text: '8–15 mg/L — clave para el sistema nervioso y energía' },
      { label: 'pH:', text: '7.2–7.8 — ligeramente alcalino, suave al paladar' },
      { label: 'TDS:', text: '~160 mg/L — mineralización equilibrada' }
    ],
    closing: 'Nada añadido. Todo natural.'
  },
  {
    id: 3,
    question: '¿Es mejor el agua de manantial que el agua purificada?',
    paragraphs: [
      'El agua purificada es agua de grifo tratada para eliminar impurezas — pero ese proceso también elimina sus minerales.',
      'Bambito es agua de manantial natural: conserva su sílice, calcio y magnesio originales, tiene un sabor más suave y equilibrado, y aporta un valor mineral real. No es simplemente agua. Es agua con origen.'
    ]
  },
  {
    id: 4,
    question: '¿Hacen entregas a domicilio en Panamá?',
    paragraphs: [
      'Sí. Bambito llega hasta tu puerta — garrafones de 18.9L, botellas PET y vidrio retornable para hogar, oficina y empresa.',
      'Haz tu pedido fácil y rápido desde nuestro portal en línea.'
    ]
  },
  {
    id: 5,
    question: '¿Bambito tiene certificación ISO 9001?',
    paragraphs: [
      'Sí. Bambito cuenta con certificación ISO 9001 — el estándar internacional de gestión de calidad — y ha sido galardonada con 6 premios Fine Waters Taste Awards entre 2019 y 2025 en Estocolmo, Eslovenia, Atenas y más. Calidad que el mundo reconoce.'
    ]
  }
])


const awards = [
  { year: '2019', location: 'Stockholm, Suecia', type: 'gold', label: 'Oro', description: 'Fine Waters Taste Awards · Categoría Still Water' },
  { year: '2019', location: 'Guangzhou, China', type: 'bronze', label: 'Bronce', description: 'Fine Waters Taste Awards · Categoría Still Water' },
  { year: '2021', location: 'Bled, Eslovenia', type: 'gold', label: 'Oro', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' },
  { year: '2022', location: 'Los Ángeles, California', type: 'bronze', label: 'Bronce', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' },
  { year: '2023', location: 'Atenas, Grecia', type: 'gold', label: 'Oro', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' },
  { year: '2025', location: 'Atlanta, Georgia', type: 'bronze', label: 'Bronce', description: 'Fine Waters Taste Awards · Categoría CO₂ Water' }
]

</script>

<style scoped>
.hero-slider .carousel-item {
  height: 100vh;
}

.slide-content {
  max-width: 750px;
}

.slide-image {
  background-size: cover;
  background-position: center;
  position: relative;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.carousel-control-prev,
.carousel-control-next {
  width: 5%;
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

.timeline-item+.timeline-item {
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

.timeline-title {
  font-size: 1.02rem;
  font-weight: 600;
  color: #18211b;
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

.bg-faq-soft {
  background: linear-gradient(180deg, #f7fbff 0%, #ffffff 100%);
}

.faq-accordion .accordion-item {
  border: 1px solid rgba(24, 33, 27, 0.08);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  background: #fff;
}

.faq-accordion .accordion-button {
  padding: 1.2rem 1.5rem;
  font-weight: 700;
  color: #18211b;
  background: #fff;
  box-shadow: none;
}

.faq-accordion .accordion-button:not(.collapsed) {
  color: #0b5f7f;
  background: #f1fbff;
  box-shadow: none;
}

.faq-accordion .accordion-button:focus {
  box-shadow: none;
  border-color: rgba(11, 95, 127, 0.15);
}

.faq-accordion .accordion-body {
  padding: 0 1.5rem 1.5rem;
  color: #5f6a64;
}

.faq-accordion .accordion-body ul {
  margin-bottom: 0;
}

.faq-accordion .accordion-body li {
  line-height: 1.6;
}

.faq-item+.faq-item {
  margin-top: 1rem;
}

@media (max-width: 991px) {
  .hero-slider .carousel-item {
    height: auto;
  }

  .slide-image {
    min-height: 400px;
  }

  .row {
    flex-direction: column-reverse;
  }
}
</style>
