<!-- src/components/home/HeroSection.vue -->
<template>
  <section class="hero">
    <picture class="hero__media">
      <source media="(min-width: 768px)" data-srcset="/images/hero-desktop.jpg">
      <img 
        class="hero__img" 
        :src="`/images/hero-mobile.jpg`"
        alt="Муйне - красивый пляж с пальмами"
        data-width="800"
        data-height="600"
      >
    </picture>

    <div class="hero__overlay"></div>

    <div class="hero__content">
      <h1>Муйне: Отдых без забот</h1>
      <p class="hero__subtitle">
        Мы поможем сделать ваш отдых комфортным и безопасным. 
        Экскурсии, трансферы и байки от местных экспертов.
      </p>
      <div class="hero__actions">
        <RouterLink to="/tours" class="btn btn--primary">
          Выбрать экскурсию
        </RouterLink>
        <RouterLink to="/rentals" class="btn btn--secondary">
          Арендовать байк
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { initLazyLoading } from '@composables/useLazyLoad.js';

onMounted(() => {
  initLazyLoading();
});
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  color: var(--white);
  background-color: #ffffff;
  min-height: clamp(520px, 78vh, 900px);
  margin-bottom: 90px;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 70% 65%;
  display: block;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.05) 55%,
    rgba(0, 0, 0, 0) 100%
  );
}

.hero__content {
  position: relative;
  z-index: 2;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  padding: 50px 20px 90px;
}

.hero h1 {
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero__subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  max-width: 600px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.hero__actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 380px;
  margin-top: auto;
}

.hero .btn--secondary {
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--white);
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
}

@media (min-width: 768px) {
  .hero__actions {
    flex-direction: row;
    width: auto;
    max-width: none;
  }

  .hero__img {
    object-position: center top;
  }
}

@media (max-width: 767px) {
  .benefits {
    transform: translateY(-60px);
  }

  .hero {
    margin-bottom: 60px;
  }

  .hero__content {
    padding: 50px 16px 80px;
  }
}

@media (min-width: 1200px) {
  .hero__content {
    padding: 20px 20px 20px;
  }

  .hero {
    min-height: clamp(650px, 92vh, 1050px);
  }
}
</style>
