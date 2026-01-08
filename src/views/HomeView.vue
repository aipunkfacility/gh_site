<script setup>
// --- ИСПРАВЛЕНИЕ 2: Импорт и использование компонентов ---
import HeroSection from '../components/home/HeroSection.vue'
import BenefitsSection from '../components/home/BenefitsSection.vue'
import ServiceCard from '../components/services/ServiceCard.vue'

// Можно добавить скрипт для динамических данных, если нужно
</script>

<template>
  <main class="home-page">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Benefits Section -->
    <BenefitsSection />

    <!-- Preview Services (Optional example structure) -->
    <section class="section-container">
      <div class="container">
        <h2 class="section-title">Наши услуги</h2>
        <div class="grid-3">
            <!-- Здесь можно вывести превью услуг или оставить место под контент -->
            <p>Добро пожаловать в наш гестхаус!</p>
        </div>
      </div>
    </section>
  </main>
</template>
