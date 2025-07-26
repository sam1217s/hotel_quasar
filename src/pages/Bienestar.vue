<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Spa y Bienestar"
      subtitle="Relajación Colonial • Terapias Ancestrales • Bienestar Integral"
      background-image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop"
      :badge="HERO_BADGE"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Carrusel 2D de Experiencias de Bienestar -->
    <BaseCarousel2D
      :items="SERVICES"
      title="Experiencias de Bienestar"
      subtitle="Terapias ancestrales caribeñas en un ambiente colonial único"
      :autoplay-delay="4000"
      default-color="teal-6"
      button-variant="primary"
      @item-click="navigateToContact"
    />

    <!-- Sección de Estadísticas -->
    <StatsSection
      :stats="STATS"
      theme="teal"
      :animated="true"
    />

    <!-- Carrusel 3D de Tratamientos Signature -->
    <BaseCarousel3D
      :items="HIGHLIGHTS_3D"
      title="Tratamientos Signature"
      subtitle="Terapias exclusivas que solo encontrará en nuestro spa colonial"
      section-class="q-pa-xl bg-black-6 theme-teal"
      click-indicator-color="teal"
      @item-click="handleTreatmentClick"
    />

    <!-- Sección de Tipos de Terapias -->
    <section class="therapies-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Tipos de Terapias</h2>
        <p class="text-h6 text-grey-6">Técnicas ancestrales y modernas para su bienestar integral</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div 
          v-for="therapy in THERAPY_TYPES" 
          :key="therapy.id" 
          class="col-md-3 col-sm-6 col-xs-12"
        >
          <InfoCard
            variant="feature"
            :icon="therapy.icon"
            :icon-color="therapy.color"
            :title="therapy.name"
            :description="therapy.description"
            :features="therapy.benefits"
            features-title="Beneficios"
            features-color="teal-1"
            features-text-color="teal-8"
            clickable
          />
        </div>
      </div>
    </section>



    <!-- CTA Section -->
    <CTASection
      title="Comience su Viaje de Bienestar"
      subtitle="Reserve su sesión de spa y descubra la relajación en un ambiente colonial único"
      button-label="Reservar Ahora"
      button-color="teal-6"
      button-to="/Contacto"
      button-icon="spa"
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

// Constants - moved outside reactive system for performance
const HERO_BADGE = {
  icon: 'spa',
  color: 'teal-6',
  label: 'Wellness Certificado'
}

const SERVICES = [
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
]

const STATS = [
  { id: 1, number: '15+', label: 'Tratamientos Exclusivos' },
  { id: 2, number: '6', label: 'Instalaciones de Wellness' },
  { id: 3, number: '24/7', label: 'Acceso al Gimnasio' },
  { id: 4, number: '★★★★★', label: 'Experiencia de Lujo' }
]

const THERAPY_TYPES = [
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
]



// Computed properties
const heroActions = computed(() => [
  {
    label: 'Reservar Tratamiento',
    variant: 'hero-primary',
    to: '/Contacto',
    color: 'orange-8'
  },
  {
    label: 'Ver Servicios',
    variant: 'hero-secondary',
    color: 'white-8',
    click: scrollToServices
  }
])

const HIGHLIGHTS_3D = computed(() => {
  const baseUrl = 'https://images.unsplash.com'
  const treatments = [
    { id: 1, title: 'Masaje Caribeño', desc: 'Técnica ancestral con aceites de coco y hierbas locales', img: 'photo-1571019613454-1cb2f99b2d8b' },
    { id: 2, title: 'Facial de Oro Colonial', desc: 'Tratamiento facial con oro de 24 quilates y colágeno', img: 'photo-1560066984-138dadb4c035' },
    { id: 3, title: 'Ritual de Purificación', desc: 'Ceremonia ancestral de limpieza energética', img: 'photo-1544551763-46a013bb70d5' },
    { id: 4, title: 'Hidroterapia Marina', desc: 'Tratamiento con agua de mar y algas del Caribe', img: 'photo-1571902943202-507ec2618e8f' },
    { id: 5, title: 'Yoga al Amanecer', desc: 'Sesión privada con vista al mar Caribe', img: 'photo-1506905925346-21bda4d32df4' },
    { id: 6, title: 'Terapia de Piedras', desc: 'Masaje con piedras volcánicas calientes', img: 'photo-1578683010236-d716f9a3f461' },
    { id: 7, title: 'Aromaterapia Colonial', desc: 'Tratamiento con esencias de plantas del convento', img: 'photo-1551524164-d526c6465447' },
    { id: 8, title: 'Experiencia Completa', desc: 'Día completo de bienestar y relajación', img: 'photo-1559827260-dc66d52bef19' }
  ]
  
  return treatments.map(t => ({
    id: t.id,
    title: t.title,
    description: t.desc,
    image: `${baseUrl}/${t.img}?w=600&h=400&fit=crop`,
    action: navigateToContact
  }))
})



// Event handlers - simplified and optimized
const navigateToContact = () => router.push('/Contacto')

const handleHeroAction = ({ action }) => {
  if (action.click) action.click()
}

const handleTreatmentClick = ({ item }) => {
  item.action?.()
}



const scrollToServices = () => {
  document.querySelector('.carousel-section')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}
</script>

<style scoped>
.therapies-section {
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .therapies-section .row {
    flex-direction: column;
    align-items: center;
  }
}
</style>