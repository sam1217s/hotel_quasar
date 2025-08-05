<template>
  <article 
    :class="[
      'info-card',
      `info-card--${variant}`,
      `info-card--${theme}`,
      customClass,
      { 
        'info-card--clickable': clickable,
        'info-card--featured': featured,
        'info-card--loading': loading
      }
    ]" 
    :style="cardStyle"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    
    <!-- Imagen principal con overlay elegante -->
    <div v-if="image" class="info-card__media" :style="{ height: imageHeight }">
      <img 
        :src="image" 
        :alt="imageAlt || title"
        :class="['info-card__image', imageClass]"
        :loading="lazyLoad ? 'lazy' : 'eager'"
      />
      
      <!-- Overlay gradient -->
      <div class="info-card__media-overlay"></div>
      
      <!-- Badge sobre imagen -->
      <div v-if="badge" class="info-card__badge" :class="`badge--${badge.variant || 'default'}`">
        <q-icon v-if="badge.icon" :name="badge.icon" class="badge__icon" />
        <span class="badge__text">{{ badge.label }}</span>
      </div>
      
      <!-- Acciones sobre imagen -->
      <div v-if="imageActions && imageActions.length" class="info-card__media-actions">
        <button
          v-for="(action, index) in imageActions"
          :key="index"
          :class="['media-action', `media-action--${action.variant || 'default'}`]"
          @click.stop="handleImageAction(action, index)"
          :title="action.title"
        >
          <q-icon :name="action.icon" />
        </button>
      </div>
      
      <!-- Indicador de estado -->
      <div v-if="status" class="info-card__status" :class="`status--${status.type}`">
        <div class="status__indicator"></div>
        <span class="status__text">{{ status.text }}</span>
      </div>
    </div>

    <!-- Área de contenido principal -->
    <div class="info-card__content" :class="contentClass">
      
      <!-- Header con icono y título -->
      <header class="info-card__header">
        <!-- Icono principal -->
        <div v-if="icon && !image" class="info-card__icon-container">
          <div class="info-card__icon-wrapper" :style="iconWrapperStyle">
            <q-icon 
              :name="icon" 
              :size="iconSize" 
              :color="iconColor" 
            />
          </div>
        </div>

        <!-- Título y subtítulo -->
        <div class="info-card__title-group">
          <h3 v-if="title" class="info-card__title" :class="titleClass">
            {{ title }}
          </h3>
          <p v-if="subtitle" class="info-card__subtitle" :class="subtitleClass">
            {{ subtitle }}
          </p>
        </div>

        <!-- Rating en el header -->
        <div v-if="rating" class="info-card__rating">
          <div class="rating__stars">
            <q-icon 
              v-for="star in 5" 
              :key="star"
              name="star" 
              :class="[
                'rating__star',
                { 'rating__star--filled': star <= rating }
              ]"
            />
          </div>
          <span v-if="ratingText" class="rating__text">{{ ratingText }}</span>
        </div>
      </header>

      <!-- Descripción principal -->
      <div v-if="description" class="info-card__description">
        <p :class="descriptionClass">{{ description }}</p>
      </div>

      <!-- Contenido personalizado -->
      <div v-if="$slots.default" class="info-card__custom-content">
        <slot />
      </div>

      <!-- Métricas destacadas -->
      <div v-if="metrics && metrics.length" class="info-card__metrics">
        <div 
          v-for="metric in metrics" 
          :key="metric.label"
          class="metric"
        >
          <div class="metric__value" :class="metric.valueClass">
            {{ metric.value }}
          </div>
          <div class="metric__label">{{ metric.label }}</div>
        </div>
      </div>

      <!-- Lista de características -->
      <div v-if="features && features.length" class="info-card__features">
        <div v-if="featuresTitle" class="features__title">
          {{ featuresTitle }}
        </div>
        <div class="features__grid">
          <div 
            v-for="feature in displayedFeatures" 
            :key="feature"
            class="feature-tag"
            :class="featureTagClass"
          >
            {{ feature }}
          </div>
          <div 
            v-if="hasMoreFeatures"
            class="feature-tag feature-tag--more"
            @click="showAllFeatures = !showAllFeatures"
          >
            <span v-if="!showAllFeatures">+{{ features.length - featuresLimit }} más</span>
            <span v-else>Mostrar menos</span>
          </div>
        </div>
      </div>

      <!-- Información adicional en filas -->
      <div v-if="info && info.length" class="info-card__info-list">
        <div 
          v-for="item in info" 
          :key="item.label"
          class="info-item"
        >
          <q-icon 
            v-if="item.icon" 
            :name="item.icon" 
            class="info-item__icon"
            :style="{ color: item.iconColor }"
          />
          <div class="info-item__content">
            <span class="info-item__label">{{ item.label }}</span>
            <span class="info-item__value">{{ item.value }}</span>
          </div>
        </div>
      </div>

      <!-- Precio o valor destacado -->
      <div v-if="price || highlightedValue" class="info-card__price">
        <div class="price__main" :class="highlightedClass">
          {{ price || highlightedValue }}
        </div>
        <div v-if="priceLabel" class="price__label">
          {{ priceLabel }}
        </div>
        <div v-if="originalPrice" class="price__original">
          {{ originalPrice }}
        </div>
      </div>

    </div>

    <!-- Footer con acciones -->
    <footer v-if="actions && actions.length" class="info-card__footer">
      <div class="info-card__actions" :class="`actions--${actionsLayout}`">
        <BaseButton
          v-for="(action, index) in actions"
          :key="index"
          :class="[
            'card-action',
            `card-action--${action.variant || 'default'}`,
            { 'card-action--primary': index === 0 }
          ]"
          :variant="action.variant || (index === 0 ? 'primary' : 'secondary')"
          :color="action.color"
          :size="action.size || 'md'"
          :label="action.label"
          :icon="action.icon"
          :icon-right="action.iconRight"
          :to="action.to"
          :href="action.href"
          :loading="action.loading"
          :disabled="action.disabled"
          @click="handleActionClick(action, index)"
        />
      </div>
    </footer>

    <!-- Slot para footer personalizado -->
    <div v-if="$slots.footer" class="info-card__custom-footer">
      <slot name="footer" />
    </div>

    <!-- Efecto de brillo al hover -->
    <div class="info-card__shine"></div>
    
    <!-- Indicador de carga -->
    <div v-if="loading" class="info-card__loading">
      <div class="loading__spinner"></div>
    </div>

  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  // Contenido principal
  title: String,
  subtitle: String,
  description: String,
  
  // Media
  image: String,
  imageAlt: String,
  imageHeight: {
    type: String,
    default: '200px'
  },
  imageClass: String,
  lazyLoad: {
    type: Boolean,
    default: true
  },
  
  // Icono principal
  icon: String,
  iconSize: {
    type: String,
    default: '2.5rem'
  },
  iconColor: String,
  iconBackground: String,
  
  // Variantes y temas
  variant: {
    type: String,
    default: 'default',
    validator: (value) => [
      'default', 'elevated', 'outlined', 'minimal', 'luxury', 'modern'
    ].includes(value)
  },
  theme: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'dark', 'brand'].includes(value)
  },
  
  // Estados
  clickable: Boolean,
  featured: Boolean,
  loading: Boolean,
  
  // Badge
  badge: Object, // { label, icon, variant }
  
  // Status indicator
  status: Object, // { text, type: 'online'|'offline'|'busy' }
  
  // Acciones sobre imagen
  imageActions: Array,
  
  // Rating
  rating: Number,
  ratingText: String,
  
  // Métricas
  metrics: Array, // [{ label, value, valueClass }]
  
  // Features
  features: Array,
  featuresTitle: String,
  featuresLimit: {
    type: Number,
    default: 4
  },
  featureTagClass: String,
  
  // Información adicional
  info: Array, // [{ label, value, icon, iconColor }]
  
  // Precio
  price: String,
  priceLabel: String,
  originalPrice: String,
  highlightedValue: String,
  highlightedClass: String,
  
  // Acciones
  actions: Array,
  actionsLayout: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical', 'stacked'].includes(value)
  },
  
  // Estilos personalizados
  customClass: String,
  contentClass: String,
  titleClass: String,
  subtitleClass: String,
  descriptionClass: String,
  cardStyle: [String, Object]
})

