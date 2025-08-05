<template>
  <section 
    class="hero-section"
    :class="[`hero-section--${variant}`, { 'hero-section--parallax': parallax && !youtubeVideoId }]"
    :style="heroStyle"
  >
    <!-- Video de YouTube como fondo -->
    <div 
      v-if="youtubeVideoId && !videoError" 
      class="youtube-video-container"
    >
      <iframe
        ref="youtubeIframe"
        class="youtube-video"
        :src="youtubeEmbedUrl"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        @load="onYouTubeLoaded"
        @error="onYouTubeError"
      ></iframe>
      
      <!-- Overlay para interceptar clics en el video -->
      <div class="youtube-overlay" @click.prevent></div>
    </div>
    
    <!-- Fallback de imagen cuando el video falla o no hay video -->
    <div 
      v-if="videoError || (!youtubeVideoId && backgroundImage)" 
      class="hero-image-fallback"
      :style="imageFallbackStyle"
    ></div>
    
    <!-- Overlay sofisticado -->
    <div class="hero-overlay" :style="overlayStyle"></div>
    
    <!-- Efectos de partículas opcionales -->
    <div v-if="showParticles" class="hero-particles">
      <div v-for="i in 50" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
    
    <!-- Contenido principal -->
    <div class="hero-content">
      <div class="hero-container">
        
        <!-- Badge de categoría -->
        <div v-if="badge" class="hero-badge" :class="badgeClass">
          <div class="badge-content">
            <q-icon 
              v-if="badge.icon" 
              :name="badge.icon" 
              class="badge-icon" 
            />
            <span class="badge-text">{{ badge.label }}</span>
          </div>
        </div>
        
        <!-- Título principal con efecto elegante -->
        <h1 class="hero-title">
          <span class="title-line" v-for="(line, index) in titleLines" :key="index">
            {{ line }}
          </span>
        </h1>
        
        <!-- Subtítulo con tipografía refinada -->
        <div v-if="subtitle" class="hero-subtitle-container">
          <div class="hero-subtitle">{{ subtitle }}</div>
          <div class="subtitle-decoration"></div>
        </div>
        
        <!-- Descripción adicional -->
        <p v-if="description" class="hero-description">
          {{ description }}
        </p>
        
        <!-- Grupo de acciones mejorado -->
        <div v-if="actions && actions.length" class="hero-actions">
          <BaseButton
            v-for="(action, index) in actions"
            :key="index"
            :class="[
              'hero-button',
              `hero-button--${action.variant || 'primary'}`,
              { 'hero-button--featured': index === 0 }
            ]"
            :variant="action.variant || 'primary'"
            :color="action.color"
            :label="action.label"
            :to="action.to"
            :href="action.href"
            :icon="action.icon"
            :icon-right="action.iconRight"
            :size="action.size || 'lg'"
            :loading="action.loading"
            @click="handleActionClick(action, index)"
          >
            <template v-if="action.sublabel" #sublabel>
              <span class="button-sublabel">{{ action.sublabel }}</span>
            </template>
          </BaseButton>
        </div>
        
        <!-- Indicadores de confianza -->
        <div v-if="trustIndicators" class="hero-trust">
          <div class="trust-item" v-for="indicator in trustIndicators" :key="indicator.text">
            <q-icon :name="indicator.icon" class="trust-icon" />
            <span class="trust-text">{{ indicator.text }}</span>
          </div>
        </div>
        
        <!-- Contenido personalizado -->
        <div v-if="$slots.default" class="hero-custom">
          <slot />
        </div>
        
      </div>
    </div>
    
    <!-- Controles de video de YouTube -->
    <div v-if="youtubeVideoId && showVideoControls && !videoError" class="video-controls">
      <q-btn 
        flat 
        round 
        :icon="isVideoPlaying ? 'pause' : 'play_arrow'"
        color="white"
        size="md"
        @click="toggleYouTubeVideo"
        class="video-control-btn"
        :disable="!videoLoaded"
      >
        <q-tooltip>{{ isVideoPlaying ? 'Pausar' : 'Reproducir' }}</q-tooltip>
      </q-btn>
      <q-btn 
        flat 
        round 
        :icon="isVideoMuted ? 'volume_off' : 'volume_up'"
        color="white"
        size="md"
        @click="toggleYouTubeMute"
        class="video-control-btn"
        :disable="!videoLoaded"
      >
        <q-tooltip>{{ isVideoMuted ? 'Activar sonido' : 'Silenciar' }}</q-tooltip>
      </q-btn>
      <q-btn 
        flat 
        round 
        icon="open_in_new"
        color="white"
        size="md"
        @click="openYouTubeVideo"
        class="video-control-btn"
      >
        <q-tooltip>Ver en YouTube</q-tooltip>
      </q-btn>
    </div>
    
    <!-- Scroll indicator elegante -->
    <div v-if="showScrollIndicator" class="hero-scroll-indicator" @click="scrollToContent">
      <div class="scroll-indicator-line"></div>
      <div class="scroll-indicator-dot"></div>
      <span class="scroll-indicator-text">Descubrir más</span>
    </div>
    
    <!-- Loading indicator para video -->
    <div v-if="youtubeVideoId && !videoLoaded && !videoError" class="video-loading">
      <q-spinner-dots color="white" size="2rem" />
      <span class="loading-text">Cargando experiencia...</span>
    </div>
    
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  // Contenido principal
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  description: String,
  
  // Badge superior
  badge: {
    type: Object,
    validator: (badge) => !badge || (badge.label && badge.icon)
  },
  
  // Medios de fondo
  backgroundImage: String,
  youtubeVideoId: String, // ID del video de YouTube (ej: 'dQw4w9WgXcQ')
  youtubeVideoUrl: String, // URL completa de YouTube (se extrae el ID automáticamente)
  backgroundPosition: {
    type: String,
    default: 'center center'
  },
  backgroundSize: {
    type: String,
    default: 'cover'
  },
  
  // Configuración de YouTube
  youtubeAutoplay: {
    type: Boolean,
    default: true
  },
  youtubeLoop: {
    type: Boolean,
    default: true
  },
  youtubeStartTime: {
    type: Number,
    default: 0
  },
  youtubeEndTime: Number,
  
  // Controles de video
  showVideoControls: {
    type: Boolean,
    default: true
  },
  
  // Efectos
  parallax: {
    type: Boolean,
    default: true
  },
  showParticles: {
    type: Boolean,
    default: false
  },
  showScrollIndicator: {
    type: Boolean,
    default: true
  },
  
  // Overlay
  overlay: {
    type: Boolean,
    default: true
  },
  overlayOpacity: {
    type: Number,
    default: 0.6
  },
  overlayColor: {
    type: String,
    default: 'black'
  },
  
  // Variantes de diseño
  variant: {
    type: String,
    default: 'luxury',
    validator: (value) => [
      'luxury', 'minimal', 'bold', 'elegant', 'modern'
    ].includes(value)
  },
  
  // Altura
  height: {
    type: String,
    default: '100vh'
  },
  minHeight: {
    type: String,
    default: '600px'
  },
  
  // Acciones
  actions: {
    type: Array,
    default: () => []
  },
  
  // Indicadores de confianza
  trustIndicators: Array,
  
  // Clases personalizadas
  customClass: String,
  badgeClass: String
})

