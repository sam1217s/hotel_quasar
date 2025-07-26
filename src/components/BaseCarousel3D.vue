<template>
  <section class="carousel-3d-section" :class="sectionClass">
    <!-- Título opcional -->
    <div v-if="title || subtitle" class="text-center q-mb-xl">
      <h2 v-if="title" class="text-h3" :class="titleClass">{{ title }}</h2>
      <p v-if="subtitle" class="text-h6" :class="subtitleClass">{{ subtitle }}</p>
    </div>

    <div class="carousel-3d-container" :style="containerStyle">
      <div class="carousel-3d" ref="carousel3d">
        <div 
          v-for="(item, index) in items" 
          :key="item.id || index" 
          class="carousel-3d-item"
          :style="getItemTransform(index)"
          @click="handleItemClick(item, index)"
        >
          <q-card class="highlight-3d-card cursor-pointer" :class="cardClass">
            <!-- Imagen -->
            <q-img 
              v-if="item.image" 
              :src="item.image" 
              :height="imageHeight" 
              class="highlight-image" 
            />
            
            <!-- Contenido personalizado via slot -->
            <div v-else-if="$slots.item" class="custom-content">
              <slot name="item" :item="item" :index="index" />
            </div>
            
            <!-- Contenido por defecto -->
            <div v-else class="default-content" :style="`height: ${imageHeight}`">
              <q-icon 
                v-if="item.icon" 
                :name="item.icon" 
                size="4rem" 
                :color="item.color || defaultColor" 
              />
              <div v-else class="placeholder-content">
                <div class="text-h4 text-grey-4">{{ item.title || 'Item' }}</div>
              </div>
            </div>
            
            <q-card-section class="text-center q-pa-md">
              <div class="text-h6 text-grey-8 text-weight-medium">
                {{ item.title || item.name }}
              </div>
              <div v-if="item.description" class="text-body2 text-grey-6 q-mt-xs">
                {{ item.description }}
              </div>
              <q-icon 
                name="touch_app" 
                size="sm" 
                :color="clickIndicatorColor" 
                class="click-indicator q-mt-xs" 
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  // Datos
  items: {
    type: Array,
    required: true
  },
  
  // Configuración de animación
  autoRotate: {
    type: Boolean,
    default: true
  },
  rotationSpeed: {
    type: Number,
    default: 0.1
  },
  
  // Títulos
  title: String,
  subtitle: String,
  titleClass: {
    type: String,
    default: 'text-orange-8'
  },
  subtitleClass: {
    type: String,
    default: 'text-white-3'
  },
  
  // Estilos
  sectionClass: {
    type: String,
    default: 'q-pa-xl bg-black-6'
  },
  containerStyle: [String, Object],
  cardClass: String,
  
  // Configuración visual
  imageHeight: {
    type: String,
    default: '180px'
  },
  defaultColor: {
    type: String,
    default: 'brown-7'
  },
  clickIndicatorColor: {
    type: String,
    default: 'brown-7'
  },
  
  // Configuración 3D
  radius: {
    type: Number,
    default: 450
  },
  itemWidth: {
    type: String,
    default: '240px'
  },
  itemHeight: {
    type: String,
    default: '300px'
  }
})

const emit = defineEmits(['item-click'])

const carousel3d = ref(null)
let rotation = 0
let animationId = null

// Calcular transformación para cada item
const getItemTransform = (index) => {
  const angle = (index * 360) / props.items.length
  return {
    transform: `rotateY(${angle}deg) translateZ(${props.radius}px)`,
    width: props.itemWidth,
    height: props.itemHeight
  }
}

// Manejar click en item
const handleItemClick = (item, index) => {
  emit('item-click', { item, index })
  
  // Ejecutar acción personalizada si existe
  if (item.action && typeof item.action === 'function') {
    item.action()
  }
}

