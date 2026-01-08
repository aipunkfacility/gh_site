<!-- src/views/TourDetail.vue -->
<template>
  <div class="tour-detail">
    <div v-if="isLoading" class="loading">
      <p>Загрузка деталей тура...</p>
    </div>
    <div v-else-if="tour" class="tour-detail-content">
      <!-- Tour Header -->
      <div class="tour-header">
        <img
          :src="tour.image"
          :alt="tour.title"
          class="tour-header__img"
        >
        <div class="tour-header__overlay"></div>
        <button class="tour-header__back" @click="goBack">
          <i class="fa-solid fa-arrow-left"></i>
        </button>
        <div class="tour-header__content">
          <h1>{{ tour.title }}</h1>
        </div>
      </div>

      <!-- Tour Body -->
      <div class="tour-body">
        <!-- Meta Info -->
        <div class="tour-meta">
          <div class="meta-item">
            <i class="fa-solid fa-clock"></i>
            <span>{{ tour.duration }}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-users"></i>
            <span>{{ tour.groupSize }}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-star"></i>
            <span>{{ tour.rating }} ({{ tour.reviews }})</span>
          </div>
        </div>

        <!-- Description -->
        <section class="tour-section">
          <h2>Описание</h2>
          <p>{{ tour.fullDescription }}</p>
        </section>

        <!-- Highlights -->
        <section class="tour-section" v-if="tour.highlights">
          <h2>Что вас ждёт</h2>
          <ul class="check-list">
            <li v-for="highlight in tour.highlights" :key="highlight">
              {{ highlight }}
            </li>
          </ul>
        </section>

        <!-- Itinerary -->
        <section class="tour-section" v-if="tour.itinerary">
          <h2>Программа тура</h2>
          <div class="timeline">
            <div v-for="(item, idx) in tour.itinerary" :key="idx" class="timeline-item">
              <span class="timeline-time">{{ item.time }}</span>
              <h4 class="timeline-title">{{ item.title }}</h4>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </section>

        <!-- Price & Booking -->
        <section class="tour-section">
          <h2>Стоимость и условия</h2>
          <div class="price-info">
            <div class="price-box">
              <span>Цена за человека</span>
              <p class="price">${{ tour.price }}</p>
            </div>
            <button class="btn btn--primary btn--large" @click="bookTour">
              <i class="fa-solid fa-calendar"></i>
              Забронировать
            </button>
          </div>
        </section>
      </div>

      <!-- Sticky Booking Bar (мобильное) -->
      <div v-if="showStickyBar" class="booking-bar">
        <div class="booking-price">
          <span>Стоимость</span>
          <strong>${{ tour.price }}</strong>
        </div>
        <button class="btn btn--primary btn--sm" @click="bookTour">
          Забронировать
        </button>
      </div>
    </div>
    <div v-else class="not-found">
      <p>Тур не найден</p>
      <RouterLink to="/tours" class="btn btn--secondary">
        Вернуться к турам
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import { useToursStore } from '@stores/tours.js';
import { useAppStore } from '@stores/app.js';

const route = useRoute();
const router = useRouter();
const toursStore = useToursStore();
const appStore = useAppStore();

const isLoading = ref(false);
const showStickyBar = ref(false);

const tourId = computed(() => parseInt(route.params.id));

const tour = computed(() => toursStore.getTourById(tourId.value));

const goBack = () => {
  router.back();
};

const bookTour = () => {
  if (tour.value) {
    const message = appStore.config.messages.tourBooking(tour.value.title);
    const whatsappUrl = `${appStore.config.contacts.whatsappUrl}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
};

onMounted(async () => {
  isLoading.value = true;
  await toursStore.fetchTours();
  isLoading.value = false;
  
  // Показываем sticky bar только на мобильных
  window.addEventListener('scroll', () => {
    showStickyBar.value = window.scrollY > 300;
  });
});
</script>

<style scoped>
.loading,
.not-found {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-gray);
  font-size: 18px;
}

.tour-detail-content {
  padding-top: 70px;
}

.tour-header {
  position: relative;
  height: 300px;
}

.tour-header__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tour-header__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7));
}

.tour-header__content {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  color: white;
}

.tour-header__content h1 {
  color: white;
  margin: 0;
}

.tour-header__back {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark);
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border: none;
  cursor: pointer;
  transition: var(--transition);
}

.tour-header__back:hover {
  transform: translateX(-3px);
}

.tour-body {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 20px 100px;
}

.tour-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 8px;
}

.tour-section {
  margin-bottom: 40px;
}

.tour-section h2 {
  margin-bottom: 16px;
  color: var(--secondary);
}

.tour-section p {
  line-height: 1.8;
  color: var(--text-gray);
}

.check-list {
  list-style: none;
  padding: 0;
}

.check-list li {
  padding-left: 30px;
  position: relative;
  margin-bottom: 12px;
}

.check-list li::before {
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  content: "\f00c";
  position: absolute;
  left: 0;
  color: var(--secondary);
}

.timeline {
  position: relative;
  border-left: 2px solid #ddd;
  margin-left: 10px;
  padding-left: 24px;
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -31px;
  top: 0;
  width: 12px;
  height: 12px;
  background: var(--secondary);
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px var(--secondary);
}

.timeline-time {
  font-size: 14px;
  font-weight: 700;
  color: var(--secondary);
  display: block;
  margin-bottom: 4px;
}

.timeline-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
}

.price-info {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background: #f9f9f9;
  border-radius: 12px;
}

.price-box {
  flex: 1;
}

.price-box span {
  display: block;
  color: var(--text-gray);
  margin-bottom: 4px;
}

.price {
  font-size: 32px;
  font-weight: 800;
  color: var(--dark);
  margin: 0;
}

.btn--large {
  padding: 16px 32px;
  font-size: 16px;
}

.booking-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 16px 20px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}

.booking-price {
  display: flex;
  flex-direction: column;
}

.booking-price span {
  font-size: 12px;
  color: var(--text-gray);
}

.booking-price strong {
  font-size: 24px;
  color: var(--dark);
  line-height: 1;
}

@media (min-width: 768px) {
  .tour-detail-content {
    padding-top: 0;
  }

  .booking-bar {
    display: none;
  }

  .price-info {
    justify-content: space-between;
  }
}
</style>
