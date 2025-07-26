<template>
  <div class="carousel-section" :class="sectionClass">
    <!-- Título opcional -->
    <div v-if="title || subtitle" class="text-center q-mb-xl">
      <h2 v-if="title" class="text-h3" :class="titleClass">{{ title }}</h2>
      <p v-if="subtitle" class="text-h6" :class="subtitleClass">{{ subtitle }}</p>
    </div>

    <div class="carousel-container" :style="containerStyle">
      <q-carousel 
        ref="carousel" 
        v-model="currentSlide" 
        animated 
        arrows 
        navigation 
        infinite 
        :autoplay="autoplay"
        :autoplay-delay="autoplayDelay" 
        :height="height" 
        :class="carouselClass"
      >
        <q-carousel-slide 
          v-for="(item, index) in items" 
          :key="item.id || index" 
          :name="item.id || index"
          class="carousel-slide flex flex-center"
        >
          <div class="fit flex flex-center">
            <q-card class="feature-card-carousel text-center" flat>
              <q-card-section class="q-pa-s">
                <!-- Icono -->
                <q-icon 
                  v-if="item.icon" 
                  :name="item.icon" 
                  size="4.5rem" 
                  :color="item.color || defaultColor" 
                  class="q-mb-lg" 
                />
                
                <!-- Imagen -->
                <div v-else-if="item.image" class="q-mb-lg">
                  <q-img 
                    :src="item.image" 
                    :height="imageHeight"
                    :width="imageWidth"
                    class="rounded-borders"
                  />
                </div>
                
                <!-- Título -->
                <h3 v-if="item.title || item.name" class="text-h4 text-grey-8 q-mb-md">
                  {{ item.title || item.name }}
                </h3>
                
                <!-- Descripción -->
                <p v-if="item.description" class="text-h6 text-grey-6 q-mb-lg" 
                   style="max-width: 450px; margin: 0 auto;">
                  {{ item.description }}
                </p>
                
                <!-- Información adicional -->
                <div v-if="item.info || item.hours" class="text-subtitle2 text-grey-7 q-mb-sm">
                  {{ item.info || item.hours }}
                </div>
                
                <!-- Features/Details -->
                <div v-if="item.features || item.details" class="item-details q-mb-lg">
                  <q-chip 
                    v-for="feature in (item.features || item.details)" 
                    :key="feature"
                    :color="item.color || defaultColor" 
                    text-color="white" 
                    size="sm" 
                    :label="feature" 
                    class="q-mr-xs q-mb-xs" 
                  />
                </div>
                
                <!-- Amenidades (para habitaciones) -->
                <div v-if="item.amenities" class="q-mb-md">
                  <div class="text-caption text-grey-8 q-mb-xs">Amenidades</div>
                  <div>
                    <q-chip 
                      v-for="amenity in item.amenities.slice(0, 2)" 
                      :key="amenity"
                      size="sm"
                      color="brown-1"
                      text-color="brown-7"
                      :label="amenity"
                      class="q-mr-xs q-mb-xs"
                    />
                    <q-chip 
                      v-if="item.amenities.length > 2"
                      size="sm"
                      color="grey-3"
                      text-color="grey-7"
                      :label="`+${item.amenities.length - 2} más`"
                    />
                  </div>
                </div>
                
                <!-- Precio -->
                <div v-if="item.price" class="price-section q-mb-md">
                  <div class="text-h5 text-brown-7 text-weight-bold">{{ item.price }}</div>
                  <div class="text-caption text-grey-6">/noche</div>
                </div>
                
                <!-- Botón de acción -->
                <BaseButton
                  v-if="item.buttonText || item.action"
                  :variant="buttonVariant"
                  :color="item.color || defaultColor"
                  :label="item.buttonText || defaultButtonText"
                  :to="item.route || item.to || defaultRoute"
                  @click="handleItemAction(item)"
                  class="q-mt-md q-px-lg"
                  size="lg"
                  unelevated
                />
              </q-card-section>
            </q-card>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  // Datos
  items: {
    type: Array,
    required: true
  },
  
  // Configuración del carrusel
  autoplay: {
    type: Boolean,
    default: true
  },
  autoplayDelay: {
    type: Number,
    default: 4000
  },
  height: {
    type: String,
    default: '500px'
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
  
  // Estilos
  theme: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'dark', 'light'].includes(value)
  },
  sectionClass: String,
  containerStyle: [String, Object],
  
  // Configuración de elementos
  defaultColor: {
    type: String,
    default: 'brown-7'
  },
  defaultRoute: {
    type: String,
    default: '/Contacto'
  },
  defaultButtonText: {
    type: String,
    default: 'Ver más'
  },
  buttonVariant: {
    type: String,
    default: 'primary'
  },
  
  // Imágenes
  imageHeight: {
    type: String,
    default: '200px'
  },
  imageWidth: {
    type: String,
    default: '300px'
  }
})

const emit = defineEmits(['item-click', 'slide-change'])

const currentSlide = ref(props.items[0]?.id || 0)
const carousel = ref(null)

const carouselClass = computed(() => {
  const baseClass = 'features-carousel'
  const themeClass = props.theme === 'dark' ? 'carousel-dark' : 
                     props.theme === 'light' ? 'carousel-light' : ''
  return `${baseClass} ${themeClass}`.trim()
})

const handleItemAction = (item) => {
  emit('item-click', item)
  if (item.action && typeof item.action === 'function') {
    item.action()
  }
}

// Método para navegar a slide específico
const goToSlide = (slideId) => {
  currentSlide.value = slideId
}

// Exponer métodos públicos
defineExpose({
  goToSlide,
  carousel
})
</script>

<style scoped>
/* Contenedor principal */
.carousel-section {
  padding: 0;
}

/* Contenedor del carrusel */
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

/* Tarjeta principal */
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

/* Detalles de elementos */
.item-details {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}

/* Precio */
.price-section {
  text-align: center;
}

/* Navegación del carrusel */
.features-carousel :deep(.q-carousel__navigation) {
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.features-carousel :deep(.q-carousel__navigation .q-btn) {
  background: rgba(255, 255, 255, 0.4);
  color: white;
  margin: 0 6px;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.features-carousel :deep(.q-carousel__navigation .q-btn--active) {
  background: #8D4513;
  color: white;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(141, 69, 19, 0.5);
}

.features-carousel :deep(.q-carousel__navigation .q-btn:hover) {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

/* Flechas del carrusel */
.features-carousel :deep(.q-carousel__arrow) {
  background: rgba(255, 255, 255, 0.95);
  color: #8D4513;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
}

.features-carousel :deep(.q-carousel__arrow:hover) {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  border-color: #8D4513;
}

/* Temas */
.carousel-dark {
  background: #1a1a1a;
}

.carousel-light {
  background: #f5f5f5;
}

/* Responsive */
@media (max-width: 768px) {
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

  .features-carousel :deep(.q-carousel__arrow) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .features-carousel :deep(.q-carousel__navigation .q-btn) {
    min-width: 8px;
    min-height: 8px;
    margin: 0 3px;
  }

  .item-details {
    justify-content: center;
  }
}
</style>