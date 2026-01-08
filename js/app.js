// Импортируем данные и функции из соседних файлов
import { toursData, bikesData, servicesData } from './data.js';
import { createCardHTML, createBikeCard, createServiceHTML, renderTourDetail } from './render.js';
import { navigateTo } from './router.js';

// Инициализация приложения
function initApp() {
    console.log('App Initialized via Modules');

    // 1. Рендеринг Популярных туров (Главная)
    const popularGrid = document.getElementById('home-popular-grid');
    if(popularGrid) {
        // Берем первые 4 тура
        popularGrid.innerHTML = toursData.slice(0, 4).map(createCardHTML).join('');
        setupTourClickEvents(); // Вешаем клики
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

    // 5. Настройка событий (клики по ссылкам меню и фильтрам)
    setupEventListeners();
}

// Функция рендера списка туров
function renderTours(data) {
    const container = document.getElementById('tours-grid');
    if(container) {
        container.innerHTML = data.map(createCardHTML).join('');
        setupTourClickEvents(); // Обновляем клики для новых карточек
    }
}

// Функция рендера байков по категориям
function renderBikes() {
    const renderCat = (elementId, type) => {
        const el = document.getElementById(elementId);
        // Фильтруем данные из data.js
        if(el) el.innerHTML = bikesData.filter(b => b.categoryType === type).map(createBikeCard).join('');
    };

    renderCat('bikes-list-standard', 'standard');
    renderCat('bikes-list-comfort', 'comfort');
    renderCat('bikes-list-maxi', 'maxi');
    renderCat('bikes-list-moto', 'moto');
}

// Глобальные обработчики событий
function setupEventListeners() {
    // 1. Навигация через data-link (вместо onclick в HTML)
    document.body.addEventListener('click', (e) => {
        // Ищем ближайший элемент с атрибутом data-link
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault(); // Отменяем стандартный переход ссылки
            navigateTo(link.dataset.link); // Вызываем функцию навигации
        }
    });

    // 2. Фильтры туров
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем класс active у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            // Добавляем нажатой
            btn.classList.add('active');
            
            // Логика фильтрации
            const cat = btn.dataset.filter || 'all'; // Если атрибута нет, считаем 'all'
            if (cat === 'all') {
                renderTours(toursData);
            } else {
                const filtered = toursData.filter(t => t.category.includes(cat));
                renderTours(filtered);
            }
        });
    });

    // 3. Бургер меню (Мобильное)
    const burgerBtn = document.getElementById('burgerBtn');
    if(burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobileMenu');
            const icon = burgerBtn.querySelector('i');
            menu.classList.toggle('active');
            
            // Меняем иконку (гамбургер <-> крестик)
            if (menu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                document.body.style.overflow = 'hidden'; // Блокируем скролл сайта
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
}

// Специальная функция для клика по карточке тура
function setupTourClickEvents() {
    document.querySelectorAll('.tour-card-trigger').forEach(card => {
        // Вешаем событие на клик
        card.onclick = () => {
            const id = parseInt(card.dataset.id);
            openTourDetail(id);
        };
    });
}

// --- ОБНОВЛЕННАЯ ФУНКЦИЯ ---
// Открытие детальной страницы тура + Настройка кнопки WhatsApp
function openTourDetail(id) {
    // Ищем тур в массиве toursData
    const tour = toursData.find(t => t.id === id);
    if (!tour) return;

    const container = document.getElementById('tour-detail-content');
    const priceEl = document.getElementById('detail-price-bar');
    
    // Генерируем HTML через функцию из render.js
    if(container) container.innerHTML = renderTourDetail(tour);
    if(priceEl) priceEl.innerText = tour.price;

    // --- ЛОГИКА ДЛЯ КНОПКИ БРОНИРОВАНИЯ ---
    const bookBtn = document.querySelector('.booking-bar button');
    if (bookBtn) {
        // ВПИШИТЕ СЮДА СВОЙ НОМЕР (без плюса)
        const phone = '84999999999'; 
        
        const text = `Здравствуйте! Хочу забронировать тур: ${tour.title}`;
        // Формируем ссылку
        const link = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        
        // Назначаем действие на клик
        bookBtn.onclick = () => window.open(link, '_blank');
    }

    // Переходим на экран деталей
    navigateTo('tour-detail');
}

// Запуск приложения после загрузки HTML
document.addEventListener('DOMContentLoaded', initApp);
