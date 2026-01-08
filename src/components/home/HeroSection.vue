<script setup>
// Используем абсолютные пути, которые Vite возьмет из папки public
const heroImage = '/images/hero-desktop.jpg'
const heroImageMobile = '/images/hero-mobile.jpg'
</script>

<template>
  <section class="hero">
    <div class="hero__bg">
      <picture>
        <source media="(max-width: 767px)" :srcset="heroImageMobile">
        <img :src="heroImage" alt="Welcome to our Guest House" class="hero__img">
      </picture>
      <div class="hero__overlay"></div>
    </div>
    
    <div class="container hero__container">
      <div class="hero__content">
        <h1 class="hero__title">
          Идеальный отдых <br>
          <span class="text-accent">в гармонии с природой</span>
        </h1>
        <p class="hero__subtitle">
          Уютные номера, потрясающие виды и сервис, который вы заслуживаете.
        </p>
        <div class="hero__actions">
          <router-link to="/accommodation" class="btn btn--primary">Выбрать номер</router-link>
          <router-link to="/tours" class="btn btn--outline-light">Смотреть туры</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 80vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  color: white;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); 
}

.hero__content {
  max-width: 600px;
  position: relative;
  z-index: 1;
}

.hero__title {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-weight: 700;
}

.hero__subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .hero__title {
    font-size: 2rem;
  }
}
</style>
