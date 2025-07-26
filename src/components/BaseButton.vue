<template>
  <q-btn 
    :size="size"
    :color="color"
    :text-color="textColor"
    :label="label"
    :to="to"
    :href="href"
    :target="target"
    :icon="icon"
    :icon-right="iconRight"
    :outline="outline"
    :flat="flat"
    :unelevated="unelevated"
    :round="round"
    :rounded="rounded"
    :push="push"
    :glossy="glossy"
    :fab="fab"
    :fab-mini="fabMini"
    :padding="padding"
    :no-caps="noCaps"
    :no-wrap="noWrap"
    :ripple="ripple"
    :loading="loading"
    :percentage="percentage"
    :dark-percentage="darkPercentage"
    :disable="disable"
    :tabindex="tabindex"
    :type="type"
    :align="align"
    :stack="stack"
    :stretch="stretch"
    :dense="dense"
    :class="[customClass, buttonClass]"
    :style="customStyle"
    @click="handleClick"
    v-bind="$attrs"
  >
    <template v-if="$slots.default">
      <slot />
    </template>
    <template v-if="$slots.loading" #loading>
      <slot name="loading" />
    </template>
  </q-btn>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Contenido
  label: String,
  icon: String,
  iconRight: String,
  
  // Navegación
  to: [String, Object],
  href: String,
  target: String,
  
  // Estilos predefinidos
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => [
      'primary', 'secondary', 'accent', 'dark', 'positive', 'negative', 'info', 'warning',
      'hero-primary', 'hero-secondary', 'cta', 'nav', 'reserve', 'contact'
    ].includes(value)
  },
  
  // Propiedades de Quasar
  size: { type: String, default: 'md' },
  color: String,
  textColor: String,
  outline: Boolean,
  flat: Boolean,
  unelevated: Boolean,
  round: Boolean,
  rounded: Boolean,
  push: Boolean,
  glossy: Boolean,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  noCaps: Boolean,
  noWrap: Boolean,
  ripple: { type: [Boolean, Object], default: true },
  loading: Boolean,
  percentage: Number,
  darkPercentage: Boolean,
  disable: Boolean,
  tabindex: [Number, String],
  type: { type: String, default: 'button' },
  align: { type: String, default: 'center' },
  stack: Boolean,
  stretch: Boolean,
  dense: Boolean,
  
  // Personalización
  customClass: [String, Array, Object],
  customStyle: [String, Object]
})

const emit = defineEmits(['click'])

// Configuraciones predefinidas por variante
const variantConfig = {
  'primary': { color: 'brown-7', unelevated: true },
  'secondary': { color: 'orange-8', outline: true },
  'accent': { color: 'teal-6', unelevated: true },
  'dark': { color: 'black', textColor: 'orange-8', unelevated: true },
  'positive': { color: 'positive', unelevated: true },
  'negative': { color: 'negative', unelevated: true },
  'info': { color: 'blue-6', unelevated: true },
  'warning': { color: 'orange-6', unelevated: true },
  'hero-primary': { color: 'orange-8', outline: true, size: 'lg' },
  'hero-secondary': { color: 'white-8', outline: true, size: 'lg' },
  'cta': { color: 'brown-7', textColor: 'white', unelevated: true, size: 'lg' },
  'nav': { flat: true, textColor: 'white-8' },
  'reserve': { color: 'brown-7', unelevated: true },
  'contact': { color: 'blue-6', unelevated: true }
}

// Computed para aplicar configuración de variante
const buttonClass = computed(() => {
  const classes = []
  
  if (props.variant === 'hero-primary' || props.variant === 'hero-secondary') {
    classes.push('hero-btn')
  }
  
  if (props.variant === 'cta') {
    classes.push('cta-btn')
  }
  
  if (props.variant === 'nav') {
    classes.push('nav-btn')
  }
  
  if (props.variant === 'reserve') {
    classes.push('reserve-btn')
  }
  
  return classes
})

// Aplicar configuración de variante si no se especifican props individuales
const config = computed(() => variantConfig[props.variant] || {})

const color = computed(() => props.color || config.value.color)
const textColor = computed(() => props.textColor || config.value.textColor)
const size = computed(() => props.size || config.value.size || 'md')
const outline = computed(() => props.outline !== undefined ? props.outline : config.value.outline)
const flat = computed(() => props.flat !== undefined ? props.flat : config.value.flat)
const unelevated = computed(() => props.unelevated !== undefined ? props.unelevated : config.value.unelevated)

const handleClick = (event) => {
  emit('click', event)
}
</script>

<style scoped>
.hero-btn {
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.2s ease;
  min-width: 180px;
}

.hero-btn:hover {
  transform: translateY(-1px);
}

.cta-btn {
  font-weight: 600;
  transition: all 0.3s ease;
  min-width: 200px;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.nav-btn {
  font-weight: 400;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #8D4513;
}

.nav-btn.router-link-active {
  background: rgba(141, 69, 19, 0.1);
  color: #8D4513;
  font-weight: 500;
}

.reserve-btn {
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 20px;
  transition: all 0.2s ease;
}

.reserve-btn:hover {
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-btn {
    width: 200px;
    min-width: unset;
  }
  
  .cta-btn {
    min-width: 180px;
  }
}
</style>