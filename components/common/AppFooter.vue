<template>
  <footer class="bg-dark pt-5">
    <div class="container">
      <div class="row">
        <!-- About -->
        <div class="col-md-6 col-lg-3 mb-4">
          <p class="text-white mb-3">
            Bambito Spring Water es una empresa panameña que ofrece agua de manantial
            proveniente de las tierras altas de Chiriquí, específicamente de las faldas del Volcán Barú.
          </p>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">
              <a href="https://www.instagram.com/bambitoaguademanantial/" target="_blank" class="text-white fs-4"
                aria-label="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://www.facebook.com/BambitoAguadeManantial" target="_blank" class="text-white fs-4"
                aria-label="Facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="https://x.com/AguaBambito" target="_blank" class="text-white fs-4" aria-label="Twitter">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>

        <!-- Links -->
        <div class="col-md-6 col-lg-3 mb-4">
          <h6 class="text-white mb-3">Enlaces</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-light text-decoration-none footer-link">
                Inicio
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/nosotros" class="text-light text-decoration-none footer-link">
                Nosotros
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/origen" class="text-light text-decoration-none footer-link">
                Origen
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/blog" class="text-light text-decoration-none footer-link">
                Blog
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/catalogo" class="text-light text-decoration-none footer-link">
                Productos
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/sostenibilidad" class="text-light text-decoration-none footer-link">
                Reciclaje
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/faq" class="text-light text-decoration-none footer-link">
                Preguntas frecuentes
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-12 col-md-6 col-lg-3 mb-4">
          <h6 class="text-white mb-3">Contacto</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <a href="https://www.google.com/maps/place/Agua+Bambito+-+Manantial+Volc%C3%A1n/" target="_blank"
                rel="noopener noreferrer" class="text-light text-decoration-none footer-link">
                <i class="fas fa-map-marker-alt me-2"></i>
                República de Panamá, Chiriquí, Volcán Barú
              </a>
            </li>
            <li class="mb-2">
              <a href="mailto:experiencia@bambitospringwater.com" class="text-light text-decoration-none footer-link">
                <i class="far fa-envelope me-2"></i>
                experiencia@bambitospringwater.com
              </a>
            </li>
            <li class="mb-2">
              <a href="tel:+5072060019" class="text-light text-decoration-none footer-link">
                <i class="fas fa-phone me-2"></i>
                (+507) 206-0019
              </a>
            </li>
            <li class="mb-2">
              <a href="https://wa.me/50769422262" class="text-light text-decoration-none footer-link">
                <i class="fab fa-whatsapp me-2"></i>
                (+507) 6942-2262
              </a>
            </li>
          </ul>
        </div>

        <!-- Gallery -->
        <div class="col-md-6 col-lg-3 mb-4">
          <h6 class="text-white mb-3">Síguenos</h6>
          <div class="row g-2">
            <div class="col-6">
              <a href="https://www.instagram.com/bambitoaguademanantial/" target="_blank">
                <img src="/img/images/salud-3.jpg" alt="Bambito Instagram" class="img-fluid rounded" />
              </a>
            </div>
            <div class="col-6">
              <a href="https://www.instagram.com/bambitoaguademanantial/" target="_blank">
                <img src="/img/images/salud-1.jpg" alt="Bambito Instagram" class="img-fluid rounded" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Copyright -->
    <div class="bg-dark border-top border-secondary py-3 mt-4">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <p class="mb-0 text-white small">
              Manantial de volcán &copy; Copyright {{ currentYear }}.
              Todos los derechos reservados Bambito Spring Water.
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-link {
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #86bc42 !important;
}
</style>
