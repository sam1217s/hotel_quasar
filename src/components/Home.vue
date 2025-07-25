<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section q-pa-sm overflow-hidden">
      <div></div>
      <div class="hero-content text-center q-pa-xl">
        <div class="hero-badge q-mb-md">
          <q-chip icon="eco" color="positive" text-color="white" label="Green Key Certified" />
        </div>
        <h1 class="text-h2 text-orange q-mb-md">Sofitel Legend Santa Clara</h1>
        <p class="text-h6 text-white-6 q-mb-xl">Convento del siglo XVII • Lujo Caribeño • Cartagena de Indias</p>
        <div class="hero-actions">
          <q-btn size="lg" color="orange-8" label="Reservar Ahora" to="/Contacto" outline class="q-mr-md q-mb-sm"
            unelevated />
          <q-btn size="lg" color="white-8" label="Descubrir Hotel" to="/Habitaciones" outline class="q-mb-sm" />
        </div>
      </div>
    </section>


    <!-- Hero Image -->
    <!-- <section class="hero-image-section">
      <q-img 
        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop"
        height="80vh"
        class="hero-image"
      />
    </section> -->

    <!-- Features Carousel Section -->
    <section class="q-pa-xl">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange">Experiencia Única</h2>
        <p class="text-h6 text-grey-6">Descubra la magia de un convento del siglo XVII convertido en hotel de lujo</p>
      </div>

      <div class="carousel-container">
        <q-carousel ref="carousel" v-model="currentSlide" animated arrows navigation infinite autoplay
          :autoplay-delay="3000" height="500px" class="features-carousel">
          <q-carousel-slide v-for="feature in features" :key="feature.id" :name="feature.id"
            class="carousel-slide flex flex-center">
            <div class="fit flex flex-center">
              <q-card class="feature-card-carousel text-center" flat>
                <q-card-section class="q-pa-s">
                  <q-icon :name="feature.icon" size="4.5rem" :color="feature.color" class="q-mb-lg" />
                  <h3 class="text-h4 text-grey-8 q-mb-md">{{ feature.title }}</h3>
                  <p class="text-h6 text-grey-6 q-mb-lg" style="max-width: 450px; margin: 0 auto;">{{
                    feature.description }}</p>
                  <q-btn unelevated size="lg" :color="feature.color" :label="feature.buttonText" :to="feature.route"
                    class="q-mt-md q-px-lg" />
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section bg-brown-7 text-white q-pa-xl">
      <div class="row text-center">
        <div v-for="stat in stats" :key="stat.id" class="col-lg-3 col-md-6 col-sm-6 col-xs-12 q-mb-lg">
          <div class="stat-item">
            <div class="text-h3 text-weight-light q-mb-sm">{{ stat.number }}</div>
            <div class="text-body1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights 3D Carousel Section -->
    <section class="q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-grey-8">Aspectos Destacados</h2>
        <p class="text-h6 text-grey-6">Lo que hace especial su estadía en nuestro hotel</p>
      </div>

      <div class="carousel-3d-container">
        <div class="carousel-3d" ref="carousel3d">
          <div v-for="(highlight, index) in highlights3d" :key="highlight.id" class="carousel-3d-item"
            :style="{ transform: `rotateY(${index * 45}deg) translateZ(450px)` }"
            @click="navigateToHighlight(highlight.route)">
            <q-card class="highlight-3d-card cursor-pointer">
              <q-img :src="highlight.image" height="180px" class="highlight-image" />
              <q-card-section class="text-center q-pa-md">
                <div class="text-h6 text-grey-8 text-weight-medium">{{ highlight.title }}</div>
                <q-icon name="touch_app" size="sm" color="brown-7" class="click-indicator q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">Reserve su Experiencia</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Viva la magia de un convento del siglo XVII convertido en hotel de lujo</p>
      <q-btn size="lg" color="black" text-color="orange-8" label="Contactar Ahora" to="/Contacto" unelevated
        class="q-px-xl" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentSlide = ref(1)
const carousel = ref(null)
const carousel3d = ref(null)
let rotation = 0
let animationId = null

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
    icon: 'eco',
    color: 'positive',
    title: 'Sostenibilidad',
    description: 'Primer hotel de lujo en Colombia con certificación Green Key, cuidando el medio ambiente',
    buttonText: 'Conocer Más',
    route: '/Contacto'
  }
])

const stats = ref([
  { id: 1, number: 'XVII', label: 'Siglo de Historia' },
  { id: 2, number: '122', label: 'Habitaciones y Suites' },
  { id: 3, number: '3', label: 'Restaurantes Únicos' },
  { id: 4, number: '★★★★★', label: 'Lujo Certificado' }
])

