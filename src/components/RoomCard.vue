<template>
  <q-card flat bordered class="room-card">
    <q-img
      :src="room.image"
      :ratio="16/9"
      class="room-image"
    >
      <div class="absolute-bottom text-subtitle1 text-center">
        {{ room.name }}
      </div>
    </q-img>

    <q-card-section>
      <div class="text-caption text-grey-7">{{ room.description }}</div>
      
      <div class="q-mt-sm">
        <q-chip
          v-for="(amenity, index) in room.amenities.slice(0, 3)"
          :key="index"
          dense
          color="grey-3"
          text-color="brown-7"
          size="sm"
          class="q-mr-xs q-mb-xs"
        >
          {{ amenity }}
        </q-chip>
      </div>
    </q-card-section>

    <q-separator />

    <q-card-actions class="justify-between items-center">
      <div>
        <div class="text-h6 text-brown-7">{{ room.price }}</div>
        <div class="text-caption">por noche</div>
      </div>
      
      <div>
        <q-rating
          v-model="room.rating"
          size="sm"
          color="brown-7"
          readonly
        />
        <q-btn
          color="brown-7"
          label="Reservar"
          to="/Reservas"
          dense
          no-caps
          @click.stop="$emit('reserve', room)"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineProps({
  room: {
    type: Object,
    required: true
  }
})

defineEmits(['reserve'])
</script>

<style scoped>
.room-card {
  transition: all 0.3s;
  height: 100%;
}

.room-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.room-image {
  border-radius: 4px 4px 0 0;
}
</style>