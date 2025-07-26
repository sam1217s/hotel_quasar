<template>
  <section class="stats-section text-white q-pa-xl" :class="sectionClass" :style="sectionStyle">
    <!-- Título opcional -->
    <div v-if="title || subtitle" class="text-center q-mb-xl">
      <h2 v-if="title" class="text-h4 text-white q-mb-md">{{ title }}</h2>
      <p v-if="subtitle" class="text-h6 text-grey-4">{{ subtitle }}</p>
    </div>

    <div class="row text-center">
      <div 
        v-for="stat in stats" 
        :key="stat.id || stat.label" 
        class="col-lg-3 col-md-6 col-sm-6 col-xs-12 q-mb-lg"
      >
        <div class="stat-item" :class="itemClass">
          <!-- Icono opcional -->
          <div v-if="stat.icon" class="stat-icon q-mb-sm">
            <q-icon 
              :name="stat.icon" 
              :size="iconSize" 
              :color="stat.iconColor || iconColor" 
            />
          </div>
          
          <!-- Número principal -->
          <div class="stat-number text-h3 text-weight-light q-mb-sm" :class="numberClass">
            {{ stat.number }}
          </div>
          
          <!-- Etiqueta -->
          <div class="stat-label text-body1" :class="labelClass">
            {{ stat.label }}
          </div>
          
          <!-- Descripción adicional opcional -->
          <div v-if="stat.description" class="stat-description text-caption text-grey-4 q-mt-xs">
            {{ stat.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Datos
  stats: {
    type: Array,
    required: true,
    validator: (stats) => {
      return stats.every(stat => 
        (stat.number !== undefined && stat.label !== undefined) ||
        (stat.id !== undefined)
      )
    }
  },
  
  // Títulos
  title: String,
  subtitle: String,
  
  // Tema y estilos
  theme: {
    type: String,
    default: 'brown',
    validator: (value) => [
      'brown', 'blue', 'teal', 'amber', 'orange', 'purple', 'green', 'red'
    ].includes(value)
  },
  customBackground: String,
  sectionClass: String,
  itemClass: String,
  numberClass: String,
  labelClass: String,
  
  // Configuración de iconos
  showIcons: {
    type: Boolean,
    default: false
  },
  iconSize: {
    type: String,
    default: '2rem'
  },
  iconColor: {
    type: String,
    default: 'white'
  },
  
  // Animaciones
  animated: {
    type: Boolean,
    default: true
  }
})

// Configuraciones de tema
const themeConfig = {
  brown: {
    gradient: 'linear-gradient(135deg, #8D4513, #A0522D)',
    primary: '#8D4513',
    secondary: '#A0522D'
  },
  blue: {
    gradient: 'linear-gradient(135deg, #1976d2, #0d47a1)',
    primary: '#1976d2',
    secondary: '#0d47a1'
  },
  teal: {
    gradient: 'linear-gradient(135deg, #26a69a, #004d40)',
    primary: '#26a69a',
    secondary: '#004d40'
  },
  amber: {
    gradient: 'linear-gradient(135deg, #ffc107, #ffb300)',
    primary: '#ffc107',
    secondary: '#ffb300'
  },
  orange: {
    gradient: 'linear-gradient(135deg, #ff5722, #f4511e)',
    primary: '#ff5722',
    secondary: '#f4511e'
  },
  purple: {
    gradient: 'linear-gradient(135deg, #9c27b0, #6a1b9a)',
    primary: '#9c27b0',
    secondary: '#6a1b9a'
  },
  green: {
    gradient: 'linear-gradient(135deg, #4caf50, #2e7d32)',
    primary: '#4caf50',
    secondary: '#2e7d32'
  },
  red: {
    gradient: 'linear-gradient(135deg, #f44336, #c62828)',
    primary: '#f44336',
    secondary: '#c62828'
  }
}

const sectionStyle = computed(() => {
  if (props.customBackground) {
    return { background: props.customBackground }
  }
  
  const config = themeConfig[props.theme]
  return {
    background: config.gradient
  }
})

// Formatear números grandes
const formatNumber = (num) => {
  if (typeof num !== 'string' && typeof num !== 'number') return num
  
  const numStr = num.toString()
  if (numStr.includes('★') || numStr.includes('+') || numStr.includes('/')) {
    return numStr
  }
  
  const number = parseFloat(numStr.replace(/[^\d.-]/g, ''))
  if (isNaN(number)) return numStr
  
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K'
  }
  
  return numStr
}

// Procesar estadísticas con formato
const processedStats = computed(() => {
  return props.stats.map(stat => ({
    ...stat,
    formattedNumber: formatNumber(stat.number)
  }))
})
</script>

<style scoped>
.stats-section {
  position: relative;
  overflow: hidden;
}

.stats-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  z-index: -1;
}

.stat-item {
  padding: 20px;
  transition: transform 0.3s ease;
  position: relative;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-number {
  font-family: 'Arial', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
}

.stat-label {
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.stat-description {
  max-width: 200px;
  margin: 0 auto;
  line-height: 1.4;
}

/* Animación de entrada */
.stats-section.animated .stat-item {
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
}

.stats-section.animated .stat-item:nth-child(1) { animation-delay: 0.1s; }
.stats-section.animated .stat-item:nth-child(2) { animation-delay: 0.2s; }
.stats-section.animated .stat-item:nth-child(3) { animation-delay: 0.3s; }
.stats-section.animated .stat-item:nth-child(4) { animation-delay: 0.4s; }
.stats-section.animated .stat-item:nth-child(5) { animation-delay: 0.5s; }
.stats-section.animated .stat-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efectos de hover para números */
.stat-number:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .stat-item {
    padding: 15px 10px;
  }
  
  .stat-number {
    font-size: 2rem;
  }
  
  .stat-label {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .stat-item {
    padding: 10px 5px;
  }
  
  .stat-number {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.85rem;
  }
}

/* Variaciones de estilo */
.stats-section.style-cards .stat-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 10px;
}

.stats-section.style-cards .stat-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-8px);
}

.stats-section.style-minimal .stat-item {
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0;
}

.stats-section.style-minimal .stat-item:hover {
  border-bottom-color: rgba(255, 255, 255, 0.8);
}
</style>