const emit = defineEmits([
  'action-click', 
  'scroll-indicator-click', 
  'video-loaded', 
  'video-error',
  'video-play',
  'video-pause'
])

// Referencias reactivas
const youtubeIframe = ref(null)
const scrollY = ref(0)
const youtubePlayer = ref(null)

// Estado del video
const videoLoaded = ref(false)
const videoError = ref(false)
const isVideoPlaying = ref(true)
const isVideoMuted = ref(true)

// Extraer ID de YouTube de diferentes formatos de URL
const extractYouTubeId = (url) => {
  if (!url) return null
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // ID directo
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

// ID final del video (desde prop directa o extraída de URL)
const finalYouTubeId = computed(() => {
  return props.youtubeVideoId || extractYouTubeId(props.youtubeVideoUrl)
})

// Dividir título en líneas para animación
const titleLines = computed(() => {
  return props.title.split('•').map(line => line.trim())
})

// URL del embed de YouTube
const youtubeEmbedUrl = computed(() => {
  if (!finalYouTubeId.value) return ''
  
  const params = new URLSearchParams({
    autoplay: props.youtubeAutoplay ? '1' : '0',
    mute: '1', // Siempre empezar mudo para evitar problemas de autoplay
    loop: props.youtubeLoop ? '1' : '0',
    playlist: finalYouTubeId.value, // Necesario para loop
    controls: '0',
    showinfo: '0',
    rel: '0',
    iv_load_policy: '3',
    modestbranding: '1',
    playsinline: '1',
    enablejsapi: '1',
    origin: window.location.origin
  })
  
  if (props.youtubeStartTime) {
    params.set('start', props.youtubeStartTime.toString())
  }
  
  if (props.youtubeEndTime) {
    params.set('end', props.youtubeEndTime.toString())
  }
  
  return `https://www.youtube.com/embed/${finalYouTubeId.value}?${params.toString()}`
})

// Estilo del hero
const heroStyle = computed(() => {
  const styles = {
    height: props.height,
    minHeight: props.minHeight
  }
  
  // Solo aplicar parallax si no hay video de YouTube
  if (!finalYouTubeId.value) {
    styles.backgroundPosition = props.backgroundPosition
    styles.backgroundSize = props.backgroundSize
    styles.backgroundAttachment = props.parallax ? 'fixed' : 'scroll'
    styles.backgroundRepeat = 'no-repeat'
  }
  
  return styles
})

// Estilo de fallback para imagen
const imageFallbackStyle = computed(() => {
  if (!props.backgroundImage) return {}
  
  return {
    backgroundImage: `url("${props.backgroundImage}")`,
    backgroundPosition: props.backgroundPosition,
    backgroundSize: props.backgroundSize,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: props.parallax && !finalYouTubeId.value ? 'fixed' : 'scroll'
  }
})

// Estilo del overlay
const overlayStyle = computed(() => {
  if (!props.overlay) return { display: 'none' }
  
  const alpha = props.overlayOpacity
  let background
  
  switch (props.overlayColor) {
    case 'gradient':
      background = `linear-gradient(135deg, rgba(26, 26, 26, ${alpha}) 0%, rgba(139, 69, 19, ${alpha * 0.7}) 100%)`
      break
    case 'luxury':
      background = `linear-gradient(135deg, rgba(0, 0, 0, ${alpha}) 0%, rgba(26, 26, 26, ${alpha * 0.8}) 100%)`
      break
    case 'hotel':
      background = `linear-gradient(135deg, rgba(0, 0, 0, ${alpha}) 0%, rgba(139, 69, 19, ${alpha * 0.6}) 50%, rgba(0, 0, 0, ${alpha * 0.8}) 100%)`
      break
    default:
      background = `rgba(0, 0, 0, ${alpha})`
  }
  
  return { background }
})

// Generar estilos de partículas
const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 1
  const left = Math.random() * 100
  const animationDelay = Math.random() * 10
  const animationDuration = Math.random() * 20 + 10
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${animationDelay}s`,
    animationDuration: `${animationDuration}s`
  }
}

// Manejo de scroll para parallax
const handleScroll = () => {
  scrollY.value = window.scrollY
}

// Event handlers para YouTube
const onYouTubeLoaded = () => {
  videoLoaded.value = true
  videoError.value = false
  emit('video-loaded')
  console.log('✅ Video de YouTube cargado correctamente')
}

const onYouTubeError = (event) => {
  videoError.value = true
  videoLoaded.value = false
  emit('video-error', event)
  console.error('❌ Error al cargar el video de YouTube:', event)
}

// Controles de YouTube (usando postMessage)
const toggleYouTubeVideo = () => {
  if (!youtubeIframe.value || !videoLoaded.value) return
  
  const command = isVideoPlaying.value ? 'pauseVideo' : 'playVideo'
  youtubeIframe.value.contentWindow.postMessage(
    `{"event":"command","func":"${command}","args":""}`,
    '*'
  )
  
  isVideoPlaying.value = !isVideoPlaying.value
  emit(isVideoPlaying.value ? 'video-play' : 'video-pause')
}

const toggleYouTubeMute = () => {
  if (!youtubeIframe.value || !videoLoaded.value) return
  
  const command = isVideoMuted.value ? 'unMute' : 'mute'
  youtubeIframe.value.contentWindow.postMessage(
    `{"event":"command","func":"${command}","args":""}`,
    '*'
  )
  
  isVideoMuted.value = !isVideoMuted.value
}

const openYouTubeVideo = () => {
  if (finalYouTubeId.value) {
    window.open(`https://www.youtube.com/watch?v=${finalYouTubeId.value}`, '_blank')
  }
}

