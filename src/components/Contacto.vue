<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section q-pa-sm overflow-hidden">
      <div class="hero-content text-center q-pa-xl">
        <div class="hero-badge q-mb-md">
          <q-chip icon="contact_mail" color="blue-6" text-color="white" label="Atención Personalizada 24/7" />
        </div>
        <h1 class="text-h2 text-orange q-mb-md">Contacto y Reservas</h1>
        <p class="text-h6 text-white-6 q-mb-xl">Experiencia Única • Servicio Exclusivo • Reservas Inmediatas</p>
        <div class="hero-actions">
          <q-btn size="lg" color="orange-8" label="Reservar Ahora" outline class="q-mr-md q-mb-sm" unelevated @click="scrollToReservation" />
          <q-btn size="lg" color="white-8" label="Información" outline class="q-mb-sm" @click="scrollToContact" />
        </div>
      </div>
    </section>

    <!-- Features Carousel Section -->
    <section class="q-pa-xl" ref="contactSection">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange">Formas de Contacto</h2>
        <p class="text-h6 text-grey-6">Múltiples canales para brindarle la mejor atención personalizada</p>
      </div>

      <div class="carousel-container">
        <q-carousel 
          ref="carousel" 
          v-model="currentSlide" 
          animated 
          arrows 
          navigation 
          infinite 
          autoplay
          :autoplay-delay="3500" 
          height="500px" 
          class="features-carousel"
        >
          <q-carousel-slide 
            v-for="contact in contactMethods" 
            :key="contact.id" 
            :name="contact.id"
            class="carousel-slide flex flex-center"
          >
            <div class="fit flex flex-center">
              <q-card class="feature-card-carousel text-center" flat>
                <q-card-section class="q-pa-s">
                  <q-icon :name="contact.icon" size="4.5rem" :color="contact.color" class="q-mb-lg" />
                  <h3 class="text-h4 text-grey-8 q-mb-md">{{ contact.name }}</h3>
                  <p class="text-h6 text-grey-6 q-mb-lg" style="max-width: 450px; margin: 0 auto;">
                    {{ contact.description }}
                  </p>
                  <div class="contact-details q-mb-lg">
                    <div class="text-subtitle1 text-grey-8 q-mb-sm">{{ contact.info }}</div>
                    <q-chip 
                      v-for="feature in contact.features" 
                      :key="feature"
                      :color="contact.color" 
                      text-color="white" 
                      size="sm" 
                      :label="feature" 
                      class="q-mr-xs q-mb-xs" 
                    />
                  </div>
                  <q-btn 
                    unelevated 
                    size="lg" 
                    :color="contact.color" 
                    :label="contact.buttonText" 
                    @click="contact.action"
                    class="q-mt-md q-px-lg" 
                  />
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section bg-blue-6 text-white q-pa-xl">
      <div class="row text-center">
        <div v-for="stat in stats" :key="stat.id" class="col-lg-3 col-md-6 col-sm-6 col-xs-12 q-mb-lg">
          <div class="stat-item">
            <div class="text-h3 text-weight-light q-mb-sm">{{ stat.number }}</div>
            <div class="text-body1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights 3D Carousel Section -->
    <section class="q-pa-xl bg-black-6">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange-8">Servicios Especiales</h2>
        <p class="text-h6 text-white-3">Experiencias exclusivas que podemos organizar para usted</p>
      </div>

      <div class="carousel-3d-container">
        <div class="carousel-3d" ref="carousel3d">
          <div 
            v-for="(highlight, index) in highlights3d" 
            :key="highlight.id" 
            class="carousel-3d-item"
            :style="{ transform: `rotateY(${index * 45}deg) translateZ(450px)` }"
            @click="scrollToReservation"
          >
            <q-card class="highlight-3d-card cursor-pointer">
              <q-img :src="highlight.image" height="180px" class="highlight-image" />
              <q-card-section class="text-center q-pa-md">
                <div class="text-h6 text-grey-8 text-weight-medium">{{ highlight.title }}</div>
                <q-icon name="touch_app" size="sm" color="blue" class="click-indicator q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Reservation Form Section -->
    <section class="reservation-section q-pa-xl bg-grey-1" ref="reservationSection">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Formulario de Reservas</h2>
        <p class="text-h6 text-grey-6">Complete sus datos y nos contactaremos en las próximas 24 horas</p>
      </div>
      
      <div class="row justify-center">
        <div class="col-lg-8 col-md-10 col-sm-12 col-xs-12">
          <q-card class="reservation-card" flat bordered>
            <q-card-section class="q-pa-xl">
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="row q-gutter-md">
                  <div class="col-md-6 col-sm-12 col-xs-12 ">
                    <q-input 
                      v-model="form.name"
                      label="Nombre completo"
                      outlined
                      :rules="[val => !!val || 'Nombre es requerido']"
                      class="form-input"
                      
                    />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                      v-model="form.email"
                      type="email"
                      label="Email"
                      outlined
                      :rules="[val => !!val || 'Email es requerido']"
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="row q-gutter-md q-mt-md">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                      v-model="form.phone"
                      label="Teléfono"
                      outlined
                      class="form-input"
                    />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-select 
                      v-model="form.guests"
                      :options="guestOptions"
                      label="Número de huéspedes"
                      outlined
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="row q-gutter-md q-mt-md">
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                      v-model="form.checkIn"
                      type="date"
                      label="Check-in"
                      outlined
                      class="form-input"
                    />
                  </div>
                  <div class="col-md-6 col-sm-12 col-xs-12">
                    <q-input 
                      v-model="form.checkOut"
                      type="date"
                      label="Check-out"
                      outlined
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="row q-gutter-md q-mt-md">
                  <div class="col-12">
                    <q-select 
                      v-model="form.roomType"
                      :options="roomOptions"
                      label="Tipo de habitación"
                      outlined
                      class="form-input"
                    />
                  </div>
                </div>

                <div class="row q-mt-md">
                  <div class="col-12">
                    <q-input 
                      v-model="form.requests"
                      type="textarea"
                      label="Solicitudes especiales"
                      outlined
                      rows="4"
                      class="form-input"
                      placeholder="Ocasión especial, preferencias de habitación, servicios adicionales, etc."
                    />
                  </div>
                </div>

                <div class="text-center q-mt-xl">
                  <q-btn 
                    type="submit"
                    unelevated
                    rounded
                    size="lg"
                    color="blue-6"
                    label="Enviar Solicitud de Reserva"
                    class="submit-btn q-px-xl"
                    no-caps
                    :loading="isSubmitting"
                  />
                  <p class="form-note q-mt-md">
                    <q-icon name="schedule" size="sm" class="q-mr-xs" />
                    Respuesta garantizada en 24 horas
                  </p>
                </div>
              </form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Contact Information Section -->
    <section class="info-section q-pa-xl bg-blue-9 text-white">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-white">Información de Contacto</h2>
        <p class="text-h6 text-grey-4">Todas las formas de llegar a nosotros</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="info in contactInfo" :key="info.id" class="col-md-4 col-sm-6 col-xs-12">
          <q-card class="info-card" dark>
            <q-card-section class="text-center q-pa-lg">
              <q-icon :name="info.icon" size="3rem" :color="info.color" class="q-mb-md" />
              <div class="text-h6 text-white q-mb-sm">{{ info.title }}</div>
              <div class="text-body1 text-grey-4 q-mb-md">{{ info.main }}</div>
              <div class="text-body2 text-grey-5">{{ info.secondary }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Quick Actions Section -->
    <section class="quick-actions-section q-pa-xl bg-grey-2">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Acciones Rápidas</h2>
        <p class="text-h6 text-grey-6">Contacte con nosotros al instante</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="action in quickActions" :key="action.id" class="col-md-3 col-sm-6 col-xs-12">
          <q-card class="action-card cursor-pointer" flat bordered @click="action.action">
            <q-card-section class="text-center q-pa-lg">
              <q-icon :name="action.icon" size="3rem" :color="action.color" class="q-mb-md" />
              <div class="text-h6 text-grey-8 q-mb-sm">{{ action.title }}</div>
              <div class="text-body2 text-grey-6">{{ action.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">¿Listo para su Experiencia?</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Reserve ahora y viva la magia del convento más exclusivo de Cartagena</p>
      <q-btn 
        size="lg" 
        color="blue-6" 
        text-color="white" 
        label="Hacer Reserva Ahora" 
        @click="scrollToReservation"
        unelevated
        class="q-px-xl" 
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const currentSlide = ref(1)
const carousel = ref(null)
const carousel3d = ref(null)
const contactSection = ref(null)
const reservationSection = ref(null)
let rotation = 0
let animationId = null

// Estado del formulario
const isSubmitting = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  roomType: 'Habitación Superior',
  requests: ''
})

// Opciones para selects
const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8]
const roomOptions = [
  'Habitación Superior',
  'Habitación Deluxe', 
  'Junior Suite',
  'Suite Colonial Premium',
  'Suite Familiar',
  'Suite Presidencial'
]

