<template>
  <div class="q-pa-md">
    <div class="text-center q-mb-xl q-pa-lg">
      <h2 class="text-h3 text-orange">Suites y Habitaciones</h2>
      <p class="text-h6 text-grey-7">Glamour del viejo mundo con comodidades modernas</p>
    </div>

    <!-- Filtros -->
<div class="filters-section bg-grey-1 q-pa-lg q-mb-xl q-mx-auto" style="width: 30%;">
      <div class="row q-gutter-md justify-center">
        <div class="col-auto">
          <q-select 
            v-model="selectedGuests"
            :options="guestOptions"
            label="Huéspedes"
            outlined
            style="min-width: 150px"
          />
        </div>
        <div class="col-auto">
          <q-select 
            v-model="selectedPrice"
            :options="priceOptions"
            label="Rango de precio"
            outlined
            style="min-width: 150px"
          />
        </div>
      </div>
    </div>

    <!-- Carrusel de Suites -->
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
          <div class="cards-row ">
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

    <!-- Carrusel de Habitaciones -->
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

    <!-- CTA Section -->
    <div class="text-center q-m-none">
      <h3 class="text-h4 text-white q-mb-md">¿Necesita ayuda para elegir?</h3>
      <p class="text-body1 text-white q-mb-lg">Nuestro equipo de concierge estará encantado de ayudarle</p>
      <q-btn 
        color="brown-7" 
        size="lg" 
        label="Contactar Concierge"
        to="/Contacto"
        unelevated
        class="q-px-xl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// Referencias de los contenedores
const suitesContainer = ref(null)
const roomsContainer = ref(null)

// Control de scroll
const suitesScrollPosition = ref(0)
const roomsScrollPosition = ref(0)
const suitesMaxScroll = ref(0)
const roomsMaxScroll = ref(0)

// Filtros
const selectedGuests = ref('Cualquiera')
const selectedPrice = ref('Cualquiera')

const guestOptions = ['Cualquiera', '1-2 huéspedes', '3-4 huéspedes', '5+ huéspedes']
const priceOptions = ['Cualquiera', '$200-400', '$400-600', '$600+']

// Suites de Lujo
const suites = ref([
  {
    id: 1,
    name: 'Suite Colonial Premium',
    description: 'Elegante suite con vista panorámica al mar Caribe y decoración colonial auténtica',
    price: '$700',
    capacity: '2-3',
    size: '65 m²',
    image: 'https://e9c3aa9d33ed68ad5563-53656e37320f5eb0ad9175f5f21a9949.ssl.cf1.rackcdn.com/u/zemi-beach/new-photography/three-bed-presidential_01.jpg',
    amenities: ['Vista al mar', 'Balcón privado', 'Minibar', 'WiFi gratis', 'A/C', 'TV Smart']
  },
  {
    id: 2,
    name: 'Suite Presidencial',
    description: 'La máxima expresión de lujo con terraza privada y vista espectacular',
    price: '$950',
    capacity: '4',
    size: '120 m²',
    image: 'https://ryukyuhotel.kenhotels.com/guestroom/img/suite/thumb/presidential/1.jpg',
    amenities: ['Jacuzzi', 'Sala separada', 'Terraza', 'Servicio 24h', 'Butler', 'Vista 360°']
  },
  {
    id: 3,
    name: 'Suite Familiar',
    description: 'Espaciosa suite ideal para familias con conexión a habitación adicional',
    price: '$1200',
    capacity: '6',
    size: '85 m²',
    image: 'https://www.sofitelbarucalablanca.com/wp-content/uploads/sites/19/2023/04/DUF_7068-v-ok-1170x780.jpg',
    amenities: ['Habitación conectada', 'Sala familiar', 'Cocina', '2 baños', 'Balcón', 'Juegos']
  },
  {
    id: 4,
    name: 'Junior Suite',
    description: 'Perfecta combinación de elegancia y confort en el corazón del hotel',
    price: '$850',
    capacity: '2',
    size: '55 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/rttroof:WIDE-LARGE-16-9',
    amenities: ['Vista patio', 'Bañera', 'Minibar', 'WiFi gratis', 'A/C', 'Room service']
  },
])

// Habitaciones 
const rooms = ref([
  {
    id: 5,
    name: 'Habitación Superior',
    description: 'Cómoda habitación con auténticos toques coloniales y jardín interior',
    price: '$480',
    capacity: '2',
    size: '45 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/asdt1-dq:WIDE-LARGE-16-9',
    amenities: ['Vista jardín', 'WiFi gratis', 'TV Cable', 'A/C', 'Escritorio', 'Minibar']
  },
  
  {
    id: 6,
    name: 'Habitación Deluxe',
    description: 'Refinada habitación con elementos arquitectónicos originales del convento',
    price: '$420',
    capacity: '2',
    size: '40 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/oceanview-king-junior-suite-ovk:WIDE-LARGE-16-9',
    amenities: ['Elementos históricos', 'WiFi gratis', 'A/C', 'TV Smart', 'Minibar', 'Caja fuerte']
  },
  {
    id: 7,
    name: 'Habitación Garden View',
    description: 'Habitación tranquila con vista a los jardines históricos del convento',
    price: '$360',
    capacity: '2',
    size: '38 m²',
    image: 'https://www.caribehilton.com/wp-content/uploads/2024/02/Garden-Wing-1-King-Bed-With-Balcony-1440x560.jpg',
    amenities: ['Vista jardín', 'WiFi gratis', 'A/C', 'TV Smart', 'Escritorio', 'Cafetera']
  },
  {
    id: 8,
    name: 'Habitación Colonial',
    description: 'Auténtica experiencia colonial con mobiliario de época y detalles únicos',
    price: '$400',
    capacity: '4',
    size: '42 m²',
    image: 'https://image-tc.galaxy.tf/wijpeg-1c4jbx8k42kwcdrez9uaft85b/superior-vista-parcial-mar-2m-2023_wide.jpg?crop=0%2C100%2C1920%2C1080',
    amenities: ['Mobiliario de época', 'WiFi gratis', 'A/C', 'TV Smart', 'Minibar', 'Balcón pequeño']
  }
])

// Funciones de scroll
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

onMounted(async () => {
  await nextTick()
  
  // Agregar listeners de scroll
  if (suitesContainer.value) {
    suitesContainer.value.addEventListener('scroll', updateScrollPosition)
  }
  if (roomsContainer.value) {
    roomsContainer.value.addEventListener('scroll', updateScrollPosition)
  }
  
  // Calcular scroll máximo inicial
  updateScrollPosition()
})
</script>

<style scoped>
/* Contenedor principal del carrusel */
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

/* Tarjetas de habitaciones */
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

.room-image-container {
  position: relative;
  overflow: hidden;
}

.room-image {
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

.room-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.room-rating {
  display: flex;
  gap: 2px;
}

.price-section {
  text-align: left;
}

/* Filtros */
.filters-section {
  border-radius: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .filters-section .row {
    flex-direction: column;
    align-items: center;
  }
  
  .filters-section .col-auto {
    width: 100%;
    max-width: 300px;
  }
  
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
</style>