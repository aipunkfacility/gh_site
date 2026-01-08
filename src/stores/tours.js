import { defineStore } from 'pinia'

export const useToursStore = defineStore('tours', {
  state: () => ({
    tours: [
      {
        id: 1,
        title: 'Горный поход',
        description: 'Увлекательное путешествие по горным тропам с опытным гидом.',
        price: '5000 ₽',
        duration: '6 часов',
        image: '/images/tour-1.jpg' // Убедись, что картинки есть, или используй заглушки
      },
      {
        id: 2,
        title: 'Озерная прогулка',
        description: 'Спокойная прогулка на лодке по зеркальному озеру.',
        price: '3500 ₽',
        duration: '3 часа',
        image: '/images/tour-2.jpg'
      },
      {
        id: 3,
        title: 'Велотур по лесу',
        description: 'Активный отдых для любителей скорости и природы.',
        price: '2500 ₽',
        duration: '4 часа',
        image: '/images/tour-3.jpg'
      }
    ]
  }),
  getters: {
    getAllTours: (state) => state.tours
  }
})