const contactMethods = ref([
  {
    id: 1,
    icon: 'phone',
    color: 'blue-6',
    name: 'Atención Telefónica',
    description: 'Línea directa disponible las 24 horas para reservas inmediatas y consultas especializadas',
    info: '+57 605 650 4700',
    features: ['Disponible 24/7', 'Reservas Inmediatas', 'Múltiples Idiomas', 'Atención Especializada'],
    buttonText: 'Llamar Ahora',
    action: () => window.open('tel:+57605650470', '_self')
  },
  {
    id: 2,
    icon: 'email',
    color: 'green-6',
    name: 'Email Corporativo',
    description: 'Correo electrónico oficial para consultas detalladas, cotizaciones personalizadas y comunicación formal',
    info: 'reservas@sofitel-cartagena.com',
    features: ['Respuesta en 4 horas', 'Cotizaciones Detalladas', 'Seguimiento Personal', 'Confirmación Escrita'],
    buttonText: 'Enviar Email',
    action: () => window.open('mailto:reservas@sofitel-cartagena.com', '_blank')
  },
  {
    id: 3,
    icon: 'chat',
    color: 'teal-6',
    name: 'WhatsApp Business',
    description: 'Chat directo con nuestro equipo de reservas para atención inmediata y consultas rápidas',
    info: 'Chat disponible: 6:00 AM - 11:00 PM',
    features: ['Respuesta Inmediata', 'Multimedia', 'Ubicación en Tiempo Real', 'Soporte Visual'],
    buttonText: 'Chatear',
    action: () => {
      const message = encodeURIComponent('Hola, me gustaría información sobre disponibilidad y reservas en Sofitel Legend Santa Clara.')
      window.open(`https://wa.me/57605650470?text=${message}`, '_blank')
    }
  },
  {
    id: 4,
    icon: 'location_on',
    color: 'orange-6',
    name: 'Oficina de Reservas',
    description: 'Visítenos personalmente en el lobby del hotel para atención presencial y tours del establecimiento',
    info: 'Centro Histórico, Cartagena de Indias',
    features: ['Atención Presencial', 'Tour Gratuito', 'Degustación', 'Asesoría Completa'],
    buttonText: 'Ver Ubicación',
    action: () => window.open('https://maps.google.com/?q=Sofitel+Legend+Santa+Clara+Cartagena', '_blank')
  },
  {
    id: 5,
    icon: 'support_agent',
    color: 'purple-6',
    name: 'Concierge Personal',
    description: 'Servicio de concierge dedicado para huéspedes VIP y reservas de servicios exclusivos',
    info: 'Disponible para huéspedes premium',
    features: ['Servicio VIP', 'Atención Exclusiva', 'Servicios Premium', 'Experiencias Únicas'],
    buttonText: 'Solicitar',
    action: () => scrollToReservation()
  }
])

