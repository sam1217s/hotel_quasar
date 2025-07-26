<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Restaurantes y Bares"
      subtitle="Fusión Caribeña • Técnicas Francesas • Experiencia Culinaria"
      background-image="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop"
      :badge="{
        icon: 'restaurant',
        color: 'amber-8',
        label: 'Cuisine Certificada'
      }"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Carrusel 2D de Experiencias Gastronómicas -->
    <BaseCarousel2D
      :items="restaurants"
      title="Experiencias Gastronómicas"
      subtitle="Sabores auténticos del Caribe con la sofisticación de la cocina francesa"
      :autoplay-delay="5000"
      default-color="amber-8"
      button-variant="primary"
      @item-click="handleRestaurantClick"
    />

    <!-- Sección de Estadísticas -->
    <StatsSection
      :stats="stats"
      theme="amber"
      :animated="true"
    />

    <!-- Carrusel 3D de Especialidades -->
    <BaseCarousel3D
      :items="highlights3d"
      title="Especialidades Culinarias"
      subtitle="Platos signature que definen nuestra cocina de autor"
      section-class="q-pa-xl bg-black-6 theme-amber"
      click-indicator-color="amber"
      @item-click="handleSpecialtyClick"
    />

    <!-- Sección de Chefs -->
    <section class="chef-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Nuestros Chefs</h2>
        <p class="text-h6 text-grey-6">Maestros culinarios con reconocimiento internacional</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="chef in chefs" :key="chef.id" class="col-md-3 col-sm-6 col-xs-12">
          <InfoCard
            variant="profile"
            :image="chef.image"
            image-height="200px"
            :title="chef.name"
            :subtitle="chef.position"
            :description="chef.description"
            :features="chef.specialties"
            features-title="Especialidades"
            features-color="amber-1"
            features-text-color="amber-8"
            :clickable="true"
            @click="handleChefClick(chef)"
          />
        </div>
      </div>
    </section>

    <!-- Sección de Vinos -->
    <section class="wine-section q-pa-xl bg-brown-9 text-white">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-white">Cava de Vinos</h2>
        <p class="text-h6 text-grey-4">Selección excepcional de vinos del mundo</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="wine in wineCollections" :key="wine.id" class="col-md-4 col-sm-6 col-xs-12">
          <InfoCard
            variant="service"
            :icon="wine.icon"
            :icon-color="wine.color"
            :title="wine.name"
            :description="wine.description"
            dark
            :clickable="true"
            @click="handleWineClick(wine)"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <CTASection
      title="Reserve su Mesa"
      subtitle="Viva una experiencia gastronómica inolvidable en el corazón de Cartagena"
      button-label="Reservar Ahora"
      button-color="amber-8"
      button-to="/Contacto"
      button-icon="restaurant"
      theme="light"
      :animated="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import BaseCarousel2D from '../components/BaseCarousel2D.vue'
import BaseCarousel3D from '../components/BaseCarousel3D.vue'
import StatsSection from '../components/StatsSection.vue'
import InfoCard from '../components/InfoCard.vue'
import CTASection from '../components/CTASection.vue'

const router = useRouter()

// Acciones del hero
const heroActions = ref([
  {
    label: 'Reservar Mesa',
    variant: 'hero-primary',
    to: '/Contacto',
    color: 'orange-8'
  },
  {
    label: 'Ver Menús',
    variant: 'hero-secondary',
    color: 'white-8',
    click: () => scrollToRestaurants()
  }
])

// Restaurantes y experiencias gastronómicas
const restaurants = ref([
  {
    id: 1,
    icon: 'restaurant',
    color: 'brown-7',
    name: 'El Claustro',
    description: 'Restaurante principal que fusiona la cocina caribeña con técnicas francesas contemporáneas en un ambiente colonial único',
    hours: 'Desayuno: 6:30-10:30 • Almuerzo: 12:30-15:00 • Cena: 19:00-23:00',
    features: ['Cuisine Francesa', 'Sabores Caribeños', 'Chef Internacional', 'Ambiente Colonial'],
    buttonText: 'Reservar Mesa'
  },
  {
    id: 2,
    icon: 'wine_bar',
    color: 'amber-8',
    name: 'Terraza Sunset',
    description: 'Bar terraza con vista panorámica al atardecer caribeño, cócteles artesanales y tapas gourmet',
    hours: 'Abierto: 17:00-02:00 • Happy Hour: 17:00-19:00',
    features: ['Cócteles Artesanales', 'Vista Panorámica', 'Tapas Gourmet', 'Música en Vivo'],
    buttonText: 'Ver Carta'
  },
  {
    id: 3,
    icon: 'coffee',
    color: 'orange-8',
    name: 'Café Colonial',
    description: 'Espacio íntimo para desayunos especiales, café de especialidad colombiano y repostería francesa artesanal',
    hours: 'Abierto: 6:00-11:00 • Café todo el día: 6:00-22:00',
    features: ['Café Colombiano', 'Repostería Francesa', 'Desayunos Gourmet', 'Ambiente Íntimo'],
    buttonText: 'Degustar'
  },
  {
    id: 4,
    icon: 'pool',
    color: 'blue-6',
    name: 'Pool Bar',
    description: 'Bar acuático junto a la piscina infinity con cócteles tropicales frescos y comida ligera mediterránea',
    hours: 'Abierto: 10:00-20:00 • Servicio de piscina: 10:00-18:00',
    features: ['Cócteles Tropicales', 'Comida Ligera', 'Vista al Mar', 'Ambiente Relajado'],
    buttonText: 'Refrescarse'
  },
  {
    id: 5,
    icon: 'celebration',
    color: 'purple-6',
    name: 'Salón Privado',
    description: 'Comedor privado para eventos especiales con menú personalizado y servicio de sommelier exclusivo',
    hours: 'Disponible: 24/7 • Reserva previa requerida',
    features: ['Menú Personalizado', 'Sommelier Privado', 'Eventos Exclusivos', 'Servicio 24/7'],
    buttonText: 'Consultar'
  }
])

