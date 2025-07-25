<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section q-pa-sm overflow-hidden">
      <div class="hero-content text-center q-pa-xl">
        <div class="hero-badge q-mb-md">
          <q-chip icon="sports_handball" color="deep-orange" text-color="white" label="Aventuras Certificadas" />
        </div>
        <h1 class="text-h2 text-orange q-mb-md">Deportes Extremos</h1>
        <p class="text-h6 text-white-6 q-mb-xl">Adrenalina Pura • Aventuras Caribeñas • Experiencias Únicas</p>
        <div class="hero-actions">
          <q-btn size="lg" color="orange-8" label="Reservar Aventura" to="/Contacto" outline class="q-mr-md q-mb-sm" unelevated />
          <q-btn size="lg" color="white-8" label="Ver Actividades" outline class="q-mb-sm" @click="scrollToActivities" />
        </div>
      </div>
    </section>

    <!-- Features Carousel Section -->
    <section class="q-pa-xl" ref="activitiesSection">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange">Aventuras Extremas</h2>
        <p class="text-h6 text-grey-6">Viva la emoción del Caribe colombiano con actividades de aventura únicas</p>
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
            v-for="activity in activities" 
            :key="activity.id" 
            :name="activity.id"
            class="carousel-slide flex flex-center"
          >
            <div class="fit flex flex-center">
              <q-card class="feature-card-carousel text-center" flat>
                <q-card-section class="q-pa-s">
                  <q-icon :name="activity.icon" size="4.5rem" :color="activity.color" class="q-mb-lg" />
                  <h3 class="text-h4 text-grey-8 q-mb-md">{{ activity.title }}</h3>
                  <p class="text-h6 text-grey-6 q-mb-lg" style="max-width: 450px; margin: 0 auto;">
                    {{ activity.description }}
                  </p>
                  <div class="activity-details q-mb-lg">
                    <q-chip 
                      v-for="detail in activity.details" 
                      :key="detail"
                      :color="activity.color" 
                      text-color="white" 
                      size="sm" 
                      :label="detail" 
                      class="q-mr-xs q-mb-xs" 
                    />
                  </div>
                  <q-btn 
                    unelevated 
                    size="lg" 
                    :color="activity.color" 
                    :label="activity.buttonText" 
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
    <section class="stats-section bg-deep-orange-8 text-white q-pa-xl">
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
        <h2 class="text-h3 text-orange-8">Experiencias Únicas</h2>
        <p class="text-h6 text-white-3">Aventuras que recordará para toda la vida</p>
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
                <q-icon name="touch_app" size="sm" color="deep-orange" class="click-indicator q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Safety Section -->
    <section class="safety-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Seguridad y Certificaciones</h2>
        <p class="text-h6 text-grey-6">Su seguridad es nuestra prioridad número uno</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="safety in safetyFeatures" :key="safety.id" class="col-md-3 col-sm-6 col-xs-12">
          <q-card class="safety-card text-center" flat bordered>
            <q-card-section class="q-pa-lg">
              <q-icon :name="safety.icon" size="3rem" :color="safety.color" class="q-mb-md" />
              <div class="text-h6 text-grey-8 q-mb-sm">{{ safety.title }}</div>
              <div class="text-body2 text-grey-6">{{ safety.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">¿Listo para la Aventura?</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Reserve ahora y viva experiencias extremas inolvidables en el Caribe</p>
      <q-btn 
        size="lg" 
        color="deep-orange" 
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
const activitiesSection = ref(null)
let rotation = 0
let animationId = null

const activities = ref([
  {
    id: 1,
    icon: 'sailing',
    color: 'blue-6',
    title: 'Deportes Acuáticos',
    description: 'Navegue por las cristalinas aguas del Caribe con jet skis, windsurf, kitesurf y vela deportiva de alto rendimiento',
    details: ['Jet Ski', 'Windsurf', 'Kitesurf', 'Vela Deportiva'],
    buttonText: 'Explorar Mar',
  },
  {
    id: 2,
    icon: 'scuba_diving',
    color: 'cyan-6',
    title: 'Buceo Extremo',
    description: 'Descubra arrecifes de coral vírgenes, naufragios históricos y vida marina exótica en inmersiones profundas',
    details: ['Buceo Profundo', 'Naufragios', 'Vida Marina', 'Fotografía Submarina'],
    buttonText: 'Sumergirse',
  },
  {
    id: 3,
    icon: 'paragliding',
    color: 'orange-6',
    title: 'Deportes Aéreos',
    description: 'Vuele sobre Cartagena con parapente, parasailing y saltos en paracaídas con vistas espectaculares',
    details: ['Parapente', 'Parasailing', 'Paracaidismo', 'Vuelos Panorámicos'],
    buttonText: 'Volar Alto',
  },
  {
    id: 4,
    icon: 'directions_bike',
    color: 'green-6',
    title: 'Ciclismo Extremo',
    description: 'Recorra senderos montañosos y rutas costeras desafiantes en bicicletas de montaña de última generación',
    details: ['Mountain Bike', 'Senderos Extremos', 'Rutas Costeras', 'Competencias'],
    buttonText: 'Pedalear',
  },
  {
    id: 5,
    icon: 'surfing',
    color: 'teal-6',
    title: 'Surf y Bodyboard',
    description: 'Domine las olas del Caribe en las mejores playas de surf con instructores profesionales',
    details: ['Surf Profesional', 'Bodyboard', 'Stand Up Paddle', 'Escuela de Surf'],
    buttonText: 'Surfear',
  },
  {
    id: 6,
    icon: 'terrain',
    color: 'brown-6',
    title: 'Trekking Extremo',
    description: 'Explore la selva tropical, escalada en roca y senderismo nocturno en terrenos desafiantes',
    details: ['Selva Tropical', 'Escalada', 'Senderismo Nocturno', 'Rappel'],
    buttonText: 'Explorar',
  }
])

const stats = ref([
  { id: 1, number: '15+', label: 'Actividades Extremas' },
  { id: 2, number: '24/7', label: 'Disponibilidad' },
  { id: 3, number: '100%', label: 'Seguridad Certificada' },
  { id: 4, number: '★★★★★', label: 'Experiencia Garantizada' }
])

const highlights3d = ref([
  {
    id: 1,
    title: 'Expedición Rosario',
    description: 'Tour completo por las Islas del Rosario con actividades múltiples',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Aventura Nocturna',
    description: 'Deportes extremos bajo las estrellas del Caribe',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Safari Acuático',
    description: 'Expedición marina con múltiples deportes acuáticos',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Vuelo Panorámico',
    description: 'Vista aérea espectacular de Cartagena y sus alrededores',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Escalada Extrema',
    description: 'Desafíe las formaciones rocosas más impresionantes',
    image: 'https://images.unsplash.com/photo-1551524164-d526c6465447?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Competencia de Surf',
    description: 'Participe en torneos profesionales de surf',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop'
  },
  {
    id: 7,
    title: 'Expedición Submarina',
    description: 'Buceo profundo en sitios arqueológicos submarinos',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop'
  },
  {
    id: 8,
    title: 'Aventura Completa',
    description: 'Paquete de 7 días con todas las actividades extremas',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
  }
])

const safetyFeatures = ref([
  {
    id: 1,
    title: 'Equipos Certificados',
    description: 'Todo nuestro equipo cumple con estándares internacionales de seguridad',
    icon: 'verified',
    color: 'positive'
  },
  {
    id: 2,
    title: 'Instructores Profesionales',
    description: 'Guías certificados con años de experiencia en deportes extremos',
    icon: 'school',
    color: 'blue'
  },
  {
    id: 3,
    title: 'Seguro de Aventura',
    description: 'Cobertura completa para todas las actividades deportivas',
    icon: 'security',
    color: 'orange'
  },
  {
    id: 4,
    title: 'Rescate 24/7',
    description: 'Equipo de rescate disponible las 24 horas del día',
    icon: 'emergency',
    color: 'red'
  }
])

const animate3DCarousel = () => {
  rotation += 0.15
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
  animationId = requestAnimationFrame(animate3DCarousel)
}

const navigateToContact = () => {
  router.push('/Contacto')
}

const scrollToActivities = () => {
  if (activitiesSection.value) {
    activitiesSection.value.scrollIntoView({ behavior: 'smooth' })
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
  background-image: url("https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=600&fit=crop");
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

.activity-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
  background: #ff5722;
  color: white;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(255, 87, 34, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

/* Flechas del carrusel */
.features-carousel .q-carousel__arrow {
  background: rgba(255, 255, 255, 0.95);
  color: #ff5722;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
}

.features-carousel .q-carousel__arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  border-color: #ff5722;
}

/* Stats */
.stats-section {
  background: linear-gradient(135deg, #ff5722, #f4511e);
}

.stat-item {
  padding: 20px;
}

/* Safety Cards */
.safety-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.safety-card:hover {
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
  background: radial-gradient(ellipse at center, rgba(255, 87, 34, 0.1) 0%, transparent 70%);
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
  border: 1px solid rgba(255, 87, 34, 0.2);
}

.highlight-3d-card:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 87, 34, 0.6);
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
  color: #ff5722;
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

  .activity-details {
    justify-content: center;
  }
}
</style>