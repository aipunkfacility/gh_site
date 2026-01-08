// src/composables/useLazyLoad.js
/**
 * Composable для lazy loading изображений
 * Использует Intersection Observer API
 */

export function initLazyLoading() {
  try {
    console.log('🖼️ Initializing Lazy Loading');

    if (!('IntersectionObserver' in window)) {
      console.warn('⚠️ IntersectionObserver not supported');
      loadAllImages();
      return;
    }

    observeImages();
    observeSources();

    console.log('✅ Lazy loading initialized');
  } catch (error) {
    console.error('❌ Error initializing lazy loading:', error);
    loadAllImages();
  }
}

function observeImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (images.length === 0) return;

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
    try {
      if (!img.src || img.src.includes('placehold')) {
        img.src = getPlaceholderUrl(img);
      }
      imageObserver.observe(img);
    } catch (error) {
      console.error('❌ Error observing image:', error);
      loadImage(img);
    }
  });

  console.log(`✅ Observing ${images.length} images`);
}

function observeSources() {
  const sources = document.querySelectorAll('source[data-srcset]');
  if (sources.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
  };

  const sourceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadSource(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sources.forEach(source => {
    try {
      sourceObserver.observe(source);
    } catch (error) {
      console.error('❌ Error observing source:', error);
      loadSource(source);
    }
  });

  console.log(`✅ Observing ${sources.length} sources`);
}

function loadImage(img) {
  try {
    if (!img.dataset.src) return;

    img.addEventListener('load', () => {
      img.classList.add('loaded');
      img.classList.remove('loading');
    }, { once: true });

    img.addEventListener('error', () => {
      console.warn('⚠️ Failed to load image:', img.dataset.src);
      img.classList.add('error');
      img.classList.remove('loading');
    }, { once: true });

    img.classList.add('loading');
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
  } catch (error) {
    console.error('❌ Error loading image:', error);
  }
}

function loadSource(source) {
  try {
    if (!source.dataset.srcset) return;
    source.srcset = source.dataset.srcset;
    source.removeAttribute('data-srcset');
  } catch (error) {
    console.error('❌ Error loading source:', error);
  }
}

function getPlaceholderUrl(img) {
  try {
    const width = img.dataset.width || img.width || 400;
    const height = img.dataset.height || img.height || 300;
    const text = img.alt || 'Loading';
    return `https://placehold.co/${width}x${height}/e0e0e0/999999?text=${encodeURIComponent(text)}`;
  } catch (error) {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e0e0e0" width="400" height="300"/%3E%3C/svg%3E';
  }
}

function loadAllImages() {
  try {
    console.log('📸 Loading all images immediately (fallback)');
    document.querySelectorAll('img[data-src]').forEach(loadImage);
    document.querySelectorAll('source[data-srcset]').forEach(loadSource);
  } catch (error) {
    console.error('❌ Error loading all images:', error);
  }
}

export function addLazyLoadingToNewImages(container = document) {
  try {
    const images = container.querySelectorAll('img[data-src]');
    const sources = container.querySelectorAll('source[data-srcset]');
    
    if (images.length === 0 && sources.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      images.forEach(loadImage);
      sources.forEach(loadSource);
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

    const sourceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadSource(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    images.forEach(img => imageObserver.observe(img));
    sources.forEach(source => sourceObserver.observe(source));

    console.log(`✅ Added lazy loading to ${images.length} images and ${sources.length} sources`);
  } catch (error) {
    console.error('❌ Error adding lazy loading:', error);
  }
}

export function useLazyLoad() {
  return {
    initLazyLoading,
    addLazyLoadingToNewImages
  };
}
