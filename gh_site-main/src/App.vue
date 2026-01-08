<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import FloatingButton from '@/components/common/FloatingButton.vue'
</script>

<template>
  <div class="app-container">
    <Header />
    
    <main class="main-content">
      <!-- Самое важное: здесь отображаются страницы -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <FloatingButton />
    <Footer />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* Отступ под фиксированный хедер */
}
</style>
