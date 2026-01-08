// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';

// Импортируем глобальные стили
import './assets/styles/main.css';

const app = createApp(App);

// Подключаем Pinia для управления состоянием
app.use(createPinia());

// Подключаем Vue Router
app.use(router);

// Монтируем приложение
app.mount('#app');

// Логирование
console.log('🚀 Vue 3 App Initialized');
