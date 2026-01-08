import { defineStore } from 'pinia'

export const useToursStore = defineStore('tours', {
  state: () => ({
    tours: [
      {
        id: 1,
        title: 'Джип-тур на Белые и Красные дюны',
        description: 'Встреча рассвета на Белых дюнах, катание на квадроциклах, посещение Красных дюн и рыбацкой деревни.',
        fullDescription: 'Самый популярный тур в Муйне. Встреча рассвета на Белых дюнах, катание на квадроциклах, посещение Красных дюн и рыбацкой деревни. Отличный способ начать день!',
        price: '35',
        duration: '4.5 часа',
        groupSize: 'До 4 человек',
        rating: '4.9',
        reviews: '128',
        image: '/images/tour-1.jpg',
        category: 'jeep',
        badge: 'hit',
        badgeText: 'ХИТ',
        highlights: ['Рассвет на дюнах', 'Катание на квадроциклах', 'Рыбацкая деревня', 'Ручей Фей'],
        itinerary: [
          { time: '04:30', title: 'Встреча и отправление', description: 'Сбор в отеле и отправление' },
          { time: '05:00', title: 'Белые дюны и рассвет', description: 'Встреча рассвета на Белых дюнах' },
          { time: '06:30', title: 'Красные дюны и катание', description: 'Красные дюны и катание на квадроциклах' },
          { time: '09:00', title: 'Возврат в отель', description: 'Возвращение в отель' }
        ],
        included: ['Транспорт', 'Вода', 'Фотографии', 'Страховка'],
        excluded: ['Алкогольные напитки', 'Личные расходы']
      },
      {
        id: 2,
        title: 'Рыбалка на озере',
        description: 'Спокойная рыбалка на лодке по зеркальному озеру. Ловля рыбы и релаксация.',
        fullDescription: 'Спокойное утро на лодке. Ловля рыбы в тихом озере, любование природой. Отличный способ расслабиться и забыть о суете города!',
        price: '40',
        duration: '6 часов',
        groupSize: 'До 6 человек',
        rating: '4.7',
        reviews: '45',
        image: '/images/tour-2.jpg',
        category: 'relax',
        badge: null,
        badgeText: null,
        highlights: ['Тихое озеро', 'Ловля рыбы', 'Природа', 'Релакс'],
        itinerary: [
          { time: '08:00', title: 'Встреча и отправление', description: 'Сбор в отеле' },
          { time: '08:30', title: 'Рыбалка на озере', description: 'Рыбалка и релаксация' },
          { time: '14:00', title: 'Возврат в отель', description: 'Возвращение в отель' }
        ],
        included: ['Лодка', 'Снасти', 'Напитки', 'Закуски'],
        excluded: ['Дополнительные услуги', 'Чаевые']
      },
      {
        id: 3,
        title: 'Горный Баолок',
        description: 'Экскурсия в горный город Баолок. Чайные плантации, водопады и свежий горный воздух.',
        fullDescription: 'Поездка в горный город Баолок. Посещение чайных плантаций, осмотр красивых водопадов и дыхание свежим горным воздухом. Незабываемый опыт!',
        price: '80',
        duration: 'Полный день',
        groupSize: 'До 10 человек',
        rating: '4.8',
        reviews: '32',
        image: '/images/tour-3.jpg',
        category: 'mountain',
        badge: null,
        badgeText: null,
        highlights: ['Чайные плантации', 'Водопады', 'Горный воздух', 'Дегустация чая'],
        itinerary: [
          { time: '06:00', title: 'Встреча и отправление', description: 'Сбор в отеле' },
          { time: '09:00', title: 'Чайные плантации', description: 'Посещение плантаций и дегустация чая' },
          { time: '12:00', title: 'Обед', description: 'Обеденный перерыв' },
          { time: '13:00', title: 'Водопады', description: 'Посещение красивых водопадов' },
          { time: '17:00', title: 'Прибытие в отель', description: 'Возвращение в отель' }
        ],
        included: ['Транспорт', 'Гид', 'Обед', 'Посещение плантаций'],
        excluded: ['Дополнительные закуски', 'Личные расходы']
      }
    ]
  }),

  getters: {
    getAllTours: (state) => state.tours,
    getTourById: (state) => (id) => state.tours.find(tour => tour.id === id)
  },

  actions: {
    async fetchTours() {
      // Заглушка для будущих API запросов
      console.log('Fetching tours...');
      return this.tours;
    }
  }
})
