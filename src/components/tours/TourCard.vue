<!-- src/components/tours/TourCard.vue -->
<template>
  <router-link :to="`/tours/${tour.id}`" class="card">
    <div class="card__image-wrapper">
      <img
        :src="tour.image"
        :alt="tour.title"
        class="card__image"
        loading="lazy"
      >
      <div v-if="tour.badge" :class="`badge badge--${tour.badge}`">
        {{ tour.badgeText }}
      </div>
    </div>

    <div class="card__content">
      <h3 class="card__title">{{ tour.title }}</h3>
      <p class="card__desc">{{ tour.description }}</p>
      <div class="card__footer">
        <span class="card__price">${{ tour.price }}</span>
        <button class="card__btn" @click.prevent="">
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  tour: {
    type: Object,
    required: true,
    validator: (tour) => {
      return tour.id && tour.title && tour.price;
    }
  }
});
</script>

<style scoped>
.card {
  background: var(--white);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform var(--transition-fast);
  cursor: pointer;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-5px);
}

.card__image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: var(--gray-light);
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}

.card:hover .card__image {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  z-index: 2;
}

.badge--hit {
  background-color: var(--primary);
}

.badge--new {
  background-color: var(--secondary);
}

.card__content {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card__title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--dark);
}

.card__desc {
  font-size: 14px;
  color: var(--text-gray);
  margin-bottom: var(--spacing-lg);
  flex-grow: 1;
}

.card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--gray-border);
}

.card__price {
  font-size: 20px;
  font-weight: 800;
  color: var(--dark);
}

.card__btn {
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--white);
  color: var(--primary);
  border: 2px solid var(--primary);
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition-fast);
}

.card:hover .card__btn {
  background: var(--primary);
  color: white;
}
</style>
