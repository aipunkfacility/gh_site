<script setup>
import { useToursStore } from '@/stores/tours'
import TourCard from '@/components/tours/TourCard.vue'

const store = useToursStore()
const tours = store.getAllTours
</script>

<template>
  <div class="tours-page">
    <div class="container">
      <h1 class="page-title">Наши туры</h1>
      
      <div v-if="tours.length > 0" class="grid-3">
        <div v-for="tour in tours" :key="tour.id" class="tour-item">
          <TourCard :tour="tour" />
        </div>
      </div>
      
      <div v-else class="empty-state">
        <p>Туры пока не добавлены.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  margin: 2rem 0;
  font-size: 2.5rem;
  text-align: center;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding-bottom: 4rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-gray);
}
</style>
