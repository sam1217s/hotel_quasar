<template>
  <div class="rooms-page">
    <!-- Hero Section -->
    <HeroSection
      title="Suites y Habitaciones"
      subtitle="Glamour Colonial • Comodidades Modernas • Experiencia Única"
      background-image="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop"
      :badge="HERO_BADGE"
      :actions="heroActions"
      @action-click="handleHeroAction"
    />

    <!-- Filtros de Búsqueda -->
     <div class="filters-section q-pa-lg bg-grey-2">
    <q-card flat class="q-pa-md filter-card">
      <div class="row items-center justify-between">
        <div class="col-md-8 col-12">
          <div class="row q-col-gutter-md">
            <!-- Tipo de Habitación -->
            <div class="col-md-3 col-6">
              <q-select
                v-model="filters.roomType"
                :options="roomTypes"
                label="Tipo de habitación"
                outlined
                dense
                clearable
                class="filter-select text-brown-7"
                label-color="brown-7"
                menu-anchor="bottom left"
                menu-self="top left"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" class="text-brown-7">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <!-- Capacidad -->
            <div class="col-md-3 col-6">
              <q-select
                v-model="filters.capacity"
                :options="capacityOptions"
                label="Capacidad"
                outlined
                dense
                clearable
                class="filter-select text-brown-7"
                label-color="brown-7"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" class="text-brown-7">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <!-- Rango de Precio -->
            <div class="col-md-3 col-6">
              <q-select
                v-model="filters.priceRange"
                :options="priceRanges"
                label="Rango de precio"
                outlined
                dense
                clearable
                class="filter-select text-brown-7"
                label-color="brown-7"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" class="text-brown-7">
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>

            <!-- Amenidades -->
            <div class="col-md-3 col-6">
              <q-select
                v-model="filters.amenities"
                :options="amenitiesOptions"
                label="Amenidades"
                outlined
                dense
                multiple
                clearable
                class="filter-select text-brown-7"
                label-color="brown-7"
                use-chips
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps" class="text-brown-7">
                    <q-item-section side>
                      <q-checkbox v-model="scope.selected" color="brown-7" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:selected-item="scope">
                  <q-chip
                    removable
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    color="brown-7"
                    text-color="white"
                    class="q-ma-xs"
                  >
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
              </q-select>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-12 text-right">
          <q-btn
            color="brown-7"
            label="Filtrar"
            @click="applyFilters"
            class="q-mr-md"
          />
          <q-btn
            color="grey-7"
            label="Limpiar"
            outline
            @click="resetFilters"
          />
        </div>
      </div>
    </q-card>
  </div>

    <!-- Resultados de Búsqueda -->
    <div class="results-section q-px-xl q-py-lg">
      <div class="text-h5 q-mb-md">
        {{ filteredRooms.length }} Habitaciones disponibles
        <q-chip v-if="activeFiltersCount" color="brown-7" text-color="white">
          {{ activeFiltersCount }} filtros aplicados
        </q-chip>
      </div>

      <!-- Vista de Mosaico o Lista -->
      <div class="view-options q-mb-md">
        <q-btn-toggle
          v-model="viewMode"
          toggle-color="brown-7"
          :options="[
            {label: 'Mosaico', value: 'grid'},
            {label: 'Lista', value: 'list'}
          ]"
        />
      </div>

      <!-- Vista de Mosaico -->
      <div v-if="viewMode === 'grid'" class="row q-col-gutter-lg">
        <div
          v-for="room in filteredRooms"
          :key="room.id"
          class="col-md-4 col-sm-6 col-12"
        >
          <RoomCard :room="room" @click="navigateToRoomDetail(room.id)" />
        </div>
      </div>

      <!-- Vista de Lista -->
      <div v-if="viewMode === 'list'" class="room-list">
        <q-list bordered separator>
          <q-item
            v-for="room in filteredRooms"
            :key="room.id"
            clickable
            v-ripple
            class="room-list-item"
            @click="navigateToRoomDetail(room.id)"
          >
            <q-item-section avatar>
              <q-img
                :src="room.image"
                width="120px"
                height="80px"
                class="rounded-borders"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h6">{{ room.name }}</q-item-label>
              <q-item-label caption>{{ room.description }}</q-item-label>
              <q-item-label>
                <q-chip
                  v-for="amenity in room.amenities.slice(0, 3)"
                  :key="amenity"
                  dense
                  color="grey-3"
                  text-color="brown-7"
                  size="sm"
                >
                  {{ amenity }}
                </q-chip>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <div class="text-right">
                <div class="text-h6 text-brown-7">{{ room.price }}</div>
                <div class="text-caption">por noche</div>
                <q-rating
                  v-model="room.rating"
                  size="sm"
                  color="brown-7"
                  readonly
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Sección de Estadísticas -->
    <StatsSection
      :stats="STATS"
      theme="brown"
      :animated="true"
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import HeroSection from '../components/HeroSection.vue'
import StatsSection from '../components/StatsSection.vue'
import CTASection from '../components/CTASection.vue'
import RoomCard from '../components/RoomCard.vue'

