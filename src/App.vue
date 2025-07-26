<template>
  <q-layout view="hHh Lpr fff" class="main-layout">
    <!-- Header -->
    <q-header elevated class="bg-black text-white-8" height-hint="80">
      <q-toolbar class="q-px-lg">
        <!-- Logo y título -->
        <q-toolbar-title class="header-brand">
          <q-avatar size="32px" class="q-mr-sm">
            <img :src="hotelConfig.DEFAULT_IMAGES.logo" :alt="hotelConfig.HOTEL_INFO.shortName"/>
          </q-avatar>
          <div class="brand-text">
            <div class="brand-name text-orange-4">{{ hotelConfig.HOTEL_INFO.name }}</div>
            <div class="brand-subtitle text-grey-6">{{ hotelConfig.HOTEL_INFO.location.city }}</div>
          </div>
        </q-toolbar-title>

        <q-space />

        <!-- Navegación desktop -->
        <div class="nav-desktop gt-sm">
          <BaseButton
            v-for="item in navigation.main" 
            :key="item.path"
            variant="nav"
            :label="item.label"
            :to="item.path"
            :class="{ 'router-link-active': isActiveRoute(item.path) }"
          />
        </div>

        <!-- Botón de reserva -->
        <BaseButton
          variant="reserve"
          label="Reservar"
          to="/Contacto"
          class="gt-sm q-ml-md"
        />

        <!-- Menú móvil -->
        <BaseButton
          variant="nav"
          icon="menu"
          round
          class="lt-md"
          @click="toggleMobileMenu"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer móvil -->
    <q-drawer
      v-model="mobileMenu"
      side="right"
      overlay
      behavior="mobile"
      bordered
      class="mobile-drawer"
    >
      <div class="drawer-content q-pa-md">
        <!-- Header del drawer -->
        <div class="drawer-header q-mb-lg">
          <div class="drawer-brand">
            <q-avatar size="40px" class="q-mr-sm">
              <img :src="hotelConfig.DEFAULT_IMAGES.logo" :alt="hotelConfig.HOTEL_INFO.shortName"/>
            </q-avatar>
            <div>
              <div class="text-h6 text-brown-7">{{ hotelConfig.HOTEL_INFO.shortName }}</div>
              <div class="text-caption text-grey-6">{{ hotelConfig.HOTEL_INFO.location.city }}</div>
            </div>
          </div>
          <BaseButton
            variant="nav"
            icon="close"
            round
            @click="closeMobileMenu"
          />
        </div>

        <q-separator class="q-mb-lg" />

        <!-- Navegación móvil -->
        <div class="mobile-nav q-mb-lg">
          <BaseButton
            v-for="item in navigation.main"
            :key="item.path"
            variant="nav"
            :to="item.path"
            :label="item.label"
            :icon="item.icon"
            align="left"
            class="mobile-nav-btn"
            @click="closeMobileMenu"
          />
        </div>

        <q-separator class="q-mb-lg" />

        <!-- Acciones del drawer -->
        <div class="drawer-actions">
          <BaseButton
            variant="cta"
            label="Reservar Ahora"
            to="/Contacto"
            icon="hotel"
            class="full-width q-mb-md"
            @click="closeMobileMenu"
          />
          
          <div class="contact-info text-center">
            <div class="text-body2 text-grey-6 q-mb-xs">
              <q-icon name="phone" size="sm" class="q-mr-xs" />
              {{ hotelConfig.CONTACT_INFO.phone.main }}
            </div>
            <div class="text-body2 text-grey-6">
              <q-icon name="email" size="sm" class="q-mr-xs" />
              {{ hotelConfig.CONTACT_INFO.email.reservations }}
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <!-- Contenido principal -->
    <q-page-container class="page-container">
      <!-- Indicador de carga global -->
      <q-linear-progress 
        v-if="isLoading" 
        indeterminate 
        color="orange-8" 
        class="loading-indicator"
      />
      
      <!-- Router View con transiciones -->
      <transition
        :name="transitionName"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @after-enter="onAfterEnter"
      >
        <router-view />
      </transition>
    </q-page-container>

    <!-- Footer -->
    <footer class="main-footer bg-black-8 text-white">
      <div class="footer-content q-pa-lg">
        <div class="row q-col-gutter-md">
          <!-- Información del hotel -->
          <div class="col-12 col-md-4">
            <div class="footer-section">
              <div class="text-h6 q-mb-md">{{ hotelConfig.HOTEL_INFO.name }}</div>
              <div class="text-body2 text-grey-4 q-mb-md">
                {{ hotelConfig.HOTEL_INFO.tagline }}
              </div>
              <q-chip 
                color="positive" 
                text-color="white"
                icon="eco" 
                :label="hotelConfig.HOTEL_INFO.certification"
                size="sm"
              />
            </div>
          </div>
          
          <!-- Contacto -->
          <div class="col-12 col-md-4">
            <div class="footer-section">
              <div class="text-h6 q-mb-md">Contacto</div>
              <div class="footer-contact">
                <div class="contact-item q-mb-sm">
                  <q-icon name="place" size="sm" class="q-mr-sm" />
                  <span class="text-body2">{{ hotelConfig.HOTEL_INFO.location.fullAddress }}</span>
                </div>
                <div class="contact-item q-mb-sm">
                  <q-icon name="phone" size="sm" class="q-mr-sm" />
                  <span class="text-body2">{{ hotelConfig.CONTACT_INFO.phone.main }}</span>
                </div>
                <div class="contact-item q-mb-sm">
                  <q-icon name="email" size="sm" class="q-mr-sm" />
                  <span class="text-body2">{{ hotelConfig.CONTACT_INFO.email.reservations }}</span>
                </div>
                <div class="contact-item">
                  <q-icon name="schedule" size="sm" class="q-mr-sm" />
                  <span class="text-body2">Atención {{ hotelConfig.SERVICES_CONFIG.concierge }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enlaces rápidos -->
          <div class="col-12 col-md-4">
            <div class="footer-section">
              <div class="text-h6 q-mb-md">Enlaces Rápidos</div>
              <div class="footer-links">
                <BaseButton
                  v-for="item in navigation.main" 
                  :key="item.path"
                  variant="nav"
                  :to="item.path"
                  :label="item.label" 
                  class="footer-link"
                  align="left"
                />
              </div>
            </div>
          </div>
        </div>

        <q-separator color="grey-7" class="q-my-lg" />

        <div class="footer-bottom row items-center justify-between">
          <div class="text-body2 text-grey-4">
            © {{ currentYear }} {{ hotelConfig.HOTEL_INFO.name }}. Todos los derechos reservados.
          </div>
          <div class="footer-legal">
            <BaseButton
              v-for="link in navigation.footer"
              :key="link.path"
              variant="nav"
              :label="link.label"
              :to="link.path"
              size="sm"
              class="text-grey-4"
            />
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <BaseButton
        v-show="showScrollTop"
        variant="primary"
        icon="keyboard_arrow_up"
        round
        color="brown-7"
        class="scroll-top-btn"
        @click="scrollToTop"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from './components/BaseButton.vue'
import { useScroll } from './composables/useScroll'
import hotelConfig from './config/hotelConfig'

// Composables
const route = useRoute()
const router = useRouter()
const { scrollY, scrollToTop: smoothScrollToTop } = useScroll()

// Estado reactivo
const mobileMenu = ref(false)
const isLoading = ref(false)
const transitionName = ref('fade')

// Configuración de navegación
const navigation = computed(() => hotelConfig.NAVIGATION)
const currentYear = computed(() => new Date().getFullYear())
const showScrollTop = computed(() => scrollY.value > 300)

// Verificar si una ruta está activa
const isActiveRoute = (path) => route.path === path

// Determinar transición basada en la navegación
const getTransitionName = (to, from) => {
  const routes = ['/Habitaciones', '/Restaurantes', '/Bienestar', '/DeportesExtremos', '/Contacto']
  const toIndex = routes.indexOf(to)
  const fromIndex = routes.indexOf(from)
  
  if (toIndex === -1 || fromIndex === -1) return 'fade'
  return toIndex > fromIndex ? 'slide-left' : 'slide-right'
}

// Event handlers simplificados
const toggleMobileMenu = () => {
  mobileMenu.value = !mobileMenu.value
}

const closeMobileMenu = () => {
  mobileMenu.value = false
}

const scrollToTop = () => {
  smoothScrollToTop()
}

// Transition hooks
const onBeforeEnter = () => {
  isLoading.value = true
}

const onAfterEnter = () => {
  isLoading.value = false
}

// Watchers
watch(route, (to, from) => {
  transitionName.value = getTransitionName(to.path, from.path)
  mobileMenu.value = false
})

// Navigation guard para tracking
router.beforeEach((to, from, next) => {
  console.log('Navigating to:', to.name)
  next()
})

onMounted(() => {
  console.log('App mounted with hotel config:', hotelConfig.HOTEL_INFO.name)
})
</script>
<style scoped>
.main-layout {
  min-height: 100vh;
}

/* Header */
.header-brand {
  display: flex;
  align-items: center;
  font-size: 1rem;
}

.brand-text {
  line-height: 1.2;
}

.brand-name {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.brand-subtitle {
  font-size: 0.85rem;
  font-weight: 400;
}

.nav-desktop {
  display: flex;
  gap: 0.5rem;
}

/* Drawer móvil */
.mobile-drawer {
  width: 300px;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-brand {
  display: flex;
  align-items: center;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-btn {
  justify-content: flex-start;
  padding: 12px 16px;
  border-radius: 8px;
  color: #666;
  font-weight: 400;
}

.mobile-nav-btn:hover {
  background: rgba(141, 69, 19, 0.1);
  color: #8D4513;
}

.contact-info {
  padding: 1rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

/* Contenido principal */
.page-container {
  padding-bottom: 0;
  position: relative;
}

.loading-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}

/* Footer */
.main-footer {
  margin-top: auto;
}

.footer-section {
  height: 100%;
}

.footer-contact {
  display: flex;
  flex-direction: column;
}

.contact-item {
  display: flex;
  align-items: center;
  color: #ccc;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer-link {
  justify-content: flex-start;
  padding: 4px 0;
  color: #ccc;
  font-weight: 400;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-legal {
  display: flex;
  gap: 0.5rem;
}

/* Scroll to top button */
.scroll-top-btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

/* Transiciones de página */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .header-brand {
    font-size: 0.9rem;
  }
  
  .brand-name {
    font-size: 1rem;
  }
  
  .brand-subtitle {
    font-size: 0.8rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .footer-legal {
    justify-content: center;
  }
  
  .row.q-col-gutter-md > div {
    margin-bottom: 2rem;
  }
}

/* Animaciones suaves */
.q-layout {
  transition: all 0.3s ease;
}

.q-header {
  transition: all 0.3s ease;
  border-bottom: 1px solid #e8e8e8;
}

/* Estados de navegación activa */
.router-link-active {
  background: rgba(141, 69, 19, 0.1) !important;
  color: #8D4513 !important;
  font-weight: 500;
}
</style>