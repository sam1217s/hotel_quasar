<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-section q-pa-sm overflow-hidden">
      <div class="hero-content text-center q-pa-xl">
        <div class="hero-badge q-mb-md">
          <q-chip icon="restaurant" color="amber-8" text-color="white" label="Cuisine Certificada" />
        </div>
        <h1 class="text-h2 text-orange q-mb-md">Restaurantes y Bares</h1>
        <p class="text-h6 text-white-6 q-mb-xl">Fusión Caribeña • Técnicas Francesas • Experiencia Culinaria</p>
        <div class="hero-actions">
          <q-btn size="lg" color="orange-8" label="Reservar Mesa" to="/Contacto" outline class="q-mr-md q-mb-sm" unelevated />
          <q-btn size="lg" color="white-8" label="Ver Menús" outline class="q-mb-sm" @click="scrollToRestaurants" />
        </div>
      </div>
    </section>

    <!-- Features Carousel Section -->
    <section class="q-pa-xl" ref="restaurantsSection">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange">Experiencias Gastronómicas</h2>
        <p class="text-h6 text-grey-6">Sabores auténticos del Caribe con la sofisticación de la cocina francesa</p>
      </div>

      <div class="carousel-container">
        <q-carousel 
          ref="carousel" 
          v-model="currentSlide" 
          animated 
          arrows 
          navigation 
          infinite 
          autoplay
          :autoplay-delay="5000" 
          height="500px" 
          class="features-carousel"
        >
          <q-carousel-slide 
            v-for="restaurant in restaurants" 
            :key="restaurant.id" 
            :name="restaurant.id"
            class="carousel-slide flex flex-center"
          >
            <div class="fit flex flex-center">
              <q-card class="feature-card-carousel text-center" flat>
                <q-card-section class="q-pa-s">
                  <q-icon :name="restaurant.icon" size="4.5rem" :color="restaurant.color" class="q-mb-lg" />
                  <h3 class="text-h4 text-grey-8 q-mb-md">{{ restaurant.name }}</h3>
                  <p class="text-h6 text-grey-6 q-mb-lg" style="max-width: 450px; margin: 0 auto;">
                    {{ restaurant.description }}
                  </p>
                  <div class="restaurant-details q-mb-lg">
                    <div class="text-subtitle2 text-grey-7 q-mb-sm">{{ restaurant.hours }}</div>
                    <q-chip 
                      v-for="feature in restaurant.features" 
                      :key="feature"
                      :color="restaurant.color" 
                      text-color="white" 
                      size="sm" 
                      :label="feature" 
                      class="q-mr-xs q-mb-xs" 
                    />
                  </div>
                  <q-btn 
                    unelevated 
                    size="lg" 
                    :color="restaurant.color" 
                    :label="restaurant.buttonText" 
                    to="/Contacto"
                    class="q-mt-md q-px-lg" 
                  />
                </q-card-section>
              </q-card>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section bg-amber-8 text-white q-pa-xl">
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
    <section class="q-pa-xl bg-black-6">
      <div class="text-center q-mb-xl">
        <h2 class="text-h3 text-orange-8">Especialidades Culinarias</h2>
        <p class="text-h6 text-white-3">Platos signature que definen nuestra cocina de autor</p>
      </div>

      <div class="carousel-3d-container">
        <div class="carousel-3d" ref="carousel3d">
          <div 
            v-for="(highlight, index) in highlights3d" 
            :key="highlight.id" 
            class="carousel-3d-item"
            :style="{ transform: `rotateY(${index * 45}deg) translateZ(450px)` }"
            @click="navigateToContact"
          >
            <q-card class="highlight-3d-card cursor-pointer">
              <q-img :src="highlight.image" height="180px" class="highlight-image" />
              <q-card-section class="text-center q-pa-md">
                <div class="text-h6 text-grey-8 text-weight-medium">{{ highlight.title }}</div>
                <q-icon name="touch_app" size="sm" color="amber" class="click-indicator q-mt-xs" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>

    <!-- Chef Section -->
    <section class="chef-section q-pa-xl bg-grey-1">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-grey-8">Nuestros Chefs</h2>
        <p class="text-h6 text-grey-6">Maestros culinarios con reconocimiento internacional</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="chef in chefs" :key="chef.id" class="col-md-3 col-sm-6 col-xs-12">
          <q-card class="chef-card text-center" flat bordered>
            <q-img :src="chef.image" height="200px" class="chef-image" />
            <q-card-section class="q-pa-lg">
              <div class="text-h6 text-grey-8 q-mb-sm">{{ chef.name }}</div>
              <div class="text-subtitle2 text-amber-8 q-mb-sm">{{ chef.position }}</div>
              <div class="text-body2 text-grey-6 q-mb-md">{{ chef.description }}</div>
              <q-chip 
                v-for="specialty in chef.specialties" 
                :key="specialty"
                color="amber-1" 
                text-color="amber-8" 
                size="sm" 
                :label="specialty" 
                class="q-mr-xs q-mb-xs" 
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Wine Section -->
    <section class="wine-section q-pa-xl bg-brown-9 text-white">
      <div class="text-center q-mb-xl">
        <h2 class="text-h4 text-white">Cava de Vinos</h2>
        <p class="text-h6 text-grey-4">Selección excepcional de vinos del mundo</p>
      </div>
      
      <div class="row q-gutter-lg justify-center">
        <div v-for="wine in wineCollections" :key="wine.id" class="col-md-4 col-sm-6 col-xs-12">
          <q-card class="wine-card" dark>
            <q-card-section class="text-center q-pa-lg">
              <q-icon :name="wine.icon" size="3rem" :color="wine.color" class="q-mb-md" />
              <div class="text-h6 text-white q-mb-sm">{{ wine.name }}</div>
              <div class="text-body2 text-grey-4">{{ wine.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section q-pa-xl text-center">
      <h2 class="text-h3 text-grey-8 q-mb-md">Reserve su Mesa</h2>
      <p class="text-h6 text-grey-6 q-mb-xl">Viva una experiencia gastronómica inolvidable en el corazón de Cartagena</p>
      <q-btn 
        size="lg" 
        color="amber-8" 
        text-color="white" 
        label="Reservar Ahora" 
        to="/Contacto" 
        unelevated
        class="q-px-xl" 
      />
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
const restaurantsSection = ref(null)
let rotation = 0
let animationId = null

const restaurants = ref([
  {
    id: 1,
    icon: 'restaurant',
    color: 'brown-7',
    name: 'El Claustro',
    description: 'Restaurante principal que fusiona la cocina caribeña con técnicas francesas contemporáneas en un ambiente colonial único',
    hours: 'Desayuno: 6:30-10:30 • Almuerzo: 12:30-15:00 • Cena: 19:00-23:00',
    features: ['Cuisine Francesa', 'Sabores Caribeños', 'Chef Internacional', 'Ambiente Colonial'],
    buttonText: 'Reservar Mesa'
  },
  {
    id: 2,
    icon: 'wine_bar',
    color: 'amber-8',
    name: 'Terraza Sunset',
    description: 'Bar terraza con vista panorámica al atardecer caribeño, cócteles artesanales y tapas gourmet',
    hours: 'Abierto: 17:00-02:00 • Happy Hour: 17:00-19:00',
    features: ['Cócteles Artesanales', 'Vista Panorámica', 'Tapas Gourmet', 'Música en Vivo'],
    buttonText: 'Ver Carta'
  },
  {
    id: 3,
    icon: 'coffee',
    color: 'orange-8',
    name: 'Café Colonial',
    description: 'Espacio íntimo para desayunos especiales, café de especialidad colombiano y repostería francesa artesanal',
    hours: 'Abierto: 6:00-11:00 • Café todo el día: 6:00-22:00',
    features: ['Café Colombiano', 'Repostería Francesa', 'Desayunos Gourmet', 'Ambiente Íntimo'],
    buttonText: 'Degustar'
  },
  {
    id: 4,
    icon: 'pool',
    color: 'blue-6',
    name: 'Pool Bar',
    description: 'Bar acuático junto a la piscina infinity con cócteles tropicales frescos y comida ligera mediterránea',
    hours: 'Abierto: 10:00-20:00 • Servicio de piscina: 10:00-18:00',
    features: ['Cócteles Tropicales', 'Comida Ligera', 'Vista al Mar', 'Ambiente Relajado'],
    buttonText: 'Refrescarse'
  },
  {
    id: 5,
    icon: 'celebration',
    color: 'purple-6',
    name: 'Salón Privado',
    description: 'Comedor privado para eventos especiales con menú personalizado y servicio de sommelier exclusivo',
    hours: 'Disponible: 24/7 • Reserva previa requerida',
    features: ['Menú Personalizado', 'Sommelier Privado', 'Eventos Exclusivos', 'Servicio 24/7'],
    buttonText: 'Consultar'
  }
])

const stats = ref([
  { id: 1, number: '5', label: 'Restaurantes y Bares' },
  { id: 2, number: '3', label: 'Chefs Internacionales' },
  { id: 3, number: '500+', label: 'Vinos Seleccionados' },
  { id: 4, number: '★★★★★', label: 'Gastronomía de Lujo' }
])

const highlights3d = ref([
  {
    id: 1,
    title: 'Arroz con Coco',
    description: 'Plato signature con mariscos frescos del Caribe',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Pescado en Salsa Criolla',
    description: 'Pargo rojo con salsa tradicional cartagenera',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Ceviche Tropical',
    description: 'Ceviche de pescado con frutas tropicales',
    image: 'https://images.unsplash.com/photo-1551982324-5cc84d81025b?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Langosta Termidor',
    description: 'Langosta del Caribe preparada al estilo francés',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Soufflé de Maracuyá',
    description: 'Postre signature con frutas del trópico',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Cóctail de Coco',
    description: 'Bebida tropical con ron añejo colombiano',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=400&fit=crop'
  },
  {
    id: 7,
    title: 'Menú Degustación',
    description: '7 tiempos que narran la historia culinaria caribeña',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop'
  },
  {
    id: 8,
    title: 'Experiencia Sommelier',
    description: 'Maridaje exclusivo de vinos y cocina local',
    image: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=600&h=400&fit=crop'
  }
])

const chefs = ref([
  {
    id: 1,
    name: 'Pierre Dubois',
    position: 'Chef Ejecutivo',
    description: 'Chef francés con 20 años de experiencia en cocina de autor y fusión caribeña',
    specialties: ['Cuisine Francesa', 'Fusión Caribeña', 'Mariscos'],
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Carmen Valdez',
    position: 'Chef Pastelera',
    description: 'Especialista en repostería francesa con toques tropicales y presentaciones artísticas',
    specialties: ['Repostería Francesa', 'Postres Tropicales', 'Arte Culinario'],
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba669b6?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Miguel Santos',
    position: 'Chef de Cocina Caribeña',
    description: 'Experto en sabores tradicionales del Caribe con técnicas culinarias modernas',
    specialties: ['Cocina Caribeña', 'Mariscos Frescos', 'Tradición Local'],
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Sophie Laurent',
    position: 'Sommelier Ejecutiva',
    description: 'Sommelier certificada especializada en maridajes entre vinos franceses y cocina caribeña',
    specialties: ['Vinos Franceses', 'Maridajes', 'Cata de Vinos'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
  }
])

const wineCollections = ref([
  {
    id: 1,
    name: 'Vinos Franceses',
    description: 'Selección premium de las mejores regiones vinícolas de Francia',
    icon: 'wine_bar',
    color: 'purple'
  },
  {
    id: 2,
    name: 'Vinos Sudamericanos',
    description: 'Colección de vinos argentinos, chilenos y colombianos de alta gama',
    icon: 'public',
    color: 'red'
  },
  {
    id: 3,
    name: 'Champagnes',
    description: 'Champagnes y espumosos para celebraciones especiales',
    icon: 'celebration',
    color: 'amber'
  }
])

const animate3DCarousel = () => {
  rotation += 0.1
  if (carousel3d.value) {
    carousel3d.value.style.transform = `rotateY(${rotation}deg)`
  }
  animationId = requestAnimationFrame(animate3DCarousel)
}

const navigateToContact = () => {
  router.push('/Contacto')
}

const scrollToRestaurants = () => {
  if (restaurantsSection.value) {
    restaurantsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  animate3DCarousel()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
/* Hero Section */
.hero-section {
  display: flex;
  background-image: url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop");
  background-size: cover;
  background-position: center;
  height: 94vh;
}

.hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.644);
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

.overflow-hidden {
  overflow-x: hidden;
}

/* Carrusel */
.carousel-container {
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  background: #000000;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgb(255, 255, 255);
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

.restaurant-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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
  background: #ffc107;
  color: white;
  transform: scale(1.3);
  box-shadow: 0 0 15px rgba(255, 193, 7, 0.5);
}

.features-carousel .q-carousel__navigation .q-btn:hover {
  background: rgba(255, 255, 255, 0.7);
  transform: scale(1.1);
}

/* Flechas del carrusel */
.features-carousel .q-carousel__arrow {
  background: rgba(255, 255, 255, 0.95);
  color: #ffc107;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
}

.features-carousel .q-carousel__arrow:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  border-color: #ffc107;
}

/* Stats */
.stats-section {
  background: linear-gradient(135deg, #ffc107, #ffb300);
}

.stat-item {
  padding: 20px;
}

/* Chef Cards */
.chef-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.chef-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.chef-image {
  filter: grayscale(20%);
  transition: filter 0.3s ease;
}

.chef-card:hover .chef-image {
  filter: grayscale(0%);
}

/* Wine Cards */
.wine-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.wine-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

/* CTA Section */
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
  background: radial-gradient(ellipse at center, rgba(255, 193, 7, 0.1) 0%, transparent 70%);
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
  border: 1px solid rgba(255, 193, 7, 0.2);
}

.highlight-3d-card:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 193, 7, 0.6);
  z-index: 10;
}

.highlight-image {
  transition: transform 0.3s ease;
}

.highlight-3d-card:hover .highlight-image {
  transform: scale(1.05);
}

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

.click-indicator {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.highlight-3d-card:hover .click-indicator {
  opacity: 1;
  transform: scale(1.2);
  color: #ffc107;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-actions .q-btn {
    width: 200px;
  }

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