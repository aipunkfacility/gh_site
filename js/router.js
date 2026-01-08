/**
 * Функция навигации
 * @param {string} viewId - ID экрана (например, 'home', 'tours')
 * @param {boolean} addToHistory - Добавлять ли запись в историю браузера
 */
export function navigateTo(viewId, addToHistory = true) {
    // 1. Скрываем все экраны
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    
    // 2. Находим нужный экран
    const target = document.getElementById(`view-${viewId}`);
    if(target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    } else {
        console.error(`View not found: view-${viewId}`);
        return;
    }

    // 3. Работаем с историей браузера
    if (addToHistory) {
        const url = viewId === 'home' ? window.location.pathname : `?page=${viewId}`;
        history.pushState({ view: viewId }, null, url);
    }

    // 4. Скрываем форму контактов на странице тура
    const footerForm = document.getElementById('contact-form-section');
    if (footerForm) {
        if (viewId === 'tour-detail') {
            footerForm.classList.add('hidden');
        } else {
            footerForm.classList.remove('hidden');
        }
    }

    // 5. Обновляем активную ссылку в меню
    document.querySelectorAll('.header__link, .mobile-menu__link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.link === viewId) {
            link.classList.add('active');
        }
    });

    // 6. Закрываем мобильное меню
    const mobileMenu = document.getElementById('mobileMenu');
    const burgerIcon = document.querySelector('.header__burger i');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        if(burgerIcon) {
            burgerIcon.classList.remove('fa-xmark');
            burgerIcon.classList.add('fa-bars');
        }
    }
}

// Слушатель кнопки "Назад" в браузере
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.view) {
        navigateTo(event.state.view, false);
    } else {
        navigateTo('home', false);
    }
});

// Обработка прямой ссылки при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page) {
        setTimeout(() => navigateTo(page, false), 50); 
    }
});
