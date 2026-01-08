import { toursData, bikesData, servicesData } from './data.js';
import { createCardHTML, createBikeCard, createServiceHTML, renderTourDetail } from './render.js';
import { navigateTo } from './router.js';

// Инициализация приложения
function initApp() {
    console.log('App Initialized via Modules');

    const popularGrid = document.getElementById('home-popular-grid');
    if(popularGrid) {
        popularGrid.innerHTML = toursData.slice(0, 4).map(createCardHTML).join('');
        setupTourClickEvents();
    }

    renderTours(toursData);

    const servicesContainer = document.getElementById('services-list');
    if(servicesContainer) {
        servicesContainer.innerHTML = servicesData.map(createServiceHTML).join('');
    }
    
    renderBikes();
    setupEventListeners();
}

function renderTours(data) {
    const container = document.getElementById('tours-grid');
    if(container) {
        container.innerHTML = data.map(createCardHTML).join('');
        setupTourClickEvents();
    }
}

function renderBikes() {
    const renderCat = (elementId, type) => {
        const el = document.getElementById(elementId);
        if(el) el.innerHTML = bikesData.filter(b => b.categoryType === type).map(createBikeCard).join('');
    };

    renderCat('bikes-list-standard', 'standard');
    renderCat('bikes-list-comfort', 'comfort');
    renderCat('bikes-list-maxi', 'maxi');
    renderCat('bikes-list-moto', 'moto');
}

function setupEventListeners() {
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('[data-link]');
        if (link) {
            e.preventDefault();
            navigateTo(link.dataset.link);
        }
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const cat = btn.dataset.filter || 'all';
            if (cat === 'all') {
                renderTours(toursData);
            } else {
                const filtered = toursData.filter(t => t.category.includes(cat));
                renderTours(filtered);
            }
        });
    });

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

function setupTourClickEvents() {
    document.querySelectorAll('.tour-card-trigger').forEach(card => {
        card.onclick = () => {
            const id = parseInt(card.dataset.id);
            openTourDetail(id);
        };
    });
}

function openTourDetail(id) {
    const tour = toursData.find(t => t.id === id);
    if (!tour) return;

    const container = document.getElementById('tour-detail-content');
    const priceEl = document.getElementById('detail-price-bar');
    
    if(container) container.innerHTML = renderTourDetail(tour);
    if(priceEl) priceEl.innerText = tour.price;

    const bookBtn = document.querySelector('.booking-bar button');
    if (bookBtn) {
        const phone = '84372733431'; 
        const text = `Здравствуйте! Хочу забронировать тур: ${tour.title}`;
        const link = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        
        bookBtn.onclick = () => window.open(link, '_blank');
    }

    navigateTo('tour-detail');
}

document.addEventListener('DOMContentLoaded', initApp);
