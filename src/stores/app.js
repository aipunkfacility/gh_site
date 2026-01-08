// src/stores/app.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAppStore = defineStore('app', () => {
  // State
  const config = ref({
    contacts: {
      phone: '84372733431',
      whatsappUrl: 'https://wa.me/84372733431',
      telegram: '@GreenHill_Support',
      telegramUrl: 'https://t.me/GreenHill_Support',
      email: 'info@greenhilltours.com'
    },
    messages: {
      tourBooking: (title) => `Здравствуйте! Хочу забронировать тур: ${title}`,
      bikeRental: (name) => `Интересует аренда ${name}`,
      carRental: 'Интересует аренда Toyota Vios',
      accommodation: 'Интересует проживание в Green Hill',
      generalInquiry: 'Здравствуйте! У меня есть вопрос'
    },
    app: {
      companyName: 'GreenHill Tours',
      location: 'Муйне, Вьетнам',
      language: 'ru'
    }
  });

  const isMenuOpen = ref(false);
  const isLoading = ref(false);
  const error = ref(null);

  // Methods
  function initialize() {
    console.log('🔧 App store initialized');
  }

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  function closeMenu() {
    isMenuOpen.value = false;
  }

  function setLoading(value) {
    isLoading.value = value;
  }

  function setError(message) {
    error.value = message;
    console.error('❌ App Error:', message);
  }

  function clearError() {
    error.value = null;
  }

  // Getters
  const whatsappLink = computed(() => config.value.contacts.whatsappUrl);
  const telegramLink = computed(() => config.value.contacts.telegramUrl);
  const companyName = computed(() => config.value.app.companyName);

  return {
    // State
    config,
    isMenuOpen,
    isLoading,
    error,
    
    // Methods
    initialize,
    toggleMenu,
    closeMenu,
    setLoading,
    setError,
    clearError,
    
    // Getters
    whatsappLink,
    telegramLink,
    companyName
  };
});
