<script setup>
import { RouterView } from 'vue-router'
// ИСПРАВЛЕНО: добавил слэш после @ (@/components...)
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import FloatingButton from '@/components/common/FloatingButton.vue'
</script>

<template>
  <div class="app-layout">
    <Header />
    
    <main>
      <RouterView />
    </main>

    <Footer />
    
    <!-- Кнопка бронирования или скролла -->
    <FloatingButton />
  </div>
</template>

<style>
/* Глобальные стили для app-layout, если нужны */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}
</style>
