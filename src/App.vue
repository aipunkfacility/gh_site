<template>
  <div id="app" class="app">
    <!-- Хедер -->
    <Header />
    
    <!-- Основной контент (будет меняться между views) -->
    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          mponent :is="Component" :key="$route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    
    <!-- Плавающая кнопка WhatsApp -->
    <FloatingButton />
    
    <!-- Футер -->
    <Footer />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@components/layout/Header.vue';
import Footer from '@components/layout/Footer.vue';
import FloatingButton from '@components/common/FloatingButton.vue';
import { useAppStore } from '@stores/app.js';
import { onMounted } from 'vue';

const appStore = useAppStore();

onMounted(() => {
  console.log('📱 App mounted successfully');
  appStore.initialize();
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
}

/* Переход между страницами */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