// Otros handlers
const handleActionClick = (action, index) => {
  emit('action-click', { action, index })
  if (action.click && typeof action.click === 'function') {
    action.click()
  }
}

const scrollToContent = () => {
  emit('scroll-indicator-click')
  const nextSection = document.querySelector('.hero-section').nextElementSibling
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// Watchers
watch(() => [props.youtubeVideoId, props.youtubeVideoUrl], () => {
  videoLoaded.value = false
  videoError.value = false
})

// Lifecycle
onMounted(() => {
  // Scroll handler para parallax solo si no hay video de YouTube
  if (props.parallax && !finalYouTubeId.value) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
  
  // Verificar que tenemos un ID de YouTube válido
  if (!finalYouTubeId.value && (props.youtubeVideoId || props.youtubeVideoUrl)) {
    console.error('❌ No se pudo extraer un ID válido de YouTube de:', props.youtubeVideoId || props.youtubeVideoUrl)
    videoError.value = true
  }
})

onUnmounted(() => {
  if (props.parallax && !finalYouTubeId.value) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
/* Contenedor principal del hero */
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  overflow: hidden;
  isolation: isolate;
}

/* Contenedor del video de YouTube */
.youtube-video-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 56.25vw; /* 16:9 aspect ratio */
  min-height: 100vh;
  min-width: 177.77vh; /* 16:9 aspect ratio */
  transform: translate(-50%, -50%);
  z-index: -2;
}

.youtube-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* Overlay para interceptar clics en el video */
.youtube-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: auto;
}

