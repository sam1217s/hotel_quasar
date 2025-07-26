<template>
  <section class="horizontal-carousel-section q-pa-md q-mb-xl">
    <!-- Título opcional -->
    <div v-if="title || subtitle" class="text-center q-mb-lg">
      <h3 v-if="title" class="text-h4" :class="titleClass">{{ title }}</h3>
      <p v-if="subtitle" class="text-h6" :class="subtitleClass">{{ subtitle }}</p>
    </div>

    <div class="carousel-wrapper">
      <!-- Flecha izquierda -->
      <BaseButton
        round
        color="white"
        text-color="brown-7"
        icon="chevron_left"
        size="md"
        variant="secondary"
        :class="['carousel-arrow', 'carousel-arrow-left']"
        :disable="scrollPosition <= 0"
        @click="scrollLeft"
      />
      
      <!-- Contenedor con scroll horizontal -->
      <div class="horizontal-scroll-container" ref="scrollContainer" @scroll="updateScrollPosition">
        <div class="cards-row">
          <div 
            v-for="(item, index) in items" 
            :key="item.id || index" 
            class="card-item"
          >
            <!-- Slot personalizable para cada item -->
            <slot name="item" :item="item" :index="index">
              <!-- Card por defecto -->
              <q-card class="default-item-card q-mr-md" :style="{ width: cardWidth }">
                <!-- Imagen -->
                <div v-if="item.image" class="item-image-container">
                  <q-img :src="item.image" :height="imageHeight" class="item-image">
                    <!-- Badge opcional -->
                    <div v-if="item.badge || (item.id === bestSellerId)" class="absolute-top-left q-pa-md">
                      <q-badge color="blue" text-color="white" class="best-seller-badge">
                        {{ item.badge || 'Best seller' }}
                      </q-badge>
                    </div>
                    <!-- Botón de vista completa -->
                    <div class="absolute-top-right q-pa-md">
                      <BaseButton
                        round
                        color="white"
                        text-color="brown-7"
                        icon="fullscreen"
                        size="sm"
                        variant="secondary"
                        @click="handleViewClick(item)"
                      />
                    </div>
                  </q-img>
                </div>

                <q-card-section class="q-pa-md">
                  <!-- Header del item -->
                  <div class="item-header q-mb-sm">
                    <div class="text-h6 text-brown-7">{{ item.name || item.title }}</div>
                  </div>
                  
                  <!-- Rating -->
                  <div v-if="showRating" class="item-rating q-mb-sm">
                    <q-icon 
                      v-for="star in (item.rating || 5)" 
                      :key="star"
                      name="star" 
                      color="amber" 
                      size="sm"
                    />
                  </div>
                  
                  <!-- Descripción -->
                  <div v-if="item.description" class="text-body2 text-grey-6 q-mb-md">
                    {{ item.description }}
                  </div>
                  
                  <!-- Info adicional (capacidad, tamaño, etc.) -->
                  <div v-if="item.capacity || item.size" class="row q-gutter-sm q-mb-md">
                    <div v-if="item.capacity" class="col-auto">
                      <q-icon name="people" color="grey-6" size="sm" class="q-mr-xs" />
                      <span class="text-caption text-grey-6">{{ item.capacity }} huéspedes</span>
                    </div>
                    <div v-if="item.size" class="col-auto">
                      <q-icon name="square_foot" color="grey-6" size="sm" class="q-mr-xs" />
                      <span class="text-caption text-grey-6">{{ item.size }}</span>
                    </div>
                  </div>

                  <!-- Amenidades -->
                  <div v-if="item.amenities" class="q-mb-md">
                    <div class="text-caption text-grey-8 q-mb-xs">{{ amenitiesLabel }}</div>
                    <div>
                      <q-chip 
                        v-for="amenity in item.amenities.slice(0, amenitiesLimit)" 
                        :key="amenity"
                        size="sm"
                        color="brown-1"
                        text-color="brown-7"
                        :label="amenity"
                        class="q-mr-xs q-mb-xs"
                      />
                      <q-chip 
                        v-if="item.amenities.length > amenitiesLimit"
                        size="sm"
                        color="grey-3"
                        text-color="grey-7"
                        :label="`+${item.amenities.length - amenitiesLimit} más`"
                      />
                    </div>
                  </div>

                  <!-- Features generales -->
                  <div v-if="item.features && !item.amenities" class="q-mb-md">
                    <q-chip 
                      v-for="feature in item.features.slice(0, 3)" 
                      :key="feature"
                      size="sm"
                      :color="item.color || 'brown-1'"
                      :text-color="getTextColor(item.color)"
                      :label="feature"
                      class="q-mr-xs q-mb-xs"
                    />
                  </div>

                  <!-- Precio -->
                  <div v-if="item.price" class="price-section q-mb-md">
                    <div class="text-h5 text-brown-7 text-weight-bold">{{ item.price }}</div>
                    <div class="text-caption text-grey-6">{{ priceLabel }}</div>
                  </div>
                </q-card-section>

                <!-- Acciones -->
                <q-card-actions align="between" class="q-pa-md">
                  <BaseButton
                    flat
                    color="brown-7"
                    :label="detailsButtonText"
                    size="sm"
                    @click="handleDetailsClick(item)"
                  />
                  <BaseButton
                    color="brown-7"
                    :label="actionButtonText"
                    :to="item.actionRoute || defaultActionRoute"
                    unelevated
                    size="sm"
                    @click="handleActionClick(item)"
                  />
                </q-card-actions>
              </q-card>
            </slot>
          </div>
        </div>
      </div>

      <!-- Flecha derecha -->
      <BaseButton
        round
        color="white"
        text-color="brown-7"
        icon="chevron_right"
        size="md"
        variant="secondary"
        :class="['carousel-arrow', 'carousel-arrow-right']"
        :disable="scrollPosition >= maxScroll"
        @click="scrollRight"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  // Datos
  items: {
    type: Array,
    required: true
  },
  
  // Configuración del carrusel
  cardWidth: {
    type: String,
    default: '400px'
  },
  scrollAmount: {
    type: Number,
    default: 320
  },
  
  // Títulos
  title: String,
  subtitle: String,
  titleClass: {
    type: String,
    default: 'text-orange'
  },
  subtitleClass: {
    type: String,
    default: 'text-grey-6'
  },
  
  // Configuración de items
  imageHeight: {
    type: String,
    default: '180px'
  },
  showRating: {
    type: Boolean,
    default: true
  },
  amenitiesLabel: {
    type: String,
    default: 'Amenidades'
  },
  amenitiesLimit: {
    type: Number,
    default: 2
  },
  priceLabel: {
    type: String,
    default: '/noche'
  },
  
  // Textos de botones
  detailsButtonText: {
    type: String,
    default: 'Ver Detalles'
  },
  actionButtonText: {
    type: String,
    default: 'Reservar'
  },
  defaultActionRoute: {
    type: String,
    default: '/Contacto'
  },
  
  // Best seller
  bestSellerId: [String, Number]
})

