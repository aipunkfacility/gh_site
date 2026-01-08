<!-- src/components/rentals/BikeCard.vue -->
<template>
  <div class="bike-card">
    <img
      :src="bike.image"
      :alt="bike.name"
      class="bike-card__img"
      loading="lazy"
    >
    <div class="bike-card__content">
      <div class="bike-header">
        <h3 class="bike-title">{{ bike.name }}</h3>
        <span v-if="bike.badge" class="bike-badge" :class="`bike-badge--${bike.category}`">
          {{ bike.badge }}
        </span>
      </div>

      <div class="bike-specs">
        <div v-if="bike.cc" class="bike-spec-item">
          <i class="fa-solid fa-gauge"></i>
          <span>{{ bike.cc }}cc</span>
        </div>
        <div v-if="bike.type" class="bike-spec-item">
          <i class="fa-solid fa-gears"></i>
          <span>{{ bike.type }}</span>
        </div>
      </div>

      <p class="bike-description">{{ bike.description }}</p>

      <div class="bike-price">
        ${{ bike.pricePerDay }}<span>/день</span>
      </div>

      <button class="btn btn--primary" @click="rentBike">
        <i class="fa-solid fa-motorcycle"></i>
        Арендовать
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useAppStore } from '@stores/app.js';

const appStore = useAppStore();

defineProps({
  bike: {
    type: Object,
    required: true,
    validator: (bike) => {
      return bike.id && bike.name && bike.pricePerDay;
    }
  }
});

const rentBike = () => {
  const message = `Интересует аренда: ${bike.value.name}`;
  const link = `${appStore.config.contacts.whatsappUrl}?text=${encodeURIComponent(message)}`;
  window.open(link, '_blank');
};
</script>

<style scoped>
.bike-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: var(--radius-card);
  box-shadow: var(--shadow);
  overflow: hidden;
  margin-bottom: var(--spacing-lg);
  transition: transform var(--transition-fast);
}

.bike-card:hover {
  transform: translateY(-5px);
}

.bike-card__img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.bike-card__content {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.bike-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-sm);
}

.bike-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--dark);
  margin: 0;
}

.bike-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--gray-light);
  color: var(--text-gray);
}

.bike-badge--comfort {
  background: #e8f5e9;
  color: var(--secondary);
}

.bike-badge--maxi {
  background: #fff3e0;
  color: var(--primary);
}

.bike-specs {
  display: flex;
  gap: var(--spacing-md);
  font-size: 13px;
  color: var(--text-gray);
  margin-bottom: var(--spacing-md);
}

.bike-spec-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.bike-description {
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
  flex-grow: 1;
}

.bike-price {
  font-size: 18px;
  font-weight: 800;
  color: var(--dark);
  margin-bottom: var(--spacing-lg);
}

.bike-price span {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-gray);
}
</style>
