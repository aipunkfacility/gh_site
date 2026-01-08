<!-- src/components/layout/Header.vue -->
<template>
  <header class="header">
    <!-- Логотип -->
    <RouterLink to="/" class="header__logo">
      <i class="fa-solid fa-leaf"></i>
      <span>GreenHill<span class="primary">Tours</span></span>
    </RouterLink>

    <!-- Десктоп навигация -->
    <nav class="header__nav">
      <RouterLink 
        v-for="link in navLinks" 
        :key="link.path"
        :to="link.path"
        class="header__link"
        :class="{ active: $route.path === link.path }"
      >
        {{ link.label }}
      </RouterLink>
    </nav>

    <!-- Бургер меню (мобильное) -->
    <button 
      class="header__burger"
      @click="toggleMenu"
      :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
    >
      <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
    </button>

    <!-- Мобильное меню -->
    <nav v-if="isMenuOpen" class="mobile-menu" :class="{ active: isMenuOpen }">
      <RouterLink 
        v-for="link in navLinks"
        :key="link.path"
        :to="link.path"
        class="mobile-menu__link"
        @click="closeMenu"
      >
        {{ link.label }}
      </RouterLink>
      
      <button 
        class="btn btn--primary mobile-menu__telegram"
        @click="openTelegram"
      >
        <i class="fa-brands fa-telegram"></i>
        Написать в Telegram
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useAppStore } from '@stores/app.js';

const appStore = useAppStore();
const route = useRoute();
const isMenuOpen = ref(false);

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/tours', label: 'Экскурсии' },
  { path: '/rentals', label: 'Аренда' },
  { path: '/accommodation', label: 'Проживание' },
  { path: '/services', label: 'Сервисы' },
  { path: '/contacts', label: 'Контакты' },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = '';
};

const openTelegram = () => {
  window.open(appStore.telegramLink, '_blank');
  closeMenu();
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header__logo {
  font-weight: 800;
  font-size: 20px;
  color: var(--secondary);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  transition: color var(--transition);
}

.header__logo:hover {
  color: var(--primary);
}

.header__logo .primary {
  color: var(--primary);
}

.header__burger {
  font-size: 24px;
  color: var(--dark);
  cursor: pointer;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__nav {
  display: none;
}

.mobile-menu {
  position: fixed;
  top: var(--header-height);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--header-height));
  background: var(--white);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 40px 20px;
  overflow-y: auto;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu__link {
  font-size: 20px;
  font-weight: 600;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  color: var(--dark);
  text-decoration: none;
  cursor: pointer;
  transition: color var(--transition);
}

.mobile-menu__link:hover {
  color: var(--primary);
}

.mobile-menu__telegram {
  margin-top: auto;
  width: 100%;
}

/* Десктоп */
@media (min-width: 1200px) {
  .header {
    padding: 0 80px;
  }

  .header__burger,
  .mobile-menu {
    display: none !important;
  }

  .header__nav {
    display: flex;
    gap: 24px;
  }

  .header__link {
    font-weight: 600;
    font-size: 16px;
    color: var(--dark);
    position: relative;
    white-space: nowrap;
    cursor: pointer;
    text-decoration: none;
    transition: color var(--transition);
  }

  .header__link:hover,
  .header__link.active {
    color: var(--primary);
  }

  .header__link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary);
  }
}
</style>
