// js/app.js
import { toursData, bikesData, servicesData } from './data.js';
import { createCardHTML, createBikeCard, createServiceHTML, renderTourDetail } from './render.js';
import { navigateTo, initRouter } from './router.js';
import { config, getWhatsAppLink } from './config.js';
import { initLazyLoading, addLazyLoadingToNewImages } from './lazyload.js';

// Утилита для безопасного получения элемента с логированием
function safeGetElement(id) {
  try {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`⚠️ Элемент с ID "${id}" не найден`);
      return null;
    }
    return element;
  } catch (error) {
    console.error(`❌ Ошибка при получении элемента "${id}":`, error);
    return null;
  }
}

// Утилита для безопасного поиска элементов
function safeQuerySelector(selector) {
  try {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`⚠️ Элемент с селектором "${selector}" не найден`);
      return null;
    }
    return element;
  } catch (error) {
    console.error(`❌ Ошибка при поиске элемента "${selector}":`, error);
    return null;
  }
}

// Инициализация приложения
function initApp() {
  try {
    console.log('🚀 App Initialized via Modules');
    
    const popularGrid = safeGetElement('home-popular-grid');
    if (popularGrid) {
      try {
        popularGrid.innerHTML = toursData.slice(0, 4).map(createCardHTML).join('');
        setupTourClickEvents();
        addLazyLoadingToNewImages(popularGrid);
      } catch (error) {
        console.error('❌ Ошибка при рендеринге популярных туров:', error);
      }
    }
    
    renderTours(toursData);
    
    const servicesContainer = safeGetElement('services-list');
    if (servicesContainer) {
      try {
        servicesContainer.innerHTML = servicesData.map(createServiceHTML).join('');
        addLazyLoadingToNewImages(servicesContainer);
      } catch (error) {
        console.error('❌ Ошибка при