const emit = defineEmits(['click', 'action-click', 'image-action-click', 'mouse-enter', 'mouse-leave'])

const showAllFeatures = ref(false)

// Computed properties
const displayedFeatures = computed(() => {
  if (!props.features) return []
  if (showAllFeatures.value) return props.features
  return props.features.slice(0, props.featuresLimit)
})

const hasMoreFeatures = computed(() => {
  return props.features && props.features.length > props.featuresLimit
})

const iconWrapperStyle = computed(() => {
  const styles = {}
  
  if (props.iconBackground) {
    styles.background = props.iconBackground
  }
  
  if (props.iconColor) {
    styles.color = props.iconColor
  }
  
  return styles
})

// Event handlers
const handleClick = () => {
  if (props.clickable && !props.loading) {
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

const handleMouseEnter = () => {
  emit('mouse-enter')
}

const handleMouseLeave = () => {
  emit('mouse-leave')
}
</script>

<style scoped>
/* Contenedor principal */
.info-card {
  position: relative;
  background: var(--luxury-surface, #ffffff);
  border-radius: var(--radius-xl, 1rem);
  transition: all var(--transition-base, 0.3s ease);
  overflow: hidden;
  isolation: isolate;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Variantes de tarjeta */
.info-card--default {
  box-shadow: var(--shadow-soft, 0 2px 8px rgba(0,0,0,0.06));
  border: 1px solid var(--luxury-border, #e8e0d4);
}

.info-card--elevated {
  box-shadow: var(--shadow-large, 0 8px 32px rgba(0,0,0,0.12));
  border: none;
}

.info-card--outlined {
  box-shadow: none;
  border: 2px solid var(--luxury-border, #e8e0d4);
}

.info-card--minimal {
  box-shadow: none;
  border: none;
  background: transparent;
}

.info-card--luxury {
  background: var(--gradient-surface, linear-gradient(145deg, #ffffff 0%, #fafafa 100%));
  box-shadow: var(--shadow-luxury, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
  border: 1px solid rgba(212, 165, 116, 0.2);
}

.info-card--modern {
  border-radius: var(--radius-2xl, 1.5rem);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Estados interactivos */
.info-card--clickable {
  cursor: pointer;
}

.info-card--clickable:hover:not(.info-card--loading) {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xlarge, 0 16px 64px rgba(0,0,0,0.16));
}

.info-card--featured {
  position: relative;
}

.info-card--featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--gradient-gold, linear-gradient(90deg, #D4A574, #8B4513));
  z-index: 1;
}

/* Temas */
.info-card--dark {
  background: #1a1a1a;
  color: white;
  border-color: #333;
}

.info-card--brand {
  background: var(--gradient-luxury, linear-gradient(135deg, #1a1a1a, #2d2d2d));
  color: white;
}

/* Media container */
.info-card__media {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
}

.info-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow, 0.5s ease);
}

.info-card:hover .info-card__image {
  transform: scale(1.05);
}

.info-card__media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%);
  opacity: 0;
  transition: opacity var(--transition-base, 0.3s ease);
}

.info-card:hover .info-card__media-overlay {
  opacity: 1;
}

/* Badge */
.info-card__badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-full, 9999px);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
}

.badge--default {
  background: rgba(255, 255, 255, 0.9);
  color: var(--luxury-text-primary, #1a1a1a);
}

.badge--success {
  background: rgba(34, 197, 94, 0.9);
  color: white;
}

.badge--warning {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.badge--premium {
  background: var(--gradient-gold, linear-gradient(90deg, #D4A574, #8B4513));
  color: white;
}

/* Acciones sobre imagen */
.info-card__media-actions {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 2;
}

.media-action {
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--luxury-text-primary, #1a1a1a);
  cursor: pointer;
  transition: all var(--transition-base, 0.3s ease);
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-action:hover {
  background: white;
  transform: scale(1.1);
  box-shadow: var(--shadow-medium, 0 4px 16px rgba(0,0,0,0.08));
}

/* Status indicator */
.info-card__status {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-full, 9999px);
  font-size: 0.75rem;
  font-weight: 500;
  z-index: 2;
}

.status__indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.status--online .status__indicator {
  background: #22c55e;
}

.status--offline .status__indicator {
  background: #6b7280;
}

.status--busy .status__indicator {
  background: #ef4444;
}

/* Contenido principal */
.info-card__content {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Header */
.info-card__header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.info-card__icon-container {
  flex-shrink: 0;
}

.info-card__icon-wrapper {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-lg, 0.75rem);
  background: var(--luxury-accent-light, #f5e6d3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--luxury-secondary, #8b4513);
}

.info-card__title-group {
  flex: 1;
  min-width: 0;
}

.info-card__title {
  font-size: var(--text-lg, 1.125rem);
  font-weight: 600;
  color: var(--luxury-text-primary, #1a1a1a);
  margin: 0 0 0.25rem 0;
  line-height: 1.3;
}

.info-card__subtitle {
  font-size: var(--text-sm, 0.875rem);
  color: var(--luxury-text-secondary, #4a4a4a);
  margin: 0;
  line-height: 1.4;
}

/* Rating */
.info-card__rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.rating__stars {
  display: flex;
  gap: 0.125rem;
}

.rating__star {
  font-size: 1rem;
  color: #d1d5db;
  transition: color var(--transition-fast, 0.15s ease);
}

.rating__star--filled {
  color: #f59e0b;
}

.rating__text {
  font-size: 0.75rem;
  color: var(--luxury-text-light, #6a6a6a);
}

/* Descripción */
.info-card__description p {
  font-size: var(--text-sm, 0.875rem);
  line-height: 1.6;
  color: var(--luxury-text-secondary, #4a4a4a);
  margin: 0;
}

/* Métricas */
.info-card__metrics {
  display: flex;
  gap: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid var(--luxury-border, #e8e0d4);
  border-bottom: 1px solid var(--luxury-border, #e8e0d4);
}

.metric {
  text-align: center;
}

.metric__value {
  font-size: var(--text-xl, 1.25rem);
  font-weight: 700;
  color: var(--luxury-secondary, #8b4513);
}

.metric__label {
  font-size: 0.75rem;
  color: var(--luxury-text-light, #6a6a6a);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
}

/* Features */
.info-card__features {
  margin-top: auto;
}

.features__title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--luxury-text-secondary, #4a4a4a);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
}

.features__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.feature-tag {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--luxury-accent-light, #f5e6d3);
  color: var(--luxury-secondary, #8b4513);
  border-radius: var(--radius-full, 9999px);
  border: 1px solid var(--luxury-accent, #d4a574);
  transition: all var(--transition-fast, 0.15s ease);
}

.feature-tag--more {
  cursor: pointer;
  background: var(--luxury-border, #e8e0d4);
  color: var(--luxury-text-secondary, #4a4a4a);
}

.feature-tag--more:hover {
  background: var(--luxury-accent-light, #f5e6d3);
  color: var(--luxury-secondary, #8b4513);
}

/* Info list */
.info-card__info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-item__icon {
  font-size: 1.125rem;
  color: var(--luxury-secondary, #8b4513);
  flex-shrink: 0;
}

.info-item__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.info-item__label {
  font-size: 0.875rem;
  color: var(--luxury-text-secondary, #4a4a4a);
}

.info-item__value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--luxury-text-primary, #1a1a1a);
}

/* Precio */
.info-card__price {
  text-align: center;
  padding: 1rem 0;
  border-top: 1px solid var(--luxury-border, #e8e0d4);
}

.price__main {
  font-size: var(--text-2xl, 1.5rem);
  font-weight: 700;
  color: var(--luxury-secondary, #8b4513);
}

.price__label {
  font-size: 0.875rem;
  color: var(--luxury-text-secondary, #4a4a4a);
  margin-top: 0.25rem;
}

.price__original {
  font-size: 0.875rem;
  color: var(--luxury-text-light, #6a6a6a);
  text-decoration: line-through;
  margin-top: 0.25rem;
}

/* Footer */
.info-card__footer {
  padding: 1.5rem;
  border-top: 1px solid var(--luxury-border, #e8e0d4);
  background: rgba(248, 250, 252, 0.5);
}

.info-card__actions {
  display: flex;
  gap: 0.75rem;
}

.actions--horizontal {
  flex-direction: row;
  justify-content: space-between;
}

.actions--vertical {
  flex-direction: column;
}

.actions--stacked {
  flex-direction: column;
  align-items: stretch;
}

.card-action {
  transition: all var(--transition-base, 0.3s ease);
}

.card-action--primary {
  flex: 1;
}

/* Efecto de brillo */
.info-card__shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-slow, 0.5s ease);
  pointer-events: none;
  z-index: 1;
}

.info-card:hover .info-card__shine {
  left: 100%;
}

/* Loading state */
.info-card--loading {
  pointer-events: none;
  position: relative;
}

.info-card__loading {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading__spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid var(--luxury-border, #e8e0d4);
  border-top: 2px solid var(--luxury-secondary, #8b4513);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .info-card__content {
    padding: 1rem;
  }
  
  .info-card__header {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .info-card__rating {
    align-items: flex-start;
  }
  
  .info-card__metrics {
    justify-content: space-around;
  }
  
  .info-card__actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .info-card__content {
    padding: 0.75rem;
  }
  
  .info-card__icon-wrapper {
    width: 3rem;
    height: 3rem;
  }
  
  .feature-tag {
    font-size: 0.6875rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>