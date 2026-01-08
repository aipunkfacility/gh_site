export function navigateTo(viewId) {
    // Скрываем все экраны
    document.querySelectorAll('.view').forEach(el => el.classList.remove('active'));
    
    // Находим нужный экран
    const target = document.getElementById(`view-${viewId}`);
    if(target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Скрываем форму контактов на странице тура
    const footerForm = document.getElementById('contact-form-section');
    if (footerForm) {
        if (viewId === 'tour-detail') {
            footerForm.classList.add('hidden');
        } else {
            footerForm.classList.remove('hidden');
        }
    }

    // Обновляем активную ссылку в меню
    document.querySelectorAll('.header__link, .mobile-menu__link').forEach(link => {
        link.classList.remove('active');
        // Проверяем атрибут data-link
        if (link.dataset.link === viewId) {
            link.classList.add('active');
        }
    });

    // Закрываем мобильное меню, если оно открыто
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