<template>
  <footer 
    class="luxury-footer"
    :class="[
      `luxury-footer--${variant}`,
      `luxury-footer--${theme}`
    ]"
    role="contentinfo"
  >
    
    <!-- Sección principal del footer -->
    <div class="footer-main">
      <div class="footer-container">
        
        <!-- Newsletter Section -->
        <section class="footer-newsletter" v-if="showNewsletter">
          <div class="newsletter-content">
            <div class="newsletter-text">
              <h2 class="newsletter-title">Experiencias Exclusivas</h2>
              <p class="newsletter-description">
                Reciba ofertas especiales, eventos únicos y experiencias exclusivas 
                directamente en su correo electrónico.
              </p>
            </div>
            
            <form 
              @submit.prevent="handleNewsletterSubmit" 
              class="newsletter-form"
              novalidate
            >
              <div class="newsletter-input-group">
                <div class="input-container">
                  <q-icon name="email" class="input-icon" />
                  <input
                    v-model="newsletterEmail"
                    type="email"
                    placeholder="Su correo electrónico"
                    class="newsletter-input"
                    :class="{ 'input-error': newsletterError }"
                    required
                    aria-label="Correo electrónico para newsletter"
                  />
                </div>
                <BaseButton
                  type="submit"
                  variant="primary"
                  label="Suscribirse"
                  icon="send"
                  :loading="newsletterLoading"
                  size="lg"
                  class="newsletter-btn"
                />
              </div>
              <div v-if="newsletterError" class="newsletter-error">
                {{ newsletterError }}
              </div>
              <div v-if="newsletterSuccess" class="newsletter-success">
                ¡Gracias por suscribirse! Recibirá nuestras mejores ofertas.
              </div>
            </form>
          </div>
        </section>

        <!-- Contenido principal del footer -->
        <div class="footer-content">
          
          <!-- Información del hotel -->
          <div class="footer-section footer-about">
            <div class="footer-brand">
              <div class="brand-logo">
                <img 
                  :src="hotelConfig.DEFAULT_IMAGES.logo" 
                  :alt="hotelConfig.HOTEL_INFO.shortName"
                  class="logo-image"
                />
              </div>
              <div class="brand-info">
                <h3 class="brand-name">{{ hotelConfig.HOTEL_INFO.name }}</h3>
                <p class="brand-tagline">{{ hotelConfig.HOTEL_INFO.tagline }}</p>
              </div>
            </div>
            
            <p class="hotel-description">
              Un refugio de lujo en el corazón del Centro Histórico de Cartagena, 
              donde la historia colonial se encuentra con la hospitalidad francesa 
              más refinada para crear experiencias inolvidables.
            </p>
            
            <!-- Certificaciones -->
            <div class="certifications">
              <div class="cert-badge" v-for="cert in certifications" :key="cert.name">
                <q-icon :name="cert.icon" class="cert-icon" />
                <span class="cert-text">{{ cert.name }}</span>
              </div>
            </div>
          </div>

          <!-- Enlaces rápidos -->
          <nav class="footer-section footer-links" role="navigation" aria-label="Enlaces del sitio">
            <h4 class="section-title">Navegación</h4>
            <ul class="links-list">
              <li v-for="link in navigationLinks" :key="link.path">
                <router-link 
                  :to="link.path" 
                  class="footer-link"
                  @click="trackFooterClick('navigation', link.label)"
                >
                  <q-icon :name="link.icon" class="link-icon" />
                  <span>{{ link.label }}</span>
                </router-link>
              </li>
            </ul>
          </nav>

          <!-- Servicios -->
          <div class="footer-section footer-services">
            <h4 class="section-title">Servicios</h4>
            <ul class="links-list">
              <li v-for="service in serviceLinks" :key="service.path">
                <router-link 
                  :to="service.path" 
                  class="footer-link"
                  @click="trackFooterClick('services', service.label)"
                >
                  {{ service.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <!-- Información de contacto -->
          <div class="footer-section footer-contact">
            <h4 class="section-title">Contacto</h4>
            
            <div class="contact-info">
              <!-- Dirección -->
              <div class="contact-item">
                <q-icon name="place" class="contact-icon" />
                <div class="contact-content">
                  <span class="contact-label">Dirección</span>
                  <address class="contact-value">
                    {{ hotelConfig.CONTACT_INFO.address || hotelConfig.HOTEL_INFO.location.fullAddress }}
                  </address>
                </div>
              </div>

              <!-- Teléfono -->
              <div class="contact-item">
                <q-icon name="phone" class="contact-icon" />
                <div class="contact-content">
                  <span class="contact-label">Reservas</span>
                  <a 
                    :href="`tel:${hotelConfig.CONTACT_INFO.phone.main}`" 
                    class="contact-value contact-link"
                    @click="trackFooterClick('contact', 'phone')"
                  >
                    {{ hotelConfig.CONTACT_INFO.phone.main }}
                  </a>
                </div>
              </div>

              <!-- Email -->
              <div class="contact-item">
                <q-icon name="email" class="contact-icon" />
                <div class="contact-content">
                  <span class="contact-label">Email</span>
                  <a 
                    :href="`mailto:${hotelConfig.CONTACT_INFO.email.reservations}`" 
                    class="contact-value contact-link"
                    @click="trackFooterClick('contact', 'email')"
                  >
                    {{ hotelConfig.CONTACT_INFO.email.reservations }}
                  </a>
                </div>
              </div>

              <!-- Horarios -->
              <div class="contact-item">
                <q-icon name="schedule" class="contact-icon" />
                <div class="contact-content">
                  <span class="contact-label">Concierge</span>
                  <span class="contact-value">
                    {{ hotelConfig.SERVICES_CONFIG.concierge }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Redes sociales -->
            <div class="social-links">
              <h5 class="social-title">Síguenos</h5>
              <div class="social-icons">
                <a 
                  v-for="social in socialLinks" 
                  :key="social.name"
                  :href="social.url" 
                  class="social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`Seguir en ${social.name}`"
                  @click="trackFooterClick('social', social.name)"
                >
                  <q-icon :name="social.icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer-bottom">
      <div class="footer-container">
        <div class="footer-bottom-content">
          
          <!-- Copyright -->
          <div class="copyright">
            <p>
              © {{ currentYear }} {{ hotelConfig.HOTEL_INFO.name }}. 
              Todos los derechos reservados.
            </p>
            <p class="copyright-detail">
              Diseñado con ❤️ para crear experiencias únicas en Cartagena de Indias.
            </p>
          </div>

          <!-- Enlaces legales -->
          <nav class="legal-links" role="navigation" aria-label="Enlaces legales">
            <ul class="legal-list">
              <li v-for="legal in legalLinks" :key="legal.path">
                <router-link 
                  :to="legal.path" 
                  class="legal-link"
                  @click="trackFooterClick('legal', legal.label)"
                >
                  {{ legal.label }}
                </router-link>
              </li>
            </ul>
          </nav>

          <!-- Información adicional -->
          <div class="additional-info">
            <div class="awards">
              <span class="award-text">Miembro de</span>
              <div class="award-badges">
                <span class="award-badge">Leading Hotels</span>
                <span class="award-badge">Green Key</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de scroll to top -->
    <button 
      v-if="showScrollTop"
      class="scroll-top-btn"
      @click="scrollToTop"
      aria-label="Volver arriba"
      :class="{ 'scroll-top-btn--visible': showScrollTop }"
    >
      <q-icon name="keyboard_arrow_up" />
    </button>

  </footer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'
import hotelConfig from '../config/hotelConfig'

const router = useRouter()

const props = defineProps({
  variant: {
    type: String,
    default: 'luxury',
    validator: (value) => ['luxury', 'minimal', 'elegant'].includes(value)
  },
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['dark', 'light'].includes(value)
  },
  showNewsletter: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['newsletter-submit', 'footer-click'])

// Estado reactivo
const newsletterEmail = ref('')
const newsletterLoading = ref(false)
const newsletterError = ref('')
const newsletterSuccess = ref(false)
const showScrollTop = ref(false)
const scrollY = ref(0)

// Año actual
const currentYear = computed(() => new Date().getFullYear())

// Certificaciones
const certifications = ref([
  { name: 'Green Key', icon: 'eco' },
  { name: 'Leading Hotels', icon: 'star' },
  { name: 'Forbes Approved', icon: 'verified' }
])

// Enlaces de navegación
const navigationLinks = computed(() => hotelConfig.NAVIGATION.main)

// Enlaces de servicios
const serviceLinks = ref([
  { path: '/spa-wellness', label: 'Spa & Wellness' },
  { path: '/concierge', label: 'Concierge 24/7' },
  { path: '/eventos', label: 'Eventos Privados' },
  { path: '/transporte', label: 'Transporte Premium' },
  { path: '/experiencias', label: 'Experiencias Únicas' }
])

// Enlaces legales
const legalLinks = ref([
  { path: '/politica-privacidad', label: 'Política de Privacidad' },
  { path: '/terminos-condiciones', label: 'Términos y Condiciones' },
  { path: '/politica-cookies', label: 'Política de Cookies' },
  { path: '/politica-cancelacion', label: 'Política de Cancelación' }
])

// Enlaces sociales
const socialLinks = ref([
  { 
    name: 'Facebook', 
    icon: 'facebook', 
    url: hotelConfig.CONTACT_INFO.social?.facebook || '#' 
  },
  { 
    name: 'Instagram', 
    icon: 'instagram', 
    url: hotelConfig.CONTACT_INFO.social?.instagram || '#' 
  },
  { 
    name: 'Twitter', 
    icon: 'twitter', 
    url: hotelConfig.CONTACT_INFO.social?.twitter || '#' 
  },
  { 
    name: 'LinkedIn', 
    icon: 'linkedin', 
    url: 'https://linkedin.com/company/refugio-real-caribe' 
  }
])

// Funciones
const handleNewsletterSubmit = async () => {
  newsletterError.value = ''
  newsletterSuccess.value = false

  // Validación básica
  if (!newsletterEmail.value) {
    newsletterError.value = 'Por favor, ingrese su correo electrónico'
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newsletterEmail.value)) {
    newsletterError.value = 'Por favor, ingrese un correo electrónico válido'
    return
  }

  newsletterLoading.value = true

  try {
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    emit('newsletter-submit', {
      email: newsletterEmail.value,
      timestamp: new Date().toISOString()
    })

    newsletterSuccess.value = true
    newsletterEmail.value = ''
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      newsletterSuccess.value = false
    }, 5000)

  } catch (error) {
    newsletterError.value = 'Error al procesar la suscripción. Inténtelo nuevamente.'
  } finally {
    newsletterLoading.value = false
  }
}

