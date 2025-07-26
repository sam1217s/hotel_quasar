<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Deportes Extremos"
      subtitle="Adrenalina Pura • Aventuras Caribeñas • Experiencias Únicas"
      background-image="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1200&h=600&fit=crop"
      :badge="HERO_BADGE"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Carrusel 2D de Aventuras Extremas -->
    <BaseCarousel2D
      :items="ACTIVITIES"
      title="Aventuras Extremas"
      subtitle="Viva la emoción del Caribe colombiano con actividades de aventura únicas"
      :autoplay-delay="4000"
      default-color="deep-orange"
      button-variant="primary"
      @item-click="navigateToContact"
    />

    <!-- Sección de Estadísticas -->
    <StatsSection
      :stats="STATS"
      theme="orange"
      :animated="true"
    />

    <!-- Carrusel 3D de Experiencias Únicas -->
    <BaseCarousel3D
      :items="HIGHLIGHTS_3D"
      title="Experiencias Únicas"
      subtitle="Aventuras que recordará para toda la vida"
      section-class="q-pa-xl bg-black-6 theme-orange"
      click-indicator-color="deep-orange"
      @item-click="handleExperienceClick"
    />

    <!-- Sección de Seguridad y Certificaciones -->
    <section class="safety-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Seguridad y Certificaciones</h2>
        <p class="text-h6 text-grey-6">Su seguridad es nuestra prioridad número uno</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div 
          v-for="safety in SAFETY_FEATURES" 
          :key="safety.id" 
          class="col-md-3 col-sm-6 col-xs-12"
        >
          <InfoCard
            variant="feature"
            :icon="safety.icon"
            :icon-color="safety.color"
            :title="safety.title"
            :description="safety.description"
            clickable
          />
        </div>
      </div>
    </section>

    <!-- Sección de Actividades por Categoría -->
    <section class="categories-section q-pa-xl bg-deep-orange-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Categorías de Aventura</h2>
        <p class="text-h6 text-grey-6">Elija su nivel de adrenalina preferido</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div 
          v-for="category in ACTIVITY_CATEGORIES" 
          :key="category.id" 
          class="col-md-4 col-sm-6 col-xs-12"
        >
          <InfoCard
            variant="product"
            :icon="category.icon"
            :icon-color="category.color"
            :title="category.name"
            :description="category.description"
            :features="category.activities"
            features-title="Actividades Incluidas"
            features-color="deep-orange-1"
            features-text-color="deep-orange-8"
            :highlighted-value="category.level"
            highlighted-class="text-deep-orange-7"
            :actions="CATEGORY_ACTIONS"
            @action-click="handleCategoryAction"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTASection
      title="¿Listo para la Aventura?"
      subtitle="Reserve ahora y viva experiencias extremas inolvidables en el Caribe"
      button-label="Reservar Ahora"
      button-color="deep-orange"
      button-to="/Contacto"
      button-icon="sports_handball"
      theme="light"
      :animated="true"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import BaseCarousel2D from '../components/BaseCarousel2D.vue'
import BaseCarousel3D from '../components/BaseCarousel3D.vue'
import StatsSection from '../components/StatsSection.vue'
import InfoCard from '../components/InfoCard.vue'
import CTASection from '../components/CTASection.vue'

const router = useRouter()

// Constants
const HERO_BADGE = {
  icon: 'sports_handball',
  color: 'deep-orange',
  label: 'Aventuras Certificadas'
}

const ACTIVITIES = [
  {
    id: 1,
    icon: 'sailing',
    color: 'blue-6',
    title: 'Deportes Acuáticos',
    description: 'Navegue por las cristalinas aguas del Caribe con jet skis, windsurf, kitesurf y vela deportiva de alto rendimiento',
    details: ['Jet Ski', 'Windsurf', 'Kitesurf', 'Vela Deportiva'],
    buttonText: 'Explorar Mar'
  },
  {
    id: 2,
    icon: 'scuba_diving',
    color: 'cyan-6',
    title: 'Buceo Extremo',
    description: 'Descubra arrecifes de coral vírgenes, naufragios históricos y vida marina exótica en inmersiones profundas',
    details: ['Buceo Profundo', 'Naufragios', 'Vida Marina', 'Fotografía Submarina'],
    buttonText: 'Sumergirse'
  },
  {
    id: 3,
    icon: 'paragliding',
    color: 'orange-6',
    title: 'Deportes Aéreos',
    description: 'Vuele sobre Cartagena con parapente, parasailing y saltos en paracaídas con vistas espectaculares',
    details: ['Parapente', 'Parasailing', 'Paracaidismo', 'Vuelos Panorámicos'],
    buttonText: 'Volar Alto'
  },
  {
    id: 4,
    icon: 'directions_bike',
    color: 'green-6',
    title: 'Ciclismo Extremo',
    description: 'Recorra senderos montañosos y rutas costeras desafiantes en bicicletas de montaña de última generación',
    details: ['Mountain Bike', 'Senderos Extremos', 'Rutas Costeras', 'Competencias'],
    buttonText: 'Pedalear'
  },
  {
    id: 5,
    icon: 'surfing',
    color: 'teal-6',
    title: 'Surf y Bodyboard',
    description: 'Domine las olas del Caribe en las mejores playas de surf con instructores profesionales',
    details: ['Surf Profesional', 'Bodyboard', 'Stand Up Paddle', 'Escuela de Surf'],
    buttonText: 'Surfear'
  },
  {
    id: 6,
    icon: 'terrain',
    color: 'brown-6',
    title: 'Trekking Extremo',
    description: 'Explore la selva tropical, escalada en roca y senderismo nocturno en terrenos desafiantes',
    details: ['Selva Tropical', 'Escalada', 'Senderismo Nocturno', 'Rappel'],
    buttonText: 'Explorar'
  }
]