const router = useRouter()

// Constants
const HERO_BADGE = {
  icon: 'bed',
  color: 'brown-7',
  label: 'Lujo Colonial Certificado'
}

const ALL_ROOMS = [
  {
    id: 1,
    name: 'Suite Colonial Premium',
    type: 'suite',
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
    type: 'suite',
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
    type: 'suite',
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
    type: 'suite',
    description: 'Perfecta combinación de elegancia y confort en el corazón del hotel con detalles arquitectónicos únicos',
    price: '$850',
    capacity: '2',
    size: '55 m²',
    image: 'https://images.rosewoodhotels.com/is/image/rwhg/rttroof:WIDE-LARGE-16-9',
    amenities: ['Vista al patio', 'Bañera de lujo', 'Minibar', 'WiFi gratis', 'A/C', 'Room service 24h'],
    rating: 5
  },
  {
    id: 5,
    name: 'Habitación Superior',
    type: 'habitacion',
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
    type: 'habitacion',
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
    type: 'habitacion',
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
    type: 'habitacion',
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

// Filtros
const filters = ref({
  roomType: null,
  capacity: null,
  priceRange: null,
  amenities: []
})

const viewMode = ref('grid')

// Opciones de filtro
const roomTypes = computed(() => [
  { label: 'Suites', value: 'suite' },
  { label: 'Habitaciones', value: 'habitacion' }
])

const capacityOptions = computed(() => [
  { label: '1-2 personas', value: '2' },
  { label: '3-4 personas', value: '4' },
  { label: '5+ personas', value: '5' }
])

const priceRanges = computed(() => [
  { label: 'Económico ($300-$500)', value: '300-500' },
  { label: 'Estándar ($500-$800)', value: '500-800' },
  { label: 'Premium ($800-$1200)', value: '800-1200' },
  { label: 'Lujo ($1200+)', value: '1200-9999' }
])

const allAmenities = computed(() => {
  const amenities = new Set()
  ALL_ROOMS.forEach(room => {
    room.amenities.forEach(amenity => amenities.add(amenity))
  })
  return Array.from(amenities).map(a => ({ label: a, value: a }))
})

const amenitiesOptions = computed(() => allAmenities.value)

// Computed properties
const heroActions = computed(() => [
  {
    label: 'Reservar Habitación',
    variant: 'hero-primary',
    to: '/Contacto',
    color: 'orange-8'
  },
  {
    label: 'Ver Todas',
    variant: 'hero-secondary',
    color: 'white-8',
    click: scrollToResults
  }
])

const filteredRooms = computed(() => {
  let result = [...ALL_ROOMS]
  
  // Filtrar por tipo de habitación
  if (filters.value.roomType) {
    result = result.filter(room => room.type === filters.value.roomType.value)
  }
  
  // Filtrar por capacidad
  if (filters.value.capacity) {
    const maxCapacity = parseInt(filters.value.capacity.value)
    result = result.filter(room => {
      const roomMax = parseInt(room.capacity.split('-').pop())
      return roomMax <= maxCapacity
    })
  }
  
  // Filtrar por rango de precio
  if (filters.value.priceRange) {
    const [min, max] = filters.value.priceRange.value.split('-').map(Number)
    result = result.filter(room => {
      const price = parseInt(room.price.replace(/\D/g, ''))
      return price >= min && price <= max
    })
  }
  
  // Filtrar por amenidades
  if (filters.value.amenities && filters.value.amenities.length > 0) {
    const selectedAmenities = filters.value.amenities.map(a => a.value)
    result = result.filter(room => 
      selectedAmenities.every(amenity => 
        room.amenities.includes(amenity)
      )
    )
  }
  
  return result
})

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.value.roomType) count++
  if (filters.value.capacity) count++
  if (filters.value.priceRange) count++
  if (filters.value.amenities && filters.value.amenities.length > 0) count++
  return count
})

