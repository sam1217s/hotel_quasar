<template>
  <div>
    <!-- Hero Section Componentizado -->
    <HeroSection title="El Refugio Real del Caribe"
      subtitle="Convento del siglo XVIII • Lujo Colonial frente al mar • Cartagena de Indias"
      background-image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop" :badge="{
        icon: 'eco',
        color: 'positive',
        label: 'Green Key Certified'
      }" :actions="heroActions" @action-click="handleHeroAction" />

    <!-- Carrusel 2D de Características -->
    <BaseCarousel2D :items="features" title="Experiencia Única"
      subtitle="Descubra la magia de un convento del siglo XVII convertido en hotel de lujo" :autoplay-delay="3000"
      button-variant="primary" @item-click="handleFeatureClick" />

    <!-- Sección de Estadísticas -->
    <StatsSection :stats="stats" theme="brown" :animated="true" />

    <!-- Carrusel 3D de Highlights -->
    <BaseCarousel3D :items="highlights3d" title="Aspectos Destacados"
      subtitle="Lo que hace especial su estadía en nuestro hotel" section-class="q-pa-xl bg-black-6"
      click-indicator-color="brown-7" @item-click="handleHighlightClick" />

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">Reserve su Experiencia</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Viva la magia de un convento del siglo XVII convertido en hotel de lujo</p>
      <BaseButton variant="cta" label="Contactar Ahora" to="/Contacto" icon="contact_mail" />
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import BaseCarousel2D from '../components/BaseCarousel2D.vue'
import BaseCarousel3D from '../components/BaseCarousel3D.vue'
import StatsSection from '../components/StatsSection.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()

// Datos para el hero
const heroActions = ref([
  {
    label: 'Reservar Ahora',
    variant: 'hero-primary',
    to: '/Contacto',
    color: 'orange-8'
  },
  {
    label: 'Descubrir Hotel',
    variant: 'hero-secondary',
    to: '/Habitaciones',
    color: 'white-8'
  }
])

// Datos para el carrusel de características
const features = ref([
  {
    id: 1,
    icon: 'bed',
    color: 'brown-7',
    title: 'Habitaciones Elegantes',
    description: 'Suites con glamour colonial y vistas espectaculares al mar Caribe que combinan historia y lujo moderno',
    buttonText: 'Explorar Habitaciones',
    route: '/Habitaciones'
  },
  {
    id: 2,
    icon: 'restaurant',
    color: 'orange-8',
    title: 'Gastronomía Excepcional',
    description: 'Fusión perfecta entre sabores caribeños y técnicas francesas en ambientes únicos e históricos',
    buttonText: 'Descubrir Sabores',
    route: '/Restaurantes'
  },
  {
    id: 3,
    icon: 'spa',
    color: 'teal-6',
    title: 'Spa Colonial',
    description: 'Relajación y bienestar en un ambiente sereno e histórico con tratamientos exclusivos',
    buttonText: 'Relajarse',
    route: '/Bienestar'
  },
  {
    id: 4,
    icon: 'eco',
    color: 'positive',
    title: 'Sostenibilidad',
    description: 'Primer hotel de lujo en Colombia con certificación Green Key, cuidando el medio ambiente',
    buttonText: 'Conocer Más',
    route: '/Contacto'
  }
])

// Datos para las estadísticas
const stats = ref([
  { id: 1, number: 'XVII', label: 'Siglo de Historia' },
  { id: 2, number: '122', label: 'Habitaciones y Suites' },
  { id: 3, number: '3', label: 'Restaurantes Únicos' },
  { id: 4, number: '★★★★★', label: 'Lujo Certificado' }
])

// Datos para el carrusel 3D
const highlights3d = ref([
  {
    id: 1,
    title: 'Arquitectura Colonial',
    description: 'Descubra la historia de nuestro convento del siglo XVII perfectamente conservado con elementos originales únicos',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 2,
    title: 'Ubicación Privilegiada',
    description: 'En el corazón del Centro Histórico de Cartagena, Patrimonio de la Humanidad UNESCO',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 3,
    title: 'Experiencia Premium',
    description: 'Servicios exclusivos de lujo con atención personalizada las 24 horas del día',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 4,
    title: 'Cultura Caribeña',
    description: 'Inmersión total en la cultura y tradiciones del Caribe colombiano con actividades exclusivas',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 5,
    title: 'Gastronomía de Clase Mundial',
    description: 'Chefs reconocidos internacionalmente crean experiencias culinarias únicas fusionando sabores locales',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    action: () => router.push('/Restaurantes')
  },
  {
    id: 6,
    title: 'Bienestar y Spa',
    description: 'Tratamientos ancestrales caribeños combinados con técnicas modernas de relajación y rejuvenecimiento',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
    action: () => router.push('/Bienestar')
  },
  {
    id: 7,
    title: 'Actividades Exclusivas',
    description: 'Experiencias únicas como tours privados, clases de cocina, y actividades náuticas de lujo',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 8,
    title: 'Arte y Decoración',
    description: 'Colección de arte colonial y contemporáneo que decora cada espacio con piezas únicas y originales',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  }
])

// Event handlers
const handleHeroAction = ({ action, index }) => {
  console.log('Hero action clicked:', action, index)
}

const handleFeatureClick = (feature) => {
  console.log('Feature clicked:', feature)
  if (feature.route) {
    router.push(feature.route)
  }
}

const handleHighlightClick = ({ item }) => {
  console.log('Highlight clicked:', item)
  if (item.action) {
    item.action()
  }
}
</script>

<style scoped>
.cta-section {
  background: #fafafa;
}

/* Responsive */
@media (max-width: 768px) {
  .cta-section h2 {
    font-size: 1.8rem;
  }

  .cta-section p {
    font-size: 1rem;
  }
}
</style>