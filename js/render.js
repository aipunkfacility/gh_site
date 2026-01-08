import { navigateTo } from './router.js';

// Генерация карточки тура
export function createCardHTML(item) {
    const badgeHTML = item.badge ? `<span class="badge badge--${item.badge === 'ХИТ' ? 'hit' : 'new'}">${item.badge}</span>` : '';
    // Обратите внимание: мы используем data-id для обработки клика в app.js
    return `
        <article class="card tour-card-trigger" data-id="${item.id}">
            <div class="card__image-wrapper">
                ${badgeHTML}
                <img src="${item.image}" class="card__image" alt="${item.title}">
            </div>
            <div class="card__content">
                <h3 class="card__title">${item.title}</h3>
                <p class="card__desc">${item.desc}</p>
                <div class="card__footer">
                    <span class="card__price">${item.price}</span>
                    <button class="card__btn">Подробнее</button>
                </div>
            </div>
        </article>
    `;
}

// Генерация карточки байка
export function createBikeCard(bike) {
    return `
       <div class="bike-card">
           <img src="${bike.image}" alt="${bike.model}" class="bike-card__img">
           <div class="bike-card__content">
               <div class="bike-header">
                   <h3 class="bike-title">${bike.model}</h3>
                   <span class="bike-badge ${bike.badgeClass}">${bike.type}</span>
               </div>
               <div class="bike-specs">
                   <span class="bike-spec-item"><i class="fa-solid fa-gauge-high"></i> ${bike.cc}</span>
               </div>
               <p style="font-size: 14px; color: var(--text-gray); margin-bottom: 16px;">${bike.desc}</p>
               <div class="bike-price">${bike.price} <span style="font-size: 12px; font-weight: 400; color: #999;">/ сутки</span></div>
               <button class="btn btn--primary" style="width: 100%; padding: 12px;" onclick="window.open('https://wa.me/84372733431?text=Здравствуйте, хочу забронировать тур', '_blank')"
           </div>
       </div>
   `;
}

// Генерация сервиса
export function createServiceHTML(item) {
    return `
       <div class="service-item">
           <img src="${item.image}" alt="${item.title}">
           <div class="service-item-content">
               <h3>${item.title}</h3>
               <p style="color: var(--text-gray); margin-bottom: 16px; white-space: pre-line;">${item.desc}</p>
               <button class="btn btn--secondary" style="width: 100%;" onclick="alert('Переход в WhatsApp...')">${item.btnText}</button>
           </div>
       </div>
   `;
}

// Детальная страница тура
export function renderTourDetail(tour) {
    let programHTML = '';
    if (tour.program && tour.program.length > 0) {
         programHTML = `
            <h3 style="margin-bottom: 20px;">Программа</h3>
            <div class="timeline">
                ${tour.program.map(step => `
                    <div class="timeline-item">
                        <span class="timeline-time">${step.time}</span>
                        <div class="timeline-title">${step.title}</div>
                        <p style="font-size: 14px; color: var(--text-gray);">${step.desc}</p>
                    </div>
                `).join('')}
            </div>
         `;
    }

    return `
        <div class="tour-header">
            <img src="${tour.image}" class="tour-header__img" alt="${tour.title}">
            <div class="tour-header__overlay"></div>
            <div class="tour-header__content">
                ${tour.badge ? `<span class="badge badge--hit" style="position: static; display: inline-block; margin-bottom: 8px;">${tour.badge}</span>` : ''}
                <h1 style="font-size: 28px; margin-bottom: 0; color: white;">${tour.title}</h1>
            </div>
        </div>

        <div class="tour-body">
            <div class="tour-meta">
                ${tour.meta.map(m => `<div class="meta-item">${m}</div>`).join('')}
            </div>

            <p style="margin-bottom: 32px; color: var(--text-gray); font-size: 16px; white-space: pre-line;">
                ${tour.fullDesc}
            </p>

            ${programHTML}

            <div style="background: #f9f9f9; padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                <h3 style="margin-bottom: 16px;">В стоимость включено</h3>
                <ul class="check-list">
                    ${tour.included.map(item => `<li>${item}</li>`).join('')}
                </ul>
                ${tour.excluded && tour.excluded.length > 0 ? `
                    <h3 style="margin-top: 24px; margin-bottom: 16px;">Не включено</h3>
                    <ul class="cross-list">
                        ${tour.excluded.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        </div>
    `;
}

