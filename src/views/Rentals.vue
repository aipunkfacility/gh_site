<!-- src/views/Rentals.vue -->
<template>
  <div class="rentals">
    <section class="section">
      <div class="container">
        <h1 class="section-title">Аренда транспорта</h1>
        <p class="text-center rentals-intro">
          Весь парк обслужен, проверен и готов к поездкам. Шлемы предоставляем. 
          Выбирайте под свои задачи:
        </p>

        <!-- Bikes by Category -->
        <div v-for="category in bikeCategories" :key="category.id" class="bikes-section">
          <h2 class="rentals-category">{{ category.emoji }} {{ category.title }}</h2>
          <p class="rentals-intro">{{ category.description }}</p>
          
          <div class="bikes-grid">
            <BikeCard
              v-for="bike in getBikesByCategory(category.id)"
              :key="bike.id"
              :bike="bike"
            />
          </div>
        </div>

        <!-- Car Rental -->
        <div class="cars-section">
          <h2 class="section-title">🚘 Аренда авто</h2>
          <CarRentalCard />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useToursStore } from '@stores/tours.js';
import BikeCard from '@components/rentals/BikeCard.vue';
import CarRentalCard from '@components/rentals/CarRentalCard.vue';

const toursStore = useToursStore();

const bikeCategories = [
  {
    id: 'standard',
    emoji: '🟢',
    title: 'Категория STANDARD',
    description: 'Идеальны для пляжа, поездок на рынок и спокойной езды.'
  },
  {
    id: 'comfort',
    emoji: '🔵',
    title: 'Категория COMFORT',
    description: 'Мощнее, устойчивее, подходит для поездок вдвоем.'
  },
  {
    id: 'maxi',
    emoji: '👑',
    title: 'Макси-скутеры',
    description: 'Для дальних поездок и максимального комфорта.'
  },
  {
    id: 'moto',
    emoji: '🏍',
    title: 'Мотоциклы (Механика)',
    description: 'Для тех, кто умеет управлять сцеплением.'
  }
];

const bikes = computed(() => toursStore.bikes || []);

const getBikesByCategory = (category) => {
  return bikes.value.filter(bike => bike.category === category);
};
</script>

<style scoped>
.rentals {
  width: 100%;
  padding: 20px 0 60px;
}

.rentals-intro {
  font-size: 16px;
  color: var(--text-gray);
  margin-bottom: 24px;
  max-width: 600px;
  line-height: 1.6;
}

.text-center {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

.bikes-section {
  margin-bottom: 60px;
}

.rentals-category {
  margin-top: 40px;
  margin-bottom: 24px;
  padding-left: 10px;
  font-size: 26px;
  font-weight: 700;
  color: var(--secondary);
}

.bikes-grid {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .bikes-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .bikes-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cars-section {
  margin-top: 60px;
  padding-top: 60px;
  border-top: 1px solid #eee;
}
</style>
