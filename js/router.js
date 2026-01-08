/**
 * Функция навигации
 * @param {string} viewId - ID экрана (например, 'home', 'tours')
 * @param {boolean} addToHistory - Добавлять ли запись в историю браузера (по умолчанию true)
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

    // 3. Работаем с историей браузера (History API)
    if (addToHistory) {
        // Меняем URL на ?page=tours без перезагрузки страницы
        const url = viewId === 'home' ? window.location.pathname : `?page=${viewId}`;
        history.pushState({ view: viewId }, null, url);
    }

    // 4. Логика скрытия формы контактов (на странице деталей тура она не нужна)
    const footerForm = document.getElementById('contact-form-section');
    if (footerForm) {
        if (viewId === 'tour-detail') {
            footerForm.classList.add('hidden');
        } else {
            footerForm.classList.remove('hidden');
        }
    }

    // 5. Обновляем активную ссылку в меню (подсветка текущего раздела)
    document.querySelectorAll('.header__link, .mobile-menu__link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.link === viewId) {
            link.classList.add('active');
        }
    });

    // 6. Закрываем мобильное меню, если оно открыто
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

// Слушатель системной кнопки "Назад" в браузере
window.addEventListener('popstate', (event) => {
    // Если у нас есть сохраненное состояние (state)
    if (event.state && event.state.view) {
        // Переходим на экран из истории, но НЕ добавляем запись в историю снова (false)
        navigateTo(event.state.view, false);
    } else {
        // Если истории нет (например, вернулись в самое начало), открываем home
        navigateTo('home', false);
    }
});

// Обработка прямой ссылки (например, если открыли сайт сразу на ?page=tours)
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page) {
        // Если в URL есть параметр page, открываем его, но не пушим в историю (т.к. мы уже тут)
        // Небольшая задержка, чтобы DOM успел прогрузиться в app.js
        setTimeout(() => navigateTo(page, false), 50); 
    }
});