const trackFooterClick = (category, label) => {
  emit('footer-click', { category, label })
  console.log(`Footer click: ${category} - ${label}`)
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  trackFooterClick('action', 'scroll_to_top')
}

const updateScrollState = () => {
  scrollY.value = window.scrollY
  showScrollTop.value = scrollY.value > 500
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', updateScrollState, { passive: true })
  updateScrollState()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<style scoped>
/* Footer principal */
.luxury-footer {
  background: var(--gradient-luxury, linear-gradient(135deg, #1a1a1a, #2d2d2d));
  color: white;
  position: relative;
  margin-top: auto;
}

.luxury-footer--light {
  background: var(--luxury-background, #fefcf8);
  color: var(--luxury-text-primary, #1a1a1a);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 var(--space-xl, 2rem);
}

/* Newsletter Section */
.footer-newsletter {
  padding: var(--space-4xl, 6rem) 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.footer-newsletter::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, rgba(212, 165, 116, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.newsletter-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4xl, 6rem);
  align-items: center;
  position: relative;
  z-index: 1;
}

.newsletter-title {
  font-family: var(--font-family-display, 'Playfair Display', serif);
  font-size: var(--text-4xl, 2.25rem);
  font-weight: 300;
  color: white;
  margin-bottom: var(--space-lg, 1.5rem);
  line-height: 1.2;
}

.newsletter-description {
  font-size: var(--text-lg, 1.125rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 1rem);
}

.newsletter-input-group {
  display: flex;
  gap: var(--space-md, 1rem);
  align-items: flex-start;
}

.input-container {
  position: relative;
  flex: 1;
}

.input-icon {
  position: absolute;
  left: var(--space-lg, 1.5rem);
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.25rem;
  z-index: 2;
}

.newsletter-input {
  width: 100%;
  padding: var(--space-lg, 1.5rem) var(--space-lg, 1.5rem) var(--space-lg, 1.5rem) 3.5rem;
  font-size: var(--text-base, 1rem);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-xl, 1rem);
  color: white;
  transition: all var(--transition-base, 0.3s ease);
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--luxury-accent, #d4a574);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.2);
}

.newsletter-input.input-error {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.newsletter-btn {
  background: var(--gradient-gold, linear-gradient(90deg, #D4A574, #8B4513));
  border: none;
  color: white;
  font-weight: 600;
  border-radius: var(--radius-xl, 1rem);
  padding: var(--space-lg, 1.5rem) var(--space-2xl, 3rem);
  white-space: nowrap;
}

.newsletter-error {
  color: #ef4444;
  font-size: var(--text-sm, 0.875rem);
  display: flex;
  align-items: center;
  gap: var(--space-sm, 0.5rem);
}

.newsletter-success {
  color: #22c55e;
  font-size: var(--text-sm, 0.875rem);
  display: flex;
  align-items: center;
  gap: var(--space-sm, 0.5rem);
}

/* Contenido principal */
.footer-main {
  padding: var(--space-4xl, 6rem) 0 var(--space-2xl, 3rem);
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--space-4xl, 6rem);
}

.footer-section {
  display: flex;
  flex-direction: column;
}

/* Sección sobre el hotel */
.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--space-lg, 1.5rem);
  margin-bottom: var(--space-xl, 2rem);
}

.brand-logo {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-lg, 0.75rem);
  overflow: hidden;
  flex-shrink: 0;
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand-name {
  font-size: var(--text-xl, 1.25rem);
  font-weight: 700;
  color: white;
  margin-bottom: var(--space-xs, 0.25rem);
  line-height: 1.2;
}

.brand-tagline {
  font-size: var(--text-sm, 0.875rem);
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.hotel-description {
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: var(--space-xl, 2rem);
}

.certifications {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md, 1rem);
}

.cert-badge {
  display: flex;
  align-items: center;
  gap: var(--space-sm, 0.5rem);
  padding: var(--space-sm, 0.5rem) var(--space-md, 1rem);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full, 9999px);
  border: 1px solid rgba(212, 165, 116, 0.3);
}

.cert-icon {
  font-size: 1rem;
  color: var(--luxury-accent, #d4a574);
}

.cert-text {
  font-size: var(--text-xs, 0.75rem);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Títulos de sección */
.section-title {
  font-size: var(--text-lg, 1.125rem);
  font-weight: 600;
  color: white;
  margin-bottom: var(--space-xl, 2rem);
  position: relative;
  padding-bottom: var(--space-sm, 0.5rem);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background: var(--luxury-accent, #d4a574);
}

/* Enlaces */
.links-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md, 1rem);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: var(--space-sm, 0.5rem);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: var(--text-sm, 0.875rem);
  transition: all var(--transition-base, 0.3s ease);
  padding: var(--space-sm, 0.5rem) 0;
}

.footer-link:hover {
  color: var(--luxury-accent, #d4a574);
  transform: translateX(8px);
}

.link-icon {
  font-size: 1rem;
  opacity: 0.7;
}

/* Información de contacto */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg, 1.5rem);
  margin-bottom: var(--space-xl, 2rem);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md, 1rem);
}

.contact-icon {
  font-size: 1.25rem;
  color: var(--luxury-accent, #d4a574);
  margin-top: 0.125rem;
  flex-shrink: 0;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs, 0.25rem);
}

.contact-label {
  font-size: var(--text-xs, 0.75rem);
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.contact-value {
  font-size: var(--text-sm, 0.875rem);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
}

.contact-link {
  text-decoration: none;
  transition: color var(--transition-base, 0.3s ease);
}

.contact-link:hover {
  color: var(--luxury-accent, #d4a574);
}

address.contact-value {
  font-style: normal;
}

/* Redes sociales */
.social-links {
  margin-top: var(--space-lg, 1.5rem);
}

.social-title {
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  color: white;
  margin-bottom: var(--space-md, 1rem);
}

.social-icons {
  display: flex;
  gap: var(--space-md, 1rem);
}

.social-link {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all var(--transition-base, 0.3s ease);
  font-size: 1.125rem;
}

.social-link:hover {
  background: var(--luxury-accent, #d4a574);
  border-color: var(--luxury-accent, #d4a574);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 165, 116, 0.3);
}

/* Footer bottom */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: var(--space-2xl, 3rem) 0;
}

.footer-bottom-content {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--space-xl, 2rem);
  align-items: center;
}

.copyright {
  font-size: var(--text-sm, 0.875rem);
  color: rgba(255, 255, 255, 0.7);
}

.copyright p {
  margin: 0 0 var(--space-xs, 0.25rem) 0;
}

.copyright-detail {
  font-size: var(--text-xs, 0.75rem);
  color: rgba(255, 255, 255, 0.5);
}

.legal-list {
  display: flex;
  gap: var(--space-xl, 2rem);
  list-style: none;
  margin: 0;
  padding: 0;
}

.legal-link {
  font-size: var(--text-sm, 0.875rem);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color var(--transition-base, 0.3s ease);
}

.legal-link:hover {
  color: var(--luxury-accent, #d4a574);
}

.additional-info {
  text-align: right;
}

.award-text {
  font-size: var(--text-xs, 0.75rem);
  color: rgba(255, 255, 255, 0.5);
  display: block;
  margin-bottom: var(--space-xs, 0.25rem);
}

.award-badges {
  display: flex;
  gap: var(--space-sm, 0.5rem);
  justify-content: flex-end;
}

.award-badge {
  font-size: var(--text-xs, 0.75rem);
  color: var(--luxury-accent, #d4a574);
  font-weight: 500;
}

/* Botón scroll to top */
.scroll-top-btn {
  position: fixed;
  bottom: var(--space-xl, 2rem);
  right: var(--space-xl, 2rem);
  width: 56px;
  height: 56px;
  background: var(--gradient-gold, linear-gradient(90deg, #D4A574, #8B4513));
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all var(--transition-base, 0.3s ease);
  box-shadow: var(--shadow-large, 0 8px 32px rgba(0,0,0,0.12));
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
}

.scroll-top-btn--visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-top-btn:hover {
  background: var(--luxury-secondary, #8b4513);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xlarge, 0 16px 64px rgba(0,0,0,0.16));
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-container {
    padding: 0 var(--space-lg, 1.5rem);
  }
  
  .newsletter-content {
    grid-template-columns: 1fr;
    gap: var(--space-2xl, 3rem);
    text-align: center;
  }
  
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-2xl, 3rem);
  }
  
  .footer-about {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .footer-newsletter {
    padding: var(--space-2xl, 3rem) 0;
  }
  
  .newsletter-title {
    font-size: var(--text-3xl, 1.875rem);
  }
  
  .newsletter-input-group {
    flex-direction: column;
  }
  
  .newsletter-btn {
    align-self: stretch;
  }
  
  .footer-main {
    padding: var(--space-2xl, 3rem) 0 var(--space-xl, 2rem);
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-2xl, 3rem);
  }
  
  .footer-about {
    grid-column: span 1;
  }
  
  .footer-bottom-content {
    grid-template-columns: 1fr;
    gap: var(--space-lg, 1.5rem);
    text-align: center;
  }
  
  .legal-list {
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-lg, 1.5rem);
  }
  
  .additional-info {
    text-align: center;
  }
  
  .award-badges {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 0 var(--space-md, 1rem);
  }
  
  .footer-brand {
    flex-direction: column;
    text-align: center;
    gap: var(--space-md, 1rem);
  }
  
  .brand-logo {
    width: 50px;
    height: 50px;
  }
  
  .certifications {
    justify-content: center;
  }
  
  .social-icons {
    justify-content: center;
  }
  
  .legal-list {
    flex-direction: column;
    gap: var(--space-md, 1rem);
  }
  
  .scroll-top-btn {
    width: 48px;
    height: 48px;
    bottom: var(--space-lg, 1.5rem);
    right: var(--space-lg, 1.5rem);
  }
}

/* Animaciones */
.footer-section {
  animation: fadeInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.footer-about { animation-delay: 0.1s; }
.footer-links { animation-delay: 0.2s; }
.footer-services { animation-delay: 0.3s; }
.footer-contact { animation-delay: 0.4s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tema claro */
.luxury-footer--light {
  color: var(--luxury-text-primary, #1a1a1a);
}

.luxury-footer--light .newsletter-title,
.luxury-footer--light .section-title,
.luxury-footer--light .brand-name {
  color: var(--luxury-text-primary, #1a1a1a);
}

.luxury-footer--light .newsletter-input {
  background: rgba(0, 0, 0, 0.05);
  border-color: var(--luxury-border, #e8e0d4);
  color: var(--luxury-text-primary, #1a1a1a);
}

.luxury-footer--light .footer-link,
.luxury-footer--light .contact-value,
.luxury-footer--light .legal-link {
  color: var(--luxury-text-secondary, #4a4a4a);
}

.luxury-footer--light .social-link {
  border-color: var(--luxury-border, #e8e0d4);
  color: var(--luxury-text-secondary, #4a4a4a);
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .luxury-footer,
  .luxury-footer * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus visible */
.newsletter-input:focus-visible,
.footer-link:focus-visible,
.social-link:focus-visible,
.legal-link:focus-visible,
.scroll-top-btn:focus-visible {
  outline: 2px solid var(--luxury-accent, #d4a574);
  outline-offset: 2px;
}
</style>