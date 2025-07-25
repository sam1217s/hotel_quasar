<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section q-pa-sm overflow-hidden">
      <div class="hero-content text-center q-pa-xl">
        <div class="hero-badge q-mb-md">
          <q-chip icon="spa" color="teal-6" text-color="white" label="Wellness Certificado" />
        </div>
        <h1 class="text-h2 text-orange q-mb-md">Spa y Bienestar</h1>
        <p class="text-h6 text-white-6 q-mb-xl">Relajación Colonial • Terapias Ancestrales • Bienestar Integral</p>
        <div class="hero-actions">
          <q-btn size="lg" color="orange-8" label="Reservar Tratamiento" to="/Contacto" outline class="q-mr-md q-mb-sm" unelevated />
          <q-btn size="lg" color="white-8" label="Ver Servicios" outline class="q-mb-sm" @click="scrollToServices" />
        </div>
      </div>
    </section>

    <!-- Features Carousel Section -->
    <section class="q-pa-xl" ref="servicesSection">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange">Experiencias de Bienestar</h2>
        <p class="text-h6 text-grey-6">Terapias ancestrales caribeñas en un ambiente colonial único</p>
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
          :autoplay-delay="4000" 
          height="500px" 
          class="features-carousel"
        >
          <q-carousel-slide 
            v-for="service in services" 
            :key="service.id" 
            :name="service.id"
            class="carousel-slide flex flex-center"
          >
            <div class="fit flex flex-center">
              <q-card class="feature-card-carousel text-center" flat>
                <q-card-section class="q-pa-s">
                  <q-icon :name="service.icon" size="4.5rem" :color="service.color" class="q-mb-lg" />
                  <h3 class="text-h4 text-grey-8 q-mb-md">{{ service.name }}</h3>
                  <p class="text-h6 text-grey-6 q-mb-lg" style="max-width: 450px; margin: 0 auto;">
                    {{ service.description }}
                  </p>
                  <div class="service-details q-mb-lg">
                    <div class="text-subtitle2 text-grey-7 q-mb-sm">{{ service.hours }}</div>
                    <q-chip 
                      v-for="feature in service.features" 
                      :key="feature"
                      :color="service.color" 
                      text-color="white" 
                      size="sm" 
                      :label="feature" 
                      class="q-mr-xs q-mb-xs" 
                    />
                  </div>
                  <q-btn 
                    unelevated 
                    size="lg" 
                    :color="service.color" 
                    :label="service.buttonText" 
                    to="/Contacto"
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
    <section class="stats-section bg-teal-6 text-white q-pa-xl">
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
        <h2 class="text-h3 text-orange-8">Tratamientos Signature</h2>
        <p class="text-h6 text-white-3">Terapias exclusivas que solo encontrará en nuestro spa colonial</p>
      </div>

      <div class="carousel-3d-container">
        <div class="carousel-3d" ref="carousel3d">
          <div 
            v-for="(highlight, index) in highlights3d" 
            :key="highlight.id" 
            class="carousel-3d-item"
            :style="{ transform: `rotateY(${index * 45}deg) translateZ(450px)` }"
            @click="navigateToContact"
          >
            <q-card class="highlight-3d-card cursor-pointer">
              <q-img :src="highlight.image" height="180px" class="highlight-image" />
              <q-card-section class="text-center q-pa-md">
                <div class="text-h6 text-grey-8 text-weight-medium">{{ highlight.title }}</div>
                <q-icon name="touch_app" size="sm" color="teal" class="click-indicator q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Therapies Section -->
    <section class="therapies-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Tipos de Terapias</h2>
        <p class="text-h6 text-grey-6">Técnicas ancestrales y modernas para su bienestar integral</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="therapy in therapyTypes" :key="therapy.id" class="col-md-3 col-sm-6 col-xs-12">
          <q-card class="therapy-card text-center" flat bordered>
            <q-card-section class="q-pa-lg">
              <q-icon :name="therapy.icon" size="3rem" :color="therapy.color" class="q-mb-md" />
              <div class="text-h6 text-grey-8 q-mb-sm">{{ therapy.name }}</div>
              <div class="text-body2 text-grey-6 q-mb-md">{{ therapy.description }}</div>
              <q-chip 
                v-for="benefit in therapy.benefits" 
                :key="benefit"
                color="teal-1" 
                text-color="teal-8" 
                size="sm" 
                :label="benefit" 
                class="q-mr-xs q-mb-xs" 
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Facilities Section -->
    <section class="facilities-section q-pa-xl bg-teal-9 text-white">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-white">Instalaciones de Wellness</h2>
        <p class="text-h6 text-grey-4">Espacios diseñados para su relajación y bienestar</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="facility in facilities" :key="facility.id" class="col-md-4 col-sm-6 col-xs-12">
          <q-card class="facility-card" dark>
            <q-card-section class="text-center q-pa-lg">
              <q-icon :name="facility.icon" size="3rem" :color="facility.color" class="q-mb-md" />
              <div class="text-h6 text-white q-mb-sm">{{ facility.name }}</div>
              <div class="text-body2 text-grey-4 q-mb-md">{{ facility.description }}</div>
              <div class="text-caption text-teal-4">{{ facility.hours }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Wellness Programs Section -->
    <section class="programs-section q-pa-xl bg-grey-2">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Programas de Bienestar</h2>
        <p class="text-h6 text-grey-6">Experiencias completas para transformar su bienestar</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="program in wellnessPrograms" :key="program.id" class="col-md-6 col-sm-12 col-xs-12">
          <q-card class="program-card" flat bordered>
            <q-card-section class="q-pa-lg">
              <div class="row items-center q-mb-md">
                <q-icon :name="program.icon" size="2rem" :color="program.color" class="q-mr-md" />
                <div>
                  <div class="text-h6 text-grey-8">{{ program.name }}</div>
                  <div class="text-caption text-grey-6">{{ program.duration }}</div>
                </div>
              </div>
              <div class="text-body2 text-grey-6 q-mb-md">{{ program.description }}</div>
              <div class="program-includes q-mb-md">
                <div class="text-subtitle2 text-grey-8 q-mb-sm">Incluye:</div>
                <ul class="program-list">
                  <li v-for="item in program.includes" :key="item" class="text-body2 text-grey-6">{{ item }}</li>
                </ul>
              </div>
              <div class="text-h6 text-teal-7 text-weight-bold">{{ program.price }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">Comience su Viaje de Bienestar</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Reserve su sesión de spa y descubra la relajación en un ambiente colonial único</p>
      <q-btn 
        size="lg" 
        color="teal-6" 
        text-color="white" 
        label="Reservar Ahora" 
        to="/Contacto" 
        unelevated
        class="q-px-xl" 
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentSlide = ref(1)
const carousel = ref(null)
const carousel3d = ref(null)
const servicesSection = ref(null)
let rotation = 0
let animationId = null

const services = ref([
  {
    id: 1,
    icon: 'spa',
    color: 'teal-6',
    name: 'Spa Colonial',
    description: 'Tratamientos inspirados en antiguas tradiciones caribeñas con técnicas modernas de relajación y rejuvenecimiento',
    hours: 'Abierto: 8:00 AM - 9:00 PM',
    features: ['Masajes Ancestrales', 'Faciales Naturales', 'Aromaterapia', 'Tratamientos Corporales'],
    buttonText: 'Reservar Spa'
  },
  {
    id: 2,
    icon: 'fitness_center',
    color: 'orange-6',
    name: 'Fitness Center',
    description: 'Gimnasio completamente equipado con vista al mar Caribe, entrenadores personalizados y clases grupales',
    hours: 'Abierto: 24 horas',
    features: ['Gimnasio 24/7', 'Yoga Matutino', 'Pilates', 'Entrenador Personal'],
    buttonText: 'Entrenar'
  },
  {
    id: 3,
    icon: 'pool',
    color: 'blue-6',
    name: 'Piscina Infinity',
    description: 'Piscina infinita con vista panorámica al mar Caribe, jacuzzi integrado y área de relajación exclusiva',
    hours: 'Abierto: 6:00 AM - 10:00 PM',
    features: ['Vista al Mar', 'Jacuzzi Integrado', 'Bar Acuático', 'Área VIP'],
    buttonText: 'Relajarse'
  },
  {
    id: 4,
    icon: 'content_cut',
    color: 'purple-6',
    name: 'Salón de Belleza',
    description: 'Servicios completos de belleza y cuidado personal con productos premium y técnicas de vanguardia',
    hours: 'Abierto: 9:00 AM - 7:00 PM',
    features: ['Corte Profesional', 'Manicure Spa', 'Pedicure Terapéutico', 'Maquillaje Profesional'],
    buttonText: 'Embellecerse'
  },
  {
    id: 5,
    icon: 'self_improvement',
    color: 'green-6',
    name: 'Centro de Meditación',
    description: 'Espacio sagrado para la práctica de meditación, yoga y terapias energéticas en los jardines del convento',
    hours: 'Sesiones: 6:00 AM, 12:00 PM, 6:00 PM',
    features: ['Meditación Guiada', 'Yoga Terapéutico', 'Reiki', 'Terapias Energéticas'],
    buttonText: 'Meditar'
  },
  {
    id: 6,
    icon: 'hot_tub',
    color: 'amber-6',
    name: 'Hidroterapia',
    description: 'Circuito completo de hidroterapia con piscinas termales, saunas, baños de vapor y duchas escocesas',
    hours: 'Abierto: 7:00 AM - 9:00 PM',
    features: ['Piscinas Termales', 'Sauna Finlandés', 'Baño Turco', 'Duchas Terapéuticas'],
    buttonText: 'Hidroterapia'
  }
])

const stats = ref([
  { id: 1, number: '15+', label: 'Tratamientos Exclusivos' },
  { id: 2, number: '6', label: 'Instalaciones de Wellness' },
  { id: 3, number: '24/7', label: 'Acceso al Gimnasio' },
  { id: 4, number: '★★★★★', label: 'Experiencia de Lujo' }
])

const highlights3d = ref([
  {
    id: 1,
    title: 'Masaje Caribeño',
    description: 'Técnica ancestral con aceites de coco y hierbas locales',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Facial de Oro Colonial',
    description: 'Tratamiento facial con oro de 24 quilates y colágeno',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Ritual de Purificación',
    description: 'Ceremonia ancestral de limpieza energética',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Hidroterapia Marina',
    description: 'Tratamiento con agua de mar y algas del Caribe',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Yoga al Amanecer',
    description: 'Sesión privada con vista al mar Caribe',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Terapia de Piedras',
    description: 'Masaje con piedras volcánicas calientes',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop'
  },
  {
    id: 7,
    title: 'Aromaterapia Colonial',
    description: 'Tratamiento con esencias de plantas del convento',
    image: 'https://images.unsplash.com/photo-1551524164-d526c6465447?w=600&h=400&fit=crop'
  },
  {
    id: 8,
    title: 'Experiencia Completa',
    description: 'Día completo de bienestar y relajación',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop'
  }
])

const therapyTypes = ref([
  {
    id: 1,
    name: 'Terapias Ancestrales',
    description: 'Técnicas tradicionales caribeñas transmitidas por generaciones',
    icon: 'psychology',
    color: 'teal',
    benefits: ['Conexión Espiritual', 'Sanación Natural', 'Equilibrio Energético']
  },
  {
    id: 2,
    name: 'Tratamientos Modernos',
    description: 'Tecnología avanzada combinada con productos premium',
    icon: 'biotech',
    color: 'blue',
    benefits: ['Anti-aging', 'Revitalización', 'Resultados Inmediatos']
  },
  {
    id: 3,
    name: 'Terapias Corporales',
    description: 'Tratamientos integrales para el cuidado del cuerpo',
    icon: 'accessibility_new',
    color: 'green',
    benefits: ['Detox Corporal', 'Tonificación', 'Hidratación Profunda']
  },
  {
    id: 4,
    name: 'Bienestar Mental',
    description: 'Técnicas para el equilibrio mental y emocional',
    icon: 'mood',
    color: 'purple',
    benefits: ['Reducción de Estrés', 'Claridad Mental', 'Paz Interior']
  }
])

const facilities = ref([
  {
    id: 1,
    name: 'Sauna Finlandés',
    description: 'Sauna tradicional con esencias naturales y temperatura controlada',
    icon: 'spa',
    color: 'orange',
    hours: '7:00 AM - 9:00 PM'
  },
  {
    id: 2,
    name: 'Baño Turco',
    description: 'Baño de vapor con aromaterapia y cromoterapia relajante',
    icon: 'waves',
    color: 'blue',
    hours: '7:00 AM - 9:00 PM'
  },
  {
    id: 3,
    name: 'Sala de Relajación',
    description: 'Espacio zen para descanso post-tratamiento con té de hierbas',
    icon: 'weekend',
    color: 'green',
    hours: '24 horas'
  },
  {
    id: 4,
    name: 'Jardín de Meditación',
    description: 'Espacio al aire libre entre los jardines históricos del convento',
    icon: 'nature',
    color: 'light-green',
    hours: '6:00 AM - 8:00 PM'
  },
  {
    id: 5,
    name: 'Piscinas Termales',
    description: 'Circuito de aguas a diferentes temperaturas con propiedades terapéuticas',
    icon: 'hot_tub',
    color: 'teal',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 6,
    name: 'Gimnasio Vista Mar',
    description: 'Equipos de última generación con vista panorámica al Caribe',
    icon: 'fitness_center',
    color: 'amber',
    hours: '24 horas'
  }
])

const wellnessPrograms = ref([
  {
    id: 1,
    name: 'Escape de Bienestar',
    duration: '3 días / 2 noches',
    description: 'Programa integral de relajación y rejuvenecimiento con tratamientos diarios y actividades de bienestar.',
    includes: [
      '2 masajes corporales completos',
      '1 facial de oro colonial',
      'Acceso ilimitado al spa',
      'Clases de yoga privadas',
      'Alimentación detox'
    ],
    price: '$850 por persona',
    icon: 'spa',
    color: 'teal'
  },
  {
    id: 2,
    name: 'Retiro de Meditación',
    duration: '5 días / 4 noches',
    description: 'Experiencia transformadora de meditación y mindfulness en el ambiente sagrado del convento histórico.',
    includes: [
      'Sesiones de meditación guiada',
      'Terapias energéticas diarias',
      'Alimentación vegetariana',
      'Rituales de purificación',
      'Certificado de participación'
    ],
    price: '$1200 por persona',
    icon: 'self_improvement',
    color: 'purple'
  },
  {
    id: 3,
    name: 'Detox Colonial',
    duration: '7 días / 6 noches',
    description: 'Programa completo de desintoxicación corporal y mental con terapias ancestrales y modernas.',
    includes: [
      'Plan nutricional personalizado',
      'Hidroterapia diaria',
      'Masajes drenantes',
      'Sauna y vapor',
      'Seguimiento médico'
    ],
    price: '$1800 por persona',
    icon: 'water_drop',
    color: 'blue'
  },
  {
    id: 4,
    name: 'Experiencia Anti-Aging',
    duration: '4 días / 3 noches',
    description: 'Tratamientos avanzados de rejuvenecimiento facial y corporal con tecnología de vanguardia.',
    includes: [
      'Faciales con tecnología LED',
      'Tratamientos de colágeno',
      'Masajes reafirmantes',
      'Productos premium incluidos',
      'Consulta dermatológica'
    ],
    price: '$1350 por persona',
    icon: 'face_retouching_natural',
    color: 'amber'
  }
])

const animate3DCarousel = () => {
  rotation += 0.1
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
  animationId = requestAnimationFrame(animate3DCarousel)
}

const navigateToContact = () => {
  router.push('/Contacto')
}

const scrollToServices = () => {
  if (servicesSection.value) {
    servicesSection.value.scrollIntoView({ behavior: 'smooth' })
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
  background-image: url("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop");
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

.service-details {
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
  background: #26a69a;
  color: white;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(38, 166, 154, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

/* Flechas del carrusel */
.features-carousel .q-carousel__arrow {
  background: rgba(255, 255, 255, 0.95);
  color: #26a69a;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
}

.features-carousel .q-carousel__arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  border-color: #26a69a;
}

/* Stats */
.stats-section {
  background: linear-gradient(135deg, #26a69a, #004d40);
}

.stat-item {
  padding: 20px;
}

/* Therapy Cards */
.therapy-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.therapy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Facility Cards */
.facility-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.facility-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

/* Program Cards */
.program-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.program-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.program-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.program-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
}

.program-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #26a69a;
  font-weight: bold;
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
  background: radial-gradient(ellipse at center, rgba(38, 166, 154, 0.1) 0%, transparent 70%);
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
  border: 1px solid rgba(38, 166, 154, 0.2);
}

.highlight-3d-card:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(38, 166, 154, 0.6);
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
  color: #26a69a;
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
}
</style>