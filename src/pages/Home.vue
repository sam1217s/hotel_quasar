<template>
  <div>
    <!-- Hero Section con Video de YouTube de Fondo -->
    <HeroSection 
      title="El Refugio Real del Caribe"
      subtitle="Convento del siglo XVIII • Lujo Colonial frente al mar • Cartagena de Indias"
      description="Descubra la perfecta fusión entre historia colonial y elegancia contemporánea en el corazón de la ciudad amurallada."
      
      :youtube-video-id="hotelYouTubeId"
      :youtube-video-url="hotelYouTubeUrl"
      :background-image="fallbackImage"
      
      :youtube-autoplay="true"
      :youtube-loop="true"
      :youtube-start-time="0"
      :youtube-end-time="30"
      
      :show-video-controls="true"
      :show-particles="false"
      :show-scroll-indicator="true"
      
      variant="luxury"
      overlay-color="hotel"
      :overlay-opacity="0.5"
      
      :badge="{
        icon: 'eco',
        label: 'Green Key Certified'
      }" 
      
      :actions="heroActions" 
      :trust-indicators="trustIndicators"
      
      @action-click="handleHeroAction"
      @video-loaded="onVideoLoaded"
      @video-error="onVideoError"
      @video-play="onVideoPlay"
      @video-pause="onVideoPause"
      @scroll-indicator-click="onScrollToContent"
    />

    <!-- Carrusel 2D de Características -->
    <BaseCarousel2D 
      :items="features" 
      title="Experiencia Única"
      subtitle="Descubra la magia de un convento del siglo XVII convertido en hotel de lujo" 
      :autoplay-delay="3000"
      button-variant="primary" 
      @item-click="handleFeatureClick" 
    />

    <!-- Sección de Estadísticas -->
    <StatsSection 
      :stats="stats" 
      theme="brown" 
      :animated="true" 
    />

    <!-- Carrusel 3D de Highlights -->
    <BaseCarousel3D 
      :items="highlights3d" 
      title="Aspectos Destacados"
      subtitle="Lo que hace especial su estadía en nuestro hotel" 
      section-class="q-pa-xl bg-black-6"
      click-indicator-color="brown-7" 
      @item-click="handleHighlightClick" 
    />

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <div class="cta-container">
        <h2 class="text-h3 text-grey-8 q-mb-md">Reserve su Experiencia</h2>
        <p class="text-h6 text-grey-6 q-mb-xl">Viva la magia de un convento del siglo XVII convertido en hotel de lujo</p>
        <div class="cta-actions">
          <BaseButton 
            variant="cta" 
            label="Contactar Ahora" 
            to="/Contacto" 
            icon="contact_mail" 
            size="lg"
            class="q-mr-md q-mb-sm"
          />
          <BaseButton 
            variant="outline" 
            label="Ver en YouTube" 
            :href="`https://www.youtube.com/watch?v=${hotelYouTubeId}`"
            target="_blank"
            icon="play_circle"
            size="lg"
            color="red"
            class="q-mb-sm"
          />
        </div>
      </div>
    </section>

   

    <!-- Notificación de video -->
    <q-dialog v-model="showVideoNotification">
      <q-card class="q-pa-md">
        <q-card-section class="text-center">
          <q-icon name="smart_display" size="2rem" color="red" class="q-mb-md" />
          <div class="text-h6 q-mb-sm">¡Video de YouTube cargado!</div>
          <p class="text-body2 text-grey-6">
            Disfrute de la experiencia visual de nuestro hotel desde YouTube. 
            Puede controlar la reproducción con los botones en la esquina inferior derecha.
          </p>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn 
            label="Entendido" 
            color="positive" 
            @click="showVideoNotification = false"
            unelevated
          />
          <q-btn 
            flat
            label="Ver en YouTube" 
            color="red"
            :href="`https://www.youtube.com/watch?v=${hotelYouTubeId}`"
            target="_blank"
            icon="open_in_new"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import HeroSection from '../components/HeroSection.vue'
import BaseCarousel2D from '../components/BaseCarousel2D.vue'
import BaseCarousel3D from '../components/BaseCarousel3D.vue'
import StatsSection from '../components/StatsSection.vue'
import BaseButton from '../components/BaseButton.vue'

