import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/accommodation',
      name: 'accommodation',
      component: () => import('../views/Accommodation.vue')
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../views/Services.vue')
    },
    {
      path: '/tours',
      name: 'tours',
      component: () => import('../views/Tours.vue')
    },
    // --- ВАЖНО: Добавлен маршрут для детальной страницы тура ---
    {
      path: '/tours/:id',
      name: 'tour-detail',
      component: () => import('../views/TourDetail.vue'),
      props: true
    },
    {
      path: '/rentals',
      name: 'rentals',
      component: () => import('../views/Rentals.vue')
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/Contacts.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
