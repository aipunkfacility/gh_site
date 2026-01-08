// js/router.js
/**
 * Router для SPA с поддержкой History API
 * Управляет навигацией между views и URL состояниями
 */

// Доступные routes и их соответствие view-id
const ROUTES = {
  '': 'home',
  '/': 'home',
  '/home': 'home',
  '/tours': 'tours',
  '/rentals': 'rentals',
  '/accommodation': 'accommodation',
  '/services': 'services',
  '/contacts': 'contacts',
  '/tour-detail': 'tour-detail'
};

/**
 * Функция навигации между views
 * @param {string} viewId - ID экрана (например, 'home', 'tours', 'tour-detail')
 * @param {Object} options - Опции навигации
 * @param {boolean} options.addToHistory - Добавлять ли в историю браузера (default: true)
 * @param {Object} options.state - Доп. данные состояния
 */
export function navigateTo(viewId, options = {}) {
  try {
    const { addToHistory = true, state = {} } = options;

    // Валидация viewId
    if (!viewId || typeof viewId !== 'string') {
      console.error('❌ navigateTo: Invalid viewId', viewId);
      navigateTo('home', { addToHistory: false });
      return;
    }

    // 1. Скрываем все экраны
    const views = document.querySelectorAll('.view');
    if (views.length === 0) {
      console.warn('⚠️ No views found on page');
      return;
    }

    views.forEach(el => el.classList.remove('active'));

    // 2. Находим и показываем нужный экран
    const target = document.getElementById(`view-${viewId}`);
    if (!target) {
      console.error(`❌ View not found: view-${viewId}`);
      return;
    }

    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 3. Обновляем URL (prettier URLs)
    if (addToHistory) {
      const url = getPrettyUrl(viewId, state);
      const historyState = { 
        view: viewId, 
        timestamp: Date.now(),
        ...state 
      };
      history.pushState(historyState, null, url);
    }

    // 4. Управление footer формой
    updateFooterFormVisibility(viewId);

    // 5. Обновляем активные ссылки в меню
    updateActiveLinks(viewId);

    // 6. Закрываем мобильное меню
    closeMobileMenu();

    console.log(`✅ Navigated to: ${viewId}`);
  } catch (error) {
    console.error('❌ Error in navigateTo:', error);
    navigateTo('home', { addToHistory: false });
  }
}

/**
 * Генерирует красивый URL на основе viewId
 * @param {string} viewId 
 * @param {Object} state 
 * @returns {string}
 */
function getPrettyUrl(viewId, state = {}) {
  try {
    const basePath = window.location.pathname.replace(/index\.html$/, '') || '/';

    // Специальная обработка для tour detail
    if (viewId === 'tour-detail' && state.tourId) {
      return `${basePath}tour/${state.tourId}`;
    }

    // Остальные routes
    const routePath = viewId === 'home' ? '' : `/${viewId}`;
    return `${basePath}${routePath}`.replace(/\/+/g, '/');
  } catch (error) {
    console.error('❌ Error in getPrettyUrl:', error);
    return window.location.pathname;
  }
}

/**
 * Парсит URL и возвращает viewId и параметры
 * @param {string} pathname 
 * @returns {Object}
 */
function parseUrl(pathname) {
  try {
    // Удаляем базовый путь и index.html
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';
    let path = pathname.replace(basePath, '').replace(/\/$/, '') || '/';

    // Проверяем tour detail маршрут
    const tourMatch = path.match(/^\/tour\/(\d+)$/);
    if (tourMatch) {
      return { viewId: 'tour-detail', tourId: parseInt(tourMatch[1]) };
    }

    // Остальные маршруты
    const normalizedPath = path === '/' ? '' : path;
    const viewId = ROUTES[normalizedPath] || ROUTES[path] || 'home';

    return { viewId };
  } catch (error) {
    console.error('❌ Error parsing URL:', error);
    return { viewId: 'home' };
  }
}

/**
 * Управляет видимостью footer формы
 * @param {string} viewId 
 */
function updateFooterFormVisibility(viewId) {
  try {
    const footerForm = document.getElementById('contact-form-section');
    if (!footerForm) return;

    // Скрыть форму на странице tour-detail
    if (viewId === 'tour-detail') {
      footerForm.classList.add('hidden');
    } else {
      footerForm.classList.remove('hidden');
    }
  } catch (error) {
    console.error('❌ Error updating footer visibility:', error);
  }
}

/**
 * Обновляет активные ссылки в навигации
 * @param {string} viewId 
 */
function updateActiveLinks(viewId) {
  try {
    document.querySelectorAll('.header__link, .mobile-menu__link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.link === viewId) {
        link.classList.add('active');
      }
    });
  } catch (error) {
    console.error('❌ Error updating active links:', error);
  }
}

/**
 * Закрывает мобильное меню
 */
function closeMobileMenu() {
  try {
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerIcon = document.querySelector('.header__burger i');

    if (!mobileMenu) return;

    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';

      if (burgerIcon) {
        burgerIcon.classList.remove('fa-xmark');
        burgerIcon.classList.add('fa-bars');
      }
    }
  } catch (error) {
    console.error('❌ Error closing mobile menu:', error);
  }
}

/**
 * Инициализирует History API слушатель
 */
function initHistoryListener() {
  window.addEventListener('popstate', (event) => {
    try {
      if (event.state && event.state.view) {
        navigateTo(event.state.view, { addToHistory: false, state: event.state });
      } else {
        navigateTo('home', { addToHistory: false });
      }
    } catch (error) {
      console.error('❌ Error in popstate listener:', error);
    }
  });
}

/**
 * Обрабатывает прямые ссылки при загрузке страницы
 */
function initDirectLinkHandling() {
  document.addEventListener('DOMContentLoaded', () => {
    try {
      const { viewId, tourId } = parseUrl(window.location.pathname);
      
      // Небольшая задержка для гарантии загрузки DOM
      setTimeout(() => {
        const state = tourId ? { tourId } : {};
        navigateTo(viewId, { addToHistory: false, state });
      }, 50);
    } catch (error) {
      console.error('❌ Error in direct link handling:', error);
    }
  });
}

/**
 * Инициализирует роутер
 */
export function initRouter() {
  try {
    console.log('🚀 Initializing Router with History API');
    initHistoryListener();
    initDirectLinkHandling();
  } catch (error) {
    console.error('❌ Error initializing router:', error);
  }
}

// Экспортируем helper функции для отладки
export { parseUrl, getPrettyUrl };