const router = useRouter()
const $q = useQuasar()

// Estado reactivo
const showVideoNotification = ref(false)
const showVideoConfig = ref(false)
const isDevelopment = ref(process.env.NODE_ENV === 'development')

// Configuración del video de YouTube
const videoConfig = ref({
  youtubeId: '',
  youtubeUrl: '',
  startTime: 0,
  endTime: 30,
  autoplay: true,
  loop: true,
  showControls: true
})

// CONFIGURACIÓN DE VIDEOS DE YOUTUBE
// Opción 1: Por ID directo del video (recomendado)
const hotelYouTubeId = ref('sSrREk-P_II') // Video ejemplo de hotel de lujo
// Opción 2: Por URL completa (se extrae el ID automáticamente)
const hotelYouTubeUrl = ref('') // 'https://www.youtube.com/watch?v=M7lc1UVf-VE'

// EJEMPLOS DE VIDEOS DE HOTELES DISPONIBLES:
const hotelVideoExamples = [
  {
    id: 'M7lc1UVf-VE',
    title: 'Luxury Hotel Tour',
    description: 'Tour por hotel de lujo'
  },
  {
    id: 'dW7FBgLvNT4', 
    title: 'Beach Resort',
    description: 'Resort en la playa'
  },
  {
    id: 'R3ZhNhUZuPk',
    title: 'Boutique Hotel',
    description: 'Hotel boutique elegante'
  },
  {
    id: 'IzYEjyp6VOU',
    title: 'Historic Hotel',
    description: 'Hotel histórico colonial'
  }
]

// ¡IMPORTANTE! CAMBIA ESTE ID POR EL DE TU VIDEO:
// Simplemente reemplaza 'M7lc1UVf-VE' con el ID de tu video de YouTube
// Para obtener el ID: https://www.youtube.com/watch?v=TU_ID_AQUI
// Solo necesitas la parte después del '='

const fallbackImage = ref('https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&h=1080&fit=crop')

// Datos para el hero - acciones mejoradas
const heroActions = ref([
  {
    label: 'Reservar Ahora',
    variant: 'primary',
    color: 'orange-8',
    to: '/Contacto',
    icon: 'event_available',
    sublabel: 'Mejor precio garantizado'
  },
  {
    label: 'Tour Virtual',
    variant: 'secondary',
    color: 'gray-8',
    href: `https://www.youtube.com/watch?v=${hotelYouTubeId.value}`,
    target: '_blank',
    icon: 'smart_display',
    iconRight: 'open_in_new'
  }
])

// Indicadores de confianza
const trustIndicators = ref([
  {
    icon: 'verified',
    text: '★★★★★ Certificado'
  },
  {
    icon: 'eco',
    text: 'Green Key'
  },
  {
    icon: 'history',
    text: 'Patrimonio UNESCO'
  },
  {
    icon: 'smart_display',
    text: 'Tour en YouTube'
  }
])

// Datos para el carrusel de características
const features = ref([
  {
    id: 1,
    icon: 'bed',
    color: 'brown-7',
    title: 'Habitaciones Elegantes',
    description: 'Suites con glamour colonial y vistas espectaculares al mar Caribe que combinan historia y lujo moderno',
    buttonText: 'Explorar Habitaciones',
    route: '/Habitaciones'
  },
  {
    id: 2,
    icon: 'restaurant',
    color: 'orange-8',
    title: 'Gastronomía Excepcional',
    description: 'Fusión perfecta entre sabores caribeños y técnicas francesas en ambientes únicos e históricos',
    buttonText: 'Descubrir Sabores',
    route: '/Restaurantes'
  },
  {
    id: 3,
    icon: 'spa',
    color: 'teal-6',
    title: 'Spa Colonial',
    description: 'Relajación y bienestar en un ambiente sereno e histórico con tratamientos exclusivos',
    buttonText: 'Relajarse',
    route: '/Bienestar'
  },
  {
    id: 4,
    icon: 'smart_display',
    color: 'red',
    title: 'Tour Virtual',
    description: 'Explore nuestras instalaciones desde la comodidad de su hogar con nuestro tour virtual en YouTube',
    buttonText: 'Ver Video',
    action: () => window.open(`https://www.youtube.com/watch?v=${hotelYouTubeId.value}`, '_blank')
  }
])

