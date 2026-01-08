import { createRouter, createWebHistory } from 'vue-router';

/**
 * Маршруты приложения
 */
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@views/HomeView.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@views/AboutView.vue'),
    meta: {
      title: 'About'
    }
  }
];

/**
 * Экземпляр роутера
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

/**
 * Обновление title страницы
 */
router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
