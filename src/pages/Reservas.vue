<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Reservas"
      subtitle="Disponibilidad Inmediata • Confirmación Rápida • Atención Personalizada"
      background-image="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=600&fit=crop"
      :badge="HERO_BADGE"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Formulario de Reservas -->
    <section class="reservation-form-section q-pa-xl bg-grey-1">
      <div class="container">
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
                    :options="GUEST_OPTIONS"
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
                  placeholder="Ocasión especial, preferencias, servicios adicionales..."
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
                  Enviar Solicitud de Reserva
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

    <!-- Estadísticas -->
    <StatsSection
      :stats="STATS"
      theme="blue"
      :animated="true"
    />

    <!-- CTA Section -->
    <CTASection
      title="¿Necesita Ayuda?"
      subtitle="Nuestro equipo está disponible 24/7 para asistirle con su reserva"
      button-label="Contactar Ahora"
      button-color="blue-6"
      button-icon="phone"
      button-to="/Contacto"
      theme="light"
      :animated="true"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useQuasar } from 'quasar'
import HeroSection from '../components/HeroSection.vue'
import StatsSection from '../components/StatsSection.vue'
import CTASection from '../components/CTASection.vue'

const $q = useQuasar()

// Constants
const HERO_BADGE = {
  icon: 'calendar_today',
  color: 'blue-6',
  label: 'Reserva Confirmada'
}

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8]

const ROOM_OPTIONS = [
  'Habitación Superior',
  'Habitación Deluxe', 
  'Junior Suite',
  'Suite Colonial Premium',
  'Suite Familiar',
  'Suite Presidencial'
]

const STATS = [
  { id: 1, number: '< 24h', label: 'Confirmación Reserva' },
  { id: 2, number: '6', label: 'Tipos Habitación' },
  { id: 3, number: '24/7', label: 'Atención Cliente' },
  { id: 4, number: '★★★★★', label: 'Experiencia Garantizada' }
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
    label: 'Completar Reserva',
    variant: 'hero-primary',
    color: 'orange-8',
    click: scrollToForm
  },
  {
    label: 'Contactar',
    variant: 'hero-secondary',
    color: 'white-8',
    to: '/Contacto'
  }
])

// Handlers
const handleHeroAction = ({ action }) => action.click?.()

const handleFormSubmit = async () => {
  try {
    isSubmitting.value = true
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    $q.notify({
      message: 'Solicitud enviada exitosamente. Nos contactaremos pronto.',
      color: 'positive',
      icon: 'check_circle',
      position: 'top',
      timeout: 5000
    })
    
    // Reset form
    Object.assign(form, {
      name: '', email: '', phone: '', checkIn: '', checkOut: '',
      guests: 2, roomType: 'Habitación Superior', requests: ''
    })
  } catch (error) {
    $q.notify({
      message: 'Error al enviar solicitud. Intente nuevamente.',
      color: 'negative',
      icon: 'error',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}

const scrollToForm = () => {
  document.querySelector('.reservation-form-section')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
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

.container {
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .reservation-card {
    margin: 0 8px;
  }
}
</style>