// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';

// Импортируем views (компоненты страниц)
const views = {
  Home: () => import('@views/Home.vue'),
  Tours: () => import('@views/Tours.vue'),
  TourDetail: () => import('@views/TourDetail.vue'),
  Rentals: () => import('@views/Rentals.vue'),
  Accommodation: () => import('@views/Accommodation.vue'),
  Services: () => import('@views/Services.vue'),
  Contacts: () => import('@views/Contacts.vue'),
  NotFound: () => import('@views/NotFound.vue'),
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: views.Home,
    meta: { title: 'GreenHill Tours - Главная' }
  },
  {
    path: '/tours',
    name: 'Tours',
    component: views.Tours,
    meta: { title: 'GreenHill Tours - Все экскурсии' }
  },
  {
    path: '/tour/:id',
    name: 'TourDetail',
    component: views.TourDetail,
    meta: { title: 'GreenHill Tours - Детали экскурсии' }
  },
  {
    path: '/rentals',
    name: 'Rentals',
    component: views.Rentals,
    meta: { title: 'GreenHill Tours - Аренда транспорта' }
  },
  {
    path: '/accommodation',
    name: 'Accommodation',
    component: views.Accommodation,
    meta: { title: 'GreenHill Tours - Проживание' }
  },
  {
    path: '/services',
    name: 'Services',
    component: views.Services,
    meta: { title: 'GreenHill Tours - Сервисы' }
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: views.Contacts,
    meta: { title: 'GreenHill Tours - Контакты' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: views.NotFound,
    meta: { title: 'GreenHill Tours - Страница не найдена' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

// Обновляем заголовок страницы при переходе
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'GreenHill Tours';
  console.log(`📍 Navigating to: ${to.name}`);
  next();
});

export default router;