const stats = ref([
  { id: 1, number: '24/7', label: 'Atención Disponible' },
  { id: 2, number: '5', label: 'Canales de Contacto' },
  { id: 3, number: '< 4h', label: 'Tiempo de Respuesta' },
  { id: 4, number: '★★★★★', label: 'Servicio al Cliente' }
])

const highlights3d = ref([
  {
    id: 1,
    title: 'Traslados VIP',
    description: 'Transporte ejecutivo desde el aeropuerto',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Tours Privados',
    description: 'Recorridos exclusivos por Cartagena',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Cenas Románticas',
    description: 'Experiencias culinarias personalizadas',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Eventos Especiales',
    description: 'Bodas y celebraciones únicas',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Experiencias Náuticas',
    description: 'Excursiones en yate privado',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Servicios Corporativos',
    description: 'Eventos empresariales exclusivos',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop'
  },
  {
    id: 7,
    title: 'Paquetes Wellness',
    description: 'Retiros de bienestar personalizado',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop'
  },
  {
    id: 8,
    title: 'Experiencias Culturales',
    description: 'Inmersión en la cultura caribeña',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop'
  }
])

const contactInfo = ref([
  {
    id: 1,
    title: 'Teléfono Principal',
    main: '+57 605 650 4700',
    secondary: 'Disponible 24 horas',
    icon: 'phone',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Email de Reservas',
    main: 'reservas@sofitel-cartagena.com',
    secondary: 'Respuesta en 4 horas',
    icon: 'email',
    color: 'green'
  },
  {
    id: 3,
    title: 'Dirección',
    main: 'Centro Histórico',
    secondary: 'Cartagena de Indias, Colombia',
    icon: 'place',
    color: 'orange'
  }
])