const highlights3d = ref([
  {
    id: 1,
    title: 'Arquitectura Colonial',
    description: 'Descubra la historia de nuestro convento del siglo XVII perfectamente conservado con elementos originales únicos',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
    tags: ['Historia', 'Arquitectura', 'Patrimonio'],
    buttonText: 'Ver Historia',
    route: '/Contacto'
  },
  {
    id: 2,
    title: 'Ubicación Privilegiada',
    description: 'En el corazón del Centro Histórico de Cartagena, Patrimonio de la Humanidad UNESCO',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    tags: ['Centro Histórico', 'UNESCO', 'Ubicación'],
    buttonText: 'Ver Ubicación',
    route: '/Contacto'
  },
  {
    id: 3,
    title: 'Experiencia Premium',
    description: 'Servicios exclusivos de lujo con atención personalizada las 24 horas del día',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&h=400&fit=crop',
    tags: ['Lujo', 'Servicio', 'Premium'],
    buttonText: 'Conocer Servicios',
    route: '/Contacto'
  },
  {
    id: 4,
    title: 'Cultura Caribeña',
    description: 'Inmersión total en la cultura y tradiciones del Caribe colombiano con actividades exclusivas',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    tags: ['Cultura', 'Tradición', 'Caribe'],
    buttonText: 'Explorar Cultura',
    route: '/Contacto'
  },
  {
    id: 5,
    title: 'Gastronomía de Clase Mundial',
    description: 'Chefs reconocidos internacionalmente crean experiencias culinarias únicas fusionando sabores locales',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    tags: ['Gastronomía', 'Chef', 'Internacional'],
    buttonText: 'Ver Restaurantes',
    route: '/Restaurantes'
  },
  {
    id: 6,
    title: 'Bienestar y Spa',
    description: 'Tratamientos ancestrales caribeños combinados con técnicas modernas de relajación y rejuvenecimiento',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop',
    tags: ['Spa', 'Bienestar', 'Relajación'],
    buttonText: 'Reservar Spa',
    route: '/Bienestar'
  },
  {
    id: 7,
    title: 'Actividades Exclusivas',
    description: 'Experiencias únicas como tours privados, clases de cocina, y actividades náuticas de lujo',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
    tags: ['Actividades', 'Exclusivo', 'Experiencias'],
    buttonText: 'Ver Actividades',
    route: '/Contacto'
  },
  {
    id: 8,
    title: 'Arte y Decoración',
    description: 'Colección de arte colonial y contemporáneo que decora cada espacio con piezas únicas y originales',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    tags: ['Arte', 'Decoración', 'Colección'],
    buttonText: 'Conocer Arte',
    route: '/Contacto'
  }
])

const animate3DCarousel = () => {
  rotation += 0.1
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
  animationId = requestAnimationFrame(animate3DCarousel)
}

const navigateToHighlight = (route) => {
  router.push(route)
}

onMounted(() => {
  // Iniciar animación del carrusel 3D
  animate3DCarousel()
  console.log('Carrusel 3D iniciado')
})

onUnmounted(() => {
  // Limpiar animación al desmontar
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.hero-section {
  display: flex;
  background-image: url("https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=600&fit=crop");
  background-size: cover;
  background-position: center;
  height: 94vh;
}
.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.644); /* gris claro con transparencia */
  padding: 2rem;
  border-radius: 30px;
  max-width: 800px;
  margin: auto;
  
}

.hero-badge {
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-image {
  width: 100%;
}

.feature-card {
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Prevenir scroll horizontal */
.overflow-hidden {
  overflow-x: hidden;
}

/* Estilos del carrusel */
.carousel-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background: #000000;
  border-radius: 15px;
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

/* Navegación del carrusel */
.features-carousel .q-carousel__navigation {
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn {
  background: rgba(255, 255, 255, 0.4);
  color: white;
  margin: 0 6px;
  min-width: 12px;
  min-height: 12px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.features-carousel .q-carousel__navigation .q-btn--active {
  background: #d4af37;
  color: white;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

/* Flechas del carrusel */
.features-carousel .q-carousel__arrow {
  background: rgba(255, 255, 255, 0.95);
  color: #8D4513;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
}

.features-carousel .q-carousel__arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  border-color: #8D4513;
}

.stats-section {
  background: linear-gradient(135deg, #8D4513, #A0522D);
}

.stat-item {
  padding: 20px;
}

.highlight-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.highlight-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.cta-section {
  background: #fafafa;
}

/* Carrusel 3D */
.carousel-3d-container {
  perspective: 1800px;
  height: 420px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
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
  width: 240px;
  height: 300px;
  left: 80px;
  top: 25px;
  transform-origin: center;
  backface-visibility: hidden;
}

.highlight-3d-card {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  background: white;
  border: 1px solid rgba(212, 175, 55, 0.2);
}

.highlight-3d-card:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(212, 175, 55, 0.6);
  z-index: 10;
}

.highlight-image {
  transition: transform 0.3s ease;
}

.highlight-3d-card:hover .highlight-image {
  transform: scale(1.05);
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
  color: #d4af37;
}

/* Animación de rotación suave */
@keyframes rotate3d {
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
}

@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-actions .q-btn {
    width: 200px;
  }

  /* Responsive para carrusel */
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

  .features-carousel .q-carousel__arrow {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }

  .features-carousel .q-carousel__navigation .q-btn {
    min-width: 8px;
    min-height: 8px;
    margin: 0 3px;
  }
}
</style>