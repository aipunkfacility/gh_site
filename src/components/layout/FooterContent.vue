<!-- src/components/layout/FooterContent.vue -->
<template>
  <div class="footer-content">
    <div class="footer-container">
      <!-- Компания инфо -->
      <section class="footer-section">
        <h3>{{ appStore.companyName }}</h3>
        <p>{{ appStore.config.app.location }}</p>
        <p class="footer-description">
          Лучший выбор для экскурсий, аренды транспорта и проживания в Муйне
        </p>
      </section>

      <!-- Навигация -->
      <section class="footer-section">
        <h4>Навигация</h4>
        <nav class="footer-nav">
          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path">
            {{ link.label }}
          </RouterLink>
        </nav>
      </section>

      <!-- Контакты -->
      <section class="footer-section">
        <h4>Контакты</h4>
        <ul class="footer-contacts">
          <li>
            <a :href="`tel:${appStore.config.contacts.phone}`">
              <i class="fa-solid fa-phone"></i>
              {{ appStore.config.contacts.phone }}
            </a>
          </li>
          <li>
            <a :href="appStore.config.contacts.whatsappUrl" target="_blank">
              <i class="fa-brands fa-whatsapp"></i>
              WhatsApp
            </a>
          </li>
          <li>
            <a :href="appStore.config.contacts.telegramUrl" target="_blank">
              <i class="fa-brands fa-telegram"></i>
              Telegram
            </a>
          </li>
        </ul>
      </section>

      <!-- Соцсети -->
      <section class="footer-section">
        <h4>Следите за нами</h4>
        <div class="footer-socials">
          <a href="#" class="social-link" aria-label="Facebook">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <i class="fa-brands fa-instagram"></i>
          </a>
          <a href="#" class="social-link" aria-label="YouTube">
            <i class="fa-brands fa-youtube"></i>
          </a>
        </div>
      </section>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} {{ appStore.companyName }}. Все права защищены.</p>
      <p class="footer-powered">
        Powered by Vue 3 + Vite
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app.js';
import { RouterLink } from 'vue-router';

const appStore = useAppStore();

const navLinks = [
  { path: '/', label: 'Главная' },
  { path: '/tours', label: 'Экскурсии' },
  { path: '/rentals', label: 'Аренда' },
  { path: '/accommodation', label: 'Проживание' },
  { path: '/services', label: 'Сервисы' },
  { path: '/contacts', label: 'Контакты' },
];
</script>

<style scoped>
.footer-content {
  background: #1a1a1a;
  color: #fff;
  padding: 60px 20px 20px;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 16px;
  color: var(--primary);
  font-weight: 700;
}

.footer-section p {
  color: #aaa;
  margin-bottom: 8px;
  line-height: 1.6;
}

.footer-description {
  font-size: 14px;
}

.footer-nav,
.footer-contacts {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-nav a,
.footer-contacts a {
  color: #aaa;
  text-decoration: none;
  transition: color var(--transition);
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-nav a:hover,
.footer-contacts a:hover {
  color: var(--primary);
}

.footer-socials {
  display: flex;
  gap: 16px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 100, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  text-decoration: none;
  transition: all var(--transition);
}

.social-link:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-3px);
}

.footer-bottom {
  border-top: 1px solid #333;
  padding-top: 20px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.footer-powered {
  margin-top: 8px;
  font-size: 12px;
  color: #555;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}
</style>
