<template>
  <div>
    <!-- Hero Section -->
    <HeroSection
      title="Suites y Habitaciones"
      subtitle="Glamour Colonial • Comodidades Modernas • Experiencia Única"
      background-image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop"
      :badge="HERO_BADGE"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Suites de Lujo - Carrusel Horizontal -->
    <HorizontalCarousel
      :items="SUITES"
      title="Suites de Lujo"
      subtitle="Nuestras suites más exclusivas con servicios premium"
      card-width="400px"
      :best-seller-id="1"
      details-button-text="Ver Detalles"
      action-button-text="Reservar"
      default-action-route="/Contacto"
      @item-click="handleSuiteClick"
      @details-click="handleDetailsClick"
      @action-click="navigateToContact"
    />

    <!-- Habitaciones Elegantes - Carrusel Horizontal -->
    <HorizontalCarousel
      :items="ROOMS"
      title="Habitaciones Elegantes"
      subtitle="Comodidad y estilo en cada detalle"
      card-width="400px"
      :best-seller-id="5"
      details-button-text="Ver Detalles"
      action-button-text="Reservar"
      default-action-route="/Contacto"
      @item-click="handleRoomClick"
      @details-click="handleDetailsClick"
      @action-click="navigateToContact"
    />

    <!-- Sección de Estadísticas -->
    <StatsSection
      :stats="STATS"
      theme="brown"
      :animated="true"
    />

    <!-- Carrusel 3D de Amenidades -->
    <BaseCarousel3D
      :items="HIGHLIGHTS_3D"
      title="Amenidades Exclusivas"
      subtitle="Servicios únicos que hacen especial su estadía"
      section-class="q-pa-xl bg-black-6"
      click-indicator-color="brown-7"
      @item-click="handleAmenityClick"
    />

    <!-- CTA Section -->
    <CTASection
      title="Reserve su Habitación"
      subtitle="Viva la experiencia del lujo colonial en el corazón de Cartagena"
      button-label="Verificar Disponibilidad"
      button-color="brown-7"
      button-to="/Contacto"
      button-icon="calendar_today"
      theme="light"
      :animated="true"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import HorizontalCarousel from '../components/HorizontalCarousel.vue'
import BaseCarousel3D from '../components/BaseCarousel3D.vue'
import StatsSection from '../components/StatsSection.vue'
import CTASection from '../components/CTASection.vue'

const router = useRouter()

// Constants
const HERO_BADGE = {
  icon: 'bed',
  color: 'brown-7',
  label: 'Lujo Colonial Certificado'
}

const SUITES = [
  {
    id: 1,
    name: 'Suite Colonial Premium',
    description: 'Elegante suite con vista panorámica al mar Caribe y decoración colonial auténtica que combina historia y lujo moderno',
    price: '$700',
    capacity: '2-3',
    size: '65 m²',
    image: 'https://e9c3aa9d33ed68ad5563-53656e37320f5eb0ad9175f5f21a9949.ssl.cf1.rackcdn.com/u/zemi-beach/new-photography/three-bed-presidential_01.jpg',
    amenities: ['Vista al mar', 'Balcón privado', 'Minibar premium', 'WiFi gratis', 'A/C individual', 'TV Smart 55"'],
    rating: 5
  },
  {
    id: 2,
    name: 'Suite Presidencial',
    description: 'La máxima expresión de lujo con terraza privada, jacuzzi y vista espectacular a la bahía de Cartagena',
    price: '$950',
    capacity: '4',
    size: '120 m²',
    image: 'https://ryukyuhotel.kenhotels.com/guestroom/img/suite/thumb/presidential/1.jpg',
    amenities: ['Jacuzzi privado', 'Sala separada', 'Terraza amplia', 'Servicio 24h', 'Butler personal', 'Vista 360°'],
    rating: 5
  },
  {
    id: 3,
    name: 'Suite Familiar',
    description: 'Espaciosa suite ideal para familias con conexión a habitación adicional y área de juegos para niños',
    price: '$1200',
    capacity: '6',
    size: '85 m²',
    image: 'https://www.sofitelbarucalablanca.com/wp-content/uploads/sites/19/2023/04/DUF_7068-v-ok-1170x780.jpg',
    amenities: ['Habitación conectada', 'Sala familiar', 'Cocina equipada', '2 baños completos', 'Balcón amplio', 'Área de juegos'],
    rating: 5
  },
  {
    id: 4,
    name: 'Junior Suite',
    description: 'Perfecta combinación de elegancia y confort en el corazón del hotel con detalles arquitectónicos únicos',
    price: '$850',
    capacity: '2',
    size: '55 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/rttroof:WIDE-LARGE-16-9',
    amenities: ['Vista al patio', 'Bañera de lujo', 'Minibar', 'WiFi gratis', 'A/C', 'Room service 24h'],
    rating: 5
  }
]

