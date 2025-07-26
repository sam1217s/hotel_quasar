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

    <!-- Formulario de Reservas -->
    <section class="reservation-form-section q-pa-xl bg-grey-1">
      <div class="container-lg">
        <div class="text-center q-mb-xl">
          <h2 class="text-h3 text-grey-8 q-mb-md">Formulario de Reservas</h2>
          <p class="text-h6 text-grey-6">Complete sus datos y nos contactaremos en 24 horas</p>
        </div>

        <div class="row justify-center">
          <div class="col-12 col-md-8">
            <q-card class="reservation-card q-pa-lg">
              <q-form @submit="handleFormSubmit" class="q-gutter-md">
                <div class="row q-gutter-sm">
                  <q-input
                    v-model="form.name"
                    label="Nombre completo *"
                    outlined
                    class="col-12 col-sm-6"
                    :rules="[val => !!val || 'Requerido']"
                  />
                  <q-input
                    v-model="form.email"
                    label="Email *"
                    type="email"
                    outlined
                    class="col-12 col-sm-6"
                    :rules="[val => !!val || 'Requerido', val => /.+@.+\..+/.test(val) || 'Email inválido']"
                  />
                </div>

                <div class="row q-gutter-sm">
                  <q-input
                    v-model="form.phone"
                    label="Teléfono"
                    outlined
                    class="col-12 col-sm-6"
                  />
                  <q-select
                    v-model="form.guests"
                    label="Huéspedes"
                    :options="[1,2,3,4,5,6,7,8]"
                    outlined
                    class="col-12 col-sm-6"
                  />
                </div>

                <div class="row q-gutter-sm">
                  <q-input
                    v-model="form.checkIn"
                    label="Check-in"
                    type="date"
                    outlined
                    class="col-12 col-sm-6"
                  />
                  <q-input
                    v-model="form.checkOut"
                    label="Check-out"
                    type="date"
                    outlined
                    class="col-12 col-sm-6"
                  />
                </div>

                <q-select
                  v-model="form.roomType"
                  label="Tipo de habitación"
                  :options="ROOM_OPTIONS"
                  outlined
                />

                <q-input
                  v-model="form.requests"
                  label="Solicitudes especiales"
                  type="textarea"
                  outlined
                  rows="3"
                />

                <q-btn
                  type="submit"
                  color="blue-6"
                  icon="send"
                  size="lg"
                  unelevated
                  :loading="isSubmitting"
                  class="full-width q-mt-md"
                >
                  Enviar Solicitud
                </q-btn>

                <div class="text-center q-mt-md">
                  <div class="text-body2 text-grey-6">
                    <q-icon name="schedule" size="sm" class="q-mr-xs" />
                    Respuesta garantizada en 24 horas
                  </div>
                </div>
              </q-form>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTASection
      title="¿Listo para su Experiencia?"
      subtitle="Reserve ahora y viva la magia del convento más exclusivo de Cartagena"
      button-label="Hacer Reserva"
      button-color="blue-6"
      button-icon="calendar_today"
      :button-click="scrollToForm"
      theme="light"
      :animated="true"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import HeroSection from '../components/HeroSection.vue'
import BaseCarousel2D from '../components/BaseCarousel2D.vue'
import StatsSection from '../components/StatsSection.vue'
import CTASection from '../components/CTASection.vue'

const $q = useQuasar()

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

const ROOM_OPTIONS = [
  'Habitación Superior',
  'Habitación Deluxe', 
  'Junior Suite',
  'Suite Colonial Premium',
  'Suite Familiar',
  'Suite Presidencial'
]

// State
const isSubmitting = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  roomType: 'Habitación Superior',
  requests: ''
})

// Computed
const heroActions = computed(() => [
  {
    label: 'Reservar',
    variant: 'hero-primary',
    color: 'orange-8',
    click: scrollToForm
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

const handleFormSubmit = async () => {
  try {
    isSubmitting.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    $q.notify({
      message: 'Solicitud enviada. Nos contactaremos pronto.',
      color: 'positive',
      icon: 'check_circle',
      position: 'top'
    })
    
    Object.assign(form, {
      name: '', email: '', phone: '', checkIn: '', checkOut: '',
      guests: 2, roomType: 'Habitación Superior', requests: ''
    })
  } catch (error) {
    $q.notify({
      message: 'Error al enviar. Intente nuevamente.',
      color: 'negative',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}

const scrollToForm = () => {
  document.querySelector('.reservation-form-section')?.scrollIntoView({ behavior: 'smooth' })
}
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