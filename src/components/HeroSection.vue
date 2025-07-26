<template>
  <section class="hero-section q-pa-sm overflow-hidden" :style="heroStyle">
    <div class="hero-content text-center q-pa-xl" :class="contentClass">
      <!-- Badge opcional -->
      <div v-if="badge" class="hero-badge q-mb-md">
        <q-chip 
          :icon="badge.icon" 
          :color="badge.color" 
          text-color="white" 
          :label="badge.label" 
        />
      </div>
      
      <!-- Título principal -->
      <h1 class="hero-title text-h2 text-orange q-mb-md" :class="titleClass">
        {{ title }}
      </h1>
      
      <!-- Subtítulo -->
      <p v-if="subtitle" class="hero-subtitle text-h6 text-white-6 q-mb-xl" :class="subtitleClass">
        {{ subtitle }}
      </p>
      
      <!-- Acciones/Botones -->
      <div v-if="actions && actions.length" class="hero-actions">
        <BaseButton
          v-for="(action, index) in actions"
          :key="index"
          :variant="action.variant || 'hero-primary'"
          :color="action.color"
          :label="action.label"
          :to="action.to"
          :href="action.href"
          :icon="action.icon"
          :size="action.size || 'lg'"
          :outline="action.outline"
          :class="['q-mb-sm', index === 0 ? 'q-mr-md' : '']"
          @click="handleActionClick(action, index)"
        />
      </div>
      
      <!-- Contenido personalizado via slots -->
      <div v-if="$slots.default" class="hero-custom-content">
        <slot />
      </div>
      
      <!-- Información adicional -->
      <div v-if="$slots.additional" class="hero-additional q-mt-lg">
        <slot name="additional" />
      </div>
    </div>
    
    <!-- Overlay personalizable -->
    <div v-if="overlay" class="hero-overlay" :style="overlayStyle"></div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  // Contenido principal
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  
  // Badge
  badge: {
    type: Object,
    validator: (badge) => {
      return !badge || (badge.label && badge.icon && badge.color)
    }
  },
  
  // Imagen de fondo
  backgroundImage: String,
  backgroundPosition: {
    type: String,
    default: 'center'
  },
  backgroundSize: {
    type: String,
    default: 'cover'
  },
  
  // Overlay
  overlay: {
    type: Boolean,
    default: true
  },
  overlayColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.644)'
  },
  
  // Altura
  height: {
    type: String,
    default: '94vh'
  },
  
  // Acciones/Botones
  actions: {
    type: Array,
    default: () => []
  },
  
  // Estilos personalizados
  contentClass: String,
  titleClass: String,
  subtitleClass: String,
  
  // Tema
  theme: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'dark', 'light', 'brand'
    ].includes(value)
  }
})

const emit = defineEmits(['action-click'])

// Estilo del hero
const heroStyle = computed(() => {
  const styles = {
    display: 'flex',
    height: props.height,
    backgroundSize: props.backgroundSize,
    backgroundPosition: props.backgroundPosition
  }
  
  if (props.backgroundImage) {
    styles.backgroundImage = `url("${props.backgroundImage}")`
  }
  
  return styles
})

// Estilo del overlay
const overlayStyle = computed(() => {
  if (!props.overlay) return {}
  
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: props.overlayColor,
    zIndex: 1
  }
})

// Manejar click en acciones
const handleActionClick = (action, index) => {
  emit('action-click', { action, index })
  
  if (action.click && typeof action.click === 'function') {
    action.click()
  }
}

// Configuraciones de tema
const themeConfig = {
  default: {
    contentBackground: 'rgba(0, 0, 0, 0.644)',
    borderRadius: '30px'
  },
  dark: {
    contentBackground: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '20px'
  },
  light: {
    contentBackground: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '25px'
  },
  brand: {
    contentBackground: 'linear-gradient(135deg, rgba(141, 69, 19, 0.9), rgba(160, 82, 45, 0.8))',
    borderRadius: '35px'
  }
}

const contentStyle = computed(() => {
  const config = themeConfig[props.theme] || themeConfig.default
  
  return {
    background: config.contentBackground,
    borderRadius: config.borderRadius
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  max-width: 800px;
  margin: auto;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-badge {
  margin-bottom: 2rem;
  z-index: 3;
}

.hero-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-weight: 700;
  letter-spacing: -0.02em;
  z-index: 3;
}

.hero-subtitle {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: 400;
  line-height: 1.4;
  z-index: 3;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  z-index: 3;
}

.hero-custom-content,
.hero-additional {
  z-index: 3;
  position: relative;
}

.hero-overlay {
  pointer-events: none;
}

/* Animaciones de entrada */
.hero-content {
  animation: heroFadeIn 1s ease-out;
}

.hero-title {
  animation: heroSlideDown 0.8s ease-out 0.2s both;
}

.hero-subtitle {
  animation: heroSlideDown 0.8s ease-out 0.4s both;
}

.hero-actions {
  animation: heroSlideUp 0.8s ease-out 0.6s both;
}

@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes heroSlideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efectos de hover en el contenido */
.hero-content:hover {
  backdrop-filter: blur(8px);
  transition: backdrop-filter 0.3s ease;
}

/* Parallax suave */
.hero-section {
  background-attachment: fixed;
}

@media (max-width: 768px) {
  /* Desactivar parallax en móviles */
  .hero-section {
    background-attachment: scroll;
  }
  
  .hero-content {
    padding: 1.5rem;
    max-width: 95%;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .q-btn {
    width: 200px;
    margin: 0.25rem 0;
  }
}

@media (max-width: 480px) {
  .hero-content {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
}

/* Temas específicos */
.hero-section.theme-light .hero-title {
  color: #333 !important;
}

.hero-section.theme-light .hero-subtitle {
  color: #666 !important;
}

.hero-section.theme-dark .hero-content {
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-section.theme-brand .hero-title {
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Overflow hidden para prevenir scroll horizontal */
.overflow-hidden {
  overflow-x: hidden;
}

/* Asegurar que el hero section tome todo el ancho */
.hero-section {
  width: 100%;
  min-width: 100%;
}
</style>