const ROOMS = [
  {
    id: 5,
    name: 'Habitación Superior',
    description: 'Cómoda habitación con auténticos toques coloniales, vista al jardín interior histórico del convento',
    price: '$480',
    capacity: '2',
    size: '45 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/asdt1-dq:WIDE-LARGE-16-9',
    amenities: ['Vista jardín histórico', 'WiFi gratis', 'TV Cable premium', 'A/C silencioso', 'Escritorio amplio', 'Minibar'],
    rating: 5
  },
  {
    id: 6,
    name: 'Habitación Deluxe',
    description: 'Refinada habitación con elementos arquitectónicos originales del convento del siglo XVII perfectamente conservados',
    price: '$420',
    capacity: '2',
    size: '40 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/oceanview-king-junior-suite-ovk:WIDE-LARGE-16-9',
    amenities: ['Elementos históricos', 'WiFi gratis', 'A/C', 'TV Smart 43"', 'Minibar', 'Caja fuerte digital'],
    rating: 5
  },
  {
    id: 7,
    name: 'Habitación Garden View',
    description: 'Habitación tranquila con vista privilegiada a los jardines históricos del convento y área de meditación',
    price: '$360',
    capacity: '2',
    size: '38 m²',
    image: 'https://www.caribehilton.com/wp-content/uploads/2024/02/Garden-Wing-1-King-Bed-With-Balcony-1440x560.jpg',
    amenities: ['Vista jardín exclusiva', 'WiFi gratis', 'A/C', 'TV Smart', 'Escritorio', 'Cafetera Nespresso'],
    rating: 5
  },
  {
    id: 8,
    name: 'Habitación Colonial',
    description: 'Auténtica experiencia colonial con mobiliario de época restaurado y detalles únicos de la arquitectura original',
    price: '$400',
    capacity: '4',
    size: '42 m²',
    image: 'https://image-tc.galaxy.tf/wijpeg-1c4jbx8k42kwcdrez9uaft85b/superior-vista-parcial-mar-2023_wide.jpg?crop=0%2C100%2C1920%2C1080',
    amenities: ['Mobiliario de época', 'WiFi gratis', 'A/C', 'TV Smart', 'Minibar', 'Balcón francés'],
    rating: 5
  }
]

const STATS = [
  { id: 1, number: '122', label: 'Habitaciones y Suites' },
  { id: 2, number: '6', label: 'Tipos de Acomodación' },
  { id: 3, number: '24/7', label: 'Room Service' },
  { id: 4, number: '★★★★★', label: 'Lujo Garantizado' }
]

// Computed properties
const heroActions = computed(() => [
  {
    label: 'Reservar Habitación',
    variant: 'hero-primary',
    to: '/Contacto',
    color: 'orange-8'
  },
  {
    label: 'Ver Suites',
    variant: 'hero-secondary',
    color: 'white-8',
    click: scrollToRooms
  }
])

const HIGHLIGHTS_3D = computed(() => {
  const baseUrl = 'https://images.unsplash.com'
  const amenities = [
    { id: 1, title: 'Room Service 24/7', desc: 'Servicio de habitación las 24 horas con menú gourmet', img: 'photo-1566073771259-6a8506099945' },
    { id: 2, title: 'Concierge Personal', desc: 'Asistente personal para todas sus necesidades', img: 'photo-1551698618-1dfe5d97d256' },
    { id: 3, title: 'WiFi Premium', desc: 'Internet de alta velocidad en todas las habitaciones', img: 'photo-1542314831-068cd1dbfeeb' },
    { id: 4, title: 'Amenidades de Lujo', desc: 'Productos premium de baño y confort', img: 'photo-1578683010236-d716f9a3f461' },
    { id: 5, title: 'Vistas Espectaculares', desc: 'Vistas al mar, jardín o centro histórico', img: 'photo-1571019613454-1cb2f99b2d8b' },
    { id: 6, title: 'Housekeeping Diario', desc: 'Servicio de limpieza dos veces al día', img: 'photo-1560066984-138dadb4c035' },
    { id: 7, title: 'Climatización Individual', desc: 'Control de temperatura personalizado', img: 'photo-1571902943202-507ec2618e8f' },
    { id: 8, title: 'Minibar Premium', desc: 'Selección gourmet de bebidas y snacks', img: 'photo-1544551763-46a013bb70d5' }
  ]
  
  return amenities.map(a => ({
    id: a.id,
    title: a.title,
    description: a.desc,
    image: `${baseUrl}/${a.img}?w=600&h=400&fit=crop`,
    action: navigateToContact
  }))
})

// Event handlers
const navigateToContact = () => router.push('/Contacto')

const handleHeroAction = ({ action }) => {
  if (action.click) action.click()
}

const handleSuiteClick = (suite) => {
  console.log('Suite clicked:', suite)
}

const handleRoomClick = (room) => {
  console.log('Room clicked:', room)
}

const handleDetailsClick = (item) => {
  console.log('Details clicked for:', item)
}

const handleAmenityClick = ({ item }) => {
  item.action?.()
}

const scrollToRooms = () => {
  document.querySelector('.horizontal-carousel-section')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}
</script>

<style scoped>
/* Responsive */
@media (max-width: 768px) {
  .horizontal-carousel-section {
    padding: 1rem;
  }
}
</style>