<template>
  <section class="section">
    <div class="container">
      <h1 class="section-title">Наши сервисы</h1>
      <div class="service-list">
        <ServiceCard v-for="service in services" :key="service.id" :service="service" />
      </div>
    </div>
  </section>
</template>

<script setup>
import ServiceCard from '@/components/services/ServiceCard.vue';

const services = [
  { id: 1, title: 'Трансфер из аэропорта', icon: 'fa-car', description: 'Встреча и трансфер с комфортом' },
  { id: 2, title: 'Экскурсионные программы', icon: 'fa-map', description: 'Индивидуальные и групповые туры' },
  { id: 3, title: 'Аренда техники', icon: 'fa-motorcycle', description: 'Байки, скутеры и автомобили' },
];
</script>

<style scoped>
.service-list {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
