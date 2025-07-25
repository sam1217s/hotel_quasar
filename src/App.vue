<template>
  <q-layout view="hHh Lpr fff" class="main-layout">
    <!-- Header -->
    <q-header elevated class="bg-black text-white-8" height-hint="80">
      <q-toolbar class="q-px-lg">
        <!-- Logo y título -->
        <q-toolbar-title class="header-brand">
          <q-avatar size="32px" class="q-mr-sm">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=64&h=64&fit=crop" alt="Sofitel"/>
          </q-avatar>
          <div class="brand-text">
            <div class="brand-name text-orange-4">Sofitel Legend</div>
            <div class="brand-subtitle text-grey-6">Santa Clara</div>
          </div>
        </q-toolbar-title>

        <q-space />

        <!-- Navegación desktop -->
        <div class="nav-desktop gt-sm">
          <q-btn 
            flat
            :to="item.to"
            :label="item.label"
            class="nav-btn text-white-8"
            v-for="item in navItems" 
            :key="item.to"
          />
        </div>

        <!-- Botón de reserva -->
        <q-btn 
          unelevated
          color="brown-7"
          label="Reservar"
          to="/Contacto"
          class="reserve-btn gt-sm q-ml-md"
        />

        <!-- Menú móvil -->
        <q-btn 
          flat
          round
          icon="menu"
          class="lt-md"
          @click="mobileMenu = true"
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
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=64&h=64&fit=crop" alt="Sofitel"/>
            </q-avatar>
            <div>
              <div class="text-h6 text-brown-7">Sofitel Legend</div>
              <div class="text-caption text-grey-6">Santa Clara</div>
            </div>
          </div>
          <q-btn flat round icon="close" @click="mobileMenu = false" />
        </div>

        <q-separator class="q-mb-lg" />

        <!-- Navegación móvil -->
        <div class="mobile-nav q-mb-lg">
          <q-btn
            v-for="item in navItems"
            :key="item.to"
            flat
            :to="item.to"
            :label="item.label"
            :icon="item.icon"
            align="left"
            class="mobile-nav-btn"
            @click="mobileMenu = false"
          />
        </div>

        <q-separator class="q-mb-lg" />

        <!-- Acciones del drawer -->
        <div class="drawer-actions">
          <q-btn
            unelevated
            color="brown-7"
            label="Reservar Ahora"
            to="/Contacto"
            class="full-width q-mb-md"
            @click="mobileMenu = false"
          />
          
          <div class="contact-info text-center">
            <div class="text-body2 text-grey-6 q-mb-xs">
              <q-icon name="phone" size="sm" class="q-mr-xs" />
              +57 605 650 4700
            </div>
            <div class="text-body2 text-grey-6">
              <q-icon name="email" size="sm" class="q-mr-xs" />
              reservas@sofitel-cartagena.com
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <!-- Contenido principal -->
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>

    <!-- Footer - Solo visible al final -->
    <footer class="main-footer bg-black-8 text-white">
      <div class="footer-content q-pa-sm">
        <div class="row q-col-gutter-md">
          <!-- Información del hotel -->
          <div class="col-12 col-md-4">
            <div class="footer-section">
              <div class="text-h6 q-mb-md">Sofitel Legend Santa Clara</div>
              <div class="text-body2 text-grey-4 q-mb-md">
                Convento del siglo XVII convertido en hotel de lujo en el corazón 
                del Centro Histórico de Cartagena de Indias.
              </div>
              <q-chip 
                color="positive" 
                text-color="white"
                icon="eco" 
                label="Green Key Certified"
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
                  <span class="text-body2">Centro Histórico, Cartagena</span>
                </div>
                <div class="contact-item q-mb-sm">
                  <q-icon name="phone" size="sm" class="q-mr-sm" />
                  <span class="text-body2">+57 605 650 4700</span>
                </div>
                <div class="contact-item q-mb-sm">
                  <q-icon name="email" size="sm" class="q-mr-sm" />
                  <span class="text-body2">reservas@sofitel-cartagena.com</span>
                </div>
                <div class="contact-item">
                  <q-icon name="schedule" size="sm" class="q-mr-sm" />
                  <span class="text-body2">Atención 24/7</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enlaces rápidos -->
          <div class="col-12 col-md-4">
            <div class="footer-section">
              <div class="text-h6 q-mb-md">Enlaces Rápidos</div>
              <div class="footer-links two-columns">
                <q-btn 
                  flat 
                  align="left"
                  :to="item.to"
                  :label="item.label" 
                  class="footer-link "
                  v-for="item in navItems" 
                  :key="item.to"
                />
              </div>
            </div>
          </div>
        </div>

        <q-separator color="grey-7" class="q-my-lg" />

        <div class="footer-bottom row items-center justify-between">
          <div class="text-body2 text-grey-4">
            © 2025 Sofitel Legend Santa Clara. Todos los derechos reservados.
          </div>
          <div class="footer-legal">
            <q-btn flat size="sm" label="Privacidad" class="text-grey-4" />
            <q-btn flat size="sm" label="Términos" class="text-grey-4" />
          </div>
        </div>
      </div>
    </footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenu = ref(false)

const navItems = ref([
  { to: '/', label: 'Inicio', icon: 'home' },
  { to: '/Habitaciones', label: 'Habitaciones', icon: 'bed' },
  { to: '/Restaurantes', label: 'Restaurantes', icon: 'restaurant' },
  { to: '/Bienestar', label: 'Bienestar', icon: 'spa' },
  { to: '/DeportesExtremos', label: 'Deportes Extremos', icon: 'sports_handball' },
  { to: '/Contacto', label: 'Contacto', icon: 'contact_mail' },
])
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

.nav-btn {
  font-weight: 400;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #8D4513;
}

.nav-btn.router-link-active {
  background: rgba(141, 69, 19, 0.1);
  color: #8D4513;
  font-weight: 500;
}

.reserve-btn {
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.reserve-btn:hover {
  transform: translateY(-1px);
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
.two-columns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px; /* espacio entre columnas */
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

.q-btn {
  transition: all 0.2s ease;
}

.q-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>