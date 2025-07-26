<template>
  <q-card 
    :class="[
      'info-card',
      `info-card--${variant}`,
      customClass,
      { 'info-card--clickable': clickable },
      { 'info-card--dark': dark }
    ]" 
    :flat="flat"
    :bordered="bordered"
    @click="handleClick"
  >
    <!-- Imagen superior opcional -->
    <q-img 
      v-if="image" 
      :src="image" 
      :height="imageHeight"
      :class="imageClass"
    >
      <!-- Badge sobre la imagen -->
      <div v-if="badge" class="absolute-top-left q-pa-md">
        <q-badge 
          :color="badge.color" 
          :text-color="badge.textColor || 'white'" 
          :label="badge.label"
        />
      </div>
      
      <!-- Acciones sobre la imagen -->
      <div v-if="imageActions" class="absolute-top-right q-pa-md">
        <BaseButton
          v-for="(action, index) in imageActions"
          :key="index"
          round
          :color="action.color || 'white'"
          :text-color="action.textColor || 'grey-8'"
          :icon="action.icon"
          size="sm"
          :class="['q-ml-xs']"
          @click.stop="handleImageAction(action, index)"
        />
      </div>
    </q-img>

    <q-card-section :class="['q-pa-lg', sectionClass]">
      <!-- Icono principal -->
      <div v-if="icon" class="info-card__icon text-center q-mb-md">
        <q-icon 
          :name="icon" 
          :size="iconSize" 
          :color="iconColor" 
        />
      </div>

      <!-- Header con título y subtítulo -->
      <div class="info-card__header q-mb-sm">
        <div v-if="title" class="info-card__title" :class="titleClass">
          {{ title }}
        </div>
        <div v-if="subtitle" class="info-card__subtitle" :class="subtitleClass">
          {{ subtitle }}
        </div>
      </div>

      <!-- Descripción principal -->
      <div v-if="description" class="info-card__description q-mb-md" :class="descriptionClass">
        {{ description }}
      </div>

      <!-- Contenido personalizado via slots -->
      <div v-if="$slots.default" class="info-card__content">
        <slot />
      </div>

      <!-- Lista de features/características -->
      <div v-if="features && features.length" class="info-card__features q-mb-md">
        <div v-if="featuresTitle" class="text-caption text-grey-8 q-mb-xs">
          {{ featuresTitle }}
        </div>
        <div class="features-grid">
          <q-chip 
            v-for="feature in displayedFeatures" 
            :key="feature"
            :size="featuresSize"
            :color="featuresColor"
            :text-color="featuresTextColor"
            :label="feature"
            class="q-mr-xs q-mb-xs"
          />
          <q-chip 
            v-if="hasMoreFeatures"
            :size="featuresSize"
            color="grey-3"
            text-color="grey-7"
            :label="`+${features.length - featuresLimit} más`"
          />
        </div>
      </div>

      <!-- Información adicional en filas -->
      <div v-if="info && info.length" class="info-card__info q-mb-md">
        <div 
          v-for="item in info" 
          :key="item.label"
          class="info-row q-mb-sm"
        >
          <q-icon 
            v-if="item.icon" 
            :name="item.icon" 
            :color="item.iconColor || 'grey-6'" 
            size="sm" 
            class="q-mr-xs" 
          />
          <span class="text-caption text-grey-6">{{ item.label }}: </span>
          <span class="text-body2 text-grey-8">{{ item.value }}</span>
        </div>
      </div>

      <!-- Precio o valor destacado -->
      <div v-if="price || highlightedValue" class="info-card__highlight q-mb-md">
        <div class="text-h5 text-weight-bold" :class="highlightedClass">
          {{ price || highlightedValue }}
        </div>
        <div v-if="priceLabel" class="text-caption text-grey-6">
          {{ priceLabel }}
        </div>
      </div>

      <!-- Rating opcional -->
      <div v-if="rating" class="info-card__rating q-mb-md">
        <q-icon 
          v-for="star in 5" 
          :key="star"
          name="star" 
          :color="star <= rating ? 'amber' : 'grey-4'" 
          size="sm"
        />
        <span v-if="ratingText" class="text-caption text-grey-6 q-ml-sm">
          {{ ratingText }}
        </span>
      </div>

      <!-- Contenido adicional -->
      <div v-if="$slots.additional" class="info-card__additional">
        <slot name="additional" />
      </div>
    </q-card-section>

    <!-- Acciones/Botones en el footer -->
    <q-card-actions 
      v-if="actions && actions.length" 
      :align="actionsAlign" 
      class="q-pa-md"
    >
      <BaseButton
        v-for="(action, index) in actions"
        :key="index"
        :variant="action.variant || 'primary'"
        :color="action.color"
        :label="action.label"
        :icon="action.icon"
        :to="action.to"
        :href="action.href"
        :size="action.size || 'sm'"
        :flat="action.flat"
        :outline="action.outline"
        :unelevated="action.unelevated"
        @click="handleActionClick(action, index)"
      />
    </q-card-actions>

    <!-- Footer personalizado -->
    <div v-if="$slots.footer" class="info-card__footer">
      <slot name="footer" />
    </div>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  // Contenido principal
  title: String,
  subtitle: String,
  description: String,
  
  // Visual
  image: String,
  imageHeight: {
    type: String,
    default: '200px'
  },
  imageClass: String,
  icon: String,
  iconSize: {
    type: String,
    default: '3rem'
  },
  iconColor: {
    type: String,
    default: 'brown-7'
  },
  
  // Badge sobre imagen
  badge: Object,
  
  // Acciones sobre imagen
  imageActions: Array,
  
  // Variante de tarjeta
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'feature', 'service', 'product', 'profile', 'stat'
    ].includes(value)
  },
  
  // Estilos de Quasar
  flat: Boolean,
  bordered: {
    type: Boolean,
    default: true
  },
  dark: Boolean,
  
  // Interactividad
  clickable: Boolean,
  
  // Features/Características
  features: Array,
  featuresTitle: String,
  featuresLimit: {
    type: Number,
    default: 3
  },
  featuresSize: {
    type: String,
    default: 'sm'
  },
  featuresColor: {
    type: String,
    default: 'brown-1'
  },
  featuresTextColor: {
    type: String,
    default: 'brown-7'
  },
  
  // Información adicional
  info: Array, // [{ label: '', value: '', icon: '', iconColor: '' }]
  
  // Precio/Valor destacado
  price: String,
  priceLabel: String,
  highlightedValue: String,
  highlightedClass: {
    type: String,
    default: 'text-brown-7'
  },
  
  // Rating
  rating: Number,
  ratingText: String,
  
  // Acciones
  actions: Array,
  actionsAlign: {
    type: String,
    default: 'between'
  },
  
  // Clases personalizadas
  customClass: [String, Array, Object],
  sectionClass: String,
  titleClass: {
    type: String,
    default: 'text-h6 text-grey-8'
  },
  subtitleClass: {
    type: String,
    default: 'text-subtitle2 text-grey-6'
  },
  descriptionClass: {
    type: String,
    default: 'text-body2 text-grey-6'
  }
})

