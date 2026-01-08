// js/app.js
import { toursData, bikesData, servicesData } from './data.js';
import { createCardHTML, createBikeCard, createServiceHTML, renderTourDetail } from './render.js';
import { navigateTo } from './router.js';
import { config, getWhatsAppLink } from './config.js';

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
            } catch (error) {
                console.error('❌ Ошибка при рендеринге популярных туров:', error);
            }
        }
        
        renderTours(toursData);
        
        const servicesContainer = safeGetElement('services-list');
        if (servicesContainer) {
            try {
                servicesContainer.innerHTML = servicesData.map(createServiceHTML).join('');
            } catch (error) {
                console.error('❌ Ошибка при рендеринге сервисов:', error);
            }
        }
        
        renderBikes();
        setupEventListeners();
        updateContactLinks();
    } catch (error) {
        console.error('❌ Критическая ошибка при инициализации приложения:', error);
    }
}

function renderTours(data) {
    try {
        if (!Array.isArray(data)) {
            console.error('❌ renderTours: данные не являются массивом', data);
            return;
        }
        
        const container = safeGetElement('tours-grid');
        if (container) {
            container.innerHTML = data.map(createCardHTML).join('');
            setupTourClickEvents();
        }
    } catch (error) {
        console.error('❌ Ошибка при рендеринге туров:', error);
    }
}

function renderBikes() {
    try {
        const renderCat = (elementId, type) => {
            try {
                const el = safeGetElement(elementId);
                if (el) {
                    el.innerHTML = bikesData
                        .filter(b => b.categoryType === type)
                        .map(createBikeCard)
                        .join('');
                }
            } catch (error) {
                console.error(`❌ Ошибка при рендеринге категории "${type}":`, error);
            }
        };
        
        renderCat('bikes-list-standard', 'standard');
        renderCat('bikes-list-comfort', 'comfort');
        renderCat('bikes-list-maxi', 'maxi');
        renderCat('bikes-list-moto', 'moto');
    } catch (error) {
        console.error('❌ Ошибка при рендеринге байков:', error);
    }
}

function setupEventListeners() {
    try {
        // Обработка навигации
        document.body.addEventListener('click', (e) => {
            try {
                const link = e.target.closest('[data-link]');
                if (link) {
                    e.preventDefault();
                    const route = link.dataset.link;
                    if (!route) {
                        console.warn('⚠️ data-link атрибут пуст');
                        return;
                    }
                    navigateTo(route);
                }
            } catch (error) {
                console.error('❌ Ошибка при обработке клика навигации:', error);
            }
        });
        
        // Фильтрация туров
        const filterBtns = document.querySelectorAll('.filter-btn');
        if (filterBtns.length === 0) {
            console.warn('⚠️ Кнопки фильтра не найдены');
        }
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                try {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    const cat = btn.dataset.filter || 'all';
                    if (cat === 'all') {
                        renderTours(toursData);
                    } else {
                        const filtered = toursData.filter(t => 
                            t.category && t.category.includes(cat)
                        );
                        renderTours(filtered);
                    }
                } catch (error) {
                    console.error('❌ Ошибка при фильтрации туров:', error);
                }
            });
        });
        
        // Мобильное меню
        const burgerBtn = safeGetElement('burgerBtn');
        if (burgerBtn) {
            burgerBtn.addEventListener('click', () => {
                try {
                    const menu = safeGetElement('mobileMenu');
                    const icon = burgerBtn.querySelector('i');
                    
                    if (!menu || !icon) {
                        console.error('❌ Элементы мобильного меню не найдены');
                        return;
                    }
                    
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
                } catch (error) {
                    console.error('❌ Ошибка при переключении мобильного меню:', error);
                }
            });
        }
    } catch (error) {
        console.error('❌ Ошибка при установке слушателей событий:', error);
    }
}

function setupTourClickEvents() {
    try {
        const cards = document.querySelectorAll('.tour-card-trigger');
        if (cards.length === 0) {
            console.warn('⚠️ Карточки туров не найдены');
            return;
        }
        
        cards.forEach(card => {
            card.onclick = () => {
                try {
                    const id = parseInt(card.dataset.id);
                    if (isNaN(id)) {
                        console.error('❌ Некорректный ID тура:', card.dataset.id);
                        return;
                    }
                    openTourDetail(id);
                } catch (error) {
                    console.error('❌ Ошибка при открытии деталей тура:', error);
                }
            };
        });
    } catch (error) {
        console.error('❌ Ошибка при установке событий карточек туров:', error);
    }
}