/* Fallback de imagen */
.hero-image-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
}

/* Overlay sofisticado */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  backdrop-filter: blur(1px);
}

/* Efectos de partículas */
.hero-particles {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(212, 165, 116, 0.3);
  border-radius: 50%;
  animation: float infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Contenido principal */
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: none;
  text-align: center;
  padding: 0 2rem;
}

.hero-container {
  max-width: 900px;
  margin: 0 auto;
}

/* Badge elegante */
.hero-badge {
  display: inline-flex;
  margin-bottom: 2rem;
  animation: fadeInDown 0.8s ease-out 0.2s both;
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-icon {
  font-size: 1rem;
}

/* Título principal con efectos elegantes */
.hero-title {
  font-family: var(--font-family-display, 'Playfair Display', serif);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 300;
  line-height: 1.1;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  animation: fadeInUp 1s ease-out 0.4s both;
}

.title-line {
  display: block;
  position: relative;
  margin-bottom: 0.2em;
}

.title-line:last-child {
  margin-bottom: 0;
}

.title-line::after {
  content: '';
  position: absolute;
  bottom: -0.1em;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #D4A574, transparent);
  transform: translateX(-50%);
  animation: lineGrow 1.2s ease-out 1.2s both;
}

.title-line:last-child::after {
  display: none;
}

@keyframes lineGrow {
  to {
    width: 100%;
  }
}

/* Subtítulo refinado */
.hero-subtitle-container {
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease-out 0.6s both;
}

.hero-subtitle {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.4;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.subtitle-decoration {
  width: 60px;
  height: 1px;
  background: #D4A574;
  margin: 0 auto;
  position: relative;
}

.subtitle-decoration::before,
.subtitle-decoration::after {
  content: '';
  position: absolute;
  top: -2px;
  width: 5px;
  height: 5px;
  background: #D4A574;
  border-radius: 50%;
}

.subtitle-decoration::before {
  left: -10px;
}

.subtitle-decoration::after {
  right: -10px;
}

/* Descripción */
.hero-description {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  animation: fadeInUp 1s ease-out 0.8s both;
}

/* Grupo de acciones mejorado */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  animation: fadeInUp 1s ease-out 1s both;
}

.hero-button {
  position: relative;
  min-width: 180px;
  height: 56px;
  border-radius: 2rem;
  font-weight: 500;
  letter-spacing: 0.025em;
  transition: all 0.3s ease;
  overflow: hidden;
}

.hero-button--featured {
  background: linear-gradient(135deg, #D4A574, #8B4513);
  color: white;
  box-shadow: 0 8px 30px rgba(212, 165, 116, 0.3);
}

.hero-button--featured:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(212, 165, 116, 0.4);
}

.hero-button--secondary {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
}

.hero-button--secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

/* Indicadores de confianza */
.hero-trust {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  opacity: 0.8;
  animation: fadeInUp 1s ease-out 1.2s both;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
}

.trust-icon {
  font-size: 1.25rem;
  color: #D4A574;
}

/* Controles de video mejorados */
.video-controls {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  z-index: 3;
  display: flex;
  gap: 0.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.video-controls:hover {
  opacity: 1;
}

.video-control-btn {
  background: rgba(0, 0, 0, 0.6) !important;
  backdrop-filter: blur(10px);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  transition: all 0.3s ease;
}

.video-control-btn:hover {
  background: rgba(0, 0, 0, 0.8) !important;
  transform: scale(1.1);
}

.video-control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loading indicator para video */
.video-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
  z-index: 1;
}

.loading-text {
  font-size: 0.875rem;
  opacity: 0.8;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
}

/* Indicador de scroll elegante */
.hero-scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-out 1.4s both;
}

