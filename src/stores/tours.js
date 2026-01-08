// src/stores/tours.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useToursStore = defineStore('tours', () => {
  const tours = ref([]);
  const selectedTour = ref(null);
  const filter = ref('all');
  const isLoading = ref(false);
  const error = ref(null);

  // Methods
  async function fetchTours() {
    try {
      isLoading.value = true;
      error.value = null;
      
      // TODO: Заменить на реальный API call
      // const response = await fetch('/api/tours');
      // tours.value = await response.json();
      
      console.log('📦 Tours fetched');
    } catch (err) {
      error.value = err.message;
      console.error('❌ Error fetching tours:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function getTourById(id) {
    return tours.value.find(t => t.id === id);
  }

  function setSelectedTour(tour) {
    selectedTour.value = tour;
  }

  function setFilter(filterValue) {
    filter.value = filterValue;
  }

  // Getters
  const filteredTours = computed(() => {
    if (filter.value === 'all') return tours.value;
    return tours.value.filter(t => t.category?.includes(filter.value));
  });

  const toursCount = computed(() => tours.value.length);

  return {
    // State
    tours,
    selectedTour,
    filter,
    isLoading,
    error,
    
    // Methods
    fetchTours,
    getTourById,
    setSelectedTour,
    setFilter,
    
    // Getters
    filteredTours,
    toursCount
  };
});
