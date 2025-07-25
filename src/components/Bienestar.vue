<template>
  <div class="q-pa-md">
    <div class="text-center q-mb-xl q-pa-lg">
      <h2 class="text-h3 text-orange">Spa y Bienestar</h2>
      <p class="text-h6 text-grey-7">Relajación y rejuvenecimiento en un ambiente sereno</p>
    </div>

    <div class="row q-gutter-lg">
      <div v-for="service in services" :key="service.id" class="col-md-6 col-xs-12">
        <q-card class="wellness-card">
          <q-img :src="service.image" height="300px" />
          <q-card-section>
            <div class="text-h5 text-teal-8">{{ service.name }}</div>
            <div class="text-body1 q-mt-sm">{{ service.description }}</div>
            <div class="text-subtitle2 text-positive q-mt-sm">{{ service.hours }}</div>
            <div class="q-mt-md">
              <q-chip 
                v-for="feature in service.features" 
                :key="feature"
                color="teal-1" 
                text-color="teal-8" 
                size="sm" 
                :label="feature" 
                class="q-mr-xs q-mb-xs" 
              />
            </div>
          </q-card-section>
          <q-card-actions>
            <q-btn color="teal" label="Ver Detalles" />
            <q-btn flat color="teal" label="Reservar Cita" to="/Contacto" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Sección adicional de instalaciones -->
    <div class="q-mt-xl">
      <div class="text-center q-mb-lg">
        <h3 class="text-h4 text-grey-8">Instalaciones Adicionales</h3>
      </div>
      
      <div class="row q-gutter-md">
        <div v-for="facility in facilities" :key="facility.id" class="col-md-4 col-sm-6 col-xs-12">
          <q-card class="facility-card" flat bordered>
            <q-card-section class="text-center">
              <q-icon :name="facility.icon" size="3rem" :color="facility.color" class="q-mb-md" />
              <div class="text-h6 text-grey-8">{{ facility.name }}</div>
              <div class="text-body2 text-grey-6 q-mt-sm">{{ facility.description }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="text-center q-mt-xl">
      <q-btn 
        color="teal" 
        size="lg" 
        label="Reservar Tratamiento"
        to="/Contacto"
        unelevated
        class="q-px-xl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const services = ref([
  {
    id: 1,
    name: 'Spa Colonial',
    description: 'Tratamientos inspirados en antiguas tradiciones caribeñas con técnicas modernas de relajación y bienestar',
    hours: 'Abierto: 8:00 AM - 9:00 PM',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
    features: ['Masajes', 'Faciales', 'Aromaterapia', 'Tratamientos corporales']
  },
  {
    id: 2,
    name: 'Fitness Center',
    description: 'Gimnasio completamente equipado con vista al mar Caribe y entrenadores personalizados',
    hours: 'Abierto: 24 horas',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600',
    features: ['Gimnasio 24/7', 'Yoga', 'Pilates', 'Entrenador personal']
  },
  {
    id: 3,
    name: 'Piscina Infinity',
    description: 'Piscina infinita con vista panorámica al mar Caribe, ideal para relajación y natación',
    hours: 'Abierto: 6:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
    features: ['Vista al mar', 'Jacuzzi', 'Bar de piscina', 'Área de descanso']
  },
  {
    id: 4,
    name: 'Salón de Belleza',
    description: 'Servicios completos de belleza y cuidado personal con productos premium internacionales',
    hours: 'Abierto: 9:00 AM - 7:00 PM',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600',
    features: ['Corte y peinado', 'Manicure', 'Pedicure', 'Maquillaje']
  }
])

const facilities = ref([
  {
    id: 1,
    name: 'Sauna',
    description: 'Sauna finlandés con esencias naturales',
    icon: 'spa',
    color: 'orange'
  },
  {
    id: 2,
    name: 'Vapor',
    description: 'Baño de vapor con aromaterapia',
    icon: 'waves',
    color: 'blue'
  },
  {
    id: 3,
    name: 'Meditación',
    description: 'Sala de meditación y yoga',
    icon: 'self_improvement',
    color: 'purple'
  },
  {
    id: 4,
    name: 'Relajación',
    description: 'Área de descanso post-tratamiento',
    icon: 'weekend',
    color: 'green'
  },
  {
    id: 5,
    name: 'Hidromasaje',
    description: 'Tinas de hidromasaje terapéutico',
    icon: 'hot_tub',
    color: 'teal'
  },
  {
    id: 6,
    name: 'Terraza Zen',
    description: 'Espacio al aire libre para relajación',
    icon: 'nature',
    color: 'light-green'
  }
])
</script>

<style scoped>
.wellness-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wellness-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.facility-card {
  transition: transform 0.3s ease;
  height: 100%;
}

.facility-card:hover {
  transform: translateY(-3px);
}
</style>