function openTourDetail(id) {
    try {
        if (!Number.isInteger(id)) {
            console.error('❌ openTourDetail: ID должен быть числом', id);
            return;
        }
        
        const tour = toursData.find(t => t.id === id);
        if (!tour) {
            console.warn(`⚠️ Тур с ID ${id} не найден`);
            return;
        }
        
        const container = safeGetElement('tour-detail-content');
        const priceEl = safeGetElement('detail-price-bar');
        
        if (container) {
            try {
                container.innerHTML = renderTourDetail(tour);
            } catch (error) {
                console.error('❌ Ошибка при рендеринге деталей тура:', error);
            }
        }
        
        if (priceEl) {
            priceEl.innerText = tour.price || '$0';
        }
        
        const bookBtn = safeQuerySelector('.booking-bar button');
        if (bookBtn) {
            try {
                const messageText = config.messages.tourBooking(tour.title);
                const link = getWhatsAppLink(messageText);
                bookBtn.onclick = () => window.open(link, '_blank');
            } catch (error) {
                console.error('❌ Ошибка при установке кнопки бронирования:', error);
            }
        }
        
        navigateTo('tour-detail');
    } catch (error) {
        console.error('❌ Ошибка при открытии деталей тура:', error);
    }
}

// Обновление всех контактных ссылок из config
function updateContactLinks() {
    try {
        // Обновляем floating button
        const floatingBtn = safeQuerySelector('.floating-btn');
        if (floatingBtn) {
            try {
                floatingBtn.href = config.contacts.whatsappUrl;
            } catch (error) {
                console.error('❌ Ошибка при обновлении floating button:', error);
            }
        }
        
        // Обновляем кнопку Telegram в мобильном меню
        const telegramBtn = safeQuerySelector('.mobile-menu__telegram');
        if (telegramBtn) {
            try {
                telegramBtn.onclick = () => window.open(config.contacts.telegramUrl, '_blank');
            } catch (error) {
                console.error('❌ Ошибка при обновлении кнопки Telegram:', error);
            }
        }
        
        // Обновляем форму в футере
        const footerForm = safeQuerySelector('.footer-form form');
        if (footerForm) {
            try {
                footerForm.onsubmit = (e) => {
                    e.preventDefault();
                    window.open(config.contacts.whatsappUrl, '_blank');
                };
            } catch (error) {
                console.error('❌ Ошибка при обновлении формы футера:', error);
            }
        }
        
        // Обновляем кнопку WhatsApp на странице контактов
        const contactWhatsAppBtn = safeQuerySelector('.contact-card .btn--primary');
        if (contactWhatsAppBtn) {
            try {
                contactWhatsAppBtn.onclick = () => window.open(config.contacts.whatsappUrl, '_blank');
            } catch (error) {
                console.error('❌ Ошибка при обновлении кнопки контактов:', error);
            }
        }
        
        // Обновляем кнопку аренды авто (используем класс вместо onclick)
        const carRentalBtn = safeQuerySelector('.car-rental-btn');
        if (carRentalBtn) {
            try {
                carRentalBtn.onclick = () => {
                    const link = getWhatsAppLink(config.messages.carRental);
                    window.open(link, '_blank');
                };
            } catch (error) {
                console.error('❌ Ошибка при обновлении кнопки аренды авто:', error);
            }
        }
        
        // Обновляем кнопку проживания (используем класс вместо onclick)
        const accommodationBtn = safeQuerySelector('.accommodation-btn');
        if (accommodationBtn) {
            try {
                accommodationBtn.onclick = () => {
                    const link = getWhatsAppLink(config.messages.accommodation);
                    window.open(link, '_blank');
                };
            } catch (error) {
                console.error('❌ Ошибка при обновлении кнопки проживания:', error);
            }
        }
        
        // Обновляем кнопку WhatsApp на странице контактов (используем класс)
        const contactWhatsAppBtnNew = safeQuerySelector('.contact-whatsapp-btn');
        if (contactWhatsAppBtnNew) {
            try {
                contactWhatsAppBtnNew.onclick = () => window.open(config.contacts.whatsappUrl, '_blank');
            } catch (error) {
                console.error('❌ Ошибка при обновлении кнопки контактов:', error);
            }
        }
    } catch (error) {
        console.error('❌ Критическая ошибка при обновлении контактных ссылок:', error);
    }
}

// Обработка глобальных ошибок
window.addEventListener('error', (event) => {
    console.error('❌ Необработанная ошибка:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('❌ Необработанное Promise rejection:', event.reason);
});

document.addEventListener('DOMContentLoaded', initApp);
