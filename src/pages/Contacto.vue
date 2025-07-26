<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Contacto y Reservas"
      subtitle="Experiencia Única • Servicio Exclusivo • Reservas Inmediatas"
      background-image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop"
      :badge="HERO_BADGE"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Carrusel 2D de Formas de Contacto -->
    <BaseCarousel2D
      :items="CONTACT_METHODS"
      title="Formas de Contacto"
      subtitle="Múltiples canales para brindarle la mejor atención personalizada"
      :autoplay-delay="3500"
      default-color="blue-6"
      button-variant="primary"
      @item-click="handleContactClick"
    />

    <!-- Estadísticas -->
    <StatsSection
      :stats="STATS"
      theme="blue"
      :animated="true"
    />



    <!-- CTA Section -->
    <CTASection
      title="¿Listo para su Experiencia?"
      subtitle="Reserve ahora y viva la magia del convento más exclusivo de Cartagena"
      button-label="Hacer Reserva"
      button-color="blue-6"
      button-icon="calendar_today"
      button-to="/Reservas"
      theme="light"
      :animated="true"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import BaseCarousel2D from '../components/BaseCarousel2D.vue'
import StatsSection from '../components/StatsSection.vue'
import CTASection from '../components/CTASection.vue'

// Constants
const HERO_BADGE = {
  icon: 'contact_mail',
  color: 'blue-6',
  label: 'Atención 24/7'
}

const CONTACT_METHODS = [
  {
    id: 1,
    icon: 'phone',
    color: 'blue-6',
    name: 'Atención Telefónica',
    description: 'Línea directa 24 horas para reservas inmediatas y consultas especializadas',
    info: '+57 605 650 4700',
    features: ['24/7', 'Reservas Inmediatas', 'Múltiples Idiomas'],
    buttonText: 'Llamar',
    action: () => window.open('tel:+57605650470', '_self')
  },
  {
    id: 2,
    icon: 'email',
    color: 'green-6',
    name: 'Email Corporativo',
    description: 'Correo oficial para consultas detalladas y cotizaciones personalizadas',
    info: 'reservas@sofitel-cartagena.com',
    features: ['Respuesta 4h', 'Cotizaciones', 'Confirmación Escrita'],
    buttonText: 'Email',
    action: () => window.open('mailto:reservas@sofitel-cartagena.com', '_blank')
  },
  {
    id: 3,
    icon: 'chat',
    color: 'teal-6',
    name: 'WhatsApp',
    description: 'Chat directo con reservas para atención inmediata',
    info: '6:00 AM - 11:00 PM',
    features: ['Inmediato', 'Multimedia', 'Soporte Visual'],
    buttonText: 'Chat',
    action: () => {
      const msg = encodeURIComponent('Hola, información sobre reservas.')
      window.open(`https://wa.me/57605650470?text=${msg}`, '_blank')
    }
  },
  {
    id: 4,
    icon: 'location_on',
    color: 'orange-6',
    name: 'Visita Presencial',
    description: 'Lobby del hotel para atención presencial y tours',
    info: 'Centro Histórico, Cartagena',
    features: ['Tour Gratuito', 'Degustación', 'Asesoría'],
    buttonText: 'Ubicación',
    action: () => window.open('https://maps.google.com/?q=Sofitel+Legend+Santa+Clara+Cartagena', '_blank')
  }
]

const STATS = [
  { id: 1, number: '24/7', label: 'Atención Disponible' },
  { id: 2, number: '4', label: 'Canales Contacto' },
  { id: 3, number: '< 4h', label: 'Tiempo Respuesta' },
  { id: 4, number: '★★★★★', label: 'Servicio Cliente' }
]

// Computed
const heroActions = computed(() => [
  {
    label: 'Reservar',
    variant: 'hero-primary',
    color: 'orange-8',
    to: '/Reservas'
  },
  {
    label: 'Contacto',
    variant: 'hero-secondary',
    color: 'white-8',
    click: () => document.querySelector('.carousel-section')?.scrollIntoView({ behavior: 'smooth' })
  }
])

// Handlers
const handleHeroAction = ({ action }) => action.click?.()

const handleContactClick = (method) => method.action?.()
</script>

<style scoped>
.reservation-form-section {
  background: #f8f9fa;
}

.reservation-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}

.container-lg {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .reservation-card {
    margin: 0 8px;
  }
}
</style>