const quickActions = ref([
  {
    id: 1,
    title: 'Llamada Directa',
    description: 'Línea directa para reservas',
    icon: 'call',
    color: 'blue',
    action: () => window.open('tel:+57605650470', '_self')
  },
  {
    id: 2,
    title: 'WhatsApp',
    description: 'Chat inmediato',
    icon: 'chat',
    color: 'green',
    action: () => {
      const message = encodeURIComponent('Hola, necesito información sobre reservas.')
      window.open(`https://wa.me/57605650470?text=${message}`, '_blank')
    }
  },
  {
    id: 3,
    title: 'Email Rápido',
    description: 'Envío directo de consulta',
    icon: 'mail',
    color: 'orange',
    action: () => window.open('mailto:reservas@sofitel-cartagena.com', '_blank')
  },
  {
    id: 4,
    title: 'Ver Ubicación',
    description: 'Mapa y direcciones',
    icon: 'map',
    color: 'purple',
    action: () => window.open('https://maps.google.com/?q=Sofitel+Legend+Santa+Clara+Cartagena', '_blank')
  }
])

// Métodos
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    $q.notify({
      message: 'Solicitud enviada exitosamente. Nos contactaremos pronto.',
      color: 'positive',
      icon: 'check_circle',
      position: 'top',
      timeout: 5000
    })
    
    // Limpiar formulario
    form.value = {
      name: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      roomType: 'Habitación Superior',
      requests: ''
    }
  } catch (error) {
    $q.notify({
      message: 'Error al enviar la solicitud. Inténtelo nuevamente.',
      color: 'negative',
      icon: 'error',
      position: 'top'
    })
  } finally {
    isSubmitting.value = false
  }
}

const animate3DCarousel = () => {
  rotation += 0.1
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
  animationId = requestAnimationFrame(animate3DCarousel)
}