// Animación del carrusel
const animate3DCarousel = () => {
  if (!props.autoRotate) return
  
  rotation += props.rotationSpeed
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
  animationId = requestAnimationFrame(animate3DCarousel)
}

// Métodos públicos
const startAnimation = () => {
  if (!animationId && props.autoRotate) {
    animate3DCarousel()
  }
}

const stopAnimation = () => {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

const setRotation = (degrees) => {
  rotation = degrees
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
}

// Lifecycle
onMounted(() => {
  if (props.autoRotate) {
    animate3DCarousel()
  }
})

onUnmounted(() => {
  stopAnimation()
})

// Exponer métodos públicos
defineExpose({
  startAnimation,
  stopAnimation,
  setRotation
})
</script>

<style scoped>
/* Contenedor principal del carrusel 3D */
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
  left: 80px;
  top: 25px;
  transform-origin: center;
  backface-visibility: hidden;
}

/* Tarjetas 3D */
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

/* Imagen dentro de la tarjeta */
.highlight-image {
  transition: transform 0.3s ease;
}

.highlight-3d-card:hover .highlight-image {
  transform: scale(1.05);
}

/* Contenido personalizado y por defecto */
.custom-content, 
.default-content {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.placeholder-content {
  text-align: center;
}

/* Efecto de brillo en hover */
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

/* Indicador de click */
.click-indicator {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.highlight-3d-card:hover .click-indicator {
  opacity: 1;
  transform: scale(1.2);
}

/* Variantes de color para diferentes temas */
.carousel-3d-section.theme-blue .carousel-3d-container {
  background: radial-gradient(ellipse at center, rgba(25, 118, 210, 0.1) 0%, transparent 70%);
}

.carousel-3d-section.theme-blue .highlight-3d-card {
  border-color: rgba(25, 118, 210, 0.2);
}

.carousel-3d-section.theme-blue .highlight-3d-card:hover {
  border-color: rgba(25, 118, 210, 0.6);
}

.carousel-3d-section.theme-teal .carousel-3d-container {
  background: radial-gradient(ellipse at center, rgba(38, 166, 154, 0.1) 0%, transparent 70%);
}

.carousel-3d-section.theme-teal .highlight-3d-card {
  border-color: rgba(38, 166, 154, 0.2);
}

.carousel-3d-section.theme-teal .highlight-3d-card:hover {
  border-color: rgba(38, 166, 154, 0.6);
}

.carousel-3d-section.theme-orange .carousel-3d-container {
  background: radial-gradient(ellipse at center, rgba(255, 87, 34, 0.1) 0%, transparent 70%);
}

.carousel-3d-section.theme-orange .highlight-3d-card {
  border-color: rgba(255, 87, 34, 0.2);
}

.carousel-3d-section.theme-orange .highlight-3d-card:hover {
  border-color: rgba(255, 87, 34, 0.6);
}

.carousel-3d-section.theme-amber .carousel-3d-container {
  background: radial-gradient(ellipse at center, rgba(255, 193, 7, 0.1) 0%, transparent 70%);
}

.carousel-3d-section.theme-amber .highlight-3d-card {
  border-color: rgba(255, 193, 7, 0.2);
}

.carousel-3d-section.theme-amber .highlight-3d-card:hover {
  border-color: rgba(255, 193, 7, 0.6);
}

/* Responsive */
@media (max-width: 768px) {
  .carousel-3d-container {
    height: 350px;
  }
  
  .carousel-3d {
    width: 300px;
    height: 280px;
  }
  
  .carousel-3d-item {
    width: 200px !important;
    height: 250px !important;
    left: 50px;
    top: 15px;
  }
}

@media (max-width: 480px) {
  .carousel-3d-container {
    height: 300px;
  }
  
  .carousel-3d {
    width: 250px;
    height: 230px;
  }
  
  .carousel-3d-item {
    width: 160px !important;
    height: 200px !important;
    left: 45px;
    top: 15px;
  }
}
</style>