const emit = defineEmits(['item-click', 'details-click', 'action-click', 'view-click'])

const scrollContainer = ref(null)
const scrollPosition = ref(0)
const maxScroll = ref(0)

// Funciones de scroll
const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      left: scrollContainer.value.scrollLeft - props.scrollAmount,
      behavior: 'smooth'
    })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({
      left: scrollContainer.value.scrollLeft + props.scrollAmount,
      behavior: 'smooth'
    })
  }
}

const updateScrollPosition = () => {
  if (scrollContainer.value) {
    scrollPosition.value = scrollContainer.value.scrollLeft
    maxScroll.value = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth
  }
}

// Event handlers
const handleItemClick = (item) => {
  emit('item-click', item)
}

const handleDetailsClick = (item) => {
  emit('details-click', item)
}

const handleActionClick = (item) => {
  emit('action-click', item)
}

const handleViewClick = (item) => {
  emit('view-click', item)
}

// Utility functions
const getTextColor = (color) => {
  if (!color) return 'brown-7'
  if (color.includes('dark') || color.includes('black')) return 'white'
  return color.includes('light') ? 'grey-8' : 'white'
}

// Lifecycle
onMounted(async () => {
  await nextTick()
  updateScrollPosition()
})

// Métodos públicos
const scrollToItem = (index) => {
  if (scrollContainer.value) {
    const itemWidth = parseInt(props.cardWidth) + 20 // +20 para el gap
    scrollContainer.value.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    })
  }
}

defineExpose({
  scrollToItem,
  scrollLeft,
  scrollRight
})
</script>

<style scoped>
/* Contenedor principal */
.horizontal-carousel-section {
  width: 100%;
}

/* Wrapper del carrusel */
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
  flex: 0 0 auto;
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

/* Tarjetas por defecto */
.default-item-card {
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.default-item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Contenedor de imagen */
.item-image-container {
  position: relative;
  overflow: hidden;
}

.item-image {
  transition: transform 0.4s ease;
}

.default-item-card:hover .item-image {
  transform: scale(1.05);
}

/* Badge de best seller */
.best-seller-badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

/* Header del item */
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Rating */
.item-rating {
  display: flex;
  gap: 2px;
}

/* Sección de precio */
.price-section {
  text-align: left;
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-arrow {
    width: 40px;
    height: 40px;
  }
  
  .card-item {
    flex: 0 0 250px;
  }
  
  .horizontal-scroll-container {
    margin: 0 10px;
  }
}

@media (max-width: 480px) {
  .card-item {
    flex: 0 0 280px;
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
.default-item-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Efectos especiales */
.default-item-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
  z-index: 1;
  pointer-events: none;
}

.default-item-card:hover::before {
  left: 100%;
}
</style>