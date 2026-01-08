import { toursData, bikesData, servicesData } from './data.js';
import { createCardHTML, createBikeCard, createServiceHTML, renderTourDetail } from './render.js';
import { navigateTo } from './router.js';

// Инициализация
function initApp() {
    console.log('App Initialized');

    // 1. Рендеринг Популярных туров (Главная)
    const popularGrid = document.getElementById('home-popular-grid');
    if(popularGrid) {
        popularGrid.innerHTML = toursData.slice(0, 4).map(createCardHTML).join('');
    }

    // 2. Рендеринг Всех туров (Каталог)
    renderTours(toursData);

    // 3. Рендеринг Сервисов
    const servicesContainer = document.getElementById('services-list');
    if(servicesContainer) {
        servicesContainer.innerHTML = servicesData.map(createServiceHTML).join('');
    }
    
    // 4. Рендеринг Байков
    renderBikes();

    // 5. Настройка событий (клики по кнопкам и ссылкам)
    setupEventListeners();
}

// Функция рендера туров (с возможностью фильтрации)
function renderTours(data) {
    const container = document.getElementById('tours-grid');
    if(container) {
        container.innerHTML = data.map(createCardHTML).join('');
        // После рендера вешаем события клика на новые карточки
        setupTourClickEvents();
    }
}

// Функция рендера байков по категориям
function renderBikes() {
    const renderCat = (id, type) => {
        const el = document.getElementById(id);
        if(el) el.innerHTML = bikesData.filter(b => b.categoryType === type).map(createBikeCard).join('');
    };

    renderCat('bikes-list-standard', 'standard');
    renderCat('bikes-list-comfort', 'comfort');
    renderCat('bikes-list-maxi', 'maxi');
    renderCat('bikes-list-moto', 'moto');
}

// Обработчики событий
function setupEventListeners() {
    // Навигация через data-link
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.dataset.link);
        }
    });

    // Фильтры туров
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Logic
            const cat = btn.dataset.filter;
            if (cat === 'all') {
                renderTours(toursData);
            } else {
                const filtered = toursData.filter(t => t.category.includes(cat));
                renderTours(filtered);
            }
        });
    });

    // Бургер меню
    const burgerBtn = document.getElementById('burgerBtn');
    if(burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            const icon = burgerBtn.querySelector('i');
            menu.classList.toggle('active');
            
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
}

// Клик по карточке тура
function setupTourClickEvents() {
    document.querySelectorAll('.tour-card-trigger').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            openTourDetail(id);
        });
    });
}

// Открытие детальной страницы
function openTourDetail(id) {
    const tour = toursData.find(t => t.id === id);
    if (!tour) return;

    const container = document.getElementById('tour-detail-content');
    const priceEl = document.getElementById('detail-price-bar');
    
    if(container) container.innerHTML = renderTourDetail(tour);
    if(priceEl) priceEl.innerText = tour.price;

    navigateTo('tour-detail');
}

// Запуск при загрузке DOM
document.addEventListener('DOMContentLoaded', initApp);