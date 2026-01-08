<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// --- ИСПРАВЛЕНИЕ 3: Логика мобильного меню ---
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <!-- Logo -->
      <RouterLink to="/" class="header__logo" @click="closeMenu">
        GuestHouse
      </RouterLink>

      <!-- Desktop Navigation -->
      <nav class="header__nav desktop-only">
        <ul class="header__menu">
          <li><RouterLink to="/" class="header__link">Главная</RouterLink></li>
          <li><RouterLink to="/accommodation" class="header__link">Номера</RouterLink></li>
          <li><RouterLink to="/services" class="header__link">Услуги</RouterLink></li>
          <li><RouterLink to="/tours" class="header__link">Туры</RouterLink></li>
          <li><RouterLink to="/rentals" class="header__link">Аренда</RouterLink></li>
          <li><RouterLink to="/contacts" class="header__link">Контакты</RouterLink></li>
        </ul>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        class="header__burger mobile-only" 
        @click="toggleMenu"
        :class="{ 'is-active': isMenuOpen }"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Mobile Navigation Overlay -->
      <div class="mobile-menu" :class="{ 'is-open': isMenuOpen }">
        <nav class="mobile-menu__nav">
          <ul class="mobile-menu__list">
            <li><RouterLink to="/" @click="closeMenu">Главная</RouterLink></li>
            <li><RouterLink to="/accommodation" @click="closeMenu">Номера</RouterLink></li>
            <li><RouterLink to="/services" @click="closeMenu">Услуги</RouterLink></li>
            <li><RouterLink to="/tours" @click="closeMenu">Туры</RouterLink></li>
            <li><RouterLink to="/rentals" @click="closeMenu">Аренда</RouterLink></li>
            <li><RouterLink to="/contacts" @click="closeMenu">Контакты</RouterLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Дополнительные стили для мобильного меню, если их нет в css файлах */
.mobile-menu {
  position: fixed;
  top: 60px; /* Высота хедера */
  left: 0;
  width: 100%;
  height: calc(100vh - 60px);
  background: white;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 40;
}

.mobile-menu.is-open {
  transform: translateX(0);
}

.mobile-menu__list {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
  list-style: none;
}

.mobile-menu__list a {
  font-size: 1.2rem;
  color: var(--text-color, #333);
  text-decoration: none;
}

/* Стили для бургера */
.header__burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 50;
}

.header__burger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  transition: 0.3s;
}

@media (min-width: 768px) {
  .mobile-only { display: none; }
  .mobile-menu { display: none; }
}
@media (max-width: 767px) {
  .desktop-only { display: none; }
}
</style>
