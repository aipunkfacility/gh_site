// js/lazyload.js
/**
 * Lazy Loading Module
 * Использует Intersection Observer API для загрузки изображений когда они видны
 */

/**
 * Инициализирует lazy loading для всех изображений с data-src
 */
export function initLazyLoading() {
  try {
    console.log('🖼️ Initializing Lazy Loading');

    // Проверка поддержки Intersection Observer
    if (!('IntersectionObserver' in window)) {
      console.warn('⚠️ IntersectionObserver not supported, loading all images immediately');
      loadAllImages();
      return;
    }

    // Получаем все изображения с data-src
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) {
      console.log('ℹ️ No lazy images found');
      return;
    }

    // Создаём observer с опциями
    const observerOptions = {
      root: null, // viewport
      rootMargin: '50px', // начать загрузку за 50px до видимости
      threshold: 0.01 // даже минимальная видимость
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Наблюдаем за каждым изображением
    images.forEach(img => {
      try {
        // Показываем placeholder до загрузки
        if (!img.src && img.dataset.src) {
          img.src = getPlaceholderUrl(img);
        }
        imageObserver.observe(img);
      } catch (error) {
        console.error('❌ Error observing image:', img, error);
        loadImage(img); // Fallback: загружаем сразу
      }
    });

    console.log(`✅ Lazy loading initialized for ${images.length} images`);
  } catch (error) {
    console.error('❌ Error initializing lazy loading:', error);
    loadAllImages();
  }
}

/**
 * Загружает изображение при пересечении с viewport
 * @param {HTMLImageElement} img
 */
function loadImage(img) {
  try {
    if (!img.dataset.src) {
      console.warn('⚠️ Image has no data-src:', img);
      return;
    }

    // Добавляем обработчики
    img.addEventListener('load', () => {
      img.classList.add('loaded');
      img.classList.remove('loading');
    }, { once: true });

    img.addEventListener('error', () => {
      console.warn('⚠️ Failed to load image:', img.dataset.src);
      img.classList.add('error');
      img.classList.remove('loading');
      // Используем fallback изображение
      img.src = getPlaceholderUrl(img);
    }, { once: true });

    // Добавляем класс для анимации загрузки
    img.classList.add('loading');

    // Загружаем изображение
    img.src = img.dataset.src;
    
    // Удаляем data-src (не нужен больше)
    img.removeAttribute('data-src');
  } catch (error) {
    console.error('❌ Error loading image:', error);
  }
}

/**
 * Получает URL плейсхолдера для изображения
 * @param {HTMLImageElement} img
 * @returns {string}
 */
function getPlaceholderUrl(img) {
  try {
    const width = img.dataset.width || img.width || 400;
    const height = img.dataset.height || img.height || 300;
    const text = img.dataset.alt || 'Loading...';
    
    // Используем плейсхолдер сервис
    return `https://placehold.co/${width}x${height}/e0e0e0/999999?text=${encodeURIComponent(text)}`;
  } catch (error) {
    console.error('❌ Error getting placeholder:', error);
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3C/svg%3E';
  }
}

/**
 * Fallback: загружает все изображения сразу (для старых браузеров)
 */
function loadAllImages() {
  try {
    console.log('📸 Loading all images immediately');
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      loadImage(img);
    });
  } catch (error) {
    console.error('❌ Error loading all images:', error);
  }
}

/**
 * Динамически добавляет lazy loading для новых изображений
 * (для использования после AJAX загрузки контента)
 * @param {HTMLElement} container - контейнер с новыми изображениями
 */
export function addLazyLoadingToNewImages(container = document) {
  try {
    const images = container.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      images.forEach(loadImage);
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    images.forEach(img => {
      imageObserver.observe(img);
    });

    console.log(`✅ Added lazy loading to ${images.length} new images`);
  } catch (error) {
    console.error('❌ Error adding lazy loading to new images:', error);
  }
}