// Estadísticas
const stats = ref([
  { id: 1, number: '5', label: 'Restaurantes y Bares' },
  { id: 2, number: '3', label: 'Chefs Internacionales' },
  { id: 3, number: '500+', label: 'Vinos Seleccionados' },
  { id: 4, number: '★★★★★', label: 'Gastronomía de Lujo' }
])

// Especialidades culinarias 3D
const highlights3d = ref([
  {
    id: 1,
    title: 'Arroz con Coco',
    description: 'Plato signature con mariscos frescos del Caribe',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 2,
    title: 'Pescado en Salsa Criolla',
    description: 'Pargo rojo con salsa tradicional cartagenera',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 3,
    title: 'Ceviche Tropical',
    description: 'Ceviche de pescado con frutas tropicales',
    image: 'https://images.unsplash.com/photo-1551982324-5cc84d81025b?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 4,
    title: 'Langosta Termidor',
    description: 'Langosta del Caribe preparada al estilo francés',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 5,
    title: 'Soufflé de Maracuyá',
    description: 'Postre signature con frutas del trópico',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 6,
    title: 'Cóctail de Coco',
    description: 'Bebida tropical con ron añejo colombiano',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 7,
    title: 'Menú Degustación',
    description: '7 tiempos que narran la historia culinaria caribeña',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 8,
    title: 'Experiencia Sommelier',
    description: 'Maridaje exclusivo de vinos y cocina local',
    image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  }
])

// Chefs
const chefs = ref([
  {
    id: 1,
    name: 'Pierre Dubois',
    position: 'Chef Ejecutivo',
    description: 'Chef francés con 20 años de experiencia en cocina de autor y fusión caribeña',
    specialties: ['Cuisine Francesa', 'Fusión Caribeña', 'Mariscos'],
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Carmen Valdez',
    position: 'Chef Pastelera',
    description: 'Especialista en repostería francesa con toques tropicales y presentaciones artísticas',
    specialties: ['Repostería Francesa', 'Postres Tropicales', 'Arte Culinario'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba669b6?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Miguel Santos',
    position: 'Chef de Cocina Caribeña',
    description: 'Experto en sabores tradicionales del Caribe con técnicas culinarias modernas',
    specialties: ['Cocina Caribeña', 'Mariscos Frescos', 'Tradición Local'],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Sophie Laurent',
    position: 'Sommelier Ejecutiva',
    description: 'Sommelier certificada especializada en maridajes entre vinos franceses y cocina caribeña',
    specialties: ['Vinos Franceses', 'Maridajes', 'Cata de Vinos'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
  }
])

// Colección de vinos
const wineCollections = ref([
  {
    id: 1,
    name: 'Vinos Franceses',
    description: 'Selección premium de las mejores regiones vinícolas de Francia',
    icon: 'wine_bar',
    color: 'purple'
  },
  {
    id: 2,
    name: 'Vinos Sudamericanos',
    description: 'Colección de vinos argentinos, chilenos y colombianos de alta gama',
    icon: 'public',
    color: 'red'
  },
  {
    id: 3,
    name: 'Champagnes',
    description: 'Champagnes y espumosos para celebraciones especiales',
    icon: 'celebration',
    color: 'amber'
  }
])

// Event handlers
const handleHeroAction = ({ action, index }) => {
  console.log('Hero action clicked:', action, index)
}

const handleRestaurantClick = (restaurant) => {
  console.log('Restaurant clicked:', restaurant)
  router.push('/Contacto')
}

const handleSpecialtyClick = ({ item }) => {
  console.log('Specialty clicked:', item)
  if (item.action) {
    item.action()
  }
}

const handleChefClick = (chef) => {
  console.log('Chef clicked:', chef)
  // Aquí podrías mostrar más información del chef
}

const handleWineClick = (wine) => {
  console.log('Wine collection clicked:', wine)
  router.push('/Contacto')
}

const scrollToRestaurants = () => {
  const restaurantsSection = document.querySelector('.carousel-section')
  if (restaurantsSection) {
    restaurantsSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Estilos específicos que no están cubiertos por los componentes */
.chef-section {
  background: #f8f9fa;
}

.wine-section {
  background: linear-gradient(135deg, #8D4513, #A0522D);
}

/* Responsive adicional */
@media (max-width: 768px) {
  .chef-section .row {
    flex-direction: column;
    align-items: center;
  }
  
  .wine-section .row {
    flex-direction: column;
    align-items: center;
  }
}
</style>