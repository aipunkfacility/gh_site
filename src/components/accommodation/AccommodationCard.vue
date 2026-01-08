<!-- src/components/accommodation/AccommodationCard.vue -->
<template>
  <div class="acc-card">
    <img
      src="https://placehold.co/800x400/8e44ad/FFF/png?text=Green+Hill+Resort"
      alt="Green Hill Resort"
      class="acc-img"
    >
    <div class="acc-content">
      <h3 class="acc-title">🌴 Green Hill Resort & Spa</h3>
      <div class="acc-desc">Ваш оазис в центре Муйне. Бунгало, бассейн, бар.</div>

      <div class="acc-features">
        <div class="acc-feature">
          <i class="fa-solid fa-bed"></i>
          <span>Комфортные номера</span>
        </div>
        <div class="acc-feature">
          <i class="fa-solid fa-water"></i>
          <span>Бассейн</span>
        </div>
        <div class="acc-feature">
          <i class="fa-solid fa-utensils"></i>
          <span>Ресторан</span>
        </div>
        <div class="acc-feature">
          <i class="fa-solid fa-spa"></i>
          <span>Спа</span>
        </div>
      </div>

      <button class="btn btn--primary" @click="bookAccommodation">
        <i class="fa-solid fa-key"></i>
        Узнать цены
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app.js';

const appStore = useAppStore();

const bookAccommodation = () => {
  const link = `${appStore.config.contacts.whatsappUrl}?text=${encodeURIComponent(appStore.config.messages.accommodation)}`;
  window.open(link, '_blank');
};
</script>

<style scoped>
.acc-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: var(--shadow);
}

.acc-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.acc-content {
  padding: 30px 20px;
}

.acc-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--secondary);
  margin-bottom: 12px;
}

.acc-desc {
  font-size: 16px;
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 24px;
}

.acc-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.acc-feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.acc-feature i {
  color: var(--primary);
}

@media (min-width: 768px) {
  .acc-features {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