// Methods
const applyFilters = () => {
  // Los filtros ya se aplican reactivamente
  scrollToResults()
}

const resetFilters = () => {
  filters.value = {
    roomType: null,
    capacity: null,
    priceRange: null,
    amenities: []
  }
}
// aca definimo la función para navegar a los detalles de la habitación
// const navigateToRoomDetail = (roomId) => {
//   router.push(`/habitaciones/${roomId}`)
// }

const scrollToResults = () => {
  const el = document.querySelector('.results-section')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleHeroAction = ({ action }) => {
  if (action.click) action.click()
}
</script>

<style scoped>
.rooms-page {
  background-color: #f9f9f9;
}

/* Sección de Filtros - Estilos mejorados */
.filters-section {
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background-color: #f8f5f2;
}

.filter-card {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e0d6cc;
}

.filter-select {
  background-color: white;
}

/* Estilos para los dropdowns */
:deep(.q-field__label) {
  color: var(--q-brown-7) !important;
  font-weight: 500;
}

:deep(.q-field__native) {
  color: #333 !important;
}

:deep(.q-field__control) {
  border-radius: 6px !important;
}

/* Menús desplegables */
:deep(.q-menu) {
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2) !important;
  border-radius: 8px !important;
  border: 1px solid #e0d6cc !important;
  background-color: white !important;
}

:deep(.q-item) {
  color: #333 !important;
  min-height: 40px;
  padding: 8px 16px;
  font-size: 14px;
}

:deep(.q-item:hover) {
  background-color: rgba(141, 69, 19, 0.08) !important;
}

:deep(.q-item--active) {
  color: var(--q-brown-7) !important;
  background-color: rgba(141, 69, 19, 0.1) !important;
}

/* Chips de selección múltiple */
:deep(.q-chip) {
  background-color: var(--q-brown-7) !important;
  color: white !important;
  font-size: 12px;
}

/* Checkbox en selección múltiple */
:deep(.q-checkbox__inner--truthy) {
  color: var(--q-brown-7) !important;
}

/* Sección de Resultados */
.results-section {
  background-color: white;
  min-height: 60vh;
  padding: 24px;
}

.room-list-item {
  transition: all 0.3s;
  border-left: 3px solid transparent;
  margin-bottom: 8px;
}

.room-list-item:hover {
  background-color: #f9f5f0;
  border-left: 3px solid var(--q-brown-7);
}

/* Responsive */
@media (max-width: 768px) {
  .filters-section {
    position: relative;
    padding: 12px;
  }
  
  .filters-section .row > div {
    margin-bottom: 12px;
  }
  
  .view-options {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .room-list-item {
    flex-direction: column;
  }
  
  .room-list-item .q-item__section--side {
    width: 100%;
    text-align: left;
    margin-top: 12px;
  }
  
  :deep(.q-field__control) {
    height: 40px !important;
  }
}

@media (max-width: 480px) {
  .filters-section .row > div {
    margin-bottom: 16px;
  }
  
  .filter-btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>