// Datos para las estadísticas
const stats = ref([
  { id: 1, number: 'XVII', label: 'Siglo de Historia' },
  { id: 2, number: '122', label: 'Habitaciones y Suites' },
  { id: 3, number: '3', label: 'Restaurantes Únicos' },
  { id: 4, number: '1M+', label: 'Vistas en YouTube' }
])

// Datos para el carrusel 3D
const highlights3d = ref([
  {
    id: 1,
    title: 'Arquitectura Colonial',
    description: 'Descubra la historia de nuestro convento del siglo XVII perfectamente conservado con elementos originales únicos',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    action: () => router.push('/Habitaciones')
  },
  {
    id: 2,
    title: 'Ubicación Privilegiada',
    description: 'En el corazón del Centro Histórico de Cartagena, Patrimonio de la Humanidad UNESCO',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    action: () => router.push('/Habitaciones')
  },
  {
    id: 3,
    title: 'Experiencia Premium',
    description: 'Servicios exclusivos de lujo con atención personalizada las 24 horas del día',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop',
    action: () => router.push('/Contacto')
  },
  {
    id: 4,
    title: 'Tour Virtual Inmersivo',
    description: 'Recorrido completo por nuestras instalaciones disponible 24/7 en nuestro canal de YouTube',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop',
    action: () => window.open(`https://www.youtube.com/watch?v=${hotelYouTubeId.value}`, '_blank')
  },
  {
    id: 5,
    title: 'Gastronomía de Clase Mundial',
    description: 'Chefs reconocidos internacionalmente crean experiencias culinarias únicas fusionando sabores locales',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    action: () => router.push('/Restaurantes')
  },
  {
    id: 6,
    title: 'Bienestar y Spa',
    description: 'Tratamientos ancestrales caribeños combinados con técnicas modernas de relajación y rejuvenecimiento',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
    action: () => router.push('/Bienestar')
  }
])

// Event handlers generales
const handleHeroAction = ({ action, index }) => {
  console.log('Hero action clicked:', action, index)
  
  // Track YouTube video interactions
  if (action.href && action.href.includes('youtube.com')) {
    console.log('🎬 Usuario navegó al video de YouTube')
  }
  
  // Analytics tracking (opcional)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'hero_action_click', {
      action_label: action.label,
      action_index: index,
      video_id: hotelYouTubeId.value
    })
  }
}

const handleFeatureClick = (feature) => {
  console.log('Feature clicked:', feature)
  if (feature.route) {
    router.push(feature.route)
  } else if (feature.action) {
    feature.action()
  }
}

const handleHighlightClick = ({ item }) => {
  console.log('Highlight clicked:', item)
  if (item.action) {
    item.action()
  }
}

// Event handlers específicos para video de YouTube
const onVideoLoaded = () => {
  console.log('✅ Video de YouTube cargado correctamente:', hotelYouTubeId.value)
  
  // Mostrar notificación opcional (después de 3 segundos)
  setTimeout(() => {
    if (!localStorage.getItem('hotel-youtube-notification-shown')) {
      showVideoNotification.value = true
      localStorage.setItem('hotel-youtube-notification-shown', 'true')
    }
  }, 3000)
  
  // Notificación toast sutil
  $q.notify({
    type: 'positive',
    message: 'Video tour cargado desde YouTube',
    position: 'top-right',
    timeout: 2000,
    icon: 'smart_display',
    actions: [
      {
        icon: 'open_in_new',
        color: 'white',
        handler: () => {
          window.open(`https://www.youtube.com/watch?v=${hotelYouTubeId.value}`, '_blank')
        }
      }
    ]
  })
}

const onVideoError = (error) => {
  console.error('❌ Error al cargar el video de YouTube:', error)
  
  // Notificación de error discreta
  $q.notify({
    type: 'warning',
    message: 'Video no disponible, mostrando imagen',
    position: 'top-right',
    timeout: 3000,
    icon: 'image',
    actions: [
      {
        label: 'Ver en YouTube',
        color: 'white',
        handler: () => {
          window.open(`https://www.youtube.com/watch?v=${hotelYouTubeId.value}`, '_blank')
        }
      }
    ]
  })
}

