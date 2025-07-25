<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section q-pa-sm overflow-hidden">
      <div class="hero-content text-center q-pa-xl">
        <div class="hero-badge q-mb-md">
          <q-chip icon="bed" color="brown-7" text-color="white" label="Lujo Colonial Certificado" />
        </div>
        <h1 class="text-h2 text-orange q-mb-md">Suites y Habitaciones</h1>
        <p class="text-h6 text-white-6 q-mb-xl">Glamour Colonial • Comodidades Modernas • Experiencia Única</p>
        <div class="hero-actions">
          <q-btn size="lg" color="orange-8" label="Reservar Habitación" to="/Contacto" outline class="q-mr-md q-mb-sm" unelevated />
          <q-btn size="lg" color="white-8" label="Ver Suites" outline class="q-mb-sm" @click="scrollToRooms" />
        </div>
      </div>
    </section>



    <!-- Suites de Lujo - CARRUSEL HORIZONTAL TIPO E-COMMERCE -->
    <section class="q-pa-md q-mb-xl">
      <div class="text-center q-mb-lg">
        <h3 class="text-h4 text-orange">Suites de Lujo</h3>
        <p class="text-h6 text-grey-6">Nuestras suites más exclusivas con servicios premium</p>
      </div>

      <div class="carousel-wrapper">
        <q-btn 
          round 
          color="white" 
          text-color="brown-7"
          icon="chevron_left" 
          size="md"
          class="carousel-arrow carousel-arrow-left"
          @click="scrollLeft('suites')"
          :disable="suitesScrollPosition <= 0"
        />
        
        <div class="horizontal-scroll-container" ref="suitesContainer">
          <div class="cards-row">
            <div 
              v-for="suite in suites" 
              :key="suite.id" 
              class="card-item"
            >
               <q-card class="room-card-horizontal q-mr-md" style="width: 400px;">

                <div class="room-image-container">
                  <q-img :src="suite.image" height="180px" class="room-image">
                    <div class="absolute-top-left q-pa-md">
                      <q-badge color="blue" text-color="white" class="best-seller-badge">
                        Best seller
                      </q-badge>
                    </div>
                    <div class="absolute-top-right q-pa-md">
                      <q-btn 
                        round 
                        color="white" 
                        text-color="brown-7"
                        icon="fullscreen" 
                        size="sm"
                        class="view-btn"
                      />
                    </div>
                  </q-img>
                </div>

                <q-card-section class="q-pa-md">
                  <div class="room-header q-mb-sm">
                    <div class="text-h6 text-brown-7">{{ suite.name }}</div>
                  </div>
                  
                  <div class="room-rating q-mb-sm">
                    <q-icon 
                      v-for="star in 5" 
                      :key="star"
                      name="star" 
                      color="amber" 
                      size="sm"
                    />
                  </div>
                  
                  <div class="text-body2 text-grey-6 q-mb-md">{{ suite.description }}</div>
                  
                  <div class="row q-gutter-sm q-mb-md">
                    <div class="col-auto">
                      <q-icon name="people" color="grey-6" size="sm" class="q-mr-xs" />
                      <span class="text-caption text-grey-6">{{ suite.capacity }} huéspedes</span>
                    </div>
                    <div class="col-auto">
                      <q-icon name="square_foot" color="grey-6" size="sm" class="q-mr-xs" />
                      <span class="text-caption text-grey-6">{{ suite.size }}</span>
                    </div>
                  </div>

                  <div class="q-mb-md">
                    <div class="text-caption text-grey-8 q-mb-xs">Amenidades</div>
                    <div>
                      <q-chip 
                        v-for="amenity in suite.amenities.slice(0, 2)" 
                        :key="amenity"
                        size="sm"
                        color="brown-1"
                        text-color="brown-7"
                        :label="amenity"
                        class="q-mr-xs q-mb-xs"
                      />
                      <q-chip 
                        v-if="suite.amenities.length > 2"
                        size="sm"
                        color="grey-3"
                        text-color="grey-7"
                        :label="`+${suite.amenities.length - 2} más`"
                      />
                    </div>
                  </div>

                  <div class="price-section q-mb-md">
                    <div class="text-h5 text-brown-7 text-weight-bold">{{ suite.price }}</div>
                    <div class="text-caption text-grey-6">/noche</div>
                  </div>
                </q-card-section>

                <q-card-actions align="between" class="q-pa-md">
                  <q-btn 
                    flat
                    color="brown-7" 
                    label="Ver Detalles"
                    size="sm"
                  />
                  <q-btn 
                    color="brown-7" 
                    label="Reservar"
                    to="/Contacto"
                    unelevated
                    size="sm"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>

        <q-btn 
          round 
          color="white" 
          text-color="brown-7"
          icon="chevron_right" 
          size="md"
          class="carousel-arrow carousel-arrow-right"
          @click="scrollRight('suites')"
          :disable="suitesScrollPosition >= suitesMaxScroll"
        />
      </div>
    </section>

    <!-- Habitaciones Elegantes - CARRUSEL HORIZONTAL TIPO E-COMMERCE -->
    <section class="q-pa-md">
      <div class="text-center q-mb-lg">
        <h3 class="text-h4 text-orange">Habitaciones Elegantes</h3>
        <p class="text-h6 text-grey-6">Comodidad y estilo en cada detalle</p>
      </div>

      <div class="carousel-wrapper">
        <q-btn 
          round 
          color="white" 
          text-color="brown-7"
          icon="chevron_left" 
          size="md"
          class="carousel-arrow carousel-arrow-left"
          @click="scrollLeft('rooms')"
          :disable="roomsScrollPosition <= 0"
        />
        
        <div class="horizontal-scroll-container" ref="roomsContainer">
          <div class="cards-row">
            <div 
              v-for="room in rooms" 
              :key="room.id" 
              class="card-item"
            >
               <q-card class="room-card-horizontal q-mr-md" style="width: 400px;">
                <div class="room-image-container">
                  <q-img :src="room.image" height="180px" class="room-image">
                    <div class="absolute-top-left q-pa-md" v-if="room.id === 5">
                      <q-badge color="blue" text-color="white" class="best-seller-badge">
                        Best seller
                      </q-badge>
                    </div>
                    <div class="absolute-top-right q-pa-md">
                      <q-btn 
                        round 
                        color="white" 
                        text-color="brown-7"
                        icon="fullscreen" 
                        size="sm"
                        class="view-btn"
                      />
                    </div>
                  </q-img>
                </div>

                <q-card-section class="q-pa-md">
                  <div class="room-header q-mb-sm">
                    <div class="text-h6 text-brown-7">{{ room.name }}</div>
                  </div>
                  
                  <div class="room-rating q-mb-sm">
                    <q-icon 
                      v-for="star in 5" 
                      :key="star"
                      name="star" 
                      color="amber" 
                      size="sm"
                    />
                  </div>
                  
                  <div class="text-body2 text-grey-6 q-mb-md">{{ room.description }}</div>
                  
                  <div class="row q-gutter-sm q-mb-md">
                    <div class="col-auto">
                      <q-icon name="people" color="grey-6" size="sm" class="q-mr-xs" />
                      <span class="text-caption text-grey-6">{{ room.capacity }} huéspedes</span>
                    </div>
                    <div class="col-auto">
                      <q-icon name="square_foot" color="grey-6" size="sm" class="q-mr-xs" />
                      <span class="text-caption text-grey-6">{{ room.size }}</span>
                    </div>
                  </div>

                  <div class="q-mb-md">
                    <div class="text-caption text-grey-8 q-mb-xs">Amenidades</div>
                    <div>
                      <q-chip 
                        v-for="amenity in room.amenities.slice(0, 2)" 
                        :key="amenity"
                        size="sm"
                        color="brown-1"
                        text-color="brown-7"
                        :label="amenity"
                        class="q-mr-xs q-mb-xs"
                      />
                      <q-chip 
                        v-if="room.amenities.length > 2"
                        size="sm"
                        color="grey-3"
                        text-color="grey-7"
                        :label="`+${room.amenities.length - 2} más`"
                      />
                    </div>
                  </div>

                  <div class="price-section q-mb-md">
                    <div class="text-h5 text-brown-7 text-weight-bold">{{ room.price }}</div>
                    <div class="text-caption text-grey-6">/noche</div>
                  </div>
                </q-card-section>

                <q-card-actions align="between" class="q-pa-md">
                  <q-btn 
                    flat
                    color="brown-7" 
                    label="Ver Detalles"
                    size="sm"
                  />
                  <q-btn 
                    color="brown-7" 
                    label="Reservar"
                    to="/Contacto"
                    unelevated
                    size="sm"
                  />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </div>

        <q-btn 
          round 
          color="white" 
          text-color="brown-7"
          icon="chevron_right" 
          size="md"
          class="carousel-arrow carousel-arrow-right"
          @click="scrollRight('rooms')"
          :disable="roomsScrollPosition >= roomsMaxScroll"
        />
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section bg-brown-7 text-white q-pa-xl">
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
        <h2 class="text-h3 text-orange-8">Amenidades Exclusivas</h2>
        <p class="text-h6 text-white-3">Servicios únicos que hacen especial su estadía</p>
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
                <q-icon name="touch_app" size="sm" color="brown-7" class="click-indicator q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Room Types Section -->
    <section class="room-types-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Tipos de Habitaciones</h2>
        <p class="text-h6 text-grey-6">Elija la experiencia que mejor se adapte a sus necesidades</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="type in roomTypes" :key="type.id" class="col-md-3 col-sm-6 col-xs-12">
          <q-card class="room-type-card text-center" flat bordered>
            <q-card-section class="q-pa-lg">
              <q-icon :name="type.icon" size="3rem" :color="type.color" class="q-mb-md" />
              <div class="text-h6 text-grey-8 q-mb-sm">{{ type.name }}</div>
              <div class="text-body2 text-grey-6 q-mb-md">{{ type.description }}</div>
              <div class="text-h6 text-brown-7 text-weight-bold">{{ type.priceRange }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Booking Section -->
    <section class="booking-section q-pa-xl bg-brown-9 text-white">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-white">Disponibilidad y Reservas</h2>
        <p class="text-h6 text-grey-4">Consulte disponibilidad en tiempo real</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="service in bookingServices" :key="service.id" class="col-md-4 col-sm-6 col-xs-12">
          <q-card class="booking-card" dark>
            <q-card-section class="text-center q-pa-lg">
              <q-icon :name="service.icon" size="3rem" :color="service.color" class="q-mb-md" />
              <div class="text-h6 text-white q-mb-sm">{{ service.name }}</div>
              <div class="text-body2 text-grey-4">{{ service.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">Reserve su Habitación</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Viva la experiencia del lujo colonial en el corazón de Cartagena</p>
      <q-btn 
        size="lg" 
        color="brown-7" 
        text-color="white" 
        label="Verificar Disponibilidad" 
        to="/Contacto" 
        unelevated
        class="q-px-xl" 
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const carousel3d = ref(null)

// Referencias de los contenedores de carruseles horizontales
const suitesContainer = ref(null)
const roomsContainer = ref(null)

// Control de scroll para carruseles horizontales
const suitesScrollPosition = ref(0)
const roomsScrollPosition = ref(0)
const suitesMaxScroll = ref(0)
const roomsMaxScroll = ref(0)

let rotation = 0
let animationId = null

// Suites de Lujo - CONSERVADO ORIGINAL
const suites = ref([
  {
    id: 1,
    name: 'Suite Colonial Premium',
    description: 'Elegante suite con vista panorámica al mar Caribe y decoración colonial auténtica que combina historia y lujo moderno',
    price: '$700',
    capacity: '2-3',
    size: '65 m²',
    image: 'https://e9c3aa9d33ed68ad5563-53656e37320f5eb0ad9175f5f21a9949.ssl.cf1.rackcdn.com/u/zemi-beach/new-photography/three-bed-presidential_01.jpg',
    amenities: ['Vista al mar', 'Balcón privado', 'Minibar premium', 'WiFi gratis', 'A/C individual', 'TV Smart 55"']
  },
  {
    id: 2,
    name: 'Suite Presidencial',
    description: 'La máxima expresión de lujo con terraza privada, jacuzzi y vista espectacular a la bahía de Cartagena',
    price: '$950',
    capacity: '4',
    size: '120 m²',
    image: 'https://ryukyuhotel.kenhotels.com/guestroom/img/suite/thumb/presidential/1.jpg',
    amenities: ['Jacuzzi privado', 'Sala separada', 'Terraza amplia', 'Servicio 24h', 'Butler personal', 'Vista 360°']
  },
  {
    id: 3,
    name: 'Suite Familiar',
    description: 'Espaciosa suite ideal para familias con conexión a habitación adicional y área de juegos para niños',
    price: '$1200',
    capacity: '6',
    size: '85 m²',
    image: 'https://www.sofitelbarucalablanca.com/wp-content/uploads/sites/19/2023/04/DUF_7068-v-ok-1170x780.jpg',
    amenities: ['Habitación conectada', 'Sala familiar', 'Cocina equipada', '2 baños completos', 'Balcón amplio', 'Área de juegos']
  },
  {
    id: 4,
    name: 'Junior Suite',
    description: 'Perfecta combinación de elegancia y confort en el corazón del hotel con detalles arquitectónicos únicos',
    price: '$850',
    capacity: '2',
    size: '55 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/rttroof:WIDE-LARGE-16-9',
    amenities: ['Vista al patio', 'Bañera de lujo', 'Minibar', 'WiFi gratis', 'A/C', 'Room service 24h']
  },
])

// Habitaciones - CONSERVADO ORIGINAL
const rooms = ref([
  {
    id: 5,
    name: 'Habitación Superior',
    description: 'Cómoda habitación con auténticos toques coloniales, vista al jardín interior histórico del convento',
    price: '$480',
    capacity: '2',
    size: '45 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/asdt1-dq:WIDE-LARGE-16-9',
    amenities: ['Vista jardín histórico', 'WiFi gratis', 'TV Cable premium', 'A/C silencioso', 'Escritorio amplio', 'Minibar']
  },
  {
    id: 6,
    name: 'Habitación Deluxe',
    description: 'Refinada habitación con elementos arquitectónicos originales del convento del siglo XVII perfectamente conservados',
    price: '$420',
    capacity: '2',
    size: '40 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/oceanview-king-junior-suite-ovk:WIDE-LARGE-16-9',
    amenities: ['Elementos históricos', 'WiFi gratis', 'A/C', 'TV Smart 43"', 'Minibar', 'Caja fuerte digital']
  },
  {
    id: 7,
    name: 'Habitación Garden View',
    description: 'Habitación tranquila con vista privilegiada a los jardines históricos del convento y área de meditación',
    price: '$360',
    capacity: '2',
    size: '38 m²',
    image: 'https://www.caribehilton.com/wp-content/uploads/2024/02/Garden-Wing-1-King-Bed-With-Balcony-1440x560.jpg',
    amenities: ['Vista jardín exclusiva', 'WiFi gratis', 'A/C', 'TV Smart', 'Escritorio', 'Cafetera Nespresso']
  },
  {
    id: 8,
    name: 'Habitación Colonial',
    description: 'Auténtica experiencia colonial con mobiliario de época restaurado y detalles únicos de la arquitectura original',
    price: '$400',
    capacity: '4',
    size: '42 m²',
    image: 'https://image-tc.galaxy.tf/wijpeg-1c4jbx8k42kwcdrez9uaft85b/superior-vista-parcial-mar-2023_wide.jpg?crop=0%2C100%2C1920%2C1080',
    amenities: ['Mobiliario de época', 'WiFi gratis', 'A/C', 'TV Smart', 'Minibar', 'Balcón francés']
  }
])

const stats = ref([
  { id: 1, number: '122', label: 'Habitaciones y Suites' },
  { id: 2, number: '6', label: 'Tipos de Acomodación' },
  { id: 3, number: '24/7', label: 'Room Service' },
  { id: 4, number: '★★★★★', label: 'Lujo Garantizado' }
])

const highlights3d = ref([
  {
    id: 1,
    title: 'Room Service 24/7',
    description: 'Servicio de habitación las 24 horas con menú gourmet',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Concierge Personal',
    description: 'Asistente personal para todas sus necesidades',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'WiFi Premium',
    description: 'Internet de alta velocidad en todas las habitaciones',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Amenidades de Lujo',
    description: 'Productos premium de baño y confort',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Vistas Espectaculares',
    description: 'Vistas al mar, jardín o centro histórico',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Housekeeping Diario',
    description: 'Servicio de limpieza dos veces al día',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop'
  },
  {
    id: 7,
    title: 'Climatización Individual',
    description: 'Control de temperatura personalizado',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop'
  },
  {
    id: 8,
    title: 'Minibar Premium',
    description: 'Selección gourmet de bebidas y snacks',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop'
  }
])

const roomTypes = ref([
  {
    id: 1,
    name: 'Suites de Lujo',
    description: 'Máximo confort con servicios VIP y vistas espectaculares',
    icon: 'hotel',
    color: 'brown-7',
    priceRange: '$700 - $1200'
  },
  {
    id: 2,
    name: 'Habitaciones Superior',
    description: 'Elegancia colonial con comodidades modernas',
    icon: 'bed',
    color: 'amber-8',
    priceRange: '$420 - $480'
  },
  {
    id: 3,
    name: 'Opciones Familiares',
    description: 'Espacios amplios diseñados para familias',
    icon: 'family_restroom',
    color: 'blue-6',
    priceRange: '$850 - $1200'
  },
  {
    id: 4,
    name: 'Experiencia Histórica',
    description: 'Habitaciones con elementos originales del convento',
    icon: 'account_balance',
    color: 'purple-6',
    priceRange: '$360 - $480'
  }
])

const bookingServices = ref([
  {
    id: 1,
    name: 'Reserva Online',
    description: 'Sistema de reservas en tiempo real con confirmación inmediata',
    icon: 'computer',
    color: 'blue'
  },
  {
    id: 2,
    name: 'Atención Telefónica',
    description: 'Asistencia personalizada 24/7 para reservas y consultas',
    icon: 'phone',
    color: 'green'
  },
  {
    id: 3,
    name: 'Paquetes Especiales',
    description: 'Ofertas exclusivas para estadías prolongadas y grupos',
    icon: 'card_giftcard',
    color: 'orange'
  }
])

// Funciones de scroll para carruseles horizontales
const scrollLeft = (carousel) => {
  const container = carousel === 'suites' ? suitesContainer.value : roomsContainer.value
  const scrollAmount = 320 // Ancho de una tarjeta + gap
  
  container.scrollTo({
    left: container.scrollLeft - scrollAmount,
    behavior: 'smooth'
  })
}

const scrollRight = (carousel) => {
  const container = carousel === 'suites' ? suitesContainer.value : roomsContainer.value
  const scrollAmount = 320 // Ancho de una tarjeta + gap
  
  container.scrollTo({
    left: container.scrollLeft + scrollAmount,
    behavior: 'smooth'
  })
}

// Actualizar posición de scroll
const updateScrollPosition = () => {
  if (suitesContainer.value) {
    suitesScrollPosition.value = suitesContainer.value.scrollLeft
    suitesMaxScroll.value = suitesContainer.value.scrollWidth - suitesContainer.value.clientWidth
  }
  if (roomsContainer.value) {
    roomsScrollPosition.value = roomsContainer.value.scrollLeft
    roomsMaxScroll.value = roomsContainer.value.scrollWidth - roomsContainer.value.clientWidth
  }
}

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

const scrollToRooms = () => {
  // Scroll hacia la primera sección de suites
  const suitesSection = document.querySelector('.carousel-wrapper')
  if (suitesSection) {
    suitesSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(async () => {
  animate3DCarousel()
  
  await nextTick()
  
  // Agregar listeners de scroll para carruseles horizontales
  if (suitesContainer.value) {
    suitesContainer.value.addEventListener('scroll', updateScrollPosition)
  }
  if (roomsContainer.value) {
    roomsContainer.value.addEventListener('scroll', updateScrollPosition)
  }
  
  // Calcular scroll máximo inicial
  updateScrollPosition()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
/* Hero Section - NUEVO DISEÑO */
.hero-section {
  display: flex;
  background-image: url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop");
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

/* Carruseles Horizontales Tipo E-commerce */
.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Contenedor con scroll horizontal */
.horizontal-scroll-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  margin: 0 20px;
}

/* Ocultar scrollbar en webkit browsers */
.horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

/* Fila de tarjetas */
.cards-row {
  display: flex;
  gap: 20px;
  padding: 20px 0;
}

/* Tarjeta individual */
.card-item {
  flex: 0 0 300px; /* Ancho fijo de 300px */
  height: auto;
}

/* Flechas del carrusel */
.carousel-arrow {
  position: relative;
  z-index: 2;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(139, 69, 19, 0.2);
}

.carousel-arrow:hover:not(.q-btn--disable) {
  transform: scale(1.1);
  border-color: #8D4513;
}

.carousel-arrow-left {
  margin-right: 10px;
}

.carousel-arrow-right {
  margin-left: 10px;
}

/* Tarjetas de habitaciones horizontales */
.room-card-horizontal {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.room-card-horizontal:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.room-card-horizontal .room-image-container {
  position: relative;
  overflow: hidden;
}

.room-card-horizontal .room-image {
  transition: transform 0.4s ease;
}

.room-card-horizontal:hover .room-image {
  transform: scale(1.05);
}

/* Best seller badge */
.best-seller-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.view-btn {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.9);
}

.room-card-horizontal .room-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.room-card-horizontal .room-rating {
  display: flex;
  gap: 2px;
}

.room-card-horizontal .price-section {
  text-align: left;
}



/* Stats - NUEVO DISEÑO */
.stats-section {
  background: linear-gradient(135deg, #8D4513, #A0522D);
}

.stat-item {
  padding: 20px;
}

/* Room Type Cards - NUEVO DISEÑO */
.room-type-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.room-type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Booking Cards - NUEVO DISEÑO */
.booking-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.booking-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

/* CTA Section - NUEVO DISEÑO */
.cta-section {
  background: #fafafa;
}

/* Carrusel 3D - NUEVO DISEÑO */
.carousel-3d-container {
  perspective: 1800px;
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(141, 69, 19, 0.1) 0%, transparent 70%);
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
  border: 1px solid rgba(141, 69, 19, 0.2);
}

.highlight-3d-card:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(141, 69, 19, 0.6);
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
  color: #8D4513;
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

  /* Responsive para carruseles horizontales */
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
  
  .card-item {
    flex: 0 0 250px; /* Tarjetas más pequeñas en móvil */
  }
  
  .horizontal-scroll-container {
    margin: 0 10px;
  }
}

@media (max-width: 480px) {
  .card-item {
    flex: 0 0 280px; /* Ancho casi completo en móviles pequeños */
  }
  
  .horizontal-scroll-container {
    margin: 0 5px;
  }
  
  .carousel-arrow {
    width: 36px;
    height: 36px;
  }
}

/* Animaciones suaves */
.q-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>