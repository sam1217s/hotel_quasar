<template>
  <div class="q-pa-md">
    <div class="text-center q-mb-xl q-pa-lg">
      <h2 class="text-h3 text-orange">Restaurantes y Bares</h2>
      <p class="text-h6 text-grey-7">Fusión caribeña con delicadeza francesa</p>
    </div>

    <div class="row q-gutter-lg">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-6 col-xs-12">
        <q-card class="restaurant-card">
          <q-img :src="restaurant.image" height="300px" />
          <q-card-section>
            <div class="text-h5 text-brown-7">{{ restaurant.name }}</div>
            <div class="text-body1 q-mt-sm">{{ restaurant.description }}</div>
            <div class="text-subtitle2 text-positive q-mt-sm">{{ restaurant.hours }}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn color="orange" label="Ver Menú" />
            <q-btn flat color="orange" label="Reservar Mesa" to="/Contacto" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const restaurants = ref([
  {
    id: 1,
    name: 'Restaurante Principal',
    description: 'Cocina caribeña con técnicas francesas contemporáneas',
    hours: 'Abierto: 7:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600'
  },
  {
    id: 2,
    name: 'Bar Terrace',
    description: 'Cócteles artesanales con vista al atardecer caribeño',
    hours: 'Abierto: 5:00 PM - 2:00 AM',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600'
  }
])
</script>

<style scoped>
.restaurant-card {
  transition: transform 0.3s ease;
}

.restaurant-card:hover {
  transform: translateY(-5px);
}
</style>