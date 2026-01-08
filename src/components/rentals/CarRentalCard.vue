<!-- src/components/rentals/CarRentalCard.vue -->
<template>
  <div class="acc-card">
    <img
      src="https://placehold.co/800x400/7f8c8d/FFF/png?text=Toyota+Vios"
      alt="Toyota Vios"
      class="acc-img"
    >
    <div class="acc-content">
      <h3 class="acc-title">Toyota Vios</h3>
      <div class="acc-desc">
        <p>Надежный, маневренный седан для самостоятельных поездок.</p>
        <ul class="acc-features">
          <li><i class="fa-solid fa-check"></i> Кондиционер</li>
          <li><i class="fa-solid fa-check"></i> Полный бак бензина</li>
          <li><i class="fa-solid fa-check"></i> Страховка включена</li>
          <li><i class="fa-solid fa-check"></i> Поддержка 24/7</li>
        </ul>
      </div>
      <button class="btn btn--primary" @click="rentCar">
        <i class="fa-solid fa-car"></i>
        Забронировать авто
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app.js';

const appStore = useAppStore();

const rentCar = () => {
  const link = `${appStore.config.contacts.whatsappUrl}?text=${encodeURIComponent(appStore.config.messages.carRental)}`;
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

.acc-desc p {
  margin-bottom: 16px;
}

.acc-features {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
}

.acc-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
}

.acc-features i {
  color: var(--primary);
}

@media (min-width: 768px) {
  .acc-features {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