const scrollToContact = () => {
  if (contactSection.value) {
    contactSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToReservation = () => {
  if (reservationSection.value) {
    reservationSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  animate3DCarousel()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
/* Hero Section */
.hero-section {
  display: flex;
  background-image: url("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&h=600&fit=crop");
  background-size: cover;
  background-position: center;
  height: 94vh;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.644);
  padding: 2rem;
  border-radius: 30px;
  max-width: 800px;
  margin: auto;
}

.hero-badge {
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.overflow-hidden {
  overflow-x: hidden;
}

/* Carrusel */
.carousel-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background: #000000;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgb(255, 255, 255);
  overflow: hidden;
}

.features-carousel {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background: #000000;
  width: 100%;
  max-width: 100%;
}

.carousel-slide {
  background: #000000;
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-card-carousel {
  max-width: 550px;
  width: 85%;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.1);
}

.feature-card-carousel:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 1);
}

.contact-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Navegación del carrusel */
.features-carousel .q-carousel__navigation {
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn {
  background: rgba(255, 255, 255, 0.4);
  color: white;
  margin: 0 6px;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.features-carousel .q-carousel__navigation .q-btn--active {
  background: #1976d2;
  color: white;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(25, 118, 210, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

/* Flechas del carrusel */
.features-carousel .q-carousel__arrow {
  background: rgba(255, 255, 255, 0.95);
  color: #1976d2;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
}

.features-carousel .q-carousel__arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  border-color: #1976d2;
}

/* Stats */
.stats-section {
  background: linear-gradient(135deg, #1976d2, #0d47a1);
}

.stat-item {
  padding: 20px;
}

/* Reservation Form */
.reservation-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
}

.contact-form {
  max-width: 100%;
}

.form-input {
  margin-bottom: 1rem;
}

.submit-btn {
  min-width: 250px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

.form-note {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* Info Cards */
.info-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

/* Action Cards */
.action-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* CTA Section */
.cta-section {
  background: #fafafa;
}

/* Carrusel 3D */
.carousel-3d-container {
  perspective: 1800px;
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(25, 118, 210, 0.1) 0%, transparent 70%);
}

.carousel-3d {
  position: relative;
  width: 400px;
  height: 350px;
  transform-style: preserve-3d;
  transition: none;
  margin: 0 auto;
}

.carousel-3d-item {
  position: absolute;
  width: 240px;
  height: 300px;
  left: 80px;
  top: 25px;
  transform-origin: center;
  backface-visibility: hidden;
}

.highlight-3d-card {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  background: white;
  border: 1px solid rgba(25, 118, 210, 0.2);
}

.highlight-3d-card:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(25, 118, 210, 0.6);
  z-index: 10;
}

.highlight-image {
  transition: transform 0.3s ease;
}

.highlight-3d-card:hover .highlight-image {
  transform: scale(1.05);
}

.highlight-3d-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.highlight-3d-card:hover::after {
  left: 100%;
}

.click-indicator {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.highlight-3d-card:hover .click-indicator {
  opacity: 1;
  transform: scale(1.2);
  color: #1976d2;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-actions .q-btn {
    width: 200px;
  }

  .carousel-container {
    background: #000000;
    border-radius: 10px;
    max-width: 95%;
    margin: 0 auto;
  }

  .carousel-slide {
    padding: 0.5rem 0.25rem;
    background: #000000;
  }

  .feature-card-carousel {
    width: 90%;
    max-width: none;
  }

  .feature-card-carousel .q-card-section {
    padding: 1.5rem 1rem;
  }

  .feature-card-carousel h3 {
    font-size: 1.5rem;
  }

  .feature-card-carousel p {
    font-size: 1rem;
  }

  .features-carousel {
    height: 350px;
    width: 100%;
  }

  .features-carousel .q-carousel__arrow {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .features-carousel .q-carousel__navigation .q-btn {
    min-width: 8px;
    min-height: 8px;
    margin: 0 3px;
  }

  .reservation-card .q-card-section {
    padding: 1.5rem !important;
  }

  .submit-btn {
    min-width: 200px;
  }
}
</style>