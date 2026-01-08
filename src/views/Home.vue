<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Benefits Section -->
    <BenefitsSection />
    
    <!-- Popular Tours Section -->
    <section class="section section--gray">
      <div class="container">
        <h2 class="section-title">Популярные экскурсии</h2>
        <div v-if="toursStore.isLoading" class="loading">
          <p>Загрузка туров...</p>
        </div>
        <div v-else-if="toursStore.tours.length > 0" class="cards-grid">
          <TourCard 
            v-for="tour in toursStore.tours.slice(0, 4)"
            :key="tour.id"
            :tour="tour"
          />
        </div>
        <div v-else class="no-tours">
          <p>Туры не найдены</p>
        </div>
        
        <div class="text-center" style="margin-top: 32px;">
          <RouterLink to="/tours" class="btn btn--secondary">
            Смотреть все туры
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useToursStore } from '@stores/tours.js';
import HeroSection from '@components/home/HeroSection.vue';
import BenefitsSection from '@components/home/BenefitsSection.vue';
import TourCard from '@components/tours/TourCard.vue';

const toursStore = useToursStore();

onMounted(() => {
  toursStore.fetchTours();
});
</script>

<style scoped>
.home {
  width: 100%;
}

.loading,
.no-tours {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-gray);
  font-size: 18px;
}

.text-center {
  text-align: center;
}
</style>