.hero-scroll-indicator:hover {
  color: white;
  transform: translateX(-50%) translateY(-5px);
}

.scroll-indicator-line {
  width: 1px;
  height: 30px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.5rem;
  animation: scrollPulse 2s ease-in-out infinite;
}

.scroll-indicator-dot {
  width: 8px;
  height: 8px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  margin-bottom: 0.5rem;
  animation: scrollBounce 2s ease-in-out infinite;
}

.scroll-indicator-text {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  writing-mode: vertical-rl;
  text-orientation: mixed;
}

@keyframes scrollPulse {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

@keyframes scrollBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}

/* Animaciones de entrada */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Variantes de diseño */
.hero-section--minimal {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
}

.hero-section--minimal .hero-title {
  color: #1a1a1a;
}

.hero-section--minimal .hero-subtitle {
  color: #4a4a4a;
}

.hero-section--bold {
  background: linear-gradient(135deg, #1a1a1a, #8B4513);
}

.hero-section--elegant .hero-content {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Responsive mejorado */
@media (max-width: 768px) {
  .hero-content {
    padding: 0 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .hero-button {
    width: 280px;
    min-width: auto;
  }
  
  .hero-trust {
    flex-direction: column;
    gap: 1rem;
  }
  
  .scroll-indicator-text {
    writing-mode: horizontal-tb;
    text-orientation: initial;
  }
  
  .video-controls {
    bottom: 1rem;
    right: 1rem;
  }
  
  .video-control-btn {
    width: 40px;
    height: 40px;
  }
  
  /* Ajustar video de YouTube en móviles */
  .youtube-video-container {
    height: 100vh;
    width: 177.77vh; /* Mantener aspect ratio 16:9 */
    min-width: 100vw;
    min-height: 56.25vw;
  }
}

@media (max-width: 480px) {
  .hero-badge .badge-content {
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-button {
    width: 250px;
    height: 50px;
  }
}

/* Efectos de parallax solo para imagen */
.hero-section--parallax .hero-image-fallback {
  background-attachment: fixed;
}

@media (max-width: 768px) {
  .hero-section--parallax .hero-image-fallback {
    background-attachment: scroll;
  }
}

/* Estados especiales */
.hero-section.loading .hero-content > * {
  opacity: 0;
}

/* Accesibilidad */
@media (prefers-reduced-motion: reduce) {
  .hero-section,
  .hero-section * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Prevenir FOUC (Flash of Unstyled Content) */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  z-index: -3;
}
</style>