<template>
  <section class="cta-section q-pa-xl text-center" :class="sectionClass" :style="sectionStyle">
    <!-- Contenido principal -->
    <div class="cta-content" :class="contentClass">
      <!-- Icono opcional -->
      <div v-if="icon" class="cta-icon q-mb-lg">
        <q-icon 
          :name="icon" 
          :size="iconSize" 
          :color="iconColor" 
        />
      </div>
      
      <!-- Título principal -->
      <h2 class="cta-title text-h3 q-mb-md" :class="titleClass">
        {{ title }}
      </h2>
      
      <!-- Subtítulo/Descripción -->
      <p v-if="subtitle" class="cta-subtitle text-h6 q-mb-xl" :class="subtitleClass">
        {{ subtitle }}
      </p>
      
      <!-- Contenido personalizado -->
      <div v-if="$slots.default" class="cta-custom-content q-mb-xl">
        <slot />
      </div>
      
      <!-- Botones de acción -->
      <div v-if="actions && actions.length" class="cta-actions">
        <BaseButton
          v-for="(action, index) in actions"
          :key="index"
          :variant="action.variant || 'cta'"
          :color="action.color"
          :text-color="action.textColor"
          :label="action.label"
          :icon="action.icon"
          :icon-right="action.iconRight"
          :to="action.to"
          :href="action.href"
          :size="action.size || 'lg'"
          :outline="action.outline"
          :flat="action.flat"
          :unelevated="action.unelevated !== undefined ? action.unelevated : true"
          :class="['cta-button', action.class, index > 0 ? 'q-ml-md' : '']"
          @click="handleActionClick(action, index)"
        />
      </div>
      
      <!-- Acción única -->
      <BaseButton
        v-else-if="buttonLabel"
        :variant="buttonVariant"
        :color="buttonColor"
        :text-color="buttonTextColor"
        :label="buttonLabel"
        :icon="buttonIcon"
        :icon-right="buttonIconRight"
        :to="buttonTo"
        :href="buttonHref"
        :size="buttonSize"
        :outline="buttonOutline"
        :flat="buttonFlat"
        :unelevated="buttonUnelevated"
        :class="['cta-button', buttonClass]"
        @click="handleButtonClick"
      />
      
      <!-- Información adicional -->
      <div v-if="additionalInfo" class="cta-additional-info q-mt-lg">
        <div class="text-body2 text-grey-6">
          <q-icon v-if="additionalInfo.icon" :name="additionalInfo.icon" size="sm" class="q-mr-xs" />
          {{ additionalInfo.text }}
        </div>
      </div>
      
      <!-- Contenido del footer -->
      <div v-if="$slots.footer" class="cta-footer q-mt-lg">
        <slot name="footer" />
      </div>
    </div>
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
  
  // Visual
  icon: String,
  iconSize: {
    type: String,
    default: '3rem'
  },
  iconColor: {
    type: String,
    default: 'brown-7'
  },
  
  // Tema y estilos
  theme: {
    type: String,
    default: 'light',
    validator: (value) => [
      'light', 'dark', 'primary', 'gradient', 'custom'
    ].includes(value)
  },
  customBackground: String,
  sectionClass: String,
  contentClass: String,
  titleClass: {
    type: String,
    default: 'text-grey-8'
  },
  subtitleClass: {
    type: String,
    default: 'text-grey-6'
  },
  
  // Múltiples acciones
  actions: Array,
  
  // Acción única (legacy support)
  buttonLabel: String,
  buttonVariant: {
    type: String,
    default: 'cta'
  },
  buttonColor: String,
  buttonTextColor: String,
  buttonIcon: String,
  buttonIconRight: String,
  buttonTo: String,
  buttonHref: String,
  buttonSize: {
    type: String,
    default: 'lg'
  },
  buttonOutline: Boolean,
  buttonFlat: Boolean,
  buttonUnelevated: {
    type: Boolean,
    default: true
  },
  buttonClass: String,
  
  // Información adicional
  additionalInfo: Object, // { text: '', icon: '' }
  
  // Animaciones
  animated: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['action-click', 'button-click'])

// Configuraciones de tema
const themeConfig = {
  light: {
    background: '#fafafa',
    titleColor: 'text-grey-8',
    subtitleColor: 'text-grey-6'
  },
  dark: {
    background: 'linear-gradient(135deg, #2c2c2c, #1a1a1a)',
    titleColor: 'text-white',
    subtitleColor: 'text-grey-4'
  },
  primary: {
    background: 'linear-gradient(135deg, #8D4513, #A0522D)',
    titleColor: 'text-white',
    subtitleColor: 'text-grey-3'
  },
  gradient: {
    background: 'linear-gradient(135deg, rgba(141, 69, 19, 0.1), rgba(160, 82, 45, 0.05))',
    titleColor: 'text-grey-8',
    subtitleColor: 'text-grey-6'
  }
}

const sectionStyle = computed(() => {
  if (props.customBackground) {
    return { background: props.customBackground }
  }
  
  if (props.theme === 'custom') {
    return {}
  }
  
  const config = themeConfig[props.theme]
  return config ? { background: config.background } : {}
})

// Event handlers
const handleActionClick = (action, index) => {
  emit('action-click', { action, index })
  if (action.click && typeof action.click === 'function') {
    action.click()
  }
}

const handleButtonClick = () => {
  emit('button-click')
}
</script>

<style scoped>
.cta-section {
  position: relative;
  overflow: hidden;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.cta-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.cta-title {
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.cta-subtitle {
  font-weight: 400;
  line-height: 1.4;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-button {
  min-width: 200px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.cta-additional-info {
  opacity: 0.8;
}

/* Animaciones */
.cta-section.animated .cta-content {
  animation: ctaFadeIn 0.8s ease-out;
}

.cta-section.animated .cta-title {
  animation: ctaSlideUp 0.8s ease-out 0.2s both;
}

.cta-section.animated .cta-subtitle {
  animation: ctaSlideUp 0.8s ease-out 0.4s both;
}

.cta-section.animated .cta-actions,
.cta-section.animated .cta-button {
  animation: ctaSlideUp 0.8s ease-out 0.6s both;
}

@keyframes ctaFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes ctaSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Efectos de fondo */
.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  z-index: 1;
}

/* Temas específicos */
.cta-section.theme-dark .cta-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cta-section.theme-primary .cta-title,
.cta-section.theme-primary .cta-subtitle {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-title {
    font-size: 1.8rem;
  }
  
  .cta-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
  
  .cta-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .cta-button {
    min-width: 250px;
    width: 100%;
    max-width: 300px;
  }
  
  .cta-actions .q-ml-md {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .cta-title {
    font-size: 1.6rem;
  }
  
  .cta-subtitle {
    font-size: 0.9rem;
  }
  
  .cta-button {
    min-width: 200px;
  }
}

/* Variaciones especiales */
.cta-section.style-card .cta-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.cta-section.style-minimal {
  padding: 2rem 1rem;
}

.cta-section.style-minimal .cta-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section.style-minimal .cta-subtitle {
  margin-bottom: 2rem;
}

/* Efectos de hover en toda la sección */
.cta-section:hover .cta-content {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>