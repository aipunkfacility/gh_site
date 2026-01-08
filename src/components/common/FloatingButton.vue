<!-- src/components/common/FloatingButton.vue -->
<template>
  <a
    :href="appStore.config.contacts.whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="floating-btn"
    aria-label="Напишите нам в WhatsApp"
    title="Напишите нам в WhatsApp"
  >
    <i class="fa-brands fa-whatsapp"></i>
  </a>
</template>

<script setup>
import { useAppStore } from '@stores/app.js';

const appStore = useAppStore();
</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 80px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    var(--whatsapp) 0%,
    var(--telegram) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
  box-shadow: 0 4px 15px rgba(0, 136, 204, 0.4);
  z-index: 90;
  transition: transform var(--transition);
  text-decoration: none;
}

.floating-btn:hover {
  transform: scale(1.1);
}

.floating-btn:active {
  transform: scale(0.95);
}

@media (max-width: 480px) {
  .floating-btn {
    bottom: 60px;
    right: 16px;
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
}
</style>
