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
          <!-- Простое отображение, если TourCard сломан -->
          <div class="card">
            <div class="card__body">
              <h3>{{ tour.title }}</h3>
              <p>{{ tour.description }}</p>
              <div class="card__footer">
                <span class="price">{{ tour.price }}</span>
                <span class="duration">{{ tour.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <p>Туры пока не добавлены.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.card__body {
  padding: 1.5rem;
}
.card__footer {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: var(--primary-color, #2c3e50);
}
</style>