const emit = defineEmits(['click', 'action-click', 'image-action-click'])

// Computed
const displayedFeatures = computed(() => {
  if (!props.features) return []
  return props.features.slice(0, props.featuresLimit)
})

const hasMoreFeatures = computed(() => {
  return props.features && props.features.length > props.featuresLimit
})

// Event handlers
const handleClick = () => {
  if (props.clickable) {
    emit('click')
  }
}

const handleActionClick = (action, index) => {
  emit('action-click', { action, index })
  if (action.click && typeof action.click === 'function') {
    action.click()
  }
}

const handleImageAction = (action, index) => {
  emit('image-action-click', { action, index })
  if (action.click && typeof action.click === 'function') {
    action.click()
  }
}
</script>

<style scoped>
.info-card {
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.info-card--clickable {
  cursor: pointer;
}

.info-card--clickable:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Variantes de tarjeta */
.info-card--feature {
  border-radius: 12px;
  overflow: hidden;
}

.info-card--service {
  border-left: 4px solid #8D4513;
}

.info-card--product {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

.info-card--profile .info-card__icon {
  border-radius: 50%;
  background: rgba(141, 69, 19, 0.1);
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.info-card--stat {
  text-align: center;
  background: linear-gradient(135deg, rgba(141, 69, 19, 0.05), rgba(160, 82, 45, 0.03));
}

/* Elementos internos */
.info-card__icon {
  margin-bottom: 1rem;
}

.info-card__header {
  margin-bottom: 0.5rem;
}

.info-card__title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.info-card__subtitle {
  font-weight: 400;
}

.info-card__description {
  line-height: 1.5;
}

.info-card__features {
  margin-bottom: 1rem;
}

.features-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.info-card__info {
  margin-bottom: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.info-card__highlight {
  text-align: center;
  padding: 0.5rem;
  background: rgba(141, 69, 19, 0.05);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.info-card__rating {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

/* Tema oscuro */
.info-card--dark {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
}

.info-card--dark:hover {
  background: rgba(255, 255, 255, 0.15);
}

.info-card--dark .info-card__title {
  color: white;
}

.info-card--dark .info-card__subtitle {
  color: rgba(255, 255, 255, 0.7);
}

.info-card--dark .info-card__description {
  color: rgba(255, 255, 255, 0.8);
}

/* Efectos especiales */
.info-card::before {
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

.info-card:hover::before {
  left: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .info-card__icon {
    margin-bottom: 0.75rem;
  }
  
  .info-card__title {
    font-size: 1.1rem;
  }
  
  .info-card__description {
    font-size: 0.9rem;
  }
  
  .features-grid {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .info-card {
    margin-bottom: 1rem;
  }
  
  .info-card__highlight {
    padding: 0.25rem;
  }
}

/* Animaciones de entrada */
.info-card {
  animation: cardFadeIn 0.6s ease forwards;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estados especiales */
.info-card.loading {
  opacity: 0.6;
  pointer-events: none;
}

.info-card.success {
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.info-card.error {
  border-color: #f44336;
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
}
</style>