const STATS = [
  { id: 1, number: '15+', label: 'Actividades Extremas' },
  { id: 2, number: '24/7', label: 'Disponibilidad' },
  { id: 3, number: '100%', label: 'Seguridad Certificada' },
  { id: 4, number: '★★★★★', label: 'Experiencia Garantizada' }
]

const SAFETY_FEATURES = [
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
]

const ACTIVITY_CATEGORIES = [
  {
    id: 1,
    name: 'Aventuras Acuáticas',
    description: 'Deportes y actividades en el mar Caribe con diferentes niveles de intensidad',
    icon: 'waves',
    color: 'blue',
    level: 'Nivel: Principiante a Avanzado',
    activities: ['Jet Ski', 'Buceo', 'Surf', 'Vela', 'Kitesurf']
  },
  {
    id: 2,
    name: 'Deportes Aéreos',
    description: 'Experiencias de vuelo y actividades aéreas sobre paisajes espectaculares',
    icon: 'flight',
    color: 'orange',
    level: 'Nivel: Intermedio a Extremo',
    activities: ['Parapente', 'Parasailing', 'Paracaidismo', 'Vuelo en Globo']
  },
  {
    id: 3,
    name: 'Aventuras Terrestres',
    description: 'Expediciones y deportes extremos en tierra firme y montaña',
    icon: 'terrain',
    color: 'green',
    level: 'Nivel: Todos los niveles',
    activities: ['Escalada', 'Rappel', 'Ciclismo', 'Trekking', 'Canopy']
  }
]

const CATEGORY_ACTIONS = [
  {
    label: 'Ver Actividades',
    variant: 'secondary',
    flat: true,
    color: 'deep-orange-7'
  },
  {
    label: 'Reservar',
    variant: 'primary',
    color: 'deep-orange',
    to: '/Contacto'
  }
]

// Computed properties
const heroActions = computed(() => [
  {
    label: 'Reservar Aventura',
    variant: 'hero-primary',
    to: '/Contacto',
    color: 'orange-8'
  },
  {
    label: 'Ver Actividades',
    variant: 'hero-secondary',
    color: 'white-8',
    click: scrollToActivities
  }
])

const HIGHLIGHTS_3D = computed(() => {
  const baseUrl = 'https://images.unsplash.com'
  const experiences = [
    { id: 1, title: 'Expedición Rosario', desc: 'Tour completo por las Islas del Rosario con actividades múltiples', img: 'photo-1544551763-46a013bb70d5' },
    { id: 2, title: 'Aventura Nocturna', desc: 'Deportes extremos bajo las estrellas del Caribe', img: 'photo-1551698618-1dfe5d97d256' },
    { id: 3, title: 'Safari Acuático', desc: 'Expedición marina con múltiples deportes acuáticos', img: 'photo-1530549387789-4c1017266635' },
    { id: 4, title: 'Vuelo Panorámico', desc: 'Vista aérea espectacular de Cartagena y sus alrededores', img: 'photo-1506905925346-21bda4d32df4' },
    { id: 5, title: 'Escalada Extrema', desc: 'Desafíe las formaciones rocosas más impresionantes', img: 'photo-1551524164-d526c6465447' },
    { id: 6, title: 'Competencia de Surf', desc: 'Participe en torneos profesionales de surf', img: 'photo-1502680390469-be75c86b636f' },
    { id: 7, title: 'Expedición Submarina', desc: 'Buceo profundo en sitios arqueológicos submarinos', img: 'photo-1559827260-dc66d52bef19' },
    { id: 8, title: 'Aventura Completa', desc: 'Paquete de 7 días con todas las actividades extremas', img: 'photo-1571019613454-1cb2f99b2d8b' }
  ]
  
  return experiences.map(e => ({
    id: e.id,
    title: e.title,
    description: e.desc,
    image: `${baseUrl}/${e.img}?w=600&h=400&fit=crop`,
    action: navigateToContact
  }))
})

// Event handlers
const navigateToContact = () => router.push('/Contacto')

const handleHeroAction = ({ action }) => {
  if (action.click) action.click()
}

const handleExperienceClick = ({ item }) => {
  item.action?.()
}

const handleCategoryAction = ({ action }) => {
  if (action.to) router.push(action.to)
}

const scrollToActivities = () => {
  document.querySelector('.carousel-section')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}
</script>

<style scoped>
.safety-section {
  background: #f8f9fa;
}

.categories-section {
  background: #fff3e0;
}

@media (max-width: 768px) {
  .safety-section .row,
  .categories-section .row {
    flex-direction: column;
    align-items: center;
  }
}
</style>