const onVideoPlay = () => {
  console.log('▶️ Video de YouTube reproduciendo')
  
  // Analytics opcional
  if (typeof gtag !== 'undefined') {
    gtag('event', 'video_play', {
      video_platform: 'youtube',
      video_id: hotelYouTubeId.value
    })
  }
}

const onVideoPause = () => {
  console.log('⏸️ Video de YouTube pausado')
  
  // Analytics opcional
  if (typeof gtag !== 'undefined') {
    gtag('event', 'video_pause', {
      video_platform: 'youtube',
      video_id: hotelYouTubeId.value
    })
  }
}

const onScrollToContent = () => {
  console.log('📜 Scroll to content triggered')
  
  // Analytics opcional
  if (typeof gtag !== 'undefined') {
    gtag('event', 'scroll_indicator_click', {
      has_youtube_video: !!hotelYouTubeId.value
    })
  }
}

// Funciones de configuración de video (solo desarrollo)
const applyVideoConfig = () => {
  if (videoConfig.value.youtubeId) {
    hotelYouTubeId.value = videoConfig.value.youtubeId
  } else if (videoConfig.value.youtubeUrl) {
    hotelYouTubeUrl.value = videoConfig.value.youtubeUrl
  }
  
  showVideoConfig.value = false
  
  $q.notify({
    type: 'positive',
    message: 'Configuración de video aplicada',
    position: 'top',
    timeout: 2000
  })
}

// Funciones de utilidad
const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}

const validateYouTubeId = (id) => {
  return /^[a-zA-Z0-9_-]{11}$/.test(id)
}

// Computeds
const currentYouTubeUrl = computed(() => {
  const id = hotelYouTubeId.value || extractYouTubeId(hotelYouTubeUrl.value)
  return id ? `https://www.youtube.com/watch?v=${id}` : ''
})

// Watchers
watch([hotelYouTubeId, hotelYouTubeUrl], ([newId, newUrl]) => {
  const finalId = newId || extractYouTubeId(newUrl)
  
  if (finalId && !validateYouTubeId(finalId)) {
    console.warn('⚠️ ID de YouTube inválido:', finalId)
    $q.notify({
      type: 'warning',
      message: 'ID de YouTube inválido',
      position: 'top',
      timeout: 3000
    })
  }
}, { immediate: true })

// Lifecycle hooks
onMounted(() => {
  // Verificar configuración de video
  const finalId = hotelYouTubeId.value || extractYouTubeId(hotelYouTubeUrl.value)
  
  if (!finalId) {
    console.warn('⚠️ No se ha configurado ningún video de YouTube')
    if (isDevelopment.value) {
      $q.notify({
        type: 'info',
        message: 'Configura un video de YouTube para el hero',
        position: 'top',
        timeout: 5000,
        actions: [
          {
            label: 'Configurar',
            color: 'white',
            handler: () => {
              showVideoConfig.value = true
            }
          }
        ]
      })
    }
  } else {
    console.log('🎬 Video de YouTube configurado:', finalId)
    console.log('🔗 URL completa:', currentYouTubeUrl.value)
  }
  
  // Mostrar ejemplos disponibles en desarrollo
  if (isDevelopment.value) {
    console.log('🎥 Videos de ejemplo disponibles:', hotelVideoExamples)
  }
})
</script>

<style scoped>
.cta-section {
  background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23D4A574" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%238B4513" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.cta-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Hover effects para botones CTA */
.cta-actions .q-btn {
  transition: all 0.3s ease;
}

.cta-actions .q-btn:hover {
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .cta-section h2 {
    font-size: 1.8rem;
  }

  .cta-section p {
    font-size: 1rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-actions .q-btn {
    width: 250px;
    margin: 0.25rem 0;
  }
}

@media (max-width: 480px) {
  .cta-section {
    padding: 2rem 1rem;
  }
  
  .cta-actions .q-btn {
    width: 220px;
  }
}

/* Animaciones sutiles */
.cta-container {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Indicador de YouTube */
.youtube-indicator {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>