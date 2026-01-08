<!-- src/views/Tours.vue -->
<template>
  <div class="tours-view">
    <div class="section section--gray">
      <div class="container">
        <h1 class="section-title">Все экскурсии</h1>

        <!-- Фильтры -->
        <div class="filters-wrapper">
          <div class="filters">
            <button
              v-for="filter in filters"
              :key="filter"
              class="filter-btn"
              :class="{ active: activeFilter === filter }"
              @click="setFilter(filter)"
            >
              {{ filterLabels[filter] }}
            </button>
          </div>
        </div>

        <!-- Туры -->
        <div v-if="toursStore.isLoading" class="loading">
          <p>Загрузка туров...</p>
        </div>
        <div v-else-if="filteredTours.length > 0" class="cards-grid">
          <TourCard 
            v-for="tour in filteredTours"
            :key="tour.id"
            :tour="tour"
          />
        </div>
        <div v-else class="no-tours">
          <p>Туры по этой категории не найдены</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useToursStore } from '@stores/tours.js';
import TourCard from '@components/tours/TourCard.vue';

const toursStore = useToursStore();

const filters = ['all', 'jeep', 'mountain', 'sea', 'city'];
const filterLabels = {
  all: 'Все',
  jeep: 'Джип-туры',
  mountain: 'Горы',
  sea: 'Море',
  city: 'Город'
};

const activeFilter = computed(() => toursStore.filter);

const setFilter = (filter) => {
  toursStore.setFilter(filter);
};

const filteredTours = computed(() => toursStore.filteredTours);

onMounted(() => {
  toursStore.fetchTours();
});
</script>

<style scoped>
.tours-view {
  padding-top: 20px;
}

.loading,
.no-tours {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-gray);
  font-size: 18px;
}

.filters-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}

.filters {
  display: flex;
  gap: var(--spacing-sm);
  overflow-x: auto;
  padding-bottom: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  scrollbar-width: none;
}

.filters::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 20px;
  background: var(--gray-light);
  color: var(--text-gray);
  font-weight: 600;
  white-space: nowrap;
  transition: var(--transition-fast);
  cursor: pointer;
  border: none;
  font-family: inherit;
}

.filter-btn.active,
.filter-btn:hover {
  background: var(--secondary);
  color: white;
}

.cards-grid {
  display: grid;
  gap: var(--spacing-xl);
  grid-template-columns: 1fr;
  padding: 0 20px 60px;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .cards-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1280px;
    margin: 0 auto;
  }
}
</style>
